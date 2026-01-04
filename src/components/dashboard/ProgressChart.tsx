"use client";

export const ProgressChart = () => {
  const data = [4, 7, 5, 10, 6, 8, 0]; // Fake km data

  return (
    <div className="chart-card glass-panel">
      <div className="card-header">
        <h3 className="card-title">Weekly Load</h3>
        <span className="total-badge">12.5 km</span>
      </div>

      <div className="chart-area">
        {data.map((val, idx) => (
          <div key={idx} className="bar-group">
            <div className="bar-wrapper">
              <div className="bar" style={{ height: `${val * 10}%` }} />
            </div>
            <span className="day-label">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .chart-card {
          padding: 24px;
          border-radius: var(--radius-lg);
          height: 100%;
          min-height: 250px;
          display: flex;
          flex-direction: column;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: auto;
        }
        .total-badge {
          color: var(--kinetiq-volt);
          font-weight: 600;
        }
        .chart-area {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 150px;
          gap: 8px;
        }
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .bar-wrapper {
          width: 100%;
          height: 100px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          transition: height 0.5s ease;
        }
        .bar-group:hover .bar {
          background: var(--kinetiq-volt);
        }
        .day-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
