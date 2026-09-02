import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Category } from '../../types';
import { CategoryCard } from './CategoryCard';
import { SearchBar } from '../Common/SearchBar';
import { EmptyState } from '../Common/EmptyState';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onOpenFitmentWithCategory: (category: Category) => void;
  onOpenFitmentModal: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  onOpenFitmentWithCategory,
  onOpenFitmentModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  return (
    <div style={{ width: '100%' }}>
      {/* Hero / Platform Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 20px',
        margin: '16px 0 24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '18px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ maxWidth: '680px', flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-verified">OFFICIAL COUNSELLOR SUITE</span>
            <span className="badge badge-demo">2025-2026 ACADEMIC SESSION</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            lineHeight: '1.25'
          }}>
            EdTech Counsellor Intelligence & Fitment Platform
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Instant syllabus mappings, eligibility cutoffs, 3-year historical results, and student fitment algorithms for 11 core exam categories.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px', flex: '1 1 240px' }}>
          <button
            className="btn btn-primary"
            onClick={onOpenFitmentModal}
            style={{ padding: '12px 18px', fontSize: '13px', width: '100%' }}
          >
            <Sparkles size={16} />
            Evaluate Student Profile & Pitch
          </button>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            Rule-based algorithmic recommendations
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '18px'
      }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
            All 11 Categories ({filteredCategories.length})
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Tap any category to open its dedicated Counsellor Cockpit.
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: '340px' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search categories (e.g. MBA, CLAT, CA)..."
          />
        </div>
      </div>

      {/* Grid of Categories */}
      {filteredCategories.length > 0 ? (
        <div className="grid-11">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onSelectCategory}
              onOpenFitmentWithCategory={onOpenFitmentWithCategory}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching categories found"
          message={`No category matched "${searchQuery}". Please try another keyword or clear search.`}
          actionText="Clear Filter"
          onAction={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};
