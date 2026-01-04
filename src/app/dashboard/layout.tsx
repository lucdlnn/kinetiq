"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />
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
        }
      `}</style>
    </div>
  );
}
