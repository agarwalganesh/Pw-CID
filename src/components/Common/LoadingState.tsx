import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading category intelligence...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      gap: '16px',
      color: 'var(--text-secondary)'
    }}>
      <Loader2 size={36} className="animate-spin" style={{ color: 'var(--primary-500)', animation: 'spin 1s linear infinite' }} />
      <p style={{ fontSize: '15px', fontWeight: 500 }}>{message}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
