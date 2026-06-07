"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { useGlobalStore, ThemeType } from "@/store/global-store";
import {
  Settings as SettingsIcon,
  Palette,
  User,
  Bell,
  Sliders,
  Eye,
  CheckCircle,
  Shield
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useGlobalStore();
  const [profileName, setProfileName] = useState("Aditya Pandey");
  const [profileEmail, setProfileEmail] = useState("aditya.p@kumbhforce.gov.in");
  
  // Local settings switches
  const [allowSmsAlerts, setAllowSmsAlerts] = useState(true);
  const [allowAiSuggestions, setAllowAiSuggestions] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 1500);
  };

  const themesList: { id: ThemeType; label: string; desc: string }[] = [
    { id: "command-aurora", label: "Command Aurora", desc: "Dark mode tech aurora theme (Default)" },
    { id: "kumbh-sunrise", label: "Kumbh Sunrise", desc: "Warm saffron and gold spiritual command aesthetic" },
    { id: "neon-command", label: "Neon Command", desc: "High contrast neon pink and cyan layout" },
    { id: "executive-light", label: "Executive Light", desc: "Precision blue theme on light backing" }
  ];

  return (
    <AppShell pageTitle="Settings">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <SettingsIcon className="h-6 w-6 text-primary" /> System Settings
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Adjust global visual themes, audit profile settings, and toggle alert telemetry parameters.
            </p>
          </div>
        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-success/15 border border-success/30 rounded text-success text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle className="h-4.5 w-4.5" />
              Settings changes saved successfully globally!
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Theme selection panel (xl:col-span-8) */}
          <div className="xl:col-span-8 space-y-6">
            
            <CommandCard
              title="Global Theme Settings"
              subtitle="Theme changes apply globally across the dashboard and layouts instantly"
              icon={Palette}
            >
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {themesList.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                      theme === t.id ? "bg-primary/5 border-primary shadow-glow" : "bg-card border-border/80 hover:bg-background-secondary/50"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{t.label}</h4>
                      <p className="text-[10px] text-foreground-subtle mt-1">{t.desc}</p>
                    </div>
                    {theme === t.id && (
                      <span className="absolute top-2 right-2 text-[8px] font-bold font-mono px-1 rounded bg-primary text-white uppercase">Active</span>
                    )}
                  </div>
                ))}
              </div>
            </CommandCard>

            {/* Profile Preferences */}
            <CommandCard
              title="Operator Profile Details"
              subtitle="Current operational credentials details"
              icon={User}
            >
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Operator Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Email address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none"
                  />
                </div>
              </div>
            </CommandCard>

          </div>

          {/* Settings side parameters (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-4">
            
            {/* System settings checkboxes */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-4 text-xs">
              <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
                <Bell className="h-4 w-4 text-primary" />
                <h4 className="font-bold uppercase tracking-wider text-foreground">Alert Telemetry Preferences</h4>
              </div>

              <div className="space-y-3 pt-1">
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground block">SMS Dispatch Alerts</span>
                    <span className="text-[9px] text-foreground-subtle block">Send critical updates directly to phone logs</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowSmsAlerts}
                    onChange={(e) => setAllowSmsAlerts(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground block">AI Proactive Suggestions</span>
                    <span className="text-[9px] text-foreground-subtle block">Auto-calculate rebalancing paths dynamically</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowAiSuggestions}
                    onChange={(e) => setAllowAiSuggestions(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                </div>

              </div>
            </div>

            {/* Accessibility features */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-4 text-xs">
              <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
                <Eye className="h-4 w-4 text-primary" />
                <h4 className="font-bold uppercase tracking-wider text-foreground">Accessibility Configurations</h4>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground block">High Contrast Mode</span>
                    <span className="text-[9px] text-foreground-subtle block">Enable high contrast border visibility</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isHighContrast}
                    onChange={(e) => setIsHighContrast(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded bg-primary text-white font-bold text-xs shadow-elevated hover:bg-primary/95 transition-all cursor-pointer text-center"
            >
              SAVE SETTINGS CHANGES
            </button>

          </div>

        </form>

      </div>
    </AppShell>
  );
}
