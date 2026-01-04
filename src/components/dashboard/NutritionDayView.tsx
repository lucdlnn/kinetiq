"use client";

import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NutritionDayViewProps {
    date: Date;
    onChangeDate: (delta: number) => void;
}

export const NutritionDayView = ({ date, onChangeDate }: NutritionDayViewProps) => {
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="nutrition-day-view">
            <div className="date-nav glass-panel">
                <button onClick={() => onChangeDate(-1)} className="nav-btn"><ChevronLeft size={20} /></button>
                <span className="date-label">{formattedDate}</span>
                <button onClick={() => onChangeDate(1)} className="nav-btn"><ChevronRight size={20} /></button>
            </div>

            <div className="summary-grid mt-4">
                <div className="glass-panel p-4">
                    <div className="stat-label">Calories</div>
                    <div className="stat-val">1,850 <span className="text-secondary">/ 2,400</span></div>
                </div>
                <div className="glass-panel p-4">
                    <div className="stat-label">Protein</div>
                    <div className="stat-val">120g <span className="text-secondary">/ 160g</span></div>
                </div>
            </div>

            <div className="meals-container mt-4 glass-panel p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Today's Log</h3>
                    <Button variant="outline" size="sm"><Plus size={14} /> Add Food</Button>
                </div>

                <div className="placeholder-log">
                    <p className="text-secondary text-center py-8">No meals logged yet today.</p>
                </div>
            </div>

            <style jsx>{`
         .date-nav {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px; border-radius: 12px;
         }
         .nav-btn { background: none; border: none; color: white; cursor: pointer; padding: 8px; border-radius: 50%; }
         .nav-btn:hover { background: rgba(255,255,255,0.1); }
         .date-label { font-weight: 600; }

         .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
         .stat-label { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px; }
         .stat-val { font-size: 1.2rem; font-weight: 700; }
         .text-secondary { color: var(--text-secondary); }
         .text-center { text-align: center; }
         .py-8 { padding-top: 32px; padding-bottom: 32px; }
         .mt-4 { margin-top: 16px; }
         .p-4 { padding: 16px; }
         .flex { display: flex; }
         .justify-between { justify-content: space-between; }
         .items-center { align-items: center; }
         .mb-4 { margin-bottom: 16px; }
         .text-lg { font-size: 1.1rem; }
         .font-bold { font-weight: 700; }
       `}</style>
        </div>
    );
};
