"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Users, Activity } from "lucide-react";

type SectorRisk = "Low" | "Medium" | "High" | "Critical";

interface TwinSector {
  id: string;
  name: string;
  risk: SectorRisk;
  readiness: number;
  occupancy: number;
  capacity: number;
  staff: number;
}

const mockSectors: TwinSector[] = [
  { id: "S-01", name: "Sangam Ghat",    risk: "High",     readiness: 72,  occupancy: 18500, capacity: 20000, staff: 142 },
  { id: "S-02", name: "Triveni Point",  risk: "Critical", readiness: 51,  occupancy: 9800,  capacity: 10000, staff: 98 },
  { id: "S-03", name: "Ram Ghat",       risk: "Medium",   readiness: 85,  occupancy: 6200,  capacity: 8000,  staff: 76 },
  { id: "S-04", name: "Dasashwamedh",   risk: "Low",      readiness: 96,  occupancy: 3100,  capacity: 6000,  staff: 54 },
  { id: "S-05", name: "Naini Bridge",   risk: "Low",      readiness: 98,  occupancy: 1200,  capacity: 4000,  staff: 38 },
  { id: "S-06", name: "Prayag Station", risk: "Medium",   readiness: 88,  occupancy: 5400,  capacity: 7000,  staff: 67 },
  { id: "S-07", name: "Kali Ghat",      risk: "Low",      readiness: 94,  occupancy: 2800,  capacity: 5000,  staff: 45 },
  { id: "S-08", name: "Akshayvat",      risk: "High",     readiness: 68,  occupancy: 7600,  capacity: 8500,  staff: 82 },
  { id: "S-09", name: "Alopi Bagh",     risk: "Low",      readiness: 91,  occupancy: 1500,  capacity: 3000,  staff: 29 },
  { id: "S-10", name: "Naini Ghat",     risk: "Medium",   readiness: 80,  occupancy: 4200,  capacity: 5500,  staff: 58 },
  { id: "S-11", name: "Jhunsi Bridge",  risk: "Low",      readiness: 99,  occupancy: 900,   capacity: 3000,  staff: 22 },
  { id: "S-12", name: "Phaphamau",      risk: "Medium",   readiness: 83,  occupancy: 3800,  capacity: 5000,  staff: 51 },
];

const riskColors: Record<SectorRisk, { bg: string; border: string; text: string; pulse: string }> = {
  Low:      { bg: "bg-success/10",  border: "border-success/30",  text: "text-success",  pulse: "" },
  Medium:   { bg: "bg-warning/10",  border: "border-warning/30",  text: "text-warning",  pulse: "" },
  High:     { bg: "bg-danger/10",   border: "border-danger/35",   text: "text-danger",   pulse: "animate-pulse" },
  Critical: { bg: "bg-danger/15",   border: "border-danger/60",   text: "text-danger",   pulse: "animate-pulse" },
};

export interface DigitalCommandTwinProps {
  className?: string;
  isDemoMode?: boolean;
}

export function DigitalCommandTwin({ className, isDemoMode }: DigitalCommandTwinProps) {
  const summary = {
    total: mockSectors.length,
    critical: mockSectors.filter((s) => s.risk === "Critical").length + (isDemoMode ? 1 : 0),
    high: mockSectors.filter((s) => s.risk === "High").length,
    healthy: mockSectors.filter((s) => s.risk === "Low").length - (isDemoMode ? 1 : 0),
    avgReadiness: isDemoMode 
      ? Math.round(mockSectors.reduce((a, s) => a + s.readiness, 0) / mockSectors.length) - 4
      : Math.round(mockSectors.reduce((a, s) => a + s.readiness, 0) / mockSectors.length),
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Sectors",    value: summary.total,       color: "text-foreground" },
          { label: "Critical",         value: summary.critical,    color: "text-danger" },
          { label: "High Risk",        value: summary.high,        color: "text-warning" },
          { label: "Avg Readiness",    value: `${summary.avgReadiness}%`, color: "text-primary" },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-md bg-background-secondary border border-border p-3 text-center transition-all",
              isDemoMode && s.color === "text-danger" ? "border-danger bg-danger/5 shadow-glow-danger" : ""
            )}
          >
            <p className={cn("text-xl font-bold font-mono", s.color)}>{s.value}</p>
            <p className="text-[10px] text-foreground-subtle mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Sector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {mockSectors.map((sector, idx) => {
          const isCriticalDemo = isDemoMode && (sector.id === "S-01" || sector.id === "S-02" || sector.id === "S-08");
          const risk = riskColors[sector.risk];
          const currentRisk = isCriticalDemo ? "Critical" : sector.risk;
          const currentRiskColor = riskColors[currentRisk];
          const occupancyPct = Math.round((sector.occupancy / sector.capacity) * 100);
          const currentReadiness = isCriticalDemo ? Math.max(35, sector.readiness - 15) : sector.readiness;

          return (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03, duration: 0.22 }}
              whileHover={{ y: -2, boxShadow: "var(--shadow-glow)" }}
              className={cn(
                "relative rounded-lg border p-3 cursor-pointer transition-all duration-200",
                currentRiskColor.bg,
                isCriticalDemo ? "border-danger ring-1 ring-danger/40 shadow-glow-danger bg-danger/10" : currentRiskColor.border
              )}
              title={`${sector.name} — Click to view sector details`}
              role="button"
              tabIndex={0}
            >
              {/* Sector ID badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-foreground-subtle">{sector.id}</span>
                <span className={cn("text-[9px] font-mono font-bold uppercase px-1 rounded", currentRiskColor.text, currentRiskColor.pulse || isCriticalDemo ? "animate-pulse" : "")}>
                  {currentRisk}
                </span>
              </div>

              <p className="text-xs font-semibold text-foreground leading-tight mb-2">{sector.name}</p>

              {/* Readiness indicator */}
              <div className="mb-2">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[9px] text-foreground-subtle">Readiness</span>
                  <span className={cn("text-[9px] font-mono font-bold", currentRiskColor.text)}>{currentReadiness}%</span>
                </div>
                <div className="h-1 rounded-full bg-background overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", {
                      "bg-success": currentRisk === "Low",
                      "bg-warning": currentRisk === "Medium",
                      "bg-danger": currentRisk === "High" || currentRisk === "Critical",
                    })}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentReadiness}%` }}
                    transition={{ delay: idx * 0.03 + 0.2, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Footer stats */}
              <div className="flex items-center justify-between text-[9px] text-foreground-subtle">
                <div className="flex items-center gap-1">
                  <Activity className="h-2.5 w-2.5" aria-hidden="true" />
                  <span>{occupancyPct}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" aria-hidden="true" />
                  <span>{sector.staff + (isCriticalDemo ? 12 : 0)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-foreground-subtle pt-1">
        <Shield className="h-3 w-3" aria-hidden="true" />
        <span>Digital Command Twin — Sector Intelligence Grid</span>
        <div className="flex items-center gap-3 ml-auto">
          {(["Low", "Medium", "High", "Critical"] as SectorRisk[]).map((r) => (
            <div key={r} className="flex items-center gap-1">
              <span className={cn("h-2 w-2 rounded-sm", riskColors[r].bg, "border", riskColors[r].border)} aria-hidden="true" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
