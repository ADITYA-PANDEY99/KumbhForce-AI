"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { cn } from "@/lib/utils";
import { mockExecReports, ExecutiveReport } from "@/lib/mock-simulator";
import { FloatingPanel } from "@/components/ui/floating-panel";
import {
  FileText,
  Download,
  Share2,
  Printer,
  CheckCircle,
  TrendingUp,
  Brain,
  Shield,
  Activity,
  AlertTriangle,
  History,
  Zap,
  ArrowUpRight,
  Gauge
} from "lucide-react";

export default function BriefingsPage() {
  const [selectedBriefType, setSelectedBriefType] = useState("Daily Operations Brief");
  const [reports, setReports] = useState<ExecutiveReport[]>(mockExecReports);
  const [isExporting, setIsExporting] = useState(false);
  const [exportTarget, setExportTarget] = useState("");

  const activeReport = reports.find(r => r.type === selectedBriefType) || reports[0];

  const handleExport = (format: string) => {
    setExportTarget(format);
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 1200);
  };

  // Executive Impact Dashboard mock metrics (Before vs After optimization)
  const impactMetrics = [
    {
      name: "Volunteer Utilization",
      before: "62%",
      after: "94%",
      delta: "+32%",
      gain: "optimal active placement",
      type: "success"
    },
    {
      name: "Avg Deployment Time",
      before: "14.5m",
      after: "6.2m",
      delta: "-57.2%",
      gain: "faster responder arrivals",
      type: "success"
    },
    {
      name: "Incident Response Imp.",
      before: "Base",
      after: "+38.4%",
      delta: "38% SLA",
      gain: "critical emergency speedup",
      type: "primary"
    },
    {
      name: "Workforce Efficiency Gain",
      before: "Base",
      after: "+31.4%",
      delta: "31% network",
      gain: "reassignment cost reduction",
      type: "primary"
    },
    {
      name: "Coverage Score",
      before: "71%",
      after: "95%",
      delta: "+24%",
      gain: "closed sector vulnerabilities",
      type: "success"
    },
    {
      name: "Risk Reduction Score",
      before: "Base",
      after: "88%",
      delta: "46% drop",
      gain: "prevented crowd bottlenecks",
      type: "warning"
    }
  ];

  return (
    <AppShell pageTitle="Executive Briefing Center">
      <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Executive Briefing Center
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Analyze organizational performance metrics and download PDF briefings for command officers.
            </p>
          </div>

          {/* Export buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport("PDF")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border hover:bg-background-secondary text-xs font-semibold text-foreground transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button
              onClick={() => handleExport("Print View")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border hover:bg-background-secondary text-xs font-semibold text-foreground transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" /> Print View
            </button>
            <button
              onClick={() => handleExport("Link Share")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border hover:bg-background-secondary text-xs font-semibold text-foreground transition-all cursor-pointer"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* EXECUTIVE IMPACT DASHBOARD SECTION */}
        <section className="space-y-4" aria-label="Executive Impact Dashboard">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <Gauge className="h-5 w-5 text-primary animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Executive Operations Impact Dashboard</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {impactMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between shadow-glow-sm"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-foreground-subtle uppercase tracking-wider block font-bold leading-tight truncate" title={metric.name}>
                    {metric.name}
                  </span>
                  
                  {/* Before vs After comparison block */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[10px] text-foreground-subtle font-mono line-through">
                      {metric.before}
                    </span>
                    <span className="text-xl font-bold font-mono text-foreground">
                      {metric.after}
                    </span>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-border/40 flex justify-between items-center">
                  <span className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
                    metric.type === "success" ? "bg-success/15 text-success" :
                    metric.type === "warning" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
                  )}>
                    <ArrowUpRight className="h-3 w-3" /> {metric.delta}
                  </span>
                  <span className="text-[8px] text-foreground-subtle text-right leading-tight max-w-[70px] truncate" title={metric.gain}>
                    {metric.gain}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2 Column Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Executive Dashboard & Report details (xl:col-span-8) */}
          <div className="xl:col-span-8 space-y-4">
            
            {/* Brief types tab selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-background-secondary rounded-lg border border-border">
              {[
                "Daily Operations Brief",
                "Incident Summary Brief",
                "Workforce Readiness Brief",
                "Risk Assessment Brief"
              ].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedBriefType(type)}
                  className={`py-2 px-3 rounded text-center text-xs font-semibold transition-all cursor-pointer ${selectedBriefType === type ? "bg-primary text-white shadow-elevated" : "text-foreground-muted hover:text-foreground"}`}
                >
                  {type.replace(" Brief", "")}
                </button>
              ))}
            </div>

            {/* Generated Report content details */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              
              <div className="flex justify-between items-start border-b border-border/40 pb-4">
                <div>
                  <span className="text-[10px] text-foreground-subtle font-mono uppercase font-bold tracking-wider">AUTO-GENERATED OPS REPORT</span>
                  <h3 className="text-lg font-bold text-foreground mt-0.5">{activeReport.title}</h3>
                  <p className="text-[10px] text-foreground-subtle mt-0.5 font-mono">Date: {activeReport.date} | ID: {activeReport.id}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-[9px] text-foreground-subtle uppercase block font-semibold">READINESS INDEX</span>
                  <span className="text-xl font-bold font-mono text-primary text-glow">{activeReport.readinessScore}%</span>
                </div>
              </div>

              {/* Summary details */}
              <div className="space-y-4 text-xs text-foreground-muted">
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">1. Executive Summary</h4>
                  <p className="leading-relaxed bg-background-secondary p-3.5 rounded border border-border/60 italic">
                    &ldquo;{activeReport.summary}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">2. Mapped Risks Identified</h4>
                    {activeReport.risksCount > 0 ? (
                      <ul className="space-y-1.5 font-mono text-[11px] list-disc pl-4 text-danger">
                        <li>Pilgrim crowding at Ghat gates (High risk)</li>
                        <li>Exceeded fatigue threshold Triveni point (Warning risk)</li>
                      </ul>
                    ) : (
                      <p className="text-[11px] italic">No active risks mapped for this reporting period.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">3. Recommended Actions</h4>
                    <ul className="space-y-1.5 font-mono text-[11px] list-disc pl-4 text-foreground">
                      {activeReport.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 font-mono text-[10px] text-foreground-subtle flex justify-between">
                  <span>CONFIDENCE BOUNDS: 94%</span>
                  <span>PREDICTIVE LOG ANALYSIS VERIFIED</span>
                </div>
              </div>

            </div>
          </div>

          {/* Saved Executive Reports logs (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-4">
            
            <CommandCard
              title="Briefing Dashboard"
              subtitle="Consolidated metrics"
              icon={FileText}
            >
              <div className="mt-4 space-y-4 text-xs font-mono">
                {[
                  { label: "Overall Readiness Index", value: "87%", color: "text-primary" },
                  { label: "Workforce Utilization status", value: "92% optimal", color: "text-success" },
                  { label: "Average Response speed SLA", value: "6.5 Min", color: "text-primary" },
                  { label: "Pending critical recommendations", value: "2 Actions", color: "text-danger" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="text-foreground-muted">{stat.label}</span>
                    <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </CommandCard>

            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <History className="h-4.5 w-4.5 text-primary" />
                <span>Saved Briefing Reports</span>
              </div>
              
              <div className="space-y-2">
                {reports.map((rep, idx) => (
                  <div key={idx} className="p-3 rounded bg-background-secondary border border-border/60 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">{rep.title}</span>
                      <span className="text-primary">{rep.readinessScore}% Index</span>
                    </div>
                    <span className="text-[9px] text-foreground-subtle block mt-1">{rep.date} • {rep.id}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* EXPORT DIALOG MODAL SKELETON */}
      <FloatingPanel
        title="Export Operations Report"
        subtitle={`Preparing document download`}
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        width="sm"
      >
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Rendering report in {exportTarget} format...</p>
            <p className="text-[10px] text-foreground-subtle mt-0.5">Compressing data ledgers and explainability layers</p>
          </div>
        </div>
      </FloatingPanel>

    </AppShell>
  );
}
