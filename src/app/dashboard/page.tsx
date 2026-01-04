"use client";

import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";

export default function DashboardPage() {
  return (
    <div className="overview-container">
      <header className="page-header">
        <h1 className="welcome-text">Good Morning, Runner</h1>
        <p className="date-text">Let's crush your goals today.</p>
      </header>

      <div className="dashboard-grid">
        <div className="main-col">
          <WorkoutCard />

          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <span className="stat-label">A:C Ratio</span>
              <span className="stat-val">1.15</span>
              <span className="stat-delta positive">Optimal Range (0.8-1.3)</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-label">Plan Compliance</span>
              <span className="stat-val">92%</span>
              <span className="stat-delta positive">High Adherence</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-label">Fitness (CTL)</span>
              <span className="stat-val">42</span>
              <span className="stat-delta positive">+2 this week</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-label">Fatigue (ATL)</span>
              <span className="stat-val">58</span>
              <span className="stat-delta neutral">Manageable</span>
            </div>
          </div>
        </div>

        <div className="side-col">
          <ProgressChart />

          <div className="coach-tip glass-panel">
            <div className="tip-header">
              <span>🧠 Coach Insight</span>
            </div>
            <p className="tip-text">
              Your recovery rate is trending up. Consider increasing intensity by 5% next week.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 32px; }
        .welcome-text { font-size: 2rem; margin-bottom: 4px; }
        .date-text { color: var(--text-secondary); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .main-col, .side-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .stat-card {
          padding: 20px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-label { font-size: 0.85rem; color: var(--text-secondary); }
        .stat-val { font-size: 2rem; font-weight: 700; }
        .stat-delta { font-size: 0.85rem; font-weight: 600; }
        .positive { color: var(--kinetiq-success); }
        .neutral { color: var(--text-secondary); }

        .coach-tip {
          padding: 20px;
          border-radius: var(--radius-md);
          background: linear-gradient(to bottom, rgba(48, 98, 255, 0.1), rgba(255,255,255,0.02));
          border-color: rgba(48, 98, 255, 0.2);
        }
        
        .tip-header { 
          color: var(--kinetiq-electric); 
          font-weight: 600; 
          margin-bottom: 8px; 
          font-size: 0.9rem;
        }
        
        .tip-text { font-size: 0.9rem; line-height: 1.5; }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
