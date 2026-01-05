"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Activity, Dumbbell, Utensils, MessageSquare, Settings, LogOut, Calendar } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/schedule", label: "Schedule", icon: Calendar },
  { href: "/dashboard/strength", label: "Strength", icon: Dumbbell },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: Utensils },
  { href: "/dashboard/chat", label: "AI Coach", icon: MessageSquare },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-area">
        <span className="logo-text text-gradient">Kinetiq</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${isActive ? "active" : ""}`}>
              <Icon size={20} />
              <span className="nav-label">{item.label}</span>
              {isActive && <motion.div layoutId="active-pill" className="active-pill" />}
            </Link>
          );
        })}
      </nav>

      <div className="footer-menu">
        <Link href="/dashboard/settings">
          <button className="nav-item">
            <Settings size={20} />
            <span className="nav-label">Settings</span>
          </button>
        </Link>
        <button className="nav-item">
          <LogOut size={20} />
          <span className="nav-label">Logout</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 32px 24px;
          background: rgba(18, 18, 20, 0.95); /* Deep dark background */
          border-right: 1px solid rgba(255,255,255,0.08);
          z-index: 50;
          backdrop-filter: blur(20px);
        }

        @media (max-width: 768px) {
            .sidebar { display: none; }
        }

        .logo-area {
          margin-bottom: 48px;
          padding-left: 12px;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(to right, #ffffff, #a1a1aa); /* Chrome/Silver gradient */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border-radius: 16px;
          color: #A1A1AA; /* Light gray for inactive */
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s ease-out;
          text-decoration: none;
          border: 1px solid transparent;
        }

        .nav-item:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.08); /* Subtle highlight */
          transform: translateX(4px);
        }

        .nav-item.active {
          color: #121214; /* Black text on Volt */
          background: var(--kinetiq-volt);
          box-shadow: 0 4px 20px rgba(204, 255, 0, 0.2); /* Glow */
          border-color: var(--kinetiq-volt);
        }

        .active-pill {
          display: none; /* Removed in favor of full button fill */
        }

        .footer-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px;
          margin-top: auto;
        }
        
        button.nav-item {
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
      `}</style>
    </aside>
  );
};

import { motion } from "framer-motion";
