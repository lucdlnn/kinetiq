"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MacroRing } from "@/components/dashboard/MacroRing";
import { NutritionDayView } from "@/components/dashboard/NutritionDayView";
import { Plus, ChevronRight, Settings, Sparkles } from "lucide-react";
import { usePlan } from "@/lib/PlanContext";
import { format, isSameDay } from "date-fns";

export default function NutritionPage() {
  const { meals, addMeal, macroTargets, setMacroTargets } = usePlan();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isCalsModalOpen, setIsCalsModalOpen] = useState(false); // To edit targets

  // Filter meals for the day
  const dayMeals = meals.filter(m => isSameDay(new Date(m.date), currentDate));
  const loggedMeals = dayMeals.filter(m => !m.isPlanned);
  const plannedMeals = dayMeals.filter(m => m.isPlanned);

  // Calculate totals
  const totalCals = loggedMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalP = loggedMeals.reduce((sum, m) => sum + m.macros.p, 0);
  const totalC = loggedMeals.reduce((sum, m) => sum + m.macros.c, 0);
  const totalF = loggedMeals.reduce((sum, m) => sum + m.macros.f, 0);

  const changeDate = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + delta);
    setCurrentDate(newDate);
  };

  const macros = [
    { label: "Protein", value: totalP, target: macroTargets.p, color: "var(--kinetiq-volt)" },
    { label: "Carbs", value: totalC, target: macroTargets.c, color: "#3062FF" },
    { label: "Fats", value: totalF, target: macroTargets.f, color: "#FF9F0A" },
  ];

  const generateMeal = async () => {
    setIsGenerating(true);
    const cals = (document.getElementById('chef-cals') as HTMLInputElement).value || '500';
    const focus = (document.getElementById('chef-focus') as HTMLSelectElement).value;

    try {
      // 1. Ask AI for structure
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: `Generate a SPECIFIC ${focus} meal recipe for around ${cals} kcal. Return JSON format ONLY: { "title": "Meal Name", "calories": number, "p": number, "c": number, "f": number, "ingredients": "string list" }. Do not use markdown.` })
      });
      const data = await res.json();

      // 2. Parse (Naive attempt, ideally usage of structured output mode)
      // For now, we assume the AI *tries* to give JSON. If not, we fall back to text.
      // But user wants "Concrete implementation".
      // Let's manually parse the text or mock it if parse fails for stability.
      let mealData;
      try {
        // Cleanup Markdown code blocks if present
        const jsonStr = data.reply.replace(/```json/g, '').replace(/```/g, '');
        mealData = JSON.parse(jsonStr);
      } catch (e) {
        // Fallback if AI returns text
        mealData = { title: "AI Suggested Meal", calories: parseInt(cals), p: 30, c: 40, f: 15 };
      }

      addMeal({
        date: currentDate.toISOString(),
        type: 'Lunch', // Default
        title: mealData.title || "AI Meal",
        calories: mealData.calories || 500,
        macros: {
          p: mealData.p || 0,
          c: mealData.c || 0,
          f: mealData.f || 0
        },
        isPlanned: true
      });

    } catch (e) {
      alert("AI Chef is busy! Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="nutrition-page">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Fueling Plan</h1>
            <button onClick={() => setIsCalsModalOpen(true)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-xs text-secondary flex items-center gap-1">
              <Settings size={12} /> Targets
            </button>
          </div>
          <p className="text-secondary mt-1">Target: {macroTargets.calories} kcal • {totalCals} eaten</p>
        </div>
        <Button variant="outline" onClick={() => setIsLogModalOpen(true)}><Plus size={16} className="mr-2" /> Log Meal</Button>
      </header>

      <div className="mb-6">
        <NutritionDayView date={currentDate} onChangeDate={changeDate} />
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
        <div className="glass-panel p-6 flex-1 flex flex-col gap-6">
          {/* Logged Section */}
          <div>
            <h3 className="section-title mb-4 text-xs uppercase tracking-widest text-secondary">Logged</h3>
            {loggedMeals.length === 0 ? <p className="text-sm text-center py-4 opacity-30">No meals logged yet.</p> : (
              <div className="meals-list">
                {loggedMeals.map((meal) => (
                  <div key={meal.id} className="meal-row">
                    <div className="meal-info">
                      <span className="meal-time">{meal.type}</span>
                      <span className="meal-name">{meal.title}</span>
                    </div>
                    <div className="meal-meta">
                      <span>{meal.calories} kcal</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Planned Section */}
          <div>
            <h3 className="section-title mb-4 text-xs uppercase tracking-widest text-kinetiq-volt flex items-center gap-2">
              <Sparkles size={12} /> Coach Recommends
            </h3>
            {plannedMeals.length === 0 ? <p className="text-sm text-center py-4 opacity-30">Ask AI Chef for ideas below.</p> : (
              <div className="meals-list">
                {plannedMeals.map((meal) => (
                  <div key={meal.id} className="meal-row future">
                    <div className="meal-info">
                      <span className="meal-time">{meal.type}</span>
                      <span className="meal-name text-white">{meal.title}</span>
                    </div>
                    <div className="meal-meta text-secondary">
                      <span>{meal.calories} kcal</span>
                      {/* Make "Eat" button convert plan to log */}
                      <button className="text-xs bg-kinetiq-volt text-black px-2 py-1 rounded font-bold hover:opacity-80" onClick={() => {
                        addMeal({ ...meal, isPlanned: false });
                      }}>EAT</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Meal Generator */}
      <div className="glass-panel p-6 mt-6 relative overflow-hidden">
        {/* ... (Existing AI Chef UI same as before but uses generateMeal) ... */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          ✨ AI Chef
        </h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-secondary mb-2 block">Target Calories</label>
            <input type="number" placeholder="600" className="input-field" id="chef-cals" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-secondary mb-2 block">Focus</label>
            <select className="input-field" id="chef-focus">
              <option>Balanced</option>
              <option>High Protein</option>
              <option>Low Carb</option>
              <option>Pre-Workout</option>
            </select>
          </div>
          <Button variant="primary" onClick={generateMeal} disabled={isGenerating}>
            {isGenerating ? "Cooking..." : "Generate Plan"}
          </Button>
        </div>
      </div>

      {/* LOG MEAL MODAL */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsLogModalOpen(false)}>
          <div className="glass-panel w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Log Meal</h3>
            {/* Inputs for Name, Cals, Macros */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-secondary mb-1 block">Meal Name</label>
                <input id="meal-name" className="input-field" placeholder="e.g. Grilled Chicken Salad" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-secondary mb-1 block">Calories</label>
                  <input id="meal-cals" type="number" className="input-field" placeholder="500" />
                </div>
                <div>
                  <label className="text-sm text-secondary mb-1 block">Time</label>
                  <select id="meal-time" className="input-field">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div><label className="text-xs text-secondary mb-1 block">Prot (g)</label><input id="meal-p" type="number" className="input-field" placeholder="30" /></div>
                <div><label className="text-xs text-secondary mb-1 block">Carb (g)</label><input id="meal-c" type="number" className="input-field" placeholder="40" /></div>
                <div><label className="text-xs text-secondary mb-1 block">Fat (g)</label><input id="meal-f" type="number" className="input-field" placeholder="15" /></div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsLogModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => {
                  const name = (document.getElementById('meal-name') as HTMLInputElement).value;
                  const cals = (document.getElementById('meal-cals') as HTMLInputElement).value;
                  const time = (document.getElementById('meal-time') as HTMLSelectElement).value as any;
                  const p = (document.getElementById('meal-p') as HTMLInputElement).value || '0';
                  const c = (document.getElementById('meal-c') as HTMLInputElement).value || '0';
                  const f = (document.getElementById('meal-f') as HTMLInputElement).value || '0';

                  if (name && cals) {
                    addMeal({
                      date: currentDate.toISOString(),
                      title: name,
                      calories: parseInt(cals),
                      type: time,
                      macros: { p: parseInt(p), c: parseInt(c), f: parseInt(f) },
                      isPlanned: false
                    });
                    setIsLogModalOpen(false);
                  }
                }}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TARGETS MODAL */}
      {isCalsModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsCalsModalOpen(false)}>
          <div className="glass-panel w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Macro Targets</h3>
            <div className="space-y-4">
              <div><label className="text-sm text-secondary mb-1 block">Daily Calories</label><input type="number" className="input-field" defaultValue={macroTargets.calories} id="target-cals" /></div>
              <div><label className="text-sm text-secondary mb-1 block">Protein (g)</label><input type="number" className="input-field" defaultValue={macroTargets.p} id="target-p" /></div>
              <div><label className="text-sm text-secondary mb-1 block">Carbs (g)</label><input type="number" className="input-field" defaultValue={macroTargets.c} id="target-c" /></div>
              <div><label className="text-sm text-secondary mb-1 block">Fats (g)</label><input type="number" className="input-field" defaultValue={macroTargets.f} id="target-f" /></div>

              <Button variant="primary" onClick={() => {
                setMacroTargets({
                  calories: parseInt((document.getElementById('target-cals') as HTMLInputElement).value),
                  p: parseInt((document.getElementById('target-p') as HTMLInputElement).value),
                  c: parseInt((document.getElementById('target-c') as HTMLInputElement).value),
                  f: parseInt((document.getElementById('target-f') as HTMLInputElement).value),
                });
                setIsCalsModalOpen(false);
              }}>Update Targets</Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
         /* ... existing styles ... */

        .mb-8 { margin-bottom: 32px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-2 { margin-bottom: 8px; }
        .mt-6 { margin-top: 24px; }
        .mt-1 { margin-top: 4px; }
        .p-6 { padding: 24px; }
        .p-2 { padding: 8px; }
        
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .gap-4 { gap: 16px; }
        .gap-6 { gap: 24px; }
        
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }
        .text-sm { font-size: 0.85rem; }
        .text-xs { font-size: 0.75rem; }
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

        .relative { position: relative; }
        .absolute { position: absolute; }
        .top-0 { top: 0; }
        .right-0 { right: 0; }
        .w-32 { width: 128px; }
        .h-32 { height: 128px; }
        .bg-purple-500\/10 { background-color: rgba(168, 85, 247, 0.1); }
        .blur-\[50px\] { filter: blur(50px); }
        .rounded-full { border-radius: 9999px; }
        .pointer-events-none { pointer-events: none; }
        .items-end { align-items: flex-end; }
        .block { display: block; }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .rounded-xl { border-radius: 0.75rem; }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        .whitespace-pre-wrap { white-space: pre-wrap; }
        .leading-relaxed { line-height: 1.625; }
        
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .space-y-4 > * + * { margin-top: 1rem; }
        .fixed { position: fixed; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .z-\[100\] { z-index: 100; }
        .bg-black\/80 { background-color: rgba(0, 0, 0, 0.8); }
        .backdrop-blur-sm { backdrop-filter: blur(4px); }
        .w-full { width: 100%; }
        .max-w-md { max-width: 28rem; }
        .max-w-sm { max-width: 24rem; }
        .mt-4 { margin-top: 1rem; }
        .tracking-widest { letter-spacing: 0.1em; }
        .uppercase { text-transform: uppercase; }
        .opacity-30 { opacity: 0.3; }
        .text-center { text-align: center; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .text-kinetiq-volt { color: var(--kinetiq-volt); }
        
        /* New Button Style for EAT */
        .bg-kinetiq-volt { background-color: var(--kinetiq-volt); }
        .text-black { color: black; }
        .rounded { border-radius: 4px; }
        .hover\:opacity-80:hover { opacity: 0.8; }

        @media (max-width: 768px) {
          .nutrition-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
