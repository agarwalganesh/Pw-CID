import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { StudentProfile, FitmentResult, CounsellorPitchResponse } from '../../src/types/index.js';

export const pitchRouter = Router();

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

pitchRouter.post('/generate', async (req: Request, res: Response) => {
  try {
    const { profile, fitment }: { profile: StudentProfile; fitment: FitmentResult } = req.body;
    const db = await getDb();

    // Fetch Category & Success Stories for factual proof
    const catResult = db.exec(`SELECT * FROM categories WHERE id = '${profile.target_category_id}' OR slug = '${profile.target_category_id}'`);
    const category = resultToObjects(catResult)[0] || { name: 'Competitive Entrance', slug: 'general' };

    const sucResult = db.exec(`SELECT * FROM success_stories WHERE category_id = '${category.id}' LIMIT 2`);
    const successStories = resultToObjects(sucResult);

    const studentName = profile.student_name || 'Candidate';
    const targetExams = profile.target_exam_codes?.join(', ') || category.name;
    const courseName = fitment.recommended_course?.name || `${category.name} Comprehensive Batch`;
    const weakSubjects = profile.weak_subjects?.join(', ') || 'Quantitative Aptitude & Time Management';
    const strongSubjects = profile.strong_subjects?.join(', ') || 'Logical Thinking';
    const dailyHours = profile.daily_hours_available || 4;

    const proofStory = successStories.length > 0
      ? `${successStories[0].student_identifier} (${successStories[0].background_stream}), who achieved ${successStories[0].rank_or_score} and joined ${successStories[0].college_or_post}`
      : `over 340+ students scoring in the 99th percentile from similar academic backgrounds`;

    // Construct the 11 Structured Pitch Sections
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
          counsellor_response: `When you compare the fee against the career trajectory and ROI of premier institutions (where average campus placements exceed ₹18–34 LPA), this program is an investment that pays for itself in the very first month of your career. Flexible EMI options are also enabled.`
        },
        {
          objection: '3. "I am worried about my weak subject / maths background."',
          counsellor_response: `Over 40% of our top rankers were non-engineers or students with math anxiety. Our Foundation Module starts from Class 8-10 level basics before elevating you to advanced application.`
        }
      ],

      closing_and_next_step: `I want you to experience the teaching methodology for yourself. Let’s book a **Complimentary Diagnostic Mock Test & Faculty Demo Session** for tomorrow so you can see your current score breakdown with zero upfront commitment.`
    };

    const pitchResponse: CounsellorPitchResponse = {
      student_name: studentName,
      target_category: category.name,
      target_exam: targetExams,
      recommended_course_name: courseName,
      pitch_sections: pitchSections
    };

    res.json({ success: true, data: pitchResponse });
  } catch (error: any) {
    console.error('Error generating counsellor pitch:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
