import React, { useState } from 'react';
import { CategoryDetailPayload, Course } from '../../types';
import { CategoryHeader } from './CategoryHeader';
import { QuickNav, SectionId } from './QuickNav';
import { OverviewSection } from './OverviewSection';
import { PreparationSection } from './PreparationSection';
import { EligibilitySection } from './EligibilitySection';
import { SyllabusSection } from './SyllabusSection';
import { CoursesSection } from './CoursesSection';
import { ExamsMappingSection } from './ExamsMappingSection';
import { CollegesSection } from './CollegesSection';
import { ResultsSection } from './ResultsSection';
import { ProvenResultsSection } from './ProvenResultsSection';
import { MbaCounsellorCockpit } from './MbaCounsellorCockpit';
import { UgcNetCounsellorCockpit } from './UgcNetCounsellorCockpit';
import { UpscCounsellorCockpit } from './UpscCounsellorCockpit';
import { SscCounsellorCockpit } from './SscCounsellorCockpit';
import { BankingCounsellorCockpit } from './BankingCounsellorCockpit';
import { PharmaCounsellorCockpit } from './PharmaCounsellorCockpit';

interface CategoryDetailsViewProps {
  payload: CategoryDetailPayload;
  onBack: () => void;
  onOpenFitmentModal: () => void;
  onPitchCourse: (course: Course) => void;
}

export const CategoryDetailsView: React.FC<CategoryDetailsViewProps> = ({
  payload,
  onBack,
  onOpenFitmentModal,
  onPitchCourse
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  const {
    category,
    exams,
    eligibilityRules,
    preparation,
    subjects,
    courses,
    examMappings,
    colleges,
    results,
    successStories
  } = payload;

  // If MBA category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'mba') {
    return (
      <MbaCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  // If UGC-NET category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'ugc-net') {
    return (
      <UgcNetCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  // If UPSC category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'upsc') {
    return (
      <UpscCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  // If SSC & Railways category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'ssc-railways') {
    return (
      <SscCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  // If Banking category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'banking') {
    return (
      <BankingCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  // If Pharma category, render the fast, counsellor-first Cockpit!
  if (category.slug === 'pharma') {
    return (
      <PharmaCounsellorCockpit
        category={category}
        exams={exams}
        colleges={colleges}
        eligibilityRules={eligibilityRules}
        preparation={preparation}
        courses={courses}
        onBack={onBack}
        onPitchCourse={onPitchCourse}
        onOpenFitmentModal={onOpenFitmentModal}
      />
    );
  }

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Category Header */}
      <CategoryHeader
        category={category}
        exams={exams}
        onBack={onBack}
        onOpenFitment={onOpenFitmentModal}
      />

      {/* Sticky Quick Nav */}
      <QuickNav
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Content Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div id="section-overview">
          <OverviewSection category={category} exams={exams} />
        </div>

        <div id="section-preparation">
          <PreparationSection category={category} preparation={preparation} />
        </div>

        <div id="section-eligibility">
          <EligibilitySection category={category} eligibilityRules={eligibilityRules} />
        </div>

        <div id="section-syllabus">
          <SyllabusSection category={category} subjects={subjects} />
        </div>

        <div id="section-courses">
          <CoursesSection
            category={category}
            courses={courses}
            onPitchCourse={onPitchCourse}
          />
        </div>

        <div id="section-exams-mapping">
          <ExamsMappingSection category={category} examMappings={examMappings} />
        </div>

        <div id="section-colleges">
          <CollegesSection category={category} colleges={colleges} />
        </div>

        <div id="section-results">
          <ResultsSection category={category} results={results} />
        </div>

        <div id="section-proven-results">
          <ProvenResultsSection category={category} successStories={successStories} />
        </div>
      </div>
    </div>
  );
};
