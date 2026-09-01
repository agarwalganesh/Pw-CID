import React from 'react';
import {
  FileText,
  Clock,
  CheckSquare,
  BookOpen,
  ShoppingBag,
  Shuffle,
  Building,
  BarChart3,
  Award
} from 'lucide-react';

export type SectionId =
  | 'overview'
  | 'preparation'
  | 'eligibility'
  | 'syllabus'
  | 'courses'
  | 'exams-mapping'
  | 'colleges'
  | 'results'
  | 'proven-results';

interface QuickNavProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
}

const navItems: Array<{ id: SectionId; label: string; icon: React.ReactNode }> = [
  { id: 'overview', label: 'Overview', icon: <FileText size={14} /> },
  { id: 'preparation', label: 'Preparation', icon: <Clock size={14} /> },
  { id: 'eligibility', label: 'Eligibility', icon: <CheckSquare size={14} /> },
  { id: 'syllabus', label: 'Syllabus & Topics', icon: <BookOpen size={14} /> },
  { id: 'courses', label: 'Courses & Batches', icon: <ShoppingBag size={14} /> },
  { id: 'exams-mapping', label: 'Exam Mapping', icon: <Shuffle size={14} /> },
  { id: 'colleges', label: 'Top Colleges / Institutes', icon: <Building size={14} /> },
  { id: 'results', label: '3-Year Results', icon: <BarChart3 size={14} /> },
  { id: 'proven-results', label: 'Proven Results', icon: <Award size={14} /> }
];

export const QuickNav: React.FC<QuickNavProps> = ({
  activeSection,
  onSelectSection
}) => {
  return (
    <div className="sticky-nav">
      <ul className="sticky-nav-list">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <button
                className={`nav-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
