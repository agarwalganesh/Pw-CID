import React from 'react';
import { Home, Sparkles, Layers, PhoneCall } from 'lucide-react';
import { Category } from '../../types';

interface MobileQuickBarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  onOpenFitmentModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenFitmentModal
}) => {
  return (
    <div className="show-on-mobile" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 90,
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(51, 65, 85, 0.8)',
      padding: '8px 16px',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.4)'
    }}>
      {/* 1. Home / All Categories */}
      <button
        onClick={() => onSelectCategory(null)}
        style={{
          background: 'none',
          border: 'none',
          color: selectedCategory === null ? '#38bdf8' : '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '4px 8px'
        }}
      >
        <Home size={18} />
        <span>11 Categories</span>
      </button>

      {/* 2. Fitment & Pitch AI Button (Highlighted) */}
      <button
        onClick={onOpenFitmentModal}
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: '0 0 16px rgba(37, 99, 235, 0.5)',
          transform: 'translateY(-4px)'
        }}
      >
        <Sparkles size={15} />
        <span>Fitment AI</span>
      </button>

      {/* 3. Current Category Cockpit */}
      {selectedCategory ? (
        <button
          onClick={() => {}}
          style={{
            background: 'none',
            border: 'none',
            color: '#fbbf24',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          <PhoneCall size={18} />
          <span>{selectedCategory.name}</span>
        </button>
      ) : (
        <div style={{ position: 'relative' }}>
          <select
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
            onChange={(e) => {
              const found = categories.find(c => c.id === e.target.value);
              if (found) onSelectCategory(found);
            }}
            value=""
          >
            <option value="" disabled>Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#94a3b8'
          }}>
            <Layers size={18} />
            <span>Select</span>
          </div>
        </div>
      )}
    </div>
  );
};
