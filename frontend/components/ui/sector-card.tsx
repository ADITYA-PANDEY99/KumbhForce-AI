"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, MapPin } from "lucide-react";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

interface SectorCardProps {
  sectorId: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  staffCount: number;
  riskLevel: RiskLevel;
  readinessScore: number;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}

const riskConfig: Record<RiskLevel, { color: string; bg: string; border: string; glow: string }> = {
  Low:      { color: "text-success",   bg: "bg-success/10",   border: "border-success/30",  glow: "" },
  Medium:   { color: "text-warning",   bg: "bg-warning/10",   border: "border-warning/30",  glow: "glow-warning" },
  High:     { color: "text-danger",    bg: "bg-danger/10",    border: "border-danger/30",   glow: "glow-danger" },
  Critical: { color: "text-danger",    bg: "bg-danger/15",    border: "border-danger/50",   glow: "glow-danger" },
};

export function SectorCard({
  sectorId,
  name,
  capacity,
  currentOccupancy,
  staffCount,
  riskLevel,
  readinessScore,
  className,
  onClick,
  tooltip,
}: SectorCardProps) {
  const risk = riskConfig[riskLevel];
  const occupancyPct = Math.min(100, Math.round((currentOccupancy / capacity) * 100));
  const occupancyColor =
    occupancyPct > 90 ? "bg-danger" : occupancyPct > 70 ? "bg-warning" : "bg-primary";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      title={tooltip}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "card-interactive rounded-lg p-4 relative overflow-hidden",
        risk.glow,
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Risk-level top stripe */}
      <div
        className={cn("absolute top-0 left-0 right-0 h-0.5", {
          "bg-success": riskLevel === "Low",
          "bg-warning": riskLevel === "Medium",
          "bg-danger":  riskLevel === "High" || riskLevel === "Critical",
        })}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between mt-1 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-foreground-muted shrink-0" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-foreground">{name}</p>
            <p className="text-[10px] text-foreground-subtle font-mono">{sectorId}</p>
          </div>
        </div>
        <span className={cn("text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border", risk.bg, risk.border, risk.color)}>
          {riskLevel}
        </span>
      </div>

      {/* Occupancy bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-foreground-subtle">Occupancy</span>
          <span className="text-[10px] font-mono font-bold text-foreground">
            {currentOccupancy.toLocaleString()} / {capacity.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden" role="progressbar" aria-valuenow={occupancyPct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className={cn("h-full rounded-full", occupancyColor)}
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPct}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-foreground-muted">
          <Users className="h-3 w-3" aria-hidden="true" />
          <span>{staffCount} Staff</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-foreground-subtle">Readiness</span>
          <span className="text-[10px] font-mono font-bold text-primary">{readinessScore}%</span>
        </div>
      </div>
    </motion.div>
  );
}
