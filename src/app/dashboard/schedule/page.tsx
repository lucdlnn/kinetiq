"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WorkoutDetailModal } from "@/components/schedule/WorkoutDetailModal";
import { LogActivityModal } from "@/components/schedule/LogActivityModal";
import { CalendarGrid } from "@/components/schedule/CalendarGrid";
import { usePlan } from "@/lib/PlanContext";
import { Plus, Calendar as CalIcon, Play } from "lucide-react";

export default function SchedulePage() {
    const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
    const [isLogging, setIsLogging] = useState(false);
    const [logDate, setLogDate] = useState<Date | undefined>(undefined);

    const { addActivity } = usePlan();

    const handleAddActivity = (data: any) => {
        addActivity(data);
        setIsLogging(false);
    };

    const handleDayClick = (date: Date) => {
        setLogDate(date);
        setIsLogging(true);
    };

    return (
        <div className="page-container p-6">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Schedule</h1>
                    <p className="text-secondary">Your training journey</p>
                </div>
                <div className="actions flex gap-3">
                    <Button variant="outline"><CalIcon size={16} className="mr-2" /> Sync</Button>
                    <Button variant="primary" onClick={() => window.location.href = '/dashboard/workout/active'}>
                        <Play size={16} className="mr-2" /> Start Workout
                    </Button>
                </div>
            </header>

            {/* Dynamic Calendar */}
            <CalendarGrid
                onDayClick={handleDayClick}
                onEventClick={(ev) => setSelectedWorkout(ev)}
            />

            {selectedWorkout && (
                <WorkoutDetailModal
                    workout={selectedWorkout}
                    onClose={() => setSelectedWorkout(null)}
                />
            )}

            {isLogging && (
                <LogActivityModal
                    initialDate={logDate}
                    onClose={() => setIsLogging(false)}
                    onSave={handleAddActivity}
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
      `}</style>
        </div>
    );
}
