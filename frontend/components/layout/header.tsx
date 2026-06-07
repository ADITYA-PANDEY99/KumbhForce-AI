"use client";

import React, { useEffect, useRef } from "react";
import { useGlobalStore, ThemeType } from "@/store/global-store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  Shield,
  LogOut,
  Settings,
  ChevronDown,
  Palette,
  Check,
} from "lucide-react";

const themes: { id: ThemeType; name: string; description: string; dot: string }[] = [
  { id: "command-aurora",   name: "Command Aurora",   description: "Dark teal + violet", dot: "bg-cyan-400" },
  { id: "kumbh-sunrise",    name: "Kumbh Sunrise",    description: "Saffron + marigold", dot: "bg-orange-500" },
  { id: "neon-command",     name: "Neon Command",     description: "Cyberpunk pink + cyan", dot: "bg-pink-500" },
  { id: "executive-light",  name: "Executive Light",  description: "Clean precision blue", dot: "bg-blue-600" },
];

/* ============================================================
   Clock Component
   ============================================================ */
function OperationalClock() {
  const [time, setTime] = React.useState({ display: "", date: "" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({
        display: now.toLocaleTimeString("en-US", { hour12: false }),
        date: now.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" }),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:flex flex-col items-end" aria-live="polite" aria-label="Operational time">
      <span className="text-sm font-mono font-bold tracking-widest text-primary">{time.display}</span>
      <span className="text-[9px] uppercase font-mono tracking-widest text-foreground-subtle">{time.date} · IST</span>
    </div>
  );
}

/* ============================================================
   Notifications Dropdown
   ============================================================ */
function NotificationsMenu() {
  const { notifications, markNotificationsAsRead } = useGlobalStore();
  const [open, setOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => { setOpen(!open); if (!open) markNotificationsAsRead(); }}
        className="relative h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-background-secondary text-foreground-muted hover:text-foreground transition-colors"
        aria-label={`Notifications — ${unread} unread`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-elevated py-2 z-50"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border mb-1">
              <p className="text-xs font-semibold text-foreground">Notifications</p>
              {unread > 0 && (
                <span className="text-[10px] font-mono text-primary">{unread} unread</span>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-xs text-foreground-subtle px-4 py-6 text-center">No new notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    role="menuitem"
                    className={cn(
                      "px-4 py-3 hover:bg-background-secondary transition-colors border-b border-border/40 last:border-0",
                      !n.read && "border-l-2 border-l-primary"
                    )}
                  >
                    <p className="text-xs font-semibold text-foreground">{n.title}</p>
                    <p className="text-[11px] text-foreground-muted mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[9px] text-foreground-subtle font-mono mt-1.5 block">
                      {new Date(n.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Theme Switcher
   ============================================================ */
function ThemeSwitcher() {
  const { theme, setTheme } = useGlobalStore();
  const [open, setOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = themes.find((t) => t.id === theme)!;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-background-secondary text-foreground-muted hover:text-foreground transition-colors"
        aria-label="Switch UI theme"
        aria-expanded={open}
        aria-haspopup="menu"
        title={`Theme: ${current.name}`}
      >
        <Palette className="h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated py-2 z-50"
          >
            <p className="text-[9px] uppercase tracking-widest text-foreground-subtle px-3 py-1.5 border-b border-border mb-1">
              Select Theme
            </p>
            {themes.map((t) => (
              <button
                key={t.id}
                role="menuitem"
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-background-secondary transition-colors text-left"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", t.dot)} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-medium", theme === t.id ? "text-primary" : "text-foreground")}>
                    {t.name}
                  </p>
                  <p className="text-[10px] text-foreground-subtle">{t.description}</p>
                </div>
                {theme === t.id && (
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   User Menu
   ============================================================ */
function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-border hover:bg-background-secondary transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="User account menu"
      >
        <div className="h-7 w-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-[11px] font-bold text-primary">
          AP
        </div>
        <div className="hidden md:block text-left">
          <p className="text-[11px] font-semibold text-foreground leading-tight">Aditya Pandey</p>
          <p className="text-[9px] text-foreground-subtle font-mono leading-tight">Administrator</p>
        </div>
        <ChevronDown className={cn("h-3.5 w-3.5 text-foreground-muted transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-lg shadow-elevated py-2 z-50"
          >
            <div className="px-3 py-2 border-b border-border mb-1">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <p className="text-[10px] font-mono text-primary">Command Center Officer</p>
              </div>
            </div>
            <button
              role="menuitem"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors"
            >
              <Settings className="h-3.5 w-3.5" aria-hidden="true" />
              Account Settings
            </button>
            <div className="border-t border-border my-1" />
            <button
              role="menuitem"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-danger hover:bg-danger/8 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { registerConnectionListener } from "@/lib/api";

function BackendStatusBadge() {
  const [connected, setConnected] = React.useState(false);

  useEffect(() => {
    return registerConnectionListener((isConnected) => {
      setConnected(isConnected);
    });
  }, []);

  return (
    <div className={cn(
      "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0",
      connected ? "bg-success/10 border-success/30 text-success" : "bg-danger/10 border-danger/30 text-danger"
    )}>
      {connected ? "🟢 Backend Connected" : "🔴 Offline Demo Mode"}
    </div>
  );
}

/* ============================================================
   Header Export
   ============================================================ */
export function Header() {
  const toggleCommandPalette = useGlobalStore((state) => state.toggleCommandPalette);

  return (
    <header className="h-16 flex items-center justify-between gap-4 px-6 border-b border-border bg-card/80 backdrop-blur-md shrink-0 sticky top-0 z-20">
      {/* Search / Command Palette trigger */}
      <button
        onClick={() => toggleCommandPalette(true)}
        className="flex items-center gap-2.5 w-52 xl:w-72 px-3 py-2 rounded-md border border-border bg-background-secondary/60 hover:bg-background-secondary text-foreground-muted text-xs text-left transition-colors group"
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5 shrink-0 group-hover:text-primary transition-colors" aria-hidden="true" />
        <span className="flex-1">Search or run command...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 border border-border rounded text-[9px] font-mono text-foreground-subtle">
          ⌃K
        </kbd>
      </button>

      {/* Right cluster */}
      <div className="flex items-center gap-3">
        <BackendStatusBadge />
        {/* Separator + clock */}
        <div className="hidden lg:block pr-3 border-r border-border">
          <OperationalClock />
        </div>

        <ThemeSwitcher />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
