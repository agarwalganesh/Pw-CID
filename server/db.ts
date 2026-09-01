import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'edtech.sqlite');

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE)) {
    const filebuffer = fs.readFileSync(DB_FILE);
    dbInstance = new SQL.Database(filebuffer);
  } else {
    dbInstance = new SQL.Database();
  }

  initSchema(dbInstance);
  saveDb();
  return dbInstance;
}

export function saveDb(): void {
  if (!dbInstance) return;
  const data = dbInstance.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_FILE, buffer);
}

function initSchema(db: Database): void {
  db.run(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      exam_count INTEGER DEFAULT 0,
      course_count INTEGER DEFAULT 0,
      college_count INTEGER DEFAULT 0,
      data_status TEXT DEFAULT 'DEMO',
      source TEXT DEFAULT 'Official Notification Archive / Demo Dataset',
      academic_year TEXT DEFAULT '2025-2026',
      last_updated TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exams (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      conducting_body TEXT NOT NULL,
      frequency TEXT NOT NULL,
      mode TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      exam_level TEXT NOT NULL,
      official_website TEXT NOT NULL,
      data_status TEXT DEFAULT 'DEMO',
      academic_year TEXT DEFAULT '2025-2026',
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exam_structures (
      id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL,
      tier_name TEXT NOT NULL,
      sections_json TEXT NOT NULL,
      total_marks INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      marking_scheme TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS eligibility_rules (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      exam_id TEXT,
      exam_code TEXT,
      min_qualification TEXT NOT NULL,
      min_percentage REAL NOT NULL,
      age_limit_min INTEGER,
      age_limit_max INTEGER,
      attempts_limit TEXT,
      stream_requirements TEXT NOT NULL,
      special_conditions TEXT,
      data_status TEXT DEFAULT 'DEMO',
      source TEXT NOT NULL,
      academic_year TEXT DEFAULT '2025-2026',
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS preparation_strategies (
      id TEXT PRIMARY KEY,
      category_id TEXT UNIQUE NOT NULL,
      recommended_timeline_months INTEGER NOT NULL,
      daily_study_hours REAL NOT NULL,
      key_phases_json TEXT NOT NULL,
      recommended_resources_json TEXT NOT NULL,
      mock_test_frequency TEXT NOT NULL,
      difficulty_rating TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      exam_id TEXT,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      description TEXT NOT NULL,
      weightage_percentage REAL NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS syllabus_topics (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      importance_level TEXT NOT NULL,
      expected_questions TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      overlap_exams_json TEXT NOT NULL,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      target_exam_id TEXT NOT NULL,
      target_exam_code TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      level TEXT NOT NULL,
      language TEXT NOT NULL,
      duration_months INTEGER NOT NULL,
      mode TEXT NOT NULL,
      fees_inr REAL NOT NULL,
      target_student_profile TEXT NOT NULL,
      features_json TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      data_status TEXT DEFAULT 'DEMO',
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS course_batches (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      batch_name TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      seat_capacity INTEGER NOT NULL,
      enrolled_count INTEGER NOT NULL,
      enrollment_status TEXT NOT NULL,
      academic_year TEXT DEFAULT '2025-2026',
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exam_mappings (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      primary_exam_code TEXT NOT NULL,
      primary_exam_name TEXT NOT NULL,
      secondary_exam_code TEXT NOT NULL,
      secondary_exam_name TEXT NOT NULL,
      syllabus_overlap_percentage REAL NOT NULL,
      difficulty_comparison TEXT NOT NULL,
      preparation_strategy TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS colleges (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      location TEXT NOT NULL,
      institution_type TEXT NOT NULL,
      accreditation TEXT NOT NULL,
      website TEXT NOT NULL,
      data_status TEXT DEFAULT 'DEMO',
      source TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS college_programs (
      id TEXT PRIMARY KEY,
      college_id TEXT NOT NULL,
      exam_id TEXT,
      exam_code TEXT NOT NULL,
      program_name TEXT NOT NULL,
      degree_level TEXT NOT NULL,
      seats INTEGER NOT NULL,
      duration_years INTEGER NOT NULL,
      avg_package_lpa REAL,
      median_package_lpa REAL,
      exam_cutoff_percentile TEXT,
      exam_cutoff_rank TEXT,
      academic_cutoff TEXT,
      selection_process TEXT,
      academic_year TEXT DEFAULT '2025-2026',
      FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exam_results (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      exam_code TEXT NOT NULL,
      academic_year TEXT NOT NULL,
      result_metric_type TEXT NOT NULL,
      metric_value TEXT NOT NULL,
      details TEXT NOT NULL,
      source TEXT NOT NULL,
      data_status TEXT DEFAULT 'DEMO',
      verified_by TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS success_stories (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      exam_code TEXT NOT NULL,
      student_identifier TEXT NOT NULL,
      academic_year TEXT NOT NULL,
      rank_or_score TEXT NOT NULL,
      college_or_post TEXT NOT NULL,
      enrolled_course TEXT NOT NULL,
      background_stream TEXT NOT NULL,
      testimonial_snippet TEXT NOT NULL,
      data_status TEXT DEFAULT 'DEMO',
      source TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
  `);
}
