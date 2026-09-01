import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Sparkles,
  Zap,
  Target,
  Shuffle
} from 'lucide-react';
import { Subject, Category } from '../../types';
import { Badge } from '../Common/Badge';
import { SearchBar } from '../Common/SearchBar';

interface SyllabusSectionProps {
  category: Category;
  subjects: Subject[];
}

export const SyllabusSection: React.FC<SyllabusSectionProps> = ({
  category,
  subjects
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(subjects[0]?.id || '');
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');

  const activeSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  const filteredTopics = useMemo(() => {
    if (!activeSubject) return [];
    if (!topicSearchQuery.trim()) return activeSubject.topics;
    const q = topicSearchQuery.toLowerCase();
    return activeSubject.topics.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.importance_level.toLowerCase().includes(q) ||
        t.difficulty.toLowerCase().includes(q) ||
        (t.overlap_exams || []).some((ex) => ex.toLowerCase().includes(q))
    );
  }, [activeSubject, topicSearchQuery]);

  if (!subjects || subjects.length === 0) {
    return (
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Syllabus & High-Yield Topics
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Data not available for syllabus breakdown.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Syllabus, Subjects & High-Yield Topics
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Detailed breakdown of subject weightage, topic importance, expected question count, and cross-exam syllabus overlap.
          </p>
        </div>
        <div style={{ width: '280px' }}>
          <SearchBar
            value={topicSearchQuery}
            onChange={setTopicSearchQuery}
            placeholder="Search topics (e.g. Algebra, RC)..."
          />
        </div>
      </div>

      {/* Subject Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '20px'
      }}>
        {subjects.map((sub) => {
          const isActive = sub.id === activeSubject?.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setActiveSubjectId(sub.id);
                setTopicSearchQuery('');
              }}
              style={{
                backgroundColor: isActive ? 'var(--primary-600)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--primary-500)' : 'var(--border-subtle)'}`,
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{sub.name}</span>
              <span style={{
                fontSize: '11px',
                backgroundColor: isActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                padding: '2px 6px',
                borderRadius: '4px',
                color: isActive ? '#ffffff' : 'var(--text-muted)'
              }}>
                {sub.weightage_percentage}% Weightage
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Subject Information & Topic Cards */}
      {activeSubject && (
        <div>
          <div style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeSubject.name} ({activeSubject.code})
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {activeSubject.description}
              </p>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--emerald-400)', fontWeight: 700 }}>
              Exam Weightage: ~{activeSubject.weightage_percentage}%
            </div>
          </div>

          {/* Topics List Table */}
          {filteredTopics.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Important Topic Name</th>
                    <th>Importance</th>
                    <th>Difficulty</th>
                    <th>Expected Questions</th>
                    <th>Cross-Exam Overlap</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTopics.map((topic) => (
                    <tr key={topic.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {topic.name}
                      </td>
                      <td>
                        <Badge type="importance" text={topic.importance_level} />
                      </td>
                      <td>
                        <Badge type="difficulty" text={topic.difficulty} />
                      </td>
                      <td style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>
                        {topic.expected_questions}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {topic.overlap_exams && topic.overlap_exams.length > 0 ? (
                            topic.overlap_exams.map((ex, i) => (
                              <span
                                key={i}
                                style={{
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  backgroundColor: 'rgba(59, 130, 246, 0.12)',
                                  color: '#60a5fa',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  border: '1px solid rgba(59, 130, 246, 0.25)'
                                }}
                              >
                                {ex}
                              </span>
                            ))
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Unique to Exam</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No topics matched "{topicSearchQuery}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
