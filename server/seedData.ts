import { Database } from 'sql.js';
import { saveDb } from './db.js';

export async function seedDatabase(db: Database): Promise<void> {
  const result = db.exec("SELECT COUNT(*) as count FROM categories");
  if (result.length > 0 && result[0].values.length > 0 && (result[0].values[0][0] as number) > 0) {
    // Database already seeded
    return;
  }

  // Define All 11 Categories
  const categories = [
    {
      id: 'cat-mba',
      slug: 'mba',
      name: 'MBA',
      tagline: 'Master of Business Administration Entrance Suite',
      description: 'Comprehensive entrance preparation for India’s premier management institutions including IIMs, XLRI, FMS Delhi, SPJIMR, and top Tier-1 B-Schools.',
      icon: 'Briefcase',
      exam_count: 5,
      course_count: 4,
      college_count: 6,
      data_status: 'DEMO',
      source: 'CAT 2024 Information Bulletin / Official IIM Portals (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-clat',
      slug: 'clat',
      name: 'CLAT',
      tagline: 'Common Law Admission Test & Premier Law Entrances',
      description: 'National level entrance examination for admission into 26 National Law Universities (NLUs) and top law institutes offering 5-Year Integrated LLB & LLM programs.',
      icon: 'Scale',
      exam_count: 3,
      course_count: 3,
      college_count: 5,
      data_status: 'DEMO',
      source: 'Consortium of NLUs Notification (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-csir-jam',
      slug: 'csir-jam',
      name: 'CSIR-JAM',
      tagline: 'CSIR NET & IIT JAM Joint Admission Test for M.Sc.',
      description: 'National scientific examinations for M.Sc., Joint M.Sc.-Ph.D. at IITs/IISc and Junior Research Fellowship (JRF) & Lectureship across physical, chemical, and life sciences.',
      icon: 'Atom',
      exam_count: 2,
      course_count: 3,
      college_count: 5,
      data_status: 'DEMO',
      source: 'IIT JAM Organizing Committee / CSIR HRDG Portal (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-pharma',
      slug: 'pharma',
      name: 'PHARMA',
      tagline: 'GPAT & NIPER JEE Pharmacy Entrance Examinations',
      description: 'Specialized national examinations for M.Pharm, MS (Pharm), and Ph.D. admissions across NIPERs, ICT Mumbai, BITS Pilani, and state pharmacy faculties.',
      icon: 'Pill',
      exam_count: 3,
      course_count: 2,
      college_count: 4,
      data_status: 'DEMO',
      source: 'NBEMS GPAT Notification / NIPER JEE Council (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-ugc-net',
      slug: 'ugc-net',
      name: 'UGC NET',
      tagline: 'National Eligibility Test for JRF & Assistant Professorship',
      description: 'NTA-administered eligibility test across 83 disciplines determining eligibility for Junior Research Fellowship and appointment as Assistant Professor in Indian Universities.',
      icon: 'GraduationCap',
      exam_count: 2,
      course_count: 3,
      college_count: 5,
      data_status: 'DEMO',
      source: 'NTA UGC NET Information Bulletin (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-ca',
      slug: 'ca',
      name: 'CA',
      tagline: 'Chartered Accountancy Professional Qualification (ICAI)',
      description: 'Three-tiered professional accounting qualification by ICAI comprising CA Foundation, CA Intermediate, and CA Final with integrated practical training.',
      icon: 'FileSpreadsheet',
      exam_count: 3,
      course_count: 4,
      college_count: 3,
      data_status: 'DEMO',
      source: 'ICAI New Scheme of Education and Training (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-ssc-railways',
      slug: 'ssc-railways',
      name: 'SSC + Railways',
      tagline: 'Staff Selection Commission & Railway Recruitment Board Suite',
      description: 'Comprehensive preparation for central government recruitment examinations including SSC CGL, CHSL, MTS, GD, alongside RRB NTPC, Group D, and ALP technical cadre.',
      icon: 'Train',
      exam_count: 7,
      course_count: 4,
      college_count: 4,
      data_status: 'DEMO',
      source: 'SSC & RRB Annual Exam Calendar (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-gate-oa',
      slug: 'gate-oa',
      name: 'GATE OA',
      tagline: 'Graduate Aptitude Test in Engineering & Data Analytics',
      description: 'National examination testing technical mastery in Engineering (CS, DA, EC, EE, ME, CE) for M.Tech admissions in IITs/IISc and direct recruitment in premier PSUs.',
      icon: 'Cpu',
      exam_count: 4,
      course_count: 3,
      college_count: 6,
      data_status: 'DEMO',
      source: 'GATE Committee Official Brochure (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-upsc',
      slug: 'upsc',
      name: 'UPSC',
      tagline: 'Civil Services Examination & Central Defense Services',
      description: 'India’s premier constitutional recruitment exam selecting officers for the Indian Administrative Service (IAS), Indian Police Service (IPS), IFS, and Central Group A Services.',
      icon: 'Landmark',
      exam_count: 3,
      course_count: 4,
      college_count: 3,
      data_status: 'DEMO',
      source: 'UPSC CSE Examination Rules & Gazette Notification (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-judiciary',
      slug: 'judiciary',
      name: 'Judiciary',
      tagline: 'State Judicial Services (Civil Judge Junior Division)',
      description: 'State High Court-administered competitive examinations across Delhi, UP, Rajasthan, MP, and Haryana for entry into Subordinate Judicial Services.',
      icon: 'Shield',
      exam_count: 4,
      course_count: 3,
      college_count: 4,
      data_status: 'DEMO',
      source: 'High Court Official Recruitment Notifications (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    },
    {
      id: 'cat-banking',
      slug: 'banking',
      name: 'Banking',
      tagline: 'SBI, IBPS, RBI Grade B & Regulatory Body Exams',
      description: 'Recruitment pathway for Probationary Officers (PO), Clerks, and Specialist Officers across Public Sector Banks, State Bank of India, and Reserve Bank of India.',
      icon: 'Building2',
      exam_count: 5,
      course_count: 4,
      college_count: 4,
      data_status: 'DEMO',
      source: 'IBPS & SBI Official Recruitment Notices (Seed)',
      academic_year: '2025-2026',
      last_updated: '2025-01-15'
    }
  ];

  function runSql(query: string, params: any[]) {
    const sanitized = params.map(p => (p === undefined ? null : p));
    db.run(query, sanitized);
  }

  for (const cat of categories) {
    runSql(
      `INSERT INTO categories (id, slug, name, tagline, description, icon, exam_count, course_count, college_count, data_status, source, academic_year, last_updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cat.id, cat.slug, cat.name, cat.tagline, cat.description, cat.icon, cat.exam_count, cat.course_count, cat.college_count, cat.data_status, cat.source, cat.academic_year, cat.last_updated]
    );
  }

  // --- SEED EXAMS ---
  const exams = [
    // MBA
    { id: 'ex-cat', category_id: 'cat-mba', code: 'CAT', name: 'Common Admission Test', conducting_body: 'IIMs (Rotational)', frequency: 'Once a Year (Nov)', mode: 'Computer Based Test (CBT)', duration_minutes: 120, exam_level: 'National (Tier 1)', official_website: 'https://iimcat.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-xat', category_id: 'cat-mba', code: 'XAT', name: 'Xavier Aptitude Test', conducting_body: 'XLRI Jamshedpur', frequency: 'Once a Year (Jan)', mode: 'CBT', duration_minutes: 210, exam_level: 'National (Tier 1)', official_website: 'https://xatonline.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-cmat', category_id: 'cat-mba', code: 'CMAT', name: 'Common Management Admission Test', conducting_body: 'NTA', frequency: 'Once a Year (May)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tier 2/3)', official_website: 'https://cmat.nta.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-mat', category_id: 'cat-mba', code: 'MAT', name: 'Management Aptitude Test', conducting_body: 'AIMA', frequency: '4 Times a Year (Feb/May/Sep/Dec)', mode: 'CBT/PBT/IBT', duration_minutes: 120, exam_level: 'National', official_website: 'https://mat.aima.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-snap', category_id: 'cat-mba', code: 'SNAP', name: 'Symbiosis National Aptitude Test', conducting_body: 'SIU Pune', frequency: '3 Slots in Dec', mode: 'CBT', duration_minutes: 60, exam_level: 'University/National', official_website: 'https://snaptest.org', data_status: 'DEMO', academic_year: '2025-2026' },

    // CLAT
    { id: 'ex-clat-ug', category_id: 'cat-clat', code: 'CLAT-UG', name: 'CLAT Under-Graduate', conducting_body: 'Consortium of NLUs', frequency: 'Once a Year (Dec)', mode: 'Offline Pen & Paper (OMR)', duration_minutes: 120, exam_level: 'National', official_website: 'https://consortiumofnlus.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-clat-pg', category_id: 'cat-clat', code: 'CLAT-PG', name: 'CLAT Post-Graduate (LLM)', conducting_body: 'Consortium of NLUs', frequency: 'Once a Year (Dec)', mode: 'Offline OMR', duration_minutes: 120, exam_level: 'National', official_website: 'https://consortiumofnlus.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ailet', category_id: 'cat-clat', code: 'AILET', name: 'All India Law Entrance Test', conducting_body: 'NLU Delhi', frequency: 'Once a Year (Dec)', mode: 'Offline OMR', duration_minutes: 120, exam_level: 'National', official_website: 'https://nationallawuniversitydelhi.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // CSIR-JAM
    { id: 'ex-csir-net', category_id: 'cat-csir-jam', code: 'CSIR-NET', name: 'CSIR UGC NET (Science Streams)', conducting_body: 'NTA / CSIR', frequency: 'Twice a Year (June/Dec)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://csirnet.nta.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-iit-jam', category_id: 'cat-csir-jam', code: 'IIT-JAM', name: 'Joint Admission Test for Masters', conducting_body: 'IITs (Rotational)', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://jam.iitd.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // PHARMA
    { id: 'ex-gpat', category_id: 'cat-pharma', code: 'GPAT', name: 'Graduate Pharmacy Aptitude Test', conducting_body: 'NBEMS', frequency: 'Once a Year (June)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://natboard.edu.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-niper', category_id: 'cat-pharma', code: 'NIPER-JEE', name: 'NIPER Joint Entrance Examination', conducting_body: 'NIPER Council', frequency: 'Once a Year (July)', mode: 'CBT', duration_minutes: 120, exam_level: 'National (Tier 1 Pharma)', official_website: 'https://niperguwahati.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // UGC NET
    { id: 'ex-ugc-net-jrf', category_id: 'cat-ugc-net', code: 'UGC-NET', name: 'UGC National Eligibility Test (JRF/Asst Prof)', conducting_body: 'NTA', frequency: 'Twice a Year (June/Dec)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://ugcnet.nta.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // CA
    { id: 'ex-ca-found', category_id: 'cat-ca', code: 'CA-FOUNDATION', name: 'CA Foundation Examination', conducting_body: 'ICAI', frequency: 'Thrice a Year (Jan/June/Sep)', mode: 'Offline Subjective + Objective', duration_minutes: 180, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ca-inter', category_id: 'cat-ca', code: 'CA-INTER', name: 'CA Intermediate Examination (6 Papers)', conducting_body: 'ICAI', frequency: 'Thrice a Year', mode: 'Offline Subjective + Case MCQs', duration_minutes: 180, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ca-final', category_id: 'cat-ca', code: 'CA-FINAL', name: 'CA Final Examination (6 Papers)', conducting_body: 'ICAI', frequency: 'Twice a Year (May/Nov)', mode: 'Offline Advanced Subjective', duration_minutes: 240, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },

    // SSC + Railways
    { id: 'ex-ssc-cgl', category_id: 'cat-ssc-railways', code: 'SSC-CGL', name: 'Combined Graduate Level Exam', conducting_body: 'Staff Selection Commission', frequency: 'Once a Year', mode: 'Tier 1 & Tier 2 CBT', duration_minutes: 60, exam_level: 'Central Govt Group B/C', official_website: 'https://ssc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ssc-chsl', category_id: 'cat-ssc-railways', code: 'SSC-CHSL', name: 'Combined Higher Secondary Level (10+2)', conducting_body: 'SSC', frequency: 'Once a Year', mode: 'CBT + Skill Test', duration_minutes: 60, exam_level: 'Central Govt Group C', official_website: 'https://ssc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rrb-ntpc', category_id: 'cat-ssc-railways', code: 'RRB-NTPC', name: 'Non-Technical Popular Categories', conducting_body: 'Railway Recruitment Control Board', frequency: 'Notification Based', mode: 'CBT 1 & CBT 2 + CBAT', duration_minutes: 90, exam_level: 'Indian Railways Central', official_website: 'https://indianrailways.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rrb-alp', category_id: 'cat-ssc-railways', code: 'RRB-ALP', name: 'Assistant Loco Pilot & Technician', conducting_body: 'RRB', frequency: 'Notification Based', mode: 'CBT 1 & CBT 2 (Technical)', duration_minutes: 90, exam_level: 'Indian Railways Technical', official_website: 'https://indianrailways.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // GATE OA
    { id: 'ex-gate-cs', category_id: 'cat-gate-oa', code: 'GATE-CS', name: 'GATE Computer Science & Information Tech', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tech/PSU)', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-gate-da', category_id: 'cat-gate-oa', code: 'GATE-DA', name: 'GATE Data Science and Artificial Intelligence', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tech/PSU)', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-gate-ec', category_id: 'cat-gate-oa', code: 'GATE-EC', name: 'GATE Electronics & Communication', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // UPSC
    { id: 'ex-upsc-cse', category_id: 'cat-upsc', code: 'UPSC-CSE', name: 'Civil Services Examination (IAS/IPS/IFS)', conducting_body: 'Union Public Service Commission', frequency: 'Once a Year (May-June Prelims)', mode: 'Prelims (OMR) -> Mains (Subjective) -> Interview', duration_minutes: 120, exam_level: 'Premier Constitutional', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-upsc-cds', category_id: 'cat-upsc', code: 'UPSC-CDS', name: 'Combined Defence Services Examination', conducting_body: 'UPSC', frequency: 'Twice a Year (CDS I & II)', mode: 'Offline + SSB Interview', duration_minutes: 120, exam_level: 'Defence Commissioned', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // Judiciary
    { id: 'ex-djs', category_id: 'cat-judiciary', code: 'DJS', name: 'Delhi Judicial Service Examination', conducting_body: 'Delhi High Court', frequency: 'Annual / Biennial', mode: 'Prelims (MCQ) -> Mains (Law Subjective) -> Viva', duration_minutes: 150, exam_level: 'State Judicial Officer', official_website: 'https://delhihighcourt.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-uppcs-j', category_id: 'cat-judiciary', code: 'UP-PCS-J', name: 'UP Judicial Service Civil Judge (JD)', conducting_body: 'UPPSC', frequency: 'Periodic Notification', mode: 'Prelims -> Mains -> Interview', duration_minutes: 120, exam_level: 'State Judicial Officer', official_website: 'https://uppsc.up.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rjs', category_id: 'cat-judiciary', code: 'RJS', name: 'Rajasthan Judicial Service Exam', conducting_body: 'Rajasthan High Court', frequency: 'Annual', mode: 'Prelims -> Mains -> Interview', duration_minutes: 120, exam_level: 'State Judicial Officer', official_website: 'https://hcraj.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // Banking
    { id: 'ex-sbi-po', category_id: 'cat-banking', code: 'SBI-PO', name: 'State Bank of India Probationary Officer', conducting_body: 'SBI Central Recruitment Board', frequency: 'Once a Year (Oct-Nov)', mode: 'Prelims CBT -> Mains CBT + Descriptive -> GE & PI', duration_minutes: 60, exam_level: 'Premier Public Banking', official_website: 'https://sbi.co.in/careers', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ibps-po', category_id: 'cat-banking', code: 'IBPS-PO', name: 'IBPS PO/Management Trainee (11 PSBs)', conducting_body: 'IBPS Mumbai', frequency: 'Once a Year (Aug-Oct)', mode: 'Prelims CBT -> Mains CBT -> Interview', duration_minutes: 60, exam_level: 'Public Sector Banking', official_website: 'https://ibps.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rbi-b', category_id: 'cat-banking', code: 'RBI-GRADE-B', name: 'RBI Officers in Grade B (General)', conducting_body: 'Reserve Bank of India Services Board', frequency: 'Once a Year', mode: 'Phase 1 CBT -> Phase 2 (ESI + FM + Eng) -> Interview', duration_minutes: 120, exam_level: 'Apex Central Bank', official_website: 'https://rbi.org.in', data_status: 'DEMO', academic_year: '2025-2026' }
  ];

  for (const ex of exams) {
    runSql(
      `INSERT INTO exams (id, category_id, code, name, conducting_body, frequency, mode, duration_minutes, exam_level, official_website, data_status, academic_year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ex.id, ex.category_id, ex.code, ex.name, ex.conducting_body, ex.frequency, ex.mode, ex.duration_minutes, ex.exam_level, ex.official_website, ex.data_status, ex.academic_year]
    );
  }

  // --- SEED EXAM STRUCTURES ---
  const structures = [
    {
      id: 'str-cat',
      exam_id: 'ex-cat',
      tier_name: 'CAT Computer Based Test (Single Slot)',
      sections_json: JSON.stringify([
        { name: 'VARC (Verbal Ability & Reading Comprehension)', questions: 24, marks: 72, duration: 40 },
        { name: 'DILR (Data Interpretation & Logical Reasoning)', questions: 20, marks: 60, duration: 40 },
        { name: 'QA (Quantitative Aptitude)', questions: 22, marks: 66, duration: 40 }
      ]),
      total_marks: 198,
      total_questions: 66,
      marking_scheme: '+3 for Correct, -1 for Incorrect MCQ, 0 for Non-MCQ (TITA)',
      duration_minutes: 120
    },
    {
      id: 'str-clat-ug',
      exam_id: 'ex-clat-ug',
      tier_name: 'CLAT UG Common Test Paper',
      sections_json: JSON.stringify([
        { name: 'English Language', questions: 24, marks: 24, duration: 25 },
        { name: 'Current Affairs & General Knowledge', questions: 30, marks: 30, duration: 20 },
        { name: 'Legal Reasoning', questions: 32, marks: 32, duration: 35 },
        { name: 'Logical Reasoning', questions: 24, marks: 24, duration: 25 },
        { name: 'Quantitative Techniques', questions: 10, marks: 10, duration: 15 }
      ]),
      total_marks: 120,
      total_questions: 120,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect MCQ',
      duration_minutes: 120
    },
    {
      id: 'str-ssc-cgl',
      exam_id: 'ex-ssc-cgl',
      tier_name: 'Tier 1 Screening + Tier 2 Merit CBT',
      sections_json: JSON.stringify([
        { name: 'Tier 1: General Intelligence & Reasoning', questions: 25, marks: 50, duration: 15 },
        { name: 'Tier 1: General Awareness', questions: 25, marks: 50, duration: 10 },
        { name: 'Tier 1: Quantitative Aptitude', questions: 25, marks: 50, duration: 20 },
        { name: 'Tier 1: English Comprehension', questions: 25, marks: 50, duration: 15 }
      ]),
      total_marks: 200,
      total_questions: 100,
      marking_scheme: '+2 for Correct, -0.50 for Incorrect',
      duration_minutes: 60
    },
    {
      id: 'str-sbi-po',
      exam_id: 'ex-sbi-po',
      tier_name: 'Phase 1 Prelims + Phase 2 Mains',
      sections_json: JSON.stringify([
        { name: 'Prelims: English Language', questions: 30, marks: 30, duration: 20 },
        { name: 'Prelims: Quantitative Aptitude', questions: 35, marks: 35, duration: 20 },
        { name: 'Prelims: Reasoning Ability', questions: 35, marks: 35, duration: 20 }
      ]),
      total_marks: 100,
      total_questions: 100,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect',
      duration_minutes: 60
    },
    {
      id: 'str-upsc-cse',
      exam_id: 'ex-upsc-cse',
      tier_name: 'CSE Stage 1: Preliminary Exam (GS 1 + CSAT)',
      sections_json: JSON.stringify([
        { name: 'Paper 1: General Studies 1 (Merit)', questions: 100, marks: 200, duration: 120 },
        { name: 'Paper 2: CSAT Aptitude (Qualifying 33%)', questions: 80, marks: 200, duration: 120 }
      ]),
      total_marks: 400,
      total_questions: 180,
      marking_scheme: 'GS1: +2 / -0.66; CSAT: +2.5 / -0.83',
      duration_minutes: 240
    }
  ];

  for (const str of structures) {
    runSql(
      `INSERT INTO exam_structures (id, exam_id, tier_name, sections_json, total_marks, total_questions, marking_scheme, duration_minutes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [str.id, str.exam_id, str.tier_name, str.sections_json, str.total_marks, str.total_questions, str.marking_scheme, str.duration_minutes]
    );
  }

  // --- SEED ELIGIBILITY RULES ---
  const eligibility = [
    {
      id: 'el-mba-cat',
      category_id: 'cat-mba',
      exam_id: 'ex-cat',
      exam_code: 'CAT',
      min_qualification: 'Bachelor’s Degree (Any Discipline) or Final Year Appearing',
      min_percentage: 50.0, // 45% for SC/ST/PwD
      age_limit_min: 20,
      age_limit_max: 0, // No upper age limit
      attempts_limit: 'No Limit',
      stream_requirements: 'Any recognized undergraduate degree (B.Tech, B.Com, B.Sc, BBA, BA, etc.)',
      special_conditions: 'Candidates awaiting final year graduation results are eligible to apply with provisional status.',
      data_status: 'DEMO',
      source: 'IIM CAT Eligibility Guidelines',
      academic_year: '2025-2026'
    },
    {
      id: 'el-clat-ug',
      category_id: 'cat-clat',
      exam_id: 'ex-clat-ug',
      exam_code: 'CLAT-UG',
      min_qualification: 'Senior Secondary / 10+2 Examination Passed or Appearing',
      min_percentage: 45.0, // 40% for SC/ST
      age_limit_min: 0,
      age_limit_max: 0, // Supreme Court removed upper age limit
      attempts_limit: 'No Limit',
      stream_requirements: 'Any academic stream in 10+2 (Science, Commerce, Arts/Humanities)',
      special_conditions: 'Students writing 12th board exams in the year of admission are fully eligible.',
      data_status: 'DEMO',
      source: 'Consortium of NLUs Official Brochure',
      academic_year: '2025-2026'
    },
    {
      id: 'el-csir-jam',
      category_id: 'cat-csir-jam',
      exam_id: 'ex-iit-jam',
      exam_code: 'IIT-JAM',
      min_qualification: 'Undergraduate Degree with relevant science discipline',
      min_percentage: 55.0, // or 5.5 CGPA out of 10
      age_limit_min: 0,
      age_limit_max: 0,
      attempts_limit: 'No Limit',
      stream_requirements: 'B.Sc. / B.S. / B.Tech in Physics, Chemistry, Mathematics, Biotechnology or Life Sciences',
      special_conditions: 'For IIT admissions, proof of passing degree must be submitted by September 30.',
      data_status: 'DEMO',
      source: 'IIT JAM Information Brochure',
      academic_year: '2025-2026'
    },
    {
      id: 'el-pharma-gpat',
      category_id: 'cat-pharma',
      exam_id: 'ex-gpat',
      exam_code: 'GPAT',
      min_qualification: 'Bachelor’s degree in Pharmacy (4-year B.Pharm course) or Final Year',
      min_percentage: 50.0,
      age_limit_min: 0,
      age_limit_max: 0,
      attempts_limit: 'No Limit',
      stream_requirements: 'B.Pharm only. B.Tech (Biotech) or MBBS candidates are not eligible for GPAT.',
      special_conditions: 'Lateral entry 4-year B.Pharm candidates are also eligible.',
      data_status: 'DEMO',
      source: 'NBEMS GPAT Information Bulletin',
      academic_year: '2025-2026'
    },
    {
      id: 'el-ugc-net',
      category_id: 'cat-ugc-net',
      exam_id: 'ex-ugc-net-jrf',
      exam_code: 'UGC-NET',
      min_qualification: 'Master’s Degree or equivalent in Humanities / Social Sciences / Commerce / Computer Science',
      min_percentage: 55.0, // 50% for reserved
      age_limit_min: 0,
      age_limit_max: 30, // For JRF (30 years + relaxation), No age limit for Asst Prof
      attempts_limit: 'No Limit for Asst Prof; Age bounded for JRF',
      stream_requirements: 'Post-graduation in subject or related allied discipline',
      special_conditions: '4-year undergraduate degree holders with 75% marks can now also appear for Ph.D. with JRF.',
      data_status: 'DEMO',
      source: 'UGC NET Notification',
      academic_year: '2025-2026'
    },
    {
      id: 'el-ca-found',
      category_id: 'cat-ca',
      exam_id: 'ex-ca-found',
      exam_code: 'CA-FOUNDATION',
      min_qualification: 'Passed 10+2 from a recognized Central or State Board',
      min_percentage: 50.0,
      age_limit_min: 0,
      age_limit_max: 0,
      attempts_limit: 'Registration valid for 4 years (renewable)',
      stream_requirements: 'Any stream (Commerce, Science, Arts). Direct Entry route available for Graduates with 55-60%.',
      special_conditions: 'Must complete 4 months of study period after ICAI registration before appearing.',
      data_status: 'DEMO',
      source: 'ICAI Board of Studies Scheme',
      academic_year: '2025-2026'
    },
    {
      id: 'el-ssc-cgl',
      category_id: 'cat-ssc-railways',
      exam_id: 'ex-ssc-cgl',
      exam_code: 'SSC-CGL',
      min_qualification: 'Bachelor’s Degree in any discipline from a recognized University',
      min_percentage: 45.0,
      age_limit_min: 18,
      age_limit_max: 32, // Depending on specific post (e.g., ASO: 20-30, JSO: up to 32)
      attempts_limit: 'No Limit (Bounded by Age)',
      stream_requirements: 'Any graduate degree. For Junior Statistical Officer (JSO): Math in 12th or Statistics in degree.',
      special_conditions: 'Category age relaxations applicable as per Central Govt norms (OBC +3, SC/ST +5).',
      data_status: 'DEMO',
      source: 'SSC Official Notice of Examination',
      academic_year: '2025-2026'
    },
    {
      id: 'el-gate-cs',
      category_id: 'cat-gate-oa',
      exam_id: 'ex-gate-cs',
      exam_code: 'GATE-CS',
      min_qualification: 'B.E. / B.Tech / B.Pharm / B.Sc (Research) / M.Sc. / MCA in final year or completed',
      min_percentage: 50.0,
      age_limit_min: 0,
      age_limit_max: 0,
      attempts_limit: 'No Limit',
      stream_requirements: 'Engineering / Technology / Science / Computer Applications background',
      special_conditions: '3rd-year engineering undergraduate students are eligible to write the exam.',
      data_status: 'DEMO',
      source: 'GATE Organizing Institute Guidelines',
      academic_year: '2025-2026'
    },
    {
      id: 'el-upsc-cse',
      category_id: 'cat-upsc',
      exam_id: 'ex-upsc-cse',
      exam_code: 'UPSC-CSE',
      min_qualification: 'Bachelor’s Degree from any recognized Central/State/Deemed University',
      min_percentage: 40.0, // Passing degree
      age_limit_min: 21,
      age_limit_max: 32, // General category
      attempts_limit: 'General: 6 attempts; OBC: 9 attempts; SC/ST: Unlimited up to age 37',
      stream_requirements: 'Any recognized graduate degree (Arts, Engineering, Commerce, Medical, Law)',
      special_conditions: 'Candidate must be an Indian Citizen for IAS and IPS officers.',
      data_status: 'DEMO',
      source: 'UPSC Civil Services Gazette Notification',
      academic_year: '2025-2026'
    },
    {
      id: 'el-judiciary-djs',
      category_id: 'cat-judiciary',
      exam_id: 'ex-djs',
      exam_code: 'DJS',
      min_qualification: 'LL.B. Degree (3-Year or 5-Year Integrated) and enrolled as Advocate',
      min_percentage: 50.0,
      age_limit_min: 21,
      age_limit_max: 32, // 35 for reserved
      attempts_limit: 'No Limit (Bounded by Age)',
      stream_requirements: 'Degree in Law recognized by Bar Council of India',
      special_conditions: 'Must have active Bar Council enrollment number at time of application.',
      data_status: 'DEMO',
      source: 'Delhi High Court Judicial Service Rules',
      academic_year: '2025-2026'
    },
    {
      id: 'el-banking-sbi',
      category_id: 'cat-banking',
      exam_id: 'ex-sbi-po',
      exam_code: 'SBI-PO',
      min_qualification: 'Graduation in any discipline from a recognized University or Final Semester',
      min_percentage: 45.0,
      age_limit_min: 21,
      age_limit_max: 30,
      attempts_limit: 'General: 4 attempts; General EWS/PwD: 7; OBC: 7; SC/ST: No Limit',
      stream_requirements: 'Any degree. Basic computer operational knowledge expected.',
      special_conditions: 'Candidates with default in loan repayments/credit score issues might face disqualification.',
      data_status: 'DEMO',
      source: 'SBI PO Recruitment Notification',
      academic_year: '2025-2026'
    }
  ];

  for (const el of eligibility) {
    runSql(
      `INSERT INTO eligibility_rules (id, category_id, exam_id, exam_code, min_qualification, min_percentage, age_limit_min, age_limit_max, attempts_limit, stream_requirements, special_conditions, data_status, source, academic_year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [el.id, el.category_id, el.exam_id, el.exam_code, el.min_qualification, el.min_percentage, el.age_limit_min, el.age_limit_max, el.attempts_limit, el.stream_requirements, el.special_conditions, el.data_status, el.source, el.academic_year]
    );
  }

  // --- SEED PREPARATION STRATEGIES ---
  const prepStrategies = [
    {
      id: 'prep-mba',
      category_id: 'cat-mba',
      recommended_timeline_months: 9,
      daily_study_hours: 3.5,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Conceptual Foundation', duration: 'Months 1-3', focus: 'Arithmetic, Algebra, Reading Speed, Grammar, Basic Arrangement Puzzles' },
        { phase: 'Phase 2: Advanced Problem Solving & Sectionals', duration: 'Months 4-6', focus: 'Modern Math, Geometry, Multi-variable DILR sets, 800-word RC Passages' },
        { phase: 'Phase 3: National Mock Tests & Benchmarking', duration: 'Months 7-9', focus: '30+ Full Length CAT Mocks, Error Log Analysis, Speed & Question Selection Strategy' }
      ]),
      recommended_resources_json: JSON.stringify(['Arun Sharma Quantitative Aptitude', 'Word Power Made Easy', 'Official CAT Past 10-Year Papers', 'IMS / TIME Test Series']),
      mock_test_frequency: '2 Mocks per week in final 3 months with 4-hour detailed post-test analysis',
      difficulty_rating: 'High (Speed + Accuracy + High Competition Percentile Curve)'
    },
    {
      id: 'prep-clat',
      category_id: 'cat-clat',
      recommended_timeline_months: 10,
      daily_study_hours: 4.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Reading Ability & Legal Basics', duration: 'Months 1-3', focus: 'The Hindu/Indian Express editorials, Constitution, Law of Torts, Contracts' },
        { phase: 'Phase 2: Passage-Based Application', duration: 'Months 4-7', focus: 'Passage comprehension across Critical Reasoning, Legal Passages, GK Monthly Compendiums' },
        { phase: 'Phase 3: Speed Drills & Full Mocks', duration: 'Months 8-10', focus: '120 Questions in 120 Minutes strict time management, Sectional cutoff balance' }
      ]),
      recommended_resources_json: JSON.stringify(['The Hindu / Indian Express Editorials', 'AP Bhardwaj Legal Aptitude', 'Pratiyogita Darpan Compendiums', 'Consortium Official Sample Papers']),
      mock_test_frequency: '2 Full-length OMR mocks weekly with speed optimization drills',
      difficulty_rating: 'High (Intense Reading Density — ~15,000 words in 120 mins)'
    },
    {
      id: 'prep-ssc',
      category_id: 'cat-ssc-railways',
      recommended_timeline_months: 8,
      daily_study_hours: 5.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Syllabus Coverage', duration: 'Months 1-4', focus: 'Advance Math (Trigo, Geometry, Algebra), Static GK, NCERT Science, English Grammar Rules' },
        { phase: 'Phase 2: Topic-wise PYQ Drills', duration: 'Months 5-6', focus: '5,000+ TCS Pattern Previous Year Questions (2018-2024)' },
        { phase: 'Phase 3: Full Tier 1 & Tier 2 Simulations', duration: 'Months 7-8', focus: '60-minute speed sprints, Computer Knowledge & Typing Practice' }
      ]),
      recommended_resources_json: JSON.stringify(['Kiran SSC Mathematics Chapterwise', 'Lucent General Knowledge', 'Neetu Singh English for General Competitions', 'Pinnacle SSC GK']),
      mock_test_frequency: 'Daily 1 Tier-1 mock + Detailed error rectification',
      difficulty_rating: 'Moderate-High (High Cutoff Pressure: 150+/200 required in Tier 1)'
    },
    {
      id: 'prep-upsc',
      category_id: 'cat-upsc',
      recommended_timeline_months: 15,
      daily_study_hours: 7.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: NCERTs & Core Static GS', duration: 'Months 1-5', focus: 'Polity (Laxmikanth), Modern History (Spectrum), Geography, Economy concepts' },
        { phase: 'Phase 2: Optional Subject & Mains Answer Writing', duration: 'Months 6-10', focus: 'Complete Optional 500 marks syllabus + Daily 2-answer writing practice with mentor evaluation' },
        { phase: 'Phase 3: Prelims Sprint & Test Series', duration: 'Months 11-15', focus: '50 Prelims tests + CSAT qualifying assurance + Current affairs consolidation' }
      ]),
      recommended_resources_json: JSON.stringify(['M. Laxmikanth Indian Polity', 'Spectrum Modern India', 'Ramesh Singh Indian Economy', 'Vision IAS / Forum IAS Test Series']),
      mock_test_frequency: 'Weekly 1 Mains Answer Paper + 2 Prelims GS Mocks in final 4 months',
      difficulty_rating: 'Extremely High (Multi-stage exam with ~0.1% final selection ratio)'
    },
    {
      id: 'prep-banking',
      category_id: 'cat-banking',
      recommended_timeline_months: 6,
      daily_study_hours: 4.5,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Speed Arithmetic & Puzzle Logic', duration: 'Months 1-2', focus: 'Vedic Math, Quadratic Eq, Missing Series, Floor/Circular Seating Puzzles, Syllogism' },
        { phase: 'Phase 2: Mains High-Level DI & Banking Awareness', duration: 'Months 3-4', focus: 'Caselet DI, New Pattern Reasoning, RBI Circulars, Financial Current Affairs' },
        { phase: 'Phase 3: Strict Sectional Timer Mocks', duration: 'Months 5-6', focus: 'Prelims 20-min per section drill + Mains Descriptive letter/essay writing' }
      ]),
      recommended_resources_json: JSON.stringify(['Sarvesh Verma Quantum CAT for Banking', 'Banking Awareness by Arihant', 'AffairsCloud Current Affairs', 'Oliveboard / Testbook Mocks']),
      mock_test_frequency: '1 Prelims mock daily + 2 Mains mocks weekly',
      difficulty_rating: 'Moderate-High (Extreme speed barrier: 100 Qs in 60 mins)'
    },
    {
      id: 'prep-gate',
      category_id: 'cat-gate-oa',
      recommended_timeline_months: 10,
      daily_study_hours: 5.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Core Technical Subjects', duration: 'Months 1-5', focus: 'Data Structures, Algorithms, OS, DBMS, Computer Networks, Engineering Math' },
        { phase: 'Phase 2: Subject Tests & PYQ Mastery', duration: 'Months 6-8', focus: 'Last 30-year GATE PYQs + Virtual Calculator efficiency' },
        { phase: 'Phase 3: Full Length Mock Simulations', duration: 'Months 9-10', focus: '65-question CBT simulations, MSQ handling, Negative mark minimization' }
      ]),
      recommended_resources_json: JSON.stringify(['Cormen (CLRS) Algorithms', 'Galvin Operating Systems', 'Gate Overflow Previous Year Questions', 'Made Easy / ACE Test Series']),
      mock_test_frequency: 'Weekly full length mock with strict 3-hour timer',
      difficulty_rating: 'High (Deep conceptual & numerical precision required)'
    },
    {
      id: 'prep-ca',
      category_id: 'cat-ca',
      recommended_timeline_months: 9,
      daily_study_hours: 6.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: ICAI Study Material & Concepts', duration: 'Months 1-5', focus: 'Accounting Standards, Corporate Law, Direct & Indirect Tax, Costing' },
        { phase: 'Phase 2: Revision Test Papers (RTP) & MTPs', duration: 'Months 6-8', focus: 'ICAI Case Studies, 30% MCQ strategy, Written practice for 100-mark papers' },
        { phase: 'Phase 3: 3-Hour Exam Hall Writing', duration: 'Month 9', focus: 'Writing 3 full papers per subject under exam conditions with working notes precision' }
      ]),
      recommended_resources_json: JSON.stringify(['ICAI Official Study Modules', 'ICAI RTPs & MTPs (Last 5 Attempts)', 'Taxmann Reference Compendiums']),
      mock_test_frequency: '2 Mock Exam series conducted strictly by ICAI guidelines',
      difficulty_rating: 'Very High (15-25% passing percentage across groups)'
    },
    {
      id: 'prep-judiciary',
      category_id: 'cat-judiciary',
      recommended_timeline_months: 12,
      daily_study_hours: 6.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Major Acts Mastery', duration: 'Months 1-6', focus: 'CPC, CrPC, IPC (BNS), Indian Evidence Act, Constitutional Law, Bare Act memorization' },
        { phase: 'Phase 2: State Local Laws & Judgment Writing', duration: 'Months 7-10', focus: 'State Rent Control Acts, Land Laws, Framing of Issues, Criminal Charge Framing' },
        { phase: 'Phase 3: Mains Answer Writing & Viva Prep', duration: 'Months 11-12', focus: 'Daily 3-hour subjective law answers + Landmark Supreme Court judgments updates' }
      ]),
      recommended_resources_json: JSON.stringify(['Universal / LexisNexis Bare Acts', 'Takwani CPC', 'Ratanlal & Dhirajlal CrPC/IPC', 'LiveLaw / SCC Online Case Summaries']),
      mock_test_frequency: 'Weekly 1 full Mains law paper with judicial officer feedback',
      difficulty_rating: 'Very High (Exhaustive bare act command & structured legal reasoning)'
    },
    {
      id: 'prep-csir',
      category_id: 'cat-csir-jam',
      recommended_timeline_months: 8,
      daily_study_hours: 5.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Part B Conceptual Core', duration: 'Months 1-4', focus: 'Fundamental physics/chemistry/biology principles and standard derivations' },
        { phase: 'Phase 2: Part C High-Value Scientific Analytics', duration: 'Months 5-6', focus: 'Experimental design, multi-concept problems, advanced research application' },
        { phase: 'Phase 3: Part A General Aptitude & Full Tests', duration: 'Months 7-8', focus: 'General science aptitude + 15 full length CBT simulations' }
      ]),
      recommended_resources_json: JSON.stringify(['Standard University Reference Textbooks', 'CSIR NET Past 10-Year Papers with Solutions', 'NTA Mock Test Portal']),
      mock_test_frequency: '2 Mock tests per week with detailed scientific error diagnosis',
      difficulty_rating: 'High (Negative marking control in Part C is vital)'
    },
    {
      id: 'prep-pharma',
      category_id: 'cat-pharma',
      recommended_timeline_months: 7,
      daily_study_hours: 4.5,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Pharmacology & Pharmaceutics Core', duration: 'Months 1-3', focus: 'Mechanism of actions, adverse effects, dosage forms, biopharmaceutics' },
        { phase: 'Phase 2: Pharmacognosy, Chemistry & Analysis', duration: 'Months 4-5', focus: 'Spectroscopy (NMR, IR, UV), Chromatography, Drug synthesis pathways' },
        { phase: 'Phase 3: 125-Question CBT Practice', duration: 'Months 6-7', focus: 'Speed drills, memory tables, GPAT full simulations' }
      ]),
      recommended_resources_json: JSON.stringify(['KD Tripathi Pharmacology', 'Lachman Industrial Pharmacy', 'Chatwal Pharmaceutical Analysis', 'Inamdar GPAT Companion']),
      mock_test_frequency: 'Weekly full length GPAT mock test',
      difficulty_rating: 'Moderate-High (Extensive factual and pharmaceutical memory)'
    },
    {
      id: 'prep-ugc',
      category_id: 'cat-ugc-net',
      recommended_timeline_months: 6,
      daily_study_hours: 4.0,
      key_phases_json: JSON.stringify([
        { phase: 'Phase 1: Paper 1 Teaching & Research Aptitude', duration: 'Months 1-2', focus: 'Teaching methodology, Research ethics, ICT in education, Higher education system' },
        { phase: 'Phase 2: Paper 2 Subject Domain Specialization', duration: 'Months 3-4', focus: 'In-depth postgraduate syllabus coverage with unit-wise MCQs' },
        { phase: 'Phase 3: Combined 3-Hour CBT Drills', duration: 'Months 5-6', focus: 'No break 3-hour time allocation between Paper 1 (50 Qs) and Paper 2 (100 Qs)' }
      ]),
      recommended_resources_json: JSON.stringify(['KVS Madaan Paper 1 Teaching & Research Aptitude', 'Subject-Specific UGC NET Guides (Arihant/Trueman)', 'NTA Past Year Papers']),
      mock_test_frequency: 'Weekly combined Paper 1 + Paper 2 test series',
      difficulty_rating: 'Moderate-High (Top 6% qualify for Asst Prof, Top 0.5% for JRF)'
    }
  ];

  for (const prep of prepStrategies) {
    runSql(
      `INSERT INTO preparation_strategies (id, category_id, recommended_timeline_months, daily_study_hours, key_phases_json, recommended_resources_json, mock_test_frequency, difficulty_rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [prep.id, prep.category_id, prep.recommended_timeline_months, prep.daily_study_hours, prep.key_phases_json, prep.recommended_resources_json, prep.mock_test_frequency, prep.difficulty_rating]
    );
  }

  // --- SEED SUBJECTS & SYLLABUS TOPICS ---
  const subjects = [
    // MBA
    {
      id: 'sub-mba-qa',
      category_id: 'cat-mba',
      name: 'Quantitative Aptitude (QA)',
      code: 'QA',
      description: 'Numerical problem solving, arithmetic logic, algebraic equations, and spatial geometry.',
      weightage_percentage: 33.3,
      topics: [
        { name: 'Arithmetic (Percentages, Profit/Loss, TSD, Time & Work)', importance: 'High', questions: '8-10 Qs', diff: 'Moderate', overlap: ['XAT', 'CMAT', 'SNAP', 'SSC-CGL', 'SBI-PO'] },
        { name: 'Algebra (Linear/Quadratic Equations, Logarithms, Sequences)', importance: 'High', questions: '5-7 Qs', diff: 'Hard', overlap: ['XAT', 'GATE-DA'] },
        { name: 'Geometry & Mensuration (Triangles, Circles, Coordinate Geometry)', importance: 'Medium', questions: '3-4 Qs', diff: 'Hard', overlap: ['XAT', 'SSC-CGL'] },
        { name: 'Modern Math (Permutation & Combination, Probability, Set Theory)', importance: 'Medium', questions: '2-3 Qs', diff: 'Moderate', overlap: ['XAT', 'SNAP', 'Banking'] }
      ]
    },
    {
      id: 'sub-mba-dilr',
      category_id: 'cat-mba',
      name: 'Data Interpretation & Logical Reasoning (DILR)',
      code: 'DILR',
      description: 'Complex multi-variable caselets, matrix arrangements, network games, and charts.',
      weightage_percentage: 30.3,
      topics: [
        { name: 'Matrix & Linear Seating Arrangements', importance: 'High', questions: '1 Set (5 Qs)', diff: 'Moderate', overlap: ['XAT', 'SNAP', 'SBI-PO'] },
        { name: 'Games & Tournaments / Scheduling Logic', importance: 'High', questions: '1 Set (5 Qs)', diff: 'Hard', overlap: ['XAT'] },
        { name: 'Quant-Based Data Interpretation (Maxima/Minima)', importance: 'High', questions: '1 Set (5 Qs)', diff: 'Hard', overlap: ['XAT', 'CMAT'] },
        { name: 'Venn Diagrams & Set Relations', importance: 'Medium', questions: '1 Set (5 Qs)', diff: 'Moderate', overlap: ['SNAP', 'UGC-NET'] }
      ]
    },
    {
      id: 'sub-mba-varc',
      category_id: 'cat-mba',
      name: 'Verbal Ability & Reading Comprehension (VARC)',
      code: 'VARC',
      description: 'Complex reading comprehension passages from economics, philosophy, sociology, and verbal logic.',
      weightage_percentage: 36.4,
      topics: [
        { name: 'Reading Comprehension (4 Passages, 400-600 words each)', importance: 'High', questions: '16 Qs', diff: 'Hard', overlap: ['XAT', 'CLAT', 'GMAT'] },
        { name: 'Para Jumbles & Para Summary (TITA/MCQ)', importance: 'High', questions: '5 Qs', diff: 'Moderate', overlap: ['XAT', 'CMAT', 'SNAP'] },
        { name: 'Sentence Completion & Para Completion', importance: 'Medium', questions: '3 Qs', diff: 'Moderate', overlap: ['CMAT', 'SNAP', 'Banking'] }
      ]
    },

    // CLAT
    {
      id: 'sub-clat-legal',
      category_id: 'cat-clat',
      name: 'Legal Reasoning',
      code: 'LEGAL',
      description: 'Application of legal principles and facts extracted from judicial rulings and legal developments.',
      weightage_percentage: 26.6,
      topics: [
        { name: 'Constitutional Law & Fundamental Rights', importance: 'High', questions: '8-10 Qs', diff: 'Moderate', overlap: ['Judiciary', 'UPSC'] },
        { name: 'Law of Torts (Negligence, Strict Liability, Defamation)', importance: 'High', questions: '6-8 Qs', diff: 'Moderate', overlap: ['Judiciary'] },
        { name: 'Law of Contracts (Offer, Acceptance, Consideration, Breach)', importance: 'High', questions: '6-8 Qs', diff: 'Hard', overlap: ['Judiciary'] },
        { name: 'Criminal Law & Contemporary Legal Issues', importance: 'High', questions: '8 Qs', diff: 'Moderate', overlap: ['Judiciary'] }
      ]
    },
    {
      id: 'sub-clat-cr',
      category_id: 'cat-clat',
      name: 'Logical & Critical Reasoning',
      code: 'CR',
      description: 'Argument evaluation, assumptions, conclusions, strengthening/weakening assertions from passages.',
      weightage_percentage: 20.0,
      topics: [
        { name: 'Premise, Conclusion & Main Point Identification', importance: 'High', questions: '8 Qs', diff: 'Moderate', overlap: ['CAT', 'XAT'] },
        { name: 'Strengthening & Weakening Arguments', importance: 'High', questions: '8 Qs', diff: 'Hard', overlap: ['CAT', 'XAT'] },
        { name: 'Flaws in Reasoning & Logical Inferences', importance: 'Medium', questions: '8 Qs', diff: 'Moderate', overlap: ['CAT'] }
      ]
    },

    // SSC + Railways
    {
      id: 'sub-ssc-math',
      category_id: 'cat-ssc-railways',
      name: 'Quantitative Aptitude (Arithmetic + Advance)',
      code: 'SSC-QA',
      description: 'Arithmetic operations, Trigonometry, Geometry, Mensuration 2D/3D, and Algebra.',
      weightage_percentage: 25.0,
      topics: [
        { name: 'Trigonometry & Heights/Distances', importance: 'High', questions: '3-4 Qs', diff: 'Moderate', overlap: ['RRB-NTPC', 'CDS'] },
        { name: 'Geometry (Circles, Chords, Tangents, Triangles)', importance: 'High', questions: '3-4 Qs', diff: 'Hard', overlap: ['RRB-NTPC', 'CDS'] },
        { name: 'Arithmetic (Profit/Loss, Time-Speed-Distance, CI/SI)', importance: 'High', questions: '8-10 Qs', diff: 'Moderate', overlap: ['RRB-NTPC', 'Banking'] }
      ]
    },
    {
      id: 'sub-ssc-gk',
      category_id: 'cat-ssc-railways',
      name: 'General Awareness & Static GK',
      code: 'SSC-GA',
      description: 'Indian Polity, History, Geography, General Science (Physics, Chem, Bio), and Current Affairs.',
      weightage_percentage: 25.0,
      topics: [
        { name: 'Indian Constitution & Articles', importance: 'High', questions: '4-5 Qs', diff: 'Moderate', overlap: ['UPSC', 'Judiciary', 'Banking'] },
        { name: 'Modern & Ancient Indian History', importance: 'Medium', questions: '3-4 Qs', diff: 'Moderate', overlap: ['UPSC', 'RRB-NTPC'] },
        { name: 'General Science (NCERT Class 9-10 based)', importance: 'High', questions: '5-6 Qs', diff: 'Easy', overlap: ['RRB-ALP', 'RRB-Group D'] }
      ]
    },

    // UPSC
    {
      id: 'sub-upsc-gs1',
      category_id: 'cat-upsc',
      name: 'General Studies Paper 1 (Prelims & Mains)',
      code: 'UPSC-GS1',
      description: 'Indian Polity & Governance, History of India, Physical & Human Geography, Economy, Ecology.',
      weightage_percentage: 50.0,
      topics: [
        { name: 'Indian Polity & Constitutional Framework (Preamble, FR, DPSP, Judiciary)', importance: 'High', questions: '15-18 Qs', diff: 'Hard', overlap: ['Judiciary', 'CLAT', 'SSC'] },
        { name: 'Macro-Economics, Fiscal Policy, Banking & Inflation', importance: 'High', questions: '14-16 Qs', diff: 'Hard', overlap: ['RBI-Grade B', 'UGC-NET'] },
        { name: 'Environment, Ecology & Biodiversity (National Parks, Conventions)', importance: 'High', questions: '16-20 Qs', diff: 'Hard', overlap: ['CSIR-NET'] },
        { name: 'Modern Indian History & Freedom Struggle (1857-1947)', importance: 'Medium', questions: '8-10 Qs', diff: 'Moderate', overlap: ['SSC-CGL'] }
      ]
    },

    // Banking
    {
      id: 'sub-bank-reasoning',
      category_id: 'cat-banking',
      name: 'Reasoning Ability & High-Level Puzzles',
      code: 'BANK-REASON',
      description: 'Box puzzles, Circular/Linear seating with 2-3 variables, Syllogisms, Coded Inequalities, Input-Output.',
      weightage_percentage: 35.0,
      topics: [
        { name: 'Floor & Flat Multi-Variable Seating Puzzles', importance: 'High', questions: '15-20 Qs', diff: 'Hard', overlap: ['SBI-PO', 'IBPS-PO'] },
        { name: 'Syllogism (Only a Few, Possibility Cases)', importance: 'High', questions: '5 Qs', diff: 'Moderate', overlap: ['SSC-CGL', 'RRB-NTPC'] },
        { name: 'Machine Input-Output & Direction Sense', importance: 'Medium', questions: '5 Qs', diff: 'Hard', overlap: ['SBI-PO'] }
      ]
    }
  ];

  for (const sub of subjects) {
    runSql(
      `INSERT INTO subjects (id, category_id, name, code, description, weightage_percentage)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sub.id, sub.category_id, sub.name, sub.code, sub.description, sub.weightage_percentage]
    );

    for (let i = 0; i < sub.topics.length; i++) {
      const top = sub.topics[i];
      const topicId = `top-${sub.id}-${i}`;
      runSql(
        `INSERT INTO syllabus_topics (id, subject_id, name, description, importance_level, expected_questions, difficulty, overlap_exams_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [topicId, sub.id, top.name, `Core curriculum unit for ${top.name}`, top.importance, top.questions, top.diff, JSON.stringify(top.overlap)]
      );
    }
  }

  // --- SEED COURSES & BATCHES ---
  const courses = [
    // MBA Courses
    {
      id: 'crs-mba-comp',
      category_id: 'cat-mba',
      target_exam_id: 'ex-cat',
      target_exam_code: 'CAT',
      name: 'CAT Comprehensive Master Program 2025',
      code: 'CAT-COMP-25',
      level: 'Comprehensive',
      language: 'Hinglish',
      duration_months: 10,
      mode: 'Live Online',
      fees_inr: 44999,
      target_student_profile: 'Graduates & Final Year students seeking 99+ percentile in CAT, XAT, SNAP with full mentoring.',
      features_json: JSON.stringify(['350+ Live Interactive Classes', '30 Full-Length All-India Mocks with AI Analysis', '1-on-1 IIM Alumnus Mentorship', 'Complete Hardcopy Books Delivered', 'GD-WAT-PI Preparation Module']),
      status: 'Active',
      batches: [
        { id: 'bch-mba-1', batch_name: 'CAT Alpha Weekend Batch (Live)', start_date: '2025-03-15', end_date: '2025-11-20', capacity: 100, enrolled: 88, status: 'Filling Fast' },
        { id: 'bch-mba-2', batch_name: 'CAT Pinnacle Regular Evening Batch', start_date: '2025-04-01', end_date: '2025-11-20', capacity: 120, enrolled: 45, status: 'Open' }
      ]
    },
    {
      id: 'crs-mba-fast',
      category_id: 'cat-mba',
      target_exam_id: 'ex-cat',
      target_exam_code: 'CAT',
      name: 'CAT Fast-Track & Non-CAT Exam Suite',
      code: 'CAT-FAST-25',
      level: 'Fast-Track',
      language: 'English',
      duration_months: 6,
      mode: 'Live Online',
      fees_inr: 29999,
      target_student_profile: 'Working professionals and students with prior preparation seeking rapid revision and mock testing.',
      features_json: JSON.stringify(['200 Live Crash Sessions', '20 CAT Mocks + 15 OMET Mocks (XAT, SNAP, NMAT)', 'Daily Doubt Solving via Dedicated App', 'Personalized Weak-Area Diagnostic Tests']),
      status: 'Active',
      batches: [
        { id: 'bch-mba-3', batch_name: 'Express Evening Batch 2025', start_date: '2025-05-10', end_date: '2025-11-15', capacity: 80, enrolled: 30, status: 'Open' }
      ]
    },

    // CLAT Courses
    {
      id: 'crs-clat-achieve',
      category_id: 'cat-clat',
      target_exam_id: 'ex-clat-ug',
      target_exam_code: 'CLAT-UG',
      name: 'CLAT Target NLU Comprehensive 2026',
      code: 'CLAT-NLU-26',
      level: 'Comprehensive',
      language: 'English',
      duration_months: 12,
      mode: 'Hybrid Classroom',
      fees_inr: 54999,
      target_student_profile: '11th/12th standard students targeting Top 5 NLUs (NLSIU Bangalore, NALSAR, WBNUJS).',
      features_json: JSON.stringify(['400+ Hours Live Hybrid Classes', '50 Full OMR Mocks with Detailed Video Explanations', 'Weekly Legal & Current Affairs Monthly Compendium', 'NLU Alumni Mentorship Program']),
      status: 'Active',
      batches: [
        { id: 'bch-clat-1', batch_name: 'NLU Achievers Weekend Batch', start_date: '2025-04-10', end_date: '2026-04-01', capacity: 60, enrolled: 52, status: 'Filling Fast' }
      ]
    },

    // SSC + Railways
    {
      id: 'crs-ssc-super',
      category_id: 'cat-ssc-railways',
      target_exam_id: 'ex-ssc-cgl',
      target_exam_code: 'SSC-CGL',
      name: 'SSC CGL + Railways Super Mahapack 2025',
      code: 'SSC-RAIL-25',
      level: 'Comprehensive',
      language: 'Hinglish',
      duration_months: 8,
      mode: 'Live Online',
      fees_inr: 12999,
      target_student_profile: 'Graduates preparing simultaneously for SSC CGL, CHSL, and RRB NTPC examinations.',
      features_json: JSON.stringify(['Daily 4 Hours Live Classes (Math, Reasoning, GS, English)', '100+ Tier 1 & Tier 2 Full Length Computer Mocks', '5000+ TCS Pattern PYQ Video Solutions', 'Free Typing Test Software Access']),
      status: 'Active',
      batches: [
        { id: 'bch-ssc-1', batch_name: 'Sankalp Morning Batch', start_date: '2025-03-01', end_date: '2025-10-30', capacity: 250, enrolled: 210, status: 'Filling Fast' }
      ]
    },

    // UPSC Courses
    {
      id: 'crs-upsc-foundation',
      category_id: 'cat-upsc',
      target_exam_id: 'ex-upsc-cse',
      target_exam_code: 'UPSC-CSE',
      name: 'UPSC GS Foundation Integrated (Prelims + Mains + CSAT)',
      code: 'UPSC-FND-26',
      level: 'Foundation',
      language: 'Hinglish',
      duration_months: 15,
      mode: 'Live Online',
      fees_inr: 69999,
      target_student_profile: 'Graduates and college seniors aiming for IAS/IPS/IFS in 2026 with complete 0-to-Hero preparation.',
      features_json: JSON.stringify(['700+ Hours Live Interactive Faculty Lectures', 'Daily Mains Answer Evaluation by Former Interviewees', '50 Prelims + 25 Mains Test Papers with Model Answers', 'Monthly Current Affairs Magazine & Budget Analysis']),
      status: 'Active',
      batches: [
        { id: 'bch-upsc-1', batch_name: 'Dharohar Batch 2026', start_date: '2025-04-15', end_date: '2026-06-30', capacity: 150, enrolled: 95, status: 'Open' }
      ]
    },

    // Banking Courses
    {
      id: 'crs-bank-po',
      category_id: 'cat-banking',
      target_exam_id: 'ex-sbi-po',
      target_exam_code: 'SBI-PO',
      name: 'Bank PO & Clerk Integrated Target 2025',
      code: 'BANK-PO-25',
      level: 'Comprehensive',
      language: 'Hinglish',
      duration_months: 6,
      mode: 'Live Online',
      fees_inr: 14999,
      target_student_profile: 'Aspirants targeting SBI PO/Clerk, IBPS PO/Clerk and RRB Officer Scale 1.',
      features_json: JSON.stringify(['250+ Hours Live Speed & High-Level Classes', '60 Prelims + 30 Mains Sectional & Full Mocks', 'Daily Current Affairs & Banking Awareness Capsule', 'Live Interview & Group Discussion Simulation']),
      status: 'Active',
      batches: [
        { id: 'bch-bank-1', batch_name: 'Vijeta Banking Batch', start_date: '2025-03-20', end_date: '2025-09-30', capacity: 180, enrolled: 140, status: 'Filling Fast' }
      ]
    },

    // GATE Course
    {
      id: 'crs-gate-cs',
      category_id: 'cat-gate-oa',
      target_exam_id: 'ex-gate-cs',
      target_exam_code: 'GATE-CS',
      name: 'GATE CS & DA Dual-Stream Masterclass 2026',
      code: 'GATE-CSDA-26',
      level: 'Comprehensive',
      language: 'English',
      duration_months: 11,
      mode: 'Live Online',
      fees_inr: 34999,
      target_student_profile: 'B.Tech CS/IT/EC students and working engineers seeking IIT M.Tech seats and PSU roles.',
      features_json: JSON.stringify(['350+ Hours Live Classes Covering CS + DA Syllabus', 'Subject-wise Tests + 20 Full Length CBT Mocks', 'Hardcopy Workbooks with 35 Years PYQ Solved', 'Specialized PSU Interview Guidance']),
      status: 'Active',
      batches: [
        { id: 'bch-gate-1', batch_name: 'Pratibha GATE 2026 Batch', start_date: '2025-03-10', end_date: '2026-02-05', capacity: 100, enrolled: 72, status: 'Open' }
      ]
    },

    // CA Course
    {
      id: 'crs-ca-inter',
      category_id: 'cat-ca',
      target_exam_id: 'ex-ca-inter',
      target_exam_code: 'CA-INTER',
      name: 'CA Intermediate Both Groups Comprehensive (New Scheme)',
      code: 'CA-INTER-GRP-25',
      level: 'Comprehensive',
      language: 'Hinglish',
      duration_months: 9,
      mode: 'Live Online',
      fees_inr: 39999,
      target_student_profile: 'CA Foundation qualified students aiming to clear CA Inter Group 1 & 2 in single attempt.',
      features_json: JSON.stringify(['Complete Coverage of all 6 Papers by Renowned CAs', '100% ICAI Study Material & RTP/MTP Solved', '3 Rounds of Test Series with Subjective Checking', 'Summary Charts and MCQs Bank App Access']),
      status: 'Active',
      batches: [
        { id: 'bch-ca-1', batch_name: 'Sankalp CA Inter Nov 2025', start_date: '2025-03-01', end_date: '2025-10-31', capacity: 120, enrolled: 85, status: 'Open' }
      ]
    },

    // Judiciary Course
    {
      id: 'crs-jud-foundation',
      category_id: 'cat-judiciary',
      target_exam_id: 'ex-djs',
      target_exam_code: 'DJS',
      name: 'Judiciary Master Foundation (Major + Minor + Local Laws)',
      code: 'JUD-FND-26',
      level: 'Foundation',
      language: 'Hinglish',
      duration_months: 14,
      mode: 'Hybrid Classroom',
      fees_inr: 59999,
      target_student_profile: 'Law graduates targeting DJS, UP PCS-J, RJS, and MP Judicial Services.',
      features_json: JSON.stringify(['500+ Hours Live Classroom / Online Lectures', 'Complete Bare Act Interlinking Techniques', 'Weekly Judgment Writing & Translation Sessions', 'Personalized Mock Interview by Retired Judges']),
      status: 'Active',
      batches: [
        { id: 'bch-jud-1', batch_name: 'Nyaya Foundation Batch', start_date: '2025-04-05', end_date: '2026-06-15', capacity: 50, enrolled: 38, status: 'Filling Fast' }
      ]
    },

    // CSIR Course
    {
      id: 'crs-csir-ls',
      category_id: 'cat-csir-jam',
      target_exam_id: 'ex-csir-net',
      target_exam_code: 'CSIR-NET',
      name: 'CSIR NET Life Sciences JRF Target Batch',
      code: 'CSIR-LS-25',
      level: 'Comprehensive',
      language: 'English',
      duration_months: 6,
      mode: 'Live Online',
      fees_inr: 21999,
      target_student_profile: 'M.Sc. Life Sciences / Biotechnology students targeting JRF & Assistant Professorship.',
      features_json: JSON.stringify(['Unit 1 to 13 Complete Scientific Lectures', 'Part C High-Order Thinking Problem Solving', '30 Full CBT Mocks with Standard CSIR Interface', 'Faculty Doubt Resolution on Telegram']),
      status: 'Active',
      batches: [
        { id: 'bch-csir-1', batch_name: 'Shodh Batch June 2025', start_date: '2025-02-15', end_date: '2025-06-15', capacity: 90, enrolled: 68, status: 'Open' }
      ]
    },

    // Pharma Course
    {
      id: 'crs-pharma-gpat',
      category_id: 'cat-pharma',
      target_exam_id: 'ex-gpat',
      target_exam_code: 'GPAT',
      name: 'GPAT & NIPER JEE Master Program 2026',
      code: 'GPAT-NIPER-26',
      level: 'Comprehensive',
      language: 'English',
      duration_months: 10,
      mode: 'Live Online',
      fees_inr: 19999,
      target_student_profile: 'B.Pharm 3rd & 4th year students targeting NIPER Mohali, ICT Mumbai, and Top M.Pharm colleges.',
      features_json: JSON.stringify(['250+ Hours Live Lectures on Pharmacology, Pharmaceutics, Pharmacognosy', 'Topic-wise Question Bank of 8,000+ MCQs', '25 GPAT & 15 NIPER Full Mocks', 'NIPER All India Ranker Mentorship']),
      status: 'Active',
      batches: [
        { id: 'bch-pharma-1', batch_name: 'Sanjeevani GPAT 2026', start_date: '2025-03-25', end_date: '2026-05-30', capacity: 100, enrolled: 60, status: 'Open' }
      ]
    },

    // UGC NET Course
    {
      id: 'crs-ugc-p1p2',
      category_id: 'cat-ugc-net',
      target_exam_id: 'ex-ugc-net-jrf',
      target_exam_code: 'UGC-NET',
      name: 'UGC NET Paper 1 + Paper 2 (Commerce/Management)',
      code: 'UGC-COMM-25',
      level: 'Comprehensive',
      language: 'Hinglish',
      duration_months: 6,
      mode: 'Live Online',
      fees_inr: 17999,
      target_student_profile: 'Postgraduates aiming for JRF (Junior Research Fellowship) and Assistant Professor qualification.',
      features_json: JSON.stringify(['150 Hours Paper 1 Live Conceptual Clarity', '150 Hours Paper 2 Subject Expertise', '10,000+ PYQ Practice with Explanations', 'Speed and Accuracy Time-Management Sessions']),
      status: 'Active',
      batches: [
        { id: 'bch-ugc-1', batch_name: 'Adhyapak UGC NET June 2025', start_date: '2025-02-20', end_date: '2025-06-25', capacity: 120, enrolled: 80, status: 'Open' }
      ]
    }
  ];

  for (const crs of courses) {
    runSql(
      `INSERT INTO courses (id, category_id, target_exam_id, target_exam_code, name, code, level, language, duration_months, mode, fees_inr, target_student_profile, features_json, status, data_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [crs.id, crs.category_id, crs.target_exam_id, crs.target_exam_code, crs.name, crs.code, crs.level, crs.language, crs.duration_months, crs.mode, crs.fees_inr, crs.target_student_profile, crs.features_json, crs.status, (crs as any).data_status || 'DEMO']
    );

    for (const bch of crs.batches) {
      runSql(
        `INSERT INTO course_batches (id, course_id, batch_name, start_date, end_date, seat_capacity, enrolled_count, enrollment_status, academic_year)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [bch.id, crs.id, bch.batch_name, bch.start_date, bch.end_date, bch.capacity, bch.enrolled, bch.status, '2025-2026']
      );
    }
  }

  // --- SEED EXAM MAPPINGS ---
  const mappings = [
    // MBA
    {
      id: 'map-cat-xat',
      category_id: 'cat-mba',
      primary_exam_code: 'CAT',
      primary_exam_name: 'Common Admission Test',
      secondary_exam_code: 'XAT',
      secondary_exam_name: 'Xavier Aptitude Test',
      syllabus_overlap_percentage: 85.0,
      difficulty_comparison: 'XAT VARC & DM has higher abstract difficulty; Quant is similar to CAT.',
      preparation_strategy: 'CAT preparation covers 85% of XAT. Add 4 weeks of focused practice on Decision Making (DM) and General Knowledge after CAT in November.'
    },
    {
      id: 'map-cat-snap',
      category_id: 'cat-mba',
      primary_exam_code: 'CAT',
      primary_exam_name: 'Common Admission Test',
      secondary_exam_code: 'SNAP',
      secondary_exam_name: 'Symbiosis National Aptitude Test',
      syllabus_overlap_percentage: 92.0,
      difficulty_comparison: 'SNAP is significantly easier in depth but heavily speed-driven (60 Qs in 60 mins).',
      preparation_strategy: 'A CAT aspirant needs only 10-15 speed sprint mocks to master rapid question selection for SNAP.'
    },
    {
      id: 'map-cat-cmat',
      category_id: 'cat-mba',
      primary_exam_code: 'CAT',
      primary_exam_name: 'Common Admission Test',
      secondary_exam_code: 'CMAT',
      secondary_exam_name: 'Common Management Admission Test',
      syllabus_overlap_percentage: 80.0,
      difficulty_comparison: 'CMAT is low-to-moderate difficulty with an extra section on Innovation & Entrepreneurship.',
      preparation_strategy: 'Excellent backup exam for JBIMS, GIM, Great Lakes. Requires studying basic Innovation & General Awareness.'
    },

    // CLAT
    {
      id: 'map-clat-ailet',
      category_id: 'cat-clat',
      primary_exam_code: 'CLAT-UG',
      primary_exam_name: 'CLAT Under-Graduate',
      secondary_exam_code: 'AILET',
      secondary_exam_name: 'All India Law Entrance Test (NLU Delhi)',
      syllabus_overlap_percentage: 88.0,
      difficulty_comparison: 'AILET has tougher logical reasoning and high reading density; no separate legal section (merged into reasoning).',
      preparation_strategy: 'CLAT preparation builds 90% of the reading stamina required for AILET. Solve past 5 years AILET papers.'
    },

    // SSC + Railways
    {
      id: 'map-ssc-rrb',
      category_id: 'cat-ssc-railways',
      primary_exam_code: 'SSC-CGL',
      primary_exam_name: 'SSC Combined Graduate Level',
      secondary_exam_code: 'RRB-NTPC',
      secondary_exam_name: 'Railway NTPC Graduate Posts',
      syllabus_overlap_percentage: 95.0,
      difficulty_comparison: 'RRB NTPC does not have English section in CBT 1; General Science weightage is higher.',
      preparation_strategy: 'SSC CGL preparation completely supersedes RRB NTPC. Students just need to revise NCERT Physics/Chemistry/Biology for Railways.'
    },

    // Banking
    {
      id: 'map-sbi-ibps',
      category_id: 'cat-banking',
      primary_exam_code: 'SBI-PO',
      primary_exam_name: 'SBI Probationary Officer',
      secondary_exam_code: 'IBPS-PO',
      secondary_exam_name: 'IBPS Probationary Officer',
      syllabus_overlap_percentage: 98.0,
      difficulty_comparison: 'Identical syllabus and pattern. SBI PO introduces slightly newer puzzle formats.',
      preparation_strategy: 'Preparing for SBI PO automatically prepares the student 100% for IBPS PO, IBPS Clerk, and SBI Clerk.'
    },

    // GATE
    {
      id: 'map-gate-cs-da',
      category_id: 'cat-gate-oa',
      primary_exam_code: 'GATE-CS',
      primary_exam_name: 'GATE Computer Science',
      secondary_exam_code: 'GATE-DA',
      secondary_exam_name: 'GATE Data Science & AI',
      syllabus_overlap_percentage: 65.0,
      difficulty_comparison: 'GATE DA emphasizes Probability, Linear Algebra, Machine Learning and AI algorithms over Hardware/OS/TOC.',
      preparation_strategy: 'A CS student can write both GATE CS and GATE DA in the same year with 2 months of focused ML/AI topic coverage.'
    },

    // UPSC
    {
      id: 'map-upsc-pcs',
      category_id: 'cat-upsc',
      primary_exam_code: 'UPSC-CSE',
      primary_exam_name: 'Civil Services Examination',
      secondary_exam_code: 'UP-PCS',
      secondary_exam_name: 'UP State Civil Services',
      syllabus_overlap_percentage: 85.0,
      difficulty_comparison: 'UP PCS now closely mirrors the UPSC 6 GS papers syllabus with 2 state-specific UP papers.',
      preparation_strategy: 'UPSC preparation builds complete core foundation. Add UP Special General Studies (Paper 5 & 6) for state service.'
    }
  ];

  for (const map of mappings) {
    runSql(
      `INSERT INTO exam_mappings (id, category_id, primary_exam_code, primary_exam_name, secondary_exam_code, secondary_exam_name, syllabus_overlap_percentage, difficulty_comparison, preparation_strategy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [map.id, map.category_id, map.primary_exam_code, map.primary_exam_name, map.secondary_exam_code, map.secondary_exam_name, map.syllabus_overlap_percentage, map.difficulty_comparison, map.preparation_strategy]
    );
  }

  // --- SEED COLLEGES & PROGRAMS ---
  const colleges = [
    // MBA Colleges
    {
      id: 'col-iima',
      category_id: 'cat-mba',
      name: 'Indian Institute of Management Ahmedabad (IIM-A)',
      code: 'IIMA',
      location: 'Ahmedabad, Gujarat',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Management Rank #1 | EQUIS & AMBA Accredited',
      website: 'https://iima.ac.in',
      data_status: 'DEMO',
      source: 'NIRF 2024 / IIM Ahmedabad Placement & Admission Report (Seed)',
      programs: [
        {
          id: 'prg-iima-pgp',
          exam_code: 'CAT',
          program_name: 'Post Graduate Program in Management (PGP)',
          degree_level: 'MBA / Post-Graduate',
          seats: 395,
          duration_years: 2,
          avg_package_lpa: 34.36,
          median_package_lpa: 31.50,
          exam_cutoff_percentile: '99.5+ Percentile (Gen)',
          exam_cutoff_rank: 'Top 500 in CAT',
          academic_cutoff: '10th/12th/Grad min 80%+ for composite score shortlisting',
          selection_process: 'CAT Score -> AWT (Analytical Writing Test) -> Personal Interview -> Composite Score Merit'
        }
      ]
    },
    {
      id: 'col-iimb',
      category_id: 'cat-mba',
      name: 'Indian Institute of Management Bangalore (IIM-B)',
      code: 'IIMB',
      location: 'Bengaluru, Karnataka',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Management Rank #2 | EQUIS Accredited',
      website: 'https://iimb.ac.in',
      data_status: 'DEMO',
      source: 'IIM Bangalore Official Admission Policy (Seed)',
      programs: [
        {
          id: 'prg-iimb-pgp',
          exam_code: 'CAT',
          program_name: 'Post Graduate Programme in Management (PGP)',
          degree_level: 'MBA',
          seats: 480,
          duration_years: 2,
          avg_package_lpa: 35.31,
          median_package_lpa: 33.00,
          exam_cutoff_percentile: '99.0+ Percentile',
          exam_cutoff_rank: 'Top 800 in CAT',
          academic_cutoff: 'High weightage to work experience & graduation consistency',
          selection_process: 'CAT Score + Past Academics + Work Exp -> WAT/PI -> Final Offer'
        }
      ]
    },
    {
      id: 'col-fms',
      category_id: 'cat-mba',
      name: 'Faculty of Management Studies (FMS Delhi)',
      code: 'FMS',
      location: 'New Delhi',
      institution_type: 'Government (Delhi University)',
      accreditation: 'Premier Central University Faculty | Highest ROI B-School',
      website: 'https://fms.edu',
      data_status: 'DEMO',
      source: 'FMS Official Placement Bulletin (Seed)',
      programs: [
        {
          id: 'prg-fms-mba',
          exam_code: 'CAT',
          program_name: 'Master of Business Administration (Full-Time)',
          degree_level: 'MBA',
          seats: 251,
          duration_years: 2,
          avg_package_lpa: 34.10,
          median_package_lpa: 31.00,
          exam_cutoff_percentile: '99.2+ Percentile (Heavy VARC Weightage)',
          exam_cutoff_rank: 'Top 600 in CAT',
          academic_cutoff: 'Bachelor’s degree with 50% marks',
          selection_process: 'Weighted CAT Score (VARC 40%, QA 30%, DILR 30%) -> Extempore -> PI'
        }
      ]
    },
    {
      id: 'col-xlri',
      category_id: 'cat-mba',
      name: 'XLRI Xavier School of Management',
      code: 'XLRI',
      location: 'Jamshedpur, Jharkhand & NCR',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB, AMBA & NBA Accredited | Oldest B-School in India',
      website: 'https://xlri.ac.in',
      data_status: 'DEMO',
      source: 'XLRI Official Admission Criteria (Seed)',
      programs: [
        {
          id: 'prg-xlri-bm',
          exam_code: 'XAT',
          program_name: 'PGDM (Business Management / Human Resource Management)',
          degree_level: 'PGDM',
          seats: 360,
          duration_years: 2,
          avg_package_lpa: 32.70,
          median_package_lpa: 30.00,
          exam_cutoff_percentile: '96.0+ Percentile in XAT (BM: 96, HRM: 94)',
          exam_cutoff_rank: 'Top 1200 in XAT',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'XAT Score with Sectional Cutoffs -> GD/PI Round'
        }
      ]
    },

    // CLAT Colleges (NLUs)
    {
      id: 'col-nlsiu',
      category_id: 'cat-clat',
      name: 'National Law School of India University (NLSIU)',
      code: 'NLSIU',
      location: 'Bengaluru, Karnataka',
      institution_type: 'Institute of National Importance (NLU #1)',
      accreditation: 'NIRF Law Rank #1 continuously',
      website: 'https://nls.ac.in',
      data_status: 'DEMO',
      source: 'Consortium of NLUs Allotment List (Seed)',
      programs: [
        {
          id: 'prg-nlsiu-ballb',
          exam_code: 'CLAT-UG',
          program_name: 'B.A., LL.B. (Hons.) 5-Year Integrated',
          degree_level: 'Undergraduate Law',
          seats: 300,
          duration_years: 5,
          avg_package_lpa: 21.50,
          median_package_lpa: 19.00,
          exam_cutoff_percentile: 'AIR 1 - 105 (General All India Rank)',
          exam_cutoff_rank: 'Rank 1 - 105',
          academic_cutoff: '10+2 with minimum 45% marks',
          selection_process: 'Centralized Merit Counselling based strictly on CLAT All India Rank'
        }
      ]
    },
    {
      id: 'col-nalsar',
      category_id: 'cat-clat',
      name: 'NALSAR University of Law',
      code: 'NALSAR',
      location: 'Hyderabad, Telangana',
      institution_type: 'NLU #2',
      accreditation: 'NIRF Law Rank #3',
      website: 'https://nalsar.ac.in',
      data_status: 'DEMO',
      source: 'NALSAR Admission Information (Seed)',
      programs: [
        {
          id: 'prg-nalsar-ballb',
          exam_code: 'CLAT-UG',
          program_name: 'B.A., LL.B. (Hons.) 5-Year Integrated',
          degree_level: 'Undergraduate Law',
          seats: 132,
          duration_years: 5,
          avg_package_lpa: 19.80,
          median_package_lpa: 17.50,
          exam_cutoff_percentile: 'AIR 106 - 260',
          exam_cutoff_rank: 'Rank 106 - 260',
          academic_cutoff: '10+2 with 45% marks',
          selection_process: 'Centralized CLAT Merit Counselling'
        }
      ]
    },

    // SSC Posts & Colleges
    {
      id: 'col-ssc-central',
      category_id: 'cat-ssc-railways',
      name: 'Central Ministries & Departments (Govt of India)',
      code: 'GOI-MINISTRIES',
      location: 'New Delhi & Pan-India Stations',
      institution_type: 'Government',
      accreditation: 'Cabinet Secretariat / Ministry of Personnel',
      website: 'https://persmin.gov.in',
      data_status: 'DEMO',
      source: 'SSC CGL State Allocation & Cutoff PDF (Seed)',
      programs: [
        {
          id: 'prg-ssc-aso',
          exam_code: 'SSC-CGL',
          program_name: 'Assistant Section Officer (CSS / MEA / Intelligence Bureau)',
          degree_level: 'Group B Gazetted / Non-Gazetted Officer (Pay Level 7)',
          seats: 1200,
          duration_years: 0,
          avg_package_lpa: 11.50, // CTC equivalent with HRA, DA, CGHS
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'Tier 2 Score 325+ / 390 marks',
          exam_cutoff_rank: 'Top 1500 All India Rank',
          academic_cutoff: 'Graduation degree in any stream',
          selection_process: 'Tier 1 CBT -> Tier 2 CBT + Computer Proficiency Test -> Document Verification'
        },
        {
          id: 'prg-ssc-inspector',
          exam_code: 'SSC-CGL',
          program_name: 'Inspector of Income Tax / GST & Central Excise',
          degree_level: 'Group B (Pay Level 7)',
          seats: 2500,
          duration_years: 0,
          avg_package_lpa: 11.50,
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'Tier 2 Score 315+ / 390',
          exam_cutoff_rank: 'Top 3000 AIR',
          academic_cutoff: 'Graduation degree + Physical standard test for Excise',
          selection_process: 'Tier 1 -> Tier 2 -> Physical Test (for CBIC) -> Final Allotment'
        }
      ]
    },

    // GATE Colleges (IITs)
    {
      id: 'col-iitb',
      category_id: 'cat-gate-oa',
      name: 'Indian Institute of Technology Bombay (IIT-B)',
      code: 'IITB',
      location: 'Mumbai, Maharashtra',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Overall Rank #3 / Engineering #3',
      website: 'https://iitb.ac.in',
      data_status: 'DEMO',
      source: 'IIT Bombay COAP Round 1-5 Cutoff Archive (Seed)',
      programs: [
        {
          id: 'prg-iitb-mtech-cs',
          exam_code: 'GATE-CS',
          program_name: 'M.Tech in Computer Science and Engineering',
          degree_level: 'Postgraduate Technical',
          seats: 120,
          duration_years: 2,
          avg_package_lpa: 28.50,
          median_package_lpa: 26.00,
          exam_cutoff_percentile: 'GATE Score 750+ / 1000',
          exam_cutoff_rank: 'AIR Top 250 in GATE CS',
          academic_cutoff: 'B.E./B.Tech in CS/IT with min 60% or 6.5 CGPA',
          selection_process: 'Direct Admission through COAP based on GATE score (TA category)'
        }
      ]
    },

    // Banking Organizations
    {
      id: 'col-sbi',
      category_id: 'cat-banking',
      name: 'State Bank of India (Corporate Centre)',
      code: 'SBI',
      location: 'Mumbai & Circle Head Offices Pan-India',
      institution_type: 'Government (Fortune 500 Public Sector Bank)',
      accreditation: 'India’s Largest Commercial Bank',
      website: 'https://sbi.co.in',
      data_status: 'DEMO',
      source: 'SBI PO Final Cutoff Gazette (Seed)',
      programs: [
        {
          id: 'prg-sbi-po',
          exam_code: 'SBI-PO',
          program_name: 'Probationary Officer (Scale I Cadre)',
          degree_level: 'Bank Executive Officer',
          seats: 2000,
          duration_years: 0,
          avg_package_lpa: 16.50, // Inclusive of leased accommodation, perks, allowances
          median_package_lpa: 16.50,
          exam_cutoff_percentile: 'Final Normalized Cutoff: ~50-53 / 100 in Mains+PI',
          exam_cutoff_rank: 'Top 2000 in Combined Merit',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'Prelims (100) -> Mains (250) -> Psychometric + Group Discussion (20) + PI (30)'
        }
      ]
    },

    // UPSC Posts
    {
      id: 'col-upsc-cadre',
      category_id: 'cat-upsc',
      name: 'Civil Services of India (IAS / IPS / IFS / IRS)',
      code: 'UPSC-CADRE',
      location: 'All India Service & Central Secretariats',
      institution_type: 'Government (Apex Constitutional Cadre)',
      accreditation: 'DoPT / Union Public Service Commission',
      website: 'https://upsc.gov.in',
      data_status: 'DEMO',
      source: 'UPSC CSE Marks & Service Allocation PDF (Seed)',
      programs: [
        {
          id: 'prg-upsc-ias',
          exam_code: 'UPSC-CSE',
          program_name: 'Indian Administrative Service (IAS) & Indian Foreign Service (IFS)',
          degree_level: 'Premier All-India Constitutional Cadre',
          seats: 180,
          duration_years: 0,
          avg_package_lpa: 14.00, // Basic Pay 56,100 + DA + Official Residence, Vehicle, Security
          median_package_lpa: 14.00,
          exam_cutoff_percentile: 'AIR 1 - 95 (General Category for IAS)',
          exam_cutoff_rank: 'Rank 1 - 95',
          academic_cutoff: 'Recognized graduate degree',
          selection_process: 'Prelims (Cutoff ~88-92/200) -> Mains 1750 marks -> Personality Test 275 marks'
        }
      ]
    }
  ];

  for (const col of colleges) {
    runSql(
      `INSERT INTO colleges (id, category_id, name, code, location, institution_type, accreditation, website, data_status, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [col.id, col.category_id, col.name, col.code, col.location, col.institution_type, col.accreditation, col.website, col.data_status, col.source]
    );

    for (const prg of col.programs) {
      runSql(
        `INSERT INTO college_programs (id, college_id, exam_code, program_name, degree_level, seats, duration_years, avg_package_lpa, median_package_lpa, exam_cutoff_percentile, exam_cutoff_rank, academic_cutoff, selection_process, academic_year)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [prg.id, col.id, prg.exam_code, prg.program_name, prg.degree_level, prg.seats, prg.duration_years, prg.avg_package_lpa, prg.median_package_lpa, prg.exam_cutoff_percentile, prg.exam_cutoff_rank, prg.academic_cutoff, prg.selection_process, '2025-2026']
      );
    }
  }

  // --- SEED 3-YEAR EXAM RESULTS (2024, 2023, 2022) ---
  const results = [
    // MBA Results
    { id: 'res-mba-1', category_id: 'cat-mba', exam_code: 'CAT', academic_year: '2024-2025', result_metric_type: '99+ Percentile', metric_value: '342 Students', details: 'Scored 99.00+ Percentile in CAT 2024 with 48 students achieving 99.80+ percentile.', source: 'Internal Result Audit / Demo Dataset', data_status: 'DEMO', verified_by: 'Counselling Academic Head' },
    { id: 'res-mba-2', category_id: 'cat-mba', exam_code: 'CAT', academic_year: '2024-2025', result_metric_type: 'Selections', metric_value: '185 IIM Calls', details: '185 final converts across IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, and Indore.', source: 'Internal Result Audit / Demo Dataset', data_status: 'DEMO', verified_by: 'Counselling Academic Head' },
    { id: 'res-mba-3', category_id: 'cat-mba', exam_code: 'CAT', academic_year: '2023-2024', result_metric_type: '99+ Percentile', metric_value: '298 Students', details: 'Scored 99.00+ Percentile in CAT 2023.', source: 'Audit Report 2023 (Demo)', data_status: 'DEMO', verified_by: 'Senior Auditor' },
    { id: 'res-mba-4', category_id: 'cat-mba', exam_code: 'CAT', academic_year: '2022-2023', result_metric_type: '99+ Percentile', metric_value: '245 Students', details: 'Scored 99.00+ Percentile in CAT 2022.', source: 'Audit Report 2022 (Demo)', data_status: 'DEMO', verified_by: 'Senior Auditor' },

    // CLAT Results
    { id: 'res-clat-1', category_id: 'cat-clat', exam_code: 'CLAT-UG', academic_year: '2024-2025', result_metric_type: 'AIR Top 100', metric_value: '22 Ranks in Top 100', details: 'AIR 4, AIR 11, AIR 19, AIR 34, AIR 52 admitted to NLSIU Bangalore and NALSAR Hyderabad.', source: 'CLAT Result Audit / Demo Dataset', data_status: 'DEMO', verified_by: 'Law Program Director' },
    { id: 'res-clat-2', category_id: 'cat-clat', exam_code: 'CLAT-UG', academic_year: '2023-2024', result_metric_type: 'AIR Top 100', metric_value: '18 Ranks in Top 100', details: '18 students in AIR Top 100 with 142 total NLU selections.', source: 'Audit Report 2023 (Demo)', data_status: 'DEMO', verified_by: 'Law Program Director' },
    { id: 'res-clat-3', category_id: 'cat-clat', exam_code: 'CLAT-UG', academic_year: '2022-2023', result_metric_type: 'AIR Top 100', metric_value: '14 Ranks in Top 100', details: '14 students in AIR Top 100 with 118 total NLU admissions.', source: 'Audit Report 2022 (Demo)', data_status: 'DEMO', verified_by: 'Law Program Director' },

    // SSC Results
    { id: 'res-ssc-1', category_id: 'cat-ssc-railways', exam_code: 'SSC-CGL', academic_year: '2024-2025', result_metric_type: 'Selections', metric_value: '1,420+ Final Selections', details: 'Selections in ASO, Income Tax Inspector, GST Inspector, and Auditor positions.', source: 'SSC Merit Compilation (Demo)', data_status: 'DEMO', verified_by: 'Govt Prep Head' },
    { id: 'res-ssc-2', category_id: 'cat-ssc-railways', exam_code: 'SSC-CGL', academic_year: '2023-2024', result_metric_type: 'Selections', metric_value: '1,180+ Selections', details: 'Over 1,180 selections across Central Ministries and Departments.', source: 'SSC Merit Compilation (Demo)', data_status: 'DEMO', verified_by: 'Govt Prep Head' },
    { id: 'res-ssc-3', category_id: 'cat-ssc-railways', exam_code: 'SSC-CGL', academic_year: '2022-2023', result_metric_type: 'Selections', metric_value: '950+ Selections', details: '950 selections in SSC CGL 2022 mega recruitment cycle.', source: 'SSC Merit Compilation (Demo)', data_status: 'DEMO', verified_by: 'Govt Prep Head' },

    // Banking Results
    { id: 'res-bank-1', category_id: 'cat-banking', exam_code: 'SBI-PO', academic_year: '2024-2025', result_metric_type: 'Selections', metric_value: '428 Officers Selected', details: 'Selected as SBI PO and IBPS PO across public sector banks in India.', source: 'Banking Final Selection List (Demo)', data_status: 'DEMO', verified_by: 'Banking Academic Head' },
    { id: 'res-bank-2', category_id: 'cat-banking', exam_code: 'SBI-PO', academic_year: '2023-2024', result_metric_type: 'Selections', metric_value: '380 Officers Selected', details: 'Selected in SBI PO and IBPS PO cycles.', source: 'Banking Final Selection List (Demo)', data_status: 'DEMO', verified_by: 'Banking Academic Head' },
    { id: 'res-bank-3', category_id: 'cat-banking', exam_code: 'SBI-PO', academic_year: '2022-2023', result_metric_type: 'Selections', metric_value: '315 Officers Selected', details: 'Selected in SBI and IBPS 2022 recruitment.', source: 'Banking Final Selection List (Demo)', data_status: 'DEMO', verified_by: 'Banking Academic Head' },

    // UPSC Results
    { id: 'res-upsc-1', category_id: 'cat-upsc', exam_code: 'UPSC-CSE', academic_year: '2024-2025', result_metric_type: 'AIR Top 100', metric_value: '12 Officers in Top 100', details: 'Selections in IAS, IPS, and IFS including AIR 14, AIR 28, and AIR 47.', source: 'UPSC Result Dossier (Demo)', data_status: 'DEMO', verified_by: 'Civil Services Director' },
    { id: 'res-upsc-2', category_id: 'cat-upsc', exam_code: 'UPSC-CSE', academic_year: '2023-2024', result_metric_type: 'AIR Top 100', metric_value: '9 Officers in Top 100', details: '9 selections in AIR Top 100 and 42 total selections in CSE 2023.', source: 'UPSC Result Dossier (Demo)', data_status: 'DEMO', verified_by: 'Civil Services Director' },
    { id: 'res-upsc-3', category_id: 'cat-upsc', exam_code: 'UPSC-CSE', academic_year: '2022-2023', result_metric_type: 'AIR Top 100', metric_value: '7 Officers in Top 100', details: '7 selections in Top 100 with 36 total recommendations.', source: 'UPSC Result Dossier (Demo)', data_status: 'DEMO', verified_by: 'Civil Services Director' }
  ];

  for (const res of results) {
    runSql(
      `INSERT INTO exam_results (id, category_id, exam_code, academic_year, result_metric_type, metric_value, details, source, data_status, verified_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [res.id, res.category_id, res.exam_code, res.academic_year, res.result_metric_type, res.metric_value, res.details, res.source, res.data_status, res.verified_by]
    );
  }

  // --- SEED PROVEN RESULTS / SUCCESS STORIES ---
  const stories = [
    {
      id: 'suc-mba-1',
      category_id: 'cat-mba',
      exam_code: 'CAT',
      student_identifier: 'Aarav S. (Batch 2024)',
      academic_year: '2024-2025',
      rank_or_score: '99.82 Percentile',
      college_or_post: 'IIM Ahmedabad (PGP 2025-27)',
      enrolled_course: 'CAT Comprehensive Master Program',
      background_stream: 'Non-Engineer (B.Com, 84% in Grad)',
      testimonial_snippet: 'As a commerce graduate, Quant was my biggest mental barrier. The structured step-by-step foundation lectures and 1-on-1 mentor error-logging helped me jump from 68 percentile in initial diagnostics to 99.82 in the actual exam.',
      data_status: 'DEMO',
      source: 'Verified Student Interview Archive (Demo)'
    },
    {
      id: 'suc-mba-2',
      category_id: 'cat-mba',
      exam_code: 'XAT',
      student_identifier: 'Priya K. (Batch 2024)',
      academic_year: '2024-2025',
      rank_or_score: '99.45 Percentile',
      college_or_post: 'XLRI Jamshedpur (BM)',
      enrolled_course: 'CAT Fast-Track & Non-CAT Exam Suite',
      background_stream: 'B.Tech IT (2 Years IT Work Exp)',
      testimonial_snippet: 'The Decision Making module and high-density mock test analytics gave me the exact composure needed for XLRI selection.',
      data_status: 'DEMO',
      source: 'Verified Student Interview Archive (Demo)'
    },
    {
      id: 'suc-clat-1',
      category_id: 'cat-clat',
      exam_code: 'CLAT-UG',
      student_identifier: 'Devansh M. (Batch 2024)',
      academic_year: '2024-2025',
      rank_or_score: 'All India Rank 11 (AIR 11)',
      college_or_post: 'NLSIU Bengaluru (B.A. LL.B.)',
      enrolled_course: 'CLAT Target NLU Comprehensive',
      background_stream: 'Class 12th Humanities (CBSE 94%)',
      testimonial_snippet: 'The weekly critical reasoning breakdowns and 50 OMR simulations eliminated exam anxiety and built speed for 120 passage questions.',
      data_status: 'DEMO',
      source: 'Consortium Merit Gazette & Student Consent (Demo)'
    },
    {
      id: 'suc-ssc-1',
      category_id: 'cat-ssc-railways',
      exam_code: 'SSC-CGL',
      student_identifier: 'Rohit V. (Batch 2024)',
      academic_year: '2024-2025',
      rank_or_score: 'AIR 84 (Score 342/390)',
      college_or_post: 'Assistant Section Officer (Ministry of External Affairs)',
      enrolled_course: 'SSC CGL Super Mahapack',
      background_stream: 'B.Sc. Mathematics (Tier 3 City)',
      testimonial_snippet: 'The TCS PYQ drills and daily mock schedules gave me the speed and accuracy needed to crack MEA ASO in my first full attempt.',
      data_status: 'DEMO',
      source: 'SSC Final Selection Archive (Demo)'
    },
    {
      id: 'suc-bank-1',
      category_id: 'cat-banking',
      exam_code: 'SBI-PO',
      student_identifier: 'Sneha R. (Batch 2024)',
      academic_year: '2024-2025',
      rank_or_score: 'All India Rank 62',
      college_or_post: 'State Bank of India (Probationary Officer)',
      enrolled_course: 'Bank PO Integrated Target',
      background_stream: 'B.A. Economics',
      testimonial_snippet: 'High-level puzzle sessions and live interview simulation directly transformed my banking career trajectory.',
      data_status: 'DEMO',
      source: 'Banking Candidate Record (Demo)'
    }
  ];

  for (const st of stories) {
    runSql(
      `INSERT INTO success_stories (id, category_id, exam_code, student_identifier, academic_year, rank_or_score, college_or_post, enrolled_course, background_stream, testimonial_snippet, data_status, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [st.id, st.category_id, st.exam_code, st.student_identifier, st.academic_year, st.rank_or_score, st.college_or_post, st.enrolled_course, st.background_stream, st.testimonial_snippet, st.data_status, st.source]
    );
  }

  saveDb();
  console.log('✅ Seed Database initialized with all 11 Categories, Exams, Structures, Eligibility, Subjects, Courses, Colleges, and 3-Year Results.');
}
