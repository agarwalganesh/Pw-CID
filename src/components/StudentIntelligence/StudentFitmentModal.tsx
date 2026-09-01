import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  User,
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Send,
  Languages
} from 'lucide-react';
import { Category, StudentProfile, FitmentResult } from '../../types';
import { calculateFitment } from '../../api/client';
import { FitmentReportView } from './FitmentReportView';
import { LoadingState } from '../Common/LoadingState';
import { ErrorState } from '../Common/ErrorState';

interface StudentFitmentModalProps {
  categories: Category[];
  initialCategory?: Category | null;
  onClose: () => void;
  onOpenPitch: (profile: StudentProfile, fitment: FitmentResult) => void;
}

export const StudentFitmentModal: React.FC<StudentFitmentModalProps> = ({
  categories,
  initialCategory,
  onClose,
  onOpenPitch
}) => {
  const [profile, setProfile] = useState<StudentProfile>({
    student_name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    target_category_id: initialCategory?.id || categories[0]?.id || 'cat-mba',
    target_exam_codes: initialCategory ? [initialCategory.name] : ['CAT'],
    education_status: 'Graduation Final Year',
    stream: 'B.Com (Commerce)',
    graduation_or_12th_pct: 78.5,
    previous_prep_status: 'Beginner / Zero Prep',
    completed_subjects: [],
    strong_subjects: ['Verbal & Reading Comprehension'],
    weak_subjects: ['Quantitative Aptitude'],
    daily_hours_available: 4.5,
    target_academic_year: '2025-2026',
    language_preference: 'Hinglish',
    mode_preference: 'Live Online'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fitmentResult, setFitmentResult] = useState<FitmentResult | null>(null);

  // Update target category if initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setProfile((prev) => ({
        ...prev,
        target_category_id: initialCategory.id,
        target_exam_codes: [initialCategory.name]
      }));
    }
  }, [initialCategory]);

  const handleRunCalculation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await calculateFitment(profile);
      setFitmentResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate fitment');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryObj = categories.find((c) => c.id === profile.target_category_id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '960px' }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: 'var(--primary-600)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Student Fitment & Recommendation Engine
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Deterministic rule-based academic evaluation, hard filter verification, and gap analysis.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Form vs Fitment Result */}
        {!fitmentResult ? (
          <form onSubmit={handleRunCalculation}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {/* Student Name */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Student Name:
                </label>
                <input
                  type="text"
                  className="input-control"
                  value={profile.student_name}
                  onChange={(e) => setProfile({ ...profile, student_name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              {/* Target Category */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target Exam Category:
                </label>
                <select
                  className="input-control"
                  value={profile.target_category_id}
                  onChange={(e) => {
                    const cat = categories.find((c) => c.id === e.target.value);
                    setProfile({
                      ...profile,
                      target_category_id: e.target.value,
                      target_exam_codes: cat ? [cat.name] : ['Exam']
                    });
                  }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.tagline}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Education Status */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Education Standing:
                </label>
                <select
                  className="input-control"
                  value={profile.education_status}
                  onChange={(e) => setProfile({ ...profile, education_status: e.target.value as any })}
                >
                  <option value="12th Appearing">12th Appearing (Board Candidate)</option>
                  <option value="12th Passed">12th Passed</option>
                  <option value="Graduation Final Year">Graduation Final Year (Appearing)</option>
                  <option value="Graduated">Graduated (Completed Degree)</option>
                  <option value="Post-Graduated">Post-Graduated</option>
                </select>
              </div>

              {/* Academic Stream */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Academic Stream / Degree:
                </label>
                <input
                  type="text"
                  className="input-control"
                  value={profile.stream}
                  onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                  placeholder="e.g. B.Tech CS, B.Com, B.Pharm, Law, B.Sc"
                  required
                />
              </div>

              {/* Academic Score % */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Graduation / 12th Score (% or CGPA Equivalent):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="100"
                  className="input-control"
                  value={profile.graduation_or_12th_pct}
                  onChange={(e) => setProfile({ ...profile, graduation_or_12th_pct: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              {/* Previous Preparation Status */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Previous Preparation Level:
                </label>
                <select
                  className="input-control"
                  value={profile.previous_prep_status}
                  onChange={(e) => setProfile({ ...profile, previous_prep_status: e.target.value as any })}
                >
                  <option value="Beginner / Zero Prep">Beginner / Zero Prep (Fresh Start)</option>
                  <option value="Self Study (3-6 mo)">Self Study (3-6 Months Basics Done)</option>
                  <option value="Previous Coaching">Previous Coaching (Covered Concepts)</option>
                  <option value="Repeat Attempt">Repeat Attempt (Mock / Score Booster)</option>
                </select>
              </div>

              {/* Daily Available Study Hours */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Available Study Hours / Day:
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="16"
                  className="input-control"
                  value={profile.daily_hours_available}
                  onChange={(e) => setProfile({ ...profile, daily_hours_available: parseFloat(e.target.value) || 4 })}
                  required
                />
              </div>

              {/* Language Preference */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Language Medium Preference:
                </label>
                <select
                  className="input-control"
                  value={profile.language_preference}
                  onChange={(e) => setProfile({ ...profile, language_preference: e.target.value as any })}
                >
                  <option value="Hinglish">Hinglish (Mixed Hindi + English Concept)</option>
                  <option value="English">English (Full English Delivery)</option>
                  <option value="Hindi">Hindi (Pure Hindi Medium)</option>
                </select>
              </div>

              {/* Strong Subjects */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Self-Reported Strengths:
                </label>
                <input
                  type="text"
                  className="input-control"
                  value={profile.strong_subjects.join(', ')}
                  onChange={(e) => setProfile({ ...profile, strong_subjects: e.target.value.split(',').map((s) => s.trim()) })}
                  placeholder="e.g. Verbal Ability, Reading Speed"
                />
              </div>

              {/* Weak Subjects */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Self-Reported Focus Areas / Weaknesses:
                </label>
                <input
                  type="text"
                  className="input-control"
                  value={profile.weak_subjects.join(', ')}
                  onChange={(e) => setProfile({ ...profile, weak_subjects: e.target.value.split(',').map((s) => s.trim()) })}
                  placeholder="e.g. Quantitative Aptitude, Time Management"
                />
              </div>
            </div>

            {error && <ErrorState message={error} />}

            {loading ? (
              <LoadingState message="Running deterministic fitment & eligibility checks..." />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} />
                  Calculate Fitment & Recommendations
                </button>
              </div>
            )}
          </form>
        ) : (
          <FitmentReportView
            profile={profile}
            fitment={fitmentResult}
            category={selectedCategoryObj || null}
            onRecalculate={() => setFitmentResult(null)}
            onOpenPitch={() => onOpenPitch(profile, fitmentResult)}
          />
        )}
      </div>
    </div>
  );
};
