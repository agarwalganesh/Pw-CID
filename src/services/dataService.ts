import intelligenceRawData from '../data/intelligenceData.json';
import {
  Category,
  CategoryDetailPayload,
  StudentProfile,
  FitmentResult,
  FitmentFactor,
  Course,
  CounsellorPitchResponse
} from '../types';

interface IntelligenceData {
  categories: any[];
  exams: any[];
  exam_structures: any[];
  eligibility_rules: any[];
  preparation_strategies: any[];
  subjects: any[];
  syllabus_topics: any[];
  courses: any[];
  course_batches: any[];
  exam_mappings: any[];
  colleges: any[];
  college_programs: any[];
  exam_results: any[];
  success_stories: any[];
}

const data = intelligenceRawData as IntelligenceData;

export function getCategoriesLocal(): Category[] {
  return data.categories.map(c => {
    const examCount = data.exams.filter(e => e.category_id === c.id).length;
    const courseCount = data.courses.filter(crs => crs.category_id === c.id).length;
    const collegeCount = data.colleges.filter(col => col.category_id === c.id).length;

    return {
      ...c,
      exam_count: examCount || c.exam_count,
      course_count: courseCount || c.course_count,
      college_count: collegeCount || c.college_count
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryDetailsLocal(idOrSlug: string): CategoryDetailPayload {
  const category = data.categories.find(c => c.id === idOrSlug || c.slug === idOrSlug);
  if (!category) {
    throw new Error(`Category not found: ${idOrSlug}`);
  }

  const categoryId = category.id;

  // 1. Exams with structures
  const categoryExams = data.exams
    .filter(e => e.category_id === categoryId)
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(ex => ({
      ...ex,
      structures: data.exam_structures.filter(s => s.exam_id === ex.id)
    }));

  // 2. Eligibility rules
  const eligibilityRules = data.eligibility_rules.filter(r => r.category_id === categoryId);

  // 3. Preparation Strategy
  const prep = data.preparation_strategies.find(p => p.category_id === categoryId);
  const preparation = prep ? {
    ...prep,
    key_phases: typeof prep.key_phases_json === 'string' ? JSON.parse(prep.key_phases_json || '[]') : prep.key_phases_json || [],
    recommended_resources: typeof prep.recommended_resources_json === 'string' ? JSON.parse(prep.recommended_resources_json || '[]') : prep.recommended_resources_json || []
  } : null;

  // 4. Subjects & Syllabus Topics
  const subjects = data.subjects
    .filter(s => s.category_id === categoryId)
    .map(sub => ({
      ...sub,
      topics: data.syllabus_topics
        .filter(t => t.subject_id === sub.id)
        .map(t => ({
          ...t,
          subject_name: sub.name,
          overlap_exams: typeof t.overlap_exams_json === 'string' ? JSON.parse(t.overlap_exams_json || '[]') : t.overlap_exams_json || []
        }))
    }));

  // 5. Courses & Batches
  const courses: Course[] = data.courses
    .filter(crs => crs.category_id === categoryId)
    .map(crs => ({
      ...crs,
      features: typeof crs.features_json === 'string' ? JSON.parse(crs.features_json || '[]') : crs.features_json || [],
      batches: data.course_batches.filter(b => b.course_id === crs.id)
    }));

  // 6. Exam Mappings
  const examMappings = data.exam_mappings.filter(m => m.category_id === categoryId);

  // 7. Colleges & Programs
  const colleges = data.colleges
    .filter(col => col.category_id === categoryId)
    .map(col => ({
      ...col,
      programs: data.college_programs.filter(p => p.college_id === col.id)
    }));

  // 8. Exam Results
  const results = data.exam_results
    .filter(r => r.category_id === categoryId)
    .sort((a, b) => b.academic_year.localeCompare(a.academic_year));

  // 9. Success Stories
  const successStories = data.success_stories.filter(s => s.category_id === categoryId);

  return {
    category,
    exams: categoryExams,
    eligibilityRules,
    preparation,
    subjects,
    courses,
    examMappings,
    colleges,
    results,
    successStories
  };
}

export function calculateFitmentLocal(profile: StudentProfile): FitmentResult {
  const category = data.categories.find(c => c.id === profile.target_category_id || c.slug === profile.target_category_id);
  if (!category) {
    throw new Error('Target category not found');
  }

  const eligibilityRules = data.eligibility_rules.filter(r => r.category_id === category.id);
  const rawCourses = data.courses.filter(crs => crs.category_id === category.id && crs.status === 'Active');
  const courses: Course[] = rawCourses.map(crs => ({
    ...crs,
    features: typeof crs.features_json === 'string' ? JSON.parse(crs.features_json || '[]') : crs.features_json || [],
    batches: data.course_batches.filter(b => b.course_id === crs.id)
  }));

  // Hard filters
  const hardFilterIssues: string[] = [];
  const minPctRule = eligibilityRules.length > 0 ? eligibilityRules[0].min_percentage : 50.0;
  if (profile.graduation_or_12th_pct < minPctRule) {
    hardFilterIssues.push(`Academic score (${profile.graduation_or_12th_pct}%) is below the minimum eligibility cutoff (${minPctRule}%).`);
  }

  if (['mba', 'ssc-railways', 'banking', 'upsc'].includes(category.slug)) {
    if (profile.education_status === '12th Appearing' || profile.education_status === '12th Passed') {
      hardFilterIssues.push(`${category.name} requires a Graduation degree or Final Year standing. 12th standard candidates cannot write this exam cycle directly.`);
    }
  } else if (category.slug === 'pharma') {
    if (!profile.stream.toLowerCase().includes('pharm')) {
      hardFilterIssues.push('Pharma entrances (GPAT/NIPER) strictly require a B.Pharm degree or candidate in final year of B.Pharm.');
    }
  } else if (category.slug === 'judiciary') {
    if (!profile.stream.toLowerCase().includes('law') && !profile.stream.toLowerCase().includes('llb')) {
      hardFilterIssues.push('State Judicial Services require an LL.B. degree recognized by the Bar Council of India.');
    }
  }

  // Soft Factors
  const factors: FitmentFactor[] = [];

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

  let syllabusScore = 50;
  const completedCount = (profile.completed_subjects || []).length;
  if (profile.previous_prep_status === 'Previous Coaching' || profile.previous_prep_status === 'Repeat Attempt') {
    syllabusScore = 85 + Math.min(completedCount * 3, 10);
  } else if (profile.previous_prep_status === 'Self Study (3-6 mo)') {
    syllabusScore = 70 + Math.min(completedCount * 4, 15);
  } else {
    syllabusScore = 60;
  }

  factors.push({
    factor: 'Prior Preparation & Topic Overlap',
    weight: 25,
    score: Math.min(syllabusScore, 100),
    status: syllabusScore >= 75 ? 'optimal' : syllabusScore >= 60 ? 'moderate' : 'gap',
    details: `Status: ${profile.previous_prep_status}. ${completedCount} topics/modules previously touched.`
  });

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

  factors.push({
    factor: 'Language & Mode Preference',
    weight: 15,
    score: 90,
    status: 'optimal',
    details: `Preferred medium: ${profile.language_preference} (${profile.mode_preference}). Matches active batch offerings.`
  });

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

  let recommendedCourse: Course | null = null;
  let alternativeCourses: Course[] = [];

  if (courses.length > 0) {
    if (profile.previous_prep_status === 'Beginner / Zero Prep' || overallScore < 75) {
      recommendedCourse = courses.find(c => c.level === 'Comprehensive' || c.level === 'Foundation') || courses[0];
      alternativeCourses = courses.filter(c => c.id !== recommendedCourse?.id);
    } else {
      recommendedCourse = courses.find(c => c.level === 'Fast-Track' || c.level === 'Comprehensive') || courses[0];
      alternativeCourses = courses.filter(c => c.id !== recommendedCourse?.id);
    }
  }

  const preparationGaps: string[] = [];
  if (profile.weak_subjects && profile.weak_subjects.length > 0) {
    preparationGaps.push(`Weak Areas: ${profile.weak_subjects.join(', ')} require dedicated revision & sectional testing.`);
  }
  if (dailyHours < 4) {
    preparationGaps.push('Daily study hours (under 4 hrs) may create a crunch in mock practice phase.');
  }
  if (profile.previous_prep_status === 'Beginner / Zero Prep') {
    preparationGaps.push('Zero prior preparation requires starting immediately with Level 1 Concept Builders.');
  }

  const recommendedDailyPlan = `${dailyHours} Hours/Day Allocation: ${Math.max(1, Math.round(dailyHours * 0.45))}h Core Theory & Video Lessons | ${Math.max(1, Math.round(dailyHours * 0.35))}h Practice Drills & PYQs | ${Math.max(0.5, Math.round(dailyHours * 0.2 * 10) / 10)}h Daily Revision & Doubt Resolution.`;

  const backupMappings = data.exam_mappings.filter(m => m.category_id === category.id);
  const backupExams = Array.from(new Set(backupMappings.map(m => m.secondary_exam_code)));

  return {
    is_eligible: isEligible,
    hard_filter_issues: hardFilterIssues,
    overall_fitment_score: overallScore,
    fitment_tier: fitmentTier,
    recommended_course: recommendedCourse,
    alternative_courses: alternativeCourses,
    factors,
    preparation_gaps: preparationGaps,
    recommended_daily_plan: recommendedDailyPlan,
    backup_exams_available: backupExams
  };
}

export function generatePitchLocal(profile: StudentProfile, fitment: FitmentResult): CounsellorPitchResponse {
  const category = data.categories.find(c => c.id === profile.target_category_id || c.slug === profile.target_category_id) || {
    id: 'general',
    name: 'Competitive Entrance',
    slug: 'general'
  };

  const successStories = data.success_stories.filter(s => s.category_id === category.id).slice(0, 2);

  const studentName = profile.student_name || 'Candidate';
  const targetExams = profile.target_exam_codes?.join(', ') || category.name;
  const courseName = fitment.recommended_course?.name || `${category.name} Comprehensive Batch`;
  const weakSubjects = profile.weak_subjects?.join(', ') || 'Quantitative Aptitude & Time Management';
  const strongSubjects = profile.strong_subjects?.join(', ') || 'Logical Thinking';
  const dailyHours = profile.daily_hours_available || 4;

  const proofStory = successStories.length > 0
    ? `${successStories[0].student_identifier} (${successStories[0].background_stream}), who achieved ${successStories[0].rank_or_score} and joined ${successStories[0].college_or_post}`
    : 'over 340+ students scoring in the 99th percentile from similar academic backgrounds';

  const pitchSections = {
    opening: `Hello ${studentName}! I noticed you're exploring admissions for ${category.name} (${targetExams}). I’ve thoroughly analyzed your academic profile in ${profile.stream} (${profile.graduation_or_12th_pct}%), and I want to share a transparent, realistic roadmap with you today.`,

    requirement_understanding: `You are aiming for the ${profile.target_academic_year} exam cycle, targeting premier institutions through ${targetExams}. With your current ${profile.education_status} schedule, you have roughly ${dailyHours} focused study hours available per day.`,

    current_preparation_analysis: `Your starting preparation status is **${profile.previous_prep_status}**. You have natural strengths in ${strongSubjects}, which gives us a solid headstart on foundational concepts.`,

    gap_identification: `To secure a top percentile in ${targetExams}, the biggest hurdle isn't general knowledge—it's precision and speed in **${weakSubjects}**. Furthermore, transitioning to rigorous national-level timed test series is critical to avoid negative marking under exam pressure.`,

    recommended_solution: `Based on your exact baseline, our academic board specifically recommends the **${courseName}**. This batch is tailored for students who need step-by-step concept mastery combined with high-frequency speed drills.`,

    why_it_fits: `This course fits your profile with a **${fitment.overall_fitment_score}% Fitment Score** because:
1. The curriculum allocates 40+ dedicated hours to ${weakSubjects} with basic-to-advanced bridging.
2. The ${profile.language_preference} live schedule integrates seamlessly with your ${dailyHours} hours/day bandwidth.
3. You receive 1-on-1 personalized error logging and mentor doubt clearing after every test.`,

    proof_of_results: `We have guided numerous students from your exact discipline. For example, ${proofStory}, following the same modular roadmap.`,

    exam_coverage_and_backups: `By preparing for ${targetExams} in this structured batch, you also gain 85%+ syllabus coverage for backup examinations like **${fitment.backup_exams_available?.join(', ')}**, ensuring you have multiple top-tier admission options.`,

    genuine_differentiation: `Unlike generic video repositories, you get:
- Real-time interactive faculty classes (no pre-recorded dumps)
- AI-driven sectional performance analytics that pinpoint your accuracy drops
- Regular GD-PI and interview mentorship directly from alumni.`,

    objection_handling: [
      {
        objection: '1. "Can I just do self-study from YouTube and reference books?"',
        counsellor_response: 'Self-study builds knowledge, but entrance exams are won on time management, question selection discipline, and real-time benchmarking among 200,000+ competitors. Structured test series and doubt clearing cut preparation time by 50%.'
      },
      {
        objection: '2. "Is the course fee justifiable within my budget?"',
        counsellor_response: 'When you compare the fee against the career trajectory and ROI of premier institutions (where average campus placements exceed ₹18–34 LPA), this program is an investment that pays for itself in the very first month of your career. Flexible EMI options are also enabled.'
      },
      {
        objection: '3. "I am worried about my weak subject / maths background."',
        counsellor_response: 'Over 40% of our top rankers were non-engineers or students with math anxiety. Our Foundation Module starts from Class 8-10 level basics before elevating you to advanced application.'
      }
    ],

    closing_and_next_step: `I want you to experience the teaching methodology for yourself. Let’s book a **Complimentary Diagnostic Mock Test & Faculty Demo Session** for tomorrow so you can see your current score breakdown with zero upfront commitment.`
  };

  return {
    student_name: studentName,
    target_category: category.name,
    target_exam: targetExams,
    recommended_course_name: courseName,
    pitch_sections: pitchSections
  };
}
