"use client";

import { IntegrationCard } from "@/components/dashboard/IntegrationCard";

export default function SettingsPage() {
    return (
        <div className="settings-page">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Settings & Integrations</h1>
                <p className="text-secondary">Manage data sources and devices.</p>
            </header>

            <div className="integrations-grid">
                <h3 className="section-title mb-4">Connected Apps</h3>
                <div className="card-stack">
                    <IntegrationCard
                        name="Garmin Connect"
                        icon="⌚"
                        description="Sync activities, heart rate, and sleep data."
                    />
                    <IntegrationCard
                        name="Strava"
                        icon="🟠"
                        description="Import routes and share activities."
                        connected={true}
                    />
                    <IntegrationCard
                        name="MyFitnessPal"
                        icon="🥑"
                        description="Sync nutrition logs and caloric intake."
                    />
                    <IntegrationCard
                        name="Apple Health"
                        icon="❤️"
                        description="Sync daily steps and biological data."
                    />
                </div>
            </div>

            <style jsx>{`
         .settings-page { max-width: 800px; }
         .mb-8 { margin-bottom: 32px; }
         .mb-4 { margin-bottom: 16px; }
         .text-2xl { font-size: 1.5rem; }
         .font-bold { font-weight: 700; }
         .text-secondary { color: var(--text-secondary); }
         
         .section-title {
           font-size: 1.1rem;
           font-weight: 600;
           color: white;
         }

         .card-stack {
           display: flex;
           flex-direction: column;
           gap: 16px;
         }
       `}</style>
        </div>
    );
}
