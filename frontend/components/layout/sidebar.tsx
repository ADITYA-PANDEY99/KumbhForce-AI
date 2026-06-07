"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Sliders,
  Bot,
  FileText,
  Bell,
  UserCog,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  Zap,
  Cpu,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  tooltip: string;
  group?: string;
}

const navItems: NavItem[] = [
  // Operations group
  {
    name: "Command Center",
    href: "/",
    icon: LayoutDashboard,
    tooltip: "Global operational overview — sector health, readiness scores, and live incident feed",
    group: "Operations",
  },
  {
    name: "Workforce Optimizer",
    href: "/optimizer",
    icon: Cpu,
    tooltip: "AI-driven volunteer deployment engine — optimize by skills, distance, and fatigue",
    group: "Operations",
  },
  {
    name: "Volunteer Intel",
    href: "/volunteers",
    icon: Users,
    tooltip: "Volunteer profiles, reliability scores, fatigue index, and skill matrices",
    group: "Operations",
  },
  {
    name: "Predictive Staffing",
    href: "/predictions",
    icon: TrendingUp,
    tooltip: "Anticipate pilgrim crowd surges and forecast staffing shortages",
    group: "Operations",
  },
  {
    name: "Incident Response",
    href: "/incidents",
    icon: ShieldAlert,
    badge: "LIVE",
    tooltip: "Real-time incident management — triage, assign, and resolve field incidents",
    group: "Operations",
  },
  // AI group
  {
    name: "Scenario Simulator",
    href: "/simulator",
    icon: Sliders,
    tooltip: "Run Monte Carlo scenario simulations to stress-test your deployment strategy",
    group: "Intelligence",
  },
  {
    name: "AI Copilot",
    href: "/copilot",
    icon: Bot,
    tooltip: "Conversational AI command interface — query operational data in natural language",
    group: "Intelligence",
  },
  {
    name: "Executive Briefings",
    href: "/briefings",
    icon: FileText,
    tooltip: "Auto-generated AI briefings and performance reports for leadership",
    group: "Intelligence",
  },
  // Admin group
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    tooltip: "Centralized alert inbox — operational warnings, system notifications, and AI alerts",
    group: "Admin",
  },
  {
    name: "User Management",
    href: "/users",
    icon: UserCog,
    tooltip: "Manage command center officers, sector coordinators, and access roles",
    group: "Admin",
  },
  {
    name: "System Audit",
    href: "/audit-logs",
    icon: FileText,
    tooltip: "Audit operations logs, dispatches history, and command changes",
    group: "Admin",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    tooltip: "Platform configuration, API keys, theme preferences, and system settings",
    group: "Admin",
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
    tooltip: "Platform overview, architecture credits, and design principles",
    group: "Admin",
  },
];

const groups = ["Operations", "Intelligence", "Admin"];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative h-screen flex flex-col bg-card border-r border-border shrink-0 overflow-hidden z-10"
      aria-label="Main navigation"
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border shrink-0">
        <motion.div
          className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-base shrink-0 shadow-glow"
          animate={{ boxShadow: "var(--shadow-glow)" }}
          aria-hidden="true"
        >
          <Zap className="h-4.5 w-4.5" />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <p className="text-sm font-bold text-foreground tracking-tight leading-tight">
                KumbhForce AI
              </p>
              <p className="text-[10px] text-foreground-muted font-mono">Command Center</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4" role="navigation">
        {groups.map((group) => {
          const items = navItems.filter((i) => i.group === group);
          return (
            <div key={group}>
              {!collapsed && (
                <p className="text-[9px] font-semibold uppercase tracking-widest text-foreground-subtle px-3 mb-1.5">
                  {group}
                </p>
              )}
              <ul className="space-y-0.5" role="list">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <li key={item.name} role="listitem">
                      <Link
                        href={item.href}
                        title={collapsed ? item.name : item.tooltip}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 relative focus-visible:outline-2 focus-visible:outline-primary",
                          isActive
                            ? "nav-active font-medium"
                            : "text-foreground-muted hover:text-foreground hover:bg-background-secondary"
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-primary"
                            aria-hidden="true"
                          />
                        )}

                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-foreground-subtle group-hover:text-foreground-muted"
                          )}
                          aria-hidden="true"
                        />

                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex-1 truncate"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {item.badge && !collapsed && (
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-danger/15 text-danger border border-danger/30 animate-pulse">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Current user footer */}
      <div className="border-t border-border p-3 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold shrink-0"
            aria-label="User avatar"
          >
            AP
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="min-w-0"
              >
                <p className="text-xs font-semibold text-foreground truncate">Aditya Pandey</p>
                <p className="text-[10px] text-foreground-subtle font-mono">Administrator</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3.5 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors shadow-card z-20"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </motion.aside>
  );
}
