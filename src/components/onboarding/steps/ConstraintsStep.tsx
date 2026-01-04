"use client";

import { motion } from "framer-motion";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/Button";

interface ConstraintsStepProps {
    data: UserProfile;
    updateData: (data: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const days = [
    { id: 'mon', label: 'M' },
    { id: 'tue', label: 'T' },
    { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' },
    { id: 'fri', label: 'F' },
    { id: 'sat', label: 'S' },
    { id: 'sun', label: 'S' },
];

export const ConstraintsStep = ({ data, updateData, onNext, onBack }: ConstraintsStepProps) => {
    const toggleDay = (day: string) => {
        const current = data.availableDays || [];
        const updated = current.includes(day as any)
            ? current.filter(d => d !== day)
            : [...current, day as any];
        updateData({ availableDays: updated });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-container glass-panel"
        >
            <h3 className="step-header">Availability & Health</h3>
            <p className="step-sub">We'll build the plan around your schedule.</p>

            <div className="section-label">Training Days</div>
            <div className="days-grid">
                {days.map((day, idx) => (
                    <button
                        key={`${day.id}-${idx}`}
                        onClick={() => toggleDay(day.id)}
                        className={`day-circle ${data.availableDays?.includes(day.id as any) ? 'active' : ''}`}
                    >
                        {day.label}
                    </button>
                ))}
            </div>

            <div className="form-grid mt-6">
                <label className="input-group">
                    <span>Injuries / Issues</span>
                    <textarea
                        placeholder="e.g. Right knee pain when running > 10k..."
                        value={data.injuries?.join(', ') || ''}
                        onChange={(e) => updateData({ injuries: e.target.value ? e.target.value.split(',') : [] })}
                        className="k-textarea"
                        rows={2}
                    />
                </label>

                <label className="input-group">
                    <span>Dietary Restrictions</span>
                    <textarea
                        placeholder="e.g. Vegetarian, Nut allergy..."
                        value={data.dietaryRestrictions?.join(', ') || ''}
                        onChange={(e) => updateData({ dietaryRestrictions: e.target.value ? e.target.value.split(',') as any : [] })}
                        className="k-textarea"
                        rows={2}
                    />
                </label>
            </div>

            <div className="actions">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button variant="primary" onClick={onNext} disabled={data.availableDays?.length === 0}>Generate Plan</Button>
            </div>

            <style jsx>{`
        .step-container { padding: 30px; border-radius: var(--radius-lg); }
        .step-header { font-size: 1.5rem; margin-bottom: 8px; }
        .step-sub { color: var(--text-secondary); margin-bottom: 24px; font-size: 0.9rem; }
        .section-label { font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px; }
        
        .days-grid {
          display: flex;
          gap: 10px;
          justify-content: space-between;
        }

        .day-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }

        .day-circle.active {
          background: var(--kinetiq-volt);
          color: var(--kinetiq-black);
          border-color: var(--kinetiq-volt);
          box-shadow: 0 0 10px rgba(204, 255, 0, 0.3);
        }

        .mt-6 { margin-top: 24px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .input-group span { font-size: 0.85rem; color: var(--text-secondary); }
        
        .k-textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 12px;
          border-radius: var(--radius-sm);
          outline: none;
          font-family: inherit;
          resize: none;
        }
        
        .actions { display: flex; justify-content: space-between; margin-top: 30px; }
      `}</style>
        </motion.div>
    );
};
