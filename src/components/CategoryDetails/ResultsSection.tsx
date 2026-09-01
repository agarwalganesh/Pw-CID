import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Filter,
  Calendar,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ExamResult, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface ResultsSectionProps {
  category: Category;
  results: ExamResult[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  category,
  results
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const years = useMemo(() => {
    const set = new Set<string>();
    results.forEach((r) => set.add(r.academic_year));
    return Array.from(set).sort().reverse();
  }, [results]);

  const filteredResults = useMemo(() => {
    if (selectedYear === 'all') return results;
    return results.filter((r) => r.academic_year === selectedYear);
  }, [results, selectedYear]);

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
            Exam Results — Last 3 Years Historical Audit
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Track record of percentiles, selections, and AIR top ranks for {category.name} across recent academic cycles.
          </p>
        </div>

        {/* Year Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`btn btn-sm ${selectedYear === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedYear('all')}
          >
            All 3 Years
          </button>
          {years.map((yr) => (
            <button
              key={yr}
              className={`btn btn-sm ${selectedYear === yr ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedYear(yr)}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Academic Year</th>
                <th>Exam</th>
                <th>Result Metric</th>
                <th>Performance Value</th>
                <th>Detailed Audit Report</th>
                <th>Data Status</th>
                <th>Verified By</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: 700, color: '#60a5fa' }}>{res.academic_year}</td>
                  <td>
                    <span style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.12)',
                      color: '#60a5fa',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '11px'
                    }}>
                      {res.exam_code}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{res.result_metric_type}</td>
                  <td style={{ fontSize: '14px', fontWeight: 800, color: 'var(--emerald-400)' }}>
                    {res.metric_value}
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                    {res.details}
                  </td>
                  <td>
                    <Badge status={res.data_status} />
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {res.verified_by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No verified results available for this category and year filter.
        </div>
      )}
    </div>
  );
};
