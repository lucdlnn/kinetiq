"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface ExerciseProps {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  onWeightChange?: (val: string) => void;
  videoUrl?: string; // Placeholder for future video link
}

export const ExerciseCard = ({ name, sets, reps, weight: initialWeight, onWeightChange }: ExerciseProps) => {
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [currentWeight, setCurrentWeight] = useState(initialWeight || "");

  const toggleSet = (idx: number) => {
    if (completedSets.includes(idx)) {
      setCompletedSets(prev => prev.filter(s => s !== idx));
    } else {
      setCompletedSets(prev => [...prev, idx]);
    }
  };

  return (
    <div className="exercise-card glass-panel">
      <div className="exercise-header">
        <div className="exercise-info">
          <h4 className="exercise-name">{name}</h4>
          <div className="flex items-center gap-2">
            <span className="exercise-target">{sets} sets × {reps}</span>
            <input
              className="weight-input"
              placeholder="kg"
              value={currentWeight}
              onChange={(e) => { setCurrentWeight(e.target.value); onWeightChange?.(e.target.value); }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>

      <div className="sets-row">
        {Array.from({ length: sets }).map((_, idx) => (
          <button
            key={idx}
            className={`set-bubble ${completedSets.includes(idx) ? 'completed' : ''}`}
            onClick={() => toggleSet(idx)}
          >
            {completedSets.includes(idx) ? <CheckCircle size={18} /> : <span>{idx + 1}</span>}
          </button>
        ))}
      </div>

      <style jsx>{`
        .exercise-card {
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          background: rgba(255,255,255,0.02);
        }

        .exercise-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .exercise-target {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .sets-row {
          display: flex;
          gap: 8px;
        }

        .set-bubble {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .set-bubble:hover {
          border-color: var(--text-secondary);
        }

        .set-bubble.completed {
          background: var(--kinetiq-success);
          border-color: var(--kinetiq-success);
          color: black;
        }

        .weight-input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          width: 60px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          text-align: center;
        }
        .weight-input:focus {
          border-color: var(--kinetiq-volt);
          outline: none;
        }
      `}</style>
    </div>
  );
};
