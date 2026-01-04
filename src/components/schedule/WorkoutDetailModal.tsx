"use client";

import { X, Clock, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WorkoutDetailModalProps {
    workout: any;
    onClose: () => void;
}

export const WorkoutDetailModal = ({ workout, onClose }: WorkoutDetailModalProps) => {
    if (!workout) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <span className="type-badge">{workout.type}</span>
                        <h2 className="modal-title">{workout.title}</h2>
                        <p className="text-secondary">{workout.date} • {workout.time}</p>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                <div className="workout-body">
                    <div className="meta-row">
                        <div className="meta-item">
                            <Clock size={18} className="text-volt" />
                            <span>{workout.duration}</span>
                        </div>
                        <div className="meta-item">
                            <Zap size={18} className="text-volt" />
                            <span>{workout.intensity}</span>
                        </div>
                        <div className="meta-item">
                            <MapPin size={18} className="text-volt" />
                            <span>{workout.location || 'Outdoors'}</span>
                        </div>
                    </div>

                    <div className="structure-list">
                        <h3 className="section-label">Session Structure</h3>
                        {workout.structure?.map((block: any, idx: number) => (
                            <div key={idx} className="block-row">
                                <span className="block-type">{block.type}</span>
                                <div className="block-details">
                                    <span className="block-desc">{block.description}</span>
                                    <span className="block-target">{block.target}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <Button variant="primary" fullWidth size="lg">Start Session Now</Button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          background: #1c1c1e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
           from { transform: translateY(20px); opacity: 0; }
           to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .type-badge {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--kinetiq-volt);
          background: rgba(204, 255, 0, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .modal-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
        .text-secondary { color: var(--text-secondary); }
        .close-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; }
        .text-volt { color: var(--kinetiq-volt); }

        .workout-body { padding: 24px; }

        .meta-row {
           display: flex;
           gap: 24px;
           margin-bottom: 32px;
           padding-bottom: 24px;
           border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .meta-item {
           display: flex;
           align-items: center;
           gap: 8px;
           font-weight: 500;
        }

        .section-label {
           text-transform: uppercase;
           color: var(--text-secondary);
           font-size: 0.85rem;
           margin-bottom: 16px;
           font-weight: 600;
        }

        .structure-list { display: flex; flex-direction: column; gap: 16px; }

        .block-row {
           display: flex;
           gap: 16px;
        }

        .block-type {
           font-size: 0.85rem;
           color: white;
           font-weight: 600;
           width: 80px;
           padding-top: 2px;
        }

        .block-details { display: flex; flex-direction: column; gap: 2px; }
        .block-desc { font-weight: 500; }
        .block-target { font-size: 0.85rem; color: var(--text-secondary); }

        .modal-footer { padding: 24px; border-top: 1px solid rgba(255,255,255,0.05); }
      `}</style>
        </div>
    );
};
