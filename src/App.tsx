import React, { useState, useEffect } from 'react';
import { Category, CategoryDetailPayload, StudentProfile, FitmentResult, Course } from './types';
import { getCategories, getCategoryDetails } from './api/client';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryList/CategoryGrid';
import { CategoryDetailsView } from './components/CategoryDetails/CategoryDetailsView';
import { StudentFitmentModal } from './components/StudentIntelligence/StudentFitmentModal';
import { CounsellorPitchModal } from './components/StudentIntelligence/CounsellorPitchModal';
import { LoadingState } from './components/Common/LoadingState';
import { ErrorState } from './components/Common/ErrorState';

export function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryPayload, setCategoryPayload] = useState<CategoryDetailPayload | null>(null);
  
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Student Intelligence Modals state
  const [fitmentModalOpen, setFitmentModalOpen] = useState(false);
  const [fitmentInitialCategory, setFitmentInitialCategory] = useState<Category | null>(null);
  
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [pitchProfile, setPitchProfile] = useState<StudentProfile | null>(null);
  const [pitchFitment, setPitchFitment] = useState<FitmentResult | null>(null);

  // 1. Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        setError(null);
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize categories');
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  // 2. Fetch category details when a category is selected
  useEffect(() => {
    if (!selectedCategory) {
      setCategoryPayload(null);
      return;
    }

    async function loadCategoryDetails() {
      try {
        setLoadingDetails(true);
        setError(null);
        const data = await getCategoryDetails(selectedCategory!.id);
        setCategoryPayload(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err: any) {
        setError(err.message || 'Failed to load category intelligence details');
      } finally {
        setLoadingDetails(false);
      }
    }
    loadCategoryDetails();
  }, [selectedCategory]);

  const handleOpenFitment = (categoryToPreset?: Category | null) => {
    setFitmentInitialCategory(categoryToPreset || selectedCategory || null);
    setFitmentModalOpen(true);
  };

  const handleOpenPitch = (profile: StudentProfile, fitment: FitmentResult) => {
    setPitchProfile(profile);
    setPitchFitment(fitment);
    setFitmentModalOpen(false);
    setPitchModalOpen(true);
  };

  const handlePitchSpecificCourse = (course: Course) => {
    const syntheticProfile: StudentProfile = {
      student_name: 'Consulted Student',
      target_category_id: selectedCategory?.id || 'cat-mba',
      target_exam_codes: [course.target_exam_code || 'Exam'],
      education_status: 'Graduation Final Year',
      stream: 'General Stream',
      graduation_or_12th_pct: 75.0,
      previous_prep_status: 'Beginner / Zero Prep',
      completed_subjects: [],
      strong_subjects: ['Core Aptitude'],
      weak_subjects: ['Speed Optimization'],
      daily_hours_available: 4,
      target_academic_year: '2025-2026',
      language_preference: course.language || 'Hinglish',
      mode_preference: course.mode || 'Live Online'
    };

    const syntheticFitment: FitmentResult = {
      is_eligible: true,
      hard_filter_issues: [],
      overall_fitment_score: 88,
      fitment_tier: 'High Fitment (Recommended)',
      recommended_course: course,
      alternative_courses: [],
      factors: [
        { factor: 'Academic Alignment', weight: 20, score: 85, status: 'optimal', details: 'Profile matches batch requirements.' },
        { factor: 'Curriculum Fit', weight: 25, score: 90, status: 'optimal', details: 'Course covers full exam syllabus.' }
      ],
      preparation_gaps: ['Requires structured mock series practice.'],
      recommended_daily_plan: '4 Hours/day live class & practice.',
      backup_exams_available: ['Allied Entrance Exams']
    };

    handleOpenPitch(syntheticProfile, syntheticFitment);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenFitmentModal={() => handleOpenFitment(null)}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1 }}>
        {loadingCategories ? (
          <LoadingState message="Connecting to EdTech Relational Intelligence Engine..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              setError(null);
              window.location.reload();
            }}
          />
        ) : selectedCategory ? (
          loadingDetails || !categoryPayload ? (
            <LoadingState message={`Aggregating exam structures, syllabus, cutoffs, and results for ${selectedCategory.name}...`} />
          ) : (
            <CategoryDetailsView
              payload={categoryPayload}
              onBack={() => setSelectedCategory(null)}
              onOpenFitmentModal={() => handleOpenFitment(selectedCategory)}
              onPitchCourse={handlePitchSpecificCourse}
            />
          )
        ) : (
          <CategoryGrid
            categories={categories}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onOpenFitmentWithCategory={(cat) => handleOpenFitment(cat)}
            onOpenFitmentModal={() => handleOpenFitment(null)}
          />
        )}
      </main>

      {/* Student Fitment Modal */}
      {fitmentModalOpen && (
        <StudentFitmentModal
          categories={categories}
          initialCategory={fitmentInitialCategory}
          onClose={() => setFitmentModalOpen(false)}
          onOpenPitch={handleOpenPitch}
        />
      )}

      {/* Counsellor Pitch Modal */}
      {pitchModalOpen && pitchProfile && pitchFitment && (
        <CounsellorPitchModal
          profile={pitchProfile}
          fitment={pitchFitment}
          onClose={() => setPitchModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong>COUNSELLOR IQ</strong> • Internal EdTech Intelligence & Fitment Platform (11 Categories Active)
          </div>
          <div>
            Data Status: <span style={{ color: 'var(--amber-400)', fontWeight: 600 }}>DEMO LAYER ACTIVE</span> • Academic Cycle 2025-2026
          </div>
        </div>
      </footer>
    </div>
  );
}
