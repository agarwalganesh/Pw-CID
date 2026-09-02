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
    { id: 'ex-cat', category_id: 'cat-mba', code: 'CAT', name: 'Common Admission Test', conducting_body: 'IIMs (Rotational: IIM Calcutta / IIM Lucknow)', frequency: 'Once a Year (Last Sunday of Nov, 3 Slots)', mode: 'Computer Based Test (CBT)', duration_minutes: 120, exam_level: 'National (Tier 1)', official_website: 'https://iimcat.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-xat', category_id: 'cat-mba', code: 'XAT', name: 'Xavier Aptitude Test', conducting_body: 'XLRI Jamshedpur', frequency: 'Once a Year (First Sunday of Jan)', mode: 'CBT', duration_minutes: 210, exam_level: 'National (Tier 1)', official_website: 'https://xatonline.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-snap', category_id: 'cat-mba', code: 'SNAP', name: 'Symbiosis National Aptitude Test', conducting_body: 'Symbiosis International (Deemed Univ) Pune', frequency: '3 Attempts in Dec (Best Score Counted)', mode: 'CBT Speed Test', duration_minutes: 60, exam_level: 'National / University (Tier 1)', official_website: 'https://snaptest.org', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-nmat', category_id: 'cat-mba', code: 'NMAT', name: 'NMAT by GMAC', conducting_body: 'Graduate Management Admission Council (GMAC)', frequency: '75-day testing window (Oct-Dec, up to 3 attempts)', mode: 'Computer Adaptive Test (No Negative Marking)', duration_minutes: 120, exam_level: 'National / University (Tier 1)', official_website: 'https://mba.com/exams/nmat', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-cmat', category_id: 'cat-mba', code: 'CMAT', name: 'Common Management Admission Test', conducting_body: 'National Testing Agency (NTA)', frequency: 'Once a Year (May)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tier 1 & Tier 2)', official_website: 'https://cmat.nta.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-mat', category_id: 'cat-mba', code: 'MAT', name: 'Management Aptitude Test', conducting_body: 'AIMA', frequency: '4 Times a Year (Feb/May/Sep/Dec)', mode: 'CBT/PBT/IBT', duration_minutes: 120, exam_level: 'National', official_website: 'https://mat.aima.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // CLAT
    { id: 'ex-clat-ug', category_id: 'cat-clat', code: 'CLAT-UG', name: 'CLAT Under-Graduate', conducting_body: 'Consortium of NLUs', frequency: 'Once a Year (Dec)', mode: 'Offline Pen & Paper (OMR)', duration_minutes: 120, exam_level: 'National', official_website: 'https://consortiumofnlus.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-clat-pg', category_id: 'cat-clat', code: 'CLAT-PG', name: 'CLAT Post-Graduate (LLM)', conducting_body: 'Consortium of NLUs', frequency: 'Once a Year (Dec)', mode: 'Offline OMR', duration_minutes: 120, exam_level: 'National', official_website: 'https://consortiumofnlus.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ailet', category_id: 'cat-clat', code: 'AILET', name: 'All India Law Entrance Test', conducting_body: 'NLU Delhi', frequency: 'Once a Year (Dec)', mode: 'Offline OMR', duration_minutes: 120, exam_level: 'National', official_website: 'https://nationallawuniversitydelhi.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // CSIR-JAM
    { id: 'ex-csir-net', category_id: 'cat-csir-jam', code: 'CSIR-NET', name: 'CSIR UGC NET (Science Streams)', conducting_body: 'NTA / CSIR', frequency: 'Twice a Year (June/Dec)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://csirnet.nta.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-iit-jam', category_id: 'cat-csir-jam', code: 'IIT-JAM', name: 'Joint Admission Test for Masters', conducting_body: 'IITs (Rotational)', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://jam.iitd.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // PHARMA
    { id: 'ex-gpat', category_id: 'cat-pharma', code: 'GPAT', name: 'Graduate Pharmacy Aptitude Test (GPAT)', conducting_body: 'National Board of Examinations in Medical Sciences (NBEMS)', frequency: 'Once a Year (May-June)', mode: 'Computer Based Test (CBT - 125 MCQs)', duration_minutes: 180, exam_level: 'National Apex Pharmacy (AICTE ₹12,400/mo Fellowship)', official_website: 'https://natboard.edu.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-niper', category_id: 'cat-pharma', code: 'NIPER-JEE', name: 'NIPER Joint Entrance Examination (7 Apex NIPER Institutes)', conducting_body: 'NIPER Council (NIPER Guwahati/Hyderabad/Mohali)', frequency: 'Once a Year (June-July)', mode: 'CBT (200 MCQs)', duration_minutes: 120, exam_level: 'National Tier 1 Institute of National Importance', official_website: 'https://niper.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-drug-inspector', category_id: 'cat-pharma', code: 'DRUG-INSPECTOR', name: 'Government Drug Inspector (DI - CDSCO & State PSCs)', conducting_body: 'UPSC (Central CDSCO) & State PSCs (UPPSC, MPSC, RPSC, TNPSC)', frequency: 'Regular Notification Based Recruitment', mode: 'Written Examination (CBT/OMR) + Interview', duration_minutes: 120, exam_level: 'Class-1 / Class-2 Gazetted Officer (Pay Level 8/10)', official_website: 'https://cdsco.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-govt-pharmacist', category_id: 'cat-pharma', code: 'GOVT-PHARMACIST', name: 'Government Pharmacist Recruitment (ESIC, RRB Railway, AIIMS, State Services)', conducting_body: 'ESIC, Railway Recruitment Boards, AIIMS & State Health Boards', frequency: 'Annual Central & State Health Vacancies', mode: 'CBT (100-125 MCQs)', duration_minutes: 120, exam_level: 'Central / State Govt Hospital Post (Pay Level 5)', official_website: 'https://esic.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-bits-hd-pharma', category_id: 'cat-pharma', code: 'BITS-HD-PHARMA', name: 'BITS Pilani Higher Degree Pharmacy Entrance (BITS HD)', conducting_body: 'Birla Institute of Technology and Science, Pilani', frequency: 'Once a Year (May)', mode: 'Online Computer Test', duration_minutes: 180, exam_level: 'Premier Deemed University M.Pharm', official_website: 'https://bitsadmission.com', data_status: 'DEMO', academic_year: '2025-2026' },

    // UGC NET
    { id: 'ex-ugc-net-jrf', category_id: 'cat-ugc-net', code: 'UGC-NET', name: 'UGC National Eligibility Test (JRF, Asst Prof & PhD)', conducting_body: 'National Testing Agency (NTA)', frequency: 'Twice a Year (June & Dec Cycles)', mode: 'Computer Based Test (CBT)', duration_minutes: 180, exam_level: 'National (Tier 1 Academic)', official_website: 'https://ugcnet.nta.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-state-set', category_id: 'cat-ugc-net', code: 'STATE-SET', name: 'State Eligibility Test (MH-SET, WB-SET, K-SET, AP-SET)', conducting_body: 'State Nodal Agencies (Pune Univ, WBCSC, etc.)', frequency: 'Annual (State-Wise)', mode: 'Offline OMR / CBT', duration_minutes: 180, exam_level: 'State Level Assistant Professorship', official_website: 'https://setexam.unipune.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-asst-prof-psc', category_id: 'cat-ugc-net', code: 'PSC-ASST-PROF', name: 'State PSC Assistant Professor Recruitment (UPPSC, RPSC, MPPSC)', conducting_body: 'State Public Service Commissions', frequency: 'Notification Based (Regular Govt Vacancies)', mode: 'Written Exam + Interview', duration_minutes: 180, exam_level: 'State Gazetted Class 1 (Pay Level 10)', official_website: 'https://uppsc.up.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-cuet-phd', category_id: 'cat-ugc-net', code: 'CUET-PHD', name: 'Central Universities Ph.D. Entrance (JNU, DU, BHU, BBAU)', conducting_body: 'National Testing Agency (NTA)', frequency: 'Annual (October-November)', mode: 'CBT', duration_minutes: 180, exam_level: 'National Research Entrance', official_website: 'https://phd-entr.nta.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // CA
    { id: 'ex-ca-found', category_id: 'cat-ca', code: 'CA-FOUNDATION', name: 'CA Foundation Examination', conducting_body: 'ICAI', frequency: 'Thrice a Year (Jan/June/Sep)', mode: 'Offline Subjective + Objective', duration_minutes: 180, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ca-inter', category_id: 'cat-ca', code: 'CA-INTER', name: 'CA Intermediate Examination (6 Papers)', conducting_body: 'ICAI', frequency: 'Thrice a Year', mode: 'Offline Subjective + Case MCQs', duration_minutes: 180, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ca-final', category_id: 'cat-ca', code: 'CA-FINAL', name: 'CA Final Examination (6 Papers)', conducting_body: 'ICAI', frequency: 'Twice a Year (May/Nov)', mode: 'Offline Advanced Subjective', duration_minutes: 240, exam_level: 'National Professional', official_website: 'https://icai.org', data_status: 'DEMO', academic_year: '2025-2026' },

    // SSC + Railways
    { id: 'ex-ssc-cgl', category_id: 'cat-ssc-railways', code: 'SSC-CGL', name: 'Combined Graduate Level Exam (Inspector / ASO)', conducting_body: 'Staff Selection Commission (SSC)', frequency: 'Once a Year (Sep-Oct)', mode: 'Tier 1 Screening (CBT) -> Tier 2 Merit (CBT)', duration_minutes: 60, exam_level: 'Central Govt Group B Gazetted & Non-Gazetted', official_website: 'https://ssc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ssc-chsl', category_id: 'cat-ssc-railways', code: 'SSC-CHSL', name: 'Combined Higher Secondary Level (10+2 DEO/LDC)', conducting_body: 'Staff Selection Commission (SSC)', frequency: 'Once a Year (June-July)', mode: 'Tier 1 CBT -> Tier 2 CBT + Skill/Typing', duration_minutes: 60, exam_level: 'Central Govt Group C (Pay Level 2/4)', official_website: 'https://ssc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ssc-cpo', category_id: 'cat-ssc-railways', code: 'SSC-CPO', name: 'Sub-Inspector in Delhi Police & Central Armed Police (CAPFs)', conducting_body: 'SSC', frequency: 'Once a Year (May-June)', mode: 'Paper 1 CBT -> PET/PST -> Paper 2 English -> Medical', duration_minutes: 120, exam_level: 'Sub-Inspector Uniformed (Pay Level 6)', official_website: 'https://ssc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rrb-ntpc', category_id: 'cat-ssc-railways', code: 'RRB-NTPC', name: 'Non-Technical Popular Categories (Station Master / Goods Guard)', conducting_body: 'Railway Recruitment Boards (RRBs)', frequency: 'Annual Centralized Notification', mode: 'CBT 1 -> CBT 2 -> CBAT (Aptitude) / Typing -> DV', duration_minutes: 90, exam_level: 'Indian Railways Central (Pay Level 2 to 6)', official_website: 'https://indianrailways.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rrb-alp', category_id: 'cat-ssc-railways', code: 'RRB-ALP', name: 'Assistant Loco Pilot & Technician (Train Operator)', conducting_body: 'RRB', frequency: 'Annual Centralized Notification', mode: 'CBT 1 -> CBT 2 (Part A & B Trade) -> CBAT Aptitude', duration_minutes: 90, exam_level: 'Indian Railways Technical (Running Staff)', official_website: 'https://indianrailways.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // GATE OA
    { id: 'ex-gate-cs', category_id: 'cat-gate-oa', code: 'GATE-CS', name: 'GATE Computer Science & Information Tech', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tech/PSU)', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-gate-da', category_id: 'cat-gate-oa', code: 'GATE-DA', name: 'GATE Data Science and Artificial Intelligence', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National (Tech/PSU)', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-gate-ec', category_id: 'cat-gate-oa', code: 'GATE-EC', name: 'GATE Electronics & Communication', conducting_body: 'IISc / IITs', frequency: 'Once a Year (Feb)', mode: 'CBT', duration_minutes: 180, exam_level: 'National', official_website: 'https://gate.iitk.ac.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // UPSC & Civil Services
    { id: 'ex-upsc-cse', category_id: 'cat-upsc', code: 'UPSC-CSE', name: 'Civil Services Examination (IAS, IPS, IFS, IRS)', conducting_body: 'Union Public Service Commission (UPSC)', frequency: 'Once a Year (May Prelims, Sep Mains)', mode: 'Prelims (OMR) -> Mains (Subjective Written) -> Interview', duration_minutes: 120, exam_level: 'Apex Constitutional (All India Services)', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-state-pcs', category_id: 'cat-upsc', code: 'STATE-PCS', name: 'Combined State Civil Services (UPPSC, BPSC, MPPSC, RPSC RAS)', conducting_body: 'State Public Service Commissions', frequency: 'Annual (State-Wise Schedules)', mode: 'Prelims (OMR) -> Mains (Subjective) -> Interview', duration_minutes: 120, exam_level: 'State Civil Services (SDM, DSP, BDO)', official_website: 'https://uppsc.up.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-upsc-capf', category_id: 'cat-upsc', code: 'UPSC-CAPF', name: 'Central Armed Police Forces - Assistant Commandant (AC)', conducting_body: 'UPSC', frequency: 'Once a Year (August)', mode: 'Paper 1 (GS MCQ) + Paper 2 (Descriptive English/Essay) + PET + Interview', duration_minutes: 120, exam_level: 'Armed Forces Gazetted Class 1 (Pay Level 10)', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-upsc-epfo', category_id: 'cat-upsc', code: 'UPSC-EPFO', name: 'EPFO Enforcement Officer (EO/AO) & APFC', conducting_body: 'UPSC (Special Recruitment)', frequency: 'Periodic Recruitment Tests', mode: 'Recruitment Test (RT) CBT/OMR + Interview', duration_minutes: 120, exam_level: 'Central Govt Group A/B Gazetted', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-upsc-cds', category_id: 'cat-upsc', code: 'UPSC-CDS', name: 'Combined Defence Services Examination (IMA/INA/AFA/OTA)', conducting_body: 'UPSC', frequency: 'Twice a Year (CDS I in April, CDS II in Sep)', mode: 'Written (English + GK + Math) + 5-Day SSB Interview', duration_minutes: 120, exam_level: 'Military Commissioned Officer (Lieutenant)', official_website: 'https://upsc.gov.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // Judiciary
    { id: 'ex-djs', category_id: 'cat-judiciary', code: 'DJS', name: 'Delhi Judicial Service Examination', conducting_body: 'Delhi High Court', frequency: 'Annual / Biennial', mode: 'Prelims (MCQ) -> Mains (Law Subjective) -> Viva', duration_minutes: 150, exam_level: 'State Judicial Officer', official_website: 'https://delhihighcourt.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-uppcs-j', category_id: 'cat-judiciary', code: 'UP-PCS-J', name: 'UP Judicial Service Civil Judge (JD)', conducting_body: 'UPPSC', frequency: 'Periodic Notification', mode: 'Prelims -> Mains -> Interview', duration_minutes: 120, exam_level: 'State Judicial Officer', official_website: 'https://uppsc.up.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rjs', category_id: 'cat-judiciary', code: 'RJS', name: 'Rajasthan Judicial Service Exam', conducting_body: 'Rajasthan High Court', frequency: 'Annual', mode: 'Prelims -> Mains -> Interview', duration_minutes: 120, exam_level: 'State Judicial Officer', official_website: 'https://hcraj.nic.in', data_status: 'DEMO', academic_year: '2025-2026' },

    // Banking & Insurance
    { id: 'ex-sbi-po', category_id: 'cat-banking', code: 'SBI-PO', name: 'State Bank of India Probationary Officer (Scale I)', conducting_body: 'SBI Central Recruitment Board', frequency: 'Once a Year (Oct-Nov)', mode: 'Prelims CBT -> Mains CBT + Descriptive -> GE & PI', duration_minutes: 60, exam_level: 'Premier Public Banking (CTC ₹16.5 LPA)', official_website: 'https://sbi.co.in/careers', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ibps-po', category_id: 'cat-banking', code: 'IBPS-PO', name: 'IBPS Probationary Officer (11 Nationalized Banks)', conducting_body: 'IBPS Mumbai', frequency: 'Once a Year (Aug-Oct)', mode: 'Prelims CBT -> Mains CBT + Essay -> Interview', duration_minutes: 60, exam_level: 'Public Sector Banking (PNB, BoB, Canara)', official_website: 'https://ibps.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-rbi-b', category_id: 'cat-banking', code: 'RBI-GRADE-B', name: 'Reserve Bank of India Grade B Officers (General)', conducting_body: 'RBI Services Board', frequency: 'Once a Year (June-July)', mode: 'Phase 1 CBT -> Phase 2 (ESI + FM + Eng) -> Interview', duration_minutes: 120, exam_level: 'Apex Central Bank Officer (CTC ₹24 LPA)', official_website: 'https://rbi.org.in', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-sbi-clerk', category_id: 'cat-banking', code: 'SBI-CLERK', name: 'SBI Junior Associate (Customer Support & Sales)', conducting_body: 'SBI', frequency: 'Annual (Nov-Jan)', mode: 'Prelims CBT -> Mains CBT (No Interview!)', duration_minutes: 60, exam_level: 'Clerical Cadre (Direct Appointment)', official_website: 'https://sbi.co.in/careers', data_status: 'DEMO', academic_year: '2025-2026' },
    { id: 'ex-ibps-rrb-po', category_id: 'cat-banking', code: 'IBPS-RRB-PO', name: 'IBPS Regional Rural Banks Officer Scale 1 (Gramin Bank)', conducting_body: 'IBPS', frequency: 'Annual (August)', mode: 'Prelims CBT (Math + Logic only) -> Mains -> Interview', duration_minutes: 45, exam_level: 'Regional Rural Banks (Home State Posting)', official_website: 'https://ibps.in', data_status: 'DEMO', academic_year: '2025-2026' }
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
    // 1. CAT (Common Admission Test)
    {
      id: 'str-cat',
      exam_id: 'ex-cat',
      tier_name: 'CAT Computer Based Test (Single Slot, 3 Sections)',
      sections_json: JSON.stringify([
        { name: 'VARC (Verbal Ability & Reading Comprehension)', questions: 24, marks: 72, duration: 40, question_types: '16 RC (4 Passages) + 8 VA (Parajumbles, Summary, Odd-One-Out)' },
        { name: 'DILR (Data Interpretation & Logical Reasoning)', questions: 20, marks: 60, duration: 40, question_types: '4 Caselet Sets (5 Questions each: Matrix, Arrangements, Games & Tournaments, Charts)' },
        { name: 'QA (Quantitative Aptitude)', questions: 22, marks: 66, duration: 40, question_types: 'Arithmetic (8-9 Qs), Algebra (6-7 Qs), Geometry (3-4 Qs), Modern Math & Numbers (2-3 Qs)' }
      ]),
      total_marks: 198,
      total_questions: 66,
      marking_scheme: '+3 for Correct, -1 for Incorrect MCQ, 0 for Non-MCQ (TITA / Type in the Answer)',
      duration_minutes: 120
    },
    // 2. XAT (Xavier Aptitude Test)
    {
      id: 'str-xat',
      exam_id: 'ex-xat',
      tier_name: 'XAT Paper Pattern (Part 1: 175 Mins + Part 2: 35 Mins)',
      sections_json: JSON.stringify([
        { name: 'VALR (Verbal & Logical Ability)', questions: 26, marks: 26, duration: 60, question_types: 'Reading Comprehension, Critical Reasoning, Vocabulary, Parajumbles' },
        { name: 'DM (Decision Making - Unique to XAT)', questions: 21, marks: 21, duration: 50, question_types: 'Ethical Dilemmas, Business Situations, HR Decisions, Managerial Caselets' },
        { name: 'QADI (Quantitative Ability & Data Interpretation)', questions: 28, marks: 28, duration: 65, question_types: 'Geometry, Algebra, Arithmetic, Data Interpretation Sets' },
        { name: 'General Knowledge (GK) & Analytical Essay Writing', questions: 25, marks: 25, duration: 35, question_types: 'Static GK + Current Affairs (25 Qs) + 1 Essay (Evaluated during PI)' }
      ]),
      total_marks: 100,
      total_questions: 100,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect MCQ, -0.10 for >8 unattempted questions; No negative marking in GK',
      duration_minutes: 210
    },
    // 3. SNAP (Symbiosis National Aptitude Test)
    {
      id: 'str-snap',
      exam_id: 'ex-snap',
      tier_name: 'SNAP Speed Test (60 Mins, Free Sectional Navigation)',
      sections_json: JSON.stringify([
        { name: 'General English (Reading Comprehension, Verbal Reasoning, Verbal Ability)', questions: 15, marks: 15, duration: 15, question_types: 'Vocabulary, Grammar, Analogies, Sentence Correction, Short RC' },
        { name: 'Analytical & Logical Reasoning (A&LR)', questions: 25, marks: 25, duration: 25, question_types: 'Puzzles, Blood Relations, Coding-Decoding, Series, Syllogisms, Critical Reasoning' },
        { name: 'Quantitative, Data Interpretation & Data Sufficiency (QA, DI-DS)', questions: 20, marks: 20, duration: 20, question_types: 'Arithmetic, Modern Math, Algebra, Tables & Graphs, Data Sufficiency' }
      ]),
      total_marks: 60,
      total_questions: 60,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect; No sectional timer (Composite 60 Mins)',
      duration_minutes: 60
    },
    // 4. NMAT by GMAC
    {
      id: 'str-nmat',
      exam_id: 'ex-nmat',
      tier_name: 'NMAT Computer Adaptive Test (Adaptive Difficulty, No Negative Marking)',
      sections_json: JSON.stringify([
        { name: 'Language Skills', questions: 36, marks: 120, duration: 28, question_types: 'Reading Comprehension, Prepositions, Error Identification, Vocabulary (Scaled 12-120)' },
        { name: 'Quantitative Skills', questions: 36, marks: 120, duration: 52, question_types: 'Arithmetic, Algebra, Geometry, Data Sufficiency, Table & Bar DI (Scaled 12-120)' },
        { name: 'Logical Reasoning', questions: 36, marks: 120, duration: 40, question_types: 'Analytical Puzzles, Critical Reasoning, Syllogisms, Sequences (Scaled 12-120)' }
      ]),
      total_marks: 360,
      total_questions: 108,
      marking_scheme: '+3 for Correct, NO NEGATIVE MARKING; Strict sectional time limits; Candidate chooses section order',
      duration_minutes: 120
    },
    // 5. CMAT (Common Management Admission Test)
    {
      id: 'str-cmat',
      exam_id: 'ex-cmat',
      tier_name: 'CMAT National Level CBT (180 Mins, 5 Equal Sections)',
      sections_json: JSON.stringify([
        { name: 'Quantitative Techniques & Data Interpretation', questions: 20, marks: 80, duration: 36, question_types: 'Arithmetic, Basic Algebra, Tables, Graphs, Probability' },
        { name: 'Logical Reasoning', questions: 20, marks: 80, duration: 36, question_types: 'Linear Arrangements, Coding, Direction Sense, Blood Relations' },
        { name: 'Language Comprehension', questions: 20, marks: 80, duration: 36, question_types: 'Reading Passages, Grammar, Synonyms/Antonyms, Para-jumbles' },
        { name: 'General Awareness', questions: 20, marks: 80, duration: 36, question_types: 'Indian Economy, Polity, Business GK, Awards, Sports, Current Events' },
        { name: 'Innovation & Entrepreneurship', questions: 20, marks: 80, duration: 36, question_types: 'Startup Concepts, Venture Funding, Business Models, Innovation Frameworks' }
      ]),
      total_marks: 400,
      total_questions: 100,
      marking_scheme: '+4 for Correct, -1 for Incorrect; Composite 180 Mins (Free Section Navigation)',
      duration_minutes: 180
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
    // --- PHARMA STRUCTURES ---
    {
      id: 'str-gpat',
      exam_id: 'ex-gpat',
      tier_name: 'GPAT Computer Based Test (125 MCQs, 500 Marks, 180 Mins)',
      sections_json: JSON.stringify([
        { name: 'Pharmaceutics & NDDS', questions: 38, marks: 152, duration: 55, question_types: 'Dosage Form Design, Biopharmaceutics, Pharmacokinetics, Novel Drug Delivery, Physical Pharmacy (+4 / -1)' },
        { name: 'Pharmaceutical Chemistry & Medicinal Chem', questions: 38, marks: 152, duration: 55, question_types: 'SAR of Drug Classes, Organic Chemistry, Heterocyclic, Spectroscopy UV/NMR/IR/Mass (+4 / -1)' },
        { name: 'Pharmacology & Toxicology', questions: 28, marks: 112, duration: 40, question_types: 'ANS, CNS, CVS Drugs, Chemotherapy, Autacoids, Adverse Drug Reactions, Clinical Trials (+4 / -1)' },
        { name: 'Pharmacognosy & Phytochemistry', questions: 10, marks: 40, duration: 15, question_types: 'Alkaloids, Glycosides, Terpenoids, Extraction Techniques, Adulteration (+4 / -1)' },
        { name: 'Pharmaceutical Jurisprudence & Allied', questions: 11, marks: 44, duration: 15, question_types: 'Drugs & Cosmetics Act 1940, Pharmacy Act 1948, NDPS, Biochemistry, Microbiology (+4 / -1)' }
      ]),
      total_marks: 500,
      total_questions: 125,
      marking_scheme: '+4 for Correct, -1 for Incorrect MCQ; Qualifying gives ₹12,400/month AICTE PG Scholarship (Total ₹2,97,600 across 2-year M.Pharm)',
      duration_minutes: 180
    },
    {
      id: 'str-niper',
      exam_id: 'ex-niper',
      tier_name: 'NIPER JEE (200 MCQs, 200 Marks, 120 Mins Speed Test)',
      sections_json: JSON.stringify([
        { name: 'Natural Products & Phytochemistry', questions: 40, marks: 40, duration: 25, question_types: 'Biosynthetic pathways, Isolation, Bioactive secondary metabolites (+1 / -0.25)' },
        { name: 'Medicinal Chemistry & Organic Synthesis', questions: 50, marks: 50, duration: 30, question_types: 'Reaction mechanisms, Stereochemistry, Target-based drug design (+1 / -0.25)' },
        { name: 'Pharmacology, Toxicology & Clinical Research', questions: 50, marks: 50, duration: 30, question_types: 'Bioassays, In-vitro/In-vivo testing, Receptor signaling (+1 / -0.25)' },
        { name: 'Pharmaceutics, Regulatory Affairs & Devices', questions: 40, marks: 40, duration: 25, question_types: 'Polymer chemistry, Preformulation, Medical devices, Patents (+1 / -0.25)' },
        { name: 'Aptitude & General Pharmaceutical GK', questions: 20, marks: 20, duration: 10, question_types: 'Pharma industry current affairs, Nobel prizes, Basic numerical reasoning (+1 / -0.25)' }
      ]),
      total_marks: 200,
      total_questions: 200,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect; Valid GPAT score mandatory for eligibility',
      duration_minutes: 120
    },
    {
      id: 'str-drug-inspector',
      exam_id: 'ex-drug-inspector',
      tier_name: 'Drug Inspector Selection (Written CBT/OMR + Viva)',
      sections_json: JSON.stringify([
        { name: 'Forensic Pharmacy & Drug Legislation', questions: 50, marks: 100, duration: 45, question_types: 'D&C Act 1940 & Rules 1945, Schedule M GMP, Schedule Y Clinical Trials, DPCI (+2 / -0.66)' },
        { name: 'Industrial Pharmacy, QC & Manufacturing', questions: 50, marks: 100, duration: 45, question_types: 'Sterile products, QA/QC, Stability testing, Microbiological assays (+2 / -0.66)' },
        { name: 'Pharmacology, Bioavailability & Toxicology', questions: 50, marks: 100, duration: 45, question_types: 'Drug mechanisms, Adverse reactions, Drug interactions, LD50/ED50 (+2 / -0.66)' },
        { name: 'General Studies & Mental Ability (State/UPSC)', questions: 50, marks: 100, duration: 45, question_types: 'Indian Constitution, Current Affairs, Logical Reasoning (+2 / -0.66)' }
      ]),
      total_marks: 400,
      total_questions: 200,
      marking_scheme: 'Written Test Merit (85%) + Interview (15%) for Gazetted Class 1/2 Post',
      duration_minutes: 180
    },
    {
      id: 'str-govt-pharmacist',
      exam_id: 'ex-govt-pharmacist',
      tier_name: 'Government Hospital Pharmacist CBT (ESIC / RRB / AIIMS)',
      sections_json: JSON.stringify([
        { name: 'Technical Pharmacy Domain Knowledge', questions: 80, marks: 80, duration: 80, question_types: 'Hospital & Clinical Pharmacy, Dispensing, Pharmacology, Drug Store Management (+1 / -0.25)' },
        { name: 'General Aptitude, Reasoning & Awareness', questions: 45, marks: 45, duration: 40, question_types: 'General Science, Arithmetic, Reasoning, General English (+1 / -0.25)' }
      ]),
      total_marks: 125,
      total_questions: 125,
      marking_scheme: '+1 for Correct, -0.25 for Incorrect; Direct selection for permanent hospital posting',
      duration_minutes: 120
    },
    {
      id: 'str-ssc-cgl',
      exam_id: 'ex-ssc-cgl',
      tier_name: 'SSC CGL 2-Tier Selection (Tier 1 Screening 200M -> Tier 2 Merit 390M)',
      sections_json: JSON.stringify([
        { name: 'Tier 1: General Intelligence & Reasoning', questions: 25, marks: 50, duration: 15, question_types: 'Analogies, Series, Coding, Non-verbal, Matrix (+2 / -0.50)' },
        { name: 'Tier 1: General Awareness', questions: 25, marks: 50, duration: 10, question_types: 'Static GK, Polity, History, Science, Current Affairs (+2 / -0.50)' },
        { name: 'Tier 1: Quantitative Aptitude', questions: 25, marks: 50, duration: 20, question_types: 'Arithmetic, Algebra, Geometry, Trigonometry, DI (+2 / -0.50)' },
        { name: 'Tier 1: English Comprehension', questions: 25, marks: 50, duration: 15, question_types: 'Grammar, Vocab, Reading Passages, Error Spotting (+2 / -0.50)' },
        { name: 'Tier 2 Section 1: Mathematical Abilities + Reasoning (Decides Rank)', questions: 60, marks: 180, duration: 60, question_types: '30 Qs Math (90M) + 30 Qs Reasoning (90M) • High-difficulty (+3 / -1)' },
        { name: 'Tier 2 Section 2: English Language + General Awareness (Decides Rank)', questions: 70, marks: 210, duration: 60, question_types: '45 Qs English (135M) + 25 Qs GA (75M) • (+3 / -1)' },
        { name: 'Tier 2 Section 3: Computer Proficiency (Qualifying)', questions: 20, marks: 60, duration: 15, question_types: 'Basics of CPU, MS Office, Networking, Cyber Security (Min 18 marks required)' }
      ]),
      total_marks: 390,
      total_questions: 150,
      marking_scheme: 'Tier 1 (200M) is Qualifying Screening only; Final Merit = Tier 2 Paper 1 (Section 1 + Section 2 = 390 Marks)',
      duration_minutes: 195
    },
    {
      id: 'str-ssc-chsl',
      exam_id: 'ex-ssc-chsl',
      tier_name: 'SSC CHSL 10+2 (Tier 1 Screening 200M -> Tier 2 Merit 360M)',
      sections_json: JSON.stringify([
        { name: 'Tier 1: 4 Sections (English, Math, Reasoning, GA)', questions: 100, marks: 200, duration: 60, question_types: '25 Qs each section • Class 10+2 level (+2 / -0.50)' },
        { name: 'Tier 2: Math (30 Qs) + Reasoning (30 Qs)', questions: 60, marks: 180, duration: 60, question_types: 'Section 1 (+3 / -1)' },
        { name: 'Tier 2: English (40 Qs) + GA (20 Qs)', questions: 60, marks: 180, duration: 60, question_types: 'Section 2 (+3 / -1)' }
      ]),
      total_marks: 360,
      total_questions: 120,
      marking_scheme: 'Tier 2 Merit = 360 Marks + Typing Test (35 wpm English / 30 wpm Hindi)',
      duration_minutes: 135
    },
    {
      id: 'str-rrb-ntpc',
      exam_id: 'ex-rrb-ntpc',
      tier_name: 'RRB NTPC (CBT 1 Screening -> CBT 2 Merit -> CBAT / Typing)',
      sections_json: JSON.stringify([
        { name: 'CBT 1: General Awareness (40 Qs), Math (30 Qs), Reasoning (30 Qs)', questions: 100, marks: 100, duration: 90, question_types: 'Screening round for all Pay Levels (+1 / -0.33)' },
        { name: 'CBT 2: General Awareness (50 Qs), Math (35 Qs), Reasoning (35 Qs)', questions: 120, marks: 120, duration: 90, question_types: 'Decides final merit ranking for Station Master, Goods Guard (+1 / -0.33)' }
      ]),
      total_marks: 120,
      total_questions: 120,
      marking_scheme: '+1 for Correct, -0.33 for Incorrect; CBT 2 marks decide 70% merit, CBAT aptitude decides 30%',
      duration_minutes: 90
    },
    {
      id: 'str-sbi-po',
      exam_id: 'ex-sbi-po',
      tier_name: 'SBI PO 3-Phase Selection (Prelims 100M -> Mains 250M -> GE & Interview 50M)',
      sections_json: JSON.stringify([
        { name: 'Phase 1 Prelims: English (30 Qs, 30M, 20 mins)', questions: 30, marks: 30, duration: 20, question_types: 'RC, Cloze test, Error detection (+1 / -0.25)' },
        { name: 'Phase 1 Prelims: Quantitative Aptitude (35 Qs, 35M, 20 mins)', questions: 35, marks: 35, duration: 20, question_types: 'Data Interpretation, Quadratic, Simplification (+1 / -0.25)' },
        { name: 'Phase 1 Prelims: Reasoning Ability (35 Qs, 35M, 20 mins)', questions: 35, marks: 35, duration: 20, question_types: 'Puzzles, Seating arrangement, Syllogisms (+1 / -0.25)' },
        { name: 'Phase 2 Mains: Reasoning & Computer Aptitude (45 Qs, 60M, 60 mins)', questions: 45, marks: 60, duration: 60, question_types: 'High-level multi-layered puzzles, input-output, coding' },
        { name: 'Phase 2 Mains: Data Analysis & Interpretation (35 Qs, 60M, 45 mins)', questions: 35, marks: 60, duration: 45, question_types: 'Caselet DI, Radar charts, Missing DI, Probability DI' },
        { name: 'Phase 2 Mains: General/Economy/Banking Awareness (40 Qs, 50M, 35 mins)', questions: 40, marks: 50, duration: 35, question_types: 'RBI Circulars, Financial schemes, Banking current affairs' },
        { name: 'Phase 2 Mains: English Language (35 Qs, 40M, 40 mins)', questions: 35, marks: 40, duration: 40, question_types: 'Advanced inference, vocab, sentence connectors' },
        { name: 'Phase 2 Mains: Descriptive Test (English Letter & Essay)', questions: 2, marks: 50, duration: 30, question_types: '1 Formal Letter + 1 Contemporary Essay typed on keyboard' },
        { name: 'Phase 3: Group Exercises (20M) + Personal Interview (30M)', questions: 1, marks: 50, duration: 30, question_types: 'Panel Viva and Group Discussion on banking & economic scenarios' }
      ]),
      total_marks: 300,
      total_questions: 157,
      marking_scheme: 'Normalized 75:25 Merit (Mains 250M converted to 75 + Interview 50M converted to 25 = 100 Marks)',
      duration_minutes: 240
    },
    {
      id: 'str-ibps-po',
      exam_id: 'ex-ibps-po',
      tier_name: 'IBPS PO (Prelims 100M -> Mains 225M -> Interview 100M)',
      sections_json: JSON.stringify([
        { name: 'Prelims: English (30), Quant (35), Reasoning (35)', questions: 100, marks: 100, duration: 60, question_types: 'Strict 20-minute sectional timer for each section (+1 / -0.25)' },
        { name: 'Mains: 4 Objective Sections (200M) + Descriptive Writing (25M)', questions: 157, marks: 225, duration: 210, question_types: 'Sectional and overall cutoffs both applicable (+1 / -0.25)' }
      ]),
      total_marks: 225,
      total_questions: 157,
      marking_scheme: '80:20 Merit Weightage (Mains 80% + Interview 20%)',
      duration_minutes: 210
    },
    {
      id: 'str-rbi-b',
      exam_id: 'ex-rbi-b',
      tier_name: 'RBI Grade B (Phase 1 200M -> Phase 2 300M -> Interview 75M)',
      sections_json: JSON.stringify([
        { name: 'Phase 1: GA (80 Qs, 80M), Reasoning (60 Qs, 60M), English (30 Qs, 30M), Quant (30 Qs, 30M)', questions: 200, marks: 200, duration: 120, question_types: 'Objective CBT screening (+1 / -0.25)' },
        { name: 'Phase 2 Paper 1: Economic & Social Issues (ESI - 50% Obj + 50% Desc)', questions: 34, marks: 100, duration: 120, question_types: 'Macroeconomics, Union Budget, Poverty, Demographics' },
        { name: 'Phase 2 Paper 2: English Writing Skills (Descriptive)', questions: 3, marks: 100, duration: 90, question_types: 'Essay, Précis writing, Reading comprehension' },
        { name: 'Phase 2 Paper 3: Finance and Management (FM - 50% Obj + 50% Desc)', questions: 34, marks: 100, duration: 120, question_types: 'Financial system, Financial markets, Leadership, Corporate governance' }
      ]),
      total_marks: 375,
      total_questions: 71,
      marking_scheme: 'Phase 2 (300M) + Interview (75M) = 375 Marks decides final merit',
      duration_minutes: 330
    },
    {
      id: 'str-upsc-cse',
      exam_id: 'ex-upsc-cse',
      tier_name: 'UPSC CSE 3-Stage Selection (Prelims 400M -> Mains 1750M -> Interview 275M = 2025 Marks)',
      sections_json: JSON.stringify([
        { name: 'Stage 1: Prelims Paper 1 (General Studies - Decides Cutoff)', questions: 100, marks: 200, duration: 120, question_types: 'History, Polity, Geography, Economy, Science & Tech, Environment, Current Affairs (+2 / -0.66)' },
        { name: 'Stage 1: Prelims Paper 2 (CSAT Aptitude - Qualifying 33%)', questions: 80, marks: 200, duration: 120, question_types: 'Reading Comprehension, Logical Reasoning, Basic Numeracy, Data Sufficiency (+2.5 / -0.83)' },
        { name: 'Stage 2: Mains Essay (Paper 1)', questions: 2, marks: 250, duration: 180, question_types: '2 Essays out of 8 choices (125 marks each): Philosophical, Socio-economic, Governance' },
        { name: 'Stage 2: Mains GS 1 (Indian Heritage, History, Geography, Society)', questions: 20, marks: 250, duration: 180, question_types: '10 Qs (10M each, 150 words) + 10 Qs (15M each, 250 words) Subjective' },
        { name: 'Stage 2: Mains GS 2 (Governance, Constitution, Polity, Social Justice, IR)', questions: 20, marks: 250, duration: 180, question_types: '10 Qs (10M) + 10 Qs (15M) Analytical Subjective' },
        { name: 'Stage 2: Mains GS 3 (Technology, Economic Dev, Biodiversity, Security, Disaster Mgmt)', questions: 20, marks: 250, duration: 180, question_types: '10 Qs (10M) + 10 Qs (15M) Analytical Subjective' },
        { name: 'Stage 2: Mains GS 4 (Ethics, Integrity, and Aptitude)', questions: 12, marks: 250, duration: 180, question_types: 'Section A (Theoretical Ethics) + Section B (6 Case Studies)' },
        { name: 'Stage 2: Optional Subject Paper 1 & Paper 2', questions: 10, marks: 500, duration: 360, question_types: '2 Papers (250 Marks each) in Chosen Discipline (PSIR, Geography, Sociology, History, Anthropology, etc.)' },
        { name: 'Stage 3: Personality Test (Interview at Dholpur House, New Delhi)', questions: 1, marks: 275, duration: 35, question_types: 'Board Interview testing analytical composure, ethical stance, leadership, situational awareness' }
      ]),
      total_marks: 2025,
      total_questions: 283,
      marking_scheme: 'Prelims Screening only; Final Merit = Mains 1750 + Interview 275 = 2025 Marks (Topper scores ~1050/2025 ~52%)',
      duration_minutes: 1695
    },
    {
      id: 'str-state-pcs',
      exam_id: 'ex-state-pcs',
      tier_name: 'State Combined Civil Services (Prelims -> Mains -> Interview)',
      sections_json: JSON.stringify([
        { name: 'Prelims: GS Paper 1 (Merit)', questions: 150, marks: 200, duration: 120, question_types: 'General Studies + State Specific GK (UP/Bihar/MP GK)' },
        { name: 'Prelims: CSAT Paper 2 (Qualifying 33%)', questions: 100, marks: 200, duration: 120, question_types: 'Hindi/English, Logic, Math, Interpersonal Communication' },
        { name: 'Mains: GS 1 to 6 Papers + Essay', questions: 120, marks: 1500, duration: 1080, question_types: 'Descriptive GS + Mandatory State Special Papers (e.g. UP GK Paper 5 & 6 in UPPSC)' },
        { name: 'Interview', questions: 1, marks: 100, duration: 25, question_types: 'State Administrative Panel Viva Voce' }
      ]),
      total_marks: 1600,
      total_questions: 371,
      marking_scheme: 'Written Mains + Interview decides merit for SDM, DSP, BDO ranks',
      duration_minutes: 1345
    },
    {
      id: 'str-upsc-capf',
      exam_id: 'ex-upsc-capf',
      tier_name: 'CAPF (AC) Single-Day Written Exam (Paper 1 + Paper 2) + PET + Interview',
      sections_json: JSON.stringify([
        { name: 'Paper 1: General Ability and Intelligence', questions: 125, marks: 250, duration: 120, question_types: 'Objective MCQ (+2 / -0.66) covering GS, Science, Reasoning' },
        { name: 'Paper 2: General Studies, Essay and Comprehension', questions: 6, marks: 200, duration: 180, question_types: 'Descriptive: 4 Essays, 2 Arguments, 2 Reports, Précis, Comprehension' }
      ]),
      total_marks: 450,
      total_questions: 131,
      marking_scheme: 'Paper 1 (250M) + Paper 2 (200M) + Interview/Personality (150M) = 600 Total Marks',
      duration_minutes: 300
    },
    {
      id: 'str-upsc-epfo',
      exam_id: 'ex-upsc-epfo',
      tier_name: 'EPFO EO/AO & APFC Recruitment Test (RT + Interview)',
      sections_json: JSON.stringify([
        { name: 'Recruitment Test (Objective MCQ)', questions: 120, marks: 300, duration: 120, question_types: 'Indian Freedom Movement, Economy, Labour Laws, Industrial Relations, Social Security, Computer Apps, Math' },
        { name: 'Interview / Personality Round', questions: 1, marks: 100, duration: 25, question_types: 'Administrative Board Viva' }
      ]),
      total_marks: 300,
      total_questions: 121,
      marking_scheme: '75:25 Weightage (RT 75%, Interview 25%); +2.5 / -0.83 marking in RT',
      duration_minutes: 145
    },
    {
      id: 'str-upsc-cds',
      exam_id: 'ex-upsc-cds',
      tier_name: 'CDS Written Examination + 5-Day SSB Interview',
      sections_json: JSON.stringify([
        { name: 'English Language', questions: 120, marks: 100, duration: 120, question_types: 'Vocabulary, Grammar, Sentence Ordering, Comprehension' },
        { name: 'General Knowledge', questions: 120, marks: 100, duration: 120, question_types: 'History, Geography, Defence, Polity, Science, Current Events' },
        { name: 'Elementary Mathematics (Except OTA)', questions: 100, marks: 100, duration: 120, question_types: 'Arithmetic, Algebra, Trigonometry, Geometry, Mensuration' }
      ]),
      total_marks: 300,
      total_questions: 340,
      marking_scheme: '+0.83 / -0.27; Written (300M for IMA/AFA, 200M for OTA) + SSB Interview (300M/200M)',
      duration_minutes: 360
    },
    // UGC-NET (JRF & Assistant Professor)
    {
      id: 'str-ugc-net',
      exam_id: 'ex-ugc-net-jrf',
      tier_name: 'UGC-NET Single 3-Hour CBT Session (Paper 1 + Paper 2, No Break)',
      sections_json: JSON.stringify([
        { name: 'Paper 1: General Teaching & Research Aptitude (Common to All 83 Subjects)', questions: 50, marks: 100, duration: 60, question_types: '10 Units × 5 Qs each: Teaching Aptitude, Research Aptitude, RC, Communication, Math, Logical/Pramanas, DI, ICT, Environment, Higher Education' },
        { name: 'Paper 2: Domain Subject Specialization (Commerce, Management, Pol Sci, English, History, etc.)', questions: 100, marks: 200, duration: 120, question_types: '10 Core Units covering Post-Graduate Level Core Concepts, Thematic Questions, Assertion-Reason, Matching' }
      ]),
      total_marks: 300,
      total_questions: 150,
      marking_scheme: '+2 for Correct, NO NEGATIVE MARKING, 0 for Unattempted; Single 180-minute window with free navigation between Paper 1 and Paper 2',
      duration_minutes: 180
    },
    // State SET
    {
      id: 'str-state-set',
      exam_id: 'ex-state-set',
      tier_name: 'State Eligibility Test (Paper 1 + Paper 2)',
      sections_json: JSON.stringify([
        { name: 'Paper 1: General Teaching & Research Aptitude', questions: 50, marks: 100, duration: 60, question_types: 'Identical 10 units to UGC-NET Paper 1 with occasional state higher education questions' },
        { name: 'Paper 2: Domain Subject (State Nodal Syllabus)', questions: 100, marks: 200, duration: 120, question_types: '100 Subject Objective Questions (100% overlap with UGC-NET syllabus)' }
      ]),
      total_marks: 300,
      total_questions: 150,
      marking_scheme: '+2 for Correct, NO NEGATIVE MARKING; Qualifying 6% aggregate merit rule',
      duration_minutes: 180
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
    // MBA Colleges (Comprehensive Top Colleges Directory for all 5 Exams)
    // --- 1. CAT Top Colleges ---
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
          degree_level: 'MBA',
          seats: 395,
          duration_years: 2,
          avg_package_lpa: 34.36,
          median_package_lpa: 31.50,
          exam_cutoff_percentile: '99.5+ Percentile (Gen)',
          exam_cutoff_rank: 'Top 500 in CAT',
          academic_cutoff: '10th/12th/Grad min 80%+ for composite score shortlisting',
          selection_process: 'CAT Score -> AWT (Analytical Writing Test) -> Personal Interview'
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
      id: 'col-iimc',
      category_id: 'cat-mba',
      name: 'Indian Institute of Management Calcutta (IIM-C)',
      code: 'IIMC',
      location: 'Kolkata, West Bengal',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Management Rank #4 | Triple Crown (AACSB, AMBA, EQUIS)',
      website: 'https://iimcal.ac.in',
      data_status: 'DEMO',
      source: 'IIM Calcutta Official Placement Report',
      programs: [
        {
          id: 'prg-iimc-pgp',
          exam_code: 'CAT',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 462,
          duration_years: 2,
          avg_package_lpa: 35.07,
          median_package_lpa: 33.67,
          exam_cutoff_percentile: '99.0+ Percentile (Heavy Quantitative Weightage)',
          exam_cutoff_rank: 'Top 750 in CAT',
          academic_cutoff: '10th/12th/Graduation 50% min (Heavy CAT weight 56% in shortlist)',
          selection_process: 'CAT Score (56%) -> WAT & PI (Personal Interview)'
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
      accreditation: 'Premier Central University Faculty | Lowest Fee & Highest ROI in India',
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
          exam_cutoff_percentile: '99.2+ Percentile (VARC: 40%, QA: 30%, DILR: 30%)',
          exam_cutoff_rank: 'Top 600 in CAT',
          academic_cutoff: 'Total 2-year fee is only ₹2.0 Lakhs! ROI > 1700%',
          selection_process: 'Weighted CAT Score -> Extempore Speech -> Personal Interview'
        }
      ]
    },
    {
      id: 'col-iiml',
      category_id: 'cat-mba',
      name: 'Indian Institute of Management Lucknow (IIM-L)',
      code: 'IIML',
      location: 'Lucknow, Uttar Pradesh',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Management Rank #6 | AACSB & AMBA Accredited',
      website: 'https://iiml.ac.in',
      data_status: 'DEMO',
      source: 'IIM Lucknow Placement Bulletin',
      programs: [
        {
          id: 'prg-iiml-pgp',
          exam_code: 'CAT',
          program_name: 'Post Graduate Programme in Management (PGP)',
          degree_level: 'MBA',
          seats: 495,
          duration_years: 2,
          avg_package_lpa: 32.20,
          median_package_lpa: 30.00,
          exam_cutoff_percentile: '98.5+ Percentile',
          exam_cutoff_rank: 'Top 1200 in CAT',
          academic_cutoff: 'Past academic consistency + work experience bonus',
          selection_process: 'CAT (60%) -> WAT & PI (Personal Interview)'
        }
      ]
    },
    {
      id: 'col-iimk',
      category_id: 'cat-mba',
      name: 'Indian Institute of Management Kozhikode (IIM-K)',
      code: 'IIMK',
      location: 'Kozhikode, Kerala',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Management Rank #3 | EQUIS & AMBA Accredited',
      website: 'https://iimk.ac.in',
      data_status: 'DEMO',
      source: 'IIM Kozhikode Admission Notification',
      programs: [
        {
          id: 'prg-iimk-pgp',
          exam_code: 'CAT',
          program_name: 'Post Graduate Programme in Management (PGP)',
          degree_level: 'MBA',
          seats: 480,
          duration_years: 2,
          avg_package_lpa: 31.02,
          median_package_lpa: 27.00,
          exam_cutoff_percentile: '98.0+ Percentile',
          exam_cutoff_rank: 'Top 1500 in CAT',
          academic_cutoff: 'Strong diversity points for female and non-engineering candidates',
          selection_process: 'CAT Score + Diversity Factor -> WAT/PI'
        }
      ]
    },
    {
      id: 'col-spjimr',
      category_id: 'cat-mba',
      name: 'S.P. Jain Institute of Management and Research (SPJIMR)',
      code: 'SPJIMR',
      location: 'Mumbai, Maharashtra',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB & AMBA Accredited | Top 5 B-School in India',
      website: 'https://spjimr.org',
      data_status: 'DEMO',
      source: 'SPJIMR Official Admission Policy',
      programs: [
        {
          id: 'prg-spjimr-pgdm',
          exam_code: 'CAT',
          program_name: 'Post Graduate Diploma in Management (PGDM)',
          degree_level: 'PGDM',
          seats: 240,
          duration_years: 2,
          avg_package_lpa: 33.00,
          median_package_lpa: 31.50,
          exam_cutoff_percentile: '85+%ile (Profile-based Call) / 95+%ile (Score-based)',
          exam_cutoff_rank: 'Dual Call Criteria: Profile vs Score',
          academic_cutoff: 'Excellent 10th/12th/Grad or notable extracurricular achievements',
          selection_process: 'Early Profile Shortlist -> Group Interview Round 1 & 2'
        }
      ]
    },
    {
      id: 'col-mdi',
      category_id: 'cat-mba',
      name: 'Management Development Institute (MDI Gurgaon)',
      code: 'MDI',
      location: 'Gurugram, Haryana',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB, AMBA & SAQS Accredited | Premier NCR B-School',
      website: 'https://mdi.ac.in',
      data_status: 'DEMO',
      source: 'MDI Gurgaon Official Placement Report',
      programs: [
        {
          id: 'prg-mdi-pgdm',
          exam_code: 'CAT',
          program_name: 'Post Graduate Diploma in Management (PGDM)',
          degree_level: 'PGDM',
          seats: 360,
          duration_years: 2,
          avg_package_lpa: 27.67,
          median_package_lpa: 26.13,
          exam_cutoff_percentile: '95.0+ Percentile',
          exam_cutoff_rank: 'Top 3500 in CAT',
          academic_cutoff: '50% in graduation; 10th & 12th minimum 50%',
          selection_process: 'CAT Score -> GD & PI Round'
        }
      ]
    },
    {
      id: 'col-sjmsom',
      category_id: 'cat-mba',
      name: 'Shailesh J. Mehta School of Management, IIT Bombay',
      code: 'SJMSOM',
      location: 'Mumbai, Maharashtra',
      institution_type: 'Institute of National Importance',
      accreditation: 'Top Tech B-School | High Tech-Consulting & Finance Placements',
      website: 'https://som.iitb.ac.in',
      data_status: 'DEMO',
      source: 'SJMSOM IIT Bombay Admission Report',
      programs: [
        {
          id: 'prg-sjmsom-mba',
          exam_code: 'CAT',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 152,
          duration_years: 2,
          avg_package_lpa: 28.88,
          median_package_lpa: 26.64,
          exam_cutoff_percentile: '98.5+ Percentile',
          exam_cutoff_rank: 'Top 1200 in CAT',
          academic_cutoff: '4-year Bachelor degree (Engineering/Technology/Pharmacy/Arch)',
          selection_process: 'CAT Score -> Personal Interview'
        }
      ]
    },

    // --- 2. XAT Top Colleges ---
    {
      id: 'col-xlri',
      category_id: 'cat-mba',
      name: 'XLRI Xavier School of Management (Jamshedpur & Delhi-NCR)',
      code: 'XLRI',
      location: 'Jamshedpur, Jharkhand & Jhajjar, NCR',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB, AMBA & NBA Accredited | #1 Private B-School in India',
      website: 'https://xlri.ac.in',
      data_status: 'DEMO',
      source: 'XLRI Official Admission Criteria (Seed)',
      programs: [
        {
          id: 'prg-xlri-bm',
          exam_code: 'XAT',
          program_name: 'PGDM (Business Management / Human Resource Management)',
          degree_level: 'PGDM',
          seats: 540,
          duration_years: 2,
          avg_package_lpa: 32.70,
          median_package_lpa: 30.00,
          exam_cutoff_percentile: '96.0+ Percentile (BM) / 94.0+ Percentile (HRM)',
          exam_cutoff_rank: 'Top 1200 in XAT',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'XAT Score with Sectional Cutoffs (DM/VALR/QADI) -> GD/PI Round'
        }
      ]
    },
    {
      id: 'col-ximb',
      category_id: 'cat-mba',
      name: 'Xavier Institute of Management (XIMB Bhubaneswar)',
      code: 'XIMB',
      location: 'Bhubaneswar, Odisha',
      institution_type: 'Private Autonomous',
      accreditation: 'Premier Jesuit B-School | Top Consulting & IT Recruiter',
      website: 'https://ximb.edu.in',
      data_status: 'DEMO',
      source: 'XIMB Official Placement Report',
      programs: [
        {
          id: 'prg-ximb-bm',
          exam_code: 'XAT',
          program_name: 'MBA in Business Management (BM)',
          degree_level: 'MBA',
          seats: 360,
          duration_years: 2,
          avg_package_lpa: 20.03,
          median_package_lpa: 19.25,
          exam_cutoff_percentile: '91.0+ Percentile in XAT / 91.0+ in CAT',
          exam_cutoff_rank: 'Top 3000 in XAT',
          academic_cutoff: 'Three-year Bachelor’s Degree with 55% marks',
          selection_process: 'XAT/CAT Score -> Writing Ability Test & Personal Interview'
        }
      ]
    },
    {
      id: 'col-gim',
      category_id: 'cat-mba',
      name: 'Goa Institute of Management (GIM Goa)',
      code: 'GIM',
      location: 'Sanquelim, Goa',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB & AMBA Accredited | Premier BDA & Healthcare MBA',
      website: 'https://gim.ac.in',
      data_status: 'DEMO',
      source: 'GIM Goa Placement Report',
      programs: [
        {
          id: 'prg-gim-pgdm',
          exam_code: 'XAT',
          program_name: 'PGDM (Core, Big Data Analytics, Healthcare, BIFS)',
          degree_level: 'PGDM',
          seats: 300,
          duration_years: 2,
          avg_package_lpa: 15.00,
          median_package_lpa: 14.50,
          exam_cutoff_percentile: '85.0+ Percentile in XAT / 85.0+ in CAT',
          exam_cutoff_rank: 'Top 5000 in XAT/CAT',
          academic_cutoff: 'Bachelor’s degree with 50% marks',
          selection_process: 'XAT/CAT/CMAT/GMAT Score -> Achievers Round / Elite PI'
        }
      ]
    },
    {
      id: 'col-tapmi',
      category_id: 'cat-mba',
      name: 'T.A. Pai Management Institute (TAPMI Manipal)',
      code: 'TAPMI',
      location: 'Manipal, Karnataka',
      institution_type: 'Private Autonomous (MAHE)',
      accreditation: 'AACSB & AMBA Accredited',
      website: 'https://tapmi.edu.in',
      data_status: 'DEMO',
      source: 'TAPMI Official Report',
      programs: [
        {
          id: 'prg-tapmi-mba',
          exam_code: 'XAT',
          program_name: 'MBA (General, BFSI, HR, Marketing)',
          degree_level: 'MBA',
          seats: 420,
          duration_years: 2,
          avg_package_lpa: 14.60,
          median_package_lpa: 13.50,
          exam_cutoff_percentile: '85.0+ Percentile in XAT / 85.0+ in CAT',
          exam_cutoff_rank: 'Top 6000 in XAT/CAT',
          academic_cutoff: '50% in graduation',
          selection_process: 'XAT/CAT Score -> English Proficiency Test -> PI'
        }
      ]
    },

    // --- 3. SNAP Top Colleges (Symbiosis Institutes) ---
    {
      id: 'col-sibm-pune',
      category_id: 'cat-mba',
      name: 'Symbiosis Institute of Business Management (SIBM Pune)',
      code: 'SIBM-PUNE',
      location: 'Lavale, Pune, Maharashtra',
      institution_type: 'Private Deemed University',
      accreditation: 'Flagship Symbiosis B-School | NAAC A++ Grade',
      website: 'https://sibmpune.edu.in',
      data_status: 'DEMO',
      source: 'SIBM Pune Placement Report',
      programs: [
        {
          id: 'prg-sibm-pune-mba',
          exam_code: 'SNAP',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 180,
          duration_years: 2,
          avg_package_lpa: 28.16,
          median_package_lpa: 25.00,
          exam_cutoff_percentile: '98.5+ Percentile (~42-44/60 Marks in SNAP)',
          exam_cutoff_rank: 'Top 1000 in SNAP',
          academic_cutoff: 'Graduation with 50% (45% for SC/ST)',
          selection_process: 'SNAP Score (50%) -> GE-PIWAT (Group Exercise, Personal Interview, WAT: 50%)'
        }
      ]
    },
    {
      id: 'col-scmhrd',
      category_id: 'cat-mba',
      name: 'Symbiosis Centre for Management & HRD (SCMHRD Pune)',
      code: 'SCMHRD',
      location: 'Hinjawadi, Pune, Maharashtra',
      institution_type: 'Private Deemed University',
      accreditation: 'Top HR & Infrastructure Development Management B-School',
      website: 'https://scmhrd.edu',
      data_status: 'DEMO',
      source: 'SCMHRD Placement Report',
      programs: [
        {
          id: 'prg-scmhrd-mba',
          exam_code: 'SNAP',
          program_name: 'MBA (HR, Marketing, Finance, Ops & Infrastructure Dev)',
          degree_level: 'MBA',
          seats: 180,
          duration_years: 2,
          avg_package_lpa: 23.71,
          median_package_lpa: 21.00,
          exam_cutoff_percentile: '97.0+ Percentile (~40-42/60 Marks in SNAP)',
          exam_cutoff_rank: 'Top 2000 in SNAP',
          academic_cutoff: 'Graduation with 50% marks',
          selection_process: 'SNAP Score -> GE-PIWAT Round'
        }
      ]
    },
    {
      id: 'col-siib',
      category_id: 'cat-mba',
      name: 'Symbiosis Institute of International Business (SIIB Pune)',
      code: 'SIIB',
      location: 'Hinjawadi, Pune, Maharashtra',
      institution_type: 'Private Deemed University',
      accreditation: 'Specialized International Business, Agri-Business & Energy B-School',
      website: 'https://siib.ac.in',
      data_status: 'DEMO',
      source: 'SIIB Official Report',
      programs: [
        {
          id: 'prg-siib-mba',
          exam_code: 'SNAP',
          program_name: 'MBA in International Business (IB) / Agri-Business / Energy',
          degree_level: 'MBA',
          seats: 210,
          duration_years: 2,
          avg_package_lpa: 13.51,
          median_package_lpa: 12.80,
          exam_cutoff_percentile: '93.0+ Percentile (~36-38/60 Marks in SNAP)',
          exam_cutoff_rank: 'Top 5000 in SNAP',
          academic_cutoff: 'Graduation with 50% marks',
          selection_process: 'SNAP Score -> GE-PIWAT'
        }
      ]
    },
    {
      id: 'col-sibm-blr',
      category_id: 'cat-mba',
      name: 'Symbiosis Institute of Business Management (SIBM Bengaluru)',
      code: 'SIBM-BLR',
      location: 'Electronic City, Bengaluru, Karnataka',
      institution_type: 'Private Deemed University',
      accreditation: 'Strategic IT Capital Location | High Corporate Engagement',
      website: 'https://sibm.edu.in',
      data_status: 'DEMO',
      source: 'SIBM Bengaluru Placement Report',
      programs: [
        {
          id: 'prg-sibm-blr-mba',
          exam_code: 'SNAP',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 180,
          duration_years: 2,
          avg_package_lpa: 13.48,
          median_package_lpa: 12.50,
          exam_cutoff_percentile: '90.0+ Percentile (~34-36/60 Marks in SNAP)',
          exam_cutoff_rank: 'Top 7000 in SNAP',
          academic_cutoff: 'Graduation with 50% marks',
          selection_process: 'SNAP Score -> GE-PIWAT'
        }
      ]
    },

    // --- 4. NMAT Top Colleges ---
    {
      id: 'col-nmims-mumbai',
      category_id: 'cat-mba',
      name: 'NMIMS School of Business Management (SBM Mumbai)',
      code: 'NMIMS-MUMBAI',
      location: 'Vile Parle, Mumbai, Maharashtra',
      institution_type: 'Private Deemed University',
      accreditation: 'AACSB Accredited | Top 10 Private B-School in India',
      website: 'https://nmims.edu',
      data_status: 'DEMO',
      source: 'NMIMS Placement Report',
      programs: [
        {
          id: 'prg-nmims-mba',
          exam_code: 'NMAT',
          program_name: 'Master of Business Administration (Core MBA / MBA HR)',
          degree_level: 'MBA',
          seats: 600,
          duration_years: 2,
          avg_package_lpa: 26.63,
          median_package_lpa: 24.50,
          exam_cutoff_percentile: '232-235+ Score in NMAT (Sectional: 70+ in each)',
          exam_cutoff_rank: 'Top 2500 in NMAT',
          academic_cutoff: 'Graduation with 50% in any discipline',
          selection_process: 'NMAT Score (1st attempt only for Mumbai campus) -> WAT/PI'
        }
      ]
    },
    {
      id: 'col-nmims-blr',
      category_id: 'cat-mba',
      name: 'NMIMS Bengaluru Campus',
      code: 'NMIMS-BLR',
      location: 'Bannerghatta Road, Bengaluru, Karnataka',
      institution_type: 'Private Deemed University',
      accreditation: 'AMBA Accredited',
      website: 'https://nmimsbengaluru.org',
      data_status: 'DEMO',
      source: 'NMIMS Bengaluru Report',
      programs: [
        {
          id: 'prg-nmims-blr-mba',
          exam_code: 'NMAT',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 240,
          duration_years: 2,
          avg_package_lpa: 14.00,
          median_package_lpa: 13.00,
          exam_cutoff_percentile: '220+ Score in NMAT',
          exam_cutoff_rank: 'Top 6000 in NMAT',
          academic_cutoff: 'Graduation with 50% marks',
          selection_process: 'NMAT Score -> Watson-Glaser Test -> PI'
        }
      ]
    },
    {
      id: 'col-kjsom',
      category_id: 'cat-mba',
      name: 'K J Somaiya Institute of Management (KJSIM Mumbai)',
      code: 'KJSOM',
      location: 'Vidyavihar, Mumbai, Maharashtra',
      institution_type: 'Private Autonomous',
      accreditation: 'AACSB Member | Massive Financial Capital Alumni Base',
      website: 'https://simsr.somaiya.edu',
      data_status: 'DEMO',
      source: 'K J Somaiya Placement Report',
      programs: [
        {
          id: 'prg-kjsom-mba',
          exam_code: 'NMAT',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 600,
          duration_years: 2,
          avg_package_lpa: 12.50,
          median_package_lpa: 12.00,
          exam_cutoff_percentile: '222+ in NMAT / 85+ in CAT / 85+ in XAT',
          exam_cutoff_rank: 'Top 5500 in NMAT',
          academic_cutoff: 'Bachelor’s degree with 50% marks',
          selection_process: 'NMAT/CAT/XAT Score -> Case Analysis & PI'
        }
      ]
    },

    // --- 5. CMAT Top Colleges ---
    {
      id: 'col-jbims',
      category_id: 'cat-mba',
      name: 'Jamnalal Bajaj Institute of Management Studies (JBIMS Mumbai)',
      code: 'JBIMS',
      location: 'Churchgate, Mumbai, Maharashtra',
      institution_type: 'Government Autonomous (Mumbai University)',
      accreditation: 'CEO Factory of India | Highest ROI in Maharashtra (Fee ₹6L, CTC ₹28 LPA)',
      website: 'https://jbims.edu',
      data_status: 'DEMO',
      source: 'JBIMS Official Placement Report',
      programs: [
        {
          id: 'prg-jbims-mms',
          exam_code: 'CMAT',
          program_name: 'Masters in Management Studies (MMS)',
          degree_level: 'MBA / MMS',
          seats: 150,
          duration_years: 2,
          avg_package_lpa: 28.02,
          median_package_lpa: 26.50,
          exam_cutoff_percentile: '99.99 Percentile in CMAT (~345+/400) / 99.93+ in MH-CET',
          exam_cutoff_rank: 'All India Rank 1 - 30 in CMAT',
          academic_cutoff: 'Total 2-year fee ₹6.0 Lakhs! Average salary ₹28.02 LPA',
          selection_process: 'Centralized CAP Round via DTE Maharashtra / CMAT Score'
        }
      ]
    },
    {
      id: 'col-simsree',
      category_id: 'cat-mba',
      name: 'Sydenham Institute of Management (SIMSREE Mumbai)',
      code: 'SIMSREE',
      location: 'Churchgate, Mumbai, Maharashtra',
      institution_type: 'Government Autonomous',
      accreditation: 'Unbeatable ROI: 2-Year Fee is only ₹1.5 Lakhs vs ₹15.3 LPA Package!',
      website: 'https://simsree.org',
      data_status: 'DEMO',
      source: 'SIMSREE Placement Bulletin',
      programs: [
        {
          id: 'prg-simsree-mms',
          exam_code: 'CMAT',
          program_name: 'Masters in Management Studies (MMS)',
          degree_level: 'MMS',
          seats: 180,
          duration_years: 2,
          avg_package_lpa: 15.30,
          median_package_lpa: 14.50,
          exam_cutoff_percentile: '99.8+ Percentile in CMAT (~330+/400)',
          exam_cutoff_rank: 'All India Top 100 in CMAT',
          academic_cutoff: '50% in graduation; Ultra-low fees of ₹1.5 Lakhs',
          selection_process: 'DTE Maharashtra CAP Counselling'
        }
      ]
    },
    {
      id: 'col-greatlakes',
      category_id: 'cat-mba',
      name: 'Great Lakes Institute of Management (Chennai & Gurgaon)',
      code: 'GREATLAKES',
      location: 'Chennai, Tamil Nadu',
      institution_type: 'Private Autonomous',
      accreditation: 'AMBA & SAQS Accredited | #1 for Tech & Analytics MBA',
      website: 'https://greatlakes.edu.in',
      data_status: 'DEMO',
      source: 'Great Lakes Placement Report',
      programs: [
        {
          id: 'prg-greatlakes-pgdm',
          exam_code: 'CMAT',
          program_name: 'PGDM (2-Year) & PGPM (1-Year for Experienced)',
          degree_level: 'PGDM',
          seats: 300,
          duration_years: 2,
          avg_package_lpa: 14.50,
          median_package_lpa: 13.80,
          exam_cutoff_percentile: '90.0+ Percentile in CMAT / 85+ in CAT / 85+ in XAT',
          exam_cutoff_rank: 'Top 5000 in CMAT',
          academic_cutoff: 'Graduation with minimum 50% marks',
          selection_process: 'CMAT/CAT/XAT Score -> Analytical Writing Test -> PI'
        }
      ]
    },
    {
      id: 'col-pumba',
      category_id: 'cat-mba',
      name: 'Department of Management Sciences, Savitribai Phule Pune Univ (PUMBA)',
      code: 'PUMBA',
      location: 'Ganeshkhind, Pune, Maharashtra',
      institution_type: 'Government University Department',
      accreditation: 'Affordable Premier Govt B-School in Pune (Fee ₹1.4 Lakhs)',
      website: 'https://pumba.in',
      data_status: 'DEMO',
      source: 'PUMBA Pune Report',
      programs: [
        {
          id: 'prg-pumba-mba',
          exam_code: 'CMAT',
          program_name: 'Master of Business Administration (MBA)',
          degree_level: 'MBA',
          seats: 180,
          duration_years: 2,
          avg_package_lpa: 8.85,
          median_package_lpa: 8.20,
          exam_cutoff_percentile: '95.0+ Percentile in CMAT / 98.0+ in MH-CET',
          exam_cutoff_rank: 'Top 3000 in CMAT',
          academic_cutoff: 'Graduation with 50% marks; 2-year fee is ₹1.4 Lakhs',
          selection_process: 'Maharashtra DTE Centralized Admission'
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

    // --- PHARMA PREMIER INSTITUTES & RECRUITMENT AUTHORITIES ---
    {
      id: 'col-niper-mohali',
      category_id: 'cat-pharma',
      name: 'NIPER S.A.S. Nagar (Mohali - Apex National Institute)',
      code: 'NIPER-MOHALI',
      location: 'Sector 67, S.A.S. Nagar, Mohali, Punjab',
      institution_type: 'Institute of National Importance (Ministry of Chemicals & Fertilizers)',
      accreditation: 'NIRF Pharmacy Overall Rank #1 in India',
      website: 'https://niper.gov.in',
      data_status: 'DEMO',
      source: 'NIPER Placement Report & NIPER JEE Counseling Archive (Seed)',
      programs: [
        {
          id: 'prg-niper-pharmaceutics',
          exam_code: 'NIPER-JEE',
          program_name: 'M.S. (Pharm.) in Pharmaceutics & Novel Drug Delivery',
          degree_level: 'Master of Science in Pharmacy',
          seats: 45,
          duration_years: 2,
          avg_package_lpa: 9.80, // Top MNC placements: Novartis, Dr. Reddy’s, Sun Pharma, Cipla
          median_package_lpa: 9.00,
          exam_cutoff_percentile: 'NIPER JEE Rank Top 80',
          exam_cutoff_rank: 'AIR 1 - 85 in NIPER JEE',
          academic_cutoff: 'B.Pharm with min 60% or 6.75 CGPA + Valid GPAT Score',
          selection_process: 'GPAT Qualification -> NIPER JEE Rank -> Web Counseling'
        },
        {
          id: 'prg-niper-pharmacology',
          exam_code: 'NIPER-JEE',
          program_name: 'M.S. (Pharm.) in Pharmacology & Toxicology',
          degree_level: 'Master of Science in Pharmacy (Preclinical R&D)',
          seats: 35,
          duration_years: 2,
          avg_package_lpa: 9.20,
          median_package_lpa: 8.80,
          exam_cutoff_percentile: 'NIPER JEE Rank Top 120',
          exam_cutoff_rank: 'AIR 1 - 120',
          academic_cutoff: 'B.Pharm with min 60% + Valid GPAT Score',
          selection_process: 'NIPER JEE Written Merit'
        }
      ]
    },
    {
      id: 'col-niper-hyd-ahm',
      category_id: 'cat-pharma',
      name: 'NIPER Hyderabad & NIPER Ahmedabad',
      code: 'NIPER-HYD-AHM',
      location: 'Genome Valley Hyderabad & Gandhinagar Ahmedabad',
      institution_type: 'Institute of National Importance',
      accreditation: 'NIRF Pharmacy Top 5 (Medical Device Hub & Genome Hub)',
      website: 'https://niperhyd.ac.in',
      data_status: 'DEMO',
      source: 'NIPER Joint Counseling Data',
      programs: [
        {
          id: 'prg-niper-regulatory',
          exam_code: 'NIPER-JEE',
          program_name: 'M.S. (Pharm.) in Regulatory Affairs & Medical Devices',
          degree_level: 'Postgraduate Specialized',
          seats: 60,
          duration_years: 2,
          avg_package_lpa: 8.90,
          median_package_lpa: 8.50,
          exam_cutoff_percentile: 'NIPER JEE Rank Top 350',
          exam_cutoff_rank: 'AIR 100 - 350',
          academic_cutoff: 'B.Pharm with min 60% + Valid GPAT',
          selection_process: 'NIPER JEE Merit Counseling'
        },
        {
          id: 'prg-niper-mba-pharm',
          exam_code: 'NIPER-JEE',
          program_name: 'MBA (Pharm.) in Pharmaceutical Management',
          degree_level: 'Pharma Executive MBA',
          seats: 50,
          duration_years: 2,
          avg_package_lpa: 10.50, // High demand in pharma marketing & brand management
          median_package_lpa: 10.00,
          exam_cutoff_percentile: 'NIPER JEE Management Rank Top 150',
          exam_cutoff_rank: 'Top 150',
          academic_cutoff: 'B.Pharm / B.Tech / M.Sc with GPAT/CAT score',
          selection_process: 'NIPER JEE (Management Test) + Group Discussion + Personal Interview'
        }
      ]
    },
    {
      id: 'col-ict-mumbai',
      category_id: 'cat-pharma',
      name: 'Institute of Chemical Technology (ICT Mumbai - UDCT)',
      code: 'ICT-MUMBAI',
      location: 'Matunga, Mumbai, Maharashtra',
      institution_type: 'State Deemed Research University (Elite Status)',
      accreditation: 'NIRF Overall Top 15 / Pharmacy Rank #5 (Legacy of Padma Vibhushan Prof. M.M. Sharma)',
      website: 'https://ictmumbai.edu.in',
      data_status: 'DEMO',
      source: 'ICT Mumbai Placement Report',
      programs: [
        {
          id: 'prg-ict-mpharm',
          exam_code: 'GPAT',
          program_name: 'M.Pharm in Pharmaceutics & Bioprocess Technology',
          degree_level: 'Master of Pharmacy',
          seats: 30,
          duration_years: 2,
          avg_package_lpa: 10.20,
          median_package_lpa: 9.80,
          exam_cutoff_percentile: 'GPAT Score 220+ / 500 (AIR Top 200)',
          exam_cutoff_rank: 'AIR Top 200 in GPAT',
          academic_cutoff: 'B.Pharm with min 60% + GPAT Qualified',
          selection_process: 'CAP Counseling based on GPAT Merit'
        }
      ]
    },
    {
      id: 'col-jamia-hamdard',
      category_id: 'cat-pharma',
      name: 'Jamia Hamdard (Faculty of Pharmacy - SPER New Delhi)',
      code: 'JAMIA-HAMDARD',
      location: 'Hamdard Nagar, New Delhi',
      institution_type: 'Deemed to be University',
      accreditation: 'NIRF Pharmacy Rank #2 in India',
      website: 'https://jamiahamdard.edu',
      data_status: 'DEMO',
      source: 'SPER Placement Gazette',
      programs: [
        {
          id: 'prg-jh-pharmacology',
          exam_code: 'GPAT',
          program_name: 'M.Pharm in Pharmacology & Clinical Research',
          degree_level: 'Master of Pharmacy',
          seats: 40,
          duration_years: 2,
          avg_package_lpa: 8.50,
          median_package_lpa: 8.00,
          exam_cutoff_percentile: 'GPAT Score 190+ / 500',
          exam_cutoff_rank: 'AIR Top 600 in GPAT',
          academic_cutoff: 'B.Pharm with min 55% marks + Valid GPAT',
          selection_process: 'GPAT Merit Counseling'
        }
      ]
    },
    {
      id: 'col-cdsco-di',
      category_id: 'cat-pharma',
      name: 'Central Drugs Standard Control Organization (CDSCO - Ministry of Health)',
      code: 'CDSCO',
      location: 'FDA Bhawan, Kotla Road, New Delhi & Port/Zonal Offices',
      institution_type: 'Apex National Regulatory Authority (Government of India)',
      accreditation: 'Statutory National Drug Authority under Drugs & Cosmetics Act',
      website: 'https://cdsco.gov.in',
      data_status: 'DEMO',
      source: 'UPSC CDSCO Drug Inspector Recruitment Notification',
      programs: [
        {
          id: 'prg-cdsco-di',
          exam_code: 'DRUG-INSPECTOR',
          program_name: 'Central Drug Inspector (CDI / ADC Cadre)',
          degree_level: 'Central Gazetted Class 1 / 2 (Pay Level 8/10: Basic ₹47,600 to ₹56,100)',
          seats: 120,
          duration_years: 0,
          avg_package_lpa: 11.50, // Gross Salary ~₹85,000 - ₹1,00,000/mo + Govt Allowances & Quarters
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'UPSC Recruitment Test Score 68%+ in CBT',
          exam_cutoff_rank: 'Top 120 All India Merit',
          academic_cutoff: 'Degree in Pharmacy or Pharmaceutical Sciences + 18 months manufacturing experience in Schedule C/C1 drugs',
          selection_process: 'UPSC Written Recruitment Test (CBT) + Personal Interview'
        }
      ]
    },
    {
      id: 'col-state-psc-di',
      category_id: 'cat-pharma',
      name: 'State Drug Inspectorates (UPPSC, MPSC, RPSC, TNPSC Drug Administration)',
      code: 'STATE-DI',
      location: 'State Food & Drug Administration (FDA) Head Offices & Districts',
      institution_type: 'State Government Health & Family Welfare Department',
      accreditation: 'State Statutory Drug Licensing & Enforcement Authority',
      website: 'https://uppsc.up.nic.in',
      data_status: 'DEMO',
      source: 'State PSC Gazetted Notification',
      programs: [
        {
          id: 'prg-state-di',
          exam_code: 'DRUG-INSPECTOR',
          program_name: 'Drug Inspector (DI - State Food & Drug Administration)',
          degree_level: 'State Gazetted Officer (Pay Level 8: Gross ~₹75,000/mo)',
          seats: 380,
          duration_years: 0,
          avg_package_lpa: 9.80,
          median_package_lpa: 9.80,
          exam_cutoff_percentile: 'State Written Score 72%+',
          exam_cutoff_rank: 'State Merit List Top Rankers',
          academic_cutoff: 'B.Pharm degree + State Pharmacy Council Registration',
          selection_process: 'State PSC Written Examination -> Viva/Interview -> Document Verification'
        }
      ]
    },
    {
      id: 'col-govt-hospital-pharmacist',
      category_id: 'cat-pharma',
      name: 'Central & State Government Hospitals (ESIC, RRB Railways, AIIMS)',
      code: 'GOVT-HOSPITAL',
      location: 'ESIC Hospitals, Railway Divisional Hospitals & AIIMS Pan-India',
      institution_type: 'Government Healthcare Network',
      accreditation: 'Central Autonomous & Railway Medical Services',
      website: 'https://esic.gov.in',
      data_status: 'DEMO',
      source: 'ESIC / RRB Pharmacist Recruitment Gazette',
      programs: [
        {
          id: 'prg-esic-rrb-pharmacist',
          exam_code: 'GOVT-PHARMACIST',
          program_name: 'Government Hospital Pharmacist (ESIC / Railway / AIIMS)',
          degree_level: 'Central Govt Group C (Pay Level 5: Basic ₹29,200, Gross ~₹48,000/mo + Perks)',
          seats: 2450,
          duration_years: 0,
          avg_package_lpa: 6.20, // Gross Salary + CGHS Medical + Railway Travel Pass
          median_package_lpa: 6.20,
          exam_cutoff_percentile: 'CBT Score 75+ / 125 Marks',
          exam_cutoff_rank: 'Board Merit',
          academic_cutoff: 'D.Pharm or B.Pharm from PCI approved institute + Registered Pharmacist with State Pharmacy Council',
          selection_process: 'Single-tier Computer Based Test (CBT) -> Document Verification (NO INTERVIEW!)'
        }
      ]
    },

    // --- SSC & Railways Premier Departments & Posts ---
    {
      id: 'col-ssc-mea-css',
      category_id: 'cat-ssc-railways',
      name: 'Ministry of External Affairs & Central Secretariat (CSS / MEA)',
      code: 'CSS-MEA',
      location: 'South Block, North Block, New Delhi & Global Embassies',
      institution_type: 'Central Govt Ministry (Apex Civil Bureaucracy)',
      accreditation: 'DoPT / Ministry of External Affairs (Diplomatic Postings)',
      website: 'https://mea.gov.in',
      data_status: 'DEMO',
      source: 'SSC CGL State Allocation & Cutoff PDF (Seed)',
      programs: [
        {
          id: 'prg-ssc-aso-mea',
          exam_code: 'SSC-CGL',
          program_name: 'Assistant Section Officer (ASO in MEA)',
          degree_level: 'Group B Non-Gazetted (Pay Level 7: Basic ₹44,900)',
          seats: 180,
          duration_years: 0,
          avg_package_lpa: 14.50, // Includes foreign allowances ($3000-4500/mo during embassy postings)
          median_package_lpa: 14.50,
          exam_cutoff_percentile: 'Tier 2 Score 335+ / 390 Marks',
          exam_cutoff_rank: 'Top 350 All India Rank in SSC CGL',
          academic_cutoff: 'Bachelor’s degree in any discipline',
          selection_process: 'Tier 1 CBT Screening -> Tier 2 Merit CBT + DEST Typing Test'
        },
        {
          id: 'prg-ssc-aso-css',
          exam_code: 'SSC-CGL',
          program_name: 'Assistant Section Officer (ASO in CSS - Central Secretariat)',
          degree_level: 'Group B (Pay Level 7: Basic ₹44,900, Gross ~₹82,000/mo)',
          seats: 980,
          duration_years: 0,
          avg_package_lpa: 10.50,
          median_package_lpa: 10.50,
          exam_cutoff_percentile: 'Tier 2 Score 322+ / 390 Marks',
          exam_cutoff_rank: 'Top 1500 All India Rank',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'Tier 1 -> Tier 2 (390M) + Computer Test'
        }
      ]
    },
    {
      id: 'col-ssc-cbic-inspectors',
      category_id: 'cat-ssc-railways',
      name: 'Central Board of Indirect Taxes & Customs (CBIC)',
      code: 'CBIC',
      location: 'Pan-India Custom Houses, Air Cargo & GST Commissionerates',
      institution_type: 'Department of Revenue, Ministry of Finance',
      accreditation: 'Uniformed 3-Star Enforcement & Revenue Inspectorate',
      website: 'https://cbic.gov.in',
      data_status: 'DEMO',
      source: 'CBIC Recruitment Gazette',
      programs: [
        {
          id: 'prg-ssc-gst-inspector',
          exam_code: 'SSC-CGL',
          program_name: 'Inspector of Central GST & Central Excise',
          degree_level: 'Group B (Pay Level 7: Basic ₹44,900, Gross ~₹78,000/mo)',
          seats: 2800,
          duration_years: 0,
          avg_package_lpa: 10.20,
          median_package_lpa: 10.20,
          exam_cutoff_percentile: 'Tier 2 Score 316+ / 390 Marks',
          exam_cutoff_rank: 'Top 3000 All India Rank',
          academic_cutoff: 'Graduation degree + Physical Standard (157.5 cm height & cycling/walking test)',
          selection_process: 'Tier 1 -> Tier 2 Merit CBT -> Physical Endurance Test'
        },
        {
          id: 'prg-ssc-examiner',
          exam_code: 'SSC-CGL',
          program_name: 'Inspector (Examiner / Preventive Officer at Major Seaports)',
          degree_level: 'Group B Uniformed (Customs White Uniform with Gold Epaulettes)',
          seats: 540,
          duration_years: 0,
          avg_package_lpa: 10.50,
          median_package_lpa: 10.50,
          exam_cutoff_percentile: 'Tier 2 Score 328+ / 390 Marks',
          exam_cutoff_rank: 'Top 800 All India Rank',
          academic_cutoff: 'Graduation degree + Physical standard',
          selection_process: 'Tier 1 -> Tier 2 Merit -> Physical Test'
        }
      ]
    },
    {
      id: 'col-ssc-cbdt-iti',
      category_id: 'cat-ssc-railways',
      name: 'Central Board of Direct Taxes (Income Tax Department)',
      code: 'CBDT',
      location: 'Pan-India Directorates of Investigation & Field Ranges',
      institution_type: 'Department of Revenue, Ministry of Finance',
      accreditation: 'Premier Direct Tax Enforcement & Search/Seizure Authority',
      website: 'https://incometaxindia.gov.in',
      data_status: 'DEMO',
      source: 'CBDT Placement & Zone Allocation PDF',
      programs: [
        {
          id: 'prg-ssc-iti',
          exam_code: 'SSC-CGL',
          program_name: 'Inspector of Income Tax (ITI)',
          degree_level: 'Group B (Pay Level 7: Basic ₹44,900, Gross ~₹80,000/mo)',
          seats: 1200,
          duration_years: 0,
          avg_package_lpa: 10.50,
          median_package_lpa: 10.50,
          exam_cutoff_percentile: 'Tier 2 Score 326+ / 390 Marks',
          exam_cutoff_rank: 'Top 1000 All India Rank',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'Tier 1 Screening -> Tier 2 Merit CBT'
        }
      ]
    },
    {
      id: 'col-ssc-ed-cbi',
      category_id: 'cat-ssc-railways',
      name: 'Enforcement Directorate (ED) & Central Bureau of Investigation (CBI)',
      code: 'ED-CBI',
      location: 'Headquarters New Delhi & Zonal Offices',
      institution_type: 'Premier Central Investigation Agencies',
      accreditation: 'Money Laundering (PMLA) & Anti-Corruption Prosecution',
      website: 'https://cbi.gov.in',
      data_status: 'DEMO',
      source: 'CBI / ED Allocation List',
      programs: [
        {
          id: 'prg-ssc-cbi-si',
          exam_code: 'SSC-CGL',
          program_name: 'Sub-Inspector in CBI (Central Bureau of Investigation)',
          degree_level: 'Group B (Pay Level 7: Basic ₹44,900 + 25% Special Security Allowance)',
          seats: 190,
          duration_years: 0,
          avg_package_lpa: 11.50,
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'Tier 2 Score 330+ / 390 Marks',
          exam_cutoff_rank: 'Top 600 All India Rank',
          academic_cutoff: 'Bachelor’s degree in any discipline',
          selection_process: 'Tier 1 -> Tier 2 -> Medical & Physical verification'
        },
        {
          id: 'prg-ssc-ed-aeo',
          exam_code: 'SSC-CGL',
          program_name: 'Assistant Enforcement Officer (AEO in ED)',
          degree_level: 'Group B (Pay Level 7 + 20% Special Allowance)',
          seats: 240,
          duration_years: 0,
          avg_package_lpa: 11.20,
          median_package_lpa: 11.20,
          exam_cutoff_percentile: 'Tier 2 Score 332+ / 390 Marks',
          exam_cutoff_rank: 'Top 500 All India Rank',
          academic_cutoff: 'Recognized Bachelor’s Degree',
          selection_process: 'Tier 1 -> Tier 2 Merit CBT'
        }
      ]
    },
    {
      id: 'col-rrb-railway-stations',
      category_id: 'cat-ssc-railways',
      name: 'Indian Railways - Station Master & Traffic Cadre (RRB NTPC)',
      code: 'RRB-RAILWAYS',
      location: '17 Railway Zones & 68 Divisions Across India',
      institution_type: 'Ministry of Railways (Government of India)',
      accreditation: 'World’s 4th Largest Railway Network',
      website: 'https://indianrailways.gov.in',
      data_status: 'DEMO',
      source: 'RRB NTPC Centralized Employment Notification (CEN)',
      programs: [
        {
          id: 'prg-rrb-sm',
          exam_code: 'RRB-NTPC',
          program_name: 'Station Master (SM) & Train Manager / Goods Guard',
          degree_level: 'Group C Central (Pay Level 6: Basic ₹35,400, Gross ~₹65,000/mo + Perks)',
          seats: 8500,
          duration_years: 0,
          avg_package_lpa: 8.50, // Includes night duty, running & travel allowances
          median_package_lpa: 8.50,
          exam_cutoff_percentile: 'CBT 2 Score 82+ / 120 Marks',
          exam_cutoff_rank: 'Top 500 in Respective RRB Board',
          academic_cutoff: 'Graduation in any discipline + A2 Medical Standard',
          selection_process: 'CBT 1 Screening -> CBT 2 Merit (70%) -> CBAT Aptitude Test (30%) -> Document Verification'
        },
        {
          id: 'prg-rrb-alp-driver',
          exam_code: 'RRB-ALP',
          program_name: 'Assistant Loco Pilot (ALP - Express/Goods Train Operator)',
          degree_level: 'Safety Running Staff (Basic ₹19,900 + Running Allowance ₹40k+/mo)',
          seats: 18799,
          duration_years: 0,
          avg_package_lpa: 7.50, // High running kilometer allowance
          median_package_lpa: 7.50,
          exam_cutoff_percentile: 'CBT 2 Part A Score 74+ / 100 Marks',
          exam_cutoff_rank: 'Board Merit',
          academic_cutoff: '10th + ITI / Diploma / Degree in Mechanical, Electrical, Electronics, Auto',
          selection_process: 'CBT 1 -> CBT 2 (Part A Merit + Part B Trade Qualifying) -> CBAT Aptitude -> A1 Medical (6/6 Eyesight without glasses)'
        }
      ]
    },

    // --- Banking & Insurance Premier Organizations ---
    {
      id: 'col-sbi',
      category_id: 'cat-banking',
      name: 'State Bank of India (SBI Corporate Centre Mumbai)',
      code: 'SBI',
      location: 'Mumbai & Circle Head Offices Across India',
      institution_type: 'Fortune 500 Public Sector Bank (#1 in India)',
      accreditation: 'India’s Largest Commercial Bank with 22,000+ Branches',
      website: 'https://sbi.co.in',
      data_status: 'DEMO',
      source: 'SBI PO Final Cutoff Gazette (Seed)',
      programs: [
        {
          id: 'prg-sbi-po',
          exam_code: 'SBI-PO',
          program_name: 'Probationary Officer (Scale I Junior Management Cadre)',
          degree_level: 'Bank Executive Officer (Basic ₹41,960 + 4 Advance Increments)',
          seats: 2000,
          duration_years: 2, // 2-year probation leading to Assistant Manager
          avg_package_lpa: 16.50, // Total Compensation: Salary + Leased Quarters (up to ₹35k/mo) + Furniture + Medical + Travel
          median_package_lpa: 16.50,
          exam_cutoff_percentile: 'Final Merit Score: ~48-52 / 100 in Mains+PI',
          exam_cutoff_rank: 'Top 2000 in All India Merit',
          academic_cutoff: 'Graduation in ANY stream (No minimum percentage!)',
          selection_process: 'Prelims (100M) -> Mains (250M) -> Psychometric + Group Discussion (20M) + Personal Interview (30M)'
        },
        {
          id: 'prg-sbi-clerk-post',
          exam_code: 'SBI-CLERK',
          program_name: 'Junior Associate (Customer Support & Banking Operations)',
          degree_level: 'Clerical Cadre (Basic ₹19,900, Gross ~₹38,000 - ₹42,000/mo)',
          seats: 8773,
          duration_years: 0,
          avg_package_lpa: 5.40,
          median_package_lpa: 5.40,
          exam_cutoff_percentile: 'State Cutoff: ~72-78 / 100 in Prelims',
          exam_cutoff_rank: 'State Merit List',
          academic_cutoff: 'Graduation in any discipline; Local language proficiency',
          selection_process: 'Prelims CBT (100M) -> Mains CBT (200M) -> NO INTERVIEW! Direct Final Appointment'
        }
      ]
    },
    {
      id: 'col-rbi',
      category_id: 'cat-banking',
      name: 'Reserve Bank of India (RBI Central Office Mumbai)',
      code: 'RBI',
      location: 'Shahid Bhagat Singh Road, Fort, Mumbai',
      institution_type: 'Central Banking Authority of India',
      accreditation: 'Apex Monetary & Financial Regulatory Institution',
      website: 'https://rbi.org.in',
      data_status: 'DEMO',
      source: 'RBI Grade B Recruitment Gazette',
      programs: [
        {
          id: 'prg-rbi-grade-b',
          exam_code: 'RBI-GRADE-B',
          program_name: 'Officers in Grade ‘B’ (General Cadre - Direct Class A)',
          degree_level: 'Central Bank Executive (Basic ₹55,200, Gross Salary ₹1,16,000/mo)',
          seats: 291,
          duration_years: 0,
          avg_package_lpa: 24.00, // Includes prime RBI housing quarters in Metros, vehicle allowance, children education grants
          median_package_lpa: 24.00,
          exam_cutoff_percentile: 'Phase 2 Cutoff ~168-175 / 300 Marks',
          exam_cutoff_rank: 'Top 300 All India Rank',
          academic_cutoff: 'Graduation with min 60% marks (50% for SC/ST/PwD)',
          selection_process: 'Phase 1 CBT (200M) -> Phase 2 (ESI, FM, English Descriptive 300M) -> Interview (75M)'
        }
      ]
    },
    {
      id: 'col-ibps-banks',
      category_id: 'cat-banking',
      name: '11 Public Sector Nationalized Banks (PNB, BoB, Canara, Union Bank)',
      code: 'IBPS-PSB',
      location: 'Pan-India Zonal & Regional Offices',
      institution_type: 'Nationalized Commercial Banks of India',
      accreditation: 'Public Sector Banking System under Ministry of Finance',
      website: 'https://ibps.in',
      data_status: 'DEMO',
      source: 'IBPS CRP PO/MT Official Allotment Notification',
      programs: [
        {
          id: 'prg-ibps-po',
          exam_code: 'IBPS-PO',
          program_name: 'Probationary Officer / Management Trainee (Scale I)',
          degree_level: 'Scale 1 Officer (Basic ₹36,000, Gross ~₹68,000 - ₹75,000/mo)',
          seats: 4455,
          duration_years: 2,
          avg_package_lpa: 9.80, // Basic + DA + HRA + Bank quarters + Medical
          median_package_lpa: 9.80,
          exam_cutoff_percentile: 'Prelims Cutoff ~52-58 / 100 Marks',
          exam_cutoff_rank: 'Top 4500 in Combined Merit',
          academic_cutoff: 'Graduation in any discipline',
          selection_process: 'Prelims CBT (100M) -> Mains CBT + Descriptive (225M) -> Personal Interview (100M, 80:20 Weightage)'
        }
      ]
    },
    {
      id: 'col-ibps-rrb-banks',
      category_id: 'cat-banking',
      name: 'Regional Rural Banks of India (Gramin Banks - 43 RRBs)',
      code: 'IBPS-RRB',
      location: 'Home-State District Branches (State-Specific Allotment)',
      institution_type: 'Joint Venture Banks (Govt of India, State Govt & Sponsor Banks)',
      accreditation: 'Agricultural & Rural Credit Backbone of India',
      website: 'https://ibps.in',
      data_status: 'DEMO',
      source: 'IBPS CRP RRBs Notification',
      programs: [
        {
          id: 'prg-rrb-po-scale1',
          exam_code: 'IBPS-RRB-PO',
          program_name: 'Officer Scale I (Assistant Manager in Gramin Bank)',
          degree_level: 'Scale 1 Officer (Basic ₹36,000, Gross ~₹62,000/mo)',
          seats: 3800,
          duration_years: 2,
          avg_package_lpa: 8.50,
          median_package_lpa: 8.50,
          exam_cutoff_percentile: 'Prelims Cutoff ~54-60 / 80 Marks (Math + Reasoning Only)',
          exam_cutoff_rank: 'State Rural Bank Merit',
          academic_cutoff: 'Graduation degree + Proficiency in local state language',
          selection_process: 'Prelims (80 Qs, 45 mins) -> Mains (200 Qs, 200M) -> Interview (100M) • Home State Posting!'
        }
      ]
    },

    // UPSC Posts & Premier Cadres
    {
      id: 'col-upsc-cadre',
      category_id: 'cat-upsc',
      name: 'All India & Central Civil Services (IAS / IPS / IFS / IRS)',
      code: 'UPSC-CADRE',
      location: 'Central Secretariat, New Delhi & Pan-India District Cadres',
      institution_type: 'Government (Apex All-India Constitutional Cadre)',
      accreditation: 'DoPT / Union Public Service Commission (LBSNAA / SVPNPA)',
      website: 'https://upsc.gov.in',
      data_status: 'DEMO',
      source: 'UPSC CSE Marks & Service Allocation Gazette (Seed)',
      programs: [
        {
          id: 'prg-upsc-ias',
          exam_code: 'UPSC-CSE',
          program_name: 'Indian Administrative Service (IAS)',
          degree_level: 'All India Service (District Magistrate / Collector / Central Secretary)',
          seats: 180,
          duration_years: 2, // 2-year induction at LBSNAA Mussoorie & District Training
          avg_package_lpa: 16.50, // Pay Level 10 (Basic 56,100) + DA + Bunglow, Car, Security, Travel Perks
          median_package_lpa: 16.50,
          exam_cutoff_percentile: 'AIR 1 - 95 (General) | AIR 1 - 380 (OBC) | AIR 1 - 500 (SC)',
          exam_cutoff_rank: 'Rank 1 - 95',
          academic_cutoff: 'Graduation in ANY discipline (No min marks required!)',
          selection_process: 'Prelims (CSAT 33% + GS Cutoff ~75-88/200) -> Mains (1750M) -> Interview (275M)'
        },
        {
          id: 'prg-upsc-ips',
          exam_code: 'UPSC-CSE',
          program_name: 'Indian Police Service (IPS)',
          degree_level: 'All India Service (SP / SSP / DIG / IG / DGP / IB / CBI)',
          seats: 200,
          duration_years: 2, // SVPNPA Hyderabad Academy Training
          avg_package_lpa: 16.50,
          median_package_lpa: 16.50,
          exam_cutoff_percentile: 'AIR 96 - 240 (General) | AIR 241 - 520 (OBC)',
          exam_cutoff_rank: 'Rank 96 - 240',
          academic_cutoff: 'Graduation + Physical Standard (Height 165cm Men, 150cm Women)',
          selection_process: 'UPSC Merit + Medical/Physical Board clearance'
        },
        {
          id: 'prg-upsc-ifs',
          exam_code: 'UPSC-CSE',
          program_name: 'Indian Foreign Service (IFS)',
          degree_level: 'Central Group A Service (Ambassador / High Commissioner / Diplomat)',
          seats: 40,
          duration_years: 2, // Sushma Swaraj Institute of Foreign Service (SSIFS)
          avg_package_lpa: 24.00, // International Diplomatic Foreign Allowances included
          median_package_lpa: 24.00,
          exam_cutoff_percentile: 'AIR 50 - 150 (General)',
          exam_cutoff_rank: 'Rank 50 - 150',
          academic_cutoff: 'Graduation in any stream',
          selection_process: 'Mains Written (1750M) + Personality Test (275M)'
        },
        {
          id: 'prg-upsc-irs',
          exam_code: 'UPSC-CSE',
          program_name: 'Indian Revenue Service (IRS - Income Tax & Customs/GST)',
          degree_level: 'Central Group A Service (Assistant Commissioner of IT / GST)',
          seats: 320,
          duration_years: 1.5, // NADT Nagpur / NACIN Faridabad
          avg_package_lpa: 15.00,
          median_package_lpa: 15.00,
          exam_cutoff_percentile: 'AIR 220 - 480 (General) | AIR 481 - 780 (OBC/EWS)',
          exam_cutoff_rank: 'Rank 220 - 480',
          academic_cutoff: 'Recognized Bachelor Degree',
          selection_process: 'UPSC Combined Civil Services Merit List'
        }
      ]
    },
    {
      id: 'col-state-pcs-up',
      category_id: 'cat-upsc',
      name: 'Uttar Pradesh Public Service Commission (UPPSC PCS - SDM / DSP)',
      code: 'UPPSC-PCS',
      location: 'Prayagraj & Lucknow, Uttar Pradesh',
      institution_type: 'State Public Service Commission',
      accreditation: 'Premier Provincial Civil Service (Direct 90% Overlap with UPSC)',
      website: 'https://uppsc.up.nic.in',
      data_status: 'DEMO',
      source: 'UPPSC Combined State / Upper Subordinate Gazette',
      programs: [
        {
          id: 'prg-uppsc-sdm',
          exam_code: 'STATE-PCS',
          program_name: 'Sub-Divisional Magistrate (SDM) & Deputy SP (DSP)',
          degree_level: 'Provincial Civil Service (Pay Level 10: Basic 56,100, Gross ~88,000/mo)',
          seats: 450,
          duration_years: 1,
          avg_package_lpa: 12.50,
          median_package_lpa: 12.50,
          exam_cutoff_percentile: 'Prelims ~125-130 / 200 Marks (Net ~92-95 Qs)',
          exam_cutoff_rank: 'Top 100 in State Merit for SDM',
          academic_cutoff: 'Graduation in any discipline; Age 21-40 years',
          selection_process: 'Prelims (GS + CSAT 33%) -> Mains 6 GS Papers (including UP Special) -> Interview (100M)'
        }
      ]
    },
    {
      id: 'col-state-pcs-bihar',
      category_id: 'cat-upsc',
      name: 'Bihar Public Service Commission (BPSC Combined Competitive Exam)',
      code: 'BPSC-CCE',
      location: 'Patna, Bihar',
      institution_type: 'State Public Service Commission',
      accreditation: 'Bihar Administrative & Police Service (Sub-Divisional Officer / DSP)',
      website: 'https://bpsc.bih.nic.in',
      data_status: 'DEMO',
      source: 'BPSC Integrated CCE Notification',
      programs: [
        {
          id: 'prg-bpsc-bas',
          exam_code: 'STATE-PCS',
          program_name: 'Bihar Administrative Service (SDO / BDO / Deputy Collector)',
          degree_level: 'State Class-1 Gazetted (Pay Level 9/10)',
          seats: 1950,
          duration_years: 1,
          avg_package_lpa: 11.50,
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'Prelims Cutoff ~91-96 / 150 Marks (Negative 0.33)',
          exam_cutoff_rank: 'Top 250 for Administrative Service',
          academic_cutoff: 'Graduate in any stream',
          selection_process: 'Prelims (150 Qs) -> Mains (GS 1, GS 2, Essay) -> Interview (120M)'
        }
      ]
    },
    {
      id: 'col-upsc-capf-forces',
      category_id: 'cat-upsc',
      name: 'Central Armed Police Forces (BSF, CRPF, CISF, ITBP, SSB - AC)',
      code: 'UPSC-CAPF',
      location: 'Border Guarding & Internal Security Commands (Pan-India)',
      institution_type: 'Central Armed Police Forces (Ministry of Home Affairs)',
      accreditation: 'Direct Gazetted Class 1 Armed Forces Commission (Pay Level 10)',
      website: 'https://upsc.gov.in',
      data_status: 'DEMO',
      source: 'UPSC CAPF (AC) Official Notification',
      programs: [
        {
          id: 'prg-capf-ac-post',
          exam_code: 'UPSC-CAPF',
          program_name: 'Assistant Commandant (Company Commander - BSF / CRPF / CISF)',
          degree_level: 'Gazetted Class 1 (Basic 56,100, Gross ~95,000/mo + Military Allowances)',
          seats: 506,
          duration_years: 1, // Academy training (BSF Academy Tekanpur / CRPF Gurgaon)
          avg_package_lpa: 14.50,
          median_package_lpa: 14.50,
          exam_cutoff_percentile: 'Paper 1 Cutoff ~125-135 / 250 Marks',
          exam_cutoff_rank: 'Final Merit ~345 / 600 Marks',
          academic_cutoff: 'Bachelor’s degree + Physical Endurance Test (100m, 800m, Long Jump, Shot Put)',
          selection_process: 'Paper 1 (GS 250M) + Paper 2 (Essay/English 200M) -> Physical Test -> Interview (150M)'
        }
      ]
    },
    {
      id: 'col-upsc-epfo-dept',
      category_id: 'cat-upsc',
      name: 'Employees’ Provident Fund Organisation (UPSC EPFO - EO/AO & APFC)',
      code: 'UPSC-EPFO',
      location: 'Ministry of Labour & Employment, New Delhi & Regional Directorates',
      institution_type: 'Statutory Body (Ministry of Labour & Employment, Govt of India)',
      accreditation: 'Premier Enforcement & Quasi-Judicial Cadre (Pay Level 8 & Level 10)',
      website: 'https://epfindia.gov.in',
      data_status: 'DEMO',
      source: 'UPSC EPFO Special Recruitment Notification',
      programs: [
        {
          id: 'prg-epfo-apfc',
          exam_code: 'UPSC-EPFO',
          program_name: 'Assistant Provident Fund Commissioner (APFC) & Enforcement Officer',
          degree_level: 'Central Govt Group A/B Gazetted Officer',
          seats: 577,
          duration_years: 0,
          avg_package_lpa: 13.50,
          median_package_lpa: 13.50,
          exam_cutoff_percentile: 'Recruitment Test Cutoff ~165 / 300 Marks',
          exam_cutoff_rank: 'Top 500 in Combined Merit',
          academic_cutoff: 'Bachelor’s Degree in any discipline',
          selection_process: 'Single Written Objective Test (75% weightage) -> Interview (25% weightage)'
        }
      ]
    },

    // --- UGC-NET Top Universities & Commission Institutions ---
    {
      id: 'col-jnu-ugc',
      category_id: 'cat-ugc-net',
      name: 'Jawaharlal Nehru University (JNU New Delhi)',
      code: 'JNU',
      location: 'New Delhi',
      institution_type: 'Central University (Institute of National Importance)',
      accreditation: 'NIRF University Rank #2 | NAAC A++ (3.91/4.0)',
      website: 'https://jnu.ac.in',
      data_status: 'DEMO',
      source: 'JNU e-Prospectus & Ph.D. Admission Guidelines (Seed)',
      programs: [
        {
          id: 'prg-jnu-phd-jrf',
          exam_code: 'UGC-NET',
          program_name: 'Ph.D. with Junior Research Fellowship (Direct JRF Mode)',
          degree_level: 'Doctoral (Ph.D.) + ₹37,000/mo Fellowship',
          seats: 380,
          duration_years: 5,
          avg_package_lpa: 11.50, // Pay Level 10 Assistant Professor equivalent upon graduation
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'JRF Qualified (AIR Top 100 in Subject)',
          exam_cutoff_rank: 'Category 1 JRF Qualified',
          academic_cutoff: '55% in Master degree (50% for SC/ST/OBC); Exemption from written test',
          selection_process: 'UGC-NET JRF Score (70% weightage) -> Viva Voce & Research Synopsis (30%)'
        }
      ]
    },
    {
      id: 'col-du-ugc',
      category_id: 'cat-ugc-net',
      name: 'University of Delhi (DU Central & 90+ Constituent Colleges)',
      code: 'DU',
      location: 'New Delhi',
      institution_type: 'Central University',
      accreditation: 'NIRF University Rank #6 | 90+ Top Colleges (SRCC, Miranda, Hindu, St. Stephens)',
      website: 'https://du.ac.in',
      data_status: 'DEMO',
      source: 'DU Assistant Professor Recruitment Bulletin & Ph.D. Ordinance',
      programs: [
        {
          id: 'prg-du-asst-prof',
          exam_code: 'UGC-NET',
          program_name: 'Assistant Professor Recruitment (Regular Govt Pay Level 10)',
          degree_level: 'Permanent Faculty (Basic ₹57,700, Gross ₹90k-1.1L/mo)',
          seats: 4500,
          duration_years: 0,
          avg_package_lpa: 12.00, // Gross salary + DA + HRA + Medical ~₹12 LPA
          median_package_lpa: 12.00,
          exam_cutoff_percentile: 'UGC-NET Qualified (Category 1 or Category 2)',
          exam_cutoff_rank: 'NET Qualified + High Academic API Score',
          academic_cutoff: 'Master’s degree with 55% marks (50% for reserved)',
          selection_process: 'Academic API Screening (Grad, PG, NET-JRF, Ph.D.) -> College Interview Selection'
        }
      ]
    },
    {
      id: 'col-bhu-ugc',
      category_id: 'cat-ugc-net',
      name: 'Banaras Hindu University (BHU Varanasi)',
      code: 'BHU',
      location: 'Varanasi, Uttar Pradesh',
      institution_type: 'Central University (Institute of Eminence)',
      accreditation: 'NIRF University Rank #5 | Largest Residential University in Asia',
      website: 'https://bhu.ac.in',
      data_status: 'DEMO',
      source: 'BHU RET & JRF Ph.D. Information Bulletin',
      programs: [
        {
          id: 'prg-bhu-phd-jrf',
          exam_code: 'UGC-NET',
          program_name: 'Ph.D. Research Scholar (Direct JRF Admissions)',
          degree_level: 'Ph.D. + Monthly Fellowship of ₹37,000 + HRA',
          seats: 520,
          duration_years: 5,
          avg_package_lpa: 10.80,
          median_package_lpa: 10.80,
          exam_cutoff_percentile: 'UGC-NET JRF Award Letter',
          exam_cutoff_rank: 'Top 1% in UGC-NET',
          academic_cutoff: '55% aggregate marks in PG or equivalent grade',
          selection_process: 'Direct JRF Admission -> Personal Research Interview'
        }
      ]
    },
    {
      id: 'col-jmi-ugc',
      category_id: 'cat-ugc-net',
      name: 'Jamia Millia Islamia (JMI New Delhi)',
      code: 'JMI',
      location: 'Jamia Nagar, New Delhi',
      institution_type: 'Central University',
      accreditation: 'NIRF University Rank #3 | NAAC A++ Accredited',
      website: 'https://jmi.ac.in',
      data_status: 'DEMO',
      source: 'JMI Ph.D. & Faculty Notification',
      programs: [
        {
          id: 'prg-jmi-phd-asst',
          exam_code: 'UGC-NET',
          program_name: 'Doctoral Studies & Assistant Professor Tenure',
          degree_level: 'Ph.D. / Academic Faculty',
          seats: 320,
          duration_years: 5,
          avg_package_lpa: 11.20,
          median_package_lpa: 11.20,
          exam_cutoff_percentile: 'UGC-NET JRF / Assistant Professor',
          exam_cutoff_rank: 'Category 1 / 2 Qualified',
          academic_cutoff: 'Post-Graduation with 55% minimum',
          selection_process: 'UGC-NET Merit Exemption -> Research Proposal Defense'
        }
      ]
    },
    {
      id: 'col-uoh-ugc',
      category_id: 'cat-ugc-net',
      name: 'University of Hyderabad (UoH)',
      code: 'UOH',
      location: 'Gachibowli, Hyderabad, Telangana',
      institution_type: 'Central University (Institute of Eminence)',
      accreditation: 'NIRF University Rank #10 | Premier Research Hub in Southern India',
      website: 'https://uohyd.ac.in',
      data_status: 'DEMO',
      source: 'UoH Research Scholar Report',
      programs: [
        {
          id: 'prg-uoh-jrf',
          exam_code: 'UGC-NET',
          program_name: 'Ph.D. Humanities, Social Sciences, Economics & Management',
          degree_level: 'Ph.D. Fellowship Program',
          seats: 260,
          duration_years: 5,
          avg_package_lpa: 10.50,
          median_package_lpa: 10.50,
          exam_cutoff_percentile: 'UGC-NET JRF Qualified',
          exam_cutoff_rank: 'Top National Percentile',
          academic_cutoff: 'Master’s degree with 55% marks',
          selection_process: 'Direct Viva-Voce for JRF Holders'
        }
      ]
    },
    {
      id: 'col-tiss-ugc',
      category_id: 'cat-ugc-net',
      name: 'Tata Institute of Social Sciences (TISS Mumbai)',
      code: 'TISS',
      location: 'Deonar, Mumbai, Maharashtra',
      institution_type: 'Deemed Central University (Centrally Funded)',
      accreditation: '#1 Social Sciences & HR Research Institute in Asia',
      website: 'https://tiss.edu',
      data_status: 'DEMO',
      source: 'TISS Doctoral Bulletin',
      programs: [
        {
          id: 'prg-tiss-phd',
          exam_code: 'UGC-NET',
          program_name: 'Ph.D. in Social Work, Management & Labour Studies, Education',
          degree_level: 'Ph.D. Program',
          seats: 120,
          duration_years: 5,
          avg_package_lpa: 14.50, // Highly demanded in UN, World Bank, Corporate CSR & Faculty
          median_package_lpa: 13.50,
          exam_cutoff_percentile: 'UGC-NET JRF in Subject',
          exam_cutoff_rank: 'Top 500 in Subject',
          academic_cutoff: '55% in relevant master’s degree',
          selection_process: 'Research Proposal Assessment -> Personal Interview'
        }
      ]
    },
    {
      id: 'col-uppsc-ap',
      category_id: 'cat-ugc-net',
      name: 'Uttar Pradesh Higher Education Services Commission (UPHESC / UPPSC)',
      code: 'UPPSC-AP',
      location: 'Prayagraj & Lucknow, Uttar Pradesh',
      institution_type: 'State Public Service Commission',
      accreditation: 'Direct Permanent Assistant Professor Recruitment in 400+ Govt Degree Colleges',
      website: 'https://uppsc.up.nic.in',
      data_status: 'DEMO',
      source: 'UPPSC Assistant Professor Official Gazette Advertisement',
      programs: [
        {
          id: 'prg-uppsc-ap-post',
          exam_code: 'UGC-NET',
          program_name: 'Permanent Assistant Professor (Govt Degree & Aided Colleges)',
          degree_level: 'Gazetted Class-1 Officer (Pay Level 10: Basic ₹57,700, Gross ₹92,000/mo)',
          seats: 2200,
          duration_years: 0,
          avg_package_lpa: 11.80, // Basic + DA + HRA + Pension benefits
          median_package_lpa: 11.80,
          exam_cutoff_percentile: 'UGC-NET Qualified (Mandatory Eligibility)',
          exam_cutoff_rank: 'Written Exam Score + Interview Merit',
          academic_cutoff: 'Master’s degree with 55% + UGC NET / UP-SLET qualified',
          selection_process: 'Written Objective Exam (GS 30 Qs + Subject 70 Qs = 200 Marks) -> Interview (30 Marks)'
        }
      ]
    },
    {
      id: 'col-rpsc-ap',
      category_id: 'cat-ugc-net',
      name: 'Rajasthan Public Service Commission (RPSC College Lecturer)',
      code: 'RPSC-AP',
      location: 'Ajmer & Jaipur, Rajasthan',
      institution_type: 'State Public Service Commission',
      accreditation: 'Direct Permanent Assistant Professor Recruitment in Rajasthan Govt Colleges',
      website: 'https://rpsc.rajasthan.gov.in',
      data_status: 'DEMO',
      source: 'RPSC College Education Department Notification',
      programs: [
        {
          id: 'prg-rpsc-ap-post',
          exam_code: 'UGC-NET',
          program_name: 'Assistant Professor (College Education Department)',
          degree_level: 'Gazetted Class-1 (UGC 7th Pay Level 10)',
          seats: 1914,
          duration_years: 0,
          avg_package_lpa: 11.50,
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'UGC-NET / Rajasthan SET Qualified',
          exam_cutoff_rank: 'Written Merit List',
          academic_cutoff: 'Master’s degree with 55% marks (50% for SC/ST/OBC/MBC)',
          selection_process: 'Paper 1 (Subject 75M) + Paper 2 (Subject 75M) + Paper 3 (Rajasthan GK 50M) -> Interview (24M)'
        }
      ]
    },
    {
      id: 'col-mppsc-ap',
      category_id: 'cat-ugc-net',
      name: 'Madhya Pradesh Public Service Commission (MPPSC Assistant Professor)',
      code: 'MPPSC-AP',
      location: 'Indore & Bhopal, Madhya Pradesh',
      institution_type: 'State Public Service Commission',
      accreditation: 'Higher Education Department Govt of MP (Pay Level 10)',
      website: 'https://mppsc.mp.gov.in',
      data_status: 'DEMO',
      source: 'MPPSC Assistant Professor Notification',
      programs: [
        {
          id: 'prg-mppsc-ap-post',
          exam_code: 'UGC-NET',
          program_name: 'Assistant Professor in Govt Universities & Colleges',
          degree_level: 'Permanent Govt Lecturer (Pay Level 10: ₹57,700)',
          seats: 1669,
          duration_years: 0,
          avg_package_lpa: 11.50,
          median_package_lpa: 11.50,
          exam_cutoff_percentile: 'UGC-NET or MP-SET Qualified',
          exam_cutoff_rank: 'State Merit List',
          academic_cutoff: 'Master’s degree with 55% marks in subject',
          selection_process: 'OMR Written Exam (MP GK 200M + Subject 600M = 800M) -> Direct Merit Selection'
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
