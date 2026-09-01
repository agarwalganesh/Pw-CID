import React from 'react';
import {
  ShoppingBag,
  Clock,
  Check,
  Calendar,
  Users,
  CreditCard,
  Sparkles,
  Layers
} from 'lucide-react';
import { Course, Category } from '../../types';
import { Badge } from '../Common/Badge';

interface CoursesSectionProps {
  category: Category;
  courses: Course[];
  onPitchCourse?: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  category,
  courses,
  onPitchCourse
}) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Available Courses & Live Batches ({courses.length})
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Database-driven course structures, fees, live batch schedules, and student fitment profiles for {category.name}.
          </p>
        </div>
        <Badge status={category.data_status} />
      </div>

      {courses.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '24px'
              }}
            >
              {/* Top Course Meta */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      color: '#60a5fa',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {course.level}
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--emerald-400)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {course.language}
                    </span>
                    <span style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      {course.mode}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                    {course.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Target Profile: <strong>{course.target_student_profile}</strong>
                  </p>
                </div>

                {/* Price & Pitch CTA */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--emerald-400)' }}>
                    ₹{course.fees_inr.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Duration: {course.duration_months} Months
                  </div>
                  {onPitchCourse && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onPitchCourse(course)}
                      style={{ marginTop: '8px' }}
                    >
                      <Sparkles size={13} />
                      Generate Pitch
                    </button>
                  )}
                </div>
              </div>

              {/* Course Features Checklist */}
              {course.features && course.features.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '16px'
                }}>
                  {course.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                      <Check size={14} style={{ color: 'var(--emerald-400)', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Batches Table */}
              {course.batches && course.batches.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Upcoming & Active Batches:
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Batch Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Seats Filled</th>
                          <th>Enrollment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.batches.map((batch) => (
                          <tr key={batch.id}>
                            <td style={{ fontWeight: 600 }}>{batch.batch_name}</td>
                            <td>{batch.start_date}</td>
                            <td>{batch.end_date}</td>
                            <td>
                              <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>{batch.enrolled_count}</span> / {batch.seat_capacity}
                            </td>
                            <td>
                              <span className={`badge ${batch.enrollment_status === 'Filling Fast' ? 'badge-med' : 'badge-low'}`}>
                                {batch.enrollment_status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Data not available for course options.
        </div>
      )}
    </div>
  );
};
