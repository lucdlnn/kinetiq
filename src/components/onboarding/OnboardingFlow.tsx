"use client";

import { useState } from "react";
import { UserProfile, OnboardingStep } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeStep } from "./steps/WelcomeStep";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { GoalsStep } from "./steps/GoalsStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { ConstraintsStep } from "./steps/ConstraintsStep";
import { AnalysisStep } from "./steps/AnalysisStep";
import { useRouter } from "next/navigation";

const initialProfile: UserProfile = {
    name: "",
    age: 0,
    gender: "male",
    height: 0,
    weight: 0,
    primaryGoal: "general_fitness",
    runningExperience: "beginner",
    availableDays: [],
    injuries: [],
    equipment: [],
    dietaryRestrictions: [],
    allergies: [],
};

export const OnboardingFlow = () => {
    const router = useRouter();
    const [step, setStep] = useState<OnboardingStep>("welcome");
    const [profile, setProfile] = useState<UserProfile>(initialProfile);

    const updateProfile = (data: Partial<UserProfile>) => {
        setProfile((prev) => ({ ...prev, ...data }));
    };

    const nextStep = (target: OnboardingStep) => {
        setStep(target);
    };

    return (
        <div className="onboarding-wrapper">
            <AnimatePresence mode="wait">
                {step === "welcome" && (
                    <WelcomeStep key="welcome" onNext={() => nextStep("basics")} />
                )}
                {step === "basics" && (
                    <BasicInfoStep
                        key="basics"
                        data={profile}
                        updateData={updateProfile}
                        onNext={() => nextStep("goals")}
                        onBack={() => nextStep("welcome")}
                    />
                )}
                {step === "goals" && (
                    <GoalsStep
                        key="goals"
                        data={profile}
                        updateData={updateProfile}
                        onNext={() => nextStep("history")}
                        onBack={() => nextStep("basics")}
                    />
                )}
                {step === "history" && (
                    <ExperienceStep
                        key="history"
                        data={profile}
                        updateData={updateProfile}
                        onNext={() => nextStep("constraints")}
                        onBack={() => nextStep("goals")}
                    />
                )}
                {step === "constraints" && (
                    <ConstraintsStep
                        key="constraints"
                        data={profile}
                        updateData={updateProfile}
                        onNext={() => nextStep("analysis")}
                        onBack={() => nextStep("history")}
                    />
                )}
                {step === "analysis" && (
                    <AnalysisStep
                        key="analysis"
                        onComplete={() => router.push('/dashboard')}
                    />
                )}
                {/* Future steps: constraints, analysis */}
            </AnimatePresence>

            <style jsx>{`
        .onboarding-wrapper {
          width: 100%;
          max-width: 600px;
          position: relative;
        }
      `}</style>
        </div>
    );
};
