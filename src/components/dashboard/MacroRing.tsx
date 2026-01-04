"use client";

interface MacroRingProps {
    label: string;
    value: number; // current grams
    target: number; // target grams
    color: string;
}

export const MacroRing = ({ label, value, target, color }: MacroRingProps) => {
    const percentage = Math.min(100, (value / target) * 100);
    const size = 60;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="macro-item">
            <div className="ring-container">
                <svg width={size} height={size}>
                    <circle
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className="ring-value">
                    {Math.round(percentage)}%
                </div>
            </div>
            <div className="macro-details">
                <span className="macro-label">{label}</span>
                <span className="macro-stat">{value} / {target}g</span>
            </div>

            <style jsx>{`
        .macro-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .ring-container {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .ring-value {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .macro-details {
          text-align: center;
        }

        .macro-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .macro-stat {
          font-size: 0.85rem;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
};
