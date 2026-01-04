"use client";

import { Button } from "@/components/ui/Button";
import { ExerciseCard } from "@/components/dashboard/ExerciseCard";
import { Play } from "lucide-react";

export default function StrengthPage() {
  const workout = [
    { name: "Goblet Squats", sets: 3, reps: "12" },
    { name: "Romanian Deadlifts", sets: 3, reps: "10", weight: "20kg" },
    { name: "Walking Lunges", sets: 3, reps: "20 steps" },
    { name: "Plank Hold", sets: 3, reps: "45 sec" },
    { name: "Glute Bridges", sets: 3, reps: "15" }
  ];

  return (
    <div className="strength-page">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lower Body Power</h1>
          <p className="text-secondary">Focus: Glutes & Hamstrings • 45 min</p>
        </div>
        <Button variant="primary"><Play size={16} className="mr-2" /> Start Guided Session</Button>
      </header>

      <div className="workout-container">
        <div className="section-label mb-4">Warm Up (5 min)</div>
        <ExerciseCard name="Dynamic Stretching" sets={1} reps="5 min" />

        <div className="section-label mb-4 mt-6">Main Set</div>
        {workout.map((ex, idx) => (
          <ExerciseCard key={idx} {...ex} />
        ))}

        <div className="section-label mb-4 mt-6">Cool Down</div>
        <ExerciseCard name="Static Stretching" sets={1} reps="5 min" />
      </div>

      <style jsx>{`
        .strength-page { padding-bottom: 40px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-4 { margin-bottom: 16px; }
        .mt-6 { margin-top: 24px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }
        .mr-2 { margin-right: 8px; }
        
        .section-label {
          text-transform: uppercase;
          font-size: 0.85rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
