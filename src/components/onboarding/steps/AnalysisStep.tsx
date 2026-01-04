"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface AnalysisStepProps {
  onComplete: () => void;
}

export const AnalysisStep = ({ onComplete }: AnalysisStepProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="analysis-container">
      <div className="spinner-wrapper">
        <motion.div
          className="spinner-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="ai-brain">
          {/* Placeholder for brain icon or logo */}
          <div className="brain-pulse" />
        </div>
      </div>

      <h3 className="analyzing-text">Designing your plan...</h3>
      <div className="steps-progress">
        <Typewriter text="Analyzing biomechanics..." delay={0} />
        <Typewriter text="Calculating training zones..." delay={1000} />
        <Typewriter text="Optimizing recovery schedule..." delay={2000} />
      </div>

      <style jsx>{`
        .analysis-container {
          text-align: center;
          padding: 40px;
        }

        .spinner-wrapper {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner-ring {
          width: 100%;
          height: 100%;
          border: 4px solid rgba(255,255,255,0.1);
          border-top-color: var(--kinetiq-volt);
          border-radius: 50%;
          position: absolute;
        }

        .ai-brain {
          width: 60px;
          height: 60px;
          background: var(--kinetiq-electric);
          border-radius: 50%;
          opacity: 0.8;
          filter: blur(20px);
        }

        .analyzing-text {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .steps-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 80px;
        }

        .log-line {
          color: var(--text-secondary);
          font-family: monospace;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

const Typewriter = ({ text, delay }: { text: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="log-line"
    >
      &gt; {text}
    </motion.div>
  );
};
