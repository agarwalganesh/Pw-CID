import React from 'react';
import { AlertTriangle, Database, Calendar, Link } from 'lucide-react';
import { DataStatus } from '../../types';

interface DemoDataBannerProps {
  status: DataStatus;
  source?: string;
  academicYear?: string;
  lastUpdated?: string;
  compact?: boolean;
}

export const DemoDataBanner: React.FC<DemoDataBannerProps> = ({
  status,
  source,
  academicYear = '2025-2026',
  lastUpdated,
  compact = false
}) => {
  const isDemo = status === 'DEMO';

  if (compact) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: isDemo ? 'var(--amber-400)' : 'var(--emerald-400)',
        backgroundColor: isDemo ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
        padding: '6px 12px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${isDemo ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
      }}>
        {isDemo ? <AlertTriangle size={14} /> : <Database size={14} />}
        <span>
          <strong>{isDemo ? 'Demo Data — Replace with Live Data' : 'Verified Production Data'}</strong>
          {source && ` • Source: ${source}`}
        </span>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: isDemo ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
      border: `1px solid ${isDemo ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      margin: '16px 0 24px 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: isDemo ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          padding: '8px',
          borderRadius: '8px',
          color: isDemo ? 'var(--amber-400)' : 'var(--emerald-400)'
        }}>
          {isDemo ? <AlertTriangle size={20} /> : <Database size={20} />}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: isDemo ? '#fde68a' : '#a7f3d0' }}>
            {isDemo ? 'Demo Data Layer — Replace with Live Data' : 'Official Verified Record'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {source ? `Source Citation: ${source}` : 'Archived standard exam syllabus and official regulatory notification records'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={13} />
          Academic Cycle: <strong style={{ color: 'var(--text-primary)' }}>{academicYear}</strong>
        </span>
        {lastUpdated && (
          <span>
            Audit: <strong style={{ color: 'var(--text-primary)' }}>{lastUpdated}</strong>
          </span>
        )}
      </div>
    </div>
  );
};
