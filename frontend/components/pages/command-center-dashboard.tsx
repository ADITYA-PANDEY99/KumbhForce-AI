"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCard } from "@/components/ui/metric-card";
import { CommandCard } from "@/components/ui/command-card";
import { AlertCard } from "@/components/ui/alert-card";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import { TimelineCard } from "@/components/ui/timeline-card";
import { DigitalCommandTwin } from "@/components/digital-command-twin";
import { FloatingPanel } from "@/components/ui/floating-panel";
import {
  Activity,
  Users,
  Shield,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Sparkles,
  Info,
  MapPin,
  HeartPulse,
  Route,
  UserCheck,
  Filter,
  Volume2
} from "lucide-react";

interface SectorExplainability {
  sectorId: string;
  name: string;
  skillMatch: number;
  distance: number; // in km
  fatigue: "Low" | "Medium" | "High";
  reliability: number;
  criticalFactor: string;
}

const explainabilityMap: Record<string, SectorExplainability> = {
  "S-01": { sectorId: "S-01", name: "Sangam Ghat", skillMatch: 95, distance: 0.8, fatigue: "Low", reliability: 92, criticalFactor: "High density crowd-control certifications required near river confluence." },
  "S-02": { sectorId: "S-02", name: "Triveni Point", skillMatch: 91, distance: 1.2, fatigue: "Medium", reliability: 89, criticalFactor: "Medical first-aid skill profile prioritized due to transit congestion." },
  "S-03": { sectorId: "S-03", name: "Ram Ghat", skillMatch: 88, distance: 1.5, fatigue: "Low", reliability: 94, criticalFactor: "Language support required for international pilgrim guidance." },
  "S-04": { sectorId: "S-04", name: "Dasashwamedh", skillMatch: 96, distance: 0.4, fatigue: "Low", reliability: 97, criticalFactor: "Emergency response dispatchers required near gate checkpoints." },
  "S-05": { sectorId: "S-05", name: "Naini Bridge", skillMatch: 85, distance: 2.1, fatigue: "Low", reliability: 90, criticalFactor: "Logistics coordinators matching transport routes." },
  "S-06": { sectorId: "S-06", name: "Prayag Station", skillMatch: 92, distance: 0.9, fatigue: "Medium", reliability: 91, criticalFactor: "Crowd control and information desk bilingual volunteers." },
  "S-07": { sectorId: "S-07", name: "Kali Ghat", skillMatch: 89, distance: 1.1, fatigue: "Low", reliability: 93, criticalFactor: "Crowd guidance and sanitation monitoring team." },
  "S-08": { sectorId: "S-08", name: "Akshayvat", skillMatch: 94, distance: 0.7, fatigue: "High", reliability: 88, criticalFactor: "Saffron route guides with local geography expertise." },
  "S-09": { sectorId: "S-09", name: "Alopi Bagh", skillMatch: 90, distance: 1.8, fatigue: "Low", reliability: 95, criticalFactor: "Parking and vehicular control logistics helpers." },
  "S-10": { sectorId: "S-10", name: "Naini Ghat", skillMatch: 87, distance: 1.4, fatigue: "Medium", reliability: 89, criticalFactor: "Riverbank safety marshals and life jacket compliance." },
  "S-11": { sectorId: "S-11", name: "Jhunsi Bridge", skillMatch: 93, distance: 2.4, fatigue: "Low", reliability: 96, criticalFactor: "Pedestrian flow monitoring on pontoon bridge structures." },
  "S-12": { sectorId: "S-12", name: "Phaphamau", skillMatch: 86, distance: 1.7, fatigue: "Low", reliability: 92, criticalFactor: "Entry gate scanning and ticket verification helpers." }
};

const defaultExplainability: SectorExplainability = {
  sectorId: "ALL",
  name: "System Level (Composite)",
  skillMatch: 92,
  distance: 1.1,
  fatigue: "Low",
  reliability: 93,
  criticalFactor: "Aggregated matching factor across 12 active sectors of Mahakumbh."
};

interface FeedEvent {
  id: string;
  timestamp: string;
  category: "Safety" | "Medical" | "Crowd" | "Logistics";
  message: string;
  highlighted: boolean;
}

const INITIAL_EVENTS: FeedEvent[] = [
  { id: "ev-1", timestamp: "12:30:15", category: "Safety", message: "Sector 4: Boundary security scan verified. All nodes stable.", highlighted: false },
  { id: "ev-2", timestamp: "12:30:40", category: "Crowd", message: "Sangam Ghat (S-01): Pedestrian inflow rate matched at 420 pilgrims/min.", highlighted: false },
  { id: "ev-3", timestamp: "12:31:05", category: "Medical", message: "Triveni Point S-02: Dehydration alert triaged. Medical team deployed.", highlighted: true },
  { id: "ev-4", timestamp: "12:31:22", category: "Logistics", message: "Route optimized: Volunteer Shift B reallocated to Phaphamau bridge checkpoint.", highlighted: false }
];

const RAW_EVENT_TEMPLATES = [
  { category: "Safety" as const, message: "Incident detected: Security boundary checkpoint anomaly resolved at Dasashwamedh Gate." },
  { category: "Medical" as const, message: "Medical response activated: Ram Ghat emergency response unit dispatched to bathing platform 4." },
  { category: "Crowd" as const, message: "Sector congestion alert: Sangam Ghat (S-01) density reached 91% capacity threshold." },
  { category: "Logistics" as const, message: "Route optimized: Pontoon Bridge 2 flow rerouted to avoid pilgrim bottlenecks." },
  { category: "Safety" as const, message: "Incident detected: Lost child reported at Sector 6 gate; safety coordinators notified." },
  { category: "Medical" as const, message: "Medical response activated: Hydration checkpoint S-08 reports heat fatigue support complete." },
  { category: "Crowd" as const, message: "Sector congestion alert: Triveni Point (S-02) flow volume exceeds safe guidelines." },
  { category: "Logistics" as const, message: "Volunteer dispatched: 8 reserve monitors routed to Triveni Point (S-02) sector." },
  { category: "Logistics" as const, message: "Volunteer dispatched: Shift B Team assigned to Sangam S-01 riverbank marshal duty." },
  { category: "Logistics" as const, message: "Route optimized: Rerouted Volunteer Team C via pontoon bridge to avoid central congestion." }
];

const mockRecommendations = [
  { title: "Redeploy 12 Volunteers to Sangam Ghat", rationale: "Sector 7 is projected to experience a volunteer shortage within 90 minutes. Recommended action: Redeploy 12 volunteers from Sector 3.", actionType: "Reassign Staff", priority: "critical" as const, confidence: 91, estimatedImpact: "Prevents S-01 bottlenecks & reduces response delay" },
  { title: "Activate Reserve Unit Alpha to S-02", rationale: "Fatigue index for Triveni Point coordinators crossed 78/100. Deploying 8 reserve supervisors maintains operational integrity.", actionType: "Activate Reserve", priority: "high" as const, confidence: 85, estimatedImpact: "Reduces S-02 fatigue strain by 31%" },
];


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

export function CommandCenterDashboard() {
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);
  const [autoResolveSuccess, setAutoResolveSuccess] = useState(false);

  // Demo Mode and Live Operations Feed states
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>(INITIAL_EVENTS);
  const [feedFilter, setFeedFilter] = useState<string>("ALL");
  const [activeVolunteers, setActiveVolunteers] = useState(487);
  const [readinessScore, setReadinessScore] = useState(87);

  const currentExplain = selectedSectorId ? explainabilityMap[selectedSectorId] || defaultExplainability : defaultExplainability;

  // Real-time Event Dispatch Feed Interval
  useEffect(() => {
    const generateEvent = () => {
      const template = RAW_EVENT_TEMPLATES[Math.floor(Math.random() * RAW_EVENT_TEMPLATES.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const newEv: FeedEvent = {
        id: `ev-${Date.now()}`,
        timestamp: timeStr,
        category: template.category,
        message: template.message,
        highlighted: Math.random() > 0.6
      };

      setFeedEvents(prev => [newEv, ...prev].slice(0, 50));

      // If Demo Mode is enabled, dynamically update metrics
      if (isDemoMode) {
        setActiveVolunteers(prev => prev + (Math.random() > 0.5 ? 2 : -1));
        setReadinessScore(prev => Math.min(100, Math.max(70, prev + (Math.random() > 0.6 ? 1 : -1))));
      }
    };

    // Random interval between 3 to 8 seconds
    const intervalTime = Math.floor(Math.random() * 5000) + 3000;
    const interval = setInterval(generateEvent, intervalTime);

    return () => clearInterval(interval);
  }, [isDemoMode]);

  // Demo Mode Toggle triggers initial metrics fluctuations
  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
    if (!isDemoMode) {
      setReadinessScore(89);
      setActiveVolunteers(495);
    } else {
      setReadinessScore(87);
      setActiveVolunteers(487);
    }
  };

  const handleSectorClick = (sectorId: string) => {
    setSelectedSectorId(sectorId);
  };

  const triggerAutoResolve = () => {
    setIsCtaModalOpen(true);
    setAutoResolveSuccess(false);
    setTimeout(() => {
      setAutoResolveSuccess(true);
    }, 1200);
  };

  // Filter events
  const filteredEvents = feedEvents.filter(ev => {
    if (feedFilter === "ALL") return true;
    return ev.category.toUpperCase() === feedFilter.toUpperCase();
  });

  return (
    <div className={`p-6 space-y-8 max-w-[1600px] mx-auto transition-all ${
      isDemoMode ? "border-2 border-primary/20 rounded-xl shadow-glow bg-card/10 animate-fade-in" : ""
    }`}>
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            KumbhForce AI <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">v1.2</span>
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Autonomous Volunteer Operations Command Center — Mahakumbh Staffing War Room
          </p>
        </div>
        
        {/* Dynamic Presentation Demo Mode Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDemoMode}
            className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wider transition-all border flex items-center gap-2 cursor-pointer ${
              isDemoMode
                ? "bg-primary text-white border-primary shadow-glow animate-pulse"
                : "bg-background-secondary text-foreground-subtle border-border hover:border-primary"
            }`}
          >
            <Volume2 className="h-4 w-4" />
            {isDemoMode ? "DEMO MODE ACTIVE" : "ENABLE DEMO MODE"}
          </button>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border">
            <span className={`h-2 w-2 rounded-full bg-success ${isDemoMode ? "animate-ping" : "animate-ping-slow"}`} aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-success uppercase tracking-wider">
              {isDemoMode ? "STREAM ACTIVE" : "TELEMETRY LIVE"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 1: STATUS KPI AREA */}
      <section aria-label="Operational Indicators">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard label="Readiness Score" value={readinessScore.toString()} unit="/ 100" delta={isDemoMode ? 1.8 : 2.4} deltaLabel="live tracking" icon={Activity} tooltip="Composite readiness status across Mahakumbh grid" />
          <MetricCard label="Active Volunteers" value={activeVolunteers.toString()} unit="on duty" delta={isDemoMode ? 8 : 12} deltaLabel="active coverage" icon={Users} tooltip="Current staff logged into active stations" />
          <MetricCard label="Active Sectors" value="12" unit="/ 12" delta={0} deltaLabel="operational" icon={Shield} tooltip="Total sectors mapped in command grid" />
          <MetricCard label="Critical Incidents" value={isDemoMode ? "2" : "4"} unit="active" delta={-33} deltaLabel="resolved today" icon={AlertTriangle} tooltip="Unresolved high priority dispatch tasks" />
          <MetricCard label="AI Recommendations" value="87" unit="generated" delta={14} deltaLabel="auto-applied" icon={Brain} tooltip="Machine learning interventions generated in last 24h" />
          <MetricCard label="Workforce Efficiency" value="92" unit="%" delta={1.8} deltaLabel="vs average" icon={CheckCircle} tooltip="Deployment efficiency score based on optimal routing and skills match" />
        </div>
      </section>

      {/* Twin & Optimizer CTA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* DIGITAL TWIN */}
        <section className="xl:col-span-8 space-y-4" aria-label="Digital Command Twin Grid">
          <CommandCard
            title="Digital Command Twin (12-Sector Grid)"
            subtitle="Click a sector to review explainability score, local parameters, and targeted staffing predictions"
            icon={Shield}
            badge={isDemoMode ? "DEMO HIGHLIGHT ACTIVE" : "INTERACTIVE"}
          >
            <div className={`mt-4 transition-all ${isDemoMode ? "scale-[1.01] border border-primary/30 rounded p-1" : ""}`} onClick={(e) => {
              const target = e.target as HTMLElement;
              const card = target.closest("[role='button']");
              if (card) {
                const titleText = card.querySelector("p")?.textContent;
                const match = Object.values(explainabilityMap).find(s => s.name === titleText);
                if (match) {
                  handleSectorClick(match.sectorId);
                }
              }
            }}>
              <DigitalCommandTwin isDemoMode={isDemoMode} />
            </div>
          </CommandCard>
        </section>

        {/* WORKFORCE DISPATCH CONTROL */}
        <section className="xl:col-span-4 space-y-4" aria-label="Autonomous Dispatch Control Center">
          <div className="relative rounded-lg p-6 bg-gradient-to-br from-accent/15 via-card to-background border border-accent/40 shadow-glow flex flex-col justify-between min-h-[350px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-wider uppercase font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20 flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="h-3 w-3" /> Autonomous Dispatch
                </span>
                <span className="text-[10px] text-foreground-subtle font-mono">SLA Auto-Optimization</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mt-2">Volunteer Dispatch Orchestrator</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Execute systemic rebalancing commands across 12 zones immediately. Auto-optimizer analyzes crowd telemetry, volunteer skill constraints, and real-time fatigue indexes to close staff shortages.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[11px] text-foreground-subtle border-b border-border/40 pb-1">
                  <span>Current Critical Gaps:</span>
                  <span className="font-mono text-danger font-semibold">2 Sectors (S-01, S-02)</span>
                </div>
                <div className="flex justify-between text-[11px] text-foreground-subtle border-b border-border/40 pb-1">
                  <span>Target Crowd Density Reducer:</span>
                  <span className="font-mono text-primary font-semibold">24% Projected Impact</span>
                </div>
                <div className="flex justify-between text-[11px] text-foreground-subtle border-b border-border/40 pb-1">
                  <span>Optimizing Algorithm:</span>
                  <span className="font-mono text-foreground">Linear Flow Network v4</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerAutoResolve}
                className="w-full py-3 px-4 rounded-lg bg-accent text-white font-bold text-sm tracking-wide shadow-elevated flex items-center justify-center gap-2 hover:bg-accent/90 transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4" />
                AUTO RESOLVE WORKFORCE GAPS
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMN 1: Live Operations Feed (New Upgrade) */}
        <div className="space-y-6">
          <section aria-label="Live Operations Feed">
            <SectionHeader
              title="Live Operations Feed"
              subtitle="Dynamic dispatcher activity log from live telemetry"
              action={<Filter className="h-4 w-4 text-foreground-subtle" />}
            />

            <div className="rounded-lg border border-border bg-card p-4 space-y-4">
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1 border-b border-border/40 pb-3">
                {["ALL", "Safety", "Medical", "Crowd", "Logistics"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFeedFilter(cat)}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                      feedFilter === cat
                        ? "bg-primary/20 text-primary border border-primary/20"
                        : "text-foreground-subtle hover:text-foreground hover:bg-background-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic scroll feed */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {filteredEvents.map(ev => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-2.5 rounded border transition-all ${
                        ev.highlighted
                          ? "bg-primary/5 border-primary/30"
                          : "bg-background-secondary/40 border-border/50"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-foreground-subtle mb-1">
                        <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                          ev.category === "Safety" ? "text-danger bg-danger/10" :
                          ev.category === "Medical" ? "text-warning bg-warning/10" :
                          ev.category === "Crowd" ? "text-primary bg-primary/10" : "text-success bg-success/10"
                        }`}>{ev.category}</span>
                        <span>{ev.timestamp}</span>
                      </div>
                      <p className="text-xs text-foreground font-mono leading-relaxed">{ev.message}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </section>
        </div>

        {/* COLUMN 2: Recommendation Feed & Incidents */}
        <div className="space-y-6">
          <section aria-label="AI optimization feed">
            <SectionHeader
              title="AI Recommendation Feed"
              subtitle="Decisions generated by operational constraints optimizer"
              action={
                <span className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Brain className="h-3 w-3" /> AI Ranker
                </span>
              }
            />
            <div className="space-y-3">
              {mockRecommendations.map((rec, i) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.25 }}
                >
                  <RecommendationCard
                    title={rec.title}
                    rationale={rec.rationale}
                    actionType={rec.actionType}
                    priority={rec.priority}
                    confidence={rec.confidence}
                    estimatedImpact={rec.estimatedImpact}
                    onApprove={triggerAutoResolve}
                    onReject={() => {}}
                    onExpand={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMN 3: Readiness breakdown & Explainability */}
        <div className="space-y-6">
          <section aria-label="AI Explainability layer">
            <CommandCard
              title="AI Explainability Panel"
              subtitle={`Reasoning engine for ${currentExplain.name}`}
              icon={Brain}
              badge={selectedSectorId ? selectedSectorId : "SYSTEM"}
            >
              <div className="mt-4 space-y-4">
                <p className="text-xs text-foreground-muted italic leading-relaxed">
                  &ldquo;{currentExplain.criticalFactor}&rdquo;
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-md border border-border/60 bg-background-secondary p-3">
                    <div className="flex items-center gap-1 text-[10px] text-foreground-subtle mb-1">
                      <UserCheck className="h-3 w-3 text-primary" /> Skill Match
                    </div>
                    <span className="text-lg font-bold font-mono text-primary text-glow">{currentExplain.skillMatch}%</span>
                  </div>
                  
                  <div className="rounded-md border border-border/60 bg-background-secondary p-3">
                    <div className="flex items-center gap-1 text-[10px] text-foreground-subtle mb-1">
                      <Route className="h-3 w-3 text-primary" /> Distance Impact
                    </div>
                    <span className="text-lg font-bold font-mono text-primary text-glow">{currentExplain.distance} km</span>
                  </div>

                  <div className="rounded-md border border-border/60 bg-background-secondary p-3">
                    <div className="flex items-center gap-1 text-[10px] text-foreground-subtle mb-1">
                      <HeartPulse className="h-3 w-3 text-warning" /> Local Fatigue
                    </div>
                    <span className={`text-lg font-bold font-mono ${currentExplain.fatigue === "High" ? "text-danger" : currentExplain.fatigue === "Medium" ? "text-warning" : "text-success"}`}>{currentExplain.fatigue}</span>
                  </div>

                  <div className="rounded-md border border-border/60 bg-background-secondary p-3">
                    <div className="flex items-center gap-1 text-[10px] text-foreground-subtle mb-1">
                      <Activity className="h-3 w-3 text-success" /> Reliability
                    </div>
                    <span className="text-lg font-bold font-mono text-success text-glow">{currentExplain.reliability}</span>
                  </div>
                </div>

                {selectedSectorId && (
                  <button
                    onClick={() => setSelectedSectorId(null)}
                    className="w-full py-1.5 px-3 rounded border border-border text-[11px] text-foreground-subtle hover:text-foreground hover:bg-background-secondary transition-colors cursor-pointer"
                  >
                    Clear selection — view overall system metrics
                  </button>
                )}
              </div>
            </CommandCard>
          </section>
        </div>

      </div>

      {/* CTA Modal */}
      <FloatingPanel
        title="Autonomous Rebalance Execution"
        subtitle="Operations Command Authorization Dispatch"
        isOpen={isCtaModalOpen}
        onClose={() => setIsCtaModalOpen(false)}
        width="lg"
      >
        <div className="space-y-4">
          {!autoResolveSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Running Rebalance Engines...</p>
                <p className="text-xs text-foreground-muted mt-1">Calculating optimal paths, routing distance overheads, and fatigue logs</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-3 rounded bg-success/10 border border-success/30">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-xs font-semibold text-success">Optimization Command Dispatched Successfully</p>
                  <p className="text-[10px] text-success/80">Command Center rebalancing completed automatically without telemetry degradation.</p>
                </div>
              </div>

              <div className="rounded bg-background-secondary border border-border p-4 space-y-2">
                <h4 className="text-xs font-semibold text-foreground">Reallocation Summary:</h4>
                <ul className="text-xs text-foreground-muted space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong>12 Volunteers</strong> reassigned from Ram Ghat (Sector 3) to Sangam Ghat (Sector 1).</li>
                  <li>Expected crowd congestion reduction at S-01 checkpoint: <strong>24%</strong>.</li>
                  <li>Estimated incident resolution SLA response improvement: <strong>17%</strong>.</li>
                  <li>Model target confidence value verified at <strong>91%</strong> limit.</li>
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsCtaModalOpen(false)}
                  className="px-4 py-2 rounded bg-border hover:bg-border/80 text-xs font-semibold text-foreground transition-all cursor-pointer"
                >
                  Close Command
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </FloatingPanel>

    </div>
  );
}
