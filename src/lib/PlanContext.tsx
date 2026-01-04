"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
export interface Activity {
    id: string;
    type: 'Run' | 'Strength' | 'Cross';
    date: string; // ISO String
    title: string;
    description?: string;
    duration?: number; // minutes
    rpe?: number;
    completed: boolean;
    data?: any; // Flexible payload for specific workout details
}

export interface Meal {
    id: string;
    date: string; // ISO String
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
    title: string;
    calories: number;
    macros: { p: number; c: number; f: number };
    isPlanned: boolean; // True = AI/Coach suggestion, False = Actually eaten
}

export interface MacroTargets {
    calories: number;
    p: number;
    c: number;
    f: number;
}

interface PlanContextType {
    activities: Activity[];
    meals: Meal[];
    macroTargets: MacroTargets;
    setMacroTargets: (targets: MacroTargets) => void;
    addActivity: (activity: Omit<Activity, 'id' | 'completed'>) => void;
    addMeal: (meal: Omit<Meal, 'id'>) => void;
    toggleActivityCompletion: (id: string) => void;
    deleteActivity: (id: string) => void;
    getActivitiesByDate: (date: Date) => Activity[];
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [macroTargets, setMacroTargetsState] = useState<MacroTargets>({ calories: 2400, p: 160, c: 250, f: 70 });
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedActivities = localStorage.getItem('kinetiq_activities');
        const savedMeals = localStorage.getItem('kinetiq_meals');
        const savedTargets = localStorage.getItem('kinetiq_targets');

        if (savedActivities) setActivities(JSON.parse(savedActivities));
        if (savedMeals) setMeals(JSON.parse(savedMeals));
        if (savedTargets) setMacroTargetsState(JSON.parse(savedTargets));

        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('kinetiq_activities', JSON.stringify(activities));
            localStorage.setItem('kinetiq_meals', JSON.stringify(meals));
            localStorage.setItem('kinetiq_targets', JSON.stringify(macroTargets));
        }
    }, [activities, meals, macroTargets, isLoaded]);

    const addActivity = (activity: Omit<Activity, 'id' | 'completed'>) => {
        const newActivity: Activity = {
            ...activity,
            id: Math.random().toString(36).substr(2, 9),
            completed: false, // Default to false
        };
        setActivities(prev => [...prev, newActivity]);
    };

    const addMeal = (data: Omit<Meal, 'id'>) => {
        const newMeal = { ...data, id: Date.now().toString() };
        setMeals(prev => [...prev, newMeal]);
    };

    const setMacroTargets = (targets: MacroTargets) => {
        setMacroTargetsState(targets);
    };

    const toggleActivityCompletion = (id: string) => {
        setActivities(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
    };

    const deleteActivity = (id: string) => {
        setActivities(prev => prev.filter(a => a.id !== id));
    };

    const getActivitiesByDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return activities.filter(a => a.date.startsWith(dateStr));
    };

    return (
        <PlanContext.Provider value={{
            activities, meals, macroTargets, setMacroTargets, addActivity, addMeal, toggleActivityCompletion, deleteActivity, getActivitiesByDate
        }}>
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) throw new Error("usePlan must be used within a PlanProvider");
    return context;
};
