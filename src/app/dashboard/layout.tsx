"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <BottomNav />
      <main className="dashboard-content">
        {children}
      </main>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: var(--kinetiq-black);
          display: flex;
        }

        .dashboard-content {
          margin-left: 260px; /* Sidebar width */
          flex: 1;
          padding: 32px;
          min-height: 100vh;
          padding-bottom: 100px; /* Space for bottom nav on mobile */
        }

        @media (max-width: 768px) {
            .dashboard-content {
                margin-left: 0;
                padding: 16px;
                padding-bottom: calc(80px + env(safe-area-inset-bottom));
            }
        }
      `}</style>
    </div>
  );
}
