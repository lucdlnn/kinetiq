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
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border-right: 1px solid rgba(255,255,255,0.1);
          border-radius: 0;
          z-index: 50;
        }

        @media (max-width: 768px) {
            .sidebar { display: none; }
        }

        .logo-area {
          margin-bottom: 40px;
          padding-left: 12px;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.05em;
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
          gap: 12px;
          padding: 12px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          position: relative;
          transition: 0.2s;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .nav-item.active {
          color: var(--kinetiq-volt);
          background: rgba(204, 255, 0, 0.1);
        }

        .nav-label {
          font-weight: 500;
          font-size: 0.95rem;
        }

        .footer-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px;
        }
        
        button.nav-item {
          background: none;
          border: none;
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
