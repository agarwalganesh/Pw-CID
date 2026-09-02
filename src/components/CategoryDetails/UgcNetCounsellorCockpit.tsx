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
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  BookOpen,
  Sparkles,
  Layers,
  Users,
  Target,
  FileText,
  Building2,
  Bookmark
} from 'lucide-react';

interface UgcNetCounsellorCockpitProps {
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

type UgcTab = 'exams' | 'colleges' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type UgcExamCode = 'UGC-NET' | 'STATE-SET' | 'PSC-ASST-PROF' | 'CUET-PHD';

export const UgcNetCounsellorCockpit: React.FC<UgcNetCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<UgcTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<UgcExamCode>('UGC-NET');
  const [uniSearch, setUniSearch] = useState('');
  const [uniFilter, setUniFilter] = useState<'ALL' | 'CENTRAL' | 'STATE_PSC' | 'FELLOWSHIP'>('ALL');

  // Metadata for UGC-NET and related examinations
  const EXAM_DATA: Record<UgcExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    duration: string;
    totalQs: number;
    totalMarks: number;
    marking: string;
    keySellingPoint: string;
    counsellorTip: string;
    papers: Array<{
      paper: string;
      title: string;
      questions: number;
      marks: number;
      duration: string;
      details: string;
    }>;
  }> = {
    'UGC-NET': {
      fullName: 'UGC National Eligibility Test (JRF, Assistant Professor & Ph.D.)',
      conductingBody: 'National Testing Agency (NTA)',
      frequency: 'Twice a Year (June & December Cycles)',
      mode: 'Computer Based Test (CBT) • Single Session, No Break',
      duration: '180 Minutes (3 Hours) • Free Navigation Between Paper 1 & 2',
      totalQs: 150,
      totalMarks: 300,
      marking: '+2 for Correct, ZERO Negative Marking! 0 for Unattempted',
      keySellingPoint: 'Triple Outcome in 1 Test: ₹37,000/mo JRF Fellowship + Lifetime Assistant Professor Eligibility + Direct Ph.D. Admission.',
      counsellorTip: 'Remind the student: There is ZERO negative marking! Paper 1 has 10 predictable units—scoring 70+/100 in Paper 1 virtually guarantees JRF when combined with decent subject score.',
      papers: [
        {
          paper: 'Paper 1 (Common to All 83 Subjects)',
          title: 'General Paper on Teaching & Research Aptitude',
          questions: 50,
          marks: 100,
          duration: '60 Mins (Recommended)',
          details: '10 Units × 5 Qs (10 Marks each): 1. Teaching Aptitude, 2. Research Aptitude, 3. Reading Comprehension, 4. Communication, 5. Mathematical Reasoning, 6. Logical Reasoning (Indian Logic & Pramanas), 7. Data Interpretation, 8. ICT, 9. People, Dev & Environment, 10. Higher Education System.'
        },
        {
          paper: 'Paper 2 (Domain Subject Specialization)',
          title: 'Post-Graduate Discipline (Commerce, Mgmt, Pol Sci, English, History, etc.)',
          questions: 100,
          marks: 200,
          duration: '120 Mins (Recommended)',
          details: '10 Subject-Specific Units based strictly on UGC Model PG Syllabus. Combination of Core Conceptual MCQs, Match the Following, Chronological Sequencing, and Assertion-Reasoning.'
        }
      ]
    },
    'STATE-SET': {
      fullName: 'State Eligibility Test (MH-SET, WB-SET, K-SET, AP-SET, HP-SET, etc.)',
      conductingBody: 'State Nodal Universities / Commissions (e.g. Pune Univ, WBCSC)',
      frequency: 'Once a Year (Varies by State)',
      mode: 'Offline OMR / CBT depending on state',
      duration: '180 Minutes (Paper 1: 1 Hr + Paper 2: 2 Hrs)',
      totalQs: 150,
      totalMarks: 300,
      marking: '+2 for Correct, ZERO Negative Marking',
      keySellingPoint: '100% Identical Syllabus to UGC-NET! Clearing SET grants permanent Assistant Professor eligibility in all colleges of that state.',
      counsellorTip: 'Tell student: Preparing for UGC-NET automatically prepares you for your home state SET with zero extra syllabus. You get 2 to 3 shots at Assistant Professor eligibility every year!',
      papers: [
        {
          paper: 'Paper 1',
          title: 'General Teaching & Research Aptitude',
          questions: 50,
          marks: 100,
          duration: '60 Mins',
          details: 'Identical 10 units to UGC-NET Paper 1. Occasional 2-3 questions specific to state higher education institutes.'
        },
        {
          paper: 'Paper 2',
          title: 'Domain Subject Paper',
          questions: 100,
          marks: 200,
          duration: '120 Mins',
          details: '100 Objective MCQs based on UGC-NET PG subject syllabus. Cutoff is based on top 6% appearing candidates in the state.'
        }
      ]
    },
    'PSC-ASST-PROF': {
      fullName: 'State PSC Assistant Professor Direct Recruitment (UPPSC, RPSC, MPPSC, BPSC)',
      conductingBody: 'State Public Service Commissions (Higher Education Dept)',
      frequency: 'Periodic State Advertisements (1000 - 3000 Posts)',
      mode: 'Written Objective Exam + Interview',
      duration: '180 Minutes Written Exam',
      totalQs: 100,
      totalMarks: 200,
      marking: 'Negative marking applicable as per State PSC rules (-0.33)',
      keySellingPoint: 'Permanent Gazetted Class-1 Officer Job! Pay Level 10 (Basic ₹57,700, Gross Salary ₹88,000 - ₹1,10,000/month) with pension & govt housing.',
      counsellorTip: 'UGC-NET or State SET qualification is MANDATORY to even apply for these govt college lecturer jobs. Clearing NET makes student eligible for life!',
      papers: [
        {
          paper: 'General Studies Paper',
          title: 'State GK & Current Affairs / General Studies',
          questions: 30,
          marks: 60,
          duration: 'Combined',
          details: 'State History, Geography, Economy, Higher Education Policies, and General Science.'
        },
        {
          paper: 'Subject Paper',
          title: 'Domain Subject Core Specialization',
          questions: 70,
          marks: 140,
          duration: 'Combined',
          details: 'In-depth postgraduate level questions. High overlap (90%+) with UGC-NET Paper 2 syllabus.'
        }
      ]
    },
    'CUET-PHD': {
      fullName: 'Central Universities Ph.D. Entrance Examination (JNU, DU, BHU, BBAU)',
      conductingBody: 'National Testing Agency (NTA)',
      frequency: 'Annual (October-November Window)',
      mode: 'Computer Based Test (CBT)',
      duration: '180 Minutes',
      totalQs: 100,
      totalMarks: 400,
      marking: '+4 for Correct, -1 for Incorrect',
      keySellingPoint: 'Single window entrance for Ph.D. in 4 apex Central Universities. Note: UGC-NET JRF qualified candidates are EXEMPT from this entrance test!',
      counsellorTip: 'Highlight the power of JRF: Students with JRF bypass the written entrance entirely and go directly to the interview table with guaranteed fellowship!',
      papers: [
        {
          paper: 'Section 1',
          title: 'Research Methodology',
          questions: 50,
          marks: 200,
          duration: 'Combined',
          details: 'Research ethics, sampling methods, data analysis, hypothesis testing (mirrors UGC-NET Paper 1 Unit 2).'
        },
        {
          paper: 'Section 2',
          title: 'Subject Domain Knowledge',
          questions: 50,
          marks: 200,
          duration: 'Combined',
          details: 'Advanced PG subject knowledge matching UGC-NET Paper 2 syllabus.'
        }
      ]
    }
  };

  // 3-Tier Cutoffs & Subject Benchmarks
  const SUBJECT_CUTOFFS = [
    { subject: 'Commerce (Code 08)', jrfGen: '198 / 300 (66.0%)', apGen: '164 / 300 (54.6%)', phdGen: '150 / 300 (50.0%)', jrfObc: '182 / 300', jrfSc: '168 / 300' },
    { subject: 'Management (Code 17)', jrfGen: '204 / 300 (68.0%)', apGen: '172 / 300 (57.3%)', phdGen: '154 / 300 (51.3%)', jrfObc: '188 / 300', jrfSc: '172 / 300' },
    { subject: 'Political Science (Code 02)', jrfGen: '216 / 300 (72.0%)', apGen: '184 / 300 (61.3%)', phdGen: '162 / 300 (54.0%)', jrfObc: '200 / 300', jrfSc: '182 / 300' },
    { subject: 'English (Code 30)', jrfGen: '202 / 300 (67.3%)', apGen: '170 / 300 (56.6%)', phdGen: '152 / 300 (50.6%)', jrfObc: '184 / 300', jrfSc: '166 / 300' },
    { subject: 'Economics (Code 01)', jrfGen: '212 / 300 (70.6%)', apGen: '178 / 300 (59.3%)', phdGen: '158 / 300 (52.6%)', jrfObc: '194 / 300', jrfSc: '174 / 300' },
    { subject: 'History (Code 06)', jrfGen: '208 / 300 (69.3%)', apGen: '176 / 300 (58.6%)', phdGen: '156 / 300 (52.0%)', jrfObc: '192 / 300', jrfSc: '176 / 300' },
    { subject: 'Hindi (Code 20)', jrfGen: '214 / 300 (71.3%)', apGen: '180 / 300 (60.0%)', phdGen: '160 / 300 (53.3%)', jrfObc: '198 / 300', jrfSc: '180 / 300' },
    { subject: 'Sociology (Code 05)', jrfGen: '210 / 300 (70.0%)', apGen: '178 / 300 (59.3%)', phdGen: '158 / 300 (52.6%)', jrfObc: '194 / 300', jrfSc: '176 / 300' },
    { subject: 'Education (Code 09)', jrfGen: '206 / 300 (68.6%)', apGen: '174 / 300 (58.0%)', phdGen: '154 / 300 (51.3%)', jrfObc: '190 / 300', jrfSc: '172 / 300' },
    { subject: 'Computer Science & Apps (Code 87)', jrfGen: '192 / 300 (64.0%)', apGen: '158 / 300 (52.6%)', phdGen: '144 / 300 (48.0%)', jrfObc: '174 / 300', jrfSc: '156 / 300' }
  ];

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    let list = colleges.filter((c) => c.category_id === 'cat-ugc-net');

    if (uniFilter === 'CENTRAL') {
      list = list.filter((c) => c.institution_type.toLowerCase().includes('central'));
    } else if (uniFilter === 'STATE_PSC') {
      list = list.filter((c) => c.institution_type.toLowerCase().includes('commission') || c.code.includes('PSC'));
    } else if (uniFilter === 'FELLOWSHIP') {
      list = list.filter((c) => c.programs.some((p) => p.program_name.toLowerCase().includes('fellowship') || p.program_name.toLowerCase().includes('jrf')));
    }

    if (uniSearch.trim()) {
      const q = uniSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [colleges, uniFilter, uniSearch]);

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
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              📚
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                UGC-NET Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: 3-Tier Outcome (JRF / Asst Prof / Ph.D.) • Top Universities (JNU, DU, BHU) • Paper 1 & 2 • Live Pitch
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
              background: '#8B5CF6',
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
            Check Eligibility Profile
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
          { id: 'exams', label: '1. Exam Pattern & Papers', icon: BookOpen, badge: 'Paper 1 & 2' },
          { id: 'colleges', label: '2. Top Universities & Commissions', icon: Building2, badge: `${filteredUniversities.length || 9} Institutes` },
          { id: 'cutoffs', label: '3. 3-Tier Cutoff Directory', icon: TrendingUp, badge: 'JRF / AP / PhD' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: '₹37k JRF Pitch' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: '55% Rule' },
          { id: 'courses', label: '6. PW UGC-NET Batches', icon: Sparkles, badge: 'Enrollment' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as UgcTab)}
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

      {/* TAB 1: EXAM PATTERN & PAPERS BREAKDOWN */}
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
              Select Exam Track:
            </span>
            {[
              { code: 'UGC-NET', label: 'UGC-NET (National JRF/AP)', icon: '🏛️' },
              { code: 'STATE-SET', label: 'State SET (MH/WB/K-SET)', icon: '📍' },
              { code: 'PSC-ASST-PROF', label: 'State PSC Asst Professor (Govt Job)', icon: '💼' },
              { code: 'CUET-PHD', label: 'CUET Ph.D. Entrance (JNU/DU/BHU)', icon: '🎓' }
            ].map((item) => {
              const isSelected = selectedExamCode === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedExamCode(item.code as UgcExamCode)}
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

          {/* Exam Summary Card */}
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
                  color: '#7C3AED',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}>
                  {selectedExamCode} SPECIFICATION SHEET
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                  {currentExam.fullName}
                </h2>
                <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>
                  Conducting Body: <strong>{currentExam.conductingBody}</strong> • Timeline: <strong>{currentExam.frequency}</strong>
                </p>
              </div>

              <div style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#92400E',
                maxWidth: '440px',
                lineHeight: 1.45
              }}>
                <strong>💡 Counsellor Call Tip:</strong> {currentExam.counsellorTip}
              </div>
            </div>

            {/* Metric Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginTop: '16px'
            }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⏱️ Duration & Mode</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.duration}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>📝 Questions & Marks</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{currentExam.totalQs} Questions • {currentExam.totalMarks} Marks</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>⚖️ Marking Scheme</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', marginTop: '4px' }}>{currentExam.marking}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Main Opportunity</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#7C3AED', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Paper Breakdown Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
              📋 Detailed Paper Structure (Paper 1 & Paper 2)
            </h3>
            {currentExam.papers.map((p, idx) => (
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
                      background: idx === 0 ? '#EFF6FF' : '#F3E8FF',
                      color: idx === 0 ? '#1D4ED8' : '#6D28D9',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      {p.paper}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {p.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: '#2563EB' }}>{p.questions} Questions</span>
                    <span style={{ color: '#16A34A' }}>{p.marks} Marks</span>
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

      {/* TAB 2: TOP UNIVERSITIES & COMMISSIONS DIRECTORY */}
      {activeTab === 'colleges' && (
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
                placeholder="Search university or commission (e.g. JNU, Delhi University, UPPSC, BHU)..."
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
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
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Category:</span>
              {[
                { id: 'ALL', label: 'All' },
                { id: 'CENTRAL', label: 'Central Universities (JNU/DU/BHU)' },
                { id: 'STATE_PSC', label: 'State PSC Assistant Professor' },
                { id: 'FELLOWSHIP', label: 'JRF Fellowship Research' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setUniFilter(f.id as any)}
                  style={{
                    background: uniFilter === f.id ? '#7C3AED' : '#F1F5F9',
                    color: uniFilter === f.id ? '#FFFFFF' : '#475569',
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
            Showing {filteredUniversities.length} Premier Universities & State Recruitment Commissions
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
            {filteredUniversities.map((uni) => {
              const prg = uni.programs[0];
              const isPsc = uni.code.includes('PSC') || uni.institution_type.toLowerCase().includes('commission');

              return (
                <div
                  key={uni.id}
                  style={{
                    background: '#FFFFFF',
                    border: isPsc ? '2px solid #3B82F6' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{
                        background: isPsc ? '#EFF6FF' : '#F3E8FF',
                        color: isPsc ? '#1D4ED8' : '#7C3AED',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {isPsc ? '🏛️ DIRECT GOVT RECRUITMENT' : '🎓 CENTRAL UNIVERSITY'}
                      </span>
                      <span style={{ fontSize: '11.5px', color: '#64748B' }}>{uni.location}</span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '6px 0 4px' }}>
                      {uni.name}
                    </h3>
                    <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#64748B' }}>
                      {uni.accreditation}
                    </p>

                    {/* Stats Strip */}
                    <div style={{
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      marginBottom: '12px',
                      border: '1px solid #F1F5F9'
                    }}>
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>FELLOWSHIP / SALARY</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#16A34A' }}>
                          {isPsc ? '₹90,000+/mo' : '₹37,000/mo JRF'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>VACANCIES / SEATS</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>
                          {prg?.seats || 350}+ Positions
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5, marginBottom: '6px' }}>
                      <strong>Program / Post:</strong> {prg?.program_name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                      <strong>Selection Route:</strong> {prg?.selection_process}
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '11.5px', color: '#7C3AED', textDecoration: 'none', fontWeight: 700 }}
                    >
                      Official Portal ↗
                    </a>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Verified NTA / UGC</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 3-TIER CUTOFF DIRECTORY */}
      {activeTab === 'cutoffs' && (
        <div>
          {/* New 3-Tier System Explanation */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '20px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              🎯 UGC New 3-Tier Qualification System
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              UGC now declares results in 3 distinct outcome categories for all 83 subjects:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>CATEGORY 1 (TOP 0.5% - 1%)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>JRF + Assistant Professor + Ph.D.</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  Award of ₹37,000/mo JRF stipend + lifetime eligibility for university Assistant Professor + direct Ph.D. interview exemption.
                </div>
              </div>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1E40AF' }}>CATEGORY 2 (TOP 6%)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>Assistant Professor + Ph.D.</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  Lifetime eligibility to apply as Assistant Professor in all Central, State & Private colleges + exemption from Ph.D. entrance tests.
                </div>
              </div>

              <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B21A8' }}>CATEGORY 3 (QUALIFYING PH.D.)</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>Admission to Ph.D. Only</div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                  Marks utilized for university Ph.D. admissions (70% weightage given to NET score in Ph.D. admission merit).
                </div>
              </div>
            </div>

            {/* Subject-Wise Cutoff Benchmark Table */}
            <h4 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
              📊 Subject-Wise Cutoff Benchmarks (Out of 300 Marks)
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Subject & Code</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#166534' }}>Category 1 (JRF Gen)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#1E40AF' }}>Category 2 (Asst Prof Gen)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#6B21A8' }}>Category 3 (Ph.D. Gen)</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>JRF OBC-NCL</th>
                    <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>JRF SC</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBJECT_CUTOFFS.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>{row.subject}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#166534', background: '#F0FDF4' }}>{row.jrfGen}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#1E40AF', background: '#EFF6FF' }}>{row.apGen}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#6B21A8' }}>{row.phdGen}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.jrfObc}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{row.jrfSc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT & OBJECTIONS */}
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
              What to Say to a Student Inquiring for UGC-NET
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #8B5CF6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The Big Financial & Career Hook:</strong>
                "Hello [Student Name]! If you are planning for UGC-NET, you are aiming for one of the most prestigious academic credentials in India. Clearing JRF awards you a direct government stipend of ₹37,000/month (over ₹25 Lakhs across your research), while qualifying you for permanent Assistant Professor posts starting at ₹85,000 to ₹1,10,000/month!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The Zero-Negative-Marking Super Advantage:</strong>
                "Unlike UPSC or SSC, UGC-NET has NO NEGATIVE MARKING! In Paper 1, all 10 units (Teaching, Research, Indian Logic, ICT, Higher Ed) are completely structured. If you score 70+ marks out of 100 in Paper 1, clearing JRF or Assistant Professor in your subject becomes 10 times easier!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The PW UGC-NET Batch Value Proposition:</strong>
                "PW offers targeted live preparation with top national faculties covering all 10 units of Paper 1 and specialized Paper 2 subjects. You get PYQ analysis from 2018-2024, CBT simulated mock test series, and complete summary notes at an unbeatable affordable fee."
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
              Instant Answers to Common Aspirant Doubts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.55 }}>
              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Sir, I only have 55% in Master's. Am I eligible?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! 55% is the exact minimum criteria for General candidates, and if you belong to OBC-NCL, SC, ST, or PwD, you only need 50% in your Master's degree!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "My age is above 30, can I still appear?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "For Assistant Professor, there is NO UPPER AGE LIMIT AT ALL! A 24-year-old or a 45-year-old can equally qualify and become a permanent professor. For JRF, the age limit is 30 years, with a 5-year relaxation up to 35 years for all Women candidates, OBC, SC, and ST."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "I am currently in Master's 1st/2nd year, can I write NET?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! You can appear under the 'Awaiting Result / Appearing' category. NTA gives you 2 full years from the date of NET result to complete your Master's degree with 55%."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Can I write NET with a 4-year Bachelor's degree (FYUP)?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! Under the new UGC guidelines, candidates pursuing or completed 4-year undergraduate degrees with at least 75% marks can directly appear for UGC-NET and are eligible for JRF and Ph.D. without a Master's degree!"
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10-SEC ELIGIBILITY CHECKER */}
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
            ⏱️ 10-Second Student Qualification Check
          </h3>
          <p style={{ margin: '0 0 20px', color: '#64748B', fontSize: '13px' }}>
            Check if the candidate qualifies to appear for UGC-NET (June / Dec cycle).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Master's Degree Marks</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>55% (Gen) • 50% (OBC/SC/ST)</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>In humanities, commerce, social science, computer science, etc.</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Age Limit</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>NO Limit for Asst Prof!</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>For JRF: 30 yrs (General Men) / 35 yrs (Women/OBC/SC/ST)</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>4-Year Bachelor Degree?</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#7C3AED' }}>Eligible with 75% Marks</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>New UGC rule allows direct Ph.D. with JRF</div>
            </div>
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#581C87', lineHeight: 1.5 }}>
            <strong>✅ Three Golden Rules for UGC-NET Counselling:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>Final Year Master's students:</strong> Completely eligible to appear and clear. They have 2 years to submit their degree.</li>
              <li><strong>All Women Candidates:</strong> Enjoy 5-year age relaxation for JRF (eligible up to age 35, regardless of marital status).</li>
              <li><strong>Attempt Limits:</strong> There is NO LIMIT on the number of attempts for either JRF (within age) or Assistant Professor.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW UGC-NET BATCHES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW UGC-NET Batch Offerings (June & Dec Cycles)
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              Dedicated Paper 1 Mastery + Specialized Subject Batches.
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
                      color: '#7C3AED',
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
                      Key Highlights:
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
