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
  Calculator,
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

interface CaCounsellorCockpitProps {
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

type CaTab = 'exams' | 'big4_corps' | 'cutoffs' | 'pitch' | 'eligibility' | 'courses';
type CaExamCode = 'CA-FOUNDATION' | 'CA-INTER' | 'CA-FINAL';

export const CaCounsellorCockpit: React.FC<CaCounsellorCockpitProps> = ({
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
  const [activeTab, setActiveTab] = useState<CaTab>('exams');
  const [selectedExamCode, setSelectedExamCode] = useState<CaExamCode>('CA-FOUNDATION');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'BIG_4' | 'CORP_FINANCE'>('ALL');

  // 10-Second Eligibility State
  const [elRoute, setElRoute] = useState<'FOUNDATION_ROUTE' | 'DIRECT_ENTRY_COMMERCE' | 'DIRECT_ENTRY_OTHER'>('FOUNDATION_ROUTE');
  const [elQual, setElQual] = useState<'12TH_APPEARING' | '12TH_PASSED' | 'BCOM_PURSUING' | 'GRADUATE'>('12TH_PASSED');
  const [elPercentage, setElPercentage] = useState<number>(78);

  const EXAM_DATA: Record<CaExamCode, {
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
    'CA-FOUNDATION': {
      fullName: 'CA Foundation (ICAI New Scheme of Education and Training)',
      conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
      frequency: 'Thrice a Year (January, June, and September)',
      mode: 'Offline Pen & Paper (2 Subjective + 2 Objective MCQ Papers)',
      duration: 'Paper 1 & 2: 180 Mins • Paper 3 & 4: 120 Mins',
      totalMarks: '400 Marks (4 Papers of 100 Marks Each)',
      keySellingPoint: 'Direct prestigious entry right after Class 12th! Highest return-on-investment qualification with zero college tuition fees.',
      counsellorTip: 'Reassure non-maths students: Quantitative Aptitude has 20 marks of pure Logical Reasoning and 40 marks of Statistics with calculator allowed! They can easily score 50+ without calculus.',
      sectionsBreakdown: [
        {
          subject: 'Paper 1',
          title: 'Accounting (100% Descriptive / Subjective)',
          questions: '6 Questions (Attempt any 5)',
          marks: '100 Marks',
          weightage: '25% of Foundation',
          details: 'Accounting process, Depreciation, Bills of Exchange, Final Accounts, Partnership, Company Accounts, Basics of Ind AS.'
        },
        {
          subject: 'Paper 2',
          title: 'Business Laws (Descriptive Subjective)',
          questions: '6 Questions (Attempt any 5)',
          marks: '100 Marks',
          weightage: '25% of Foundation',
          details: 'Indian Regulatory Framework, Indian Contract Act 1872, Sale of Goods Act 1930, Indian Partnership Act 1932, LLP Act 2008, Companies Act 2013.'
        },
        {
          subject: 'Paper 3 & 4',
          title: 'Quantitative Aptitude (100M) & Business Economics (100M)',
          questions: '100 MCQs in Math + 100 MCQs in Economics',
          marks: '200 Marks (Negative marking -0.25)',
          weightage: '50% of Foundation',
          details: 'Math (40M), Logic (20M), Stats (40M) with battery-operated calculator allowed. Economics covers Micro, Macro, and Public Finance.'
        }
      ]
    },
    'CA-INTER': {
      fullName: 'CA Intermediate (New Scheme - 2 Groups, 6 Papers, 600 Marks)',
      conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
      frequency: 'Thrice a Year (January, May, and September)',
      mode: 'Offline Descriptive (70%) + Case Scenario MCQs (30% with NO Negative Marking)',
      duration: '180 Minutes per Paper',
      totalMarks: '600 Marks (Group 1: 300M, Group 2: 300M)',
      keySellingPoint: 'Clearing both groups immediately unlocks a 2-year practical training / articleship at Big 4 firms with stipends up to ₹25,000/month!',
      counsellorTip: 'Stress that the 30% case-scenario MCQs have ZERO negative marking! Scoring 25 out of 30 in MCQs makes clearing each paper remarkably smooth.',
      sectionsBreakdown: [
        {
          subject: 'Group 1',
          title: 'Adv Accounting (100M) + Corporate Laws (100M) + Taxation (100M)',
          questions: '3 Papers (Descriptive + 30% MCQs)',
          marks: '300 Marks',
          weightage: 'Group 1 Passing: 150/300',
          details: 'Ind AS standards, Companies Act 2013, FEMA, Direct Income Tax (50M) + GST Goods & Services Tax (50M).'
        },
        {
          subject: 'Group 2',
          title: 'Costing (100M) + Auditing & Ethics (100M) + FM & Strategic Mgmt (100M)',
          questions: '3 Papers (Descriptive + 30% MCQs)',
          marks: '300 Marks',
          weightage: 'Group 2 Passing: 150/300',
          details: 'Standard costing, marginal costing, Standards on Auditing (SAs), Financial Management (50M) + Strategic Management (50M).'
        },
        {
          subject: 'Articleship Bridge',
          title: '2-Year Big 4 Articleship Gateway & ICITSS Training',
          questions: 'Practical Training',
          marks: 'Statutory Requirement',
          weightage: 'Corporate Gateway',
          details: 'Uninterrupted 2-year practical exposure in Statutory Audit, Mergers & Acquisitions, Transfer Pricing, and Corporate Advisory.'
        }
      ]
    },
    'CA-FINAL': {
      fullName: 'CA Final (New Scheme - 6 Papers + Self-Paced Online Modules SPOM)',
      conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
      frequency: 'Twice a Year (May and November)',
      mode: 'Offline Advanced Subjective + Open Book Case Study',
      duration: '180 Minutes (Paper 6 Open Book: 240 Minutes)',
      totalMarks: '600 Marks + SPOM Mandatory Qualifying Sets',
      keySellingPoint: 'The apex statutory chartered qualification in India! Immediate average campus package of ₹11–14 LPA, with top corporate finance offers at ₹22–28 LPA.',
      counsellorTip: 'Paper 6 is Integrated Business Solutions (Open Book Exam). It tests practical application where students can bring official ICAI books into the exam hall!',
      sectionsBreakdown: [
        {
          subject: 'Group 1',
          title: 'Financial Reporting (Ind AS) + AFM + Advanced Auditing & Ethics',
          questions: '3 Advanced Papers',
          marks: '300 Marks',
          weightage: 'Group 1 Passing: 150/300',
          details: 'Consolidated financial statements, Forex risk management, derivatives, valuation, forensic audit, ESG reporting.'
        },
        {
          subject: 'Group 2',
          title: 'Direct Tax Laws & Int Tax + Indirect Tax + Integrated Solutions',
          questions: '3 Papers (Paper 6 is Open Book)',
          marks: '300 Marks',
          weightage: 'Group 2 Passing: 150/300',
          details: 'Corporate tax planning, DTAA, BEPS, Transfer pricing, Customs litigation, Multidisciplinary real-world case studies.'
        },
        {
          subject: 'SPOM Modules',
          title: 'Self-Paced Online Modules (Set A: Corporate Law, Set B: Strategic Cost)',
          questions: 'Online CBT Tests',
          marks: 'Qualifying 50%',
          weightage: 'Prerequisite for Final',
          details: 'Flexible online learning modules that students complete at their own convenience before appearing for Final examinations.'
        }
      ]
    }
  };

  const TOP_RECRUITERS = [
    {
      name: 'Big 4 Professional Services (Deloitte, PwC, EY, KPMG)',
      category: 'Global Accounting & Advisory Networks',
      roles: 'Statutory Audit, Forensic Audit, M&A Deals Advisory, Transfer Pricing',
      package: 'Starting CTC ₹11.50 – ₹14.00 LPA (Rank Holders: ₹16–18 LPA)',
      eligibility: 'CA Final Cleared (Both Groups) • Strong Inter Marks for Articleship',
      type: 'BIG_4',
      highlights: 'Over 60% of newly qualified CAs launch their careers in Big 4 firms with fast-track global mobility to London, New York, and Dubai.'
    },
    {
      name: 'Global Investment Banks & Consulting (Goldman Sachs, JP Morgan, McKinsey)',
      category: 'High Finance & Management Consulting',
      roles: 'Private Equity Analyst, Equity Research, Treasury Risk, Corporate Finance',
      package: 'Starting CTC ₹18.00 – ₹26.00 LPA • Sign-on Bonuses up to ₹5 Lakhs',
      eligibility: 'CA Final Top 50 All India Rankers / First Attempt Converts',
      type: 'CORP_FINANCE',
      highlights: 'Recruits directly at ICAI Mumbai & Delhi placement centres for high-stakes capital market modeling and valuation desks.'
    },
    {
      name: 'Indian Corporate Conglomerates (Tata Sons, Reliance, HUL, ITC)',
      category: 'Fortune 500 Corporate Finance Cadre',
      roles: 'Finance Manager, Internal Financial Control, Treasury Head, CFO Track',
      package: 'Starting CTC ₹14.00 – ₹20.00 LPA + Executive Housing & Allowances',
      eligibility: 'Newly Qualified Chartered Accountants (1st / 2nd Attempt)',
      type: 'CORP_FINANCE',
      highlights: 'Fast track to Chief Financial Officer (CFO) and Board Advisory positions within India’s largest conglomerates.'
    }
  ];

  const filteredRecruiters = useMemo(() => {
    return TOP_RECRUITERS.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.roles.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.package.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || r.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  // 10-Second Eligibility calculation
  const eligibilityVerdict = useMemo(() => {
    if (elRoute === 'FOUNDATION_ROUTE') {
      const isEligible = elQual === '12TH_APPEARING' || elQual === '12TH_PASSED';
      return {
        isEligible,
        level: 'CA Foundation Route',
        summary: 'FULLY ELIGIBLE to register for CA Foundation! Can register in Class 12th and sit for the exam immediately after board examinations.',
        details: 'No minimum 12th percentage required by ICAI for registration (only passing is required).'
      };
    } else if (elRoute === 'DIRECT_ENTRY_COMMERCE') {
      const minRequired = 55;
      const isEligible = elPercentage >= minRequired;
      return {
        isEligible,
        level: 'Direct Entry to CA Intermediate (Commerce Graduates)',
        summary: isEligible
          ? `FULLY ELIGIBLE for Direct Entry to CA Inter! Skip Foundation completely with ${elPercentage}% marks (Min 55% required).`
          : `Requires minimum 55% in B.Com/M.Com graduation. Student currently has ${elPercentage}%. Recommend taking the Foundation route.`,
        details: 'Commerce graduates with 55%+ marks save 9 months by bypassing CA Foundation.'
      };
    } else {
      const minRequired = 60;
      const isEligible = elPercentage >= minRequired;
      return {
        isEligible,
        level: 'Direct Entry to CA Intermediate (Non-Commerce Graduates)',
        summary: isEligible
          ? `FULLY ELIGIBLE for Direct Entry to CA Inter! B.Tech / B.Sc. graduates with ${elPercentage}% (Min 60% required) can enter directly.`
          : `Non-commerce graduates require minimum 60% in graduation. Student has ${elPercentage}%. Must take CA Foundation route.`,
        details: 'Non-commerce graduates (Engineering, Science, Arts) need 60% aggregate.'
      };
    }
  }, [elRoute, elQual, elPercentage]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            >
              ← Back to Categories
            </button>
            <span className="text-xs font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
              LIVE COCKPIT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Calculator className="w-8 h-8 text-amber-400" />
            Chartered Accountancy (CA) Counsellor Intelligence Cockpit
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Everything an EdTech counsellor needs on live calls: ICAI New Scheme rules, CA Foundation / Inter / Final patterns, Big 4 articleship recruitment (₹11–14 LPA starting CTC), passing criteria, and call objections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('pitch')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-900/30 transition-all transform hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-slate-950" />
            Live Call Pitch
          </button>
          <button
            onClick={onOpenFitmentModal}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Fitment Matrix
          </button>
        </div>
      </div>

      {/* Zero Debt & Big 4 Career Ribbon */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-yellow-950/60 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                The Highest ROI Career in India
              </span>
              <span className="text-xs text-slate-400">Zero College Tuition • Big 4 Starting CTC ₹11–14 LPA</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Unlike Private MBAs Charging ₹25 Lakhs, CA Costs Under ₹1 Lakh Total with 100% Practical Corporate Training!
            </h3>
            <p className="text-xs text-slate-300">
              Students earn stipends throughout their 2-year Big 4 articleship and qualify as statutory authority professionals signing audit reports with permanent legal powers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('pitch')}
            className="text-xs font-bold px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-all"
          >
            View Parent Pitch →
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'exams', label: '1. ICAI 3-Tier Levels', icon: Target },
          { id: 'big4_corps', label: '2. Big 4 & High Finance', icon: Building2 },
          { id: 'cutoffs', label: '3. Real Passing Criteria', icon: TrendingUp },
          { id: 'pitch', label: '4. Counsellor Phone Script', icon: PhoneCall },
          { id: 'eligibility', label: '5. 10s Eligibility Check', icon: Shield },
          { id: 'courses', label: '6. PW CA Batches', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CaTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/30 font-black border border-amber-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
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
              { code: 'CA-FOUNDATION', label: 'CA Foundation (New Scheme)', badge: 'After 12th' },
              { code: 'CA-INTER', label: 'CA Intermediate (6 Papers)', badge: 'Big 4 Gateway' },
              { code: 'CA-FINAL', label: 'CA Final + SPOM Modules', badge: 'Apex CA Post' }
            ].map(track => {
              const isSelected = selectedExamCode === track.code;
              return (
                <button
                  key={track.code}
                  onClick={() => setSelectedExamCode(track.code as CaExamCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-800 text-amber-400 border-amber-500 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{track.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
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
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      ICAI New Scheme 2024–2026
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">{exam.fullName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Statutory Body: <span className="text-slate-200 font-semibold">{exam.conductingBody}</span> • Frequency: <span className="text-slate-200 font-semibold">{exam.frequency}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ⏱ {exam.duration}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium">
                      ✍️ {exam.mode}
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30 font-black">
                      🎯 {exam.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Sparkles className="w-4 h-4" />
                      Student & Parent Value Proposition
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.keySellingPoint}
                    </p>
                  </div>

                  <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                      <Target className="w-4 h-4" />
                      Counsellor Call Strategy
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">
                      {exam.counsellorTip}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Official Paper Breakdown & Mark Distributions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exam.sectionsBreakdown.map((sec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-850/80 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
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
                          <span className="text-amber-300">{sec.marks}</span>
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

      {/* TAB 2: BIG 4 & CORPORATE PLACEMENT */}
      {activeTab === 'big4_corps' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Deloitte, PwC, Goldman, packages..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All Employers' },
                { id: 'BIG_4', label: 'Big 4 Audit & Deals' },
                { id: 'CORP_FINANCE', label: 'High Finance & Corporates' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    filterType === f.id
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredRecruiters.map((rec, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                  <h3 className="text-base font-black text-white mt-1.5">{rec.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{rec.roles}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{rec.highlights}</p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Starting Compensation:</span>
                    <span className="text-emerald-400 font-bold text-right">{rec.package}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Profile:</span>
                    <span className="text-amber-300 font-semibold text-right">{rec.eligibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL PASSING CRITERIA */}
      {activeTab === 'cutoffs' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                Official ICAI Statutory Rules
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                ICAI Passing Rule & Exemption Framework
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every counsellor must know the 40:50 Rule and the 60+ Marks Permanent Exemption mechanism by heart!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  The 40:50 Passing Rule
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To pass any level or group, a student must secure:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li><strong>Minimum 40% Marks</strong> in each individual paper (e.g. at least 40/100).</li>
                  <li><strong>Minimum 50% Aggregate Marks</strong> in the group/level (e.g. 200/400 in Foundation, 150/300 in Inter Group 1).</li>
                </ul>
              </div>

              <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  The 60+ Exemption Rule (Permanent Relief)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If a student fails a group overall but scores <strong>60 or more marks</strong> in any individual paper:
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  <li>That paper is permanently exempted! Under the New Scheme, students can carry forward exemptions indefinitely.</li>
                  <li>In the next attempt, they only need to appear in the remaining papers to clear the group!</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Counsellor Closing Argument:</span>
              <p>
                In engineering or medical, you fight for a single seat out of thousands. In CA, <strong>you are not competing against other students!</strong> If you score 200 out of 400 marks, you pass. Period. There is no quota, no reservation, and no percentile rank cutoff. Everyone who achieves 50% aggregate becomes an officer!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUNSELLOR PHONE SCRIPT */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                High-Conversion Parent & Student Pitch
              </span>
              <span className="text-xs text-slate-400 font-semibold">Duration: 60 Seconds</span>
            </div>
            <h2 className="text-xl font-black text-white">
              The 60-Second CA ROI & Big 4 Status Pitch
            </h2>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <p>
                <span className="text-amber-400 font-bold">[Opening Hook]:</span> "Namaste <span className="text-yellow-300 font-semibold">[Parent/Student Name]</span>! Did you know that while a private MBA from an average college costs ₹15 to ₹25 Lakhs with uncertain placements, Chartered Accountancy (CA) costs <strong>under ₹1 Lakh in total ICAI registration fees</strong>, yet commands a starting salary of <strong>₹11 to ₹14 LPA</strong> in Big 4 firms like Deloitte and EY?"
              </p>
              <p>
                <span className="text-amber-400 font-bold">[Statutory Power Hook]:</span> "A CA isn't just an employee—they are a statutory authority under the Companies Act. Even the biggest billionaires and CEOs cannot submit their financial accounts to the government without a Chartered Accountant’s signature!"
              </p>
              <p>
                <span className="text-amber-400 font-bold">[The 3-Attempts Per Year Relief]:</span> "Under the brand-new ICAI Scheme, Foundation and Intermediate exams now happen <strong>THRICE a year</strong> (January, June, and September)! If a student misses by a few marks, they don't lose a whole year—they re-attempt in just 90 days."
              </p>
              <p>
                <span className="text-amber-400 font-bold">[PW Advantage]:</span> "In PW’s CA Foundation Sampurna batch, India’s top chartered faculties teach every concept with handwritten notes, PYQ question banks, and live doubts. Let’s start your child’s preparation today!"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Top 3 CA Objections Handled by Counsellor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 1:</div>
                <h4 className="text-sm font-bold text-white">"CA has a very low pass percentage (only 10-15%)"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Response:</strong> "The 15% pass rate is because lakhs of students prepare without structured guidance or self-study. In PW’s structured batch with daily homework and weekly evaluations, our students achieve over a 45% clearance rate!"
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 2:</div>
                <h4 className="text-sm font-bold text-white">"I am weak in Maths in Class 12th"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Response:</strong> "You do not need Class 12th Higher Calculus! In CA Foundation Paper 3, 20 marks are pure Logical Reasoning and 40 marks are practical Statistics where calculator is allowed. Scoring 50+ is extremely easy with basic practice."
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-red-400">Objection 3:</div>
                <h4 className="text-sm font-bold text-white">"Should I do B.Com first or start CA now?"</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Response:</strong> "Start CA Foundation now right alongside your B.Com! 80% of the syllabus overlaps with B.Com 1st year, so you prepare for both simultaneously and become a qualified CA at the age of just 22!"
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
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
              Instant Phone Rule
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              10-Second CA Foundation & Direct Entry Checker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly determine whether a student enters via the Foundation Route or Direct Entry to CA Inter based on their qualification and graduation marks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Preferred Entry Route</label>
              <select
                value={elRoute}
                onChange={(e) => setElRoute(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="FOUNDATION_ROUTE">Foundation Route (After 12th)</option>
                <option value="DIRECT_ENTRY_COMMERCE">Direct Entry (B.Com / Commerce Grad)</option>
                <option value="DIRECT_ENTRY_OTHER">Direct Entry (B.Tech / Science / Other)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Student Status</label>
              <select
                value={elQual}
                onChange={(e) => setElQual(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="12TH_APPEARING">Class 12th Appearing</option>
                <option value="12TH_PASSED">Class 12th Passed</option>
                <option value="BCOM_PURSUING">College 1st / 2nd Year</option>
                <option value="GRADUATE">Graduation Completed</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">Aggregate Marks (%)</label>
              <input
                type="number"
                value={elPercentage}
                onChange={(e) => setElPercentage(Number(e.target.value))}
                min={35}
                max={100}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl border bg-amber-950/30 border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Eligibility Result: {eligibilityVerdict.level}
            </div>
            <h3 className="text-base font-black text-white">{eligibilityVerdict.summary}</h3>
            <p className="text-xs text-slate-300">{eligibilityVerdict.details}</p>
          </div>
        </div>
      )}

      {/* TAB 6: PW COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Recommended Batches for CA Aspirants</h2>
              <p className="text-xs text-slate-400">PW CA Foundation Sampurna & CA Inter Gurukul batches with live interactive mentorship.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
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
                      className="w-full py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
                    >
                      Pitch This Course Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                Dedicated CA Foundation & CA Inter batches are pre-configured. Use the pitch script above on calls!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
