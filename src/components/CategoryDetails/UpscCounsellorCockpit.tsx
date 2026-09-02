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
  Shield,
  Award,
  CheckCircle2,
  PhoneCall,
  Search,
  TrendingUp,
  BookOpen,
  Sparkles,
  Target,
  Building2,
  Compass,
  Star
} from 'lucide-react';

interface UpscCounsellorCockpitProps {
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

type UpscTab = 'exams' | 'cadres' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type UpscExamCode = 'UPSC-CSE' | 'STATE-PCS' | 'UPSC-CAPF' | 'UPSC-EPFO' | 'UPSC-CDS';

export const UpscCounsellorCockpit: React.FC<UpscCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<UpscTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<UpscExamCode>('UPSC-CSE');
  const [cadreSearch, setCadreSearch] = useState('');
  const [cadreFilter, setCadreFilter] = useState<'ALL' | 'ALL_INDIA' | 'STATE_PCS' | 'UNIFORMED' | 'MINISTRIES'>('ALL');

  // Exam tracks metadata
  const EXAM_DATA: Record<UpscExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    stages: string;
    totalMarks: string;
    keySellingPoint: string;
    counsellorTip: string;
    stagesBreakdown: Array<{
      stage: string;
      title: string;
      questions: string;
      marks: string;
      duration: string;
      details: string;
    }>;
  }> = {
    'UPSC-CSE': {
      fullName: 'Civil Services Examination (IAS, IPS, IFS, IRS & 20+ Allied Services)',
      conductingBody: 'Union Public Service Commission (UPSC)',
      frequency: 'Once a Year (May/June Prelims • September Mains)',
      mode: 'Stage 1: OMR (Prelims) • Stage 2: Subjective Written (Mains) • Stage 3: Personality Test (Interview)',
      stages: '3 Stages: Prelims (Screening) -> Mains (1750M) -> Interview (275M)',
      totalMarks: 'Final Merit: 2025 Marks (Topper scores ~1050/2025 = ~52%!)',
      keySellingPoint: 'The Apex Career in India. Unmatched constitutional authority, policy decision-making, and direct leadership as District Magistrate (IAS) or SP/DGP (IPS).',
      counsellorTip: 'Tell the student: You do NOT need 90% or 100%! The Prelims cutoff is only ~75-88 marks out of 200 (~40%), and in Mains, scoring just 50% makes you an All-India Topper!',
      stagesBreakdown: [
        {
          stage: 'Stage 1: Prelims Paper 1',
          title: 'General Studies (GS 1) - Decides Cutoff',
          questions: '100 Qs',
          marks: '200 Marks (+2 / -0.66)',
          duration: '120 Mins',
          details: 'Indian Polity & Governance, History of India & Freedom Movement, Geography, Economic & Social Development, Environment & Ecology, General Science, Current Affairs of National & International Importance.'
        },
        {
          stage: 'Stage 1: Prelims Paper 2',
          title: 'CSAT (Civil Services Aptitude Test) - Qualifying Only',
          questions: '80 Qs',
          marks: '200 Marks (+2.5 / -0.83)',
          duration: '120 Mins',
          details: 'Qualifying in nature: Student needs only 33% (66 Marks out of 200). Covers Reading Comprehension, Logical Reasoning, Analytical Ability, Basic Numeracy (Class 10 level).'
        },
        {
          stage: 'Stage 2: Mains Exam',
          title: '9 Subjective Descriptive Papers (1750 Marks for Merit)',
          questions: '18-20 Qs per paper',
          marks: '1750 Merit Marks',
          duration: '5 Days (3 Hrs each)',
          details: 'Paper A (Indian Language 300M - Qualifying) • Paper B (English 300M - Qualifying) • Paper 1 (Essay 250M) • Paper 2 (GS 1: History, Geo, Society 250M) • Paper 3 (GS 2: Polity, Governance, IR 250M) • Paper 4 (GS 3: Economy, S&T, Security 250M) • Paper 5 (GS 4: Ethics, Integrity & Case Studies 250M) • Paper 6 & 7 (Optional Subject Paper 1 & 2 - 500M total).'
        },
        {
          stage: 'Stage 3: Personality Test',
          title: 'UPSC Board Interview (Dholpur House, New Delhi)',
          questions: 'Comprehensive Board Viva',
          marks: '275 Marks',
          duration: '30-45 Mins',
          details: 'Testing mental alertness, critical assimilation powers, clear logical exposition, balanced judgment, moral integrity, and leadership qualities.'
        }
      ]
    },
    'STATE-PCS': {
      fullName: 'Combined State Civil Services (UPPSC PCS, BPSC CCE, MPPSC, RPSC RAS)',
      conductingBody: 'Respective State Public Service Commissions',
      frequency: 'Annual (State-Wise Notification)',
      mode: 'Prelims (OMR) -> Mains (Subjective) -> Interview',
      stages: '3 Stages: Prelims Screening -> Mains Written -> Interview',
      totalMarks: 'Varies by state (UPPSC: 1500 Mains + 100 Interview = 1600 Marks)',
      keySellingPoint: 'Direct appointment as SDM (Sub-Divisional Magistrate), DSP (Deputy Superintendent of Police), or BDO in your home state. 90% syllabus overlap with UPSC GS!',
      counsellorTip: 'Huge pitch point: UPSC preparation gives 90% mastery over State PCS. The only extra addition is 10-15% state-specific GK (e.g. UP GK in UPPSC, Bihar GK in BPSC). Student gets double chances!',
      stagesBreakdown: [
        {
          stage: 'Prelims Stage',
          title: 'GS Paper 1 (Merit) + CSAT Paper 2 (Qualifying 33%)',
          questions: '150 Qs (GS) + 100 Qs (CSAT)',
          marks: '200 Marks each',
          duration: '2 Hours each',
          details: 'General Studies syllabus mirrors UPSC with addition of state history, culture, geography, and government schemes.'
        },
        {
          stage: 'Mains Stage',
          title: '6-8 Descriptive Papers (GS 1 to 6 + General Hindi + Essay)',
          questions: '20 Subjective Qs per paper',
          marks: '1500 Marks',
          duration: '3 Hours per paper',
          details: 'Covers Indian Polity, History, Economy, Ethics, plus 2 dedicated State Special Papers (e.g. UP GK Paper 5 & 6 in UPPSC).'
        },
        {
          stage: 'Interview',
          title: 'State Administrative Viva Voce',
          questions: 'Personality Assessment',
          marks: '100 Marks',
          duration: '25-30 Mins',
          details: 'Evaluation by State PSC panel focusing on state governance, administrative crisis management, and local issues.'
        }
      ]
    },
    'UPSC-CAPF': {
      fullName: 'Central Armed Police Forces - Assistant Commandant (AC)',
      conductingBody: 'Union Public Service Commission (UPSC)',
      frequency: 'Once a Year (August)',
      mode: 'Written Exam (Paper 1 + Paper 2) -> Physical Endurance Test (PET) -> Interview',
      stages: 'Written Test (450M) -> Physical Test -> Interview (150M)',
      totalMarks: 'Total 600 Marks for Final Selection',
      keySellingPoint: 'Direct Gazetted Class-1 Armed Forces Officer Commission (Company Commander leading 130+ troops in BSF, CRPF, CISF, ITBP, SSB). Pay Level 10 (Gross ₹95,000+/mo).',
      counsellorTip: 'For defence & uniformed services aspirants: GS syllabus is completely identical to UPSC CSE Prelims! If student prepares for UPSC CSE, CAPF (AC) written test is automatically cleared.',
      stagesBreakdown: [
        {
          stage: 'Written Paper 1',
          title: 'General Ability and Intelligence (Objective MCQ)',
          questions: '125 Questions',
          marks: '250 Marks (+2 / -0.66)',
          duration: '120 Mins',
          details: 'General Science, Current Affairs, Indian Polity & Economy, History of India, World & Indian Geography.'
        },
        {
          stage: 'Written Paper 2',
          title: 'General Studies, Essay and Comprehension (Descriptive)',
          questions: '4 Essays + Arguments + Reports + Précis',
          marks: '200 Marks',
          duration: '180 Mins',
          details: 'Testing in-depth analytical expression in English or Hindi for Essays, and English language précis/comprehension.'
        },
        {
          stage: 'Physical & Interview',
          title: 'Physical Standards / PET + Personality Test',
          questions: '100m, 800m, Long Jump, Shot Put + Interview',
          marks: '150 Marks (Interview)',
          duration: 'Physical round + 30 min Viva',
          details: 'Rigorous medical & physical endurance clearance followed by UPSC Board interview.'
        }
      ]
    },
    'UPSC-EPFO': {
      fullName: 'EPFO Enforcement Officer (EO/AO) & Assistant Provident Fund Commissioner (APFC)',
      conductingBody: 'Union Public Service Commission (UPSC)',
      frequency: 'Periodic Special Recruitment Notification',
      mode: 'Single Recruitment Test (RT) Objective CBT/OMR -> Interview',
      stages: '2 Stages: Written Test (75% weightage) + Interview (25% weightage)',
      totalMarks: 'Total 400 Marks (300M RT + 100M Interview)',
      keySellingPoint: 'Direct Group A/B Gazetted Officer in Ministry of Labour & Employment. Quasi-judicial authority and pension fund administration. No descriptive writing required!',
      counsellorTip: 'Highlights: Single objective MCQ exam without subjective essay writing! Ideal backup for UPSC aspirants because core GS, Indian Freedom Struggle, and Economy are already prepared.',
      stagesBreakdown: [
        {
          stage: 'Recruitment Test',
          title: 'Single Objective MCQ Examination',
          questions: '120 Questions',
          marks: '300 Marks (+2.5 / -0.83)',
          duration: '120 Mins',
          details: 'Indian Freedom Struggle, Indian Polity & Economy, General Accounting Principles, Industrial Relations & Labour Laws, Social Security in India, General Science & Computer Apps, Elementary Math & Stats.'
        },
        {
          stage: 'Interview',
          title: 'UPSC Board Personality Test',
          questions: 'Quasi-Judicial Viva',
          marks: '100 Marks (25% Weightage)',
          duration: '25 Mins',
          details: 'Assessment of administrative acumen, labour law understanding, and public service aptitude.'
        }
      ]
    },
    'UPSC-CDS': {
      fullName: 'Combined Defence Services Examination (IMA, INA, AFA, OTA)',
      conductingBody: 'Union Public Service Commission (UPSC)',
      frequency: 'Twice a Year (CDS I in April • CDS II in September)',
      mode: 'Written Objective Test -> 5-Day SSB (Services Selection Board) Interview',
      stages: 'Written (200-300M) -> 5-Day SSB Interview (200-300M)',
      totalMarks: 'IMA/AFA: 600 Marks total • OTA: 400 Marks total',
      keySellingPoint: 'Commissioned Officer in the Indian Army, Navy, or Air Force (Lieutenant). Direct entry into IMA Dehradun or OTA Chennai with full military honor and leadership.',
      counsellorTip: 'College graduates (B.Tech, B.Sc, B.Com, B.A.) eligible! Girls are also eligible for OTA Chennai (Short Service Commission).',
      stagesBreakdown: [
        {
          stage: 'Written Paper 1',
          title: 'English Language',
          questions: '120 Questions',
          marks: '100 Marks (+0.83 / -0.27)',
          duration: '120 Mins',
          details: 'Spotting errors, sentence rearrangement, reading comprehension, idioms & phrases.'
        },
        {
          stage: 'Written Paper 2',
          title: 'General Knowledge',
          questions: '120 Questions',
          marks: '100 Marks (+0.83 / -0.27)',
          duration: '120 Mins',
          details: 'Physical sciences, Indian history, geography, constitution, defence current affairs.'
        },
        {
          stage: 'Written Paper 3',
          title: 'Elementary Mathematics (Except OTA)',
          questions: '100 Questions',
          marks: '100 Marks',
          duration: '120 Mins',
          details: 'Class 10th level arithmetic, algebra, trigonometry, geometry, mensuration.'
        },
        {
          stage: '5-Day SSB',
          title: 'Services Selection Board (Psychological + GTO + Interview)',
          questions: 'OIR, PPDT, WAT, TAT, SRT, Group Obstacles',
          marks: '300 Marks (IMA) / 200 Marks (OTA)',
          duration: '5 Days',
          details: 'Comprehensive personality assessment evaluating Officer Like Qualities (OLQs).'
        }
      ]
    }
  };

  // Cutoff & Score Targets
  const UPSC_BENCHMARKS = [
    { stage: 'CSE Prelims GS 1 Cutoff (Out of 200)', gen: '75.41 Marks (2023) / 88.22 (2022)', obc: '74.75 Marks', sc: '59.25 Marks', st: '47.82 Marks', remarks: 'Net ~38-44 correct questions out of 100 needed!' },
    { stage: 'CSE Prelims CSAT (Out of 200)', gen: '66.00 Marks (Strict 33%)', obc: '66.00 Marks', sc: '66.00 Marks', st: '66.00 Marks', remarks: 'Qualifying only; does not add to merit ranking.' },
    { stage: 'CSE Mains Written Cutoff (Out of 1750)', gen: '741 Marks (~42.3%)', obc: '712 Marks', sc: '694 Marks', st: '692 Marks', remarks: 'Averages ~90-105 marks per paper for interview call.' },
    { stage: 'CSE Final Merit Topper Score (Out of 2025)', gen: '1016 - 1054 Marks (~52.0%)', obc: '990 - 1020 Marks', sc: '960 - 990 Marks', st: '950 - 980 Marks', remarks: 'AIR 1 in India scores only ~52% aggregate!' },
    { stage: 'UPPSC PCS Prelims Cutoff (Out of 200)', gen: '125 - 130 Marks', obc: '125 - 128 Marks', sc: '105 - 110 Marks', st: '90 - 95 Marks', remarks: 'Net ~92-95 questions correct out of 150.' },
    { stage: 'BPSC CCE Prelims Cutoff (Out of 150)', gen: '91.67 Marks (with -0.33)', obc: '88.33 Marks', sc: '79.33 Marks', st: '74.00 Marks', remarks: 'Single composite 150-question general studies paper.' },
    { stage: 'UPSC CAPF (AC) Paper 1 Cutoff (Out of 250)', gen: '125 - 135 Marks', obc: '124 - 132 Marks', sc: '105 - 112 Marks', st: '100 - 105 Marks', remarks: 'Paper 2 is evaluated only if Paper 1 cutoff is cleared.' }
  ];

  // Premier Cadres & Services
  const allCadres = useMemo(() => {
    return colleges.filter((c) => c.category_id === 'cat-upsc');
  }, [colleges]);

  const filteredCadres = useMemo(() => {
    let list = allCadres;
    if (cadreFilter === 'ALL_INDIA') {
      list = list.filter((c) => c.code === 'UPSC-CADRE');
    } else if (cadreFilter === 'STATE_PCS') {
      list = list.filter((c) => c.code.includes('PCS'));
    } else if (cadreFilter === 'UNIFORMED') {
      list = list.filter((c) => c.code.includes('CAPF') || c.code.includes('DEFENCE'));
    } else if (cadreFilter === 'MINISTRIES') {
      list = list.filter((c) => c.code.includes('EPFO'));
    }

    if (cadreSearch.trim()) {
      const q = cadreSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.programs.some((p) => p.program_name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allCadres, cadreFilter, cadreSearch]);

  const currentExam = EXAM_DATA[selectedExamCode];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '20px',
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
              background: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🏛️
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                UPSC & Civil Services Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: 3-Stage CSE (IAS/IPS/IFS) • State PCS (SDM/DSP) • CAPF (AC) • EPFO • 10-Sec Eligibility • Phone Script
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('pitch')}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
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
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <PhoneCall size={16} />
            Student Call Script
          </button>
          <button
            onClick={onOpenFitmentModal}
            style={{
              background: '#EAB308',
              border: 'none',
              color: '#0F172A',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Target size={16} />
            Check Aspirant Profile
          </button>
        </div>
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
          { id: 'exams', label: '1. Exam Patterns & Stages', icon: BookOpen, badge: '5 Exams' },
          { id: 'cadres', label: '2. Premier Cadres & Services', icon: Shield, badge: 'IAS/IPS/SDM' },
          { id: 'cutoffs', label: '3. Cutoffs & Score Targets', icon: TrendingUp, badge: 'Topper ~52%' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: 'Parallel Safety' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: '21-32 Yrs' },
          { id: 'courses', label: '6. PW UPSC Batches', icon: Sparkles, badge: 'Sankalp/Titan' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as UpscTab)}
              style={{
                background: isActive ? '#EAB308' : 'transparent',
                color: isActive ? '#0F172A' : '#94A3B8',
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
                background: isActive ? '#0F172A' : '#334155',
                color: isActive ? '#FACC15' : '#CBD5E1',
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

      {/* TAB 1: EXAM PATTERNS & STAGES */}
      {activeTab === 'exams' && (
        <div>
          {/* Related Exam Selector */}
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
              Select Civil Service Track:
            </span>
            {[
              { code: 'UPSC-CSE', label: 'UPSC CSE (IAS / IPS / IFS)', icon: '🏛️' },
              { code: 'STATE-PCS', label: 'State PCS (UPPSC / BPSC / RPSC)', icon: '📍' },
              { code: 'UPSC-CAPF', label: 'CAPF (Assistant Commandant)', icon: '🎖️' },
              { code: 'UPSC-EPFO', label: 'EPFO (EO/AO & APFC)', icon: '💼' },
              { code: 'UPSC-CDS', label: 'CDS (Military Commissioned Officer)', icon: '⚔️' }
            ].map((item) => {
              const isSelected = selectedExamCode === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedExamCode(item.code as UpscExamCode)}
                  style={{
                    background: isSelected ? '#0F172A' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#0F172A',
                    border: isSelected ? '2px solid #0F172A' : '1px solid #CBD5E1',
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

          {/* Exam Summary Header Card */}
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
                  background: '#FEF9C3',
                  color: '#854D0E',
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
                  Agency: <strong>{currentExam.conductingBody}</strong> • Timeline: <strong>{currentExam.frequency}</strong>
                </p>
              </div>

              <div style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#065F46',
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
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⏱️ Selection Mode</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.mode}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>📝 Stages & Scoring</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.stages}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🎯 Total Marks</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>{currentExam.totalMarks}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Core Appeal</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Detailed Stage Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
              📋 Detailed Stage-by-Stage Breakdown
            </h3>
            {currentExam.stagesBreakdown.map((s, idx) => (
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
                      background: '#FEF9C3',
                      color: '#854D0E',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      {s.stage}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {s.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: '#2563EB' }}>{s.questions}</span>
                    <span style={{ color: '#16A34A' }}>{s.marks}</span>
                    <span style={{ color: '#64748B' }}>{s.duration}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                  {s.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PREMIER CADRES & SERVICES */}
      {activeTab === 'cadres' && (
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
                placeholder="Search cadre or post (e.g. IAS, IPS, SDM, DSP, CAPF, EPFO)..."
                value={cadreSearch}
                onChange={(e) => setCadreSearch(e.target.value)}
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
                { id: 'ALL', label: 'All Cadres' },
                { id: 'ALL_INDIA', label: 'All India Services (IAS/IPS/IFS)' },
                { id: 'STATE_PCS', label: 'State PCS (SDM/DSP)' },
                { id: 'UNIFORMED', label: 'Armed Forces (CAPF / CDS)' },
                { id: 'MINISTRIES', label: 'Central Ministries (EPFO)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCadreFilter(f.id as any)}
                  style={{
                    background: cadreFilter === f.id ? '#0F172A' : '#F1F5F9',
                    color: cadreFilter === f.id ? '#FFFFFF' : '#475569',
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
            Showing {filteredCadres.length} Premier Cadres & Direct Gazetted Posts
          </div>

          {/* Cadres Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredCadres.map((cadre) => (
              <div
                key={cadre.id}
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
                      background: '#FEF9C3',
                      color: '#854D0E',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {cadre.code}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {cadre.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{cadre.location}</span>
                </div>

                <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: '#64748B' }}>
                  {cadre.accreditation}
                </p>

                {/* Sub-Programs / Posts Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                  {cadre.programs.map((prg) => (
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
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>ANNUAL VALUE / CTC</span>
                            <strong style={{ color: '#16A34A', fontSize: '13px' }}>₹{prg.avg_package_lpa} LPA + Perks</strong>
                          </div>
                          <div>
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>VACANCIES</span>
                            <strong style={{ color: '#2563EB', fontSize: '13px' }}>{prg.seats} Posts</strong>
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

      {/* TAB 3: CUTOFFS & SCORE TARGETS */}
      {activeTab === 'cutoffs' && (
        <div>
          {/* Demystifying UPSC Cutoffs Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              🎯 Demystifying the UPSC Score Targets (The 50% Rule)
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              Most students fear UPSC because they think they need 90% marks. The truth is that **50% marks in UPSC makes you All-India Rank 1!**
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#854D0E' }}>PRELIMS TARGET (GS 1)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>85 - 90 Marks out of 200</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  You only need ~45 net correct questions out of 100 to clear the toughest exam screening in India!
                </div>
              </div>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1E40AF' }}>CSAT QUALIFYING (PAPER 2)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>66.00 Marks (Strict 33%)</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  Net 27 correct questions out of 80 required. Doesn't add to merit, but mandatory to pass.
                </div>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>MAINS MERIT (OUT OF 1750)</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>~740 - 750 Marks (~43%)</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  Averaging 95 to 105 marks per GS paper qualifies a candidate for the IAS interview call!
                </div>
              </div>
            </div>

            {/* Official Benchmarks Table */}
            <h4 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
              📊 Category-Wise Cutoffs & Stage Targets
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Examination & Stage</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#1E40AF' }}>General (UR)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>OBC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>SC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>ST</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#166534' }}>Strategic Counsellor Note</th>
                  </tr>
                </thead>
                <tbody>
                  {UPSC_BENCHMARKS.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>{row.stage}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#1E40AF', background: '#EFF6FF' }}>{row.gen}</td>
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
              Pitching UPSC Preparation to an Aspirant
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #EAB308' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The Respect & Authority Opening:</strong>
                "Hello [Student Name]! Deciding to prepare for UPSC is the single highest ambition a student can take. An IAS officer commands whole districts, directs government policies, and enjoys lifelong respect that no private corporate role can ever match."
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The Parallel Exam Safety Net (Zero-Risk Plan):</strong>
                "Many students fear 'What if I don't clear UPSC?'. Tell them: Preparing for UPSC GS automatically covers 90% of your State PCS (SDM/DSP in UP, Bihar, MP, Rajasthan), CAPF Assistant Commandant, and EPFO! By preparing for UPSC, you are simultaneously eligible for 4 to 5 top Class-1 Gazetted officer exams every single year!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The PW Sankalp Batch Advantage:</strong>
                "You no longer need to spend ₹2-3 Lakhs living in cramped rooms in Delhi's Old Rajinder Nagar. PW brings the same top faculty from Delhi straight to your study table with daily answer writing, NCERT foundations, and 1-on-1 mentorship at a fraction of the cost."
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
              Instant Answers to Aspirant Doubts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.55 }}>
              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Sir, I have only 50% or 60% in graduation. Can I clear UPSC?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "100% YES! UPSC does not care about your college percentage. There is NO minimum marks requirement—even a 3rd-division pass is eligible. Several past IAS toppers like Manoj Sharma (12th Fail inspiration) had modest marks in graduation. What matters is your current answer-writing discipline!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Do I have to go to Delhi (Old Rajinder Nagar) to prepare?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Absolutely not. In the last 3 years, top ranks (including AIR 1, 2, 3) prepared from their home towns using online guidance. Living in Delhi costs ₹2.5 Lakhs/year in living expenses alone. With PW online live classes, test series, and mentor evaluation, you get better personal tracking at home."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "When should I choose my Optional Subject?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Focus on NCERTs and basic GS for the first 3-4 months. By month 4, pick an optional (PSIR, Geography, Sociology, History, Public Admin) based on your interest and syllabus overlap with GS, and complete it before the Prelims sprint!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "I am in final year of graduation, can I give Prelims?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! Final year appearing students are completely eligible to fill the form and sit for the Prelims exam, provided they show proof of passing degree before Mains."
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
            ⏱️ 10-Second Aspirant Qualification Check
          </h3>
          <p style={{ margin: '0 0 20px', color: '#64748B', fontSize: '13px' }}>
            Check if the student meets the age, degree, and attempt conditions for UPSC & State PCS.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Education Degree</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>Bachelor's in ANY Stream</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>B.A., B.Sc., B.Tech, B.Com, MBBS. NO minimum marks required!</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Age Limit (General)</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>21 to 32 Years</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Calculated as on August 1st of exam year. Up to 40 yrs in State PCS!</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Number of Attempts</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#D97706' }}>6 (Gen) • 9 (OBC) • Unlimited (SC/ST)</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>An attempt counts only if student actually sits in Prelims Paper 1.</div>
            </div>
          </div>

          <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#713F12', lineHeight: 1.5 }}>
            <strong>✅ Three Golden Rules for UPSC Counselling:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>Final Year Appearing:</strong> Eligible for Prelims! Must complete graduation before filling the Mains Detailed Application Form (DAF).</li>
              <li><strong>Category Age Relaxations:</strong> OBC-NCL candidates get 3 years relaxation (up to 35 years); SC/ST get 5 years (up to 37 years).</li>
              <li><strong>Attempt Definition:</strong> Merely filling the application form does NOT count as an attempt. An attempt is counted only when the candidate appears in at least one paper on Prelims day.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW UPSC BATCHES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW UPSC Foundation & Target Batches
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              NCERT to Advanced GS + CSAT + Daily Answer Writing + Optional Modules.
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
                      background: '#FEF9C3',
                      color: '#854D0E',
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
                      Key Features:
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
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>COURSE FEE</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#16A34A' }}>
                      ₹{crs.fees_inr.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => onPitchCourse(crs)}
                    style={{
                      background: '#0F172A',
                      border: 'none',
                      color: '#FACC15',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 800,
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
