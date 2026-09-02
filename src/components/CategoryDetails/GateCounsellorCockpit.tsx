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
  Cpu,
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
  Zap,
  DollarSign
} from 'lucide-react';

interface GateCounsellorCockpitProps {
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

type GateTab = 'exams' | 'psus_iits' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type GateExamCode = 'GATE-CS' | 'GATE-DA' | 'GATE-EC' | 'GATE-ME' | 'BARC-SCIENTIFIC';

export const GateCounsellorCockpit: React.FC<GateCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<GateTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<GateExamCode>('GATE-CS');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'MAHARATNA' | 'IITS' | 'RESEARCH'>('ALL');

  // 10-second eligibility checker state
  const [elYear, setElYear] = useState<'3RD_YEAR' | '4TH_YEAR' | 'GRADUATED' | 'DIPLOMA'>('4TH_YEAR');
  const [elBranch, setElBranch] = useState<'CS_IT' | 'EC_EE' | 'MECH' | 'CIVIL' | 'OTHER'>('CS_IT');
  const [elCategory, setElCategory] = useState<'GEN' | 'OBC' | 'SC_ST'>('GEN');
  const [elAge, setElAge] = useState<number>(23);

  const EXAM_DATA: Record<GateExamCode, {
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
    'GATE-CS': {
      fullName: 'GATE Computer Science & Information Technology (CS & IT)',
      conductingBody: 'IISc Bangalore & IITs (Rotational Conducting Institute)',
      frequency: 'Once a Year (First / Second Weekend of February)',
      mode: 'Computer Based Test (CBT) • 65 Questions',
      duration: '180 Minutes (3 Hours)',
      totalMarks: '100 Marks (GATE Score calculated on 1000 scale)',
      keySellingPoint: 'Gateway to M.Tech at IIT Bombay/Madras/IISc with average packages of ₹26–32 LPA + Direct Class-1 PSU Executive recruitment in IOCL, ONGC, and NTPC!',
      counsellorTip: 'Emphasize that General Aptitude (15M) and Engineering Mathematics (13M) contribute 28 Marks with straightforward formulas. Securing 25+ in this section alone clears the qualifying cutoff!',
      sectionsBreakdown: [
        {
          subject: 'General Aptitude',
          title: 'Verbal Ability & Numerical Aptitude',
          questions: '10 Questions (5 of 1M + 5 of 2M)',
          marks: '15 Marks (Mandatory Section)',
          weightage: '15% of Paper',
          details: 'English grammar, vocabulary, critical reasoning, spatial aptitude, elementary arithmetic, and data interpretation.'
        },
        {
          subject: 'Engg Math & Discrete',
          title: 'Discrete Mathematics, Linear Algebra, Probability, Calculus',
          questions: '8–10 Questions',
          marks: '13–15 Marks',
          weightage: '15% of Paper',
          details: 'Propositional logic, set theory, combinatorics, graph theory, matrices, eigenvalues, Bayes theorem, conditional probability.'
        },
        {
          subject: 'Core CS Subjects',
          title: 'DSA, OS, DBMS, Computer Networks, TOC, Compiler, Architecture',
          questions: '45–47 Questions (MCQ, MSQ, NAT)',
          marks: '70–72 Marks',
          weightage: '70% Core Weightage',
          details: 'Data Structures, Algorithms (Time complexities, Dynamic Programming), Operating Systems, SQL/Indexing, TCP/IP, Regular Languages.'
        }
      ]
    },
    'GATE-DA': {
      fullName: 'GATE Data Science and Artificial Intelligence (Paper Code: DA)',
      conductingBody: 'IISc Bangalore / IITs',
      frequency: 'Once a Year (February)',
      mode: 'Computer Based Test (65 Questions, 100 Marks)',
      duration: '180 Minutes',
      totalMarks: '100 Marks',
      keySellingPoint: 'Brand-new specialized paper tailored for AI/ML careers! Eligible for two-paper combination with GATE CS.',
      counsellorTip: 'Great for students from any engineering branch (Electrical, Mechanical, etc.) who want a direct high-paying transition into AI/ML without learning hardware architecture.',
      sectionsBreakdown: [
        {
          subject: 'Mathematics & Stats',
          title: 'Probability & Statistics + Linear Algebra + Calculus',
          questions: '18–20 Questions',
          marks: '30 Marks',
          weightage: '30% Weightage',
          details: 'Probability distributions, hypothesis testing, eigenvalues, SVD, gradients, optimization methods.'
        },
        {
          subject: 'Machine Learning',
          title: 'Supervised, Unsupervised & Deep Learning Fundamentals',
          questions: '20–22 Questions',
          marks: '35 Marks',
          weightage: '35% Weightage',
          details: 'Regression, Decision Trees, SVM, Clustering, Dimensionality reduction, Neural networks, Loss functions.'
        },
        {
          subject: 'AI & Data Structures',
          title: 'Search Algorithms, Python Data Structures & Database Management',
          questions: '15–17 Questions',
          marks: '20 Marks + 15M GA',
          weightage: '35% Weightage',
          details: 'A* search, Minimax, Python dictionary/list complexities, Relational DB & Data Warehousing basics.'
        }
      ]
    },
    'GATE-EC': {
      fullName: 'GATE Electronics and Communication Engineering (EC)',
      conductingBody: 'IISc / IITs',
      frequency: 'Once a Year (February)',
      mode: 'Computer Based Test (65 Questions, 100 Marks)',
      duration: '180 Minutes',
      totalMarks: '100 Marks',
      keySellingPoint: 'Direct recruitment into ISRO, DRDO, BEL, BSNL, and elite M.Tech in VLSI & Microelectronics (starting packages ₹24–35 LPA at Qualcomm, Intel, Nvidia).',
      counsellorTip: 'Highlight the booming Indian Semiconductor Mission. VLSI design engineers graduating from IITs command the highest domestic M.Tech packages!',
      sectionsBreakdown: [
        {
          subject: 'Core Electronics',
          title: 'Electronic Devices, Analog & Digital Circuits',
          questions: '22–25 Questions',
          marks: '35 Marks',
          weightage: '35% Weightage',
          details: 'Semiconductor physics, MOSFET, Op-Amps, sequential circuits, microprocessors, CMOS logic.'
        },
        {
          subject: 'Signals & Comms',
          title: 'Signals & Systems, Control Systems, Communications',
          questions: '20–22 Questions',
          marks: '35 Marks',
          weightage: '35% Weightage',
          details: 'Fourier/Laplace/Z-transforms, transfer functions, stability, digital modulation (QPSK, QAM), noise analysis.'
        },
        {
          subject: 'Electromagnetics & GA',
          title: 'Electromagnetics + Engineering Math + General Aptitude',
          questions: '18–20 Questions',
          marks: '30 Marks',
          weightage: '30% Weightage',
          details: 'Maxwell equations, waveguides, antenna theory, complex variables, differential equations.'
        }
      ]
    },
    'GATE-ME': {
      fullName: 'GATE Mechanical Engineering (Core PSU Recruitment Stream)',
      conductingBody: 'IISc / IITs',
      frequency: 'Once a Year (February)',
      mode: 'Computer Based Test (65 Questions, 100 Marks)',
      duration: '180 Minutes',
      totalMarks: '100 Marks',
      keySellingPoint: 'Highest PSU recruitment volume in India! ONGC, IOCL, NTPC, GAIL, HPCL recruit Mechanical Trainees with ₹18–22 LPA starting CTC.',
      counsellorTip: 'Core branch students from tier-2/3 colleges often feel stuck. GATE is their single most reliable gateway to enter a Maharatna PSU or IIT M.Tech.',
      sectionsBreakdown: [
        {
          subject: 'Thermal & Fluid',
          title: 'Thermodynamics, Fluid Mechanics, Heat Transfer, IC Engines',
          questions: '20–22 Questions',
          marks: '32 Marks',
          weightage: '32% Weightage',
          details: 'Carnot/Rankine/Brayton cycles, boundary layers, Navier-Stokes, conduction/convection/radiation, turbo-machinery.'
        },
        {
          subject: 'Manufacturing & Materials',
          title: 'Production Engineering, Casting, Welding, Machining, Industrial Engg',
          questions: '18–20 Questions',
          marks: '30 Marks',
          weightage: '30% Weightage',
          details: 'Metal forming, tool life equations, CNC, inventory control, operations research, forecasting.'
        },
        {
          subject: 'Design & Math',
          title: 'Engineering Mechanics, Strength of Materials, Theory of Machines + Math',
          questions: '23–25 Questions',
          marks: '38 Marks (Inc. 15M GA)',
          weightage: '38% Weightage',
          details: 'Stresses, Mohr circle, shafts, gears, vibrations, balancing, calculus, numerical methods.'
        }
      ]
    },
    'BARC-SCIENTIFIC': {
      fullName: 'BARC Scientific Officer (OCES/DGFS - Class A Central Gazetted Scientist)',
      conductingBody: 'Bhabha Atomic Research Centre (Department of Atomic Energy)',
      frequency: 'Annual Recruitment (Through GATE Score or Online CBT)',
      mode: 'Screening via GATE or Online Exam -> 45-Min Pure Technical Interview',
      duration: '120 Minutes (Screening)',
      totalMarks: 'Screening Merit (Final Selection 100% on Interview)',
      keySellingPoint: 'Central Govt Class A Gazetted post (Pay Level 10, Gross ₹1.10L/mo + Govt accommodation in Mumbai) doing cutting-edge nuclear and defence research.',
      counsellorTip: 'BARC interview has NO HR or personal questions! It is 100% pure technical blackboard problem solving. PW provides dedicated BARC interview bootcamps.',
      sectionsBreakdown: [
        {
          subject: 'Core Engineering',
          title: '100 Pure Discipline Technical Questions (No Aptitude)',
          questions: '100 Questions (3 Marks each, -1 negative)',
          marks: '300 Marks',
          weightage: '100% Screening',
          details: 'Pure core branch fundamentals testing in-depth derivations, physical concepts, and analytical problem-solving.'
        }
      ]
    }
  };

  const TOP_DESTINATIONS = [
    {
      name: 'Oil and Natural Gas Corporation (ONGC - Maharatna PSU)',
      category: 'Maharatna Central Public Sector Enterprise',
      examTrack: 'GATE CS / ME / EC / EE',
      package: 'Starting CTC ₹21.00 LPA (Basic ₹60,000 + 35% Perks + PRP)',
      cutoff: 'GATE Score 820+ / 1000 (AIR Top 150–200)',
      type: 'MAHARATNA',
      highlights: 'India’s top crude oil & energy giant. Full medical coverage, company quarters in Dehradun/Mumbai, fast promotions to Executive Director level.'
    },
    {
      name: 'Indian Oil Corporation Limited (IOCL - Fortune 500)',
      category: 'Maharatna PSU (#1 Commercial Enterprise)',
      examTrack: 'GATE CS / ME / EC / CE',
      package: 'Starting CTC ₹17.50 LPA + Subsidized Housing & Fuel Allowance',
      cutoff: 'GATE Score 800+ / 1000 (AIR Top 250)',
      type: 'MAHARATNA',
      highlights: 'Recruits Graduate Engineers directly through GATE score. 85% GATE weightage + 15% Group Discussion and Personal Interview.'
    },
    {
      name: 'Indian Institute of Technology Bombay (IIT-B)',
      category: 'Institute of National Importance (NIRF Engineering #3)',
      examTrack: 'GATE CS / DA / EC',
      package: 'Average M.Tech CTC ₹28.50 LPA • Highest Domestic ₹54 LPA',
      cutoff: 'GATE Score 750+ (AIR Top 250 in CS)',
      type: 'IITS',
      highlights: 'Top recruiters: Google, Microsoft, Qualcomm, Apple, Nvidia, Morgan Stanley. M.Tech students receive ₹12,400/mo AICTE teaching assistantship.'
    },
    {
      name: 'Indian Institute of Science (IISc Bangalore)',
      category: 'Apex Research Institution of India (NIRF Overall #1)',
      examTrack: 'GATE CS / DA / EC',
      package: 'Average CTC ₹30.20 LPA (AI, Systems & Robotics R&D)',
      cutoff: 'GATE Score 850+ (AIR Top 80 in GATE CS/DA)',
      type: 'IITS',
      highlights: 'World-renowned computing faculty. Direct pathways to global research scientist roles and Silicon Valley tech giants.'
    },
    {
      name: 'Bhabha Atomic Research Centre (BARC)',
      category: 'Department of Atomic Energy (Class A Gazetted Post)',
      examTrack: 'BARC-SCIENTIFIC / GATE Score',
      package: 'Pay Level 10 (Gross ~₹1,10,000/mo + Lifetime Govt Quarters)',
      cutoff: 'GATE Score 780+ for Direct Interview Call',
      type: 'RESEARCH',
      highlights: '1-year orientation course at BARC Training School with ₹55,000/mo stipend followed by absorption as Scientific Officer ‘C’.'
    }
  ];

  const filteredDestinations = useMemo(() => {
    return TOP_DESTINATIONS.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.examTrack.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.package.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || d.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  // 10-Second Eligibility calculation
  const eligibilityVerdict = useMemo(() => {
    const isEngg = elYear !== 'DIPLOMA';
    const is3rdOr4th = elYear === '3RD_YEAR' || elYear === '4TH_YEAR' || elYear === 'GRADUATED';
    const psuMaxAge = elCategory === 'SC_ST' ? 31 : elCategory === 'OBC' ? 29 : 26;
    const isPsuAgeEligible = elAge <= psuMaxAge;

    return {
      gateEligible: is3rdOr4th,
      psuEligible: is3rdOr4th && isPsuAgeEligible && elYear !== '3RD_YEAR',
      psuMaxAge,
      summary: is3rdOr4th && elYear === '3RD_YEAR'
        ? '3rd Year Student: FULLY ELIGIBLE for GATE! Valid score for 3 full years. Can sit for IIT M.Tech immediately after graduation!'
        : is3rdOr4th && isPsuAgeEligible
        ? `FULLY ELIGIBLE for both Maharatna PSUs (Age ${elAge} <= ${psuMaxAge}) and IIT M.Tech with ₹12,400/mo stipend!`
        : is3rdOr4th && !isPsuAgeEligible
        ? `ELIGIBLE for IIT M.Tech, Ph.D. & BARC Scientific Officer (Exceeded typical PSU 26-28 age limit, but NO AGE LIMIT for GATE / IIT admissions!)`
        : 'Engineering diploma students must complete lateral entry B.Tech 3rd year to be eligible for GATE.'
    };
  }, [elYear, elBranch, elCategory, elAge]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            >
              ← Back to Categories
            </button>
            <span className="text-xs font-bold px-2 py-0.5 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full">
              LIVE COCKPIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-violet-400" />
            GATE & PSU Recruitment Counsellor Cockpit
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Everything an EdTech counsellor needs on live calls: Maharatna PSU recruitment (ONGC/IOCL ₹21 LPA), IIT M.Tech (₹12,400/mo stipend), GATE CS/DA/EC/ME patterns, score cutoffs, and conversion scripts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('pitch')}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-violet-900/30 transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            Live Call Pitch
          </button>
          <button
            onClick={onOpenFitmentModal}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            Fitment Matrix
          </button>
        </div>
      </div>

      {/* Maharatna PSU & IIT M.Tech Dual-Advantage Ribbon */}
      <div className="bg-gradient-to-r from-violet-950/60 via-slate-900 to-indigo-950/60 border border-violet-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                Dual Career Guarantee
              </span>
              <span className="text-xs text-slate-400">One Exam, Two High-Value Outcomes</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Maharatna PSU Job (CTC ₹18–22 LPA) OR Top IIT M.Tech with ₹12,400/Month Stipend
            </h3>
            <p className="text-xs text-slate-300">
              Unlike IT service company campus placements (₹3.5–4.5 LPA), a strong GATE rank instantly opens executive PSU officer positions or tier-1 IIT postgrad seats.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pitch')}
            className="text-xs font-bold px-3.5 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 rounded-xl transition-all"
          >
            View PSU Call Pitch →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'exams', label: '1. Exam Tracks & Pattern', icon: Target },
          { id: 'psus_iits', label: '2. Top PSUs & IITs', icon: Building2 },
          { id: 'cutoffs', label: '3. Official GATE Scores', icon: TrendingUp },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall },
          { id: 'eligibility', label: '5. 10s Eligibility Check', icon: Shield },
          { id: 'courses', label: '6. PW GATE Courses', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as GateTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30 border border-violet-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-violet-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXAM TRACKS */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            {[
              { code: 'GATE-CS', label: 'GATE CS & IT', badge: 'Top Placements' },
              { code: 'GATE-DA', label: 'GATE Data Science & AI', badge: 'New Hot Track' },
              { code: 'GATE-EC', label: 'GATE Electronics (EC)', badge: 'VLSI & ISRO' },
              { code: 'GATE-ME', label: 'GATE Mechanical (ME)', badge: 'Max PSU Seats' },
              { code: 'BARC-SCIENTIFIC', label: 'BARC Scientific Officer', badge: 'Class A Gazetted' }
            ].map(track => {
              const isSelected = selectedExamCode === track.code;
              return (
                <button
                  key={track.code}
                  onClick={() => setSelectedExamCode(track.code as GateExamCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-800 text-violet-400 border-violet-500 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{track.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-violet-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {track.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {(() => {
            const exam = EXAM_DATA[selectedExamCode];
            return (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                      Official Blueprint
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">{exam.fullName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Organizing Body: <span className="text-slate-200 font-semibold">{exam.conductingBody}</span> • Frequency: <span className="text-slate-200 font-semibold">{exam.frequency}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⏱ {exam.duration}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      💻 {exam.mode}
                    </span>
                    <span className="bg-violet-500/20 text-violet-300 px-3 py-1.5 rounded-lg border border-violet-500/30 font-black">
                      🎯 {exam.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-violet-950/30 border border-violet-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Sparkles className="w-4 h-4" />
                      Student Value Proposition
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.keySellingPoint}
                    </p>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Target className="w-4 h-4" />
                      Counsellor Call Insight
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.counsellorTip}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Syllabus Distribution & High-Yield Sections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exam.sectionsBreakdown.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-850/80 border border-slate-800 hover:border-violet-500/40 rounded-xl p-4 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-black text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
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
                          <span className="text-violet-300">{sec.marks}</span>
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

      {/* TAB 2: TOP PSUS & IITS */}
      {activeTab === 'psus_iits' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ONGC, IOCL, IIT Bombay, packages..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All Recruiter Types' },
                { id: 'MAHARATNA', label: 'Maharatna PSUs' },
                { id: 'IITS', label: 'Premier IITs & IISc' },
                { id: 'RESEARCH', label: 'Govt Research Labs' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDestinations.map((dest, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                      {dest.category}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{dest.name}</h3>
                    <p className="text-xs text-slate-400">{dest.examTrack}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {dest.package.split('•')[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{dest.highlights}</p>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Compensation Package:</span>
                    <span className="text-emerald-400 font-bold text-right">{dest.package}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Required GATE Score:</span>
                    <span className="text-violet-300 font-semibold text-right">{dest.cutoff}</span>
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                Official Benchmarks
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                GATE Qualifying Marks & IIT / PSU Cutoff Scores
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Target GATE Marks (out of 100) and normalized GATE Scores (out of 1000) for admission and recruitment.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold uppercase">Discipline</th>
                    <th className="py-3 px-4 font-bold uppercase">Qualifying Marks (Gen)</th>
                    <th className="py-3 px-4 font-bold uppercase">IIT Bombay / IISc M.Tech</th>
                    <th className="py-3 px-4 font-bold uppercase">Maharatna PSU Call</th>
                    <th className="py-3 px-4 font-bold uppercase">NIT Top Call (CCMT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      Computer Science (CS)
                    </td>
                    <td className="py-3 px-4 text-slate-300">~27.5–32.0 / 100M</td>
                    <td className="py-3 px-4 text-violet-300 font-bold">GATE Score 750+ (AIR &lt; 250)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">GATE Score 820+ (AIR &lt; 150)</td>
                    <td className="py-3 px-4 text-slate-300">Score 580–650</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      Data Science & AI (DA)
                    </td>
                    <td className="py-3 px-4 text-slate-300">~30.0–35.0 / 100M</td>
                    <td className="py-3 px-4 text-violet-300 font-bold">GATE Score 780+ (AIR &lt; 200)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">GATE Score 810+ (AI Specialist)</td>
                    <td className="py-3 px-4 text-slate-300">Score 600–680</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      Electronics (EC)
                    </td>
                    <td className="py-3 px-4 text-slate-300">~25.0–29.0 / 100M</td>
                    <td className="py-3 px-4 text-violet-300 font-bold">Score 760+ (VLSI Tech)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">Score 830+ (BEL, IOCL)</td>
                    <td className="py-3 px-4 text-slate-300">Score 550–630</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      Mechanical (ME)
                    </td>
                    <td className="py-3 px-4 text-slate-300">~28.0–34.0 / 100M</td>
                    <td className="py-3 px-4 text-violet-300 font-bold">Score 780+ (Design & Thermal)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">Score 840+ (ONGC, IOCL, NTPC)</td>
                    <td className="py-3 px-4 text-slate-300">Score 560–640</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-violet-950/20 border border-violet-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="text-violet-400 font-bold uppercase tracking-wider">Counsellor Closing Argument:</span>
              <p>
                Qualifying GATE requires only <strong>~28–32 marks out of 100</strong>! With 15 marks of General Aptitude and 13 marks of Engineering Mathematics, a student who prepares systematically with PW test series can easily lock in 25+ marks in just the first hour of the test.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-violet-950/40 border border-violet-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
                High-Conversion Script
              </span>
              <span className="text-xs text-slate-400 font-semibold">Duration: 60 Seconds</span>
            </div>
            <h2 className="text-xl font-black text-white">
              The 60-Second GATE & Maharatna PSU Phone Pitch
            </h2>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <p>
                <span className="text-violet-400 font-bold">[Opening Hook]:</span> "Hello <span className="text-yellow-300 font-semibold">[Student Name]</span>! Most engineering students settle for a ₹3.5–4.5 LPA campus job because nobody told them that with GATE, Maharatna PSUs like ONGC and IOCL recruit fresh graduates directly at <strong>₹21 LPA starting CTC</strong>!"
              </p>
              <p>
                <span className="text-violet-400 font-bold">[Dual Security]:</span> "And if you want higher studies, a strong GATE rank gets you into IIT Bombay, IIT Madras, or IISc Bangalore for M.Tech, where you get a <strong>₹12,400/month government stipend</strong> while studying, and top tech companies recruit graduates at ₹26–32 LPA."
              </p>
              <p>
                <span className="text-violet-400 font-bold">[3rd Year Advantage]:</span> "Best of all, you don't have to wait until graduation. 3rd year engineering students are 100% eligible to write GATE! Your scorecard is valid for 3 full years."
              </p>
              <p>
                <span className="text-violet-400 font-bold">[PW Advantage]:</span> "In PW’s Parakram batch, you learn directly from top rankers and ex-IITians with complete PYQ question banks, daily practice problems, and national mock tests. Shall we secure your seat for this cycle?"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Top 3 Engineering Student Objections Handled
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 1:</div>
                <h4 className="text-sm font-bold text-white">"I am from a tier-3 private college, can I compete with IITians?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-violet-400">Response:</strong> "Over 80% of top 500 GATE rankers come from tier-2 and tier-3 colleges! The exam is 100% objective and standardized. Your college name does not matter—only your conceptual accuracy on the 65 questions."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 2:</div>
                <h4 className="text-sm font-bold text-white">"College semester exams and GATE syllabus clash"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-violet-400">Response:</strong> "GATE syllabus is identical to your B.Tech core subjects! When you prepare Operating Systems, DBMS, or Thermodynamics for GATE, you automatically score 9+ SGPA in your semester exams."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 3:</div>
                <h4 className="text-sm font-bold text-white">"Negative marking in NAT questions worries me"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-violet-400">Response:</strong> "Numerical Answer Type (NAT) and Multiple Select Questions (MSQ) have ZERO negative marking! That is 40–50% of the paper with zero penalty for honest attempts."
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
            <span className="text-xs font-extrabold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">
              Instant Phone Rule
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              10-Second GATE & PSU Eligibility Checker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly verify whether a student is eligible for GATE, 3rd year early attempt, or PSU recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Current College Year</label>
              <select
                value={elYear}
                onChange={(e) => setElYear(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="3RD_YEAR">B.Tech 3rd Year (Pre-Final)</option>
                <option value="4TH_YEAR">B.Tech 4th Year (Final Year)</option>
                <option value="GRADUATED">B.Tech / B.E. Graduate</option>
                <option value="DIPLOMA">Polytechnic Diploma</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Engineering Stream</label>
              <select
                value={elBranch}
                onChange={(e) => setElBranch(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="CS_IT">Computer Science / IT</option>
                <option value="EC_EE">Electronics / Electrical</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="OTHER">Chemical / Allied Branches</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Category</label>
              <select
                value={elCategory}
                onChange={(e) => setElCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="GEN">General / EWS</option>
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
                max={35}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl border bg-violet-950/30 border-violet-500/40 space-y-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Eligibility Result
            </div>
            <h3 className="text-base font-black text-white">{eligibilityVerdict.summary}</h3>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className={`px-2.5 py-1 rounded font-bold ${
                eligibilityVerdict.gateEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                GATE Exam: {eligibilityVerdict.gateEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
              </span>
              <span className={`px-2.5 py-1 rounded font-bold ${
                eligibilityVerdict.psuEligible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                PSU Executive Call: {eligibilityVerdict.psuEligible ? 'ELIGIBLE (Within Age Limit)' : `Age Limit: Max ${eligibilityVerdict.psuMaxAge} Yrs`}
              </span>
              <span className="px-2.5 py-1 rounded font-bold bg-violet-500/20 text-violet-300">
                Score Validity: 3 Years
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PW COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Recommended Batches for GATE Aspirants</h2>
              <p className="text-xs text-slate-400">Parakram & Shreshth batches covering complete theory, DPPs, test series, and PSU interview guidance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-violet-500/10 text-violet-400">
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
                      className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Pitch This Course Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Dedicated GATE & PSU batches are pre-configured. Use the pitch script above on calls!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
