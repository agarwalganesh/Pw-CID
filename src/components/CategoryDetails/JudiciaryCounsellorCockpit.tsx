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
  Gavel,
  DollarSign
} from 'lucide-react';

interface JudiciaryCounsellorCockpitProps {
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

type JudTab = 'exams' | 'cadres' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type JudExamCode = 'DJS' | 'UP-PCS-J' | 'RJS' | 'MP-CJ';

export const JudiciaryCounsellorCockpit: React.FC<JudiciaryCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<JudTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<JudExamCode>('DJS');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'DELHI' | 'STATES'>('ALL');

  // 10-Second Eligibility State
  const [elDegree, setElDegree] = useState<'LLB_3YR' | 'BALLB_5YR' | 'FINAL_YEAR' | 'NON_LAW'>('BALLB_5YR');
  const [elEnrolled, setElEnrolled] = useState<'YES' | 'PENDING'>('YES');
  const [elAge, setElAge] = useState<number>(24);
  const [elState, setElState] = useState<'DELHI' | 'UP' | 'RAJASTHAN' | 'MP'>('DELHI');

  const EXAM_DATA: Record<JudExamCode, {
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
    'DJS': {
      fullName: 'Delhi Judicial Service Examination (Civil Judge / Metropolitan Magistrate)',
      conductingBody: 'High Court of Delhi',
      frequency: 'Annual / Biennial Notification',
      mode: 'Prelims (OMR 200 MCQs) -> Mains (4 Subjective Papers 850M) -> Viva (150M)',
      duration: 'Prelims: 150 Mins • Mains: 3 Hours per Paper',
      totalMarks: '1000 Marks Final Merit (Mains 850M + Viva 150M)',
      keySellingPoint: 'Most prestigious judicial cadre in India! Gross starting salary ~₹1,25,000/mo (NJPC Pay Scale J-1) + Judicial Bungalow in Central Delhi + Staff + Official Car + Police Security.',
      counsellorTip: 'Highlight that DJS Prelims has 25% negative marking and 25% minimum qualifying score. The questions are 100% application and judgment-based, not rote section memorization.',
      sectionsBreakdown: [
        {
          subject: 'Prelims',
          title: 'Objective Screening Test (200 MCQs, Negative 0.25)',
          questions: '200 Questions',
          marks: '200 Marks (25% Cutoff Barrier)',
          weightage: 'Screening Only',
          details: 'General Legal GK, Constitution, CPC, CrPC, IPC, Evidence Act, Contract Act, Arbitration, Commercial Courts Act, POCSO.'
        },
        {
          subject: 'Mains Law I & II',
          title: 'Civil Law I (200M) & Civil Law II (200M)',
          questions: '8 Practical Case Problems per paper',
          marks: '400 Marks',
          weightage: '40% of Final Merit',
          details: 'Contracts, Specific Relief, Delhi Rent Control, Torts, Family Laws, Civil Procedure Code (CPC), Law of Evidence, Limitation Act.'
        },
        {
          subject: 'Mains Criminal & Lang',
          title: 'Criminal Law (200M) + GK & Language Translation (250M)',
          questions: 'Problem-solving & Judgment Writing',
          marks: '450 Marks + 150M Viva',
          weightage: '60% of Final Merit',
          details: 'Indian Penal Code / BNS, CrPC / BNSS, Evidence Act / BSA, Negotiable Instruments Act, Legal Essay, English-Hindi translation.'
        }
      ]
    },
    'UP-PCS-J': {
      fullName: 'Uttar Pradesh Judicial Service Civil Judge (Junior Division)',
      conductingBody: 'UPPSC & High Court of Judicature at Allahabad',
      frequency: 'Regular Notification with Large Vacancies (300+ Posts)',
      mode: 'Prelims (GS 150M + Law 300M = 450M) -> Mains (6 Papers, 1000M) -> Viva (100M)',
      duration: 'Prelims: 2 Hours per Paper • Mains: 3 Hours per Paper',
      totalMarks: '1100 Marks Final Selection (Mains 1000M + Interview 100M)',
      keySellingPoint: 'Highest number of judicial vacancies in North India! Direct appointment as Civil Judge (Junior Division) across 75 districts of Uttar Pradesh.',
      counsellorTip: 'In UP PCS-J, General Studies in Prelims carries 150 marks and Paper 1 in Mains carries 200 marks! Law students who study static GS and UP Local Acts clear with top ranks.',
      sectionsBreakdown: [
        {
          subject: 'Prelims Paper 1',
          title: 'General Studies (History, Geography, Polity, Science, Current Acts)',
          questions: '150 Questions',
          marks: '150 Marks (Negative 0.33)',
          weightage: '33% of Prelims',
          details: 'Indian History, Culture, Geography, Polity, Current National Affairs + 9 Special Acts for Women, Children, and Senior Citizens.'
        },
        {
          subject: 'Prelims Paper 2',
          title: 'Law (Jurisprudence, International Law, Constitution & Core Laws)',
          questions: '150 Questions (2 Marks each)',
          marks: '300 Marks (Negative 0.66)',
          weightage: '67% of Prelims',
          details: 'Jurisprudence, Public International Law, Constitution of India, Transfer of Property, IPC, CrPC, Evidence Act, CPC.'
        },
        {
          subject: 'Mains Written (6 Papers)',
          title: 'GS (200M) + English (100M) + Hindi (100M) + 3 Core Law Papers (600M)',
          questions: 'Descriptive Subjective Writing',
          marks: '1000 Marks',
          weightage: 'Decides Selection',
          details: 'Substantive Law (200M), Procedure & Evidence (200M), Penal, Revenue & Local UP Laws including UP Revenue Code 2006 (200M).'
        }
      ]
    },
    'RJS': {
      fullName: 'Rajasthan Judicial Service (Civil Judge & Judicial Magistrate)',
      conductingBody: 'Rajasthan High Court, Jodhpur',
      frequency: 'Annual Notification & Fast-Track Selection',
      mode: 'Prelims (100 MCQs: 70 Law + 30 Language) -> Mains (300M) -> Interview (35M)',
      duration: 'Prelims: 120 Mins • Mains: 3 Hours per Paper',
      totalMarks: '335 Marks (Mains 300M + Interview 35M)',
      keySellingPoint: 'ZERO GENERAL STUDIES PAPER! The only major state judiciary exam that tests purely 70% Law and 30% Hindi/English Grammar with NO negative marking in Prelims!',
      counsellorTip: 'A favorite for students who dislike GS/History! 70% Law + 30% Hindi/English grammar. Mastering Hindi grammar and civil/criminal procedure guarantees selection.',
      sectionsBreakdown: [
        {
          subject: 'Prelims Test',
          title: '100 MCQs (70 Law + 15 Hindi Grammar + 15 English Grammar)',
          questions: '100 Questions (1 Mark each)',
          marks: '100 Marks (NO NEGATIVE MARKING!)',
          weightage: 'Screening Test',
          details: 'Civil Law, Criminal Law, Rajasthan Rent Control Act, Hindi & English Grammar (Tenses, Idioms, Sandhi, Samas).'
        },
        {
          subject: 'Mains Paper 1 & 2',
          title: 'Law Paper I - Civil (100M) & Law Paper II - Criminal (100M)',
          questions: 'Descriptive Theory + Problem Solving',
          marks: '200 Marks',
          weightage: '67% of Written Mains',
          details: 'CPC, Constitution, Contract, Specific Relief, Torts, IPC, CrPC, Evidence, Domestic Violence, Negotiable Instruments, POCSO.'
        },
        {
          subject: 'Mains Language',
          title: 'Hindi Essay (50M) + English Essay (50M)',
          questions: 'Essay Writing on Current Legal/Social Topics',
          marks: '100 Marks',
          weightage: '33% of Written Mains',
          details: 'Tested strictly on language proficiency, legal precision, structure, and expression in both official languages.'
        }
      ]
    },
    'MP-CJ': {
      fullName: 'Madhya Pradesh Civil Judge Junior Division (Entry Level)',
      conductingBody: 'High Court of Madhya Pradesh, Jabalpur',
      frequency: 'Annual Notification',
      mode: 'Online Prelims (150 MCQs) -> Mains (4 Papers, 400M) -> Interview (50M)',
      duration: 'Prelims: 120 Mins • Mains: 3 Hours per Paper',
      totalMarks: '450 Marks (Mains 400M + Interview 50M)',
      keySellingPoint: 'Fastest recruitment timeline in central India. Direct appointment with full judicial powers, government accommodation, and judicial staff.',
      counsellorTip: 'MP Judiciary places high weightage on Judgment Writing in Mains (Civil & Criminal Framing of Issues and Charges carry 100 marks)!',
      sectionsBreakdown: [
        {
          subject: 'Online Prelims',
          title: '150 MCQs (110 Core Law + 10 MP Local + 20 GK/English + 10 Computer)',
          questions: '150 Questions',
          marks: '150 Marks (No Negative Marking)',
          weightage: 'Screening Only',
          details: 'Core Civil/Criminal Laws + MP Accommodation Control Act + MP Land Revenue Code + Basic Computer Literacy.'
        },
        {
          subject: 'Mains 4 Papers',
          title: 'Civil Law (100M) + Writing & Translation (100M) + Criminal (100M) + Judgment Writing (100M)',
          questions: '4 Descriptive Papers',
          marks: '400 Marks',
          weightage: 'Final Selection Base',
          details: 'Civil Issues Settlement, Charge Framing, Civil Judgment Writing, Criminal Judgment Writing.'
        }
      ]
    }
  };

  const TOP_CADRES = [
    {
      name: 'Delhi Judicial Service (Tis Hazari, Rouse Avenue, Saket & High Court)',
      authority: 'Constitutional Subordinate Judiciary (High Court of Delhi)',
      examCode: 'DJS',
      payScale: 'NJPC Pay Scale J-1: Basic ₹77,840 (Gross ~₹1,25,000/mo)',
      cutoff: 'Prelims Cutoff ~124/200 Marks (General)',
      type: 'DELHI',
      perks: 'Judicial Bungalow in Central Delhi, official vehicle with driver, personal orderly, judicial security guard, high elevation rate to High Court.'
    },
    {
      name: 'Uttar Pradesh Judicial Service (Allahabad High Court & District Courts)',
      authority: 'UPPSC & High Court of Judicature at Allahabad',
      examCode: 'UP-PCS-J',
      payScale: 'Pay Scale J-1: Basic ₹77,840 (Gross ~₹1,18,000/mo)',
      cutoff: 'Prelims Cutoff ~255/450 Marks (General)',
      type: 'STATES',
      perks: 'Largest judicial establishment in Asia. Independent court with complete administrative control over court staff and police jurisdiction.'
    },
    {
      name: 'Rajasthan Judicial Service (High Court Jodhpur & Districts)',
      authority: 'Rajasthan High Court, Jodhpur',
      examCode: 'RJS',
      payScale: 'Pay Scale J-1: Basic ₹77,840 (Gross ~₹1,15,000/mo)',
      cutoff: 'Prelims Cutoff ~72/100 Marks (General)',
      type: 'STATES',
      perks: 'Zero GS paper in recruitment! Direct posting as Civil Judge & Judicial Magistrate with official bungalow, telephone, and medical benefits.'
    },
    {
      name: 'Madhya Pradesh Judicial Service (MP High Court Jabalpur)',
      authority: 'High Court of Madhya Pradesh',
      examCode: 'MP-CJ',
      payScale: 'Pay Scale J-1: Basic ₹77,840 (Gross ~₹1,15,000/mo)',
      cutoff: 'Prelims Cutoff ~115/150 Marks (General)',
      type: 'STATES',
      perks: 'Fast promotion ladder: Civil Judge Junior Division -> Senior Civil Judge -> Chief Judicial Magistrate (CJM) -> District & Sessions Judge.'
    }
  ];

  const filteredCadres = useMemo(() => {
    return TOP_CADRES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.perks.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.payScale.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || c.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  // 10-Second Eligibility calculation
  const eligibilityVerdict = useMemo(() => {
    const isLawGrad = elDegree === 'LLB_3YR' || elDegree === 'BALLB_5YR' || elDegree === 'FINAL_YEAR';
    const isAgeEligible = elAge >= 21 && elAge <= 35;

    return {
      isEligible: isLawGrad && isAgeEligible,
      summary: isLawGrad && isAgeEligible && elDegree === 'FINAL_YEAR'
        ? 'Final Year Law Student: FULLY ELIGIBLE to appear in RJS and provisional DJS cycles! Can clear the exam right as graduation finishes.'
        : isLawGrad && isAgeEligible
        ? `FULLY ELIGIBLE for ${elState} Judicial Service! Citizen of India + LL.B. degree. ZERO years of active court practice required!`
        : !isAgeEligible
        ? `Age ${elAge} is outside the 21–35 age bracket. State relaxation applies for reserved categories.`
        : 'Must possess or be pursuing a 3-Year LL.B. or 5-Year B.A. LL.B. degree recognized by the Bar Council of India.'
    };
  }, [elDegree, elAge, elState]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            >
              ← Back to Categories
            </button>
            <span className="text-xs font-bold px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
              LIVE COCKPIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Scale className="w-8 h-8 text-red-400" />
            Judiciary (Civil Judge & Judicial Magistrate) Intelligence Cockpit
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Everything an EdTech counsellor needs on live calls: Delhi (DJS), UP (UP PCS-J), Rajasthan (RJS), MP Judicial Services, NJPC Pay Scale J-1 (₹1.25L/mo starting salary + Bungalow), exam structures, and conversion scripts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('pitch')}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-red-900/30 transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            Live Call Pitch
          </button>
          <button
            onClick={onOpenFitmentModal}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            Fitment Matrix
          </button>
        </div>
      </div>

      {/* Constitutional Authority & Supreme Perks Ribbon */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-rose-950/60 border border-red-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
            <Gavel className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                Constitutional Power & Prestige
              </span>
              <span className="text-xs text-slate-400">NJPC Revised Pay Commission J-1</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Gross Starting Salary ₹1,15,000–₹1,30,000/Month + Official Judicial Bungalow + Security Guard + Car!
            </h3>
            <p className="text-xs text-slate-300">
              Unlike ordinary government jobs, a Civil Judge holds sovereign judicial power to summon senior bureaucrats, police commissioners, and grant bail or jail sentences.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pitch')}
            className="text-xs font-bold px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl transition-all"
          >
            View Judiciary Pitch →
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'exams', label: '1. State Exam Patterns', icon: Target },
          { id: 'cadres', label: '2. Judicial Cadres & Courts', icon: Building2 },
          { id: 'cutoffs', label: '3. Official Cutoff Marks', icon: TrendingUp },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall },
          { id: 'eligibility', label: '5. 10s Eligibility Check', icon: Shield },
          { id: 'courses', label: '6. PW Judiciary Batches', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as JudTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30 border border-red-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
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
              { code: 'DJS', label: 'Delhi Judicial Service (DJS)', badge: 'Apex Cadre' },
              { code: 'UP-PCS-J', label: 'UP Judiciary (Civil Judge JD)', badge: 'Max Vacancies' },
              { code: 'RJS', label: 'Rajasthan Judiciary (RJS)', badge: 'NO GS PAPER!' },
              { code: 'MP-CJ', label: 'MP Civil Judge (Entry Level)', badge: 'Fast Track' }
            ].map(track => {
              const isSelected = selectedExamCode === track.code;
              return (
                <button
                  key={track.code}
                  onClick={() => setSelectedExamCode(track.code as JudExamCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-800 text-red-400 border-red-500 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{track.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'
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
                    <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                      Official 3-Stage Selection
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">{exam.fullName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Recruiting Authority: <span className="text-slate-200 font-semibold">{exam.conductingBody}</span> • Frequency: <span className="text-slate-200 font-semibold">{exam.frequency}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⏱ {exam.duration}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⚖️ {exam.mode}
                    </span>
                    <span className="bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 font-black">
                      🎯 {exam.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Sparkles className="w-4 h-4" />
                      Aspirant Value Proposition
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
                    Paper Structure & High-Scoring Domains
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exam.sectionsBreakdown.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-850/80 border border-slate-800 hover:border-red-500/40 rounded-xl p-4 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-black text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
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
                          <span className="text-red-300">{sec.marks}</span>
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

      {/* TAB 2: JUDICIAL CADRES & COURTS */}
      {activeTab === 'cadres' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Delhi, UP, Rajasthan, salary perks..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All State Cadres' },
                { id: 'DELHI', label: 'Delhi Subordinate' },
                { id: 'STATES', label: 'State Judicial Services' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCadres.map((c, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                      {c.examCode}
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.authority}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
                    {c.payScale.split(':')[1] || c.payScale}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{c.perks}</p>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pay Scale & Emoluments:</span>
                    <span className="text-emerald-400 font-bold text-right">{c.payScale}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Benchmark Cutoff:</span>
                    <span className="text-red-300 font-semibold text-right">{c.cutoff}</span>
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                Official Judicial Cutoffs
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                State Judicial Service Cutoff Benchmarks
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Exact marks needed across Delhi, UP, and Rajasthan to clear Prelims and Mains.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold uppercase">Judicial Service</th>
                    <th className="py-3 px-4 font-bold uppercase">Prelims Total</th>
                    <th className="py-3 px-4 font-bold uppercase">General Cutoff</th>
                    <th className="py-3 px-4 font-bold uppercase">OBC / Reserved Cutoff</th>
                    <th className="py-3 px-4 font-bold uppercase">Mains Written Merit Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-red-400" />
                      Delhi Judicial Service (DJS)
                    </td>
                    <td className="py-3 px-4 text-slate-300">200 Marks (Negative 0.25)</td>
                    <td className="py-3 px-4 text-red-300 font-bold">~123–128 / 200</td>
                    <td className="py-3 px-4 text-slate-300">~105–112 (SC/ST/PwD)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~520+ / 850 Marks (Mains)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-red-400" />
                      UP Judicial Service (UP PCS-J)
                    </td>
                    <td className="py-3 px-4 text-slate-300">450 Marks (GS + Law)</td>
                    <td className="py-3 px-4 text-red-300 font-bold">~250–260 / 450</td>
                    <td className="py-3 px-4 text-slate-300">~230–242 (OBC / SC)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~560+ / 1000 Marks</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-red-400" />
                      Rajasthan Judicial Service (RJS)
                    </td>
                    <td className="py-3 px-4 text-slate-300">100 Marks (Pure Law + Lang)</td>
                    <td className="py-3 px-4 text-red-300 font-bold">~71–74 / 100</td>
                    <td className="py-3 px-4 text-slate-300">~62–67 (OBC / SC / ST)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">~180+ / 300 Marks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="text-red-400 font-bold uppercase tracking-wider">Counsellor Closing Argument:</span>
              <p>
                In RJS, there is NO negative marking and NO General Studies paper! If a student focuses purely on core IPC, CPC, CrPC, Evidence, and basic Hindi/English grammar, clearing the Rajasthan Judiciary Prelims is one of the most predictable goals in all of law.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-red-950/40 border border-red-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
                High-Impact Phone Script
              </span>
              <span className="text-xs text-slate-400 font-semibold">Duration: 60 Seconds</span>
            </div>
            <h2 className="text-xl font-black text-white">
              The 60-Second Civil Judge & Judicial Magistrate Call Pitch
            </h2>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <p>
                <span className="text-red-400 font-bold">[Opening Hook]:</span> "Namaste <span className="text-yellow-300 font-semibold">[Student Name]</span>! As a law graduate, you have two choices: struggle in corporate law with 14-hour daily shifts, or become a <strong>Civil Judge & Judicial Magistrate (Class 1 Gazetted Officer)</strong> right at the age of 23–24!"
              </p>
              <p>
                <span className="text-red-400 font-bold">[Salary & Power]:</span> "Under the New National Judicial Pay Commission, a Civil Judge starts with a <strong>gross salary of ₹1,15,000 to ₹1,25,000/month</strong>, an official judicial bungalow, an official car, personal court staff, and 24x7 security personnel."
              </p>
              <p>
                <span className="text-red-400 font-bold">[Zero Practice Myth]:</span> "Many law students mistakenly think they need 3 or 5 years of court practice. That is completely false! You are <strong>100% eligible to become a Judge right upon graduation</strong> with zero court experience in Delhi, UP, Rajasthan, and MP!"
              </p>
              <p>
                <span className="text-red-400 font-bold">[PW Advantage]:</span> "In PW’s Judiciary Foundation batch, former judges and senior advocates train you in bare act decoding, answer writing, and judgment writing. Shall we lock in your enrollment for this batch?"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Top 3 Law Student Objections Handled
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 1:</div>
                <h4 className="text-sm font-bold text-white">"Do I need practice experience as an advocate?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-red-400">Response:</strong> "No! The Supreme Court has ruled that fresh LL.B. graduates are eligible for Civil Judge (Junior Division). You do not need to spend years in district courts—you can crack the exam straight out of college."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 2:</div>
                <h4 className="text-sm font-bold text-white">"Judgment writing in Mains sounds terrifying"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-red-400">Response:</strong> "Judgment writing follows a strict standardized legal formula: summary of facts, framing of issues/charges, marshalling of evidence, and operative order. PW gives you 30+ pre-formatted templates that turn it into a 100% scoring section."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 3:</div>
                <h4 className="text-sm font-bold text-white">"What about new criminal laws (BNS, BNSS, BSA)?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-red-400">Response:</strong> "PW’s syllabus is 100% updated with both the old IPC/CrPC and the new Bharatiya Nyaya Sanhita (BNS) comparative mapping, giving you an unfair competitive advantage over self-study students."
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
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded">
              Instant Phone Rule
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              10-Second Judicial Services Eligibility Checker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify legal qualification, age window, and Bar Council enrollment requirements while on the call.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Law Degree Status</label>
              <select
                value={elDegree}
                onChange={(e) => setElDegree(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="BALLB_5YR">5-Year Integrated B.A. LL.B.</option>
                <option value="LLB_3YR">3-Year LL.B. Graduate</option>
                <option value="FINAL_YEAR">Final Year Law Student</option>
                <option value="NON_LAW">Non-Law Graduate</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Advocate Enrollment</label>
              <select
                value={elEnrolled}
                onChange={(e) => setElEnrolled(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="YES">Enrolled / Eligible to Enroll</option>
                <option value="PENDING">Degree Pending</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Target State Judiciary</label>
              <select
                value={elState}
                onChange={(e) => setElState(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="DELHI">Delhi Judicial Service (DJS)</option>
                <option value="UP">UP Judicial Service (UP PCS-J)</option>
                <option value="RAJASTHAN">Rajasthan Judicial Service (RJS)</option>
                <option value="MP">MP Civil Judge (MP-CJ)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Student Age (Years)</label>
              <input
                type="number"
                value={elAge}
                onChange={(e) => setElAge(Number(e.target.value))}
                min={20}
                max={45}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl border bg-red-950/30 border-red-500/40 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Eligibility Result
            </div>
            <h3 className="text-base font-black text-white">{eligibilityVerdict.summary}</h3>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded font-bold bg-emerald-500/20 text-emerald-300">
                Minimum Practice Required: ZERO Years
              </span>
              <span className="px-2.5 py-1 rounded font-bold bg-red-500/20 text-red-300">
                Pay Scale: NJPC J-1 (Gross ~₹1,25,000/mo)
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
              <h2 className="text-lg font-black text-white">Recommended Batches for Judiciary Aspirants</h2>
              <p className="text-xs text-slate-400">PW Nyay Judiciary Foundation & Comprehensive State Batches with mock viva sessions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-400">
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
                      className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Pitch This Course Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Dedicated Judiciary batches are pre-configured. Use the pitch script above on calls!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
