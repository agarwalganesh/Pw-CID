import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Calendar,
  Layers,
  ChevronDown
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
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left: Brand / Home Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            onClick={() => onSelectCategory(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              backgroundColor: 'var(--primary-600)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em', color: '#ffffff' }}>
                  COUNSELLOR<span style={{ color: 'var(--primary-500)' }}>IQ</span>
                </span>
                <span className="badge badge-demo" style={{ fontSize: '10px' }}>INTERNAL</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                EdTech Counsellor Intelligence & Pitch Platform
              </div>
            </div>
          </div>

          {selectedCategory && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectCategory(null)}
              style={{ marginLeft: '12px', fontSize: '12px', padding: '6px 12px' }}
            >
              <ArrowLeft size={14} />
              All 11 Categories
            </button>
          )}
        </div>

        {/* Center: Category Quick Jumper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <Layers size={14} style={{ color: 'var(--primary-500)' }} />
            <span>Category:</span>
            <select
              className="input-control"
              style={{ padding: '6px 12px', fontSize: '13px', width: 'auto', minWidth: '150px' }}
              value={selectedCategory?.id || ''}
              onChange={(e) => {
                const found = categories.find(c => c.id === e.target.value);
                onSelectCategory(found || null);
              }}
            >
              <option value="">-- Select Category (11 Available) --</option>
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
            fontSize: '12px',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Calendar size={13} style={{ color: 'var(--emerald-400)' }} />
            <span>Session: <strong>2025-2026</strong></span>
          </div>
        </div>

        {/* Right: Student Fitment & Pitch Engine Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={onOpenFitmentModal}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              boxShadow: '0 0 16px rgba(59, 130, 246, 0.35)'
            }}
          >
            <Sparkles size={16} />
            Student Fitment & AI Pitch
          </button>
        </div>
      </div>
    </header>
  );
};
