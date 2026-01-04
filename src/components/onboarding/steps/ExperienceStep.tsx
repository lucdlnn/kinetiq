"use client";

import { motion } from "framer-motion";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/Button";

interface ExperienceStepProps {
    data: UserProfile;
    updateData: (data: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const levels = [
    { id: 'beginner', label: 'Beginner', desc: 'New to running < 10km/week' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Regular runner 10-30km/week' },
    { id: 'advanced', label: 'Advanced', desc: 'Consistent training 30-60km/week' },
    { id: 'elite', label: 'Elite', desc: 'Competitive +60km/week' },
];

export const ExperienceStep = ({ data, updateData, onNext, onBack }: ExperienceStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-container glass-panel"
        >
            <h3 className="step-header">Your Experience</h3>
            <p className="step-sub">Help us calibrate the intensity.</p>

            <div className="section-label">Current Level</div>
            <div className="level-list">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => updateData({ runningExperience: level.id as any })}
                        className={`level-row ${data.runningExperience === level.id ? 'active' : ''}`}
                    >
                        <div className="level-info">
                            <span className="level-label">{level.label}</span>
                            <span className="level-desc">{level.desc}</span>
                        </div>
                        {data.runningExperience === level.id && <div className="check">✓</div>}
                    </button>
                ))}
            </div>

            <div className="form-grid mt-6">
                <label className="input-group">
                    <span>Average Pace (min/km)</span>
                    <input
                        type="text"
                        placeholder="e.g. 5:30"
                        value={data.averagePace || ''}
                        onChange={(e) => updateData({ averagePace: e.target.value })}
                        className="k-input"
                    />
                </label>
                <label className="input-group">
                    <span>Recent Race Time (Optional)</span>
                    <input
                        type="text"
                        placeholder="e.g. 5k in 25:00"
                        value={data.recentRaceTime || ''}
                        onChange={(e) => updateData({ recentRaceTime: e.target.value })}
                        className="k-input"
                    />
                </label>
            </div>

            <div className="actions">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button variant="primary" onClick={onNext}>Next Step</Button>
            </div>

            <style jsx>{`
        .step-container { padding: 30px; border-radius: var(--radius-lg); }
        .step-header { font-size: 1.5rem; margin-bottom: 8px; }
        .step-sub { color: var(--text-secondary); margin-bottom: 24px; font-size: 0.9rem; }
        .section-label { font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px; }
        
        .level-list { display: flex; flex-direction: column; gap: 8px; }
        
        .level-row {
          background: rgba(255,255,255,0.05);
          border: 1px solid transparent;
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .level-row:hover { background: rgba(255,255,255,0.08); }
        
        .level-row.active {
          background: rgba(204, 255, 0, 0.1);
          border-color: var(--kinetiq-volt);
        }

        .level-label { font-weight: 600; display: block; color: white; margin-bottom: 2px; }
        .level-desc { font-size: 0.85rem; color: var(--text-secondary); }
        .level-row.active .level-label { color: var(--kinetiq-volt); }
        
        .check { color: var(--kinetiq-volt); font-weight: bold; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .mt-6 { margin-top: 24px; }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group span { font-size: 0.85rem; color: var(--text-secondary); }
        .k-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 12px;
          border-radius: var(--radius-sm);
          outline: none;
        }
        .actions { display: flex; justify-content: space-between; margin-top: 30px; }
      `}</style>
        </motion.div>
    );
};
