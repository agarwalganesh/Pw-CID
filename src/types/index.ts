export type DataStatus = 'DEMO' | 'VERIFIED' | 'LIVE' | 'EXPIRED';

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  exam_count: number;
  course_count: number;
  college_count: number;
  data_status: DataStatus;
  source: string;
  academic_year: string;
  last_updated: string;
}

export interface ExamStructure {
  id: string;
  exam_id: string;
  tier_name: string;
  sections_json: string; // JSON parsed into Array<{ name: string; questions: number; marks: number; duration: number }>
  total_marks: number;
  total_questions: number;
  marking_scheme: string;
  duration_minutes: number;
}

export interface Exam {
  id: string;
  category_id: string;
  code: string;
  name: string;
  conducting_body: string;
  frequency: string;
  mode: string;
  duration_minutes: number;
  exam_level: string;
  official_website: string;
  data_status: DataStatus;
  academic_year: string;
  structures?: ExamStructure[];
}

export interface EligibilityRule {
  id: string;
  category_id: string;
  exam_id?: string;
  exam_code?: string;
  min_qualification: string;
  min_percentage: number;
  age_limit_min?: number;
  age_limit_max?: number;
  attempts_limit?: string;
  stream_requirements: string;
  special_conditions?: string;
  data_status: DataStatus;
  source: string;
  academic_year: string;
}

export interface PreparationStrategy {
  id: string;
  category_id: string;
  recommended_timeline_months: number;
  daily_study_hours: number;
  key_phases: Array<{ phase: string; duration: string; focus: string }>;
  recommended_resources: string[];
  mock_test_frequency: string;
  difficulty_rating: string;
}

export interface SyllabusTopic {
  id: string;
  subject_id: string;
  subject_name: string;
  name: string;
  description: string;
  importance_level: 'High' | 'Medium' | 'Low';
  expected_questions: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  overlap_exams: string[];
}

export interface Subject {
  id: string;
  category_id: string;
  exam_id?: string;
  name: string;
  code: string;
  description: string;
  weightage_percentage: number;
  topics: SyllabusTopic[];
}

export interface CourseBatch {
  id: string;
  course_id: string;
  batch_name: string;
  start_date: string;
  end_date: string;
  seat_capacity: number;
  enrolled_count: number;
  enrollment_status: 'Open' | 'Filling Fast' | 'Closed' | 'Upcoming';
  academic_year: string;
}

export interface Course {
  id: string;
  category_id: string;
  target_exam_id: string;
  target_exam_code: string;
  name: string;
  code: string;
  level: 'Foundation' | 'Comprehensive' | 'Crash Course' | 'Test Series' | 'Fast-Track';
  language: 'English' | 'Hinglish' | 'Hindi';
  duration_months: number;
  mode: 'Live Online' | 'Hybrid Classroom' | 'Self-Paced Recorded';
  fees_inr: number;
  target_student_profile: string;
  features: string[];
  status: 'Active' | 'Upcoming' | 'Archived';
  data_status: DataStatus;
  batches: CourseBatch[];
}

export interface ExamMapping {
  id: string;
  primary_exam_code: string;
  primary_exam_name: string;
  secondary_exam_code: string;
  secondary_exam_name: string;
  syllabus_overlap_percentage: number;
  difficulty_comparison: string;
  preparation_strategy: string;
}

export interface CollegeProgram {
  id: string;
  college_id: string;
  exam_id?: string;
  exam_code: string;
  program_name: string;
  degree_level: string;
  seats: number;
  duration_years: number;
  avg_package_lpa?: number;
  median_package_lpa?: number;
  exam_cutoff_percentile?: string;
  exam_cutoff_rank?: string;
  academic_cutoff?: string;
  selection_process?: string;
  academic_year: string;
}

export interface College {
  id: string;
  category_id: string;
  name: string;
  code: string;
  location: string;
  institution_type: 'Government' | 'Private' | 'Autonomous' | 'Institute of National Importance';
  accreditation: string;
  website: string;
  data_status: DataStatus;
  source: string;
  programs: CollegeProgram[];
}

export interface ExamResult {
  id: string;
  category_id: string;
  exam_code: string;
  academic_year: string;
  result_metric_type: 'Selections' | 'AIR Top 100' | '99+ Percentile' | 'Cutoff Score' | 'Qualifying Rate';
  metric_value: string;
  details: string;
  source: string;
  data_status: DataStatus;
  verified_by: string;
}

export interface SuccessStory {
  id: string;
  category_id: string;
  exam_code: string;
  student_identifier: string;
  academic_year: string;
  rank_or_score: string;
  college_or_post: string;
  enrolled_course: string;
  background_stream: string;
  testimonial_snippet: string;
  data_status: DataStatus;
  source: string;
}

export interface CategoryDetailPayload {
  category: Category;
  exams: Exam[];
  eligibilityRules: EligibilityRule[];
  preparation: PreparationStrategy | null;
  subjects: Subject[];
  courses: Course[];
  examMappings: ExamMapping[];
  colleges: College[];
  results: ExamResult[];
  successStories: SuccessStory[];
}

export interface StudentProfile {
  student_name: string;
  phone?: string;
  email?: string;
  target_category_id: string;
  target_exam_codes: string[];
  education_status: '12th Appearing' | '12th Passed' | 'Graduation Final Year' | 'Graduated' | 'Post-Graduated';
  stream: string;
  graduation_or_12th_pct: number;
  previous_prep_status: 'Beginner / Zero Prep' | 'Self Study (3-6 mo)' | 'Previous Coaching' | 'Repeat Attempt';
  completed_subjects: string[];
  strong_subjects: string[];
  weak_subjects: string[];
  daily_hours_available: number;
  target_academic_year: string;
  language_preference: 'English' | 'Hinglish' | 'Hindi';
  mode_preference: 'Live Online' | 'Hybrid Classroom' | 'Self-Paced Recorded';
}

export interface FitmentFactor {
  factor: string;
  weight: number;
  score: number; // 0 - 100
  status: 'optimal' | 'moderate' | 'gap';
  details: string;
}

export interface FitmentResult {
  is_eligible: boolean;
  hard_filter_issues: string[];
  overall_fitment_score: number; // 0 - 100
  fitment_tier: 'High Fitment (Recommended)' | 'Moderate Fitment (Needs Foundation)' | 'Low Fitment / Ineligible';
  recommended_course: Course | null;
  alternative_courses: Course[];
  factors: FitmentFactor[];
  preparation_gaps: string[];
  recommended_daily_plan: string;
  backup_exams_available: string[];
}

export interface CounsellorPitchResponse {
  student_name: string;
  target_category: string;
  target_exam: string;
  recommended_course_name: string;
  pitch_sections: {
    opening: string;
    requirement_understanding: string;
    current_preparation_analysis: string;
    gap_identification: string;
    recommended_solution: string;
    why_it_fits: string;
    proof_of_results: string;
    exam_coverage_and_backups: string;
    genuine_differentiation: string;
    objection_handling: Array<{ objection: string; counsellor_response: string }>;
    closing_and_next_step: string;
  };
}
