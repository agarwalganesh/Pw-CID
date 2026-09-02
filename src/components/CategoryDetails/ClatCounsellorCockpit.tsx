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
  Scale,
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

interface ClatCounsellorCockpitProps {
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

type ClatTab = 'exams' | 'nlus' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type ClatExamCode = 'CLAT-UG' | 'AILET' | 'CLAT-PG' | 'SLAT';

export const ClatCounsellorCockpit: React.FC<ClatCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<ClatTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<ClatExamCode>('CLAT-UG');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'TOP_NLUS' | 'SPECIALIZED'>('ALL');

  // 10-Second Eligibility State
  const [elQual, setElQual] = useState<'12TH_APPEARING' | '12TH_PASSED' | 'GRADUATE'>('12TH_APPEARING');
  const [elPercentage, setElPercentage] = useState<number>(82);
  const [elCategory, setElCategory] = useState<'GEN' | 'OBC' | 'SC_ST'>('GEN');

  const EXAM_DATA: Record<ClatExamCode, {
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
    'CLAT-UG': {
      fullName: 'Common Law Admission Test (5-Year Integrated B.A./BBA LL.B. Hons)',
      conductingBody: 'Consortium of 26 National Law Universities (NLUs)',
      frequency: 'Once a Year (First Sunday of December)',
      mode: 'Offline Pen & Paper (OMR) • 120 Passage-Based Questions',
      duration: '120 Minutes (2 Hours)',
      totalMarks: '120 Marks (+1 for Correct, -0.25 for Incorrect)',
      keySellingPoint: 'Single entrance for 26 premier National Law Universities with starting salaries of ₹18 to ₹22 LPA in Tier-1 corporate law firms (Trilegal, CAM, SAM, Khaitan & Co)!',
      counsellorTip: 'Clarify the biggest myth: Students DO NOT need prior knowledge of Indian law! The exam tests critical reading comprehension of passages (~450 words) provided directly in the question paper.',
      sectionsBreakdown: [
        {
          subject: 'Legal Reasoning',
          title: 'Passage-Based Principle Application (No Prior Law Needed)',
          questions: '28–32 Questions (~6 Passages)',
          marks: '28–32 Marks',
          weightage: '25% of Paper',
          details: 'Fact-principle problems in Constitutional Law, Torts, Contracts, Criminal Law, and Contemporary Legal Scenarios.'
        },
        {
          subject: 'Current Affairs & GK',
          title: 'Contemporary National & International Legal GK',
          questions: '28–32 Questions',
          marks: '28–32 Marks',
          weightage: '25% of Paper',
          details: 'Passage-based questions evaluating awareness of landmark judgments, international summits, treaties, and socio-economic policies.'
        },
        {
          subject: 'English & Logic',
          title: 'Reading Comprehension (24M) + Critical Reasoning (24M)',
          questions: '48 Questions',
          marks: '48 Marks',
          weightage: '40% of Paper',
          details: 'Contextual vocabulary, inferences, argument structure, strengthening/weakening assertions, paradoxes, logical deductions.'
        }
      ]
    },
    'AILET': {
      fullName: 'All India Law Entrance Test (Exclusive NLU Delhi Entrance)',
      conductingBody: 'National Law University, Delhi (Autonomous)',
      frequency: 'Once a Year (Second Sunday of December)',
      mode: 'Offline Pen & Paper (OMR) • 150 Questions',
      duration: '120 Minutes (2 Hours Speed Test)',
      totalMarks: '150 Marks (+1 for Correct, -0.25 for Incorrect)',
      keySellingPoint: 'Exclusive gateway to National Law University, Delhi (NIRF Law Rank #2 in India), independent of the CLAT Consortium.',
      counsellorTip: 'AILET does not have a separate Legal Aptitude section anymore! Logical Reasoning carries 70 marks (almost 50% of the paper) with integrated legal reasoning passages.',
      sectionsBreakdown: [
        {
          subject: 'Logical Reasoning',
          title: 'Critical & Analytical Reasoning (Includes Legal Thinking)',
          questions: '70 Questions',
          marks: '70 Marks',
          weightage: '47% Merit Decider',
          details: 'Advanced critical reasoning, argument analysis, premise-conclusion structures, puzzle logic, and legal deduction.'
        },
        {
          subject: 'English Language',
          title: 'Advanced Comprehension, Vocabulary & Expression',
          questions: '50 Questions',
          marks: '50 Marks',
          weightage: '33% Weightage',
          details: 'High-density reading passages, tone analysis, figurative meanings, advanced contextual vocabulary.'
        },
        {
          subject: 'Current Affairs & GK',
          title: 'Current National Affairs & Static General Knowledge',
          questions: '30 Questions',
          marks: '30 Marks',
          weightage: '20% Weightage',
          details: 'Contemporary legal developments, international diplomacy, science, historical milestones, awards.'
        }
      ]
    },
    'CLAT-PG': {
      fullName: 'CLAT Post-Graduate (1-Year Master of Laws LL.M. & PSU Law Officer)',
      conductingBody: 'Consortium of NLUs',
      frequency: 'Once a Year (December)',
      mode: 'Offline OMR • 120 Objective MCQs based on Case Law',
      duration: '120 Minutes',
      totalMarks: '120 Marks',
      keySellingPoint: 'Direct recruitment of Law Officers in Maharatna PSUs (ONGC, IOCL, NTPC, BHEL) with starting packages of ₹18+ LPA + LL.M. from NLSIU.',
      counsellorTip: 'CLAT PG evaluates deep understanding of Constitutional Law, Jurisprudence, and Supreme Court judgments delivered in the last 12 months.',
      sectionsBreakdown: [
        {
          subject: 'Core Constitutional',
          title: 'Constitutional Law & Jurisprudence (Primary Focus)',
          questions: '60 Questions',
          marks: '60 Marks',
          weightage: '50% of Paper',
          details: 'Fundamental rights, judicial review, separation of powers, natural law, analytical positivism, legal realism.'
        },
        {
          subject: 'Allied Law Branches',
          title: 'Criminal Law, Torts, Contracts, IPR, International Law',
          questions: '60 Questions',
          marks: '60 Marks',
          weightage: '50% of Paper',
          details: 'IPC, Contract Act, Specific Relief, Cyber Law, Environmental Law, Public International Law.'
        }
      ]
    },
    'SLAT': {
      fullName: 'Symbiosis Law Aptitude Test (SLS Pune, SLS Noida, SLS Hyderabad)',
      conductingBody: 'Symbiosis International (Deemed University)',
      frequency: 'Once a Year (May)',
      mode: 'Computer Based Test (CBT) • 60 Questions',
      duration: '60 Minutes (Speed Test)',
      totalMarks: '60 Marks -> Scaled to 50 + 50 Marks PI-WAT',
      keySellingPoint: 'SLS Pune is India’s top private law school with corporate firm placements on par with top 5 NLUs.',
      counsellorTip: 'SLAT is a speed test with 60 questions in 60 minutes and ZERO negative marking! Perfect alternative for students aiming for corporate law.',
      sectionsBreakdown: [
        {
          subject: '5 Sections (12 Qs Each)',
          title: 'Logical, Legal, Analytical, Reading Comprehension, GK',
          questions: '60 Questions (12 per section)',
          marks: '60 Marks (NO NEGATIVE MARKING)',
          weightage: 'Written Screening (50%)',
          details: 'Direct fast questions covering legal principles, logical deduction, arithmetic reasoning, current events.'
        }
      ]
    }
  };

  const TOP_NLUS = [
    {
      name: 'National Law School of India University (NLSIU Bengaluru)',
      location: 'Nagarbhavi, Bengaluru, Karnataka',
      rank: 'NIRF Law Rank #1 for 7 Consecutive Years (The Harvard of the East)',
      examTrack: 'CLAT-UG',
      package: 'Average CTC ₹21.50 LPA • Highest Domestic ₹24 LPA • International £100k+',
      cutoff: 'AIR 1 – 105 (General Category)',
      type: 'TOP_NLUS',
      highlights: '100% placement rate in premier Tier-1 corporate law firms (Shardul Amarchand Mangaldas, Trilegal, Khaitan & Co) and global Magic Circle firms in London & Singapore.'
    },
    {
      name: 'National Law University, Delhi (NLU Delhi)',
      location: 'Dwarka, New Delhi',
      rank: 'NIRF Law Rank #2 in India',
      examTrack: 'AILET',
      package: 'Average CTC ₹20.00 LPA • Median ₹18.50 LPA',
      cutoff: 'AILET AIR 1 – 90 (General)',
      type: 'TOP_NLUS',
      highlights: 'Prime capital advantage. Direct judicial clerkships with Supreme Court Judges, international moot court champions, elite litigation and corporate recruitment.'
    },
    {
      name: 'NALSAR University of Law (Hyderabad)',
      location: 'Shamirpet, Hyderabad, Telangana',
      rank: 'NIRF Law Rank #3',
      examTrack: 'CLAT-UG',
      package: 'Average CTC ₹19.80 LPA • Highest ₹22 LPA',
      cutoff: 'CLAT AIR 106 – 260',
      type: 'TOP_NLUS',
      highlights: 'Pioneer of contemporary corporate and intellectual property law in India. Massive alumni presence as partners in top law firms.'
    },
    {
      name: 'The West Bengal National University of Juridical Sciences (WBNUJS Kolkata)',
      location: 'Salt Lake City, Kolkata',
      rank: 'NIRF Law Rank #4',
      examTrack: 'CLAT-UG',
      package: 'Average CTC ₹19.50 LPA',
      cutoff: 'CLAT AIR 100 – 260',
      type: 'TOP_NLUS',
      highlights: 'Corporate powerhouse. Unrivaled track record in banking and finance law, mergers & acquisitions, and international commercial arbitration.'
    }
  ];

  const filteredNlus = useMemo(() => {
    return TOP_NLUS.filter(n => {
      const matchesSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.package.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || n.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  // 10-Second Eligibility calculation
  const eligibilityVerdict = useMemo(() => {
    const minPct = elCategory === 'SC_ST' ? 40 : 45;
    const isPctEligible = elPercentage >= minPct;
    const isQualEligible = elQual === '12TH_APPEARING' || elQual === '12TH_PASSED' || elQual === 'GRADUATE';

    return {
      isEligible: isQualEligible && isPctEligible,
      minPct,
      summary: isQualEligible && isPctEligible
        ? `FULLY ELIGIBLE for CLAT UG & AILET! Class 12th percentage of ${elPercentage}% comfortably meets the ${minPct}% threshold. NO UPPER AGE LIMIT!`
        : `Requires minimum ${minPct}% marks in Class 12th (Current: ${elPercentage}%). Students appearing for board exams can apply provisionally.`
    };
  }, [elQual, elPercentage, elCategory]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            >
              ← Back to Categories
            </button>
            <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
              LIVE COCKPIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Scale className="w-8 h-8 text-emerald-400" />
            CLAT & Premier Law Admissions Intelligence Cockpit
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Everything an EdTech counsellor needs on live calls: CLAT UG, AILET (NLU Delhi), NLSIU Bengaluru (NIRF #1), Tier-1 law firm packages (₹18–22 LPA), official cutoffs, and conversion scripts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('pitch')}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            Live Call Pitch
          </button>
          <button
            onClick={onOpenFitmentModal}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Fitment Matrix
          </button>
        </div>
      </div>

      {/* Tier-1 Law Firm Package & Corporate Prestige Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                Tier-1 Corporate Law Careers
              </span>
              <span className="text-xs text-slate-400">Starting CTC ₹18–22 LPA at Age 23</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              NLUs Match IIMs in Starting Packages: ₹18.00 to ₹22.00 LPA in Top Law Firms & MNCs!
            </h3>
            <p className="text-xs text-slate-300">
              Graduating from a top National Law University (NLSIU, NALSAR, NLU Delhi) guarantees recruitment into prestigious corporate law firms like Trilegal, Cyril Amarchand Mangaldas, and Khaitan & Co.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pitch')}
            className="text-xs font-bold px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl transition-all"
          >
            View Parent Pitch →
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'exams', label: '1. Law Exam Tracks', icon: Target },
          { id: 'nlus', label: '2. Top 26 NLUs & Packages', icon: Building2 },
          { id: 'cutoffs', label: '3. Official CLAT Cutoffs', icon: TrendingUp },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall },
          { id: 'eligibility', label: '5. 10s Eligibility Check', icon: Shield },
          { id: 'courses', label: '6. PW Law Batches', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ClatTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
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
              { code: 'CLAT-UG', label: 'CLAT UG (26 NLUs)', badge: '120 Passages' },
              { code: 'AILET', label: 'AILET (NLU Delhi)', badge: 'NIRF Law #2' },
              { code: 'CLAT-PG', label: 'CLAT PG (LL.M. & PSU)', badge: 'PSU Law Officer' },
              { code: 'SLAT', label: 'SLAT (Symbiosis Pune)', badge: 'Premier Private' }
            ].map(track => {
              const isSelected = selectedExamCode === track.code;
              return (
                <button
                  key={track.code}
                  onClick={() => setSelectedExamCode(track.code as ClatExamCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-800 text-emerald-400 border-emerald-500 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{track.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
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
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      Official Blueprint
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">{exam.fullName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Conducting Body: <span className="text-slate-200 font-semibold">{exam.conductingBody}</span> • Frequency: <span className="text-slate-200 font-semibold">{exam.frequency}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⏱ {exam.duration}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      📝 {exam.mode}
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-black">
                      🎯 {exam.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
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
                    Syllabus Distribution & Passage-Based Sections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exam.sectionsBreakdown.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-850/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                              {sec.subject}
                            </span>
                            <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded">
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
                          <span className="text-emerald-300">{sec.marks}</span>
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

      {/* TAB 2: TOP NLUS */}
      {activeTab === 'nlus' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NLSIU, NALSAR, packages..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All Premier NLUs' },
                { id: 'TOP_NLUS', label: 'Top Tier NLUs' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNlus.map((nlu, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      {nlu.rank}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{nlu.name}</h3>
                    <p className="text-xs text-slate-400">{nlu.location}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-300 border border-slate-700">
                    {nlu.examTrack}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{nlu.highlights}</p>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Campus Placement CTC:</span>
                    <span className="text-emerald-400 font-bold text-right">{nlu.package}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Admission Cutoff Rank:</span>
                    <span className="text-emerald-300 font-semibold text-right">{nlu.cutoff}</span>
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                Official Consortium Benchmarks
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                CLAT UG & AILET Official Cutoffs & Rank Targets
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Target score out of 120 marks and All India Ranks needed for admission into top National Law Universities.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold uppercase">National Law University</th>
                    <th className="py-3 px-4 font-bold uppercase">General Rank Target</th>
                    <th className="py-3 px-4 font-bold uppercase">Approx Marks / 120</th>
                    <th className="py-3 px-4 font-bold uppercase">OBC Target Rank</th>
                    <th className="py-3 px-4 font-bold uppercase">SC / ST Target Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      NLSIU Bengaluru (NIRF #1)
                    </td>
                    <td className="py-3 px-4 text-emerald-300 font-bold">AIR 1 – 105</td>
                    <td className="py-3 px-4 text-white font-bold">~98–104 / 120</td>
                    <td className="py-3 px-4 text-slate-300">AIR 400 – 650</td>
                    <td className="py-3 px-4 text-slate-300">AIR 1800 – 3200</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      NLU Delhi (AILET Exam)
                    </td>
                    <td className="py-3 px-4 text-emerald-300 font-bold">AILET AIR 1 – 90</td>
                    <td className="py-3 px-4 text-white font-bold">~88–95 / 150</td>
                    <td className="py-3 px-4 text-slate-300">AILET AIR 350 – 500</td>
                    <td className="py-3 px-4 text-slate-300">AILET AIR 1200 – 2200</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      NALSAR Hyderabad (NIRF #3)
                    </td>
                    <td className="py-3 px-4 text-emerald-300 font-bold">AIR 106 – 260</td>
                    <td className="py-3 px-4 text-white font-bold">~94–98 / 120</td>
                    <td className="py-3 px-4 text-slate-300">AIR 800 – 1200</td>
                    <td className="py-3 px-4 text-slate-300">AIR 3500 – 4800</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      WBNUJS Kolkata (NIRF #4)
                    </td>
                    <td className="py-3 px-4 text-emerald-300 font-bold">AIR 261 – 440</td>
                    <td className="py-3 px-4 text-white font-bold">~90–94 / 120</td>
                    <td className="py-3 px-4 text-slate-300">AIR 1400 – 1800</td>
                    <td className="py-3 px-4 text-slate-300">AIR 5000 – 6500</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      Top 10 NLUs Composite Range
                    </td>
                    <td className="py-3 px-4 text-emerald-300 font-bold">AIR 1 – 1500</td>
                    <td className="py-3 px-4 text-white font-bold">~80–88 / 120</td>
                    <td className="py-3 px-4 text-slate-300">AIR 2500 – 4000</td>
                    <td className="py-3 px-4 text-slate-300">AIR 8000 – 12000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider">Counsellor Closing Argument:</span>
              <p>
                To get into a top NLU, students only need around <strong>82 to 92 marks out of 120</strong>! That gives them a safety cushion of missing 28–38 marks. In PW's CLAT batch, weekly speed simulations build the reading comprehension rate to easily attempt 110+ questions in 120 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                High-Conversion Parent Pitch
              </span>
              <span className="text-xs text-slate-400 font-semibold">Duration: 60 Seconds</span>
            </div>
            <h2 className="text-xl font-black text-white">
              The 60-Second CLAT & Corporate Law Career Pitch
            </h2>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <p>
                <span className="text-emerald-400 font-bold">[Opening Hook]:</span> "Namaste <span className="text-yellow-300 font-semibold">[Parent/Student Name]</span>! When people think of law, they imagine courtroom disputes. But are you aware that graduates from top National Law Universities (NLUs) work as corporate counsels in multinational firms like Trilegal and Cyril Amarchand with starting salary packages of <strong>₹18 to ₹22 Lakhs per annum</strong> right at the age of 23?"
              </p>
              <p>
                <span className="text-emerald-400 font-bold">[No Rote Memorization Myth]:</span> "And the biggest relief: CLAT does not require memorizing thick law books or section numbers! The exam is <strong>100% passage-based reading comprehension</strong> that tests logical thinking, current affairs, and basic English."
              </p>
              <p>
                <span className="text-emerald-400 font-bold">[Timing Advantage]:</span> "CLAT happens in December of Class 12th. That means your child clears their college admission 3 months before their board exams, completely stress-free!"
              </p>
              <p>
                <span className="text-emerald-400 font-bold">[PW Advantage]:</span> "In PW’s Law Foundation batch, NLSIU alumni and top educators train students in daily newspaper decoding, speed reading, and 50+ full-length OMR mocks. Let’s secure your child's batch enrollment today!"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Top 3 CLAT Objections Handled by Counsellor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 1:</div>
                <h4 className="text-sm font-bold text-white">"Will CLAT preparation affect my Class 12th Board Marks?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Response:</strong> "Quite the opposite! CLAT English, Reading Comprehension, and Current Affairs directly strengthen your Class 12th language and humanities scores. Plus, CLAT finishes in December—leaving January to March 100% clear for board exams!"
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 2:</div>
                <h4 className="text-sm font-bold text-white">"I am a Science / Commerce student, can I do CLAT?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Response:</strong> "Over 40% of NLSIU students come from Science and Commerce backgrounds! The analytical rigor of math and science students actually gives them an edge in Logical and Legal Reasoning sections."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 3:</div>
                <h4 className="text-sm font-bold text-white">"Is Maths compulsory for CLAT?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Response:</strong> "Quantitative Techniques is only 10 to 12 questions based on 10th standard basic percentages, ratios, and data interpretation caselets. Even students without Class 11/12 Maths easily score 8–10 marks with PW's shortcut techniques."
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
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
              Instant Phone Rule
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              10-Second CLAT & NLU Eligibility Checker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify eligibility for CLAT UG across general, OBC, and SC/ST categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Education Status</label>
              <select
                value={elQual}
                onChange={(e) => setElQual(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="12TH_APPEARING">Class 12th Appearing (Any Stream)</option>
                <option value="12TH_PASSED">Class 12th Passed</option>
                <option value="GRADUATE">College Graduate (LL.B. Track)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Class 12th Aggregate (%)</label>
              <input
                type="number"
                value={elPercentage}
                onChange={(e) => setElPercentage(Number(e.target.value))}
                min={35}
                max={100}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Reservation Category</label>
              <select
                value={elCategory}
                onChange={(e) => setElCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="GEN">General / EWS (Min 45%)</option>
                <option value="OBC">OBC (Min 45%)</option>
                <option value="SC_ST">SC / ST / PwD (Min 40%)</option>
              </select>
            </div>
          </div>

          <div className="p-5 rounded-xl border bg-emerald-950/30 border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Eligibility Result
            </div>
            <h3 className="text-base font-black text-white">{eligibilityVerdict.summary}</h3>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded font-bold bg-emerald-500/20 text-emerald-300">
                Upper Age Limit: NONE (No Age Barrier in CLAT)
              </span>
              <span className="px-2.5 py-1 rounded font-bold bg-slate-800 text-slate-300">
                Minimum Percentage Required: {eligibilityVerdict.minPct}%
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
              <h2 className="text-lg font-black text-white">Recommended Batches for Law Aspirants</h2>
              <p className="text-xs text-slate-400">PW CLAT Target batches with NLSIU mentor sessions, OMR sheets, and masterclasses.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
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
                      className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Pitch This Course Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Dedicated CLAT & AILET batches are pre-configured. Use the pitch script above on calls!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
