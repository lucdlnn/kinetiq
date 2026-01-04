export type MeasurementUnit = 'metric' | 'imperial';

export interface UserProfile {
    // Basic Info
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number; // cm
    weight: number; // kg

    // Goals
    primaryGoal: 'run_faster' | 'run_further' | 'lose_weight' | 'gain_muscle' | 'general_fitness';
    targetDistance?: '5k' | '10k' | 'half_marathon' | 'marathon' | 'ultra';

    // Experience
    runningExperience: 'beginner' | 'intermediate' | 'advanced' | 'elite';
    averagePace?: string; // min/km
    weeklyDistance?: number; // km
    recentRaceTime?: string;

    // Constraints & Preferences
    availableDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
    injuries: string[]; // e.g., 'knees', 'ankles'
    equipment: ('gym' | 'dumbbells' | 'bodyweight' | 'treadmill' | 'street')[];

    // Health & Nutrition
    dietaryRestrictions: ('vegan' | 'vegetarian' | 'gluten_free' | 'dairy_free' | 'none')[];
    allergies: string[];
}

export type OnboardingStep = 'welcome' | 'basics' | 'goals' | 'history' | 'constraints' | 'analysis' | 'complete';
