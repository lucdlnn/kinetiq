"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WorkoutDetailModal } from "@/components/schedule/WorkoutDetailModal";
import { LogActivityModal } from "@/components/schedule/LogActivityModal";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";

export default function SchedulePage() {
    const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
    const [isLogging, setIsLogging] = useState(false);

    // Mock Data for the Calendar
    const events = [
        {
            id: 1, day: 24, title: "Speed Intervals", type: "Run", duration: "45 min", intensity: "High", structure: [
                { type: "Warmup", description: "Easy Jog", target: "10 mins @ Z1" },
                { type: "Main", description: "5x1km Intervals", target: "Pace: 4:15/km" },
                { type: "Cooldown", description: "Walk/Jog", target: "5 mins" }
            ]
        },
        {
            id: 2, day: 25, title: "Lower Body", type: "Strength", duration: "40 min", intensity: "Med", structure: [
                { type: "Main", description: "Squats & Lunges", target: "3 Sets x 12 Reps" }
            ]
        },
        {
            id: 3, day: 26, title: "Recovery Run", type: "Run", duration: "30 min", intensity: "Low", structure: [
                { type: "Main", description: "Steady State", target: "HR < 140bpm" }
            ]
        },
        {
            id: 4, day: 28, title: "Long Run", type: "Run", duration: "90 min", intensity: "Med", structure: [
                { type: "Main", description: "Distance Focus", target: "15km" }
            ]
        }
    ];

    const days = Array.from({ length: 35 }, (_, i) => {
        const dayNum = i - 1; // Offset for starting day
        const event = events.find(e => e.day === dayNum);
        return { day: dayNum > 0 && dayNum <= 31 ? dayNum : null, event };
    });

    return (
        <div className="schedule-page">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Training Schedule</h1>
                    <p className="text-secondary">October 2026</p>
                </div>
                <div className="actions flex gap-3">
                    <Button variant="outline"><CalIcon size={16} className="mr-2" /> Sync</Button>
                    <Button variant="primary" onClick={() => setIsLogging(true)}>
                        <Plus size={16} className="mr-2" /> Log Activity
                    </Button>
                </div>
            </header>

            {/* Calendar Grid */}
            <div className="calendar-container glass-panel">
                <div className="days-header">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="day-label">{d}</div>
                    ))}
                </div>
                <div className="days-grid">
                    {days.map((d, idx) => (
                        <div key={idx} className={`day-cell ${!d.day ? 'disabled' : ''}`}>
                            <span className="day-number">{d.day}</span>
                            {d.event && (
                                <div
                                    className={`event-chip ${d.event.type.toLowerCase()}`}
                                    onClick={() => setSelectedWorkout(d.event)}
                                >
                                    {d.event.type === 'Run' ? '🏃' : '🏋️'} {d.event.title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedWorkout && (
                <WorkoutDetailModal
                    workout={selectedWorkout}
                    onClose={() => setSelectedWorkout(null)}
                />
            )}

            {isLogging && (
                <LogActivityModal
                    onClose={() => setIsLogging(false)}
                    onSave={(activity) => {
                        console.log("Saved:", activity);
                        // In a real app, add to events list here
                    }}
                />
            )}

            <style jsx>{`
        .mb-6 { margin-bottom: 24px; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }
        .flex { display: flex; }
        .gap-3 { gap: 12px; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .mr-2 { margin-right: 8px; }

        .calendar-container {
           padding: 24px;
        }

        .days-header {
           display: grid;
           grid-template-columns: repeat(7, 1fr);
           margin-bottom: 12px;
           border-bottom: 1px solid rgba(255,255,255,0.1);
           padding-bottom: 12px;
        }

        .day-label {
           color: var(--text-secondary);
           font-size: 0.9rem;
           text-align: center;
           font-weight: 600;
        }

        .days-grid {
           display: grid;
           grid-template-columns: repeat(7, 1fr);
           grid-auto-rows: 120px;
           gap: 1px;
           background: rgba(255,255,255,0.1); /* Grid lines */
           border: 1px solid rgba(255,255,255,0.1);
        }

        .day-cell {
           background: #1c1c1e; /* Cell color */
           padding: 8px;
           display: flex;
           flex-direction: column;
           gap: 4px;
           position: relative;
        }

        .day-cell.disabled {
           background: rgba(20,20,20,0.5);
           opacity: 0.5;
        }

        .day-number {
           font-size: 0.85rem;
           color: var(--text-secondary);
           margin-bottom: 4px;
        }

        .event-chip {
           font-size: 0.75rem;
           padding: 4px 8px;
           border-radius: 4px;
           cursor: pointer;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           transition: 0.2s;
        }

        .event-chip:hover {
           filter: brightness(1.2);
        }

        .event-chip.run {
           background: rgba(48, 98, 255, 0.2);
           color: #80aaff;
           border-left: 2px solid #3062FF;
        }

        .event-chip.strength {
           background: rgba(255, 159, 10, 0.2);
           color: #ffcc80;
           border-left: 2px solid #FF9F0A;
        }
      `}</style>
        </div>
    );
}
