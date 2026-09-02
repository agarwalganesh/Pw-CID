import React, { useState, useMemo } from 'react';
import {
  Category,
  Exam,
  Course,
  College,
  EligibilityRule,
  PreparationStrategy
} from '../../types';
import {
  Pill,
  Building2,
  CheckCircle2,
  PhoneCall,
  Search,
  TrendingUp,
  BookOpen,
  Sparkles,
  Target,
  Shield,
  Briefcase,
  Award,
  DollarSign
} from 'lucide-react';

interface PharmaCounsellorCockpitProps {
  category: Category;
  exams: Exam[];
  colleges: College[];
  eligibilityRules: EligibilityRule[];
  preparation: PreparationStrategy | null;
  courses: Course[];
  onBack: () => void;
  onPitchCourse: (course: Course) => void;
  onOpenFitmentModal: () => void;
}

type PharmaTab = 'exams' | 'institutes' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type PharmaExamCode = 'GPAT' | 'NIPER-JEE' | 'DRUG-INSPECTOR' | 'GOVT-PHARMACIST' | 'BITS-HD-PHARMA';

export const PharmaCounsellorCockpit: React.FC<PharmaCounsellorCockpitProps> = ({
  category,
  exams,
  colleges,
  eligibilityRules,
  preparation,
  courses,
  onBack,
  onPitchCourse,
  onOpenFitmentModal
}) => {
  const [activeTab, setActiveTab] = useState<PharmaTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<PharmaExamCode>('GPAT');
  const [instSearch, setInstSearch] = useState('');
  const [instFilter, setInstFilter] = useState<'ALL' | 'NIPER' | 'UNIVERSITIES' | 'DRUG_INSPECTOR' | 'PHARMACIST'>('ALL');

  // Exam tracks metadata
  const EXAM_DATA: Record<PharmaExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    duration: string;
    totalMarks: string;
    keySellingPoint: string;
    counsellorTip: string;
    sectionsBreakdown: Array<{
      subject: string;
      title: string;
      questions: string;
      marks: string;
      weightage: string;
      details: string;
    }>;
  }> = {
    'GPAT': {
      fullName: 'Graduate Pharmacy Aptitude Test (Apex National M.Pharm Entrance)',
      conductingBody: 'National Board of Examinations in Medical Sciences (NBEMS)',
      frequency: 'Once a Year (May-June)',
      mode: 'Computer Based Test (CBT) • 125 MCQs',
      duration: '180 Minutes (3 Hours)',
      totalMarks: '500 Marks (+4 for Correct, -1 for Incorrect MCQ)',
      keySellingPoint: 'Direct ₹12,400/month AICTE PG Scholarship! Every qualified student receives approx ₹3.00 Lakhs in their bank account during 2 years of M.Pharm, making higher education 100% free with savings!',
      counsellorTip: 'Tell B.Pharm 3rd & 4th year students: You don’t need 400 marks to qualify! Clearing cutoff is only around 145–165/500 (~30-33%). That means getting just 38-42 net correct questions out of 125 guarantees ₹12,400/mo stipend!',
      sectionsBreakdown: [
        {
          subject: 'Pharmaceutics & NDDS',
          title: 'Dosage Forms, Biopharmaceutics & Physical Pharmacy',
          questions: '38 Questions',
          marks: '152 Marks (+4 / -1)',
          weightage: '30.4% Weightage',
          details: 'Tablets, capsules, parenterals, ophthalmic formulations, bio-availability, compartment models, novel drug delivery systems (liposomes, nanoparticles).'
        },
        {
          subject: 'Pharmaceutical Chemistry & Medicinal Chem',
          title: 'SAR, Organic Reactions & Spectroscopy Analysis',
          questions: '38 Questions',
          marks: '152 Marks (+4 / -1)',
          weightage: '30.4% Weightage',
          details: 'Structure Activity Relationships (SAR) of CNS/CVS drugs, heterocycles, stereochemistry, UV-Visible, FTIR, 1H-NMR, Mass spectrometry, and HPLC.'
        },
        {
          subject: 'Pharmacology & Toxicology',
          title: 'Mechanism of Action, ANS/CNS Drugs & Clinical Trials',
          questions: '28 Questions',
          marks: '112 Marks (+4 / -1)',
          weightage: '22.4% Weightage',
          details: 'Receptors, second messengers, autonomic nervous system, cardiovascular drugs, chemotherapy of cancer/infections, adverse drug reactions, drug interactions.'
        },
        {
          subject: 'Pharmacognosy & Phytochemistry',
          title: 'Plant Drugs, Alkaloids, Glycosides & Isolation',
          questions: '10 Questions',
          marks: '40 Marks (+4 / -1)',
          weightage: '8.0% Weightage',
          details: 'Biosynthetic pathways (Shikimic, Mevalonic acid), extraction techniques, Soxhlet, chromatographic isolation of active botanical principles.'
        },
        {
          subject: 'Jurisprudence & Allied Pharmacy',
          title: 'Drug Laws (D&C Act 1940) + Biochemistry & Microbiology',
          questions: '11 Questions',
          marks: '44 Marks (+4 / -1)',
          weightage: '8.8% Weightage',
          details: 'Drugs & Cosmetics Act 1940 & Rules 1945, Schedules M, Y, H, Pharmacy Act 1948, sterilisation techniques, microbial assays.'
        }
      ]
    },
    'NIPER-JEE': {
      fullName: 'NIPER Joint Entrance Examination (7 Apex Institutes of National Importance)',
      conductingBody: 'NIPER Council (NIPER Mohali / Hyderabad / Ahmedabad)',
      frequency: 'Once a Year (June-July)',
      mode: 'CBT (200 Objective MCQs)',
      duration: '120 Minutes (Speed Driven)',
      totalMarks: '200 Marks (+1 for Correct, -0.25 for Incorrect)',
      keySellingPoint: 'The IIT of Pharmacy! NIPER Mohali is NIRF #1. Top international and domestic pharma MNCs (Novartis, Dr. Reddy’s, Sun Pharma, Pfizer) recruit directly with starting packages of ₹9.5 to ₹18 LPA!',
      counsellorTip: 'Mandatory Condition: Candidate MUST have a valid GPAT scorecard to register for NIPER JEE. Preparing for GPAT automatically builds 85% of NIPER syllabus!',
      sectionsBreakdown: [
        {
          subject: 'Organic & Medicinal Chemistry',
          title: 'Advanced Synthesis, Reaction Mechanisms & Targets',
          questions: '50 Questions',
          marks: '50 Marks',
          weightage: '25% Weightage',
          details: 'Name reactions, reagents, retrosynthesis, bioisosterism, receptor docking concepts.'
        },
        {
          subject: 'Pharmacology, Toxicology & Bioassays',
          title: 'Preclinical R&D, Screening Methods & Molecular Targets',
          questions: '50 Questions',
          marks: '50 Marks',
          weightage: '25% Weightage',
          details: 'In-vivo animal models, cell-based assays, enzyme kinetics, toxicological screening.'
        },
        {
          subject: 'Natural Products & Biotechnology',
          title: 'Phytopharmaceuticals, Recombinant Proteins & Vaccines',
          questions: '40 Questions',
          marks: '40 Marks',
          weightage: '20% Weightage',
          details: 'Secondary metabolites, plant tissue culture, fermentation, monoclonal antibodies.'
        },
        {
          subject: 'Pharmaceutics, Polymers & Devices',
          title: 'Preformulation, Targeted Drug Delivery & Medical Devices',
          questions: '40 Questions',
          marks: '40 Marks',
          weightage: '20% Weightage',
          details: 'Biodegradable polymers, nano-formulations, intellectual property rights (IPR/Patents).'
        },
        {
          subject: 'Aptitude & Industry GK',
          title: 'Pharma Current Affairs, Nobel Prizes & Basic Reasoning',
          questions: '20 Questions',
          marks: '20 Marks',
          weightage: '10% Weightage',
          details: 'FDA approvals, blockbuster drugs, Nobel Prize in Physiology/Chemistry, basic logic.'
        }
      ]
    },
    'DRUG-INSPECTOR': {
      fullName: 'Government Drug Inspector (DI - Central CDSCO & State PSCs)',
      conductingBody: 'UPSC (Central CDSCO) & State Public Service Commissions',
      frequency: 'Periodic State & Central Notifications',
      mode: 'Written Objective CBT/OMR + Personal Interview',
      duration: '120 - 180 Minutes',
      totalMarks: '400 Marks (Written 85% + Interview 15%)',
      keySellingPoint: 'The most authoritative Gazetted Officer post in the pharmacy field! Inspect manufacturing plants, seize adulterated drugs, suspend pharmaceutical licenses. Pay Level 8/10: Gross ₹75,000–₹1,00,000/month!',
      counsellorTip: 'Eligibility nuance: Many states allow fresh B.Pharm graduates, while Central CDSCO asks for 18 months manufacturing experience in Schedule C/C1 drugs. Prepare early because notifications fill instantly!',
      sectionsBreakdown: [
        {
          subject: 'Forensic Pharmacy & Drug Acts',
          title: 'D&C Act 1940, Schedule M (GMP) & DPCO',
          questions: '50 Questions',
          marks: '100 Marks',
          weightage: '25% Weightage',
          details: 'In-depth legal clauses of licensing, manufacturing, sale, import, Schedule M GMP, Schedule Y clinical trials.'
        },
        {
          subject: 'Manufacturing & Industrial QA',
          title: 'Sterility Testing, QC Assays & Validation',
          questions: '50 Questions',
          marks: '100 Marks',
          weightage: '25% Weightage',
          details: 'Aseptic processing, clean room standards, tablet defects, dissolution testing, packaging materials.'
        },
        {
          subject: 'Pharmacology & Toxicology',
          title: 'Mechanism of Drugs, Adverse Reactions & Interactions',
          questions: '50 Questions',
          marks: '100 Marks',
          weightage: '25% Weightage',
          details: 'Therapeutic window, toxicity assays, bioequivalence studies, post-marketing surveillance.'
        },
        {
          subject: 'General Studies & State Laws',
          title: 'Indian Constitution, Current Affairs & Aptitude',
          questions: '50 Questions',
          marks: '100 Marks',
          weightage: '25% Weightage',
          details: 'State administrative structure, general science, logical reasoning, current national affairs.'
        }
      ]
    },
    'GOVT-PHARMACIST': {
      fullName: 'Government Hospital Pharmacist (ESIC / RRB Railway / AIIMS / Health Dept)',
      conductingBody: 'ESIC, Railway Recruitment Boards, AIIMS & State Health Boards',
      frequency: 'Regular Recruitment Drives',
      mode: 'Single Tier CBT (100 - 125 MCQs) • NO INTERVIEW!',
      duration: '120 Minutes',
      totalMarks: '125 Marks (+1 for Correct, -0.25 for Incorrect)',
      keySellingPoint: 'Permanent central/state government hospital job! Gross starting salary ₹45,000 to ₹55,000/month + central medical benefits (CGHS) + government quarters. NO INTERVIEW AT ALL!',
      counsellorTip: 'Open for both D.Pharm (Diploma) and B.Pharm (Degree) holders! The only mandatory requirement is a valid Registered Pharmacist registration certificate from any State Pharmacy Council.',
      sectionsBreakdown: [
        {
          subject: 'Technical Pharmacy Core',
          title: 'Hospital & Clinical Pharmacy, Dispensing & Pharmacology',
          questions: '80 Questions',
          marks: '80 Marks',
          weightage: '64% Weightage',
          details: 'Prescription reading, drug incompatibilities, posology, hospital drug distribution, cold chain maintenance.'
        },
        {
          subject: 'General Aptitude & Reasoning',
          title: 'Arithmetic, Logical Reasoning & Basic English',
          questions: '25 Questions',
          marks: '25 Marks',
          weightage: '20% Weightage',
          details: 'Basic percentage, ratio, number series, coding-decoding, functional grammar.'
        },
        {
          subject: 'General Awareness',
          title: 'Current Events, Health Schemes & Basic Science',
          questions: '20 Questions',
          marks: '20 Marks',
          weightage: '16% Weightage',
          details: 'Ayushman Bharat, immunization schedules, vitamins, communicable diseases, Indian geography.'
        }
      ]
    },
    'BITS-HD-PHARMA': {
      fullName: 'BITS Pilani Higher Degree Pharmacy Entrance (Pilani & Hyderabad Campus)',
      conductingBody: 'BITS Pilani Admission Council',
      frequency: 'Once a Year (May)',
      mode: 'Online Computer Based Test',
      duration: '180 Minutes',
      totalMarks: 'Specialized Discipline Test (Core Pharmacy)',
      keySellingPoint: 'Premier research infrastructure with state-of-the-art formulation & drug discovery labs. Direct placement in pharmaceutical analytics, formulations, and patent consulting.',
      counsellorTip: 'Candidates with high GPAT scores can also apply directly for admission without giving the BITS HD entrance test!',
      sectionsBreakdown: [
        {
          subject: 'Core Pharmacy Discipline',
          title: 'Pharmaceutics, Medicinal Chemistry & Pharmacology',
          questions: '100 Questions',
          marks: '300 Marks',
          weightage: '100% Weightage',
          details: 'Advanced concepts in pharmaceutical formulation, biopharmaceutics, organic reaction mechanisms, receptor pharmacology.'
        }
      ]
    }
  };

  // Cutoffs
  const PHARMA_BENCHMARKS = [
    { exam: 'GPAT Qualifying Cutoff (Out of 500)', gen: '148 - 163 Marks (~30-33%)', obc: '120 - 135 Marks', sc: '90 - 105 Marks', st: '75 - 85 Marks', remarks: 'Qualifying entitles candidate to ₹12,400/month AICTE scholarship for 24 months.' },
    { exam: 'GPAT Score for NIPER & Top Colleges', gen: '210+ Marks (AIR < 500)', obc: '180+ Marks', sc: '140+ Marks', st: '120+ Marks', remarks: 'Guarantees admission in ICT Mumbai, Jamia Hamdard, Panjab University PUCHD.' },
    { exam: 'NIPER JEE Rank for Top Branches', gen: 'AIR 1 - 150 (Mohali)', obc: 'AIR 1 - 300', sc: 'AIR 1 - 800', st: 'AIR 1 - 1200', remarks: 'Pharmaceutics & Pharmacology in NIPER Mohali close within top 120 ranks.' },
    { exam: 'Government Drug Inspector Written Cutoff', gen: '72% - 76% in CBT', obc: '68% - 72%', sc: '60% - 64%', st: '55% - 60%', remarks: 'Gazetted Class 1/2 Post; selection based on written merit + interview.' },
    { exam: 'ESIC / RRB Government Pharmacist Cutoff', gen: '74 - 78 / 125 Marks', obc: '70 - 74 Marks', sc: '62 - 66 Marks', st: '56 - 60 Marks', remarks: 'Direct appointment without interview; state/region-wise merit lists.' }
  ];

  // Filtered institutes
  const filteredInstitutes = useMemo(() => {
    let list = colleges.filter((c) => c.category_id === 'cat-pharma');

    if (instFilter === 'NIPER') {
      list = list.filter((c) => c.code.includes('NIPER'));
    } else if (instFilter === 'UNIVERSITIES') {
      list = list.filter((c) => c.code.includes('ICT') || c.code.includes('JAMIA') || c.code.includes('BITS'));
    } else if (instFilter === 'DRUG_INSPECTOR') {
      list = list.filter((c) => c.code.includes('CDSCO') || c.code.includes('STATE-DI'));
    } else if (instFilter === 'PHARMACIST') {
      list = list.filter((c) => c.code.includes('HOSPITAL'));
    }

    if (instSearch.trim()) {
      const q = instSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.programs.some((p) => p.program_name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [colleges, instFilter, instSearch]);

  const currentExam = EXAM_DATA[selectedExamCode];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '16px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        <div>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#94A3B8',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Back to All Categories
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              💊
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                Pharma Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: GPAT (₹12,400/mo AICTE Stipend) • NIPER JEE • Drug Inspector (Gazetted DI) • Govt Pharmacist • Scripts
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('pitch')}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              border: 'none',
              color: '#FFFFFF',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}
          >
            <PhoneCall size={16} />
            Student Call Script
          </button>
          <button
            onClick={onOpenFitmentModal}
            style={{
              background: '#3B82F6',
              border: 'none',
              color: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Target size={16} />
            Check Student Profile
          </button>
        </div>
      </div>

      {/* AICTE Stipend Highlight Ribbon */}
      <div style={{
        background: 'linear-gradient(90deg, #3B0764 0%, #581C87 100%)',
        border: '1px solid #7E22CE',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '20px',
        color: '#F3E8FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>💰</span>
          <div style={{ fontSize: '13px' }}>
            <strong style={{ color: '#FCD34D' }}>The ₹12,400/Month AICTE Fellowship Hook:</strong> Every GPAT qualified student receives ₹2,97,600 in their bank account over 2 years of M.Pharm! Clearing GPAT cutoff requires only ~30-33% marks (approx 38-42 net correct questions out of 125).
          </div>
        </div>
        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            background: '#8B5CF6',
            color: '#FFFFFF',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View Pitch →
        </button>
      </div>

      {/* Main Cockpit Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        background: '#1E293B',
        padding: '6px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #334155',
        overflowX: 'auto'
      }}>
        {[
          { id: 'exams', label: '1. Exam Patterns & Subjects', icon: BookOpen, badge: '5 Tracks' },
          { id: 'institutes', label: '2. Top Institutes & Posts', icon: Building2, badge: 'NIPER / DI / ESIC' },
          { id: 'cutoffs', label: '3. Cutoffs & Benchmarks', icon: TrendingUp, badge: 'GPAT & DI' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: '₹12.4k/mo Hook' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: 'B.Pharm Pass' },
          { id: 'courses', label: '6. PW Pharma Batches', icon: Sparkles, badge: 'Pratham / Sankalp' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PharmaTab)}
              style={{
                background: isActive ? '#8B5CF6' : 'transparent',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <IconComponent size={16} />
              {tab.label}
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.25)' : '#334155',
                color: isActive ? '#FFFFFF' : '#CBD5E1',
                padding: '2px 6px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 700
              }}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXAM PATTERNS & SUBJECTS */}
      {activeTab === 'exams' && (
        <div>
          {/* Exam Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            background: '#F8FAFC',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginRight: '6px' }}>
              Select Pharma Track:
            </span>
            {[
              { code: 'GPAT', label: 'GPAT (M.Pharm + ₹12,400/mo)', icon: '🎓' },
              { code: 'NIPER-JEE', label: 'NIPER JEE (Apex NIRF #1)', icon: '🏆' },
              { code: 'DRUG-INSPECTOR', label: 'Drug Inspector (Gazetted Class 1/2)', icon: '⭐' },
              { code: 'GOVT-PHARMACIST', label: 'Govt Pharmacist (ESIC/RRB)', icon: '🏥' },
              { code: 'BITS-HD-PHARMA', label: 'BITS HD Pharmacy', icon: '🏛️' }
            ].map((item) => {
              const isSelected = selectedExamCode === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedExamCode(item.code as PharmaExamCode)}
                  style={{
                    background: isSelected ? '#4C1D95' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#4C1D95',
                    border: isSelected ? '2px solid #4C1D95' : '1px solid #CBD5E1',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Exam Specification Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}>
                  {selectedExamCode} SPECIFICATION
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                  {currentExam.fullName}
                </h2>
                <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>
                  Conducting Body: <strong>{currentExam.conductingBody}</strong> • Frequency: <strong>{currentExam.frequency}</strong>
                </p>
              </div>

              <div style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#92400E',
                maxWidth: '460px',
                lineHeight: 1.45
              }}>
                <strong>💡 Counsellor Call Tip:</strong> {currentExam.counsellorTip}
              </div>
            </div>

            {/* Metric Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              marginTop: '16px'
            }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⏱️ Exam Mode</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.mode}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⏳ Total Duration</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.duration}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🎯 Total Marks</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>{currentExam.totalMarks}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Core Appeal</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#7C3AED', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
              📋 Subject Weightage & Question Distribution
            </h3>
            {currentExam.sectionsBreakdown.map((sec, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#F3E8FF',
                      color: '#6B21A8',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      {sec.subject}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {sec.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: '#2563EB' }}>{sec.questions}</span>
                    <span style={{ color: '#16A34A' }}>{sec.marks}</span>
                    <span style={{ color: '#7C3AED' }}>{sec.weightage}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                  {sec.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TOP INSTITUTES & RECRUITMENT POSTS */}
      {activeTab === 'institutes' && (
        <div>
          {/* Filter Bar */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="#64748B" />
              <input
                type="text"
                placeholder="Search institute or post (e.g. NIPER, ICT Mumbai, Drug Inspector, ESIC)..."
                value={instSearch}
                onChange={(e) => setInstSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Filter:</span>
              {[
                { id: 'ALL', label: 'All Organizations' },
                { id: 'NIPER', label: 'NIPERs (NIRF #1)' },
                { id: 'UNIVERSITIES', label: 'ICT & Central Univs' },
                { id: 'DRUG_INSPECTOR', label: 'Drug Inspector (DI)' },
                { id: 'PHARMACIST', label: 'Govt Pharmacists' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setInstFilter(f.id as any)}
                  style={{
                    background: instFilter === f.id ? '#4C1D95' : '#F1F5F9',
                    color: instFilter === f.id ? '#FFFFFF' : '#475569',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
            Showing {filteredInstitutes.length} Premier Pharmacy Institutes & Recruitment Authorities
          </div>

          {/* Institutes Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredInstitutes.map((inst) => (
              <div
                key={inst.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      background: '#F3E8FF',
                      color: '#6B21A8',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {inst.code}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {inst.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{inst.location}</span>
                </div>

                <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: '#64748B' }}>
                  {inst.accreditation}
                </p>

                {/* Sub-Programs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                  {inst.programs.map((prg) => (
                    <div
                      key={prg.id}
                      style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>
                            {prg.program_name}
                          </h4>
                          <span style={{
                            background: '#DCFCE7',
                            color: '#166534',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 800
                          }}>
                            {prg.exam_cutoff_rank}
                          </span>
                        </div>

                        <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                          {prg.degree_level}
                        </div>

                        <div style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '10px'
                        }}>
                          <div>
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>PACKAGE / VALUE</span>
                            <strong style={{ color: '#16A34A', fontSize: '13px' }}>₹{prg.avg_package_lpa} LPA</strong>
                          </div>
                          <div>
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>ANNUAL SEATS</span>
                            <strong style={{ color: '#2563EB', fontSize: '13px' }}>{prg.seats.toLocaleString('en-IN')} Intake</strong>
                          </div>
                        </div>

                        <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                          <strong>Route:</strong> {prg.selection_process}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CUTOFFS & BENCHMARKS */}
      {activeTab === 'cutoffs' && (
        <div>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              🎯 Pharma Cutoff Benchmarks & Target Scores
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              Category-wise cutoffs for GPAT AICTE Fellowship qualification, NIPER AIR rankings, and Drug Inspector tests.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Exam & Track</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#6B21A8' }}>General (UR)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>OBC (NCL)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>SC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>ST</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#166534' }}>Counsellor Strategy Note</th>
                  </tr>
                </thead>
                <tbody>
                  {PHARMA_BENCHMARKS.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>{row.exam}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#6B21A8', background: '#F3E8FF' }}>{row.gen}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.obc}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.sc}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.st}</td>
                      <td style={{ padding: '12px 14px', color: '#166534', fontSize: '12px', fontWeight: 600 }}>{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
          {/* Phone Script */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '22px 24px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>
              📞 60-SECOND PHONE CALL SCRIPT
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '10px 0 14px' }}>
              Pitching GPAT, NIPER & DI to a Pharmacy Aspirant
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The ₹12,400/Month AICTE Fellowship Hook:</strong>
                "Hello [Student Name]! Many B.Pharm students don't realize that qualifying GPAT gives you ₹12,400 per month directly from AICTE for 2 whole years—that is nearly ₹3.00 Lakhs cash! Your entire M.Pharm fees are covered, and you finish your post-graduation completely debt-free."
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The NIPER Mohali & MNC Placement Multiplier:</strong>
                "With a valid GPAT score, you become eligible for NIPER JEE. NIPER Mohali is the NIRF #1 institute in India, where global pharmaceutical giants like Novartis, Dr. Reddy’s, Sun Pharma, and Pfizer recruit fresh postgraduates at starting packages of ₹9.5 to ₹18 LPA!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The Gazetted Drug Inspector Career Option:</strong>
                "Even for government jobs, preparing for GPAT covers 80% of the syllabus for Central and State Drug Inspector exams (Pay Level 8/10, starting salary ₹75,000–₹90,000/month as a Class-1/2 Gazetted Officer) and permanent hospital Pharmacist posts in ESIC & Railways."
              </div>
            </div>
          </div>

          {/* Objection Handlers */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '22px 24px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>
              🛡️ OBJECTION HANDLING CHEAT SHEET
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '10px 0 14px' }}>
              Instant Answers to Pharmacy Student Doubts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.55 }}>
              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Sir, Medicinal Chemistry structures and SAR are too tough to memorize."
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "In GPAT, you don't need to memorize every complex synthesis. The exam focuses on core basic heterocycles and key SAR modifications (e.g. adding a fluorine atom or alkyl chain). In PW classes, faculties teach through structural mnemonics and high-yield summary sheets so you master 80% of MedChem in just 30 days."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Is GPAT score required to become a Drug Inspector?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "GPAT score is not formally required for DI, but the DI syllabus is 85% identical to GPAT! Preparing for GPAT makes you master Forensic Pharmacy, GMP Schedule M, Pharmacology, and QC, making the DI written test effortless."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Can 3rd year B.Pharm students appear for GPAT?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "GPAT is officially open for 4th year (final year) enrolled students and graduates. However, 3rd year students who start preparing now can complete their entire syllabus 6 months in advance and crack AIR Top 100 on their first attempt!"
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10-SEC ELIGIBILITY CHECK */}
      {activeTab === 'eligibility' && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '24px',
          maxWidth: '780px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            ⏱️ 10-Second Candidate Qualification Check
          </h3>
          <p style={{ margin: '0 0 20px', color: '#64748B', fontSize: '13px' }}>
            Verify candidate eligibility across GPAT, NIPER, DI, and Pharmacist exams.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>GPAT Qualification</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>4-Year B.Pharm Enrolled / Pass</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Final year enrolled candidates are 100% eligible. (B.Tech Pharma / D.Pharm not eligible).</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Age Limit</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>NO AGE LIMIT for GPAT!</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Drug Inspector age limit is usually 21 to 30/35 years depending on the state.</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Govt Pharmacist (ESIC/RRB)</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#7C3AED' }}>D.Pharm or B.Pharm Pass</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Must have State Pharmacy Council Registration Certificate (Registered Pharmacist).</div>
            </div>
          </div>

          <div style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#581C87', lineHeight: 1.5 }}>
            <strong>✅ Key Rules for Pharma Counselling:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>GPAT Scorecard Validity:</strong> A valid GPAT score is valid for <strong>3 YEARS</strong> for taking admission in Master’s programs (M.Pharm / MS Pharm).</li>
              <li><strong>NIPER Dual Eligibility:</strong> NIPER requires both a Bachelor’s degree in Pharmacy with min 60% AND a qualifying GPAT score.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW PHARMA BATCHES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW Pharma Batch Offerings
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              Comprehensive GPAT, NIPER & DI Preparation with Mock Test Series and DPPs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {courses.map((crs) => (
              <div
                key={crs.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      background: '#F3E8FF',
                      color: '#6B21A8',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {crs.level}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{crs.mode}</span>
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                    {crs.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px' }}>
                    Target: <strong>{crs.target_exam_code}</strong> • Language: {crs.language}
                  </p>

                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Features:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                      {crs.features.slice(0, 4).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>TOTAL COURSE FEE</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#16A34A' }}>
                      ₹{crs.fees_inr.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => onPitchCourse(crs)}
                    style={{
                      background: '#7C3AED',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Pitch Course →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
