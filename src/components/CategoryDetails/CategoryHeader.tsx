import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Layers, Award, Building } from 'lucide-react';
import { Category, Exam } from '../../types';
import { DemoDataBanner } from '../Common/DemoDataBanner';

interface CategoryHeaderProps {
  category: Category;
  exams: Exam[];
  onBack: () => void;
  onOpenFitment: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  exams,
  onBack,
  onOpenFitment
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {/* Top Breadcrumb / Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          Back to All Categories
        </button>

        <button className="btn btn-primary btn-sm" onClick={onOpenFitment}>
          <Sparkles size={14} />
          Evaluate Fitment for {category.name}
        </button>
      </div>

      {/* Main Category Header Block */}
      <div className="card" style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-verified">CATEGORY INTELLIGENCE</span>
              <span className="badge badge-demo">{category.data_status} DATA</span>
            </div>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {category.name}
            </h1>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--primary-500)', marginBottom: '10px' }}>
              {category.tagline}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: '1.6' }}>
              {category.description}
            </p>
          </div>

          {/* Exam Chips Container */}
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            minWidth: '260px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Primary Entrance Exams ({exams.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exams.map((ex) => (
                <span
                  key={ex.id}
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {ex.code}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Demo Status Banner */}
        <DemoDataBanner
          status={category.data_status}
          source={category.source}
          academicYear={category.academic_year}
          lastUpdated={category.last_updated}
        />
      </div>
    </div>
  );
};
