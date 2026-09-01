import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Clock,
  Shuffle
} from 'lucide-react';
import { StudentProfile, FitmentResult, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface FitmentReportViewProps {
  profile: StudentProfile;
  fitment: FitmentResult;
  category: Category | null;
  onRecalculate: () => void;
  onOpenPitch: () => void;
}

export const FitmentReportView: React.FC<FitmentReportViewProps> = ({
  profile,
  fitment,
  category,
  onRecalculate,
  onOpenPitch
}) => {
  const isHighFitment = fitment.overall_fitment_score >= 75;
  const isModerate = fitment.overall_fitment_score >= 50 && fitment.overall_fitment_score < 75;

  return (
    <div>
      {/* Top Status & Score Card */}
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        border: `1px solid ${fitment.is_eligible ? (isHighFitment ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)') : 'rgba(244, 63, 94, 0.4)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Candidate: <strong style={{ color: '#ffffff' }}>{profile.student_name}</strong>
            </span>
            <span>•</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Target: <strong style={{ color: 'var(--primary-500)' }}>{category?.name}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
              {fitment.fitment_tier}
            </h3>
            <span className={`badge ${fitment.is_eligible ? 'badge-verified' : 'badge-high'}`}>
              {fitment.is_eligible ? 'ELIGIBILITY PASSED' : 'INELIGIBLE'}
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {fitment.is_eligible
              ? 'Candidate meets all mandatory statutory criteria. Course recommendations and personalized pitch generated.'
              : 'Candidate does not satisfy minimum regulatory eligibility. See hard filter flags below.'}
          </p>
        </div>

        {/* Fitment Score Circle Gauge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: 900,
            color: fitment.is_eligible ? (isHighFitment ? 'var(--emerald-400)' : 'var(--amber-400)') : 'var(--rose-400)',
            lineHeight: 1
          }}>
            {fitment.overall_fitment_score}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px', fontWeight: 700 }}>
            Fitment Score
          </div>
        </div>
      </div>

      {/* Hard Filter Flags if Ineligible */}
      {!fitment.is_eligible && fitment.hard_filter_issues.length > 0 && (
        <div style={{
          backgroundColor: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose-400)', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
            <AlertTriangle size={18} />
            Mandatory Eligibility Disqualifications:
          </div>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#fecdd3', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {fitment.hard_filter_issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Weighted Soft Factors Table */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
          Deterministic Evaluation Breakdown (Weighted Soft Factors):
        </h4>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Factor Evaluated</th>
                <th>Weight</th>
                <th>Score</th>
                <th>Diagnostic Findings</th>
              </tr>
            </thead>
            <tbody>
              {fitment.factors.map((f, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{f.factor}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{f.weight}%</td>
                  <td>
                    <span style={{
                      fontWeight: 800,
                      color: f.score >= 80 ? 'var(--emerald-400)' : f.score >= 60 ? 'var(--amber-400)' : 'var(--rose-400)'
                    }}>
                      {f.score} / 100
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {f.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Course Card */}
      {fitment.recommended_course && (
        <div style={{
          backgroundColor: 'rgba(59, 130, 246, 0.06)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge badge-verified">OPTIMAL RECOMMENDED BATCH</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--emerald-400)' }}>
              ₹{fitment.recommended_course.fees_inr.toLocaleString('en-IN')}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            {fitment.recommended_course.name}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {fitment.recommended_course.target_student_profile}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px' }}>
            <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              Level: <strong>{fitment.recommended_course.level}</strong>
            </span>
            <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              Language: <strong>{fitment.recommended_course.language}</strong>
            </span>
            <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              Duration: <strong>{fitment.recommended_course.duration_months} Months</strong>
            </span>
          </div>
        </div>
      )}

      {/* Gap Analysis & Backup Exams */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {/* Preparation Gaps */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={15} />
            Identified Preparation Gaps:
          </div>
          <ul style={{ paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {fitment.preparation_gaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>

        {/* Daily Schedule & Backup Exams */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} />
            Recommended Daily Routine:
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            {fitment.recommended_daily_plan}
          </p>

          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald-400)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shuffle size={14} />
            Allied Backup Exams:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {fitment.backup_exams_available.map((ex, i) => (
              <span key={i} className="badge badge-neutral" style={{ fontSize: '11px' }}>
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <button className="btn btn-secondary btn-sm" onClick={onRecalculate}>
          <RefreshCw size={13} />
          Adjust Profile Inputs
        </button>

        <button className="btn btn-primary" onClick={onOpenPitch}>
          <Sparkles size={16} />
          Generate 11-Step AI Counsellor Pitch
        </button>
      </div>
    </div>
  );
};
