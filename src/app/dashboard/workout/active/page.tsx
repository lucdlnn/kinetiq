"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { usePlan } from "@/lib/PlanContext";
import { Play, Pause, Square, MapPin, Loader } from "lucide-react";

export default function ActiveWorkoutPage() {
    const router = useRouter();
    const { addActivity } = usePlan();

    // Timer State
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Integration State (Simulated)
    const [simulatedDistance, setDistance] = useState(0.0); // km
    const [gpsSignal, setGpsSignal] = useState("Searching...");

    // Start on mount
    useEffect(() => {
        setIsActive(true);
        // Simulate GPS lock
        setTimeout(() => setGpsSignal("Locked (High Accuracy)"), 2000);
    }, []);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
                // Simulate distance accumulation (approx 5:00/km pace)
                setDistance(d => d + 0.003);
            }, 1000);
        } else if (!isActive && interval) {
            clearInterval(interval);
        }
        return () => { if (interval) clearInterval(interval) };
    }, [isActive]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleFinish = async () => {
        setIsActive(false);
        const confirm = window.confirm("Finish workout and sync data?");

        if (confirm) {
            // Save to context
            addActivity({
                title: "Afternoon Run",
                type: "Run",
                date: new Date().toISOString(),
                duration: Math.ceil(seconds / 60),
                completed: true,
                description: `Synced from GPS. Distance: ${simulatedDistance.toFixed(2)} km. Pace: 5:00/km`
            });

            alert("Workout Saved! Syncing with Strava & Garmin...");
            router.push('/dashboard/schedule');
        } else {
            setIsActive(true);
        }
    };

    return (
        <div className="active-workout-page">
            <div className="status-bar">
                <div className="gps-indicator flex items-center gap-2">
                    <MapPin size={16} className={gpsSignal.includes("Locked") ? "text-green-500" : "text-yellow-500 animate-pulse"} />
                    <span className="text-xs text-secondary">{gpsSignal}</span>
                </div>
            </div>

            <div className="main-stats">
                <div className="timer">{formatTime(seconds)}</div>
                <div className="label">Duration</div>
            </div>

            <div className="secondary-stats-grid">
                <div className="stat-card">
                    <div className="value">{simulatedDistance.toFixed(2)}</div>
                    <div className="label">Kilometers</div>
                </div>
                <div className="stat-card">
                    <div className="value">5:00</div>
                    <div className="label">Avg Pace</div>
                </div>
                <div className="stat-card">
                    <div className="value">145</div>
                    <div className="label">Heart Rate</div>
                </div>
            </div>

            <div className="controls">
                <Button variant="outline" onClick={() => setIsActive(!isActive)} className="control-btn">
                    {isActive ? <Pause size={32} /> : <Play size={32} />}
                </Button>

                <Button variant="primary" onClick={handleFinish} className="control-btn finish-btn">
                    <Square size={32} fill="currentColor" />
                </Button>
            </div>

            <style jsx>{`
                .active-workout-page {
                    height: calc(100vh - 100px); /* Adjust for nav */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-bottom: 40px;
                }

                .timer {
                    font-size: 5rem;
                    font-weight: 900;
                    font-variant-numeric: tabular-nums;
                    line-height: 1;
                    letter-spacing: -2px;
                }

                .main-stats {
                    text-align: center;
                    margin-top: 40px;
                }

                .secondary-stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 16px;
                    padding: 0 16px;
                }

                .stat-card {
                    background: rgba(255,255,255,0.05);
                    border-radius: 16px;
                    padding: 16px;
                    text-align: center;
                }

                .stat-card .value {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .label {
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-top: 4px;
                }

                .controls {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    align-items: center;
                }
                
                /* Custom big buttons */
                :global(.control-btn) {
                    width: 80px !important;
                    height: 80px !important;
                    border-radius: 50% !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }

                :global(.finish-btn) {
                    background: #ff3b30 !important;
                    border-color: #ff3b30 !important;
                    color: white;
                }

                .gps-indicator {
                    background: rgba(0,0,0,0.3);
                    padding: 8px 16px;
                    border-radius: 20px;
                    display: inline-flex;
                }

                .status-bar {
                    display: flex;
                    justify-content: center;
                }

                .text-green-500 { color: #34c759; }
                .text-yellow-500 { color: #ffcc00; }
                .animate-pulse { animation: pulse 2s infinite; }
            `}</style>
        </div>
    );
}
