"use client";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <div className="onboarding-container">
      <OnboardingFlow />

      <style jsx>{`
        .onboarding-container {
          min-height: 100vh;
          background: var(--kinetiq-black);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
