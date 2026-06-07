"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { AlertCard } from "@/components/ui/alert-card";
import { FloatingPanel } from "@/components/ui/floating-panel";
import { mockIncidentsData, IncidentRecord } from "@/lib/mock-predictions";
import {
  ShieldAlert,
  Plus,
  Zap,
  TrendingUp,
  Brain,
  CheckCircle2,
  Clock,
  HeartPulse,
  UserCheck,
  Activity,
  Route,
  User,
  PlusCircle,
  AlertTriangle
} from "lucide-react";

export default function IncidentResponsePage() {
  const [incidents, setIncidents] = useState<IncidentRecord[]>(mockIncidentsData);
  const [selectedIncId, setSelectedIncId] = useState<string>("INC-9104");
  
  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newIncType, setNewIncType] = useState<IncidentRecord["type"]>("Medical Emergency");
  const [newIncSeverity, setNewIncSeverity] = useState<IncidentRecord["severity"]>("Major");
  const [newIncSector, setNewIncSector] = useState("S-01");
  const [newIncDesc, setNewIncDesc] = useState("");
  const [newIncTitle, setNewIncTitle] = useState("");

  const selectedIncident = incidents.find(i => i.id === selectedIncId) || incidents[0];

  // Stats
  const stats = {
    active: incidents.filter(i => i.status !== "Resolved").length,
    resolved: incidents.filter(i => i.status === "Resolved").length,
    critical: incidents.filter(i => i.severity === "Critical").length,
    avgResponse: 6.5,
    aiInterventions: incidents.filter(i => i.aiIntervention).length
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: IncidentRecord = {
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
      title: newIncTitle || `${newIncType} at Sector ${newIncSector}`,
      type: newIncType,
      severity: newIncSeverity,
      sectorId: newIncSector,
      sectorName: newIncSector === "S-01" ? "Sangam Ghat" : newIncSector === "S-02" ? "Triveni Point" : "Ram Ghat",
      description: newIncDesc || "No description provided.",
      status: "Reported",
      reportedAt: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }) + " IST",
      assignedTeam: [],
      responseTimeMin: 5,
      aiIntervention: true
    };

    setIncidents([newRecord, ...incidents]);
    setSelectedIncId(newRecord.id);
    setIsCreateModalOpen(false);
    
    // Reset inputs
    setNewIncTitle("");
    setNewIncDesc("");
  };

  // Helper for status progress index
  const statusStep = {
    Reported: 0,
    Assigned: 1,
    Responding: 2,
    Resolved: 3
  };

  const currentStep = statusStep[selectedIncident?.status || "Reported"];

  return (
    <AppShell pageTitle="Incident Response Center">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-primary" /> Incident Response Command
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Real-time incident logs, active dispatch control, and predictive response routing dispatches.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-white rounded-md text-xs font-bold shadow-elevated transition-all cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" />
            REPORT INCIDENT
          </button>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Active Incidents", value: stats.active, icon: AlertTriangle, color: "text-danger" },
            { label: "Resolved Today", value: stats.resolved, icon: CheckCircle2, color: "text-success" },
            { label: "Critical Priority", value: stats.critical, icon: ShieldAlert, color: "text-danger" },
            { label: "Avg Response Speed", value: `${stats.avgResponse} Min`, icon: Clock, color: "text-primary" },
            { label: "AI Recommendations", value: stats.aiInterventions, icon: Brain, color: "text-primary" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-lg bg-card border border-border p-4 flex items-center justify-between card-interactive">
                <div>
                  <span className="text-[10px] text-foreground-subtle uppercase block font-semibold">{item.label}</span>
                  <span className={`text-xl font-bold font-mono ${item.color} block mt-1`}>{item.value}</span>
                </div>
                <div className="h-8 w-8 rounded-md bg-background-secondary flex items-center justify-center">
                  <Icon className={`h-4.5 w-4.5 ${item.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Active Incidents Feed (xl:col-span-4) */}
          <div className="xl:col-span-4 space-y-4">
            <SectionHeader
              title="Operational Incident Log"
              subtitle="Select incident to inspect dispatches"
              action={
                <span className="text-[10px] font-mono text-foreground-subtle">{incidents.length} Active logs</span>
              }
            />

            <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncId(inc.id)}
                  className={`cursor-pointer transition-all ${selectedIncId === inc.id ? "scale-[0.99] border-primary" : ""}`}
                >
                  <AlertCard
                    title={inc.title}
                    message={inc.description}
                    severity={inc.severity === "Critical" ? "danger" : "warning"}
                    timestamp={inc.reportedAt}
                    sectorId={inc.sectorId}
                    onAction={() => setSelectedIncId(inc.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Incident Control & AI Dispatch Panel (xl:col-span-8) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Visual Status Timeline Progress Tracker */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div>
                  <span className="text-[9px] text-foreground-subtle font-mono">{selectedIncident?.id} • {selectedIncident?.type}</span>
                  <h3 className="text-sm font-bold text-foreground mt-0.5">{selectedIncident?.title}</h3>
                </div>
                
                <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                  selectedIncident?.severity === "Critical" ? "bg-danger/10 text-danger border border-danger/25" :
                  selectedIncident?.severity === "Major" ? "bg-warning/10 text-warning border border-warning/25" :
                  "bg-success/10 text-success border border-success/25"
                }`}>
                  {selectedIncident?.severity}
                </span>
              </div>

              {/* Status Timeline bar */}
              <div className="pt-2">
                <div className="relative flex justify-between items-center w-full">
                  
                  {/* Background progress track */}
                  <div className="absolute left-0 right-0 h-1 bg-border top-3 z-0" />
                  <div 
                    className="absolute left-0 h-1 bg-primary top-3 z-0 transition-all duration-350"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />

                  {/* Steps */}
                  {["Reported", "Assigned", "Responding", "Resolved"].map((step, idx) => {
                    const isPassed = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    return (
                      <div key={step} className="flex flex-col items-center z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCurrent ? "bg-primary border-primary text-white shadow-glow" :
                          isPassed ? "bg-primary/20 border-primary text-primary" :
                          "bg-card border-border text-foreground-subtle"
                        }`}>
                          <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                        </div>
                        <span className={`text-[10px] font-semibold mt-2 ${isPassed ? "text-foreground" : "text-foreground-subtle"}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AI Response panels grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* AI RESPONSE RECOMMENDATION PANEL */}
              <CommandCard
                title="AI Response Recommendation"
                subtitle="Optimizer selected response team recommendations"
                icon={Brain}
                badge="OPTIMIZED"
              >
                <div className="mt-4 space-y-4">
                  <div>
                    <span className="text-[9px] text-foreground-subtle uppercase block font-semibold mb-1.5">Recommended dispatch volunteers:</span>
                    <div className="space-y-2">
                      {(selectedIncident?.assignedTeam && selectedIncident.assignedTeam.length > 0) ? (
                        selectedIncident.assignedTeam.map((vol, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-background-secondary border border-border/60">
                            <User className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-mono text-foreground font-semibold">{vol}</span>
                          </div>
                        ))
                      ) : (
                        ["VOL-0102 (First Aid Lead)", "VOL-0214 (Emergency Triage)", "VOL-0337 (Logistics)"].map((vol, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-background-secondary border border-border/60">
                            <User className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-mono text-foreground font-semibold">{vol}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded border border-border/60 p-2.5 bg-background-secondary/40 font-mono text-xs">
                      <span className="text-[9px] text-foreground-subtle block uppercase font-bold">Estimated response</span>
                      <span className="text-base font-bold text-primary block mt-0.5">4 Minutes</span>
                      <span className="text-[8px] text-foreground-subtle block">Within SLA range</span>
                    </div>

                    <div className="rounded border border-border/60 p-2.5 bg-background-secondary/40 font-mono text-xs">
                      <span className="text-[9px] text-foreground-subtle block uppercase font-bold">Confidence score</span>
                      <span className="text-base font-bold text-success block mt-0.5">93% Match</span>
                      <span className="text-[8px] text-foreground-subtle block">Optimal selection</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Simulating resolving the selected incident
                      const updatedInc = incidents.map(inc => {
                        if (inc.id === selectedIncId) {
                          return { ...inc, status: "Resolved" as const };
                        }
                        return inc;
                      });
                      setIncidents(updatedInc);
                    }}
                    className="w-full py-2 px-3 rounded bg-accent text-white font-bold text-xs hover:bg-accent/95 shadow-elevated transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5" /> AUTHORIZE AI RESPONSE DISPATCH
                  </button>
                </div>
              </CommandCard>

              {/* RESPONSE IMPACT & EXPLANATIONS PANEL */}
              <div className="space-y-4">
                
                {/* AI EXPLANATION PANEL */}
                <CommandCard
                  title="AI Team Selection Explainability"
                  subtitle="Parameters justifying selection matrices"
                  icon={Brain}
                >
                  <div className="mt-4 space-y-3 text-xs font-mono">
                    {[
                      { label: "Medical Certification", value: "95% Match", desc: "First Aid & CPR badges certified", icon: HeartPulse, color: "text-danger" },
                      { label: "High Reliability rating", value: "92 Rating", desc: "98% punctual shift attendance log", icon: UserCheck, color: "text-success" },
                      { label: "Fatigue Capacity check", value: "Low Fatigue", desc: "Average duty duration below 2.4 hrs", icon: Activity, color: "text-primary" },
                      { label: "Distance Proximity", value: "0.8 km distance", desc: "Closest available personnel coordinates", icon: Route, color: "text-primary" }
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <ItemIcon className={`h-4 w-4 shrink-0 mt-0.5 ${item.color}`} />
                          <div>
                            <div className="flex justify-between font-semibold text-foreground text-[11px]">
                              <span>{item.label}</span>
                              <span className={item.color}>{item.value}</span>
                            </div>
                            <p className="text-[9px] text-foreground-subtle mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CommandCard>

                {/* RESPONSE IMPACT PANEL */}
                <div className="rounded-lg border border-border bg-card p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Response Impact Forecast</h4>
                  
                  <div className="space-y-2 text-xs">
                    {[
                      { label: "Risk Mitigation", val: 84, color: "bg-success" },
                      { label: "Resolution Speed SLA", val: 91, color: "bg-primary" },
                      { label: "Resource Utilization balance", val: 76, color: "bg-primary" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="text-foreground-muted">{item.label}</span>
                          <span className="text-foreground font-semibold">{item.val}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-border overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CREATE INCIDENT DIALOG MODAL */}
      <FloatingPanel
        title="Report Field Incident"
        subtitle="Log new field telemetry for immediate AI team optimization dispatches"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        width="lg"
      >
        <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Incident Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Dehydration case checkpoint 3"
              value={newIncTitle}
              onChange={(e) => setNewIncTitle(e.target.value)}
              className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Incident Type</label>
              <select
                value={newIncType}
                onChange={(e) => setNewIncType(e.target.value as any)}
                className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none"
              >
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Crowd Surge">Crowd Surge</option>
                <option value="Lost Person">Lost Person</option>
                <option value="Security Concern">Security Concern</option>
                <option value="Infrastructure Issue">Infrastructure Issue</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Severity level</label>
              <select
                value={newIncSeverity}
                onChange={(e) => setNewIncSeverity(e.target.value as any)}
                className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none"
              >
                <option value="Critical">Critical (SLA immediate)</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Target Sector Location</label>
            <select
              value={newIncSector}
              onChange={(e) => setNewIncSector(e.target.value)}
              className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none"
            >
              <option value="S-01">Sangam Ghat (S-01)</option>
              <option value="S-02">Triveni Point (S-02)</option>
              <option value="S-03">Ram Ghat (S-03)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Incident Description</label>
            <textarea
              rows={3}
              required
              placeholder="Provide exact coordinates, visual queues, or victim details..."
              value={newIncDesc}
              onChange={(e) => setNewIncDesc(e.target.value)}
              className="w-full p-2.5 bg-background-secondary border border-border rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 bg-background-secondary hover:bg-border border border-border rounded font-bold text-foreground text-[11px] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary/95 text-white rounded font-bold text-[11px] transition-all cursor-pointer"
            >
              LOG INCIDENT & DISPATCH
            </button>
          </div>

        </form>
      </FloatingPanel>

    </AppShell>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">{title}</h2>
        {subtitle && <p className="text-xs text-foreground-muted mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
