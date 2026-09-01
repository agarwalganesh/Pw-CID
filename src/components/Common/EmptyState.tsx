import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No verified data available',
  message = 'No records match your active filter criteria.',
  actionText,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
      gap: '12px',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      border: '1px dashed var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-secondary)'
    }}>
      <Inbox size={32} style={{ color: 'var(--text-muted)' }} />
      <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h4>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px' }}>{message}</p>
      {actionText && onAction && (
        <button className="btn btn-outline btn-sm" onClick={onAction} style={{ marginTop: '6px' }}>
          {actionText}
        </button>
      )}
    </div>
  );
};
