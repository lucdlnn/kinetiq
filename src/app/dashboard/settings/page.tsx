"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

function SettingsContent() {
    const searchParams = useSearchParams();
    const [isStravaConnected, setIsStravaConnected] = useState(false);

    useEffect(() => {
        if (searchParams.get('strava_connected')) {
            setIsStravaConnected(true);
            localStorage.setItem('kinetiq_strava_status', 'connected');
        } else {
            const status = localStorage.getItem('kinetiq_strava_status');
            if (status === 'connected') setIsStravaConnected(true);
        }
    }, [searchParams]);

    const handleConnectStrava = () => {
        // Redirect to our API handler
        window.location.href = '/api/strava';
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Settings & Integrations</h1>

            <div className="glass-panel p-6 max-w-2xl">
                <h3 className="text-lg font-bold mb-4">Connected Apps</h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FC4C02] rounded-lg flex items-center justify-center font-bold text-white">
                            S
                        </div>
                        <div>
                            <h4 className="font-bold">Strava</h4>
                            <p className="text-sm text-secondary">Sync runs and cycles</p>
                        </div>
                    </div>
                    {isStravaConnected ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-green-500 font-medium">Connected</span>
                        </div>
                    ) : (
                        <Button variant="outline" onClick={handleConnectStrava}>Connect</Button>
                    )}
                </div>

                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 pointer-events-none">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center font-bold text-white">
                                G
                            </div>
                            <div>
                                <h4 className="font-bold">Garmin Connect</h4>
                                <p className="text-sm text-secondary">Coming soon</p>
                            </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Debugging</h3>
                <p className="text-sm text-secondary mb-2">If you want to test the Strava flow without API keys, it will fail on the server. Please add <code>STRAVA_CLIENT_ID</code> to your Vercel Environment Variables.</p>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading settings...</div>}>
            <SettingsContent />
        </Suspense>
    );
}
