import React from 'react';
import {
  Briefcase,
  Scale,
  Atom,
  Pill,
  GraduationCap,
  FileSpreadsheet,
  Train,
  Cpu,
  Landmark,
  Shield,
  Building2,
  BookOpen,
  School,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Category } from '../../types';
import { Badge } from '../Common/Badge';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  onOpenFitmentWithCategory: (category: Category) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={22} />,
  Scale: <Scale size={22} />,
  Atom: <Atom size={22} />,
  Pill: <Pill size={22} />,
  GraduationCap: <GraduationCap size={22} />,
  FileSpreadsheet: <FileSpreadsheet size={22} />,
  Train: <Train size={22} />,
  Cpu: <Cpu size={22} />,
  Landmark: <Landmark size={22} />,
  Shield: <Shield size={22} />,
  Building2: <Building2 size={22} />
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
  onOpenFitmentWithCategory
}) => {
  const icon = iconMap[category.icon] || <BookOpen size={22} />;

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={() => onSelect(category)}
    >
      <div>
        {/* Top bar with icon & status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            color: 'var(--primary-500)',
            padding: '10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
          <Badge status={category.data_status} />
        </div>

        {/* Category Name & Tagline */}
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {category.name}
        </h3>
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-500)', marginBottom: '10px' }}>
          {category.tagline}
        </p>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.4',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {category.description}
        </p>
      </div>

      {/* Metrics & Quick Action */}
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '10px',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '14px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{category.exam_count}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Exams</div>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--emerald-400)' }}>{category.course_count}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Courses</div>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#60a5fa' }}>{category.college_count}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Institutes</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(category);
            }}
          >
            Explore
            <ArrowRight size={13} />
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFitmentWithCategory(category);
            }}
            title="Evaluate student for this category"
          >
            <Sparkles size={13} />
            Fitment
          </button>
        </div>
      </div>
    </div>
  );
};
