"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useGlobalStore } from "@/store/global-store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  ShieldAlert,
  Sliders,
  Bot,
  FileText,
  Bell,
  UserCog,
  Settings,
  Palette,
  AlertCircle,
  Cpu,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

interface PaletteAction {
  id: string;
  name: string;
  description?: string;
  category: string;
  icon: LucideIcon;
  perform: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const { isCommandPaletteOpen, toggleCommandPalette, setTheme, addNotification } = useGlobalStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      toggleCommandPalette(false);
      setQuery("");
    },
    [router, toggleCommandPalette]
  );

  const actions: PaletteAction[] = [
    { id: "nav-home",       name: "Go to Command Center",     description: "Operational overview dashboard",    category: "Navigation", icon: LayoutDashboard, perform: () => navigate("/"), keywords: ["dashboard", "home"] },
    { id: "nav-workforce",  name: "Go to Workforce Optimizer", description: "AI-driven deployment engine",       category: "Navigation", icon: Cpu,             perform: () => navigate("/workforce") },
    { id: "nav-volunteers", name: "Go to Volunteer Intel",     description: "Profiles and reliability scores",  category: "Navigation", icon: Users,           perform: () => navigate("/volunteers") },
    { id: "nav-incidents",  name: "Go to Incident Response",   description: "Live incident management",         category: "Navigation", icon: ShieldAlert,     perform: () => navigate("/incidents") },
    { id: "nav-simulator",  name: "Go to Scenario Simulator",  description: "Monte Carlo scenario sandbox",     category: "Navigation", icon: Sliders,         perform: () => navigate("/simulator") },
    { id: "nav-copilot",    name: "Go to AI Copilot",          description: "Natural language command interface", category: "Navigation", icon: Bot,           perform: () => navigate("/copilot") },
    { id: "nav-briefings",  name: "Go to Executive Briefings", description: "Auto-generated leadership reports", category: "Navigation", icon: FileText,       perform: () => navigate("/briefings") },
    { id: "nav-notifs",     name: "Go to Notifications",       description: "Alert inbox",                      category: "Navigation", icon: Bell,            perform: () => navigate("/notifications") },
    { id: "nav-users",      name: "Go to User Management",     description: "Roles and access control",         category: "Navigation", icon: UserCog,         perform: () => navigate("/users") },
    { id: "nav-settings",   name: "Go to Settings",            description: "Platform configuration",           category: "Navigation", icon: Settings,        perform: () => navigate("/settings") },
    // Themes
    { id: "theme-aurora",   name: "Theme: Command Aurora",     description: "Dark teal + violet",               category: "Theme",      icon: Palette, perform: () => { setTheme("command-aurora"); toggleCommandPalette(false); } },
    { id: "theme-sunrise",  name: "Theme: Kumbh Sunrise",      description: "Saffron + marigold",               category: "Theme",      icon: Palette, perform: () => { setTheme("kumbh-sunrise"); toggleCommandPalette(false); } },
    { id: "theme-neon",     name: "Theme: Neon Command",       description: "Cyberpunk pink + cyan",            category: "Theme",      icon: Palette, perform: () => { setTheme("neon-command"); toggleCommandPalette(false); } },
    { id: "theme-light",    name: "Theme: Executive Light",    description: "Clean precision blue",             category: "Theme",      icon: Palette, perform: () => { setTheme("executive-light"); toggleCommandPalette(false); } },
    // System
    { id: "sys-alert",      name: "Send Test Alert",           description: "Trigger a test system notification", category: "System",  icon: AlertCircle, perform: () => { addNotification({ title: "Test Alert", message: "Diagnostic notification triggered from command palette.", severity: "warning" }); toggleCommandPalette(false); } },
  ];

  const filtered = actions.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.keywords?.some((k) => k.includes(q))
    );
  });

  const categories = [...new Set(filtered.map((a) => a.category))];

  // Keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (!isCommandPaletteOpen) return;
      if (e.key === "Escape") { toggleCommandPalette(false); setQuery(""); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) { filtered[selected].perform(); setQuery(""); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, toggleCommandPalette, filtered, selected]);

  useEffect(() => { setSelected(0); }, [query]);

  let actionIdx = 0;

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => { toggleCommandPalette(false); setQuery(""); }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
            className="relative w-full max-w-xl bg-card border border-border rounded-lg shadow-elevated overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="h-4 w-4 text-foreground-muted shrink-0" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                placeholder="Search pages, actions, or themes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none py-4 text-sm text-foreground placeholder-foreground-subtle"
                aria-label="Command palette search"
                role="searchbox"
                aria-autocomplete="list"
              />
              <kbd className="px-1.5 py-0.5 border border-border rounded text-[10px] font-mono text-foreground-subtle">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 ? (
                <p className="text-xs text-foreground-subtle text-center py-8">No results found</p>
              ) : (
                categories.map((category) => (
                  <div key={category}>
                    <p className="text-[9px] uppercase tracking-widest text-foreground-subtle px-4 py-1.5">
                      {category}
                    </p>
                    {filtered
                      .filter((a) => a.category === category)
                      .map((action) => {
                        const Icon = action.icon;
                        const isSelected = actionIdx === selected;
                        const currentIdx = actionIdx;
                        actionIdx++;

                        return (
                          <motion.button
                            key={action.id}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => { action.perform(); setQuery(""); }}
                            onMouseEnter={() => setSelected(currentIdx)}
                            whileHover={{ x: 2 }}
                            className={cn(
                              "w-full flex items-center justify-between gap-3 px-4 py-2.5 transition-colors text-left",
                              isSelected ? "bg-background-secondary" : "hover:bg-background-secondary/50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("h-7 w-7 rounded-md flex items-center justify-center", isSelected ? "bg-primary/15" : "bg-border/50")}>
                                <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-primary" : "text-foreground-muted")} aria-hidden="true" />
                              </div>
                              <div>
                                <p className={cn("text-xs font-medium", isSelected ? "text-foreground" : "text-foreground-muted")}>
                                  {action.name}
                                </p>
                                {action.description && (
                                  <p className="text-[10px] text-foreground-subtle">{action.description}</p>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                            )}
                          </motion.button>
                        );
                      })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-background-secondary/40">
              {[
                ["↑↓", "Navigate"],
                ["↵", "Select"],
                ["Esc", "Close"],
              ].map(([key, label]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 border border-border rounded text-[9px] font-mono text-foreground-subtle bg-card">
                    {key}
                  </kbd>
                  <span className="text-[9px] text-foreground-subtle">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
