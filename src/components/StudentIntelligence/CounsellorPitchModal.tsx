import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  PhoneCall,
  User,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StudentProfile, FitmentResult, CounsellorPitchResponse } from '../../types';
import { generatePitch } from '../../api/client';
import { LoadingState } from '../Common/LoadingState';
import { ErrorState } from '../Common/ErrorState';

interface CounsellorPitchModalProps {
  profile: StudentProfile;
  fitment: FitmentResult;
  onClose: () => void;
}

export const CounsellorPitchModal: React.FC<CounsellorPitchModalProps> = ({
  profile,
  fitment,
  onClose
}) => {
  const [pitchData, setPitchData] = useState<CounsellorPitchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expandedObjectionIdx, setExpandedObjectionIdx] = useState<number | null>(0);

  useEffect(() => {
    async function loadPitch() {
      try {
        setLoading(true);
        const data = await generatePitch(profile, fitment);
        setPitchData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to generate pitch');
      } finally {
        setLoading(false);
      }
    }
    loadPitch();
  }, [profile, fitment]);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyFullPitch = () => {
    if (!pitchData) return;
    const p = pitchData.pitch_sections;
    const fullText = `=== COUNSELLOR CALL SCRIPT ===
Student: ${pitchData.student_name} | Target: ${pitchData.target_category} | Course: ${pitchData.recommended_course_name}

1. OPENING:
${p.opening}

2. REQUIREMENT UNDERSTANDING:
${p.requirement_understanding}

3. CURRENT PREPARATION:
${p.current_preparation_analysis}

4. GAP IDENTIFICATION:
${p.gap_identification}

5. RECOMMENDED SOLUTION:
${p.recommended_solution}

6. WHY IT FITS:
${p.why_it_fits}

7. PROOF OF RESULTS:
${p.proof_of_results}

8. EXAM COVERAGE & BACKUPS:
${p.exam_coverage_and_backups}

9. GENUINE DIFFERENTIATION:
${p.genuine_differentiation}

10. OBJECTION HANDLING:
${p.objection_handling.map((o) => `${o.objection}\n-> ${o.counsellor_response}`).join('\n\n')}

11. CLOSING & NEXT STEP:
${p.closing_and_next_step}
`;
    copyToClipboard(fullText, 'full');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: 'var(--primary-600)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                  AI-Assisted Counsellor Pitch & Live Script
                </h2>
                <span className="badge badge-verified">11-STEP STRUCTURED FLOW</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Targeting: <strong>{profile.student_name}</strong> • Course: <strong style={{ color: 'var(--primary-500)' }}>{fitment.recommended_course?.name || 'Selected Program'}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {pitchData && (
              <button className="btn btn-outline btn-sm" onClick={copyFullPitch}>
                {copiedSection === 'full' ? <Check size={14} /> : <Copy size={14} />}
                {copiedSection === 'full' ? 'Full Pitch Copied!' : 'Copy Full Pitch'}
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {loading && <LoadingState message="Synthesizing personalized 11-step pitch with verified exam statistics..." />}
        {error && <ErrorState message={error} />}

        {pitchData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 1. Opening */}
            <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa' }}>
                  Step 1 • Personalized Warm Opening
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(pitchData.pitch_sections.opening, 'sec1')}
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  {copiedSection === 'sec1' ? <Check size={12} /> : <Copy size={12} />}
                  Copy
                </button>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                "{pitchData.pitch_sections.opening}"
              </p>
            </div>

            {/* 2 & 3. Requirement & Current Prep */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
              <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Step 2 • Goal & Requirement Alignment
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.requirement_understanding, 'sec2')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec2' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.requirement_understanding}"
                </p>
              </div>

              <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Step 3 • Current Preparation State
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.current_preparation_analysis, 'sec3')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec3' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.current_preparation_analysis}"
                </p>
              </div>
            </div>

            {/* 4 & 5. Gap & Recommended Course */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
              <div className="card" style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber-400)' }}>
                    Step 4 • Pinpointing Preparation Gap
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.gap_identification, 'sec4')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec4' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: '#fef3c7', lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.gap_identification}"
                </p>
              </div>

              <div className="card" style={{ padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa' }}>
                    Step 5 • Recommended Batch Solution
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.recommended_solution, 'sec5')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec5' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600, lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.recommended_solution}"
                </p>
              </div>
            </div>

            {/* 6. Why it fits */}
            <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--emerald-400)' }}>
                  Step 6 • Why It Fits Candidate Profile Exactly
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(pitchData.pitch_sections.why_it_fits, 'sec6')}
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  {copiedSection === 'sec6' ? <Check size={12} /> : <Copy size={12} />}
                  Copy
                </button>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {pitchData.pitch_sections.why_it_fits}
              </div>
            </div>

            {/* 7 & 8. Proof of Results & Backup Exam Coverage */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
              <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--emerald-400)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} />
                    Step 7 • Verified Case Proof
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.proof_of_results, 'sec7')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec7' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.proof_of_results}"
                </p>
              </div>

              <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa' }}>
                    Step 8 • Dual Exam & Backup Coverage
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(pitchData.pitch_sections.exam_coverage_and_backups, 'sec8')}
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                  >
                    {copiedSection === 'sec8' ? <Check size={12} /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  "{pitchData.pitch_sections.exam_coverage_and_backups}"
                </p>
              </div>
            </div>

            {/* 9. Genuine Differentiation */}
            <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Step 9 • Genuine Differentiators
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(pitchData.pitch_sections.genuine_differentiation, 'sec9')}
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  {copiedSection === 'sec9' ? <Check size={12} /> : <Copy size={12} />}
                  Copy
                </button>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {pitchData.pitch_sections.genuine_differentiation}
              </div>
            </div>

            {/* 10. Interactive Objection Handling */}
            <div className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} style={{ color: 'var(--amber-400)' }} />
                Step 10 • Real-Time Objection Handling Talking Points:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pitchData.pitch_sections.objection_handling.map((obj, idx) => {
                  const isExp = expandedObjectionIdx === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        onClick={() => setExpandedObjectionIdx(isExp ? null : idx)}
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          backgroundColor: isExp ? 'rgba(59, 130, 246, 0.08)' : 'transparent'
                        }}
                      >
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>
                          {obj.objection}
                        </span>
                        {isExp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>

                      {isExp && (
                        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}>
                          <p style={{ fontSize: '13px', color: 'var(--emerald-400)', lineHeight: '1.5', fontStyle: 'italic', marginBottom: '8px' }}>
                            "{obj.counsellor_response}"
                          </p>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => copyToClipboard(obj.counsellor_response, `obj-${idx}`)}
                            style={{ padding: '2px 8px', fontSize: '11px' }}
                          >
                            {copiedSection === `obj-${idx}` ? <Check size={11} /> : <Copy size={11} />}
                            Copy Response
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 11. Closing & Next Step */}
            <div className="card" style={{ padding: '20px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--emerald-400)' }}>
                  Step 11 • Low-Pressure Closing Action
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(pitchData.pitch_sections.closing_and_next_step, 'sec11')}
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  {copiedSection === 'sec11' ? <Check size={12} /> : <Copy size={12} />}
                  Copy
                </button>
              </div>
              <p style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600, lineHeight: '1.6' }}>
                "{pitchData.pitch_sections.closing_and_next_step}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
