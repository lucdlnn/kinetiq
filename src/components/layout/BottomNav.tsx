"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Calendar, Dumbbell, Utensils, MessageSquare } from "lucide-react";

export const BottomNav = () => {
    const pathname = usePathname();

    const tabs = [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/dashboard/schedule", label: "Plan", icon: Calendar },
        { href: "/dashboard/strength", label: "Lift", icon: Dumbbell },
        { href: "/dashboard/nutrition", label: "Eat", icon: Utensils },
        { href: "/dashboard/chat", label: "Coach", icon: MessageSquare },
    ];

    return (
        <nav className="bottom-nav glass-panel">
            {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = pathname === tab.href;
                return (
                    <Link key={tab.href} href={tab.href} className={`tab-item ${isActive ? 'active' : ''}`}>
                        <div className="icon-wrapper">
                            <Icon size={22} className={isActive ? "text-kinetiq-volt" : ""} />
                            {isActive && <div className="active-dot" />}
                        </div>
                        <span className="tab-label">{tab.label}</span>
                    </Link>
                );
            })}

            <style jsx>{`
                .bottom-nav {
                    display: none; /* Hidden on Desktop */
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: calc(60px + env(safe-area-inset-bottom));
                    background: rgba(11, 11, 13, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    justify-content: space-around;
                    align-items: flex-start;
                    padding-top: 10px;
                    padding-bottom: env(safe-area-inset-bottom);
                    z-index: 100;
                }

                .tab-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    color: var(--text-secondary);
                    flex: 1;
                    text-decoration: none;
                }

                .tab-item.active {
                    color: white;
                }

                .icon-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .text-kinetiq-volt {
                    color: var(--kinetiq-volt);
                    filter: drop-shadow(0 0 8px rgba(204, 255, 0, 0.4));
                }

                .active-dot {
                    width: 4px;
                    height: 4px;
                    background: var(--kinetiq-volt);
                    border-radius: 50%;
                    position: absolute;
                    bottom: -6px;
                }

                .tab-label {
                    font-size: 0.65rem;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .bottom-nav { display: flex; }
                }
            `}</style>
        </nav>
    );
}
