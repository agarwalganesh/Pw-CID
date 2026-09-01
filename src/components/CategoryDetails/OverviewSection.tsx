import React, { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Clock,
  Calendar,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Exam, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface OverviewSectionProps {
  category: Category;
  exams: Exam[];
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  category,
  exams
}) => {
  const [expandedExamId, setExpandedExamId] = useState<string | null>(exams[0]?.id || null);

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Category Overview & Exam Structures
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Key entrance examinations, conducting authorities, test formats, and marking schemes for {category.name}.
          </p>
        </div>
        <Badge status={category.data_status} />
      </div>

      {/* Grid of Exams */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {exams.map((exam) => {
          const isExpanded = expandedExamId === exam.id;
          return (
            <div
              key={exam.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: `1px solid ${isExpanded ? 'rgba(59, 130, 246, 0.4)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Exam Header / Collapsible trigger */}
              <div
                onClick={() => setExpandedExamId(isExpanded ? null : exam.id)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#ffffff',
                    backgroundColor: 'var(--primary-700)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.02em'
                  }}>
                    {exam.code}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {exam.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                      <span>Body: <strong style={{ color: 'var(--text-primary)' }}>{exam.conducting_body}</strong></span>
                      <span>•</span>
                      <span>Level: <strong style={{ color: 'var(--text-primary)' }}>{exam.exam_level}</strong></span>
                      <span>•</span>
                      <span>Frequency: <strong style={{ color: 'var(--text-primary)' }}>{exam.frequency}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    {exam.mode} ({exam.duration_minutes} Mins)
                  </span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Expanded Exam Details & Structure */}
              {isExpanded && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    fontSize: '13px'
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Official Authority Portal:</span>
                    <a
                      href={exam.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      Visit Official Portal
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {exam.structures && exam.structures.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Exam Paper Pattern & Sectional Blueprint:
                      </div>

                      {exam.structures.map((str) => {
                        let parsedSections: Array<{ name: string; questions: number; marks: number; duration: number }> = [];
                        try {
                          parsedSections = JSON.parse(str.sections_json);
                        } catch (e) {}

                        return (
                          <div
                            key={str.id}
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '14px 16px',
                              marginBottom: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                              <strong style={{ color: '#60a5fa' }}>{str.tier_name}</strong>
                              <span style={{ color: 'var(--text-muted)' }}>
                                Total: <strong>{str.total_questions} Questions</strong> | <strong>{str.total_marks} Marks</strong> ({str.duration_minutes} Mins)
                              </span>
                            </div>

                            {parsedSections.length > 0 && (
                              <div className="table-wrapper" style={{ marginBottom: '10px' }}>
                                <table className="data-table">
                                  <thead>
                                    <tr>
                                      <th>Section Name</th>
                                      <th>Questions</th>
                                      <th>Total Marks</th>
                                      <th>Time Allowed</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {parsedSections.map((sec, idx) => (
                                      <tr key={idx}>
                                        <td style={{ fontWeight: 600 }}>{sec.name}</td>
                                        <td>{sec.questions} Qs</td>
                                        <td>{sec.marks} Marks</td>
                                        <td>{sec.duration} Mins</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <HelpCircle size={14} style={{ color: 'var(--amber-400)' }} />
                              <span>Marking Scheme: <strong style={{ color: 'var(--text-primary)' }}>{str.marking_scheme}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
