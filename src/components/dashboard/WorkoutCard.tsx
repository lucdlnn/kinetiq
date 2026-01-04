"use client";

import { Button } from "@/components/ui/Button";
import { Play, Clock, TrendingUp } from "lucide-react";

export const WorkoutCard = () => {
  return (
    <div className="workout-card glass-panel">
      <div className="card-header">
        <h3 className="card-title">Today's Session</h3>
        <span className="date-badge">Tuesday, Oct 24</span>
      </div>

      <div className="workout-content">
        <div className="workout-main">
          <div className="type-icon">
            🏃‍♂️
          </div>
          <div className="details">
            <h4 className="workout-name">Interval Velocity</h4>
            <p className="workout-sub">Speed work • Threshold Focus</p>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <Clock size={16} />
            <span>45 min</span>
          </div>
          <div className="stat">
            <TrendingUp size={16} />
            <span>High Intensity</span>
          </div>
        </div>

        <Button variant="primary" fullWidth className="start-btn">
          <Play size={16} className="mr-2" /> Start Workout
        </Button>
      </div>

      <style jsx>{`
        .workout-card {
          padding: 24px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(28, 28, 30, 0.6) 0%, rgba(204, 255, 0, 0.05) 100%);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 1.1rem;
        }

        .date-badge {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .workout-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .workout-main {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .type-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .workout-name {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }

        .workout-sub {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .stats-row {
          display: flex;
          gap: 24px;
          margin-bottom: 8px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .mr-2 { margin-right: 8px; }
      `}</style>
    </div>
  );
};
