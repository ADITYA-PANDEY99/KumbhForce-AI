import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { Info, User, Layers, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <AppShell pageTitle="About">
      <div className="p-6 max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
            <Info className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">About KumbhForce AI</h1>
            <p className="text-sm text-foreground-muted mt-1">Autonomous Volunteer Operations Command Center</p>
          </div>
        </div>

        {/* Mission */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Core Mission</h2>
          <p className="text-sm text-foreground-muted leading-relaxed">
            KumbhForce AI is a specialized operational intelligence platform engineered for managing
            massive crowd events like Mahakumbh. Our mission is unequivocal: provide the{" "}
            <span className="text-foreground font-medium">right volunteer</span>, with the{" "}
            <span className="text-foreground font-medium">right skills</span>, at the{" "}
            <span className="text-foreground font-medium">right place</span>, at the{" "}
            <span className="text-foreground font-medium">right time</span>, with the{" "}
            <span className="text-foreground font-medium">right workload</span>.
          </p>
        </div>

        {/* Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <Layers className="h-4 w-4 text-accent" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-foreground">Deterministic Engines</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              {["Allocation Engine (Linear Programming)", "Fatigue Engine (Time-Series Decay)", "Reliability Scorer (Historical + Real-time)", "Sector Health Engine (Composite Score)", "Operational Readiness Engine"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <Brain className="h-4 w-4 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-foreground">Generative AI Systems</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              {["AI Copilot (Conversational Command Interface)", "Executive Briefing Generator", "Explainable AI Layer (Feature Attribution)", "Incident Response Playbooks", "Natural Language Operational Querying"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Frontend",    tech: "Next.js 15 + TypeScript" },
              { label: "Styling",     tech: "Tailwind CSS + Framer Motion" },
              { label: "Backend",     tech: "FastAPI + Python" },
              { label: "Database",    tech: "SQLite + SQLAlchemy" },
              { label: "State",       tech: "Zustand" },
              { label: "Charts",      tech: "Recharts" },
              { label: "Maps",        tech: "Leaflet / OpenStreetMap" },
              { label: "Deployment",  tech: "Vercel + Render" },
            ].map((item) => (
              <div key={item.label} className="rounded-md bg-background-secondary border border-border p-3">
                <p className="text-[9px] text-foreground-subtle font-mono uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xs font-medium text-foreground">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="relative rounded-lg border border-primary/20 bg-card p-10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />

          <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <User className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>

          <p className="text-[10px] uppercase tracking-widest text-foreground-subtle font-mono mb-2">
            Platform Concept & Design
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Planned &amp; Designed by{" "}
            <span className="text-primary">Aditya Pandey</span>
          </h2>
          <p className="text-sm text-foreground-muted mt-3 max-w-lg mx-auto leading-relaxed">
            Architected as an enterprise-grade operational intelligence command center, 
            engineered to serve command officers, sector coordinators, and event administrators 
            with real-time AI-powered insights.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-foreground-subtle font-mono">
            <span>KumbhForce AI v1.0.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 1 &amp; 2 Complete</span>
            <span aria-hidden="true">·</span>
            <span>2026</span>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
