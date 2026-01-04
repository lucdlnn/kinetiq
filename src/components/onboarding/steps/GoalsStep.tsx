"use client";

import { motion } from "framer-motion";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/Button";

interface GoalsStepProps {
    data: UserProfile;
    updateData: (data: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const goals = [
    { id: 'general_fitness', label: 'Get Fit', desc: 'Improve overall health' },
    { id: 'lose_weight', label: 'Lose Weight', desc: 'Burn calories efficiently' },
    { id: 'run_further', label: 'Run Further', desc: 'Build endurance' },
    { id: 'run_faster', label: 'Run Faster', desc: 'Improve speed & pace' },
    { id: 'gain_muscle', label: 'Gain Muscle', desc: 'Hypertrophy focus' },
];

const distances = [
    { id: '5k', label: '5K' },
    { id: '10k', label: '10K' },
    { id: 'half_marathon', label: 'Half Marathon' },
    { id: 'marathon', label: 'Marathon' },
];

export const GoalsStep = ({ data, updateData, onNext, onBack }: GoalsStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-container glass-panel"
        >
            <h3 className="step-header">Your Goal</h3>
            <p className="step-sub">What are you training for?</p>

            <div className="section-label">Primary Objective</div>
            <div className="grid-options">
                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        onClick={() => updateData({ primaryGoal: goal.id as any })}
                        className={`option-card ${data.primaryGoal === goal.id ? 'active' : ''}`}
                    >
                        <div className="option-label">{goal.label}</div>
                        <div className="option-desc">{goal.desc}</div>
                    </button>
                ))}
            </div>

            {(data.primaryGoal === 'run_further' || data.primaryGoal === 'run_faster') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="section-label mt-4">Target Distance</div>
                    <div className="grid-options small-grid">
                        {distances.map((dist) => (
                            <button
                                key={dist.id}
                                onClick={() => updateData({ targetDistance: dist.id as any })}
                                className={`option-card compact ${data.targetDistance === dist.id ? 'active' : ''}`}
                            >
                                {dist.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            <div className="actions">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button variant="primary" onClick={onNext}>Next Step</Button>
            </div>

            <style jsx>{`
        .step-container { padding: 30px; border-radius: var(--radius-lg); }
        .step-header { font-size: 1.5rem; margin-bottom: 8px; }
        .step-sub { color: var(--text-secondary); margin-bottom: 24px; font-size: 0.9rem; }
        
        .section-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          margin-top: 12px;
        }
        
        .grid-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .grid-options.small-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .option-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 16px;
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-card:hover { border-color: var(--text-secondary); }
        
        .option-card.active {
          background: rgba(204, 255, 0, 0.1); /* Volt tint */
          border-color: var(--kinetiq-volt);
        }

        .option-label { font-weight: 600; color: white; margin-bottom: 4px; }
        .option-card.active .option-label { color: var(--kinetiq-volt); }
        
        .option-desc { font-size: 0.8rem; color: var(--text-secondary); }

        .option-card.compact { text-align: center; padding: 12px; }

        .actions { display: flex; justify-content: space-between; margin-top: 30px; }
        .mt-4 { margin-top: 16px; }
      `}</style>
        </motion.div>
    );
};
