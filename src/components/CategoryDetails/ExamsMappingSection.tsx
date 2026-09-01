import React from 'react';
import {
  Shuffle,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { ExamMapping, Category } from '../../types';

interface ExamsMappingSectionProps {
  category: Category;
  examMappings: ExamMapping[];
}

export const ExamsMappingSection: React.FC<ExamsMappingSectionProps> = ({
  category,
  examMappings
}) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Cross-Exam Mapping & Backup Strategy
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Detailed syllabus overlap analytics and dual-exam strategy to help students target primary and backup examinations simultaneously.
        </p>
      </div>

      {examMappings && examMappings.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {examMappings.map((map) => (
            <div
              key={map.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header: Exam A -> Exam B */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ fontWeight: 800, color: '#60a5fa', fontSize: '15px' }}>
                    {map.primary_exam_code}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <Shuffle size={14} />
                    <span>Mapped to</span>
                    <ArrowRight size={14} />
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--emerald-400)', fontSize: '15px' }}>
                    {map.secondary_exam_code}
                  </div>
                </div>

                {/* Overlap Progress Bar */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Syllabus Overlap:</span>
                    <strong style={{ color: 'var(--emerald-400)' }}>{map.syllabus_overlap_percentage}%</strong>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${map.syllabus_overlap_percentage}%`,
                      height: '100%',
                      backgroundColor: 'var(--emerald-500)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>

                {/* Difficulty Comparison */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Pattern & Difficulty Contrast:
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {map.difficulty_comparison}
                  </p>
                </div>
              </div>

              {/* Counsellor Strategy Tip */}
              <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginTop: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#60a5fa', marginBottom: '2px' }}>
                  <Lightbulb size={14} />
                  Counsellor Talking Point:
                </div>
                <p style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: '1.4' }}>
                  {map.preparation_strategy}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Data not available for cross-exam mappings.
        </div>
      )}
    </div>
  );
};
