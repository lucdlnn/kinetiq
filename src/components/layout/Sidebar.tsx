"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Dumbbell, Utensils, MessageSquare, Settings, LogOut, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <aside className="sidebar">
      <div className="logo-area">
        <span className="logo-text">Kinetiq</span>
      </div>

      <nav className="nav-menu space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="w-full block">
              <Button
                variant={isActive ? "primary" : "ghost"}
                fullWidth
                className={`!justify-start gap-3 !px-4 ${!isActive ? 'text-secondary hover:text-white' : ''}`}
              >
                <Icon size={20} className={isActive ? "text-black" : "text-current"} />
                <span className="font-bold">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="footer-menu space-y-3 mt-auto pt-6 border-t border-white/10">
        <Link href="/dashboard/settings" className="w-full block">
          <Button variant="ghost" fullWidth className="!justify-start gap-3 !px-4 text-secondary hover:text-white">
            <Settings size={20} />
            <span className="font-bold">Settings</span>
          </Button>
        </Link>
        <Button variant="ghost" fullWidth className="!justify-start gap-3 !px-4 text-secondary hover:text-red-400">
          <LogOut size={20} />
          <span className="font-bold">Logout</span>
        </Button>
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
          background: #121214; /* Solid dark background */
          border-right: 2px solid #27272A;
          z-index: 50;
        }

        @media (max-width: 768px) {
            .sidebar { display: none; }
        }

        .logo-area {
          margin-bottom: 40px;
          padding-left: 8px;
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic;
        }

        .nav-menu {
          flex: 1;
        }
      `}</style>
    </aside>
  );
};
