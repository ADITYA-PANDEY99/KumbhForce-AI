"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Cpu, Users, ShieldAlert, Sliders, Bot, FileText,
  Bell, UserCog, Settings, Info, LayoutDashboard,
  Activity, Brain, TrendingUp, LucideIcon,
} from "lucide-react";

/* Icon registry — avoids passing component functions across the server/client boundary */
const ICON_MAP: Record<string, LucideIcon> = {
  Cpu, Users, ShieldAlert, Sliders, Bot, FileText,
  Bell, UserCog, Settings, Info, LayoutDashboard,
  Activity, Brain, TrendingUp,
};

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  sections: {
    label: string;
    width?: "full" | "half" | "third";
    height?: "sm" | "md" | "lg" | "xl";
  }[];
}

const heightMap = { sm: "h-32", md: "h-48", lg: "h-64", xl: "h-80" };

export function PlaceholderPage({
  title,
  subtitle,
  iconName,
  badge,
  sections,
}: PlaceholderPageProps) {
  const Icon = ICON_MAP[iconName] ?? Info;

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              {badge && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background-secondary border border-border">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground-subtle" aria-hidden="true" />
          <span className="text-xs font-mono text-foreground-subtle">Coming in Phase 3</span>
        </div>
      </motion.div>

      {/* Skeleton sections */}
      <div className="grid grid-cols-12 gap-4">
        {sections.map((section, i) => {
          const colSpan =
            section.width === "full"  ? "col-span-12" :
            section.width === "half"  ? "col-span-12 lg:col-span-6" :
            section.width === "third" ? "col-span-12 lg:col-span-4" :
            "col-span-12";

          return (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.28 }}
              className={colSpan}
            >
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background-secondary/50">
                  <div className="h-3 w-24 rounded shimmer" />
                  <div className="h-2.5 w-12 rounded shimmer" />
                </div>
                <div className={cn("p-4 flex flex-col gap-3", heightMap[section.height ?? "md"])}>
                  <div className="h-2 w-full rounded shimmer" />
                  <div className="h-2 w-4/5 rounded shimmer" />
                  <div className="h-2 w-3/5 rounded shimmer" />
                  <div className="flex-1 rounded-md bg-background-secondary/60 border border-border/40 flex items-center justify-center">
                    <p className="text-xs text-foreground-subtle font-mono">{section.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Phase notice */}
      <div className="border border-dashed border-border rounded-lg p-8 text-center">
        <Icon className="h-10 w-10 mx-auto mb-3 text-primary opacity-20" aria-hidden="true" />
        <p className="text-sm font-semibold text-foreground">{title} — Phase 3 Implementation</p>
        <p className="text-xs text-foreground-muted mt-1 max-w-md mx-auto">
          The business logic, data connections, and AI engines for this module will be built in Phase 3.
          The layout skeleton and component system are already in place.
        </p>
      </div>
    </div>
  );
}
