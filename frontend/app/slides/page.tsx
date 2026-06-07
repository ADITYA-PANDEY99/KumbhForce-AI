"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Shield,
  Cpu,
  TrendingUp,
  Sliders,
  Bot,
  FileText,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Globe,
  Mail,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain
} from "lucide-react";

interface SlideData {
  title: string;
  category: string;
  renderContent: () => React.ReactNode;
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideData[] = [
    // Slide 1: Title
    {
      category: "Introduction",
      title: "KumbhForce AI",
      renderContent: () => (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative h-20 w-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-glow mb-4 mx-auto">
              <Zap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-glow text-primary">
            KUMBHFORCE AI
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-foreground max-w-2xl">
            Autonomous Volunteer Command & Operations Intelligence Platform
          </h2>
          <p className="text-sm text-foreground-muted font-mono max-w-lg">
            Mahakumbh Staffing War Room · Designed & Built by Aditya Pandey
          </p>
          <div className="flex items-center gap-3 pt-6 text-xs text-foreground-subtle">
            <span className="px-3 py-1 rounded bg-background-secondary border border-border">Use Arrow Keys ← → to navigate</span>
          </div>
        </div>
      )
    },
    // Slide 2: Scale of the Problem
    {
      category: "The Challenge",
      title: "Operating at the Limits of Human Scale",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center pt-8">
          {[
            { title: "Demographics", val: "120M+ Pilgrims", desc: "Largest human gathering on Earth. Larger population footprint than most European nations transit daily.", icon: Users, color: "text-primary border-primary/30" },
            { title: "Topography", val: "Dynamic Grid", desc: "Floodplain structures, pathways, and pontoon bridges change shape dynamically based on seasonal water levels.", icon: Globe, color: "text-primary border-primary/30" },
            { title: "SLA Thresholds", val: "Density Crisis", desc: "Bathing gates and transit terminals exceed 4 people/sqm, triggering extreme crowd surge risks.", icon: AlertTriangle, color: "text-danger border-danger/30" }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className={`rounded-xl bg-card/60 backdrop-blur border p-6 flex flex-col justify-between h-[300px] shadow-glow-sm ${card.color}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-foreground-subtle">{card.title}</span>
                  <div className="h-8 w-8 rounded bg-background-secondary flex items-center justify-center">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-black text-foreground block">{card.val}</span>
                  <p className="text-xs text-foreground-muted leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )
    },
    // Slide 3: Traditional vs KumbhForce AI
    {
      category: "Operations Paradigm Shift",
      title: "Why Traditional Management Fails",
      renderContent: () => (
        <div className="space-y-6 pt-4">
          {/* Lane 1: Traditional */}
          <div className="rounded-xl border border-danger/25 bg-danger/5 p-4 space-y-3">
            <span className="text-[10px] font-bold text-danger tracking-wider uppercase block">TRADITIONAL REACTIVE LOGISTICS</span>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              <div className="bg-card/40 border border-border p-3 rounded text-center text-xs">
                <span className="font-bold text-foreground">Roster Blindness</span>
                <p className="text-[10px] text-foreground-muted mt-1">Static shifts; no fatigue tracking</p>
              </div>
              <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-danger hidden md:block" /></div>
              <div className="bg-card/40 border border-border p-3 rounded text-center text-xs">
                <span className="font-bold text-foreground">Communication Gap</span>
                <p className="text-[10px] text-foreground-muted mt-1">15m dispatch radio delays</p>
              </div>
              <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-danger hidden md:block" /></div>
              <div className="bg-card/40 border border-border p-3 rounded text-center text-xs">
                <span className="font-bold text-foreground">Reactive Mode</span>
                <p className="text-[10px] text-foreground-muted mt-1">Deploy help after incidents happen</p>
              </div>
            </div>
          </div>
          {/* Lane 2: AI */}
          <div className="rounded-xl border border-success/25 bg-success/5 p-4 space-y-3">
            <span className="text-[10px] font-bold text-success tracking-wider uppercase block">KUMBHFORCE AI PROACTIVE INTELLIGENCE</span>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              <div className="bg-card/40 border border-success/20 p-3 rounded text-center text-xs">
                <span className="font-bold text-success">Unified HUD</span>
                <p className="text-[10px] text-foreground-muted mt-1">Live spatial 12-sector twin</p>
              </div>
              <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-success hidden md:block" /></div>
              <div className="bg-card/40 border border-success/20 p-3 rounded text-center text-xs">
                <span className="font-bold text-success">Roster Optimization</span>
                <p className="text-[10px] text-foreground-muted mt-1">Constraint solver (LP Engine)</p>
              </div>
              <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-success hidden md:block" /></div>
              <div className="bg-card/40 border border-success/20 p-3 rounded text-center text-xs">
                <span className="font-bold text-success">Risk Mitigation</span>
                <p className="text-[10px] text-foreground-muted mt-1">Predictive simulator modeling</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: System Architecture
    {
      category: "Engine Flow",
      title: "Intelligent Operations Pipeline",
      renderContent: () => (
        <div className="flex flex-col items-center justify-center space-y-4 pt-4 h-full">
          {[
            { num: "1", label: "Telemetry Ingress", desc: "Live GPS coordinates, pilgrim density sensors, and active emergency triggers" },
            { num: "2", label: "AI Decision Engine", desc: "Computes priority score vectors per sector and responder SLA constraints" },
            { num: "3", label: "Roster Optimization Solver", desc: "Linear flow network engine matches skills, proximity, and fatigue logs" },
            { num: "4", label: "Digital Command Center HUD", desc: "Streams live dispatcher alerts and explainable recommendation trails" }
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-4 bg-card/60 border border-border/80 rounded-xl p-4 w-full max-w-3xl shadow-glow-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-primary uppercase block tracking-wider">{step.label}</span>
                  <p className="text-[11px] text-foreground-muted truncate mt-0.5">{step.desc}</p>
                </div>
              </div>
              {idx < 3 && <ArrowDown className="h-4.5 w-4.5 text-primary/40" />}
            </React.Fragment>
          ))}
        </div>
      )
    },
    // Slide 5: Command Center
    {
      category: "Digital Command Center HUD",
      title: "Live Spatial Twin Mapping Dashboard",
      renderContent: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 h-full items-center">
          <div className="lg:col-span-8 rounded-xl bg-card border border-border h-[320px] flex items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
            <div className="relative space-y-2">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">UI Screen Highlight: CommandCenter</span>
              <h3 className="text-lg font-bold text-foreground">Interactive 12-Sector Grid HUD</h3>
              <p className="text-xs text-foreground-muted max-w-md mx-auto mt-2 leading-relaxed">
                Clickable sector blocks display live staff check-ins, local fatigue levels, distance limits, and explainability recommendations with category-filtered log streams.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            {[
              { label: "Live Telemetry", val: "Sensor Feeds", desc: "Streams GPS & density metrics.", color: "border-primary/20" },
              { label: "Sector Intelligence", val: "Explainability Card", desc: "Analyzes fatigue/distance.", color: "border-primary/20" },
              { label: "Incident Monitoring", val: "Dispatch Tickets", desc: "Triage routing check logs.", color: "border-success/30" }
            ].map((c, i) => (
              <div key={i} className={`rounded-lg bg-card/40 border p-3 ${c.color} space-y-1`}>
                <span className="text-[9px] font-mono text-primary uppercase font-bold block">{c.label}</span>
                <span className="text-xs font-bold text-foreground block">{c.val}</span>
                <p className="text-[10px] text-foreground-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 6: Workforce Optimizer
    {
      category: "Workforce Optimizer",
      title: "Real-Time Constraint Dispatcher",
      renderContent: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 h-full items-center">
          <div className="lg:col-span-8 rounded-xl bg-card border border-border h-[320px] flex items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
            <div className="relative space-y-2">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">UI Screen Highlight: Optimizer</span>
              <h3 className="text-lg font-bold text-foreground">Roster Constraint Comparison View</h3>
              <p className="text-xs text-foreground-muted max-w-md mx-auto mt-2 leading-relaxed">
                Displays comparative volunteer profile indexes side-by-side with single-click Auto-Resolve buttons to dispatch optimal teams.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-2.5">
            {[
              { num: "1", title: "Skills Match", desc: "Filter by first aid, language capability, and coordination certifications." },
              { num: "2", title: "Proximity", desc: "Calculate physical walking distance across the floodplain network." },
              { num: "3", title: "Fatigue Cap", desc: "Track active hours to prevent responders from burning out." },
              { num: "4", title: "Best Match", desc: "Auto-dispatcher routes the optimal volunteer immediately." }
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-card/30 border border-border/60 rounded-lg p-2.5">
                <span className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">{p.num}</span>
                <div className="text-left">
                  <span className="text-xs font-bold text-foreground block">{p.title}</span>
                  <p className="text-[10px] text-foreground-muted mt-0.5 leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 7: Scenario Simulator
    {
      category: "Scenario Stress Sandbox",
      title: "What-If Forecasting Dashboard",
      renderContent: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 h-full items-center">
          <div className="lg:col-span-8 rounded-xl bg-card border border-border h-[320px] flex items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
            <div className="relative space-y-2">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">UI Screen Highlight: Simulator</span>
              <h3 className="text-lg font-bold text-foreground">Monte Carlo Stress Sandbox</h3>
              <p className="text-xs text-foreground-muted max-w-md mx-auto mt-2 leading-relaxed">
                Adjust sliders for crowd load and volunteer metrics to review before/after readiness dials and graph capacity forecasts over an 8-hour horizon.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            {[
              { label: "Step 1", val: "Before State", desc: "Stable volunteer levels within baseline SLA bounds.", color: "border-primary/25" },
              { label: "Step 2", val: "Surge Event", desc: "Sliders simulate crowd spikes or transport delays.", color: "border-danger/35 bg-danger/5" },
              { label: "Step 3", val: "Optimized State", desc: "Linear solver reallocates staff to secure grid.", color: "border-success/35 bg-success/5" }
            ].map((c, i) => (
              <div key={i} className={`rounded-lg bg-card/40 border p-3 ${c.color} space-y-1`}>
                <span className="text-[9px] font-mono text-primary uppercase font-bold block">{c.label}</span>
                <span className="text-xs font-bold text-foreground block">{c.val}</span>
                <p className="text-[10px] text-foreground-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 8: Predictive Staffing
    {
      category: "Predictive Staffing",
      title: "Density & Shortage Timeline Forecasts",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-6 h-full items-center">
          {[
            { label: "NOW", desc: "Current capacity: 487 active, 4 incidents reported." },
            { label: "1H FORECAST", desc: "Sangam Ghat expected crowd +13%. Gap: -22 vols." },
            { label: "3H FORECAST", desc: "Triveni Point reaches Critical density. Gap: -18 vols." },
            { label: "6H FORECAST", desc: "Peak gap projected: -58 volunteers in S-01 sector." },
            { label: "12H FORECAST", desc: "Inflow rates decline; standard monitoring resumes." }
          ].map((time, idx) => (
            <div key={idx} className={`rounded-xl bg-card border p-4 h-[250px] flex flex-col justify-between shadow-glow-sm ${idx === 3 ? "border-danger/40" : "border-border"}`}>
              <span className={`text-sm font-black uppercase ${idx === 3 ? "text-danger" : "text-primary"}`}>{time.label}</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed mt-2">{time.desc}</p>
              <div className="flex justify-end pt-4">
                <span className="text-[9px] font-mono text-foreground-subtle">INDEX: {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 9: AI Copilot
    {
      category: "AI Operations Copilot",
      title: "Decision Support Chat Engine",
      renderContent: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 h-full items-center">
          <div className="lg:col-span-8 rounded-xl bg-card/60 border border-primary/30 p-5 space-y-4 shadow-glow-sm">
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">OP</div>
              <div className="rounded bg-background-secondary p-2.5 max-w-[85%] text-[11px] leading-relaxed">
                <span className="font-bold text-foreground">USER:</span> &ldquo;How is the crowd density at Sangam Ghat S-01, and how do we resolve the staff gap?&rdquo;
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="rounded bg-primary/10 border border-primary/20 p-2.5 max-w-[85%] text-[11px] leading-relaxed text-left">
                <span className="font-bold text-primary">COPILOT:</span> &ldquo;S-01 Sangam Ghat is projected to experience a density surge of +13% in 60 minutes. Recommended action: Redeploy 12 volunteers from S-03 Ram Ghat. Confidence: 95%.&rdquo;
                <button className="mt-3 px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded block hover:bg-primary/90 transition-all cursor-pointer">
                  EXECUTE VOLUNTEER DISPATCH REALLOCATION
                </button>
              </div>
              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">AI</div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-lg bg-card/40 border border-border p-4 space-y-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5"><Brain className="h-4 w-4 text-primary" /> Core Features</span>
              <ul className="text-[11px] text-foreground-muted space-y-1.5 list-disc pl-4 leading-normal">
                <li>Confidence ratings for allocations.</li>
                <li>Estimated responder SLA metrics.</li>
                <li>Attribution logs linking recommendations directly to telemetry records.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 10: Incident Response Journey
    {
      category: "Telemetry flow to resolution",
      title: "60-Second Incident Response Journey",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-6 h-full items-center">
          {[
            { label: "1. ALERT GENERATION", title: "Incident Logged", desc: "Critical medical trigger logged at Triveni Pontoon." },
            { label: "2. RISK ANALYSIS", title: "SLA Estimation", desc: "AI computes sector priorities and target SLA: 4.5 minutes." },
            { label: "3. ROSTER MATCH", title: "Solver Search", desc: "Solver targets Rohit Kumar (first aid, 0.4 km away, fatigue low)." },
            { label: "4. DISPATCH", title: "One-Click Execution", desc: "Dispatcher authorizes routing command immediately via copilot CLI." },
            { label: "5. RESOLUTION", title: "Incident Closed", desc: "Incident closed in 3.8 minutes, beating SLA target bounds." }
          ].map((step, idx) => (
            <div key={idx} className={`rounded-xl bg-card border p-4 h-[250px] flex flex-col justify-between shadow-glow-sm ${idx === 4 ? "border-success/40" : "border-border"}`}>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${idx === 4 ? "text-success" : "text-primary"}`}>{step.label}</span>
              <div>
                <span className="text-sm font-black text-foreground block mt-1">{step.title}</span>
                <p className="text-[11px] text-foreground-muted leading-relaxed mt-2">{step.desc}</p>
              </div>
              <div className="flex justify-end pt-4">
                <span className="text-[9px] font-mono text-foreground-subtle">STEP {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 11: Deployment & Full Stack
    {
      category: "Production Infrastructure",
      title: "Infrastructure & Live Production Stack",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 h-full items-center">
          {[
            { title: "FRONTEND", srv: "Vercel Cloud", details: ["Next.js 15 app router", "Tailwind CSS variables", "Header status badge", "Client fallback logs"], color: "border-primary/30" },
            { title: "BACKEND", srv: "Render Cloud", details: ["FastAPI Python ASGI", "Uvicorn startup runtime", "Official /health endpoint", "CORS policy check"], color: "border-primary/30" },
            { title: "DATABASE", srv: "SQLite File", details: ["Auto schema creator", "SQLAlchemy ORM maps", "Incident log registry", "Volunteer check-ins"], color: "border-primary/30" },
            { title: "INTEGRATION", srv: "Live Platform", details: ["Swagger docs verified", "Connected badge live", "GitHub code sync", "Interactive demo"], color: "border-success/40" }
          ].map((layer, idx) => (
            <div key={idx} className={`rounded-xl bg-card border p-4 h-[280px] flex flex-col justify-between shadow-glow-sm ${layer.color}`}>
              <div>
                <span className="text-[10px] font-mono font-bold text-primary uppercase block tracking-wider">{layer.title}</span>
                <span className="text-xl font-black text-foreground block mt-1">{layer.srv}</span>
                <ul className="text-[11px] text-foreground-muted space-y-1.5 mt-3 pl-4 list-disc leading-normal">
                  {layer.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 12: Key Capabilities
    {
      category: "Platform Capabilities",
      title: "Core Platform Functionality Matrix",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 h-full items-center">
          {[
            { title: "Predictive Staffing", desc: "Anticipate pilgrim density flows and forecast staffing deficits." },
            { title: "Digital Command Twin", "desc": "Interactive 12-sector twin displaying check-ins, fatigue logs, and explainability maps." },
            { title: "AI Copilot Engine", "desc": "Conversational CLI decision helper generating confidence ratings and CTAs." },
            { title: "Workforce Optimization", "desc": "Linear program solver matching skillsets, proximity, and responder fatigue." },
            { title: "Scenario Simulator", "desc": "Stress-test capabilities with parameter sliders, gauges, and 8h charts." },
            { title: "Full Stack Deployment", "desc": "Functional REST API backend linked dynamically with client fallback protections." }
          ].map((c, idx) => (
            <div key={idx} className="rounded-xl bg-card/50 border border-success/30 p-5 h-[140px] flex flex-col justify-between shadow-glow-sm">
              <div>
                <span className="text-xs font-bold text-success flex items-center gap-1.5">✓ {c.title}</span>
                <p className="text-[11px] text-foreground-muted mt-2 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 13: Thank You & Outro
    {
      category: "Presentation Wrap",
      title: "Thank You / Q&A",
      renderContent: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 h-full items-center">
          <div className="lg:col-span-5 rounded-xl bg-card border border-border h-[320px] flex flex-col items-center justify-center p-6 text-center">
            <div className="h-24 w-24 bg-border/20 rounded-lg flex items-center justify-center border border-border/60 mb-4">
              <span className="text-[9px] font-mono text-foreground-subtle">QR Code Link</span>
            </div>
            <span className="text-xs font-bold text-foreground">kumbhforce-ai.vercel.app</span>
            <p className="text-[10px] text-foreground-muted mt-1">Scan to launch interactive command center demo.</p>
          </div>
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-3xl font-black text-primary text-glow">&ldquo;Synchronizing Humanity at Scale&rdquo;</h2>
            <p className="text-xs text-foreground-muted max-w-lg leading-relaxed">
              KumbhForce AI is fully ready to deploy. It converts emergency logistics at the Prayagraj floodplain into a predictable, automated, and explainable operations grid.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40 text-[11px] text-foreground-muted font-mono">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-foreground uppercase block text-[9px] text-primary">GitHub Repository:</span>
                <span>github.com/ADITYA-PANDEY99/KumbhForce-AI</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-foreground uppercase block text-[9px] text-primary">Creator Contact:</span>
                <span>aditya@kumbhforce.ai</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#090A0F] text-foreground flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
      
      {/* Animated Aurora Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent/5 rounded-full blur-[120px]" />

      {/* Top Slide Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4 z-10">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">{slide.category}</span>
            <span className="text-[11px] text-foreground-muted ml-2">Slide {currentSlide + 1} of {slides.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-success uppercase bg-success/10 border border-success/30 px-2 py-0.5 rounded">
            🟢 Production Live
          </span>
        </div>
      </div>

      {/* Slide Content Frame */}
      <div className="flex-1 flex flex-col justify-center my-6 z-10 max-w-[1200px] w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {/* Slide Header */}
            {currentSlide > 0 && (
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground text-glow text-left mb-6 border-l-2 border-primary pl-3">
                {slide.title}
              </h2>
            )}
            
            {/* Custom Slide Render */}
            <div className="min-h-[380px]">
              {slide.renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls footer */}
      <div className="flex justify-between items-center border-t border-border/40 pt-4 z-10">
        <div className="text-[10px] text-foreground-subtle font-mono">
          KumbhForce AI · Pitch Presentation · Aditya Pandey
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center hover:bg-background-secondary hover:text-foreground text-foreground-muted transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          
          <span className="text-xs font-mono font-bold text-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
          
          <button
            onClick={handleNext}
            className="h-9 w-9 rounded-lg border border-border bg-card/60 flex items-center justify-center hover:bg-background-secondary hover:text-foreground text-foreground-muted transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
