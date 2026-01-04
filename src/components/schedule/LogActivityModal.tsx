"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LogActivityModalProps {
    onClose: () => void;
    onSave: (activity: any) => void;
}

export const LogActivityModal = ({ onClose, onSave }: LogActivityModalProps) => {
    const [type, setType] = useState("Run");
    const [duration, setDuration] = useState("");
    const [rpe, setRpe] = useState(5);
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ type, duration, rpe, notes, date: new Date().toISOString() });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="text-xl font-bold">Log Activity</h3>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label>Activity Type</label>
                        <div className="type-toggle">
                            {['Run', 'Strength', 'Cross'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`type-btn ${type === t ? 'active' : ''}`}
                                    onClick={() => setType(t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Duration (min)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            className="input-field"
                            placeholder="e.g. 45"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>RPE (1-10)</label>
                        <div className="range-wrap">
                            <input
                                type="range"
                                min="1" max="10"
                                value={rpe}
                                onChange={e => setRpe(Number(e.target.value))}
                                className="range-input"
                            />
                            <span className="range-val">{rpe}</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="text-area"
                            rows={3}
                        />
                    </div>

                    <Button variant="primary" fullWidth type="submit">
                        <Check size={18} className="mr-2" /> Save Activity
                    </Button>
                </form>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.8);
          display: flex; align-items: center; justify-content: center; z-index: 100;
        }
        .modal-content {
          width: 90%; max-width: 400px; background: #1c1c1e; border-radius: 16px;
        }
        .modal-header {
          padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; justify-content: space-between; align-items: center;
        }
        .text-xl { font-size: 1.25rem; }
        .font-bold { font-weight: 700; }
        .modal-body { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        
        .form-group label {
           display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;
        }

        .type-toggle {
           display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 8px;
        }
        .type-btn {
           flex: 1; padding: 8px; background: none; border: none; color: white; border-radius: 6px; cursor: pointer; transition: 0.2s;
        }
        .type-btn.active { background: var(--kinetiq-volt); color: black; font-weight: 600; }

        .input-field, .text-area {
           width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
           padding: 12px; border-radius: 8px; color: white; outline: none; font-family: inherit;
        }
        .input-field:focus, .text-area:focus { border-color: var(--kinetiq-volt); }

        .range-wrap { display: flex; align-items: center; gap: 12px; }
        .range-input { flex: 1; accent-color: var(--kinetiq-volt); }
        .range-val { font-weight: 700; color: var(--kinetiq-volt); width: 24px; text-align: center; }
        .mr-2 { margin-right: 8px; }
      `}</style>
        </div>
    );
};
