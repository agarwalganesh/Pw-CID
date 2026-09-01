import React, { useState, useMemo } from 'react';
import {
  Building,
  ExternalLink,
  MapPin,
  Award,
  TrendingUp,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { College, Category } from '../../types';
import { Badge } from '../Common/Badge';
import { SearchBar } from '../Common/SearchBar';

interface CollegesSectionProps {
  category: Category;
  colleges: College[];
}

export const CollegesSection: React.FC<CollegesSectionProps> = ({
  category,
  colleges
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColleges = useMemo(() => {
    if (!searchQuery.trim()) return colleges;
    const q = searchQuery.toLowerCase();
    return colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.institution_type.toLowerCase().includes(q) ||
        c.programs.some((p) => p.program_name.toLowerCase().includes(q) || p.exam_code.toLowerCase().includes(q))
    );
  }, [colleges, searchQuery]);

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Top / Relevant Institutions & Admission Criteria ({colleges.length})
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Institutions, program seat matrix, entrance cutoffs, and verified placement packages for {category.name}.
          </p>
        </div>

        <div style={{ width: '280px' }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search colleges (e.g. IIM, NLSIU)..."
          />
        </div>
      </div>

      {filteredColleges.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '22px'
              }}
            >
              {/* College Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-verified">{college.institution_type}</span>
                    <Badge status={college.data_status} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                    {college.name} ({college.code})
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} style={{ color: 'var(--primary-500)' }} />
                      {college.location}
                    </span>
                    <span>•</span>
                    <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>
                      {college.accreditation}
                    </span>
                  </div>
                </div>

                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '12px', padding: '5px 10px' }}
                >
                  Official Site
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Programs & Cutoffs Table */}
              {college.programs && college.programs.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Program / Role</th>
                          <th>Exam Code</th>
                          <th>Seats</th>
                          <th>Exam Cutoff</th>
                          <th>Placement CTC</th>
                          <th>Selection Process</th>
                        </tr>
                      </thead>
                      <tbody>
                        {college.programs.map((prg) => (
                          <tr key={prg.id}>
                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                              {prg.program_name}
                            </td>
                            <td>
                              <span style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                                color: '#60a5fa',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '11px'
                              }}>
                                {prg.exam_code}
                              </span>
                            </td>
                            <td>{prg.seats > 0 ? `${prg.seats} Seats` : 'Competitive'}</td>
                            <td style={{ color: 'var(--amber-400)', fontWeight: 600 }}>
                              {prg.exam_cutoff_percentile || prg.exam_cutoff_rank || 'N/A'}
                            </td>
                            <td>
                              {prg.avg_package_lpa ? (
                                <span style={{ color: 'var(--emerald-400)', fontWeight: 700 }}>
                                  ₹{prg.avg_package_lpa} LPA Avg
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)' }}>Govt Pay Band</span>
                              )}
                            </td>
                            <td style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '240px' }}>
                              {prg.selection_process || 'Merit Rank Shortlisting'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Source Tag */}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'right' }}>
                Verified Citation: {college.source}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No institutions match your search query.
        </div>
      )}
    </div>
  );
};
