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
  Train,
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
  Zap,
  ArrowRight
} from 'lucide-react';

interface SscCounsellorCockpitProps {
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

type SscTab = 'exams' | 'ministries' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type SscExamCode = 'SSC-CGL' | 'SSC-CHSL' | 'SSC-CPO' | 'RRB-NTPC' | 'RRB-ALP';

export const SscCounsellorCockpit: React.FC<SscCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<SscTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<SscExamCode>('SSC-CGL');
  const [postSearch, setPostSearch] = useState('');
  const [postFilter, setPostFilter] = useState<'ALL' | 'INSPECTORS' | 'ASO' | 'RAILWAYS' | 'INVESTIGATION'>('ALL');

  // Exam tracks metadata
  const EXAM_DATA: Record<SscExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    tiers: string;
    totalMarks: string;
    keySellingPoint: string;
    counsellorTip: string;
    tiersBreakdown: Array<{
      tier: string;
      title: string;
      questions: string;
      marks: string;
      duration: string;
      details: string;
    }>;
  }> = {
    'SSC-CGL': {
      fullName: 'Combined Graduate Level Examination (Mini-IAS / Central Inspectors & ASOs)',
      conductingBody: 'Staff Selection Commission (SSC)',
      frequency: 'Once a Year (Sep-Oct Tier 1 • Dec-Jan Tier 2)',
      mode: 'Tier 1: 100 Qs CBT (Screening) -> Tier 2: 150 Qs CBT (Final Merit)',
      tiers: '2 Tiers: Tier 1 (Screening 200M) + Tier 2 (Merit 390M) + DEST Typing',
      totalMarks: 'Final Merit: 390 Marks (Decided strictly by Tier 2 Section 1 + Section 2)',
      keySellingPoint: 'Direct appointment in premier central ministries (MEA, CSS, Income Tax, GST Excise, CBI, ED). Uniform with 3 stars (GST/Customs) or diplomatic passport in foreign embassies (MEA)!',
      counsellorTip: 'Explain to student: Tier 1 marks are NOT added to final merit! You only need to clear the Tier 1 cutoff (~135-150/200). Entire selection depends on Tier 2 (390 Marks) where Math, Reasoning, English & GA are tested!',
      tiersBreakdown: [
        {
          tier: 'Tier 1 Screening CBT',
          title: '4 Subjects (100 Questions, 200 Marks)',
          questions: '100 Qs (25 per subject)',
          marks: '200 Marks (+2 / -0.50)',
          duration: '60 Minutes (Composite)',
          details: 'Reasoning (25 Qs, 50M) • General Awareness (25 Qs, 50M) • Quantitative Aptitude (25 Qs, 50M) • English Comprehension (25 Qs, 50M). Qualifying in nature.'
        },
        {
          tier: 'Tier 2 Section 1',
          title: 'Mathematical Abilities + Reasoning (Decides Rank)',
          questions: '60 Questions (30 Math + 30 Logic)',
          marks: '180 Marks (+3 / -1)',
          duration: '60 Minutes Strict',
          details: 'Core Arithmetic, Advanced Math (Trigo, Geometry, Algebra, Probability, Statistics) and high-level analytical reasoning.'
        },
        {
          tier: 'Tier 2 Section 2',
          title: 'English Language + General Awareness (Decides Rank)',
          questions: '70 Questions (45 English + 25 GA)',
          marks: '210 Marks (+3 / -1)',
          duration: '60 Minutes Strict',
          details: '45 Qs English (Grammar, Vocab, Reading Passages, Active/Passive) + 25 Qs GA (Polity, History, Economics, Science, Current Affairs).'
        },
        {
          tier: 'Tier 2 Section 3',
          title: 'Computer Knowledge Test & Data Entry Speed (DEST)',
          questions: '20 Questions Computer + Typing',
          marks: '60 Marks (Qualifying)',
          duration: '15 Mins + 15 Mins Typing',
          details: 'Computer basics, networking, security (min 18 marks for General) + 2000 key depressions in 15 mins (approx 27 wpm typing).'
        }
      ]
    },
    'SSC-CHSL': {
      fullName: 'Combined Higher Secondary Level (10+2 LDC, JSA, Data Entry Operator)',
      conductingBody: 'Staff Selection Commission (SSC)',
      frequency: 'Once a Year (June-July)',
      mode: 'Tier 1 CBT (Screening) -> Tier 2 CBT (Merit) + Typing Test',
      tiers: '2 Tiers: Tier 1 (200M) + Tier 2 (360M)',
      totalMarks: 'Final Merit: 360 Marks',
      keySellingPoint: 'Best entry-level central government job right after 12th pass! Pay Level 2 to 4 (Gross salary ₹38,000 - ₹48,000/month) with permanent desk postings in central secretariats.',
      counsellorTip: 'For 12th pass & college 1st-year students: Exact same 4 subjects as CGL (Math, Reasoning, English, GK). Cracking CHSL gives early financial freedom and time to prepare for CGL/UPSC!',
      tiersBreakdown: [
        {
          tier: 'Tier 1 Screening',
          title: '4 Subjects (100 Questions, 200 Marks)',
          questions: '100 Questions',
          marks: '200 Marks (+2 / -0.50)',
          duration: '60 Minutes',
          details: '25 Qs each in English, Math, Reasoning, and General Awareness at 10+2 standard.'
        },
        {
          tier: 'Tier 2 Merit',
          title: 'Section 1 (Math + Logic) & Section 2 (English + GA)',
          questions: '120 Questions (60 + 60)',
          marks: '360 Marks (+3 / -1)',
          duration: '120 Minutes',
          details: 'Session 1: Math (30 Qs) + Reasoning (30 Qs) = 180M • Session 2: English (40 Qs) + GA (20 Qs) = 180M.'
        },
        {
          tier: 'Skill / Typing',
          title: 'Typing Test for LDC/JSA and DEO',
          questions: 'Typing Speed Evaluation',
          marks: 'Qualifying',
          duration: '10 - 15 Minutes',
          details: '35 wpm in English or 30 wpm in Hindi for LDC/JSA; 8000 key depressions/hr for DEO.'
        }
      ]
    },
    'SSC-CPO': {
      fullName: 'Sub-Inspector in Delhi Police & Central Armed Police Forces (CAPFs - BSF/CRPF/CISF)',
      conductingBody: 'Staff Selection Commission (SSC)',
      frequency: 'Once a Year (May-June)',
      mode: 'Paper 1 CBT -> Physical Endurance Test (PET) -> Paper 2 English CBT -> Medical',
      tiers: 'Paper 1 (200M) + Paper 2 (200M) = 400 Marks Merit',
      totalMarks: 'Final Merit: 400 Marks + Physical Clearance',
      keySellingPoint: 'Direct 2-Star Uniformed Officer post! Delhi Police SI enjoys high prestige in national capital. CAPF SI leads border patrols and anti-insurgency operations.',
      counsellorTip: 'Key advantage: Paper 2 is ONLY English Language (200 Questions)! A candidate strong in English can easily bag Delhi Police Sub-Inspector with solid physical training.',
      tiersBreakdown: [
        {
          tier: 'Paper 1 CBT',
          title: '4 Subjects Objective Test',
          questions: '200 Questions (50 per section)',
          marks: '200 Marks (+1 / -0.25)',
          duration: '120 Minutes (2 Hours)',
          details: 'General Intelligence (50 Qs), General Knowledge (50 Qs), Quantitative Aptitude (50 Qs), English Comprehension (50 Qs).'
        },
        {
          tier: 'Physical (PET/PST)',
          title: 'Physical Standard & Endurance Test',
          questions: '100m sprint, 1.6km race, High Jump, Long Jump',
          marks: 'Qualifying Only',
          duration: '1 Day Field Test',
          details: 'Male: 170 cm height, 1600m in 6.5 mins • Female: 157 cm height, 800m in 4 mins. No marks, only qualifying.'
        },
        {
          tier: 'Paper 2 CBT',
          title: 'English Language & Comprehension',
          questions: '200 Questions',
          marks: '200 Marks (+1 / -0.25)',
          duration: '120 Minutes',
          details: 'Error recognition, filling blanks, vocabulary, spellings, sentence structure, idioms, comprehension passages.'
        }
      ]
    },
    'RRB-NTPC': {
      fullName: 'Railway Non-Technical Popular Categories (Station Master, Goods Guard, Traffic Assistant)',
      conductingBody: 'Railway Recruitment Boards (21 RRBs)',
      frequency: 'Centralized Employment Notification (CEN)',
      mode: 'CBT 1 Screening -> CBT 2 Merit -> Computer Based Aptitude Test (CBAT) / Typing',
      tiers: 'CBT 1 (100M) + CBT 2 (120M) + CBAT (30% weightage for SM)',
      totalMarks: 'CBT 2: 120 Marks (decides 70% merit)',
      keySellingPoint: 'Indian Railways premier operational cadre! Station Master controls station train movements and safety with Pay Level 6 (Gross salary ₹65,000+/mo + night/travel allowances).',
      counsellorTip: 'No English section in Railway exams! For students whose English is weak, RRB NTPC is the #1 goldmine because it tests ONLY General Awareness (50 Qs), Math (35 Qs), and Reasoning (35 Qs)!',
      tiersBreakdown: [
        {
          tier: 'CBT 1 Screening',
          title: '100 Questions Composite Test',
          questions: '100 Questions (GA 40, Math 30, Logic 30)',
          marks: '100 Marks (+1 / -0.33)',
          duration: '90 Minutes',
          details: 'Common screening test for 12th-level and graduate-level posts across all 21 railway boards.'
        },
        {
          tier: 'CBT 2 Merit',
          title: '120 Questions (GA 50, Math 35, Logic 35)',
          questions: '120 Questions',
          marks: '120 Marks (+1 / -0.33)',
          duration: '90 Minutes',
          details: 'High-speed test deciding merit ranking. Separate test papers for Pay Level 2, 3, 5, and 6 posts.'
        },
        {
          tier: 'CBAT Aptitude Test',
          title: 'Psycho Aptitude Test for Station Master & Traffic Asst',
          questions: '5 Battery Tests (Intelligence, Spatial, Memory, Selective, Speed)',
          marks: 'Converted to 30% Merit Weightage',
          duration: '60 Minutes',
          details: 'Must score minimum 42 T-score in each battery test. Decides train traffic safety reflexes.'
        }
      ]
    },
    'RRB-ALP': {
      fullName: 'Assistant Loco Pilot & Technician (Train Operator / Engine Driver)',
      conductingBody: 'Railway Recruitment Boards (RRBs)',
      frequency: 'Annual Centralized Employment Notification',
      mode: 'CBT 1 -> CBT 2 (Part A & B) -> Computer Based Aptitude Test (CBAT) -> A1 Medical',
      tiers: 'CBT 1 Screening -> CBT 2 Part A (Merit) + Part B (Trade Qualifying) -> CBAT',
      totalMarks: 'CBT 2 Part A: 100 Marks (70% weightage) + CBAT (30% weightage)',
      keySellingPoint: 'Pilot of high-speed passenger expresses & freight trains! Running kilometer allowances add ₹35,000 to ₹45,000 per month over basic salary, taking monthly earnings to ₹70,000+!',
      counsellorTip: 'Requires 10th pass + ITI / Diploma / B.Tech in Mechanical, Electrical, Electronics, or Automobile. Strict A1 medical standard: 6/6 eyesight in each eye without glasses is mandatory!',
      tiersBreakdown: [
        {
          tier: 'CBT 1 Screening',
          title: '75 Questions (Math, Science, Reasoning, GK)',
          questions: '75 Questions',
          marks: '75 Marks (+1 / -0.33)',
          duration: '60 Minutes',
          details: 'General Science (20 Qs), Math (20 Qs), Reasoning (25 Qs), Current Affairs (10 Qs).'
        },
        {
          tier: 'CBT 2 Part A',
          title: 'Basic Science & Engineering + Math + Reasoning',
          questions: '100 Questions (Basic Engg 40 Qs)',
          marks: '100 Marks (+1 / -0.33)',
          duration: '90 Minutes',
          details: 'Engineering drawing, mechanics, units, electricity, occupational safety (decides 70% merit).'
        },
        {
          tier: 'CBT 2 Part B',
          title: 'Relevant Technical Trade Test',
          questions: '75 Questions',
          marks: '75 Marks (Qualifying min 35%)',
          duration: '60 Minutes',
          details: 'Electrician, Fitter, Diesel Mechanic, Electronics, Turner, etc. Qualifying only.'
        },
        {
          tier: 'CBAT & Medical',
          title: 'Aptitude Test + A-1 Medical Clearance',
          questions: 'Memory, Following Directions, Depth Perception',
          marks: '30% Weightage for ALP',
          duration: '60 Minutes',
          details: 'A1 medical examination with zero color blindness and 6/6 distant vision without glasses.'
        }
      ]
    }
  };

  // Cutoffs & Score Targets
  const SSC_BENCHMARKS = [
    { exam: 'SSC CGL Tier 1 Cutoff (Out of 200)', gen: '145 - 150 Marks (Norm)', obc: '140 - 145 Marks', sc: '125 - 130 Marks', st: '115 - 120 Marks', remarks: 'Qualifying screening; ~70-75 net correct Qs out of 100.' },
    { exam: 'SSC CGL Tier 2 Merit for Inspector/ASO (Out of 390)', gen: '315 - 335 Marks', obc: '308 - 325 Marks', sc: '285 - 295 Marks', st: '270 - 280 Marks', remarks: '335+ for MEA/CBI; 320+ for GST/Income Tax Inspector.' },
    { exam: 'SSC CHSL Tier 1 Cutoff (Out of 200)', gen: '153 - 158 Marks', obc: '150 - 155 Marks', sc: '135 - 140 Marks', st: '125 - 130 Marks', remarks: 'Higher competition due to 12th-pass eligibility.' },
    { exam: 'SSC CPO Paper 1 Cutoff (Out of 200)', gen: '138 - 142 Marks (Men)', obc: '132 - 136 Marks', sc: '110 - 115 Marks', st: '105 - 110 Marks', remarks: 'Women cutoff is usually ~145-150 due to fewer seats.' },
    { exam: 'RRB NTPC CBT 1 Cutoff (Out of 100)', gen: '72 - 78 Marks', obc: '68 - 74 Marks', sc: '58 - 64 Marks', st: '52 - 58 Marks', remarks: 'Normalized marks vary slightly across 21 railway boards.' },
    { exam: 'RRB NTPC CBT 2 Merit for Station Master (Out of 120)', gen: '84 - 90 Marks', obc: '80 - 85 Marks', sc: '72 - 76 Marks', st: '68 - 72 Marks', remarks: 'CBT 2 (70%) + CBAT Aptitude (30%) decide final appointment.' }
  ];

  // Filtered ministries and posts
  const filteredPosts = useMemo(() => {
    let list = colleges.filter((c) => c.category_id === 'cat-ssc-railways');

    if (postFilter === 'INSPECTORS') {
      list = list.filter((c) => c.code.includes('CBIC') || c.code.includes('CBDT'));
    } else if (postFilter === 'ASO') {
      list = list.filter((c) => c.code.includes('MEA') || c.code.includes('CSS'));
    } else if (postFilter === 'RAILWAYS') {
      list = list.filter((c) => c.code.includes('RAILWAY'));
    } else if (postFilter === 'INVESTIGATION') {
      list = list.filter((c) => c.code.includes('CBI') || c.code.includes('ED'));
    }

    if (postSearch.trim()) {
      const q = postSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.programs.some((p) => p.program_name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [colleges, postFilter, postSearch]);

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
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🚆
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                SSC & Railways Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: CGL (Inspectors/ASO) • CHSL • CPO • RRB NTPC (Station Master) • ALP • Score Targets • Call Scripts
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

      {/* Cross-Over Strategy Ribbon (SSC + Banking Synergy) */}
      <div style={{
        background: 'linear-gradient(90deg, #1E1B4B 0%, #312E81 100%)',
        border: '1px solid #4338CA',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '20px',
        color: '#E0E7FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🔥</span>
          <div style={{ fontSize: '13px' }}>
            <strong style={{ color: '#FCD34D' }}>SSC + Banking Cross-Over Formula:</strong> 70% of Maths, Reasoning, and English are 100% identical! An aspirant preparing with PW can appear for SSC CGL, CHSL, SBI PO, and IBPS PO in the same year with 8+ selection chances.
          </div>
        </div>
        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            background: '#4F46E5',
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
          { id: 'exams', label: '1. Exam Patterns & Tiers', icon: BookOpen, badge: '5 Exams' },
          { id: 'ministries', label: '2. Ministries & Top Posts', icon: Building2, badge: 'Inspectors & ASO' },
          { id: 'cutoffs', label: '3. Cutoffs & Score Targets', icon: TrendingUp, badge: 'Tier 1 & 2' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: 'Central Job Hook' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: '18-30 Yrs' },
          { id: 'courses', label: '6. PW SSC & Rly Batches', icon: Sparkles, badge: 'Brahma / Parakram' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SscTab)}
              style={{
                background: isActive ? '#3B82F6' : 'transparent',
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

      {/* TAB 1: EXAM PATTERNS & TIERS */}
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
              Select Exam:
            </span>
            {[
              { code: 'SSC-CGL', label: 'SSC CGL (Inspectors/ASO)', icon: '🏛️' },
              { code: 'SSC-CHSL', label: 'SSC CHSL (10+2 LDC/DEO)', icon: '📄' },
              { code: 'SSC-CPO', label: 'SSC CPO (Delhi Police SI)', icon: '⭐' },
              { code: 'RRB-NTPC', label: 'RRB NTPC (Station Master)', icon: '🚉' },
              { code: 'RRB-ALP', label: 'RRB ALP (Train Operator)', icon: '🚆' }
            ].map((item) => {
              const isSelected = selectedExamCode === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedExamCode(item.code as SscExamCode)}
                  style={{
                    background: isSelected ? '#1E293B' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#1E293B',
                    border: isSelected ? '2px solid #1E293B' : '1px solid #CBD5E1',
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
                  background: '#EFF6FF',
                  color: '#1D4ED8',
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
                  Agency: <strong>{currentExam.conductingBody}</strong> • Frequency: <strong>{currentExam.frequency}</strong>
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
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>📝 Tiers & Stages</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.tiers}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🎯 Total Marks</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>{currentExam.totalMarks}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Core Appeal</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Tier Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
              📋 Detailed Tier Structure
            </h3>
            {currentExam.tiersBreakdown.map((t, idx) => (
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
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      {t.tier}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {t.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: '#2563EB' }}>{t.questions}</span>
                    <span style={{ color: '#16A34A' }}>{t.marks}</span>
                    <span style={{ color: '#64748B' }}>{t.duration}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                  {t.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MINISTRIES & TOP POSTS DIRECTORY */}
      {activeTab === 'ministries' && (
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
                placeholder="Search ministry or post (e.g. MEA, Income Tax, GST, CBI, Station Master)..."
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
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
                { id: 'ALL', label: 'All Posts' },
                { id: 'INSPECTORS', label: 'Inspectors (GST / ITI)' },
                { id: 'ASO', label: 'ASO (MEA / CSS Secretariats)' },
                { id: 'INVESTIGATION', label: 'CBI & ED Officers' },
                { id: 'RAILWAYS', label: 'Railways (Station Master/ALP)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPostFilter(f.id as any)}
                  style={{
                    background: postFilter === f.id ? '#1E293B' : '#F1F5F9',
                    color: postFilter === f.id ? '#FFFFFF' : '#475569',
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
            Showing {filteredPosts.length} Premier Central Ministries & Railway Cadres
          </div>

          {/* Posts Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
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
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      {post.code}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {post.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{post.location}</span>
                </div>

                <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: '#64748B' }}>
                  {post.accreditation}
                </p>

                {/* Sub-Programs / Posts Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                  {post.programs.map((prg) => (
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
                            <strong style={{ color: '#16A34A', fontSize: '13px' }}>₹{prg.avg_package_lpa} LPA</strong>
                          </div>
                          <div>
                            <span style={{ color: '#64748B', display: 'block', fontSize: '10.5px' }}>VACANCIES</span>
                            <strong style={{ color: '#2563EB', fontSize: '13px' }}>{prg.seats.toLocaleString('en-IN')} Posts</strong>
                          </div>
                        </div>

                        <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                          <strong>Selection:</strong> {prg.selection_process}
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
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              🎯 SSC & Railways Cutoff Benchmarks
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              Category-wise cutoffs for Tier 1 screening and Tier 2 final merit lists.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Exam & Stage</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#1E40AF' }}>General (UR)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>OBC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>SC</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>ST</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#166534' }}>Counsellor Strategy Note</th>
                  </tr>
                </thead>
                <tbody>
                  {SSC_BENCHMARKS.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>{row.exam}</td>
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
              Pitching SSC & Railways to an Aspirant
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The Central Government Power Hook:</strong>
                "Hello [Student Name]! SSC CGL offers the most powerful Group-B posts in India—like Income Tax Inspector, Central GST Inspector (with 3-star uniform), and ASO in Ministry of External Affairs with foreign embassy postings and diplomatic passport. Starting gross salary is ₹75,000 to ₹90,000/month with 100% job security!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The Multi-Exam Multiplier (SSC + Railways + Banking):</strong>
                "Preparing for SSC Maths, Reasoning, and English automatically prepares you for RRB NTPC, SSC CHSL, and Banking exams! A single course from PW opens the door to 15,000+ CGL posts, 20,000+ Railway posts, and Bank PO vacancies in the same academic year."
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The PW SSC Brahma / Suraksha Batch Advantage:</strong>
                "PW provides shortcut trick-based Quant modules, Daily Speed Tests, typing software simulations for DEST, and PYQ analysis from 2018-2024 at an unbeatable affordable fee."
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
                  ❓ "Sir, my Advanced Maths (Trigo/Geometry) is very weak."
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "In the new SSC pattern, Arithmetic still forms 65% of the paper! Plus, in PW batches, our faculties teach visualization tricks and value-putting methods so that even non-math students solve Geometry and Trigonometry questions in under 40 seconds."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "I don't know computer typing. Will I get rejected?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "The typing test (DEST) happens in Tier 2, giving you 5 to 6 months to practice. You only need 27 words per minute, which can be easily achieved in just 30 days by practicing 20 minutes daily on keyboard."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "My English is weak, can I still get a government job?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! In RRB NTPC and RRB ALP, there is ZERO English! The entire paper is only Maths, Reasoning, and General Awareness. And for SSC, our English foundation classes build grammar rules from basic school level."
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
            Verify eligibility across SSC CGL, CHSL, CPO, and Railways.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>SSC CGL Qualification</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>Bachelor's in ANY Stream</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>No minimum percentage required. Final year appearing eligible!</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>SSC CHSL Qualification</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>12th Standard Pass</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Arts, Commerce, or Science stream from any recognized board.</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Age Limit</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#D97706' }}>18 to 30 / 32 Years</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>+3 yrs relaxation for OBC, +5 yrs for SC/ST.</div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#1E40AF', lineHeight: 1.5 }}>
            <strong>✅ Key Rules for SSC & Railways Counselling:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>Attempt Limits:</strong> There is NO LIMIT on the number of attempts for SSC or Railways as long as the candidate is within the age limit.</li>
              <li><strong>Physical Standards:</strong> GST Inspector, Customs Examiner, and Delhi Police SI require basic height measurement (157.5 cm for GST, 170 cm for SI). Desk posts like ASO in MEA/CSS have NO physical requirement!</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW SSC & RAILWAYS BATCHES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW SSC & Railways Batch Offerings
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              Complete Tier 1 + Tier 2 Live Classes, Speed Tests, and Typing Modules.
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
                      background: '#EFF6FF',
                      color: '#1D4ED8',
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
                      background: '#1D4ED8',
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
