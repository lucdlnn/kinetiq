"use client";

import { useState } from "react";
import { Check, Loader2, Link as LinkIcon } from "lucide-react";

interface IntegrationCardProps {
    name: string;
    icon: string; // Emoji or image url placeholder
    description: string;
    connected?: boolean;
}

export const IntegrationCard = ({ name, icon, description, connected = false }: IntegrationCardProps) => {
    const [status, setStatus] = useState<"idle" | "connecting" | "connected">(connected ? "connected" : "idle");

    const handleConnect = () => {
        if (status === "connected") {
            setStatus("idle");
            return;
        }

        setStatus("connecting");
        // Simulate API delay
        setTimeout(() => {
            setStatus("connected");
        }, 2000);
    };

    return (
        <div className="integration-card glass-panel">
            <div className="integration-icon">{icon}</div>
            <div className="integration-info">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-secondary text-sm">{description}</p>
            </div>

            <button
                className={`connect-btn ${status}`}
                onClick={handleConnect}
                disabled={status === "connecting"}
            >
                {status === "connecting" ? (
                    <Loader2 size={16} className="spin" />
                ) : status === "connected" ? (
                    <>Connected <Check size={16} /></>
                ) : (
                    "Connect"
                )}
            </button>

            <style jsx>{`
         .integration-card {
           display: flex;
           align-items: center;
           gap: 16px;
           padding: 20px;
           border-radius: var(--radius-md);
           background: rgba(255,255,255,0.02);
         }

         .integration-icon {
           font-size: 2rem;
           width: 48px;
           height: 48px;
           display: flex;
           align-items: center;
           justify-content: center;
           background: rgba(255,255,255,0.05);
           border-radius: 12px;
         }

         .integration-info {
           flex: 1;
         }

         .text-sm { font-size: 0.85rem; }
         .font-semibold { font-weight: 600; }
         .text-secondary { color: var(--text-secondary); }

         .connect-btn {
           padding: 8px 16px;
           border-radius: 20px;
           border: 1px solid rgba(255,255,255,0.2);
           background: transparent;
           color: white;
           cursor: pointer;
           font-size: 0.85rem;
           display: flex;
           align-items: center;
           gap: 6px;
           transition: all 0.2s;
         }

         .connect-btn:hover {
           background: rgba(255,255,255,0.1);
         }

         .connect-btn.connected {
           background: rgba(204, 255, 0, 0.1);
           border-color: var(--kinetiq-volt);
           color: var(--kinetiq-volt);
         }
         
         .spin {
           animation: spin 1s linear infinite;
         }
         
         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
       `}</style>
        </div>
    );
};
