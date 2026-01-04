"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MacroRing } from "@/components/dashboard/MacroRing";
import { NutritionDayView } from "@/components/dashboard/NutritionDayView";
import { Plus, ChevronRight } from "lucide-react";

export default function NutritionPage() {
  const [date, setDate] = useState(new Date());

  const changeDate = (delta: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + delta);
    setDate(newDate);
  };

  const macros = [ // ... existing macros code ...
    { label: "Protein", value: 120, target: 160, color: "var(--kinetiq-volt)" },
    { label: "Carbs", value: 180, target: 250, color: "#3062FF" },
    { label: "Fats", value: 45, target: 70, color: "#FF9F0A" },
  ];

  const meals = [
    { name: "Oatmeal & Berries", cal: 450, time: "Breakfast" },
    { name: "Chicken & Quinoa", cal: 650, time: "Lunch" },
    { name: "Greek Yogurt", cal: 200, time: "Snack" },
  ];

  return (
    <div className="nutrition-page">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fueling Plan</h1>
          <p className="text-secondary">Load Day • Target: 2400 kcal</p>
        </div>
        <Button variant="outline"><Plus size={16} className="mr-2" /> Log Meal</Button>
      </header>

      <div className="mb-6">
        <NutritionDayView date={date} onChangeDate={changeDate} />
      </div>

      <div className="nutrition-grid">
        {/* Macros Card */}
        <div className="glass-panel p-6">
          <h3 className="section-title mb-6">Daily Macros</h3>
          <div className="macros-row">
            {macros.map((m, idx) => <MacroRing key={idx} {...m} />)}
          </div>

          <div className="water-tracker mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Hydration</span>
              <span>1.5 / 3 L</span>
            </div>
            <div className="progress-bg">
              <div className="progress-fill" style={{ width: '50%' }} />
            </div>
          </div>
        </div>

        {/* Meals Card */}
        <div className="glass-panel p-6 flex-1">
          <h3 className="section-title mb-4">Scheduled Meals</h3>
          <div className="meals-list">
            {meals.map((meal, idx) => (
              <div key={idx} className="meal-row">
                <div className="meal-info">
                  <span className="meal-time">{meal.time}</span>
                  <span className="meal-name">{meal.name}</span>
                </div>
                <div className="meal-meta">
                  <span>{meal.cal} kcal</span>
                  <ChevronRight size={16} className="text-secondary" />
                </div>
              </div>
            ))}

            <div className="meal-row future">
              <div className="meal-info">
                <span className="meal-time">Dinner</span>
                <span className="meal-name text-secondary">Salmon & Asparagus</span>
              </div>
              <div className="meal-meta">
                <span className="text-secondary">550 kcal</span>
                <Plus size={16} className="text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mb-8 { margin-bottom: 32px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-2 { margin-bottom: 8px; }
        .mt-6 { margin-top: 24px; }
        .p-6 { padding: 24px; }
        
        .flex { display: flex; }
        .flex-1 { flex: 1; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }
        .text-sm { font-size: 0.85rem; }
        .mr-2 { margin-right: 8px; }

        .section-title { font-weight: 600; font-size: 1.1rem; }

        .nutrition-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .macros-row {
          display: flex;
          justify-content: space-around;
        }

        .water-tracker {
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .progress-bg {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #3062FF;
          border-radius: 4px;
        }

        .meals-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .meal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.02);
          transition: background 0.2s;
        }
        
        .meal-row:hover { background: rgba(255,255,255,0.05); }

        .meal-row.future {
            border: 1px dashed rgba(255,255,255,0.1);
            background: transparent;
        }

        .meal-info {
           display: flex;
           flex-direction: column;
           gap: 2px;
        }

        .meal-time { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
        .meal-name { font-weight: 500; }
        
        .meal-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        @media (max-width: 768px) {
          .nutrition-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
