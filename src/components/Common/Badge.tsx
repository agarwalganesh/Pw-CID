import React from 'react';
import { ShieldCheck, AlertCircle, Radio, Clock } from 'lucide-react';
import { DataStatus } from '../../types';

interface BadgeProps {
  status?: DataStatus | string;
  type?: 'status' | 'difficulty' | 'importance' | 'neutral';
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, type = 'status', text, className = '' }) => {
  if (type === 'status' || status === 'DEMO' || status === 'VERIFIED' || status === 'LIVE' || status === 'EXPIRED') {
    switch (status) {
      case 'DEMO':
        return (
          <span className={`badge badge-demo ${className}`}>
            <AlertCircle size={12} />
            {text || 'Demo Data'}
          </span>
        );
      case 'VERIFIED':
        return (
          <span className={`badge badge-verified ${className}`}>
            <ShieldCheck size={12} />
            {text || 'Verified'}
          </span>
        );
      case 'LIVE':
        return (
          <span className={`badge badge-live ${className}`}>
            <Radio size={12} />
            {text || 'Live'}
          </span>
        );
      case 'EXPIRED':
        return (
          <span className={`badge badge-high ${className}`}>
            <Clock size={12} />
            {text || 'Expired'}
          </span>
        );
      default:
        return <span className={`badge badge-neutral ${className}`}>{text || status}</span>;
    }
  }

  if (type === 'importance' || type === 'difficulty') {
    const val = (text || status || '').toLowerCase();
    if (val === 'high' || val === 'hard') {
      return <span className={`badge badge-high ${className}`}>{text || status}</span>;
    }
    if (val === 'medium' || val === 'moderate') {
      return <span className={`badge badge-med ${className}`}>{text || status}</span>;
    }
    return <span className={`badge badge-low ${className}`}>{text || status}</span>;
  }

  return <span className={`badge badge-neutral ${className}`}>{text || status}</span>;
};
