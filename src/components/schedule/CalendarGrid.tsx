"use client";

import { useState } from 'react';
import {
    format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { usePlan } from '@/lib/PlanContext';
import { Button } from '@/components/ui/Button';

interface CalendarGridProps {
    onDayClick: (date: Date) => void;
    onEventClick: (event: any) => void;
}

export const CalendarGrid = ({ onDayClick, onEventClick }: CalendarGridProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { activities } = usePlan();

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const jumpToToday = () => setCurrentMonth(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
        <div className="calendar-wrapper glass-panel">
            {/* Header */}
            <div className="cal-header">
                <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="nav-btn"><ChevronLeft /></button>
                    <button onClick={jumpToToday} className="nav-btn text-xs">Today</button>
                    <button onClick={nextMonth} className="nav-btn"><ChevronRight /></button>
                </div>
            </div>

            {/* Days Header */}
            <div className="cal-grid-header">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="day-name">{d}</div>
                ))}
            </div>

            {/* Grid */}
            <div className="cal-grid">
                {days.map((day, idx) => {
                    const dayEvents = activities.filter(a => isSameDay(new Date(a.date), day));
                    const isCurrentMonth = isSameMonth(day, currentMonth);

                    return (
                        <div
                            key={day.toISOString()}
                            className={`cal-cell ${!isCurrentMonth ? 'dimmed' : ''} ${isToday(day) ? 'today' : ''}`}
                            onClick={() => onDayClick(day)}
                        >
                            <div className="cell-header">
                                <span className="day-num">{format(day, 'd')}</span>
                                {isToday(day) && <span className="today-dot" />}
                            </div>

                            <div className="events-stack">
                                {dayEvents.map(ev => (
                                    <div
                                        key={ev.id}
                                        className={`text-xs p-1 mb-1 rounded cursor-pointer truncate
                                ${ev.type === 'Run' ? 'bg-blue-500/20 text-blue-200' :
                                                ev.type === 'Strength' ? 'bg-orange-500/20 text-orange-200' :
                                                    'bg-green-500/20 text-green-200'}
                                ${ev.completed ? 'line-through opacity-50' : ''}
                            `}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEventClick(ev);
                                        }}
                                    >
                                        {ev.completed && <span className="check">✓</span>}
                                        {ev.type === 'Run' ? '🏃' : ev.type === 'Strength' ? '🏋️' : '⏱️'}
                                        <span className="ev-title">{ev.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        .calendar-wrapper { padding: 20px; border-radius: 16px; min-height: 600px; display: flex; flex-direction: column; }
        .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .nav-btn { background: rgba(255,255,255,0.05); border: none; padding: 8px; border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center; }
        .nav-btn:hover { background: rgba(255,255,255,0.1); }
        
        .cal-grid-header { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 10px; }
        .day-name { text-align: center; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; }

        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; flex: 1; }
        
        .cal-cell { background: var(--kinetiq-black); min-height: 100px; padding: 8px; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; }
        .cal-cell:hover { background: #2c2c2e; }
        .cal-cell.dimmed { opacity: 0.3; }
        .cal-cell.today { background: rgba(204, 255, 0, 0.05); }

        .cell-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .day-num { font-weight: 600; font-size: 0.9rem; }
        .today-dot { width: 6px; height: 6px; background: var(--kinetiq-volt); border-radius: 50%; }

        .events-stack { display: flex; flex-direction: column; gap: 4px; }
        .event-chip { 
            font-size: 0.75rem; padding: 4px 6px; border-radius: 4px; 
            background: rgba(255,255,255,0.1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
            display: flex; align-items: center; gap: 4px;
        }
        .event-chip.run { border-left: 2px solid #3062ff; }
        .event-chip.strength { border-left: 2px solid #ff9f0a; }
        .event-chip.cross { border-left: 2px solid #34c759; }
        .event-chip.done { opacity: 0.5; text-decoration: line-through; }
        
        .ev-title { overflow: hidden; text-overflow: ellipsis; }
      `}</style>
        </div>
    );
};
