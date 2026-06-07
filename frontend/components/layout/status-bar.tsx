"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Users,
  Map,
  Activity,
  Brain,
  AlertTriangle,
} from "lucide-react";

interface StatusItem {
  label: string;
  value: string | number;
  status: "ok" | "warning" | "critical";
  icon: React.ElementType;
}

const mockStatus: StatusItem[] = [
  { label: "System Status",      value: "Operational",  status: "ok",       icon: CheckCircle2 },
  { label: "Active Volunteers",  value: "4,218",        status: "ok",       icon: Users },
  { label: "Active Sectors",     value: "12 / 14",      status: "warning",  icon: Map },
  { label: "Operational Health", value: "94.2%",        status: "ok",       icon: Activity },
  { label: "AI Confidence",      value: "87.5%",        status: "ok",       icon: Brain },
  { label: "Open Incidents",     value: "3",            status: "warning",  icon: AlertTriangle },
];

const statusColors = {
  ok:       { dot: "bg-success", text: "text-success",  bg: "" },
  warning:  { dot: "bg-warning", text: "text-warning",  bg: "bg-warning/5" },
  critical: { dot: "bg-danger",  text: "text-danger",   bg: "bg-danger/5" },
};

export function StatusBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center px-6 h-9 border-b border-border bg-background-secondary/80 backdrop-blur-sm gap-1 overflow-x-auto"
      role="status"
      aria-label="Operational system status"
    >
      {mockStatus.map((item, idx) => {
        const colors = statusColors[item.status];
        const Icon = item.icon;

        return (
          <React.Fragment key={item.label}>
            <div className={cn("flex items-center gap-2 px-3 h-full shrink-0", colors.bg)}>
              <span
                className={cn("h-1.5 w-1.5 rounded-full shrink-0", colors.dot, {
                  "animate-ping-slow": item.status === "critical",
                })}
                aria-hidden="true"
              />
              <Icon className={cn("h-3 w-3", colors.text)} aria-hidden="true" />
              <span className="text-[10px] text-foreground-subtle whitespace-nowrap">{item.label}</span>
              <span className={cn("text-[10px] font-mono font-bold whitespace-nowrap", colors.text)}>
                {item.value}
              </span>
            </div>
            {idx < mockStatus.length - 1 && (
              <div className="h-3.5 w-px bg-border shrink-0" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}

      {/* Right-aligned operational indicator */}
      <div className="ml-auto flex items-center gap-2 px-3 shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-primary status-live" aria-hidden="true" />
        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
          LIVE
        </span>
      </div>
    </motion.div>
  );
}
