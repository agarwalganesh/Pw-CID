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
  Landmark,
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
  DollarSign,
  Award
} from 'lucide-react';

interface BankingCounsellorCockpitProps {
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

type BankingTab = 'exams' | 'banks' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type BankingExamCode = 'SBI-PO' | 'IBPS-PO' | 'RBI-GRADE-B' | 'SBI-CLERK' | 'IBPS-RRB-PO';

export const BankingCounsellorCockpit: React.FC<BankingCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<BankingTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<BankingExamCode>('SBI-PO');
  const [bankSearch, setBankSearch] = useState('');
  const [bankFilter, setBankFilter] = useState<'ALL' | 'SBI' | 'RBI' | 'PSB' | 'RRB'>('ALL');

  // Exam tracks metadata
  const EXAM_DATA: Record<BankingExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    phases: string;
    totalMarks: string;
    keySellingPoint: string;
    counsellorTip: string;
    phasesBreakdown: Array<{
      phase: string;
      title: string;
      questions: string;
      marks: string;
      duration: string;
      details: string;
    }>;
  }> = {
    'SBI-PO': {
      fullName: 'State Bank of India Probationary Officer (Scale I Junior Management)',
      conductingBody: 'SBI Central Recruitment Board, Corporate Centre Mumbai',
      frequency: 'Once a Year (Oct Prelims • Dec Mains • Feb Interview)',
      mode: 'Phase 1: Prelims CBT -> Phase 2: Mains CBT + Descriptive -> Phase 3: GE & PI',
      phases: '3 Phases: Prelims (100M) -> Mains (250M) -> Group Exercises & Interview (50M)',
      totalMarks: 'Normalized Merit: 100 Marks (Mains 75% weightage + Interview 25%)',
      keySellingPoint: 'The Premier Banking Officer role in India! Starting total compensation package is ₹16.50 LPA (including leased accommodation up to ₹35k/mo in Mumbai, medical, furniture). Fast-track promotion ladder to Chairman!',
      counsellorTip: 'Highlight the speed of recruitment: From notification to final joining letter takes ONLY 6 TO 8 MONTHS! Unlike other govt exams with court delays, banking results are announced on exact scheduled dates.',
      phasesBreakdown: [
        {
          phase: 'Phase 1: Prelims CBT',
          title: '3 Sections (100 Questions, 100 Marks, 60 Mins)',
          questions: '100 Questions (English 30, Quant 35, Logic 35)',
          marks: '100 Marks (+1 / -0.25)',
          duration: '60 Minutes (Strict 20 Mins / Section)',
          details: 'English Language (30 Qs, 20 mins) • Quantitative Aptitude (35 Qs, 20 mins) • Reasoning Ability (35 Qs, 20 mins). Qualifying only; no sectional cutoff in SBI PO!'
        },
        {
          phase: 'Phase 2: Mains Objective',
          title: '4 High-Level Sections (155 Questions, 200 Marks)',
          questions: '155 Questions',
          marks: '200 Marks (+1 / -0.25)',
          duration: '180 Minutes (3 Hours)',
          details: 'Reasoning & Computer (45 Qs, 60M, 60m) • Data Analysis & Interpretation (35 Qs, 60M, 45m) • General/Economy/Banking Awareness (40 Qs, 50M, 35m) • English Language (35 Qs, 40M, 40m).'
        },
        {
          phase: 'Phase 2: Descriptive Test',
          title: 'English Letter & Essay Typed on Computer Keyboard',
          questions: '2 Questions (1 Letter + 1 Essay)',
          marks: '50 Marks',
          duration: '30 Minutes',
          details: 'Evaluates contemporary economic/banking essay writing and formal banking correspondence.'
        },
        {
          phase: 'Phase 3: GE & Interview',
          title: 'Group Exercises (20M) + Personal Interview (30M)',
          questions: 'Group Case Discussion & Panel Viva',
          marks: '50 Marks',
          duration: '45 Minutes Total',
          details: 'Conducted at SBI Circle Head Offices. Psychometric profile test taken prior to interview.'
        }
      ]
    },
    'IBPS-PO': {
      fullName: 'Institute of Banking Personnel Selection - Probationary Officer (11 Nationalized Banks)',
      conductingBody: 'IBPS Mumbai (Under Ministry of Finance)',
      frequency: 'Once a Year (August-October)',
      mode: 'Prelims CBT -> Mains CBT + Descriptive -> Personal Interview',
      phases: '3 Phases: Prelims (100M) -> Mains (225M) -> Interview (100M)',
      totalMarks: 'Normalized Merit: 100 Marks (80% Mains + 20% Interview)',
      keySellingPoint: 'Single window recruitment for 11 public sector banks (Punjab National Bank, Bank of Baroda, Canara Bank, Union Bank of India, etc.). Over 4,500+ Scale-1 Officer vacancies every year!',
      counsellorTip: 'Important difference from SBI: IBPS PO has BOTH sectional cutoffs and overall cutoff in Prelims & Mains! A student must clear minimum cutoff in every subject.',
      phasesBreakdown: [
        {
          phase: 'Prelims CBT',
          title: 'English (30), Quant (35), Reasoning (35)',
          questions: '100 Questions',
          marks: '100 Marks (+1 / -0.25)',
          duration: '60 Minutes (20 Mins / Section)',
          details: 'Strict sectional timer with negative marking. Decides qualification for Mains.'
        },
        {
          phase: 'Mains Exam',
          title: '4 Objective Sections (200M) + Descriptive Test (25M)',
          questions: '157 Questions',
          marks: '225 Marks',
          duration: '210 Minutes (3.5 Hours)',
          details: 'Reasoning & Computer (60M) • Data Analysis (60M) • General & Banking Awareness (40M) • English (40M) + Descriptive Letter/Essay (25M).'
        },
        {
          phase: 'Interview',
          title: 'Participating Bank Panel Interview',
          questions: 'Banking & Financial Awareness Viva',
          marks: '100 Marks (Min 40% to Qualify)',
          duration: '20-25 Minutes',
          details: 'Conducted jointly by Nodal Banks in each state.'
        }
      ]
    },
    'RBI-GRADE-B': {
      fullName: 'Reserve Bank of India Officers in Grade ‘B’ (General Cadre - Direct Class A)',
      conductingBody: 'Reserve Bank of India Services Board, Mumbai',
      frequency: 'Once a Year (June-July Window)',
      mode: 'Phase 1 Objective CBT -> Phase 2 (ESI + FM + English Descriptive) -> Interview',
      phases: '3 Phases: Phase 1 (200M) -> Phase 2 (300M) -> Interview (75M)',
      totalMarks: 'Final Selection = Phase 2 (300M) + Interview (75M) = 375 Marks',
      keySellingPoint: 'The most prestigious central banking job in Asia! Direct appointment as Grade B Manager in RBI. Starting gross salary ₹1,16,000/month (CTC ₹24+ LPA) + prime RBI housing quarters in Mumbai/Delhi.',
      counsellorTip: 'Pitch to high-ambition graduates: Phase 1 has 80 questions of General Awareness! Scoring high in Current Affairs and Economy makes clearing Phase 1 effortless.',
      phasesBreakdown: [
        {
          phase: 'Phase 1 Objective',
          title: '200 Questions Composite Screening Test',
          questions: 'GA (80), Reasoning (60), English (30), Quant (30)',
          marks: '200 Marks (+1 / -0.25)',
          duration: '120 Minutes',
          details: 'High-speed test requiring 50% sectional cutoff in each section.'
        },
        {
          phase: 'Phase 2 Paper 1',
          title: 'Economic and Social Issues (ESI)',
          questions: '30 Obj Qs (50M) + 4 Descriptive Qs (50M)',
          marks: '100 Marks',
          duration: '120 Minutes',
          details: 'Macroeconomic reforms, Union Budget, poverty, demographic trends, monetary policy.'
        },
        {
          phase: 'Phase 2 Paper 2',
          title: 'English Writing Skills',
          questions: '3 Questions (Essay, Précis, Comprehension)',
          marks: '100 Marks',
          duration: '90 Minutes',
          details: 'Tested strictly online via keyboard typing.'
        },
        {
          phase: 'Phase 2 Paper 3',
          title: 'Finance and Management (FM)',
          questions: '30 Obj Qs (50M) + 4 Descriptive Qs (50M)',
          marks: '100 Marks',
          duration: '120 Minutes',
          details: 'Financial system, banking regulations, organizational behavior, corporate governance.'
        }
      ]
    },
    'SBI-CLERK': {
      fullName: 'SBI Junior Associate (Customer Support & Sales - Clerical Cadre)',
      conductingBody: 'State Bank of India',
      frequency: 'Once a Year (Nov-Jan)',
      mode: 'Prelims CBT (100M) -> Mains CBT (200M) -> NO INTERVIEW!',
      phases: '2 Phases: Prelims Screening -> Mains Final Selection',
      totalMarks: 'Final Selection: 200 Marks in Mains Exam',
      keySellingPoint: 'NO INTERVIEW AT ALL! 100% selection based purely on written Mains score. Starting gross salary ₹38,000 - ₹42,000/month with direct promotion to Scale-1 Officer in 3 years.',
      counsellorTip: 'Best for students who have interview phobia: Clear the written test and directly receive the appointment letter! Over 8,000+ vacancies every year.',
      phasesBreakdown: [
        {
          phase: 'Prelims CBT',
          title: 'English (30 Qs), Quant (35 Qs), Reasoning (35 Qs)',
          questions: '100 Questions',
          marks: '100 Marks (+1 / -0.25)',
          duration: '60 Minutes (20 mins per section)',
          details: 'Screening test to shortlist candidates for Mains (approx 10 times vacancies).'
        },
        {
          phase: 'Mains CBT',
          title: 'General Awareness (50), English (40), Quant (50), Reasoning (50)',
          questions: '190 Questions',
          marks: '200 Marks (+1 / -0.25)',
          duration: '160 Minutes (2 Hours 40 Mins)',
          details: 'Decides the final merit allotment list. High weightage to Banking & Financial Awareness (50 Marks).'
        }
      ]
    },
    'IBPS-RRB-PO': {
      fullName: 'Regional Rural Banks Officer Scale I (Assistant Manager in Gramin Bank)',
      conductingBody: 'IBPS (For 43 Regional Rural Banks Across India)',
      frequency: 'Once a Year (August Prelims • Sep Mains)',
      mode: 'Prelims CBT (Math + Logic Only) -> Mains CBT -> Interview',
      phases: '3 Phases: Prelims (80M) -> Mains (200M) -> Interview (100M)',
      totalMarks: 'Final Merit: 100 Marks (80% Mains + 20% Interview)',
      keySellingPoint: 'Guaranteed HOME-STATE POSTING! No transfers to distant states. Plus, in Prelims, there is NO ENGLISH SECTION! (Only Quant + Reasoning).',
      counsellorTip: 'Golden opportunity for vernacular/rural students: Prelims has only 40 Qs Math and 40 Qs Reasoning (NO English!). In Mains, student can choose either Hindi or English language!',
      phasesBreakdown: [
        {
          phase: 'Prelims CBT',
          title: 'Quantitative Aptitude (40 Qs) + Reasoning (40 Qs)',
          questions: '80 Questions (NO ENGLISH SECTION!)',
          marks: '80 Marks (+1 / -0.25)',
          duration: '45 Minutes Composite',
          details: '40 Qs Quant + 40 Qs Reasoning. Free navigation between sections.'
        },
        {
          phase: 'Mains CBT',
          title: '5 Sections: Reasoning, Computer, GA, English/Hindi, Math',
          questions: '200 Questions',
          marks: '200 Marks',
          duration: '120 Minutes',
          details: 'Candidate can choose to attempt General Hindi instead of English language!'
        },
        {
          phase: 'Interview',
          title: 'State Nodal Gramin Bank Interview',
          questions: 'Rural Banking & Agriculture Finance Viva',
          marks: '100 Marks',
          duration: '20 Minutes',
          details: 'Conducted in home state in regional language.'
        }
      ]
    }
  };

  // Cutoffs
  const BANKING_BENCHMARKS = [
    { exam: 'SBI PO Prelims Cutoff (Out of 100)', gen: '59.50 - 62.00 Marks', obc: '58.25 - 61.00 Marks', sc: '53.00 - 55.50 Marks', st: '47.50 - 50.00 Marks', remarks: 'No sectional cutoff in SBI PO; overall score matters!' },
    { exam: 'SBI PO Mains Cutoff (Out of 250)', gen: '88.50 - 92.00 Marks', obc: '82.00 - 85.00 Marks', sc: '73.00 - 76.00 Marks', st: '68.00 - 71.00 Marks', remarks: 'Includes 200M Objective + 50M Descriptive test.' },
    { exam: 'IBPS PO Prelims Cutoff (Out of 100)', gen: '54.25 - 58.50 Marks', obc: '53.50 - 57.00 Marks', sc: '47.00 - 50.00 Marks', st: '41.00 - 45.00 Marks', remarks: 'Must clear sectional cutoffs (~7-10 marks per subject).' },
    { exam: 'IBPS PO Mains Cutoff (Out of 225)', gen: '63.00 - 71.50 Marks', obc: '60.00 - 68.00 Marks', sc: '50.00 - 56.00 Marks', st: '42.00 - 48.00 Marks', remarks: 'Normalized with interview in 80:20 ratio.' },
    { exam: 'RBI Grade B Phase 1 Cutoff (Out of 200)', gen: '66.75 - 72.00 Marks', obc: '66.75 Marks', sc: '55.25 Marks', st: '50.00 Marks', remarks: 'High GA score (45-50+ in GA) makes cracking Phase 1 easy.' },
    { exam: 'SBI Clerk Prelims Cutoff (Out of 100)', gen: '72.00 - 78.50 Marks', obc: '70.00 - 76.00 Marks', sc: '62.00 - 68.00 Marks', st: '55.00 - 60.00 Marks', remarks: 'State-wise cutoffs; speed-driven sprint (60 mins).' }
  ];

  // Filtered banks
  const filteredBanks = useMemo(() => {
    let list = colleges.filter((c) => c.category_id === 'cat-banking');

    if (bankFilter === 'SBI') {
      list = list.filter((c) => c.code === 'SBI');
    } else if (bankFilter === 'RBI') {
      list = list.filter((c) => c.code === 'RBI');
    } else if (bankFilter === 'PSB') {
      list = list.filter((c) => c.code.includes('PSB'));
    } else if (bankFilter === 'RRB') {
      list = list.filter((c) => c.code.includes('RRB'));
    }

    if (bankSearch.trim()) {
      const q = bankSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.programs.some((p) => p.program_name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [colleges, bankFilter, bankSearch]);

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
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🏦
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                Banking & Insurance Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: SBI PO (₹16.5 LPA) • IBPS PO • RBI Grade B • SBI Clerk (No Interview) • Speed Tactics • Call Scripts
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
              background: '#10B981',
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

      {/* Cross-Over Strategy Ribbon (Banking + SSC Synergy) */}
      <div style={{
        background: 'linear-gradient(90deg, #064E3B 0%, #065F46 100%)',
        border: '1px solid #059669',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '20px',
        color: '#D1FAE5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <div style={{ fontSize: '13px' }}>
            <strong style={{ color: '#FCD34D' }}>The Fastest Govt Selection Cycle in India:</strong> Banking exams complete notification, prelims, mains, interview, and joining in just 6 to 8 months. High syllabus overlap with SSC allows an aspirant to clear both!
          </div>
        </div>
        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            background: '#10B981',
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
          { id: 'exams', label: '1. Exam Patterns & Phases', icon: BookOpen, badge: '5 Exams' },
          { id: 'banks', label: '2. Banks & Institutions', icon: Building2, badge: 'SBI / RBI / IBPS' },
          { id: 'cutoffs', label: '3. Cutoffs & Sectionals', icon: TrendingUp, badge: 'Prelims & Mains' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: '6-Month Cycle' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: '20-30 Yrs' },
          { id: 'courses', label: '6. PW Banking Batches', icon: Sparkles, badge: 'Achievers Pack' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BankingTab)}
              style={{
                background: isActive ? '#10B981' : 'transparent',
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

      {/* TAB 1: EXAM PATTERNS & PHASES */}
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
              Select Banking Exam:
            </span>
            {[
              { code: 'SBI-PO', label: 'SBI PO (Scale I - ₹16.5 LPA)', icon: '🏛️' },
              { code: 'IBPS-PO', label: 'IBPS PO (11 Nationalized Banks)', icon: '🏦' },
              { code: 'RBI-GRADE-B', label: 'RBI Grade B (Apex Central Bank)', icon: '⭐' },
              { code: 'SBI-CLERK', label: 'SBI Clerk (No Interview)', icon: '📋' },
              { code: 'IBPS-RRB-PO', label: 'RRB PO (Gramin Bank - Home State)', icon: '🌾' }
            ].map((item) => {
              const isSelected = selectedExamCode === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedExamCode(item.code as BankingExamCode)}
                  style={{
                    background: isSelected ? '#065F46' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#065F46',
                    border: isSelected ? '2px solid #065F46' : '1px solid #CBD5E1',
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
                  background: '#ECFDF5',
                  color: '#065F46',
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
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⏱️ Selection Mode</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.mode}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>📝 Phases & Selection</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.phases}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🎯 Total Marks</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>{currentExam.totalMarks}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Core Appeal</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Phase Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
              📋 Detailed Phase Breakdown (Strict Sectional Timers)
            </h3>
            {currentExam.phasesBreakdown.map((p, idx) => (
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
                      background: '#ECFDF5',
                      color: '#065F46',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      {p.phase}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {p.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: '#2563EB' }}>{p.questions}</span>
                    <span style={{ color: '#16A34A' }}>{p.marks}</span>
                    <span style={{ color: '#64748B' }}>{p.duration}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                  {p.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BANKS & INSTITUTIONS DIRECTORY */}
      {activeTab === 'banks' && (
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
                placeholder="Search bank or organization (e.g. SBI, RBI, PNB, Gramin Bank)..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
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
                { id: 'ALL', label: 'All Banks' },
                { id: 'SBI', label: 'State Bank of India' },
                { id: 'RBI', label: 'Reserve Bank of India' },
                { id: 'PSB', label: '11 Nationalized Banks' },
                { id: 'RRB', label: 'Regional Rural Banks' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setBankFilter(f.id as any)}
                  style={{
                    background: bankFilter === f.id ? '#065F46' : '#F1F5F9',
                    color: bankFilter === f.id ? '#FFFFFF' : '#475569',
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
            Showing {filteredBanks.length} Premier Public Sector Banks & Financial Authorities
          </div>

          {/* Banks Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredBanks.map((bank) => (
              <div
                key={bank.id}
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
                      background: '#ECFDF5',
                      color: '#065F46',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {bank.code}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {bank.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{bank.location}</span>
                </div>

                <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: '#64748B' }}>
                  {bank.accreditation}
                </p>

                {/* Programs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                  {bank.programs.map((prg) => (
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
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>TOTAL PACKAGE / CTC</span>
                            <strong style={{ color: '#16A34A', fontSize: '13px' }}>₹{prg.avg_package_lpa} LPA</strong>
                          </div>
                          <div>
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>VACANCIES</span>
                            <strong style={{ color: '#2563EB', fontSize: '13px' }}>{prg.seats.toLocaleString('en-IN')} Posts</strong>
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

      {/* TAB 3: CUTOFFS & SECTIONALS */}
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
              🎯 Banking Cutoff Benchmarks & Sectional Criteria
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              Cutoffs across SBI PO, IBPS PO, RBI Grade B, and SBI Clerk.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Banking Exam & Stage</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#166534' }}>General (UR)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>OBC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>SC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>ST</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#1E40AF' }}>Sectional Rules</th>
                  </tr>
                </thead>
                <tbody>
                  {BANKING_BENCHMARKS.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>{row.exam}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#166534', background: '#F0FDF4' }}>{row.gen}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.obc}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.sc}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.st}</td>
                      <td style={{ padding: '12px 14px', color: '#1E40AF', fontSize: '12px', fontWeight: 600 }}>{row.remarks}</td>
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
              Pitching Banking to an Aspirant
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The Fastest Joining & ₹16.5 LPA Salary:</strong>
                "Hello [Student Name]! Banking is the fastest selection system in India. In just 6 months, you clear Prelims, Mains, and Interview, and start earning as an SBI Probationary Officer with a total compensation package of ₹16.50 Lakhs per annum (including quarters, medical, and allowances)!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The No-Interview Golden Route (SBI Clerk & RRB):</strong>
                "If you want zero interview risk, SBI Clerk and IBPS Clerk have NO INTERVIEW at all! Your selection is 100% determined by your computer test score. You can join as a Customer Associate and get promoted to Scale-1 Officer in 3 years."
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The PW Banking Achievers Advantage:</strong>
                "Banking is 100% about speed and sectional timer management. PW gives you live speed drills for Puzzles and Data Interpretation, Daily Speed Math calculation tricks, and full CBT mock test simulations."
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
              Instant Answers to Banking Doubts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.55 }}>
              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Sir, reasoning puzzles take me 8-10 minutes. Can I clear Prelims?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! In Prelims, question selection is key. You first solve Syllogisms, Inequalities, Coding, and Blood Relations in 6 minutes (getting 15 marks), and then dedicate 14 minutes to 2 easy-to-medium puzzles. With PW's daily puzzle live classes, your puzzle solving time drops to under 3 minutes!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "How many attempts are allowed in SBI PO?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "General candidates get 4 attempts (only counted if you appear in Mains; Prelims doesn't count as an attempt!). OBC gets 7 attempts, and SC/ST have UNLIMITED attempts within the age of 30."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Are public sector banks getting privatized?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "SBI, PNB, Bank of Baroda, and Canara Bank are strategically designated as Domestic Systemically Important Banks (D-SIBs) with 100% sovereign government backing. Your pension, job security, and service benefits are completely guaranteed."
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
            Verify eligibility for SBI PO, IBPS PO, and Clerical exams.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Education Degree</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>Bachelor's in ANY Stream</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>B.A., B.Sc., B.Com, B.Tech. No minimum percentage for SBI/IBPS PO!</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Age Limit (General)</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>21 to 30 Yrs (PO) / 20-28 (Clerk)</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>+3 yrs relaxation for OBC, +5 yrs for SC/ST.</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Final Year Students?</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>Completely Eligible</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Can apply provisionally provided proof of passing by interview date.</div>
            </div>
          </div>

          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#065F46', lineHeight: 1.5 }}>
            <strong>✅ Key Rules for Banking Counselling:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>SBI PO Attempts:</strong> General candidates have 4 chances in Mains. Prelims appearance does NOT count as an attempt!</li>
              <li><strong>IBPS PO Attempts:</strong> UNLIMITED attempts for all categories as long as age limit is satisfied.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW BANKING BATCHES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW Banking Batch Offerings
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              Foundation to Advanced Live Batches, Speed Math & Puzzle Test Series.
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
                      background: '#ECFDF5',
                      color: '#065F46',
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
                      background: '#065F46',
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
