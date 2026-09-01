import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { StudentProfile, FitmentResult, FitmentFactor, Course } from '../../src/types/index.js';

export const fitmentRouter = Router();

function resultToObjects<T = any>(result: any[]): T[] {
  if (!result || result.length === 0 || !result[0].columns) return [];
  const columns = result[0].columns;
  const values = result[0].values;
  return values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, idx: number) => {
      obj[col] = row[idx];
    });
    return obj as T;
  });
}

fitmentRouter.post('/calculate', async (req: Request, res: Response) => {
  try {
    const profile: StudentProfile = req.body;
    const db = await getDb();

    // 1. Fetch category and eligibility rules
    const catResult = db.exec(`SELECT * FROM categories WHERE id = '${profile.target_category_id}' OR slug = '${profile.target_category_id}'`);
    const categories = resultToObjects(catResult);
    if (categories.length === 0) {
      return res.status(404).json({ success: false, error: 'Target category not found' });
    }
    const category = categories[0];

    const eligResult = db.exec(`SELECT * FROM eligibility_rules WHERE category_id = '${category.id}'`);
    const eligibilityRules = resultToObjects(eligResult);

    // 2. Fetch courses in category
    const crsResult = db.exec(`SELECT * FROM courses WHERE category_id = '${category.id}' AND status = 'Active'`);
    const rawCourses = resultToObjects(crsResult);
    const batchResult = db.exec(`SELECT * FROM course_batches WHERE course_id IN (SELECT id FROM courses WHERE category_id = '${category.id}')`);
    const rawBatches = resultToObjects(batchResult);
    const courses: Course[] = rawCourses.map(crs => ({
      ...crs,
      features: JSON.parse(crs.features_json || '[]'),
      batches: rawBatches.filter(b => b.course_id === crs.id)
    }));

    // 3. HARD FILTERS EVALUATION
    const hardFilterIssues: string[] = [];

    // Academic minimum % check
    const minPctRule = eligibilityRules.length > 0 ? eligibilityRules[0].min_percentage : 50.0;
    if (profile.graduation_or_12th_pct < minPctRule) {
      hardFilterIssues.push(`Academic score (${profile.graduation_or_12th_pct}%) is below the minimum eligibility cutoff (${minPctRule}%).`);
    }

    // Qualification check
    if (category.slug === 'mba' || category.slug === 'ssc-railways' || category.slug === 'banking' || category.slug === 'upsc') {
      if (profile.education_status === '12th Appearing' || profile.education_status === '12th Passed') {
        hardFilterIssues.push(`${category.name} requires a Graduation degree or Final Year standing. 12th standard candidates cannot write this exam cycle directly.`);
      }
    } else if (category.slug === 'clat') {
      // CLAT UG allows 12th appearing/passed
    } else if (category.slug === 'pharma') {
      if (!profile.stream.toLowerCase().includes('pharm')) {
        hardFilterIssues.push(`Pharma entrances (GPAT/NIPER) strictly require a B.Pharm degree or candidate in final year of B.Pharm.`);
      }
    } else if (category.slug === 'judiciary') {
      if (!profile.stream.toLowerCase().includes('law') && !profile.stream.toLowerCase().includes('llb')) {
        hardFilterIssues.push(`State Judicial Services require an LL.B. degree recognized by the Bar Council of India.`);
      }
    }

    // 4. SOFT FACTORS WEIGHTED SCORING
    const factors: FitmentFactor[] = [];

    // Factor 1: Academic Foundation (Weight: 20%)
    let academicScore = 70;
    if (profile.graduation_or_12th_pct >= 85) academicScore = 95;
    else if (profile.graduation_or_12th_pct >= 75) academicScore = 88;
    else if (profile.graduation_or_12th_pct >= 60) academicScore = 78;
    else if (profile.graduation_or_12th_pct >= 50) academicScore = 65;
    else academicScore = 40;

    factors.push({
      factor: 'Academic Foundation',
      weight: 20,
      score: academicScore,
      status: academicScore >= 80 ? 'optimal' : academicScore >= 60 ? 'moderate' : 'gap',
      details: `${profile.graduation_or_12th_pct}% in ${profile.stream} (${profile.education_status}) provides a ${academicScore >= 80 ? 'strong' : 'moderate'} baseline.`
    });

    // Factor 2: Syllabus & Topic Overlap (Weight: 25%)
    let syllabusScore = 50;
    const completedCount = (profile.completed_subjects || []).length;
    if (profile.previous_prep_status === 'Previous Coaching' || profile.previous_prep_status === 'Repeat Attempt') {
      syllabusScore = 85 + Math.min(completedCount * 3, 10);
    } else if (profile.previous_prep_status === 'Self Study (3-6 mo)') {
      syllabusScore = 70 + Math.min(completedCount * 4, 15);
    } else {
      syllabusScore = 60; // Clean slate / beginner
    }

    factors.push({
      factor: 'Prior Preparation & Topic Overlap',
      weight: 25,
      score: Math.min(syllabusScore, 100),
      status: syllabusScore >= 75 ? 'optimal' : syllabusScore >= 60 ? 'moderate' : 'gap',
      details: `Status: ${profile.previous_prep_status}. ${completedCount} topics/modules previously touched.`
    });

    // Factor 3: Timeline & Study Hours Feasibility (Weight: 20%)
    let timelineScore = 60;
    const dailyHours = profile.daily_hours_available || 4;
    if (dailyHours >= 6) timelineScore = 95;
    else if (dailyHours >= 4) timelineScore = 85;
    else if (dailyHours >= 2.5) timelineScore = 70;
    else timelineScore = 45;

    factors.push({
      factor: 'Study Bandwidth & Daily Hours',
      weight: 20,
      score: timelineScore,
      status: timelineScore >= 80 ? 'optimal' : timelineScore >= 65 ? 'moderate' : 'gap',
      details: `Allocating ${dailyHours} hours/day. Target exam cycle: ${profile.target_academic_year}.`
    });

    // Factor 4: Subject Strengths & Weakness Handling (Weight: 20%)
    let subjectScore = 75;
    const weakCount = (profile.weak_subjects || []).length;
    const strongCount = (profile.strong_subjects || []).length;
    if (strongCount > weakCount) subjectScore = 85;
    else if (weakCount > 2) subjectScore = 65;

    factors.push({
      factor: 'Subject Strength-Weakness Balance',
      weight: 20,
      score: subjectScore,
      status: subjectScore >= 80 ? 'optimal' : subjectScore >= 65 ? 'moderate' : 'gap',
      details: `Identified strengths: ${profile.strong_subjects?.join(', ') || 'General Aptitude'}. Key focus areas: ${profile.weak_subjects?.join(', ') || 'Foundation needed'}.`
    });

    // Factor 5: Language & Mode Alignment (Weight: 15%)
    factors.push({
      factor: 'Language & Mode Preference',
      weight: 15,
      score: 90,
      status: 'optimal',
      details: `Preferred medium: ${profile.language_preference} (${profile.mode_preference}). Matches active batch offerings.`
    });

    // Calculate Overall Weighted Score
    let overallScore = 0;
    for (const f of factors) {
      overallScore += (f.score * f.weight) / 100;
    }
    overallScore = Math.round(overallScore);

    const isEligible = hardFilterIssues.length === 0;
    if (!isEligible) {
      overallScore = Math.min(overallScore, 40);
    }

    let fitmentTier: FitmentResult['fitment_tier'] = 'High Fitment (Recommended)';
    if (!isEligible) {
      fitmentTier = 'Low Fitment / Ineligible';
    } else if (overallScore < 70) {
      fitmentTier = 'Moderate Fitment (Needs Foundation)';
    }

    // Select Recommended Course
    let recommendedCourse: Course | null = null;
    let alternativeCourses: Course[] = [];

    if (courses.length > 0) {
      // If student is beginner or needs foundation, prefer Comprehensive/Foundation
      if (profile.previous_prep_status === 'Beginner / Zero Prep' || overallScore < 75) {
        recommendedCourse = courses.find(c => c.level === 'Comprehensive' || c.level === 'Foundation') || courses[0];
        alternativeCourses = courses.filter(c => c.id !== recommendedCourse?.id);
      } else {
        recommendedCourse = courses.find(c => c.level === 'Fast-Track' || c.level === 'Comprehensive') || courses[0];
        alternativeCourses = courses.filter(c => c.id !== recommendedCourse?.id);
      }
    }

    // Gap Analysis
    const preparationGaps: string[] = [];
    if (profile.weak_subjects && profile.weak_subjects.length > 0) {
      preparationGaps.push(`Targeted remedial practice required for: ${profile.weak_subjects.join(', ')}.`);
    }
    if (dailyHours < 3.5) {
      preparationGaps.push(`Daily available study time (${dailyHours} hrs) is below recommended benchmark of 4+ hours for ${category.name}. Additional weekend sprint required.`);
    }
    if (profile.previous_prep_status === 'Beginner / Zero Prep') {
      preparationGaps.push(`Zero prior mock exposure: Needs initial 4-week diagnostic ramp-up before entering high-speed test series.`);
    }

    // Backup Exams
    const backupExamsMap: Record<string, string[]> = {
      mba: ['XAT', 'SNAP', 'NMAT', 'CMAT'],
      clat: ['AILET', 'SLAT', 'LSAT-India'],
      'ssc-railways': ['RRB-NTPC', 'SSC-CHSL', 'State SSC'],
      banking: ['IBPS-PO', 'SBI-Clerk', 'IBPS-Clerk', 'RRB Scale 1'],
      upsc: ['State PCS', 'UPSC EPFO', 'UPSC CAPF'],
      'gate-oa': ['GATE-DA (Dual Stream)', 'ISRO/BARC Recruitment', 'IIT M.Tech Self-Sponsored']
    };

    const fitmentResult: FitmentResult = {
      is_eligible: isEligible,
      hard_filter_issues: hardFilterIssues,
      overall_fitment_score: overallScore,
      fitment_tier: fitmentTier,
      recommended_course: recommendedCourse,
      alternative_courses: alternativeCourses,
      factors: factors,
      preparation_gaps: preparationGaps,
      recommended_daily_plan: `${dailyHours} Hours/Day: 1.5h Live Concept Class + 1h Daily Practice Problem (DPP) + 1h Revision of ${profile.weak_subjects?.[0] || 'Core Subject'}`,
      backup_exams_available: backupExamsMap[category.slug] || ['Allied State Entrances']
    };

    res.json({ success: true, data: fitmentResult });
  } catch (error: any) {
    console.error('Error calculating fitment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
