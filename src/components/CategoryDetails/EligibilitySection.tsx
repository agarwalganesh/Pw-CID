import React from 'react';
import {
  CheckSquare,
  AlertCircle,
  GraduationCap,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { EligibilityRule, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface EligibilitySectionProps {
  category: Category;
  eligibilityRules: EligibilityRule[];
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({
  category,
  eligibilityRules
}) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Eligibility Criteria & Hard Prerequisites
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Strict academic, age, stream, and attempt requirements to verify student eligibility before recommending courses.
          </p>
        </div>
        <Badge status={category.data_status} />
      </div>

      {eligibilityRules.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {eligibilityRules.map((rule) => (
            <div
              key={rule.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#60a5fa',
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    {rule.exam_code || category.name}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Eligibility Guidelines
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Source: {rule.source}
                </span>
              </div>

              {/* Grid of Key Criteria */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Min Academic Score
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--emerald-400)' }}>
                    {rule.min_percentage > 0 ? `${rule.min_percentage}% Aggregate` : 'Passing Marks'}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Age Limitations
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rule.age_limit_min || rule.age_limit_max ? (
                      <>
                        {rule.age_limit_min ? `Min: ${rule.age_limit_min} yrs ` : ''}
                        {rule.age_limit_max ? `Max: ${rule.age_limit_max} yrs` : 'No Upper Limit'}
                      </>
                    ) : (
                      'No Age Restrictions'
                    )}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Max Attempts
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rule.attempts_limit || 'No Attempt Cap'}
                  </div>
                </div>
              </div>

              {/* Minimum Qualification & Streams */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <GraduationCap size={16} style={{ color: 'var(--primary-500)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Minimum Qualification: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{rule.min_qualification}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Layers size={16} style={{ color: 'var(--primary-500)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Stream & Disciplines: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{rule.stream_requirements}</span>
                  </div>
                </div>

                {rule.special_conditions && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    marginTop: '6px'
                  }}>
                    <AlertCircle size={15} style={{ color: 'var(--amber-400)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '12px', color: '#fef3c7' }}>
                      <strong>Important Note: </strong>
                      {rule.special_conditions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Data not available for category eligibility.
        </div>
      )}
    </div>
  );
};
