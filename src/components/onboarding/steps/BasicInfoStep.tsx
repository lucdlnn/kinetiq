"use client";

import { motion } from "framer-motion";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/Button";

interface BasicInfoStepProps {
  data: UserProfile;
  updateData: (data: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BasicInfoStep = ({ data, updateData, onNext, onBack }: BasicInfoStepProps) => {
  const isValid = data.name && data.age > 0 && data.height > 0 && data.weight > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-container glass-panel"
    >
      <h3 className="step-header">The Basics</h3>
      <p className="step-sub">We use this to calculate your metabolic rate and training zones.</p>

      <div className="form-grid">
        <label className="input-group">
          <span>Name</span>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Your Name"
            className="k-input"
          />
        </label>

        <div className="row">
          <label className="input-group">
            <span>Age</span>
            <input
              type="number"
              value={data.age || ''}
              onChange={(e) => updateData({ age: Number(e.target.value) })}
              placeholder="0"
              className="k-input"
            />
          </label>
          <label className="input-group">
            <span>Gender</span>
            <select
              value={data.gender}
              onChange={(e) => updateData({ gender: e.target.value as any })}
              className="k-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="row">
          <label className="input-group">
            <span>Height (cm)</span>
            <input
              type="number"
              value={data.height || ''}
              onChange={(e) => updateData({ height: Number(e.target.value) })}
              placeholder="cm"
              className="k-input"
            />
          </label>
          <label className="input-group">
            <span>Weight (kg)</span>
            <input
              type="number"
              value={data.weight || ''}
              onChange={(e) => updateData({ weight: Number(e.target.value) })}
              placeholder="kg"
              className="k-input"
            />
          </label>
        </div>
      </div>

      <div className="actions">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={onNext} disabled={!isValid}>Next Step</Button>
      </div>

      <style jsx>{`
        .step-container {
          padding: 30px;
          border-radius: var(--radius-lg);
        }
        
        .step-header {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .step-sub {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 0.9rem;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group span {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .k-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .k-input:focus {
          border-color: var(--kinetiq-volt);
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      `}</style>
    </motion.div>
  );
};
