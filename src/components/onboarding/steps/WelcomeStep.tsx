import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
    onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="step-container glass-panel"
        >
            <div className="content">
                <h2 className="step-title">Welcome to <span className="text-gradient">Kinetiq</span></h2>
                <p className="step-desc">
                    Let's build your ultimate training plan. We'll need to know a bit about your
                    physiology, goals, and lifestyle to optimize everything for you.
                </p>

                <div className="features-list">
                    <div className="feature-item">
                        <span className="dot" /> Scientific Analysis
                    </div>
                    <div className="feature-item">
                        <span className="dot" /> Dynamic Adaptation
                    </div>
                    <div className="feature-item">
                        <span className="dot" /> Injury Prevention
                    </div>
                </div>

                <Button size="lg" onClick={onNext} fullWidth>
                    Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>

            <style jsx>{`
        .step-container {
          padding: 40px;
          border-radius: var(--radius-lg);
          text-align: center;
        }
        
        .step-title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .step-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 3rem;
          text-align: left;
          background: rgba(255,255,255,0.03);
          padding: 20px;
          border-radius: var(--radius-md);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--kinetiq-volt);
          box-shadow: 0 0 10px var(--kinetiq-volt);
        }
        
        .ml-2 { margin-left: 8px; }
        .w-4 { width: 16px; }
        .h-4 { height: 16px; }
      `}</style>
        </motion.div>
    );
};
