"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { cn } from "@/lib/utils";
import {
  Sliders,
  Play,
  TrendingUp,
  Brain,
  History,
  Activity,
  AlertTriangle,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
  Info,
  Users,
  ShieldAlert,
  ListTodo,
  Terminal,
  Gauge
} from "lucide-react";

interface PresetDetails {
  name: string;
  crowd: number;
  availability: number;
  incidentFreq: number;
  summary: string;
}

const PRESETS: Record<string, PresetDetails> = {
  "Crowd Surge": {
    name: "Crowd Surge",
    crowd: 95,
    availability: 85,
    incidentFreq: 18,
    summary: "Critical pilgrim influx detected near Sangam Ghat sectors. Crowd density exceeds threshold limits by 45%, placing extreme pressure on gate coordinators."
  },
  "Heatwave Emergency": {
    name: "Heatwave Emergency",
    crowd: 40,
    availability: 60,
    incidentFreq: 32,
    summary: "Severe temperature advisory. High dehydration reporting rate requires medical first-aiders to be deployed to water stations."
  },
  "Missing Child Event": {
    name: "Missing Child Event",
    crowd: 60,
    availability: 80,
    incidentFreq: 14,
    summary: "Child separation report triggers immediate search protocol. Language coordinators deployed to public address centers and exits."
  },
  "Medical Overflow": {
    name: "Medical Overflow",
    crowd: 70,
    availability: 65,
    incidentFreq: 40,
    summary: "Critical load on Sector medical tents. Reallocation vectors mapping additional first-aid certified volunteers to ghat transition channels."
  },
  "Volunteer Shortage": {
    name: "Volunteer Shortage",
    crowd: 50,
    availability: 42,
    incidentFreq: 10,
    summary: "Sudden shift absenteeism. Sector coverage drops below threshold safety margins, triggering automatic reserve dispatch allocations."
  },
  "VIP Visit": {
    name: "VIP Visit",
    crowd: 90,
    availability: 95,
    incidentFreq: 22,
    summary: "Security protocols active near central ghats. Flow controllers reallocated to bridge bypasses to maintain pilgrim transit speeds."
  }
};

export default function SimulatorPage() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  
  // What-If Parameters
  const [crowdVolume, setCrowdVolume] = useState(65);
  const [volunteerAvailability, setVolunteerAvailability] = useState(85);
  const [incidentFrequency, setIncidentFrequency] = useState(12);

  const [history, setHistory] = useState<any[]>([
    { id: "SIM-01", timestamp: "12:15 IST", type: "Standard Setup", crowd: 50, availability: 90, risk: 35 },
    { id: "SIM-02", timestamp: "14:40 IST", type: "Crowd Surge Sim", crowd: 85, availability: 80, risk: 78 }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [solverLogs, setSolverLogs] = useState<string[]>(["[SYSTEM] Sandbox initialized. Ready for parameter adjustments."]);

  // Load Preset
  const applyPreset = (name: string) => {
    setActivePreset(name);
    const preset = PRESETS[name];
    setCrowdVolume(preset.crowd);
    setVolunteerAvailability(preset.availability);
    setIncidentFrequency(preset.incidentFreq);
    
    // Add custom log
    logAction(`[PRESET] Loaded "${name}" config. Volume: ${preset.crowd}%, Availability: ${preset.availability}%.`);
  };

  const logAction = (msg: string) => {
    const timeStr = new Date().toLocaleTimeString("en-US", { hour12: false });
    setSolverLogs(prev => [`[${timeStr}] ${msg}`, ...prev].slice(0, 15));
  };

  // Dynamic Metrics Calculations
  const calculatedOutputs = useMemo(() => {
    const riskScore = Math.max(10, Math.min(100, Math.round((crowdVolume * 0.45) + (incidentFrequency * 1.5) - (volunteerAvailability * 0.2) + 20)));
    const staffingGap = Math.max(0, Math.round((crowdVolume * 0.8) - (volunteerAvailability * 0.7) + (incidentFrequency * 0.5)));
    const capacityUtilization = Math.max(10, Math.min(100, Math.round((crowdVolume * 0.55) + (incidentFrequency * 1.2) + 20)));
    const recommendedVolunteers = Math.round((crowdVolume * 0.6) + (incidentFrequency * 1.8));
    const readinessScore = Math.max(15, Math.min(100, 100 - riskScore + Math.round(volunteerAvailability * 0.15)));
    
    // AI Summary logic based on dynamic results
    let summaryText = "";
    if (activePreset && PRESETS[activePreset]) {
      summaryText = PRESETS[activePreset].summary;
    } else if (riskScore > 75) {
      summaryText = "Critical situation. The system predicts immediate sector bottlenecks. Staffing gap requires immediate rebalancing dispatches.";
    } else if (riskScore > 50) {
      summaryText = "Elevated risk parameters. Rebalancing reserve units to target sectors can stabilize operational capacity.";
    } else {
      summaryText = "Operational metrics are stable. Current volunteer allocations meet demand parameters comfortably.";
    }

    return {
      riskScore,
      staffingGap,
      capacityUtilization,
      recommendedVolunteers,
      readinessScore,
      summaryText
    };
  }, [crowdVolume, volunteerAvailability, incidentFrequency, activePreset]);

  // Log on slider modifications
  useEffect(() => {
    const timer = setTimeout(() => {
      logAction(`[SOLVER] Recalculating metrics. Crowd density factor set to ${crowdVolume}%.`);
    }, 400);
    return () => clearTimeout(timer);
  }, [crowdVolume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      logAction(`[SOLVER] Updating bounds. Volunteer active roster set to ${volunteerAvailability}%.`);
    }, 400);
    return () => clearTimeout(timer);
  }, [volunteerAvailability]);

  useEffect(() => {
    const timer = setTimeout(() => {
      logAction(`[SOLVER] Resolving safety targets. Incident rate set to ${incidentFrequency} alerts/hr.`);
    }, 400);
    return () => clearTimeout(timer);
  }, [incidentFrequency]);

  const runSimulation = () => {
    setIsRunning(true);
    logAction(`[EXECUTE] Running full network stress solvers...`);
    setTimeout(() => {
      setIsRunning(false);
      const newSim = {
        id: `SIM-${Math.floor(Math.random() * 900) + 100}`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }) + " IST",
        type: activePreset ? `${activePreset} Preset` : "Custom What-If Run",
        crowd: crowdVolume,
        availability: volunteerAvailability,
        risk: calculatedOutputs.riskScore
      };
      setHistory(prev => [newSim, ...prev]);
      logAction(`[SUCCESS] Simulation run logged successfully. Output risk score evaluated at ${calculatedOutputs.riskScore}%.`);
    }, 1000);
  };

  // Sector shortage breakdown list
  const resourceShortages = useMemo(() => {
    const baseGap = calculatedOutputs.staffingGap;
    if (baseGap === 0) return [];
    return [
      { sector: "Sangam Ghat (S-01)", gap: Math.round(baseGap * 0.45), status: "Critical" },
      { sector: "Triveni Point (S-02)", gap: Math.round(baseGap * 0.35), status: "High" },
      { sector: "Akshayvat (S-08)", gap: Math.round(baseGap * 0.20), status: "Medium" }
    ].filter(s => s.gap > 0);
  }, [calculatedOutputs.staffingGap]);

  // Detailed operational impact parameters
  const operationalImpacts = useMemo(() => {
    const crowdFactor = crowdVolume / 100;
    const staffFactor = volunteerAvailability / 100;
    const waitTime = Math.round(5 + (crowdFactor * 25) - (staffFactor * 10));
    const fatigueIndex = Math.round(40 + (crowdFactor * 40) - (staffFactor * 15));
    const transitDelay = Math.round(2 + (crowdFactor * 15) - (staffFactor * 5));

    return {
      waitTime: Math.max(2, waitTime),
      fatigueIndex: Math.max(10, Math.min(100, fatigueIndex)),
      transitDelay: Math.max(1, transitDelay)
    };
  }, [crowdVolume, volunteerAvailability]);

  return (
    <AppShell pageTitle="Scenario Stress Simulator">
      <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sliders className="h-6 w-6 text-primary animate-pulse" /> Scenario Stress Simulator
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Flagship Operations sandbox: stress-test volunteer allocation models, identify real-time gaps, and run constraint solvers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-subtle font-mono">Sim status:</span>
            <span className="text-xs font-mono font-bold text-success px-2 py-0.5 rounded bg-success/10 border border-success/20 flex items-center gap-1.5 animate-pulse">
              <Activity className="h-3 w-3 text-success" /> Solver Stream Active
            </span>
          </div>
        </div>

        {/* Dynamic Preset Cards Panel */}
        <section aria-label="Scenario Presets">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {Object.keys(PRESETS).map((pName) => {
              const isActive = activePreset === pName;
              return (
                <button
                  key={pName}
                  onClick={() => applyPreset(pName)}
                  className={cn(
                    "p-3.5 rounded-lg border text-left transition-all relative overflow-hidden group cursor-pointer",
                    isActive
                      ? "bg-primary/15 border-primary ring-1 ring-primary/30 shadow-glow"
                      : "bg-card border-border/60 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={cn("text-[9px] font-bold tracking-wider uppercase", isActive ? "text-primary" : "text-foreground-subtle")}>PRESET SCENARIO</span>
                    <Sparkles className={cn("h-3.5 w-3.5", isActive ? "text-primary animate-spin-slow" : "text-foreground-subtle")} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground truncate">{pName}</h4>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2 Column Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: WHAT-IF INPUTS & CONSOLE STREAM (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-5">
            {/* Inputs Box */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-5">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
                <Sliders className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">What-If Forecasting Inputs</h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Crowd volume slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-foreground-subtle">Crowd Volume Surge</span>
                    <span className="text-primary font-bold">+{crowdVolume}% Load</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={crowdVolume}
                    onChange={(e) => {
                      setCrowdVolume(parseInt(e.target.value));
                      setActivePreset(null);
                    }}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Volunteer availability slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-foreground-subtle">Volunteer Availability</span>
                    <span className="text-success font-bold">{volunteerAvailability}% Active</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={volunteerAvailability}
                    onChange={(e) => {
                      setVolunteerAvailability(parseInt(e.target.value));
                      setActivePreset(null);
                    }}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-success"
                  />
                </div>

                {/* Incident frequency slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-foreground-subtle">Incident Frequency</span>
                    <span className="text-danger font-bold">{incidentFrequency} Alerts / Hr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={incidentFrequency}
                    onChange={(e) => {
                      setIncidentFrequency(parseInt(e.target.value));
                      setActivePreset(null);
                    }}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-danger"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="w-full py-2.5 px-4 rounded bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-elevated flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running Stress Simulations..." : "COMMIT SIMULATION RUN"}
                </button>
              </div>
            </div>

            {/* LIVE CONSOLE SOLVER LOGS */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-border/40 pb-2.5">
                <Terminal className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Mathematical Solver Stream</h3>
              </div>
              
              <div className="h-32 bg-black/40 rounded border border-border/40 p-2.5 font-mono text-[9px] text-primary space-y-1.5 overflow-y-auto pr-1">
                {solverLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed whitespace-pre-wrap opacity-90">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: DYNAMIC RESULTS PANEL (xl:col-span-8) */}
          <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Result Block: Metrics & Visual Trend Chart */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-lg border border-border bg-card p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Interactive Outflow Predictions</h4>
                  <span className="text-[10px] text-foreground-subtle font-mono">Real-time Forecasts</span>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    { label: "Predicted Risk Index", value: `${calculatedOutputs.riskScore}%`, color: calculatedOutputs.riskScore > 70 ? "text-danger" : calculatedOutputs.riskScore > 45 ? "text-warning" : "text-success", sub: "Safety failure likelihood" },
                    { label: "Target Staffing Gap", value: `-${calculatedOutputs.staffingGap} Vol`, color: calculatedOutputs.staffingGap > 40 ? "text-danger" : "text-warning", sub: "Required coordinators" },
                    { label: "Capacity Utilization", value: `${calculatedOutputs.capacityUtilization}%`, color: "text-primary", sub: "Active roster match rate" },
                    { label: "Recommended Count", value: `+${calculatedOutputs.recommendedVolunteers} Staff`, color: "text-success", sub: "Optimal reserve coverage" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-3 bg-background-secondary/40 rounded-md border border-border/50 transition-all duration-200">
                      <span className="text-[10px] text-foreground-subtle block font-semibold">{stat.label}</span>
                      <motion.span 
                        key={stat.value}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn("text-xl font-bold font-mono block mt-1", stat.color)}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-[9px] text-foreground-subtle block mt-0.5">{stat.sub}</span>
                    </div>
                  ))}
                </div>

                {/* AI Executive Summary Block with typewriter feel */}
                <div className="rounded p-4 bg-gradient-to-br from-primary/10 via-card to-background border border-primary/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Brain className="h-4.5 w-4.5 text-primary" />
                    <span>Executive AI Summary:</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={calculatedOutputs.summaryText}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-foreground-muted leading-relaxed font-mono"
                    >
                      {calculatedOutputs.summaryText}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* What-If Forecasting Visual Trend Chart */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-foreground-subtle mb-3">
                    <span className="uppercase font-bold text-foreground">Capacity Forecast Trend (8-Hour Horizon)</span>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-danger" /> Crowd Load</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Staffing</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Risk</span>
                    </div>
                  </div>
                  
                  <div className="h-32 w-full bg-background rounded border border-border/50 relative p-2 overflow-hidden flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
                      
                      {/* Dynamic SVG paths reacting instantly */}
                      <path
                        d={(() => {
                          const width = 300;
                          const height = 100;
                          const points = [];
                          for (let i = 0; i <= 8; i++) {
                            const factor = Math.sin(i / 1.5);
                            const crowd = Math.max(10, Math.min(200, crowdVolume + factor * 15));
                            points.push(crowd);
                          }
                          const step = width / 8;
                          return points.map((val, idx) => {
                            const x = idx * step;
                            const y = height - 10 - ((val / 200) * (height - 20));
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ');
                        })()}
                        fill="none"
                        stroke="var(--danger)"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      <path
                        d={(() => {
                          const width = 300;
                          const height = 100;
                          const points = [];
                          for (let i = 0; i <= 8; i++) {
                            const factor = Math.sin(i / 1.5);
                            const staff = Math.max(10, Math.min(100, volunteerAvailability - factor * 8));
                            points.push(staff);
                          }
                          const step = width / 8;
                          return points.map((val, idx) => {
                            const x = idx * step;
                            const y = height - 10 - ((val / 100) * (height - 20));
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ');
                        })()}
                        fill="none"
                        stroke="var(--success)"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      <path
                        d={(() => {
                          const width = 300;
                          const height = 100;
                          const points = [];
                          for (let i = 0; i <= 8; i++) {
                            const factor = Math.sin(i / 1.5);
                            const crowd = Math.max(10, Math.min(200, crowdVolume + factor * 15));
                            const staff = Math.max(10, Math.min(100, volunteerAvailability - factor * 8));
                            const risk = Math.max(10, Math.min(100, Math.round((crowd * 0.45) + (incidentFrequency * 1.5) - (staff * 0.2) + 20)));
                            points.push(risk);
                          }
                          const step = width / 8;
                          return points.map((val, idx) => {
                            const x = idx * step;
                            const y = height - 10 - ((val / 100) * (height - 20));
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ');
                        })()}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Result Block: Gauges, Projections, and History */}
            <div className="lg:col-span-5 space-y-4">
              {/* Gauges Side-by-Side Card */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground border-b border-border/40 pb-2">Readiness Impact Gauges</h4>
                
                <div className="flex items-center justify-around py-2">
                  {/* Gauge 1: Before */}
                  <div className="text-center space-y-2">
                    <span className="text-[9px] text-foreground-subtle font-mono block">BEFORE (CURRENT)</span>
                    <div className="relative h-24 w-24">
                      <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                        <path className="text-border" strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-success" strokeDasharray="87, 100" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-sm font-bold font-mono text-foreground">87%</span>
                        <span className="text-[7px] text-success font-semibold tracking-wider font-mono">HEALTHY</span>
                      </div>
                    </div>
                  </div>

                  {/* Gauge 2: After */}
                  <div className="text-center space-y-2">
                    <span className="text-[9px] text-foreground-subtle font-mono block">AFTER (SIMULATED)</span>
                    <div className="relative h-24 w-24">
                      <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                        <path className="text-border" strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path 
                          className={cn(
                            "transition-all duration-500",
                            calculatedOutputs.readinessScore > 75 ? "text-success" : calculatedOutputs.readinessScore > 45 ? "text-warning" : "text-danger"
                          )} 
                          strokeDasharray={`${calculatedOutputs.readinessScore}, 100`} 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <motion.span 
                          key={calculatedOutputs.readinessScore}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="text-sm font-bold font-mono text-foreground"
                        >
                          {calculatedOutputs.readinessScore}%
                        </motion.span>
                        <span className={cn(
                          "text-[7px] font-semibold tracking-wider font-mono uppercase",
                          calculatedOutputs.readinessScore > 75 ? "text-success" : calculatedOutputs.readinessScore > 45 ? "text-warning" : "text-danger"
                        )}>
                          {calculatedOutputs.readinessScore > 75 ? "STABLE" : calculatedOutputs.readinessScore > 45 ? "WARNING" : "CRITICAL"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Shortage Projections */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground border-b border-border/40 pb-2">
                  <ShieldAlert className="h-4.5 w-4.5 text-primary" />
                  <span>Projected Resource Shortages</span>
                </div>
                
                {resourceShortages.length === 0 ? (
                  <div className="text-[11px] text-foreground-subtle font-mono italic p-2 rounded bg-background-secondary/35 text-center">
                    No resource shortages projected for current active bounds.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {resourceShortages.map((res, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded bg-background-secondary border border-border/40 text-xs font-mono">
                        <span className="text-foreground">{res.sector}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold",
                          res.status === "Critical" ? "bg-danger/10 text-danger" : res.status === "High" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                        )}>
                          -{res.gap} Staff ({res.status})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Operational Impact Cards (Queue Congestion, response transit time) */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground border-b border-border/40 pb-2">
                  <Clock className="h-4.5 w-4.5 text-primary" />
                  <span>Operational Impact Details</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-background-secondary/40 border border-border/40 text-center font-mono">
                    <span className="text-[8px] text-foreground-subtle block">QUEUE WAIT</span>
                    <span className="text-xs font-bold text-foreground block mt-1">{operationalImpacts.waitTime} mins</span>
                  </div>
                  <div className="p-2.5 rounded bg-background-secondary/40 border border-border/40 text-center font-mono">
                    <span className="text-[8px] text-foreground-subtle block">FATIGUE INDEX</span>
                    <span className={cn(
                      "text-xs font-bold block mt-1",
                      operationalImpacts.fatigueIndex > 70 ? "text-danger" : "text-success"
                    )}>{operationalImpacts.fatigueIndex}/100</span>
                  </div>
                  <div className="p-2.5 rounded bg-background-secondary/40 border border-border/40 text-center font-mono">
                    <span className="text-[8px] text-foreground-subtle block">TRANSIT DELAY</span>
                    <span className="text-xs font-bold text-foreground block mt-1">+{operationalImpacts.transitDelay} mins</span>
                  </div>
                </div>
              </div>

              {/* Simulation History logs */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <History className="h-4.5 w-4.5 text-primary" />
                  <span>Simulation Runs History Ledger</span>
                </div>
                
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                  {history.map((sim, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded bg-background-secondary text-xs border border-border/40 font-mono">
                      <div>
                        <span className="font-semibold text-foreground block">{sim.type}</span>
                        <span className="text-[9px] text-foreground-subtle">Crowd: +{sim.crowd}% | Availability: {sim.availability}%</span>
                      </div>
                      <div className="text-right text-danger font-semibold">
                        <span>{sim.risk}% Risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}
