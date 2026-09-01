import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load intelligence data',
  message = 'An unexpected error occurred while communicating with the data engine.',
  onRetry
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '14px',
      textAlign: 'center',
      backgroundColor: 'rgba(244, 63, 94, 0.05)',
      border: '1px solid rgba(244, 63, 94, 0.2)',
      borderRadius: 'var(--radius-md)',
      margin: '20px 0'
    }}>
      <div style={{
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
        padding: '12px',
        borderRadius: '50%',
        color: 'var(--rose-400)'
      }}>
        <AlertOctagon size={32} />
      </div>
      <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px' }}>{message}</p>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" onClick={onRetry} style={{ marginTop: '8px' }}>
          <RefreshCw size={14} />
          Retry Request
        </button>
      )}
    </div>
  );
};
