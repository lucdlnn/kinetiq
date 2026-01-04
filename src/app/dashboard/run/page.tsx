"use client";

import { Button } from "@/components/ui/Button";

const weekDays = [
  { day: 'Mon', date: '23', type: 'Rest', color: 'gray' },
  { day: 'Tue', date: '24', type: 'Intervals', color: 'volt', isActive: true },
  { day: 'Wed', date: '25', type: 'Recovery', color: 'blue' },
  { day: 'Thu', date: '26', type: 'Tempo', color: 'volt' },
  { day: 'Fri', date: '27', type: 'Rest', color: 'gray' },
  { day: 'Sat', date: '28', type: 'Long Run', color: 'volt' },
  { day: 'Sun', date: '29', type: 'Cross', color: 'blue' },
];

export default function RunningPage() {
  return (
    <div className="running-page">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Training Schedule</h1>
          <p className="text-secondary">Week 4 of 12 • Marathon Prep</p>
        </div>
        <Button variant="outline">Export to Garmin</Button>
      </header>

      <div className="calendar-grid">
        {weekDays.map((day, idx) => (
          <div key={idx} className={`day-card glass-panel ${day.isActive ? 'active-day' : ''}`}>
            <div className="day-header">
              <span className="day-name">{day.day}</span>
              <span className="day-date">{day.date}</span>
            </div>

            <div className="workout-pill" style={{
              background: day.color === 'volt' ? 'var(--kinetiq-volt)' : day.color === 'blue' ? 'var(--kinetiq-electric)' : 'rgba(255,255,255,0.1)',
              color: day.color === 'volt' ? 'black' : 'white'
            }}>
              {day.type}
            </div>

            <div className="day-detail">
              {day.type === 'Rest' ? 'Mobility & Stretch' : day.type === 'Intervals' ? '8x400m @ 5k Pace' : '45min Z2'}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .mb-8 { margin-bottom: 32px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 16px;
        }

        .day-card {
          padding: 16px;
          border-radius: var(--radius-md);
          min-height: 140px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: 0.2s;
        }

        .active-day {
          border-color: var(--kinetiq-volt);
          background: rgba(204, 255, 0, 0.05);
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .day-date { font-weight: 600; color: white; }

        .workout-pill {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          text-align: center;
        }

        .day-detail {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-top: auto;
        }

        @media (max-width: 1024px) {
          .calendar-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
