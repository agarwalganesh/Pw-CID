import React from 'react';
import {
  Clock,
  BookOpen,
  Target,
  CheckCircle2,
  AlertTriangle,
  Zap,
  CalendarDays
} from 'lucide-react';
import { PreparationStrategy, Category } from '../../types';

interface PreparationSectionProps {
  category: Category;
  preparation: PreparationStrategy | null;
}

export const PreparationSection: React.FC<PreparationSectionProps> = ({
  category,
  preparation
}) => {
  if (!preparation) {
    return (
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Preparation Roadmap & Study Plan
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Data not available for this category roadmap.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Preparation Strategy & Strategic Roadmap
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Standard benchmark guidelines to counsel students on daily study dedication, phase transitions, and mock test rhythm.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary-500)', padding: '10px', borderRadius: '8px' }}>
            <CalendarDays size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ideal Timeline</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {preparation.recommended_timeline_months} Months
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-400)', padding: '10px', borderRadius: '8px' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Daily Study Hours</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--emerald-400)' }}>
              {preparation.daily_study_hours} Hours / Day
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: 'var(--rose-400)', padding: '10px', borderRadius: '8px' }}>
            <Zap size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Difficulty Rating</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rose-400)' }}>
              {preparation.difficulty_rating}
            </div>
          </div>
        </div>
      </div>

      {/* Preparation Key Phases Timeline */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={16} style={{ color: 'var(--primary-500)' }} />
          Structured 3-Phase Preparation Roadmap:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {preparation.key_phases.map((phase, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div style={{
                backgroundColor: 'var(--primary-600)',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    {phase.phase}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--primary-500)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {phase.duration}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {phase.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Frequency & Resources */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {/* Mock test strategy */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} />
            Mock Test Benchmarking Cadence:
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {preparation.mock_test_frequency}
          </p>
        </div>

        {/* Standard Books */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--emerald-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={15} />
            Recommended Reference Books & Materials:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {preparation.recommended_resources.map((res, i) => (
              <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--emerald-400)' }}>•</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
