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
  Atom,
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

interface CsirJamCounsellorCockpitProps {
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

type CsirTab = 'exams' | 'institutes' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type CsirExamCode = 'CSIR-NET' | 'IIT-JAM' | 'TIFR-GS' | 'JEST' | 'GATE-SCIENCE';

export const CsirJamCounsellorCockpit: React.FC<CsirJamCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<CsirTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<CsirExamCode>('CSIR-NET');
  const [instSearch, setInstSearch] = useState('');
  const [instFilter, setInstFilter] = useState<'ALL' | 'IISC_IITS' | 'TIFR_IISER' | 'CENTRAL_RES'>('ALL');

  // 10-second eligibility state
  const [elQual, setElQual] = useState<'BSC' | 'MSC_APPEARING' | 'MSC_PASSED' | 'BTECH'>('MSC_APPEARING');
  const [elPct, setElPct] = useState<number>(62);
  const [elCategory, setElCategory] = useState<'GEN' | 'OBC' | 'SC_ST'>('GEN');
  const [elAge, setElAge] = useState<number>(25);

  const EXAM_DATA: Record<CsirExamCode, {
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
    'CSIR-NET': {
      fullName: 'CSIR UGC NET (Chemical, Life, Physical, Mathematical Sciences)',
      conductingBody: 'National Testing Agency (NTA) & CSIR HRDG',
      frequency: 'Twice a Year (June & December Cycles)',
      mode: 'Computer Based Test (CBT) • 3 Parts: A, B, C',
      duration: '180 Minutes (3 Hours)',
      totalMarks: '200 Marks (Merit decides JRF & Assistant Professor)',
      keySellingPoint: 'Qualifying JRF guarantees ₹37,000/month (+HRA) government cash fellowship (₹28+ Lakhs funding over 5 years)!',
      counsellorTip: 'Highlight that Part C carries 100 out of 200 marks (50% weightage) with 3x choices. Students only need to attempt 25 out of 75 questions to top the exam!',
      sectionsBreakdown: [
        {
          subject: 'Part A',
          title: 'General Science, Quantitative Aptitude & Reasoning',
          questions: '20 Qs (Attempt Any 15)',
          marks: '30 Marks (2 Marks each, -0.50 negative)',
          weightage: '15% Weightage',
          details: 'Common across all science streams: Graphical analysis, numerical ability, series, geometrical reasoning, series puzzles.'
        },
        {
          subject: 'Part B',
          title: 'Core Subject Knowledge (Direct Concept Testing)',
          questions: '50 Qs (Attempt Any 35)',
          marks: '70 Marks (2 Marks each, -0.50 negative)',
          weightage: '35% Weightage',
          details: 'Direct MCQs covering foundational B.Sc. and M.Sc. concepts in Chemical / Life / Physical / Mathematical Sciences.'
        },
        {
          subject: 'Part C',
          title: 'Higher Order Scientific & Analytical Research Questions',
          questions: '75 Qs (Attempt Any 25!)',
          marks: '100 Marks (4 Marks each, -1.00 negative)',
          weightage: '50% Merit Decider',
          details: 'Advanced multi-concept research questions, experimental data interpretation, reaction pathways, quantum mechanics, genetics.'
        }
      ]
    },
    'IIT-JAM': {
      fullName: 'Joint Admission Test for Masters (M.Sc. & Integrated Ph.D. at 21 IITs & IISc)',
      conductingBody: 'Indian Institutes of Technology (Rotational IIT)',
      frequency: 'Once a Year (Second Sunday of February)',
      mode: 'Computer Based Test (CBT) • 60 Questions',
      duration: '180 Minutes (3 Hours)',
      totalMarks: '100 Marks',
      keySellingPoint: 'Gateway for B.Sc. graduates to study at IIT Bombay, IIT Delhi, and IISc Bangalore with average placements of ₹12–18 LPA!',
      counsellorTip: 'Stress that Section B (MSQ) and Section C (NAT) have ZERO negative marking! Maximizing attempts in Section C is the key to securing an AIR under 100.',
      sectionsBreakdown: [
        {
          subject: 'Section A',
          title: 'Multiple Choice Questions (MCQ - Single Correct)',
          questions: '30 Questions (10 of 1M + 20 of 2M)',
          marks: '50 Marks (Negative marking -0.33 & -0.66)',
          weightage: '50% of Paper',
          details: 'Standard single-correct conceptual questions across Chemistry, Physics, Mathematics, Biotechnology, or Geology.'
        },
        {
          subject: 'Section B',
          title: 'Multiple Select Questions (MSQ - More than 1 Correct)',
          questions: '10 Questions (2 Marks each)',
          marks: '20 Marks (NO NEGATIVE MARKING)',
          weightage: '20% of Paper',
          details: 'One or more options correct. Full marks only if all correct choices are ticked without any incorrect option.'
        },
        {
          subject: 'Section C',
          title: 'Numerical Answer Type (NAT - Virtual Keypad Entry)',
          questions: '20 Questions (10 of 1M + 10 of 2M)',
          marks: '30 Marks (NO NEGATIVE MARKING)',
          weightage: '30% of Paper',
          details: 'Real decimal/integer answer entered on screen keypad. No options provided. High accuracy scorer for disciplined students.'
        }
      ]
    },
    'TIFR-GS': {
      fullName: 'Tata Institute of Fundamental Research Graduate Studies Entrance',
      conductingBody: 'TIFR Mumbai, NCBS Bengaluru, ICTS, TCIS Hyderabad',
      frequency: 'Once a Year (December)',
      mode: 'Nationwide CBT Screening + Two Rounds of Rigorous Interviews',
      duration: '180 Minutes',
      totalMarks: 'Written Screening Merit',
      keySellingPoint: 'Premier fundamental research institution under DAE with ₹31,000–₹35,000/mo stipend and international scientific collaborations.',
      counsellorTip: 'TIFR tests deep conceptual clarity rather than speed. Students who master fundamental proofs and physical intuition clear easily.',
      sectionsBreakdown: [
        {
          subject: 'Physics / Chem / Bio',
          title: 'Theoretical Problem Solving & Core Scientific Deduction',
          questions: '40–50 Questions',
          marks: 'Screening Score',
          weightage: '100% Written',
          details: 'Intense conceptual problems in Quantum Mechanics, Thermodynamics, Molecular Biology, Organic Mechanisms, Real Analysis.'
        }
      ]
    },
    'JEST': {
      fullName: 'Joint Entrance Screening Test (Premier Theoretical Physics & Neuroscience)',
      conductingBody: 'Science & Engineering Research Board (SERB) / Premier Institutes',
      frequency: 'Once a Year (March)',
      mode: 'Offline OMR / CBT (Part A, Part B, Part C)',
      duration: '180 Minutes',
      totalMarks: '100 Marks',
      keySellingPoint: 'Single screening gateway for 32 Apex Research Institutes including IISc, RRI, IMSc, HRI, SINP, IIA, and PRL.',
      counsellorTip: 'JEST physics syllabus matches 90% with CSIR NET Physical Sciences. Serious physics aspirants should definitely prepare for both simultaneously.',
      sectionsBreakdown: [
        {
          subject: 'Part A',
          title: 'Multiple Choice Questions (High Difficulty)',
          questions: '15 Questions (3 Marks each, -1 negative)',
          marks: '45 Marks',
          weightage: '45% Weightage',
          details: 'Advanced classical mechanics, electromagnetism, quantum physics, mathematical methods.'
        },
        {
          subject: 'Part B & C',
          title: 'Numerical & Short Problems',
          questions: '35 Questions',
          marks: '55 Marks',
          weightage: '55% Weightage',
          details: 'In-depth problem solving in statistical mechanics, electronics, optics, and atomic physics.'
        }
      ]
    },
    'GATE-SCIENCE': {
      fullName: 'GATE Science Disciplines (CY - Chemistry, PH - Physics, MA - Mathematics)',
      conductingBody: 'IISc / IITs',
      frequency: 'Once a Year (February)',
      mode: 'Computer Based Test (65 Questions, 100 Marks)',
      duration: '180 Minutes',
      totalMarks: '100 Marks',
      keySellingPoint: 'GATE Chemistry & Physics scores open direct PSU Executive recruitment (ONGC, IOCL, BARC) + direct Ph.D. with ₹37,000/mo fellowship.',
      counsellorTip: 'CSIR NET aspirants have 90% syllabus overlap with GATE Science papers. One consolidated preparation covers both prestigious exams!',
      sectionsBreakdown: [
        {
          subject: 'Core Science + GA',
          title: 'General Aptitude (15M) + Core Discipline (85M)',
          questions: '65 Questions (MCQ, MSQ, NAT)',
          marks: '100 Marks',
          weightage: '100% GATE Score',
          details: '10 General Aptitude Qs + 55 Core Chemistry, Physics, or Mathematics questions. Virtual scientific calculator provided.'
        }
      ]
    }
  };

  // Top Institutes data
  const TOP_INSTITUTES = [
    {
      name: 'Indian Institute of Science (IISc Bangalore)',
      location: 'Bengaluru, Karnataka',
      rank: 'NIRF #1 Overall & Research in India',
      examCode: 'CSIR-NET / IIT-JAM',
      degrees: 'M.Sc., Integrated Ph.D., Direct Ph.D. with ₹37,000/mo JRF',
      placements: 'Average R&D CTC ₹18.5 LPA • Global Postdoc in US/Europe (100% funding)',
      type: 'IISC_IITS',
      highlights: 'Apex Science institution of India. World-class laboratories, supercomputing facilities, and direct international industry tie-ups.'
    },
    {
      name: 'IIT Bombay (Faculty of Science)',
      location: 'Powai, Mumbai, Maharashtra',
      rank: 'NIRF #3 Engineering / Top Pure Sciences',
      examCode: 'IIT-JAM',
      degrees: '2-Year M.Sc. in Chemistry, Physics, Applied Statistics & Math',
      placements: 'Average CTC ₹16.2 LPA • Highest ₹32.0 LPA (Analytics, Quant & Pharma R&D)',
      type: 'IISC_IITS',
      highlights: 'Top recruiters: Dr. Reddy’s, Piramal, Shell R&D, Morgan Stanley, Quant Analytics firms hiring M.Sc. graduates directly.'
    },
    {
      name: 'IIT Delhi (School of Physical & Chemical Sciences)',
      location: 'Hauz Khas, New Delhi',
      rank: 'NIRF #2 Engineering / Top 5 Science',
      examCode: 'IIT-JAM / CSIR-NET',
      degrees: 'M.Sc. in Chemistry, Physics, Cognitive Science, Ph.D.',
      placements: 'Average CTC ₹15.8 LPA • Tech & Analytics conversions',
      type: 'IISC_IITS',
      highlights: 'Direct campus placement alongside B.Techs. Strong semiconductor, battery tech, and nanomaterials labs.'
    },
    {
      name: 'Tata Institute of Fundamental Research (TIFR Mumbai & NCBS)',
      location: 'Colaba, Mumbai & Bengaluru',
      rank: 'Premier Research Institute under DAE',
      examCode: 'TIFR-GS / JEST',
      degrees: 'Ph.D. & Integrated M.Sc.-Ph.D. in Physics, Chemistry, Biology',
      placements: 'Monthly Fellowship ₹31k - ₹35k • Prestigious global scientific careers',
      type: 'TIFR_IISER',
      highlights: 'Birthplace of India’s atomic energy and computer programs. 1-on-1 mentorship with Shanti Swarup Bhatnagar laureates.'
    },
    {
      name: 'IISER Pune (Indian Institute of Science Education & Research)',
      location: 'Pashan, Pune, Maharashtra',
      rank: 'Apex Autonomous Science Institute (MoE)',
      examCode: 'IIT-JAM / CSIR-NET',
      degrees: 'Integrated Ph.D. & Ph.D. with CSIR/DST Fellowship',
      placements: 'Research Stipend ₹37,000/mo • 80%+ international postdoc transition',
      type: 'TIFR_IISER',
      highlights: 'State-of-the-art NMR, Cryo-EM, and computational cluster facilities. Cross-disciplinary research environment.'
    },
    {
      name: 'Jawaharlal Nehru Centre for Advanced Scientific Research (JNCASR)',
      location: 'Jakkur, Bengaluru, Karnataka',
      rank: 'DST Centre of Excellence (Founded by Prof. C.N.R. Rao)',
      examCode: 'CSIR-NET / JEST',
      degrees: 'M.S. (Engg./Research) & Ph.D. in Materials, Chemistry, Biology',
      placements: 'Top global research citations • Industrial R&D leadership',
      type: 'CENTRAL_RES',
      highlights: 'World leader in 2D materials, hydrogen energy, supercapacitors, and molecular therapeutics.'
    }
  ];

  const filteredColleges = useMemo(() => {
    return TOP_INSTITUTES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(instSearch.toLowerCase()) ||
        c.location.toLowerCase().includes(instSearch.toLowerCase()) ||
        c.degrees.toLowerCase().includes(instSearch.toLowerCase());
      const matchesFilter = instFilter === 'ALL' || c.type === instFilter;
      return matchesSearch && matchesFilter;
    });
  }, [instSearch, instFilter]);

  // 10-Second Eligibility calculation
  const eligibilityVerdict = useMemo(() => {
    const isSciGrad = elQual === 'MSC_PASSED' || elQual === 'MSC_APPEARING' || elQual === 'BSC' || elQual === 'BTECH';
    const minMscPct = elCategory === 'SC_ST' ? 50 : 55;
    const minBscPct = elCategory === 'SC_ST' ? 50 : 55;

    const jrfAgeEligible = elAge <= (elCategory === 'GEN' ? 30 : 35);
    const lsAgeEligible = true; // No upper age limit for Lectureship

    const canDoCsirNet = (elQual === 'MSC_PASSED' || elQual === 'MSC_APPEARING' || elQual === 'BTECH') && elPct >= minMscPct;
    const canDoIitJam = (elQual === 'BSC' || elQual === 'MSC_APPEARING' || elQual === 'MSC_PASSED') && elPct >= minBscPct;

    return {
      canDoCsirNet,
      canDoIitJam,
      jrfAgeEligible,
      lsAgeEligible,
      minRequiredPct: minMscPct,
      summary: canDoCsirNet && jrfAgeEligible
        ? 'FULLY ELIGIBLE for CSIR NET JRF (₹37,000/mo Fellowship) & Assistant Professorship!'
        : canDoCsirNet && !jrfAgeEligible
        ? 'ELIGIBLE for CSIR NET Lectureship / Assistant Professor (Exceeded JRF 30 yr limit, but no age limit for LS!)'
        : canDoIitJam
        ? 'FULLY ELIGIBLE for IIT JAM M.Sc. Admissions across all 21 IITs & IISc Bangalore!'
        : 'Needs minimum 55% marks in graduation/post-graduation to meet eligibility criteria.'
    };
  }, [elQual, elPct, elCategory, elAge]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header & Fast Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            >
              ← Back to Categories
            </button>
            <span className="text-xs font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full">
              LIVE COCKPIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Atom className="w-8 h-8 text-cyan-400" />
            CSIR-NET & IIT-JAM Counsellor Intelligence Cockpit
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Everything an EdTech counsellor needs on a live call: CSIR NET JRF (₹37,000/mo cash stipend), IIT JAM M.Sc. admissions at IIT Bombay/IISc, exam structures, subject weightages, real cutoffs, and conversion scripts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('pitch')}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-900/30 transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            Live Call Pitch
          </button>
          <button
            onClick={onOpenFitmentModal}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Fitment Matrix
          </button>
        </div>
      </div>

      {/* JRF Fellowship & IIT M.Sc. Synergy Ribbon */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                Apex Fellowship Hook
              </span>
              <span className="text-xs text-slate-400">Direct DBT to Student Bank Account</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              CSIR NET JRF: ₹37,000/Month Fellowship + HRA (₹28+ Lakhs Total Funding)
            </h3>
            <p className="text-xs text-slate-300">
              Qualifying JRF gives the student ₹37k/mo for the first 2 years (JRF), automatically promoted to SRF at ₹42,000/mo for 3 years + annual contingency grant of ₹20,000!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pitch')}
            className="text-xs font-bold px-3.5 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl transition-all"
          >
            View JRF Phone Pitch →
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'exams', label: '1. Exam Tracks & Pattern', icon: Target },
          { id: 'institutes', label: '2. Premier Institutes (IISc/IITs)', icon: Building2 },
          { id: 'cutoffs', label: '3. Real Cutoff Targets', icon: TrendingUp },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall },
          { id: 'eligibility', label: '5. 10s Eligibility Check', icon: Shield },
          { id: 'courses', label: '6. PW Science Courses', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CsirTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXAM TRACKS & PATTERNS */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Track selector chips */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            {[
              { code: 'CSIR-NET', label: 'CSIR UGC NET (Science Streams)', badge: '₹37,000/mo JRF' },
              { code: 'IIT-JAM', label: 'IIT JAM (M.Sc. at IITs/IISc)', badge: 'AIR Rank Merit' },
              { code: 'TIFR-GS', label: 'TIFR Graduate Studies', badge: 'DAE Fellowship' },
              { code: 'JEST', label: 'JEST (Theoretical Physics)', badge: '32 Institutes' },
              { code: 'GATE-SCIENCE', label: 'GATE Chemistry/Physics', badge: 'PSU + Ph.D.' }
            ].map(track => {
              const isSelected = selectedExamCode === track.code;
              return (
                <button
                  key={track.code}
                  onClick={() => setSelectedExamCode(track.code as CsirExamCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-400 border-cyan-500 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{track.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {track.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Exam Card */}
          {(() => {
            const exam = EXAM_DATA[selectedExamCode];
            return (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                      Official Structure
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">{exam.fullName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Conducted by: <span className="text-slate-200 font-semibold">{exam.conductingBody}</span> • Frequency: <span className="text-slate-200 font-semibold">{exam.frequency}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⏱ {exam.duration}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      💻 {exam.mode}
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/30 font-black">
                      🎯 {exam.totalMarks}
                    </span>
                  </div>
                </div>

                {/* Selling point and counsellor tip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Sparkles className="w-4 h-4" />
                      Key Value Proposition for Students
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.keySellingPoint}
                    </p>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Target className="w-4 h-4" />
                      Counsellor Strategy Tip
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.counsellorTip}
                    </p>
                  </div>
                </div>

                {/* Section Breakdown Cards */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Detailed Sectional Weightage & Syllabus Blueprint
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exam.sectionsBreakdown.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-850/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                              {sec.subject}
                            </span>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                              {sec.weightage}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-2">{sec.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            {sec.details}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span>{sec.questions}</span>
                          <span className="text-cyan-300">{sec.marks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: PREMIER INSTITUTES */}
      {activeTab === 'institutes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={instSearch}
                onChange={(e) => setInstSearch(e.target.value)}
                placeholder="Search IISc, IITs, TIFR, or packages..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All Apex Institutes' },
                { id: 'IISC_IITS', label: 'IISc & IITs' },
                { id: 'TIFR_IISER', label: 'TIFR & IISERs' },
                { id: 'CENTRAL_RES', label: 'DST Centres' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setInstFilter(f.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    instFilter === f.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredColleges.map((inst, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                      {inst.rank}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{inst.name}</h3>
                    <p className="text-xs text-slate-400">{inst.location}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                    {inst.examCode}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{inst.highlights}</p>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Programs Offered:</span>
                    <span className="text-slate-200 font-semibold text-right">{inst.degrees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Career Trajectory:</span>
                    <span className="text-emerald-400 font-bold text-right">{inst.placements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL CUTOFF TARGETS */}
      {activeTab === 'cutoffs' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                Official Benchmark Targets
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                CSIR NET & IIT JAM Official Qualifying Cutoffs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real marks needed out of 200 (CSIR NET) and out of 100 (IIT JAM) to guarantee JRF funding and IIT admission.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold uppercase">Discipline / Paper</th>
                    <th className="py-3 px-4 font-bold uppercase">General JRF (₹37k/mo)</th>
                    <th className="py-3 px-4 font-bold uppercase">EWS / OBC JRF</th>
                    <th className="py-3 px-4 font-bold uppercase">SC / ST JRF</th>
                    <th className="py-3 px-4 font-bold uppercase">Assistant Prof (LS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Atom className="w-3.5 h-3.5 text-cyan-400" />
                      Chemical Sciences (CSIR NET)
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">~52.5% (105 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~46.0% (92 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~36.5% (73 / 200M)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~47.2% (94 / 200M)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Atom className="w-3.5 h-3.5 text-cyan-400" />
                      Life Sciences (CSIR NET)
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">~98.8 Percentile (~110M)</td>
                    <td className="py-3 px-4 text-slate-300">~96.5 Percentile (~98M)</td>
                    <td className="py-3 px-4 text-slate-300">~89.0 Percentile (~80M)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~97.0 Percentile (~98M)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Atom className="w-3.5 h-3.5 text-cyan-400" />
                      Physical Sciences (CSIR NET)
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">~48.5% (97 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~42.0% (84 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~32.5% (65 / 200M)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~43.6% (87 / 200M)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Atom className="w-3.5 h-3.5 text-cyan-400" />
                      Mathematical Sciences (CSIR NET)
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">~51.0% (102 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~44.5% (89 / 200M)</td>
                    <td className="py-3 px-4 text-slate-300">~34.0% (68 / 200M)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~45.9% (91 / 200M)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      IIT JAM Chemistry (IIT Bombay/Delhi Target)
                    </td>
                    <td className="py-3 px-4 text-amber-300 font-bold">AIR 1–120 (Score 62+ / 100)</td>
                    <td className="py-3 px-4 text-slate-300">AIR 121–350 (Score 54+)</td>
                    <td className="py-3 px-4 text-slate-300">AIR 350–1200 (Score 38+)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">General Qualifying: ~27.5M</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      IIT JAM Physics (IIT Bombay/IISc Target)
                    </td>
                    <td className="py-3 px-4 text-amber-300 font-bold">AIR 1–95 (Score 65+ / 100)</td>
                    <td className="py-3 px-4 text-slate-300">AIR 96–280 (Score 55+)</td>
                    <td className="py-3 px-4 text-slate-300">AIR 281–950 (Score 40+)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">General Qualifying: ~26.0M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Counsellor Closing Argument:</span>
              <p>
                In CSIR NET, students don't need 80% or 90% marks! You only need <strong>~50-52% marks</strong> to secure a JRF rank with ₹37,000/month government salary. With PW's structured PYQ drills, scoring 105+ out of 200 is completely achievable in 6 months.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          {/* 60-Second Call Script */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                Word-for-Word Script
              </span>
              <span className="text-xs text-slate-400 font-semibold">Duration: 60 Seconds</span>
            </div>
            <h2 className="text-xl font-black text-white">
              The 60-Second CSIR JRF & IIT JAM Admission Pitch
            </h2>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <p>
                <span className="text-cyan-400 font-bold">[Warm Hook]:</span> "Hello <span className="text-yellow-300 font-semibold">[Student Name]</span>! I noticed you are pursuing your <span className="text-yellow-300 font-semibold">[B.Sc. / M.Sc.]</span> in Science. Are you aware that cracking CSIR NET JRF puts a guaranteed government salary of <strong>₹37,000 per month (plus HRA)</strong> straight into your bank account while doing your research?"
              </p>
              <p>
                <span className="text-cyan-400 font-bold">[Value Framing]:</span> "That’s over <strong>₹28 Lakhs in total funding</strong> across 5 years, plus you become a permanent candidate for Assistant Professor in central universities like DU, BHU, and JNU."
              </p>
              <p>
                <span className="text-cyan-400 font-bold">[If B.Sc. Student - IIT JAM]:</span> "And if you are in B.Sc., IIT JAM lets you skip private colleges and enter IIT Bombay or IISc Bangalore for M.Sc., where tech and pharmaceutical companies hire M.Sc. graduates at ₹14 to ₹20 LPA!"
              </p>
              <p>
                <span className="text-cyan-400 font-bold">[Low-Effort Reality Check]:</span> "Best of all, you don’t need 90% marks. The cutoff for JRF is only around <strong>50% to 52%</strong>! In our PW Saarthi batch, we cover all Part C multi-concept questions and test series with live CSIR AIR toppers."
              </p>
            </div>
          </div>

          {/* Objection Handlers */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Top 3 Science Student Objections Handled
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 1:</div>
                <h4 className="text-sm font-bold text-white">"Part C research questions are too difficult for me"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Response:</strong> "In Part C, you get 75 questions but only need to attempt 25! That’s a 3:1 choice ratio. PW teaches you question-elimination frameworks so you pick only your strongest 25 topics."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 2:</div>
                <h4 className="text-sm font-bold text-white">"Does M.Sc. from IIT really have campus placements?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Response:</strong> "Yes! IIT Bombay and IIT Delhi have dedicated Science placement cells. Analytics firms, chemical majors, and multinational edtechs recruit M.Sc. graduates at ₹12–18 LPA packages."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 3:</div>
                <h4 className="text-sm font-bold text-white">"Can I prepare during my M.Sc. final semester?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400">Response:</strong> "That is the ideal time! 80% of our successful JRF students clear the exam while in their 3rd or 4th semester, so they immediately start receiving the ₹37k stipend upon graduation without wasting a single year."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10-SECOND ELIGIBILITY CHECKER */}
      {activeTab === 'eligibility' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
              Instant Phone Rule
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              10-Second Eligibility Checker for Science Aspirants
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Input student's graduation status, marks, and age while on the phone to instantly verify eligibility for JRF, Lectureship, or IIT JAM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Education Qualification</label>
              <select
                value={elQual}
                onChange={(e) => setElQual(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="MSC_APPEARING">M.Sc. Final Year Appearing</option>
                <option value="MSC_PASSED">M.Sc. Passed</option>
                <option value="BSC">B.Sc. Final Year / Passed</option>
                <option value="BTECH">B.Tech / B.E. (Science Track)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Aggregate Percentage (%)</label>
              <input
                type="number"
                value={elPct}
                onChange={(e) => setElPct(Number(e.target.value))}
                min={40}
                max={100}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Social Category</label>
              <select
                value={elCategory}
                onChange={(e) => setElCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="GEN">General / Unreserved</option>
                <option value="OBC">OBC (Non-Creamy Layer)</option>
                <option value="SC_ST">SC / ST / PwD</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Student Age (Years)</label>
              <input
                type="number"
                value={elAge}
                onChange={(e) => setElAge(Number(e.target.value))}
                min={18}
                max={45}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Verdict Banner */}
          <div className="p-5 rounded-xl border bg-cyan-950/30 border-cyan-500/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Eligibility Result
            </div>
            <h3 className="text-base font-black text-white">{eligibilityVerdict.summary}</h3>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className={`px-2.5 py-1 rounded font-bold ${
                eligibilityVerdict.jrfAgeEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                JRF Age Status: {eligibilityVerdict.jrfAgeEligible ? 'Within 30 Yrs Limit' : 'Exceeded 30 Yrs (Eligible for LS)'}
              </span>
              <span className="px-2.5 py-1 rounded font-bold bg-cyan-500/20 text-cyan-300">
                Min Required Marks: {eligibilityVerdict.minRequiredPct}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PW COURSES & BATCHES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Recommended Batches for Science Aspirants</h2>
              <p className="text-xs text-slate-400">Live CSIR NET & IIT JAM courses with top NIRF rankers and mock test series.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                      {course.target_exam_code}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{course.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{course.target_student_profile}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">₹{course.fees_inr.toLocaleString()}</span>
                      <span className="text-xs text-slate-400">{course.duration_months} Months Duration</span>
                    </div>

                    <button
                      onClick={() => onPitchCourse(course)}
                      className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Pitch This Course Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Dedicated CSIR NET & IIT JAM batches are pre-configured. Use the pitch script above on calls!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
