import React from 'react';
import {
  Award,
  Quote,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Building
} from 'lucide-react';
import { SuccessStory, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface ProvenResultsSectionProps {
  category: Category;
  successStories: SuccessStory[];
}

export const ProvenResultsSection: React.FC<ProvenResultsSectionProps> = ({
  category,
  successStories
}) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Proven Results & Student Case Proof ({successStories.length})
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Verified student testimonials and background discipline transitions to use during consultative counselling calls.
          </p>
        </div>
        <Badge status={category.data_status} />
      </div>

      {successStories && successStories.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {successStories.map((story) => (
            <div
              key={story.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Header with Masked Student & Score */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                      {story.student_identifier}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Background: <strong style={{ color: '#60a5fa' }}>{story.background_stream}</strong>
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--emerald-400)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '13px'
                  }}>
                    {story.rank_or_score}
                  </div>
                </div>

                {/* College Admitted */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}>
                  <Building size={14} style={{ color: 'var(--primary-500)' }} />
                  <span>Admitted / Placed: {story.college_or_post}</span>
                </div>

                {/* Testimonial Quote */}
                <div style={{
                  position: 'relative',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  fontStyle: 'italic',
                  paddingLeft: '14px',
                  borderLeft: '3px solid var(--primary-500)',
                  marginBottom: '14px'
                }}>
                  "{story.testimonial_snippet}"
                </div>
              </div>

              {/* Course Enrolled & Source footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-muted)',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span>Enrolled: <strong>{story.enrolled_course}</strong></span>
                <span>{story.academic_year}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No proven success stories currently logged for this category.
        </div>
      )}
    </div>
  );
};
