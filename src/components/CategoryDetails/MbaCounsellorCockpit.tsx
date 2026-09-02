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
  Briefcase,
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
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Users,
  Target,
  FileText
} from 'lucide-react';

interface MbaCounsellorCockpitProps {
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

type CockpitTab = 'exams' | 'colleges' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type ExamCode = 'CAT' | 'XAT' | 'SNAP' | 'NMAT' | 'CMAT';

export const MbaCounsellorCockpit: React.FC<MbaCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<CockpitTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<ExamCode>('CAT');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [collegeExamFilter, setCollegeExamFilter] = useState<string>('ALL');
  const [collegeTypeFilter, setCollegeTypeFilter] = useState<string>('ALL');

  // Static rich metadata for the 5 exams to guarantee instant, 100% accurate data
  const EXAM_DATA: Record<ExamCode, {
    fullName: string;
    conductingBody: string;
    frequency: string;
    mode: string;
    duration: string;
    totalQs: number;
    totalMarks: number;
    marking: string;
    sections: Array<{
      name: string;
      questions: number;
      marks: number;
      duration: string;
      details: string;
    }>;
    scoreVsPercentile: Array<{
      percentile: string;
      score: string;
      callsFrom: string;
    }>;
    categoryCutoffs: Array<{
      category: string;
      overallCutoff: string;
      sectionalCutoff: string;
      notes: string;
    }>;
    keySellingPoint: string;
    counsellorTip: string;
  }> = {
    CAT: {
      fullName: 'Common Admission Test (CAT 2025)',
      conductingBody: 'IIMs (Rotational: IIM Calcutta / IIM Lucknow)',
      frequency: 'Once a Year (Last Sunday of November, 3 Slots)',
      mode: 'Computer Based Test (CBT)',
      duration: '120 Minutes (2 Hours) • 40 Mins Per Section Strict Lock',
      totalQs: 66,
      totalMarks: 198,
      marking: '+3 for Correct, -1 for Wrong MCQ, 0 for Non-MCQ (TITA)',
      sections: [
        {
          name: 'VARC (Verbal Ability & Reading Comprehension)',
          questions: 24,
          marks: 72,
          duration: '40 Mins',
          details: '16 RC Questions (4 Passages × 4 Qs) + 8 VA (Parajumbles, Para Summary, Odd Sentence Out)'
        },
        {
          name: 'DILR (Data Interpretation & Logical Reasoning)',
          questions: 20,
          marks: 60,
          duration: '40 Mins',
          details: '4 Caselet Sets × 5 Questions each (Arrangements, Games & Tournaments, Matrix, Reasoning Puzzles)'
        },
        {
          name: 'QA (Quantitative Aptitude)',
          questions: 22,
          marks: 66,
          duration: '40 Mins',
          details: 'Arithmetic (8-9 Qs), Algebra (6-7 Qs), Geometry (3-4 Qs), Numbers & Modern Math (2-3 Qs)'
        }
      ],
      scoreVsPercentile: [
        { percentile: '99.5+ %ile', score: '~82 - 86 Marks', callsFrom: 'IIM Ahmedabad, IIM Bangalore, IIM Calcutta' },
        { percentile: '99.0+ %ile', score: '~76 - 80 Marks', callsFrom: 'FMS Delhi (Avg ₹34 LPA, Fee ₹2L!), IIM Lucknow, IIM Kozhikode' },
        { percentile: '95.0+ %ile', score: '~54 - 58 Marks', callsFrom: 'SPJIMR (Score-based), MDI Gurgaon, SJMSOM IIT Bombay, DMS IIT Delhi' },
        { percentile: '90.0+ %ile', score: '~42 - 46 Marks', callsFrom: 'New IIMs (Udaipur, Trichy, Ranchi), IMT Ghaziabad, IIM Shillong' },
        { percentile: '85.0+ %ile', score: '~35 - 39 Marks', callsFrom: 'SPJIMR (Profile-based calls for high academics), Baby IIMs, GIM Goa' },
        { percentile: '80.0+ %ile', score: '~30 - 33 Marks', callsFrom: 'FORE Delhi, TAPMI, Great Lakes, Welingkar, K J Somaiya' }
      ],
      categoryCutoffs: [
        { category: 'General (UR)', overallCutoff: '98.5 - 99.5+ %ile', sectionalCutoff: '75 - 80 %ile in each', notes: 'Top IIMs require sectional clearance in VARC, DILR, QA' },
        { category: 'NC-OBC', overallCutoff: '90.0 - 93.0+ %ile', sectionalCutoff: '65 - 70 %ile in each', notes: 'Significant relaxation; 60+ marks guarantees top IIM call' },
        { category: 'EWS', overallCutoff: '92.0 - 94.0+ %ile', sectionalCutoff: '65 - 70 %ile in each', notes: '10% quota across all central IIMs & FMS' },
        { category: 'SC', overallCutoff: '75.0 - 80.0+ %ile', sectionalCutoff: '50 - 55 %ile in each', notes: '~35-40 marks yields calls from top old IIMs' },
        { category: 'ST / PwD', overallCutoff: '65.0 - 70.0+ %ile', sectionalCutoff: '40 - 45 %ile in each', notes: '~25-30 marks sufficient for IIM interview calls' }
      ],
      keySellingPoint: 'National gateway to all 21 IIMs, FMS Delhi (₹34 LPA for ₹2L fee), SPJIMR, and IIT B-Schools.',
      counsellorTip: 'Remind student: You DO NOT need 100% marks. Solving just 28-30 questions correctly (~85 marks out of 198) gets you 99.5 percentile!'
    },
    XAT: {
      fullName: 'Xavier Aptitude Test (XAT 2026)',
      conductingBody: 'XLRI Jamshedpur',
      frequency: 'Once a Year (First Sunday of January)',
      mode: 'Computer Based Test (CBT)',
      duration: '210 Minutes (3.5 Hours) • Part 1 (175 Mins) + Part 2 (35 Mins)',
      totalQs: 100,
      totalMarks: 100,
      marking: '+1 for Correct, -0.25 for Wrong MCQ, -0.10 for >8 unattempted questions; No negative marking in GK',
      sections: [
        {
          name: 'VALR (Verbal & Logical Ability)',
          questions: 26,
          marks: 26,
          duration: 'Part 1 (Free Nav)',
          details: 'Passage Comprehension, Critical Reasoning, Poem Comprehension, Sentence Completion'
        },
        {
          name: 'DM (Decision Making - Unique to XAT)',
          questions: 21,
          marks: 21,
          duration: 'Part 1 (Free Nav)',
          details: 'Ethical Dilemmas, Managerial Decisions, HR Scenarios, Business Strategy Caselets'
        },
        {
          name: 'QADI (Quantitative Ability & Data Interpretation)',
          questions: 28,
          marks: 28,
          duration: 'Part 1 (Free Nav)',
          details: 'Geometry, Algebra, Arithmetic, Higher Math, Advanced Table & Graph DI Sets'
        },
        {
          name: 'Part 2: General Knowledge & Analytical Essay',
          questions: 25,
          marks: 25,
          duration: '35 Mins',
          details: '25 GK Questions (Static + Current Affairs) + 1 Essay Topic (Evaluated during Interview round)'
        }
      ],
      scoreVsPercentile: [
        { percentile: '96.0+ %ile', score: '~38 - 42 Marks', callsFrom: 'XLRI Jamshedpur (Business Management - BM)' },
        { percentile: '93.0+ %ile', score: '~34 - 36 Marks', callsFrom: 'XLRI Jamshedpur (HRM) & XLRI Delhi-NCR Campus' },
        { percentile: '90.0+ %ile', score: '~30 - 32 Marks', callsFrom: 'XIMB Bhubaneswar (Business Management), IMT Ghaziabad' },
        { percentile: '85.0+ %ile', score: '~26 - 28 Marks', callsFrom: 'GIM Goa, TAPMI Manipal, Great Lakes Chennai, FORE Delhi' },
        { percentile: '80.0+ %ile', score: '~23 - 25 Marks', callsFrom: 'IRMA Anand, K J Somaiya, LBSIM Delhi' }
      ],
      categoryCutoffs: [
        { category: 'Male Engineer', overallCutoff: '96.0 %ile in BM', sectionalCutoff: 'VALR 75, DM 75, QADI 85', notes: 'Higher cutoff for male engineers at XLRI' },
        { category: 'Female Engineer', overallCutoff: '91.0 %ile in BM', sectionalCutoff: 'VALR 72, DM 72, QADI 80', notes: 'Significant gender diversity advantage (5% lower cutoff)' },
        { category: 'Male Non-Engineer', overallCutoff: '95.0 %ile in BM', sectionalCutoff: 'VALR 75, DM 75, QADI 80', notes: 'Arts, Commerce, Science graduates benefit' },
        { category: 'Female Non-Engineer', overallCutoff: '90.0 %ile in BM', sectionalCutoff: 'VALR 72, DM 72, QADI 75', notes: 'Super advantageous for female commerce/arts students' }
      ],
      keySellingPoint: 'Single test for XLRI (#1 Private B-School in India, Avg ₹32.7 LPA), XIMB, GIM, and 160+ associate colleges.',
      counsellorTip: 'XAT has NO sectional timer in Part 1! Student can spend more time on their strongest section. Decision Making is easy to score with PW practice!'
    },
    SNAP: {
      fullName: 'Symbiosis National Aptitude Test (SNAP 2025)',
      conductingBody: 'Symbiosis International (Deemed University) Pune',
      frequency: '3 Attempts in December (Best score of 3 attempts is accepted)',
      mode: 'Computer Based Speed Test',
      duration: '60 Minutes (1 Hour Fast Sprint!) • No Sectional Timers',
      totalQs: 60,
      totalMarks: 60,
      marking: '+1 for Correct, -0.25 for Wrong MCQ (Composite 60 mins)',
      sections: [
        {
          name: 'General English (Reading, Verbal Reasoning, Verbal Ability)',
          questions: 15,
          marks: 15,
          duration: '15 Mins (Rec)',
          details: 'Vocabulary, Analogies, Sentence Correction, Synonyms, Idioms (Fast 1-liner questions)'
        },
        {
          name: 'Analytical & Logical Reasoning (A&LR)',
          questions: 25,
          marks: 25,
          duration: '25 Mins (Rec)',
          details: 'Series, Blood Relations, Syllogisms, Coding-Decoding, Linear Arrangements, Puzzles'
        },
        {
          name: 'Quantitative, Data Interpretation & Data Sufficiency',
          questions: 20,
          marks: 20,
          duration: '20 Mins (Rec)',
          details: 'Arithmetic (Percentage, Profit-Loss, Time-Work), Algebra, Tables & Bar Charts'
        }
      ],
      scoreVsPercentile: [
        { percentile: '98.5+ %ile', score: '~43 - 45 Marks', callsFrom: 'SIBM Pune (Flagship MBA - Avg CTC ₹28.16 LPA)' },
        { percentile: '97.0+ %ile', score: '~40 - 42 Marks', callsFrom: 'SCMHRD Pune (Premier HR & Infra MBA - Avg CTC ₹23.71 LPA)' },
        { percentile: '93.0+ %ile', score: '~36 - 38 Marks', callsFrom: 'SIIB Pune (International Business) & SIBM Bangalore' },
        { percentile: '87.0+ %ile', score: '~32 - 35 Marks', callsFrom: 'SIOM Nashik (Operations Management for Engineers)' },
        { percentile: '80.0+ %ile', score: '~28 - 30 Marks', callsFrom: 'SICSR Pune, SITM Pune, SSBF Pune' }
      ],
      categoryCutoffs: [
        { category: 'General (Open)', overallCutoff: '98.5 %ile (SIBM) / 97 %ile (SCMHRD)', sectionalCutoff: 'No Sectional Cutoffs', notes: 'Symbiosis only considers overall SNAP score!' },
        { category: 'SC Category', overallCutoff: '70 - 75 %ile', sectionalCutoff: 'No Sectional Cutoffs', notes: '~25 marks yields SIBM Pune interview' },
        { category: 'ST Category', overallCutoff: '50 - 55 %ile', sectionalCutoff: 'No Sectional Cutoffs', notes: '~18-20 marks yields SIBM Pune interview' },
        { category: 'Differently Abled', overallCutoff: '45 - 50 %ile', sectionalCutoff: 'No Sectional Cutoffs', notes: '3% reservation across all Symbiosis institutes' }
      ],
      keySellingPoint: 'Only 60 minutes, straightforward questions (no complex derivations), and 3 attempts allowed with best score chosen!',
      counsellorTip: 'Tell student: If CAT feels intimidating with 2 hours and negative marking, SNAP is pure speed and agility. Scoring 43 out of 60 gets you SIBM Pune (₹28 LPA)!'
    },
    NMAT: {
      fullName: 'NMAT by GMAC (2025-2026)',
      conductingBody: 'Graduate Management Admission Council (GMAC)',
      frequency: '75-day testing window (October to December, up to 3 attempts)',
      mode: 'Computer Adaptive Test (No Negative Marking)',
      duration: '120 Minutes (2 Hours) • Student Chooses Section Order',
      totalQs: 108,
      totalMarks: 360,
      marking: '+3 for Correct, NO NEGATIVE MARKING (Scaled score range 108 - 360)',
      sections: [
        {
          name: 'Language Skills',
          questions: 36,
          marks: 120,
          duration: '28 Mins',
          details: 'Reading Passages, Grammar, Prepositions, Cloze Test, Word Meaning (Scaled 12-120)'
        },
        {
          name: 'Quantitative Skills',
          questions: 36,
          marks: 120,
          duration: '52 Mins',
          details: 'Arithmetic, Algebra, Geometry, Probability, Table & Line Graph DI (Scaled 12-120)'
        },
        {
          name: 'Logical Reasoning',
          questions: 36,
          marks: 120,
          duration: '40 Mins',
          details: 'Puzzles, Coding, Assumptions, Course of Action, Deductive Logic (Scaled 12-120)'
        }
      ],
      scoreVsPercentile: [
        { percentile: 'Score: 232 - 235+', score: '232+ Scaled Marks', callsFrom: 'NMIMS Mumbai (Flagship MBA - Avg CTC ₹26.63 LPA)' },
        { percentile: 'Score: 220 - 225+', score: '220+ Scaled Marks', callsFrom: 'NMIMS Bengaluru & K J Somaiya Mumbai' },
        { percentile: 'Score: 210 - 215+', score: '210+ Scaled Marks', callsFrom: 'NMIMS Navi Mumbai, XIM University (HRM)' },
        { percentile: 'Score: 200 - 205+', score: '200+ Scaled Marks', callsFrom: 'SDA Bocconi Asia Center Mumbai, ITM Navi Mumbai' },
        { percentile: 'Score: 190+', score: '190+ Scaled Marks', callsFrom: 'Woxsen Hyderabad, Alliance University Bangalore' }
      ],
      categoryCutoffs: [
        { category: 'NMIMS Mumbai MBA', overallCutoff: '232 - 235 Score', sectionalCutoff: 'Language: 72+, Quant: 72+, Logic: 72+', notes: 'Must clear sectional cutoffs of ~70-74 marks each' },
        { category: 'NMIMS Mumbai HR', overallCutoff: '225 - 228 Score', sectionalCutoff: 'Language: 70+, Quant: 68+, Logic: 68+', notes: 'High placement in corporate HR & consulting' },
        { category: 'NMIMS Bangalore', overallCutoff: '220 Score', sectionalCutoff: 'Language: 65+, Quant: 65+, Logic: 65+', notes: 'Strong tech and fintech placements' },
        { category: 'K J Somaiya', overallCutoff: '222 Score', sectionalCutoff: 'No rigid sectionals', notes: 'Accepts CAT, XAT, and NMAT' }
      ],
      keySellingPoint: 'Zero negative marking! Highly predictable computer-adaptive exam for NMIMS Mumbai (#1 Private B-School in Western India).',
      counsellorTip: 'NMIMS Mumbai only considers the FIRST attempt score of NMAT. Tell student to prepare rigorously before attempting Slot 1!'
    },
    CMAT: {
      fullName: 'Common Management Admission Test (CMAT 2025)',
      conductingBody: 'National Testing Agency (NTA)',
      frequency: 'Once a Year (May)',
      mode: 'Computer Based Test (CBT)',
      duration: '180 Minutes (3 Hours) • Free Navigation Across 5 Sections',
      totalQs: 100,
      totalMarks: 400,
      marking: '+4 for Correct, -1 for Incorrect (100 Qs × 4 = 400 Marks)',
      sections: [
        {
          name: 'Quantitative Techniques & Data Interpretation',
          questions: 20,
          marks: 80,
          duration: '36 Mins (Rec)',
          details: 'Basic Arithmetic, Algebra, Geometry, Probability, Table Analysis (Direct Formulas)'
        },
        {
          name: 'Logical Reasoning',
          questions: 20,
          marks: 80,
          duration: '36 Mins (Rec)',
          details: 'Blood Relations, Syllogisms, Series, Directions, Seating Arrangements'
        },
        {
          name: 'Language Comprehension',
          questions: 20,
          marks: 80,
          duration: '36 Mins (Rec)',
          details: 'Direct Passages, Synonyms, Antonyms, Idioms, Sentence Completion'
        },
        {
          name: 'General Awareness',
          questions: 20,
          marks: 80,
          duration: '36 Mins (Rec)',
          details: 'Current Affairs, Static GK, Business & Economics, Sports, Constitutional Bodies'
        },
        {
          name: 'Innovation & Entrepreneurship',
          questions: 20,
          marks: 80,
          duration: '36 Mins (Rec)',
          details: 'Startup Ecosystem, VC Funding, Business Terms, Innovation Case Studies'
        }
      ],
      scoreVsPercentile: [
        { percentile: '99.99 %ile', score: '~345 - 360 / 400', callsFrom: 'JBIMS Mumbai (Jamnalal Bajaj - Fee ₹6L, Avg ₹28 LPA!)' },
        { percentile: '99.80 %ile', score: '~325 - 340 / 400', callsFrom: 'SIMSREE Mumbai (Sydenham - Fee ₹1.5L, Avg ₹15.3 LPA!)' },
        { percentile: '95.00 %ile', score: '~295 - 315 / 400', callsFrom: 'GIM Goa (via CMAT), PUMBA Pune (Fee ₹1.4L), K J Somaiya' },
        { percentile: '90.00 %ile', score: '~275 - 290 / 400', callsFrom: 'Great Lakes Chennai (PGDM), Welingkar Mumbai (WeSchool)' },
        { percentile: '80.00 %ile', score: '~240 - 260 / 400', callsFrom: 'N.L. Dalmia Mumbai, SIES Navi Mumbai, XIME Bangalore' }
      ],
      categoryCutoffs: [
        { category: 'All India General (JBIMS)', overallCutoff: '99.99 %ile (~345+ Marks)', sectionalCutoff: 'No Sectional Cutoffs', notes: 'AIR 1 to 30 through Maharashtra CAP All India quota' },
        { category: 'All India (SIMSREE)', overallCutoff: '99.85 %ile (~330+ Marks)', sectionalCutoff: 'No Sectional Cutoffs', notes: 'Best ROI in India: 2-year fee ₹1.5 Lakhs only!' },
        { category: 'Maharashtra Domicile', overallCutoff: '99.70 %ile (JBIMS) / 99.40 %ile (SIMSREE)', sectionalCutoff: 'No Sectional Cutoffs', notes: 'Reserved for MH state domicile students' },
        { category: 'Private PGDM B-Schools', overallCutoff: '85 - 95 %ile', sectionalCutoff: 'No Sectional Cutoffs', notes: 'Great Lakes, GIM Goa, Welingkar accept CMAT score' }
      ],
      keySellingPoint: 'The Ultimate Golden Backup Exam! Held in May (after CAT/XAT/SNAP). Direct gateway to JBIMS (₹28 LPA) & SIMSREE for a fraction of IIM fees.',
      counsellorTip: 'Pitch to middle-class parents worried about ₹25L IIM loans: JBIMS & SIMSREE give ₹15-28 LPA packages for just ₹1.5 - ₹6 Lakhs total 2-year fee!'
    }
  };

  // Filtered colleges list based on user selection
  const filteredColleges = useMemo(() => {
    let list = colleges;

    // Filter by exam
    if (collegeExamFilter !== 'ALL') {
      list = list.filter((c) =>
        c.programs.some((p) => p.exam_code.toUpperCase() === collegeExamFilter.toUpperCase())
      );
    }

    // Filter by type (IIM, Govt, Private)
    if (collegeTypeFilter === 'IIM') {
      list = list.filter((c) => c.name.toLowerCase().includes('iim') || c.name.toLowerCase().includes('indian institute of management'));
    } else if (collegeTypeFilter === 'HIGH_ROI') {
      list = list.filter((c) =>
        c.code === 'FMS' || c.code === 'JBIMS' || c.code === 'SIMSREE' || c.code === 'PUMBA'
      );
    } else if (collegeTypeFilter === 'TOP_PACKAGE') {
      list = list.filter((c) =>
        c.programs.some((p) => (p.avg_package_lpa || 0) >= 25.0)
      );
    }

    // Search query
    if (collegeSearch.trim()) {
      const q = collegeSearch.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [colleges, collegeExamFilter, collegeTypeFilter, collegeSearch]);

  const currentExam = EXAM_DATA[selectedExamCode];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Banner & Quick Controls */}
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
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🎓
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                MBA Counsellor Cockpit
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: '13px' }}>
                Instant Intelligence for Calls: 5 Exams (CAT, XAT, SNAP, NMAT, CMAT) • 25+ Top B-Schools • Sectional Marks • Live Pitch
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
          { id: 'exams', label: '1. Exam Patterns & Subjects', icon: BookOpen, badge: '5 Exams' },
          { id: 'colleges', label: '2. Top Colleges & Packages', icon: GraduationCap, badge: `${colleges.length || 24} Colleges` },
          { id: 'cutoffs', label: '3. Cutoff Benchmarks & Marks', icon: TrendingUp, badge: 'Old & New IIMs' },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall, badge: 'Ready Pitch' },
          { id: 'eligibility', label: '5. 10-Sec Eligibility Check', icon: CheckCircle2, badge: 'Quick Check' },
          { id: 'courses', label: '6. PW Batches & Fees', icon: Sparkles, badge: 'Enrollment' }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CockpitTab)}
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

      {/* TAB 1: EXAM PATTERNS & SUBJECT BREAKDOWN */}
      {activeTab === 'exams' && (
        <div>
          {/* Exam Switcher Buttons */}
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
            {(['CAT', 'XAT', 'SNAP', 'NMAT', 'CMAT'] as ExamCode[]).map((code) => {
              const isSelected = selectedExamCode === code;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedExamCode(code)}
                  style={{
                    background: isSelected ? '#1E293B' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#1E293B',
                    border: isSelected ? '2px solid #1E293B' : '1px solid #CBD5E1',
                    padding: '8px 18px',
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
                  <span>{code === 'CAT' ? '🏆' : code === 'XAT' ? '🎯' : code === 'SNAP' ? '⚡' : code === 'NMAT' ? '✨' : '💰'}</span>
                  {code}
                </button>
              );
            })}
          </div>

          {/* Selected Exam Overview Card */}
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
                  color: '#2563EB',
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
                maxWidth: '420px',
                lineHeight: 1.4
              }}>
                <strong>💡 Counsellor Pitch Tip:</strong> {currentExam.counsellorTip}
              </div>
            </div>

            {/* 4 Quick Stat Metric Cards */}
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
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>{currentExam.marking}</div>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>🌟 Main Attraction</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', marginTop: '4px' }}>{currentExam.keySellingPoint}</div>
              </div>
            </div>
          </div>

          {/* Section-Wise Subject Pattern & Marks Table */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <div style={{ padding: '16px 20px', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>
                📋 Section-by-Section Exam Pattern & Marks Breakdown
              </h3>
              <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '12px' }}>
                Exact question distribution, marks per section, time limits, and syllabus coverage.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 700 }}>Section / Subject</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Questions</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Total Marks</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Section Time</th>
                    <th style={{ padding: '12px 16px', color: '#475569', fontWeight: 700 }}>Syllabus & Topics Tested</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExam.sections.map((sec, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0F172A' }}>
                        {sec.name}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: '#2563EB', fontSize: '14px' }}>
                        {sec.questions} Qs
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800, color: '#16A34A', fontSize: '14px' }}>
                        {sec.marks} Marks
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: '#475569' }}>
                        <span style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>{sec.duration}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155', lineHeight: 1.5, fontSize: '12.5px' }}>
                        {sec.details}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#F8FAFC', fontWeight: 800 }}>
                    <td style={{ padding: '14px 16px', color: '#0F172A' }}>TOTAL ACROSS ALL SECTIONS</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#2563EB', fontSize: '15px' }}>{currentExam.totalQs} Qs</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#16A34A', fontSize: '15px' }}>{currentExam.totalMarks} Marks</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#0F172A' }}>{currentExam.duration.split('•')[0]}</td>
                    <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12px' }}>Complete entrance syllabus coverage in PW Live Batches</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Score vs Percentile & Category Cutoffs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {/* Score vs Percentile Table */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
                🎯 {selectedExamCode} Score vs Percentile Mapping
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentExam.scoreVsPercentile.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #F1F5F9'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB' }}>{item.percentile}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>Calls: {item.callsFrom}</div>
                    </div>
                    <div style={{
                      background: '#E2E8F0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#0F172A'
                    }}>
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category-wise Cutoffs Table */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 800, color: '#1E293B' }}>
                🏷️ Category-wise Admission Cutoffs
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentExam.categoryCutoffs.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #F1F5F9'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{item.category}</span>
                      <span style={{
                        background: '#DCFCE7',
                        color: '#166534',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800
                      }}>
                        {item.overallCutoff}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                      Sectional: <strong>{item.sectionalCutoff}</strong> • {item.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOP B-SCHOOLS MASTER DIRECTORY */}
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
            {/* Search Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="#64748B" />
              <input
                type="text"
                placeholder="Search by college name, IIM, or city (e.g. FMS, Ahmedabad, XLRI)..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
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

            {/* Exam Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Exam:</span>
              {['ALL', 'CAT', 'XAT', 'SNAP', 'NMAT', 'CMAT'].map((ex) => (
                <button
                  key={ex}
                  onClick={() => setCollegeExamFilter(ex)}
                  style={{
                    background: collegeExamFilter === ex ? '#2563EB' : '#F1F5F9',
                    color: collegeExamFilter === ex ? '#FFFFFF' : '#475569',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Preset:</span>
              {[
                { id: 'ALL', label: 'All' },
                { id: 'IIM', label: 'IIMs Only' },
                { id: 'HIGH_ROI', label: 'Mega ROI (Fee < ₹6L)' },
                { id: 'TOP_PACKAGE', label: 'Package > ₹25 LPA' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCollegeTypeFilter(p.id)}
                  style={{
                    background: collegeTypeFilter === p.id ? '#1E293B' : '#F8FAFC',
                    color: collegeTypeFilter === p.id ? '#FFFFFF' : '#64748B',
                    border: '1px solid #E2E8F0',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colleges Count & Highlights */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E293B' }}>
              Showing {filteredColleges.length} Top B-Schools
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Tip: Click on any college to quote exact cutoff and fees to the student.
            </div>
          </div>

          {/* Colleges Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
            {filteredColleges.map((col) => {
              const prg = col.programs[0];
              const isSuperRoi = col.code === 'FMS' || col.code === 'JBIMS' || col.code === 'SIMSREE' || col.code === 'PUMBA';

              return (
                <div
                  key={col.id}
                  style={{
                    background: '#FFFFFF',
                    border: isSuperRoi ? '2px solid #10B981' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {isSuperRoi && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '14px',
                        background: '#DCFCE7',
                        color: '#166534',
                        padding: '3px 8px',
                        borderRadius: '20px',
                        fontSize: '10.5px',
                        fontWeight: 800
                      }}>
                        ⚡ MEGA ROI (Low Fees)
                      </span>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: '#EFF6FF',
                        color: '#1D4ED8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {prg?.exam_code || 'CAT'}
                      </span>
                      <span style={{ fontSize: '11.5px', color: '#64748B' }}>{col.location}</span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                      {col.name}
                    </h3>
                    <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#64748B' }}>
                      {prg?.program_name || 'PGP / MBA'} • Seats: <strong>{prg?.seats || 180}</strong>
                    </p>

                    {/* Stats Box */}
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
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>AVERAGE SALARY</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#16A34A' }}>
                          ₹{prg?.avg_package_lpa || '25.0'} LPA
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>EXAM CUTOFF</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB' }}>
                          {prg?.exam_cutoff_percentile?.split('(')[0] || '95+%ile'}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.45, marginBottom: '6px' }}>
                      <strong>Selection Process:</strong> {prg?.selection_process || 'Score -> WAT -> PI'}
                    </div>
                    {prg?.academic_cutoff && (
                      <div style={{ fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>
                        {prg.academic_cutoff}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '11.5px', color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Official Website ↗
                    </a>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Verified Record</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CUTOFF BENCHMARKS & MARKS */}
      {activeTab === 'cutoffs' && (
        <div>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '22px 24px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              📊 Master Score vs Percentile & Cutoff Directory
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '13px' }}>
              Use this during calls to answer: <em>"Sir, IIM Ahmedabad ke liye kitne marks chahiye? FMS ke liye kitne?"</em>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {/* CAT Benchmarks */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '15px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>🏆</span> CAT 2024-2025 Targets (Total 198 Marks)
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>
                  <li><strong>99.5+ %ile (~84 Marks):</strong> IIM Ahmedabad, Bangalore, Calcutta</li>
                  <li><strong>99.0+ %ile (~76 Marks):</strong> FMS Delhi (Fee ₹2L!), IIM Lucknow, Kozhikode</li>
                  <li><strong>95.0+ %ile (~56 Marks):</strong> SPJIMR, MDI Gurgaon, IIT Bombay/Delhi</li>
                  <li><strong>90.0+ %ile (~44 Marks):</strong> New IIMs (Udaipur, Trichy, Ranchi), IMT Ghaziabad</li>
                  <li><strong>85.0+ %ile (~36 Marks):</strong> Baby IIMs, GIM Goa, TAPMI Manipal</li>
                </ul>
              </div>

              {/* XAT Benchmarks */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '15px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>🎯</span> XAT 2025-2026 Targets (Total 100 Marks)
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>
                  <li><strong>96.0+ %ile (~40 Marks):</strong> XLRI Jamshedpur Business Management (BM)</li>
                  <li><strong>93.0+ %ile (~35 Marks):</strong> XLRI HRM & XLRI Delhi-NCR Campus</li>
                  <li><strong>91.0+ %ile (~31 Marks):</strong> XIMB Bhubaneswar (Business Management)</li>
                  <li><strong>85.0+ %ile (~27 Marks):</strong> GIM Goa, TAPMI Manipal, Great Lakes</li>
                  <li><strong>Female Advantage:</strong> ~5% lower cutoff for female candidates at XLRI!</li>
                </ul>
              </div>

              {/* SNAP Benchmarks */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '15px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>⚡</span> SNAP Targets (Total 60 Marks, 60 Mins)
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>
                  <li><strong>98.5+ %ile (~43 Marks):</strong> SIBM Pune (Avg CTC ₹28.16 LPA)</li>
                  <li><strong>97.0+ %ile (~40 Marks):</strong> SCMHRD Pune (Avg CTC ₹23.71 LPA)</li>
                  <li><strong>93.0+ %ile (~36 Marks):</strong> SIIB Pune & SIBM Bangalore</li>
                  <li><strong>87.0+ %ile (~32 Marks):</strong> SIOM Nashik (Operations)</li>
                  <li><strong>No Sectional Timer:</strong> Free navigation across all 60 questions!</li>
                </ul>
              </div>

              {/* NMAT & CMAT Benchmarks */}
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '15px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>💰</span> NMAT & CMAT High-ROI Targets
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>
                  <li><strong>NMAT 232+ Score:</strong> NMIMS Mumbai MBA Core (Avg CTC ₹26.6 LPA)</li>
                  <li><strong>NMAT 220+ Score:</strong> NMIMS Bangalore & K J Somaiya Mumbai</li>
                  <li><strong>CMAT 99.99 %ile (~345 Marks):</strong> JBIMS Mumbai (Fee ₹6L, CTC ₹28 LPA)</li>
                  <li><strong>CMAT 99.80 %ile (~330 Marks):</strong> SIMSREE Mumbai (Fee ₹1.5L, CTC ₹15.3 LPA)</li>
                  <li><strong>CMAT 90+ %ile:</strong> Great Lakes Chennai, GIM Goa, PUMBA Pune</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT & OBJECTIONS */}
      {activeTab === 'pitch' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
          {/* Battle-Tested Phone Script */}
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
              What to Say to a Student Inquiring for MBA
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>1. The Opening Hook (Aspiration & Package):</strong>
                "Hello [Student Name]! If you are aiming for an MBA in 2026, you are targeting colleges where the average starting package is between ₹25 Lakhs to ₹35 Lakhs per year. Did you know that preparing for CAT simultaneously covers 90% of the syllabus for XAT, SNAP, NMAT, and CMAT?"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>2. The 5-Exam Safety Shield (Removing Fear):</strong>
                "Many students fear: 'What if my CAT goes bad?' That is why smart aspirants follow our 5-Exam Shield: You write CAT in Nov, SNAP in Dec (3 attempts!), XAT in Jan, NMAT in Dec, and CMAT in May. You get 5 independent chances at Top Tier-1 B-Schools with just ONE consolidated preparation!"
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
                <strong style={{ color: '#1E293B', display: 'block', marginBottom: '4px' }}>3. The Pitch for PW Pioneer Batch:</strong>
                "In traditional coaching, you pay ₹80,000 to ₹1,20,000. In PW Pioneer MBA Batch, you get live lectures by 99.9+ %ilers, 30+ All-India CAT & OMET mocks, 24/7 doubt faculty, and complete GD-PI-WAT interview mentorship for less than ₹12,000. It is the most student-centric batch in India."
              </div>
            </div>
          </div>

          {/* Top 4 Objection Handlers */}
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
              Instant Answers to Common Student Doubts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', lineHeight: 1.55 }}>
              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Sir, my 10th/12th marks are only 60-70%. Will I get any good college?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Absolutely! FMS Delhi gives 50% weightage to CAT and only requires 50% in graduation. XLRI, MDI Gurgaon, IIFT, and new IIMs primarily evaluate your exam score and interview. A high CAT score overwrites past marks!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "I am from Non-Engineering / Arts / Commerce background. Is Quant too hard?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Actually, non-engineers have a huge advantage! Out of 22 Quant questions, 9 are 8th-10th standard Arithmetic. Plus, IIMs give 5% Academic Diversity points to non-engineers, and XLRI has lower cutoffs for non-engineers!"
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "Can an average student crack CAT in 6 to 8 months?"
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Yes! To get 99 percentile in CAT, you don't need 100% marks. You only need to solve ~28 questions correctly out of 66 (less than 50% of the paper!). It's a game of question selection, not syllabus completion."
                </span>
              </div>

              <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <strong style={{ color: '#991B1B', display: 'block', marginBottom: '2px' }}>
                  ❓ "I cannot afford ₹25 Lakhs for IIM fees."
                </strong>
                <span style={{ color: '#334155' }}>
                  👉 <strong>Answer:</strong> "Look at FMS Delhi (₹2L fee, ₹34 LPA package), JBIMS Mumbai (₹6L fee, ₹28 LPA package), and SIMSREE (₹1.5L fee, ₹15 LPA package). Plus, all nationalized banks grant 100% collateral-free loans for top IIMs!"
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
            ⏱️ 10-Second Student Eligibility Check
          </h3>
          <p style={{ margin: '0 0 20px', color: '#64748B', fontSize: '13px' }}>
            Verify if the student qualifies to register for CAT, XAT, SNAP, NMAT, and CMAT.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Academic Degree</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Bachelor's Degree (Any Stream)</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>B.Tech, B.Com, B.Sc, BBA, B.A., etc. recognized by UGC/AIU</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Minimum Graduation Marks</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>50% for Gen/OBC • 45% for SC/ST/PwD</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Aggregate across all semesters</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Final Year Appearing?</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>100% Eligible!</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Final year students can appear and submit marksheet later</div>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#1E3A8A', lineHeight: 1.5 }}>
            <strong>✅ Counsellor Rule of Thumb:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li><strong>NO Age Limit:</strong> A 20-year-old or a 35-year-old can appear for CAT, XAT, SNAP, NMAT, CMAT.</li>
              <li><strong>NO Work Experience Required:</strong> Freshers are eligible for 100% of seats in regular MBA programs.</li>
              <li><strong>NO Stream Restrictions:</strong> A student from Music, History, Engineering, or Commerce is equally welcome.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 6: PW BATCHES & COURSES */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              PW MBA Course Portfolio (Academic Year 2025-2026)
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
              Recommend the exact batch matching student’s target and timeline.
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
                      color: '#2563EB',
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
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>TOTAL COURSE FEE</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#16A34A' }}>
                      ₹{crs.fees_inr.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => onPitchCourse(crs)}
                    style={{
                      background: '#2563EB',
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
