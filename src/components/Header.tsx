import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  onOpenFitmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenFitmentModal
}) => {
  return (
    <header style={{
      backgroundColor: 'rgba(15, 23, 42, 0.96)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '10px 14px'
      }}>
        {/* Main Desktop & Tablet Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {/* Left: Brand / Home Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              onClick={() => onSelectCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                backgroundColor: 'var(--primary-600)',
                color: '#ffffff',
                padding: '7px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: '#ffffff' }}>
                    COUNSELLOR<span style={{ color: 'var(--primary-500)' }}>IQ</span>
                  </span>
                  <span className="badge badge-demo" style={{ fontSize: '9px', padding: '2px 6px' }}>LIVE</span>
                </div>
                <div className="hide-on-mobile" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                  EdTech Counsellor Intelligence Suite
                </div>
              </div>
            </div>

            {selectedCategory && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onSelectCategory(null)}
                style={{ fontSize: '11px', padding: '5px 10px' }}
              >
                <ArrowLeft size={13} />
                <span className="hide-on-mobile">All Categories</span>
              </button>
            )}
          </div>

          {/* Desktop Center: Category Quick Jumper */}
          <div className="hide-on-mobile" style={{ alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Layers size={14} style={{ color: 'var(--primary-500)' }} />
              <select
                className="input-control"
                style={{ padding: '6px 10px', fontSize: '12px', width: 'auto', minWidth: '180px' }}
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                  const found = categories.find(c => c.id === e.target.value);
                  onSelectCategory(found || null);
                }}
              >
                <option value="">-- Quick Jump Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.exam_count} Exams)
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}>
              <Calendar size={12} style={{ color: 'var(--emerald-400)' }} />
              <span>2025-2026</span>
            </div>
          </div>

          {/* Right: Student Fitment Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-primary"
              onClick={onOpenFitmentModal}
              style={{
                padding: '7px 12px',
                fontSize: '12px',
                boxShadow: '0 0 14px rgba(59, 130, 246, 0.35)'
              }}
            >
              <Sparkles size={14} />
              <span>Student Fitment AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Row 2: Category Selector on mobile screens */}
        <div className="show-on-mobile" style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          alignItems: 'center',
          gap: '8px',
          width: '100%'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <select
              className="input-control"
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                width: '100%',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                borderColor: 'var(--border-subtle)'
              }}
              value={selectedCategory?.id || ''}
              onChange={(e) => {
                const found = categories.find(c => c.id === e.target.value);
                onSelectCategory(found || null);
              }}
            >
              <option value="">⚡ Switch Exam Category (11 Available)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.tagline}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
