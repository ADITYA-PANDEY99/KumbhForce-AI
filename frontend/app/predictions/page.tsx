"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { sectorForecasts, predictiveAlerts } from "@/lib/mock-predictions";
import { fetchPredictions, PredictionsData } from "@/lib/api";
import {
  TrendingUp,
  Brain,
  Sliders,
  Shield,
  Activity,
  AlertTriangle,
  Zap,
  Clock,
  Compass,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function PredictionsPage() {
  const [timeframe, setTimeframe] = useState<"1h" | "3h" | "6h" | "12h">("1h");

  // central integration states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [predictionsData, setPredictionsData] = useState<PredictionsData | null>(null);
  const [syncTimestamp, setSyncTimestamp] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await fetchPredictions();
      setPredictionsData(result.data);
      setSyncTimestamp(new Date(result.data.generatedAt || Date.now()).toLocaleTimeString());
      setIsFallback(result.isFallback);
    } catch (err) {
      setIsError(true);
      setIsFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeForecasts = useMemo(() => {
    const forecasts = predictionsData?.sectorForecasts || sectorForecasts;
    return forecasts[timeframe] || forecasts["1h"];
  }, [predictionsData, timeframe]);

  const activeAlerts = useMemo(() => {
    return predictionsData?.predictiveAlerts || predictiveAlerts;
  }, [predictionsData]);

  // Compute totals
  const totals = useMemo(() => {
    const totalCapacity = 487;
    let expectedDemand = 0;
    let totalGap = 0;
    let avgConfidence = 0;

    activeForecasts.forEach(f => {
      expectedDemand += f.requiredVolunteers;
      totalGap += f.volunteerGap;
      avgConfidence += f.confidence;
    });

    return {
      capacity: totalCapacity,
      demand: expectedDemand,
      gap: totalGap,
      confidence: activeForecasts.length > 0 ? Math.round(avgConfidence / activeForecasts.length) : 0
    };
  }, [activeForecasts]);

  // Dynamic AI Briefing builder
  const aiBriefingText = useMemo(() => {
    const criticalZones = activeForecasts.filter(f => f.riskLevel === "Critical" || f.riskLevel === "High");
    if (criticalZones.length > 0) {
      const zoneNames = criticalZones.map(z => z.sectorName).join(" & ");
      const gapTotal = criticalZones.reduce((acc, curr) => acc + curr.volunteerGap, 0);
      return `AI Forecasting algorithms project elevated staffing strains for ${zoneNames} within the ${timeframe} timeline due to incoming pilgrim waves. A deployment deficit of ${gapTotal} personnel is detected. Immediate execution of the rebalancing protocol is recommended to prevent SLA bottlenecks.`;
    }
    return `Operations capacity remains stable within the targeted timeframe. Standard monitoring queues are advised.`;
  }, [activeForecasts, timeframe]);

  if (isLoading) {
    return (
      <AppShell pageTitle="Predictive Staffing Engine">
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-pulse">
          <div className="h-10 bg-border/60 rounded w-1/4" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-card border border-border/50 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 h-96 bg-card border border-border/50 rounded-lg animate-pulse" />
            <div className="xl:col-span-4 h-96 bg-card border border-border/50 rounded-lg animate-pulse" />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell pageTitle="Predictive Staffing Engine">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" /> Predictive Staffing Engine
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-foreground-muted">
                Anticipate pilgrim volumes, model crowd density changes, and deploy volunteers proactively before bottlenecks arise.
              </p>
              {syncTimestamp && (
                <span className="text-[10px] font-mono bg-success/10 text-success border border-success/30 px-2.5 py-0.5 rounded-full">
                  Synced: {syncTimestamp}
                </span>
              )}
              {isFallback && (
                <button
                  onClick={loadData}
                  className="text-[10px] font-mono bg-warning/20 text-warning hover:bg-warning/30 border border-warning/30 px-2 py-0.5 rounded-full cursor-pointer transition-all"
                >
                  ⚠️ Offline (Click to Retry Sync)
                </button>
              )}
            </div>
          </div>

          {/* Timeframe selector slider tabs */}
          <div className="flex border border-border rounded-lg bg-background-secondary p-1 shrink-0 self-start">
            {(["1h", "3h", "6h", "12h"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer ${timeframe === t ? "bg-primary text-white shadow-elevated" : "text-foreground-muted hover:text-foreground"}`}
              >
                {t} Forecast
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: STAFFING OVERVIEW INSIGHTS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Current Capacity", value: totals.capacity, sub: "Duty volunteers", icon: Activity, color: "text-primary" },
            { label: "Forecast Demand", value: totals.demand, sub: "Required field posts", icon: Compass, color: "text-primary" },
            { label: "Predicted Shortages", value: totals.gap, sub: "Deficit personnel", icon: AlertTriangle, color: totals.gap > 0 ? "text-danger" : "text-success" },
            { label: "AI Forecast Confidence", value: `${totals.confidence}%`, sub: "Confidence threshold", icon: Brain, color: "text-success" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-lg bg-card border border-border p-4 flex items-center justify-between card-interactive">
                <div>
                  <span className="text-[10px] text-foreground-subtle uppercase block font-semibold">{item.label}</span>
                  <span className={`text-xl font-bold font-mono ${item.color} block mt-1`}>{item.value}</span>
                  <span className="text-[9px] text-foreground-subtle block mt-0.5">{item.sub}</span>
                </div>
                <div className="h-8 w-8 rounded-md bg-background-secondary flex items-center justify-center">
                  <Icon className={`h-4.5 w-4.5 ${item.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Column Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Sector Forecast Matrix (xl:col-span-8) */}
          <div className="xl:col-span-8 space-y-4">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
                <span>SECTOR FORECAST WORKFORCE GRID ({timeframe.toUpperCase()})</span>
                <span>TELEMETRY UPDATED JUST NOW</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/60 bg-background-secondary/20 text-foreground-subtle uppercase text-[9px] font-mono">
                      <th className="p-3">Sector</th>
                      <th className="p-3 text-center">Current Crowd</th>
                      <th className="p-3 text-center">Expected Crowd</th>
                      <th className="p-3 text-center">Current Vols</th>
                      <th className="p-3 text-center">Required Vols</th>
                      <th className="p-3 text-center">Risk Level</th>
                      <th className="p-3 text-center">Gap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {activeForecasts.map((f, idx) => (
                      <tr key={idx} className="hover:bg-background-secondary/50 transition-colors">
                        <td className="p-3 font-semibold text-foreground flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-primary" /> {f.sectorName}
                        </td>
                        <td className="p-3 text-center font-mono text-foreground-muted">{f.currentCrowd}</td>
                        <td className="p-3 text-center font-mono text-foreground font-semibold">
                          {f.expectedCrowd} <span className="text-[9px] text-danger">({f.trend === "rising" ? "↑" : "→"})</span>
                        </td>
                        <td className="p-3 text-center font-mono">{f.currentVolunteers}</td>
                        <td className="p-3 text-center font-mono">{f.requiredVolunteers}</td>
                        <td className="p-3 text-center">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            f.riskLevel === "Critical" ? "bg-danger/10 text-danger border border-danger/20" :
                            f.riskLevel === "High" ? "bg-danger/10 text-danger border border-danger/10" :
                            f.riskLevel === "Medium" ? "bg-warning/10 text-warning border border-warning/20" :
                            "bg-success/10 text-success border border-success/20"
                          }`}>
                            {f.riskLevel}
                          </span>
                        </td>
                        <td className={`p-3 text-center font-mono font-bold ${f.volunteerGap > 0 ? "text-danger" : "text-success"}`}>
                          {f.volunteerGap > 0 ? `-${f.volunteerGap}` : "OK"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI BRIEFING AREA */}
            <div className="rounded-lg p-5 bg-gradient-to-br from-accent/15 via-card to-background border border-accent/40 shadow-glow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-4.5 w-4.5 text-accent animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">AI Executive Briefing</h3>
                </div>
                <span className="text-[9px] text-foreground-subtle font-mono">GEN-AI REPORT v1.2</span>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {aiBriefingText}
              </p>
              
              {activeForecasts.some(f => f.volunteerGap > 0) && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 text-[10px] text-foreground-muted font-mono">
                  <span className="font-semibold text-foreground uppercase">RECOMMENDED:</span>
                  <span>Redeploy volunteers immediately</span>
                  <span>•</span>
                  <span>Increase gate monitoring</span>
                  <span>•</span>
                  <span>Activate Sector Reserve pools</span>
                </div>
              )}
            </div>

          </div>

          {/* ALERT CENTER (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-4">
            
            <SectionHeader
              title="Operational Alert Inbox"
              subtitle="Forecast violations flagged"
              action={
                <span className="text-[10px] font-mono text-danger bg-danger/10 border border-danger/25 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> AI Audited
                </span>
              }
            />

            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border p-4 space-y-2 relative overflow-hidden bg-card ${
                    alert.severity === "danger" ? "border-danger/35 bg-danger/5" :
                    alert.severity === "warning" ? "border-warning/35 bg-warning/5" :
                    "border-border bg-card"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className={`uppercase font-bold ${
                      alert.severity === "danger" ? "text-danger" :
                      alert.severity === "warning" ? "text-warning" :
                      "text-foreground-subtle"
                    }`}>{alert.type} Warning</span>
                    <span className="text-foreground-subtle">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-foreground font-semibold">{alert.message}</p>
                </div>
              ))}
            </div>

            {/* PREDICTIVE INSIGHTS CHART SKELETON */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Capacity Gap Forecast Trends</h4>
              
              <div className="h-24 flex items-end gap-3 pt-4 border-b border-border/60 px-2">
                {[
                  { label: "1h", val: 22, color: "bg-warning" },
                  { label: "3h", val: 38, color: "bg-danger" },
                  { label: "6h", val: 58, color: "bg-danger" },
                  { label: "12h", val: 24, color: "bg-warning" }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[9px] font-mono text-foreground-subtle">-{item.val}</span>
                    <div className={`w-full rounded-t ${item.color}`} style={{ height: `${(item.val / 60) * 100}%` }} />
                    <span className="text-[9px] font-mono text-foreground-subtle mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-[9px] text-foreground-subtle pt-1 font-mono">
                <span>Peak Gap Expected: 6h</span>
                <span>Average Confidence: 87%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2">
      <div>
        <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">{title}</h2>
        {subtitle && <p className="text-xs text-foreground-muted mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

