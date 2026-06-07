"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import Link from "next/link";
import {
  Bot,
  Send,
  Sparkles,
  Info,
  Database,
  Shield,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";

interface DecisionResponse {
  response: string;
  confidence: number;
  impact: "Critical" | "High" | "Medium" | "Low";
  recommendedAction: string;
  responseTime: string;
  sources: string[];
  actions: { label: string; route: string }[];
}

const RESPONSES_DB: Record<string, DecisionResponse> = {
  "Which sectors are currently understaffed?": {
    response: "Operational telemetry indicates staffing gaps in two sectors: Sangam Ghat (S-01) is experiencing a deficit of 12 volunteers due to crowd surges, and Triveni Point (S-02) reports a deficit of 18 volunteers.",
    confidence: 96,
    impact: "Critical",
    recommendedAction: "Initialize automated roster rebalancing to redeploy 12 volunteers from the Sector 3 reserve pool.",
    responseTime: "3.5 mins",
    sources: ["Live Roster Logs", "Pilgrim Inflow telemetries", "S-01 capacity sensors"],
    actions: [
      { label: "Dispatch Team", route: "/incidents" },
      { label: "Open Sector Twin", route: "/" }
    ]
  },
  "Identify the nearest available volunteers for Sangam Ghat.": {
    response: "Found 14 available volunteers currently logged on stand-by near Sector 3 (Ram Ghat) and Sector 4 (Dasashwamedh). Average proximity distance is 0.85 km.",
    confidence: 93,
    impact: "High",
    recommendedAction: "Route the nearest 12 volunteers to the S-01 gate checkpoints to support pedestrian flow management.",
    responseTime: "4.8 mins",
    sources: ["Volunteer GPS Telemetries", "Sector 3 Roster registries"],
    actions: [
      { label: "Dispatch Team", route: "/incidents" },
      { label: "View Predictions", route: "/predictions" }
    ]
  },
  "Model a crowd surge simulation in Sector 1.": {
    response: "Surge modeling scenario active. An expected 45% increase in pilgrim density at Sangam Ghat S-01 will reduce overall sector readiness to 42% and create a deficit of 26 volunteers.",
    confidence: 91,
    impact: "Critical",
    recommendedAction: "Run a sandbox stress simulation to verify optimal safety parameters before committing shift assignments.",
    responseTime: "10 mins",
    sources: ["Pilgrim Density forecasts", "Simulator Sandbox engine"],
    actions: [
      { label: "Run Simulation", route: "/simulator" },
      { label: "Open Sector Twin", route: "/" }
    ]
  },
  "Check predictions for Triveni Point.": {
    response: "Predictive algorithms forecast a significant crowd surge at Triveni Point (S-02) in approximately 90 minutes. Staffing levels are expected to drop below the safety margin.",
    confidence: 89,
    impact: "High",
    recommendedAction: "Deploy 8 reserve supervisors pre-emptively to bridge the S-02 capacity gap.",
    responseTime: "7.2 mins",
    sources: ["Crowd Forecast Model v3", "Volunteer fatigue tracking"],
    actions: [
      { label: "View Predictions", route: "/predictions" },
      { label: "Run Simulation", route: "/simulator" }
    ]
  },
  "Draft an incident response team.": {
    response: "Incident response draft created. Automatically matching 4 medical-certified volunteers near Ram Ghat to support active dehydration reports.",
    confidence: 95,
    impact: "Critical",
    recommendedAction: "Approve the recommended response team dispatch to Ram Ghat medical station.",
    responseTime: "2.1 mins",
    sources: ["Active Incident Feed", "Medical certifications registry"],
    actions: [
      { label: "Dispatch Team", route: "/incidents" },
      { label: "Open Sector Twin", route: "/" }
    ]
  }
};

export default function CopilotPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: "m-1",
      sender: "copilot",
      text: "Namaste Command Officer. I am your Operations Decision Assistant. Select a preset question below or ask about live telemetry, volunteer fatigue, and reallocation constraints.",
      timestamp: "23:15",
      confidence: 98,
      impact: "Low",
      recommendedAction: "Select an operational query card below to initialize telemetry analysis.",
      responseTime: "N/A",
      sources: ["Central Telemetry Engine"],
      actions: []
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Active side panel tracking (loads from the latest copilot message)
  const latestCopilotMsg = [...messages].reverse().find(m => m.sender === "copilot") || messages[0];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const match = RESPONSES_DB[text] || {
        response: "I have parsed your custom query against live operations models. Recommendations can be run through the simulation sandbox or roster optimizer.",
        confidence: 85,
        impact: "Medium" as const,
        recommendedAction: "Initiate custom simulation test or review optimizer metrics.",
        responseTime: "5.0 mins",
        sources: ["Operations General Database"],
        actions: [
          { label: "View Predictions", route: "/predictions" },
          { label: "Run Simulation", route: "/simulator" }
        ]
      };

      const copilotMsg = {
        id: `copilot-${Date.now()}`,
        sender: "copilot",
        text: match.response,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }),
        confidence: match.confidence,
        impact: match.impact,
        recommendedAction: match.recommendedAction,
        responseTime: match.responseTime,
        sources: match.sources,
        actions: match.actions
      };

      setMessages(prev => [...prev, copilotMsg]);
    }, 1000);
  };

  return (
    <AppShell pageTitle="Operations Decision Assistant">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary animate-pulse" /> Operations Decision Assistant
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Upgraded Command AI Interface: Review confidence metrics, dynamic impact levels, and click to execute reassignments.
            </p>
          </div>
        </div>

        {/* 2 Column Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Chat Window Panel */}
          <div className="xl:col-span-8 space-y-4">
            <div className="rounded-lg border border-border bg-card flex flex-col h-[550px] overflow-hidden">
              
              {/* Status Header */}
              <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
                <span>ACTIVE DECISION ASSISTANT — SLA METRICS ENABLED</span>
                <span>CMD-AI SECURED</span>
              </div>

              {/* Chat list */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-primary/25 text-primary border border-primary/25"
                    }`}>
                      {msg.sender === "user" ? "USR" : "COP"}
                    </div>
                    
                    <div className={`p-4 rounded-lg text-xs leading-relaxed space-y-2.5 ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-background-secondary border border-border text-foreground"
                    }`}>
                      <p>{msg.text}</p>
                      
                      {msg.sender === "copilot" && (
                        <div className="mt-3 pt-3 border-t border-border/40 space-y-3">
                          {/* SLA Decision Metadata */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                            <div className="p-1.5 rounded bg-background border border-border/40">
                              <span className="text-foreground-subtle block text-[8px] uppercase">Confidence</span>
                              <span className="font-bold text-primary">{msg.confidence}%</span>
                            </div>
                            <div className="p-1.5 rounded bg-background border border-border/40">
                              <span className="text-foreground-subtle block text-[8px] uppercase">Impact Level</span>
                              <span className={`font-bold ${
                                msg.impact === "Critical" ? "text-danger animate-pulse" : msg.impact === "High" ? "text-warning" : "text-success"
                              }`}>{msg.impact}</span>
                            </div>
                            <div className="p-1.5 rounded bg-background border border-border/40">
                              <span className="text-foreground-subtle block text-[8px] uppercase">Rec Action</span>
                              <span className="font-bold text-foreground truncate block" title={msg.recommendedAction}>{msg.recommendedAction}</span>
                            </div>
                            <div className="p-1.5 rounded bg-background border border-border/40">
                              <span className="text-foreground-subtle block text-[8px] uppercase">Est Response</span>
                              <span className="font-bold text-foreground">{msg.responseTime}</span>
                            </div>
                          </div>
                          
                          {/* 4 Clickable Actions */}
                          <div className="flex flex-wrap gap-2 pt-1 border-t border-border/30">
                            {[
                              { label: "Dispatch Team", route: "/incidents" },
                              { label: "Open Sector", route: "/" },
                              { label: "View Prediction", route: "/predictions" },
                              { label: "Run Simulation", route: "/simulator" }
                            ].map((act) => (
                              <Link
                                key={act.label}
                                href={act.route}
                                className="px-2 py-1 rounded bg-primary/10 border border-primary/20 hover:bg-primary text-[10px] font-semibold text-primary hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Zap className="h-3 w-3" /> {act.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <span className="text-[9px] text-foreground-subtle mt-1.5 block text-right font-mono">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">COP</div>
                    <div className="p-3 rounded-lg bg-background-secondary border border-border text-xs text-foreground-subtle font-mono animate-pulse">
                      Assistant is running multi-priority optimization solver...
                    </div>
                  </div>
                )}
              </div>

              {/* Preset clickable cards */}
              <div className="p-2 border-t border-border/40 bg-background-secondary/20 overflow-x-auto flex gap-2 whitespace-nowrap scrollbar-thin">
                {Object.keys(RESPONSES_DB).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1 rounded border border-border/60 hover:border-primary text-[10px] text-foreground-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* TextInput */}
              <div className="p-3 border-t border-border/40 bg-background-secondary/40 flex gap-2.5">
                <input
                  type="text"
                  placeholder="Ask the Decision Assistant... (e.g. Which sectors are currently understaffed?)"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputText)}
                  className="flex-1 px-3 py-2 rounded bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={() => handleSend(inputText)}
                  className="h-9 w-9 bg-primary hover:bg-primary/95 text-white flex items-center justify-center rounded shadow-elevated transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* AI DECISION METADATA SIDEBAR PANEL */}
          <div className="xl:col-span-4 space-y-4">
            <CommandCard
              title="Assistant Action Panel"
              subtitle="Current query decision telemetry"
              icon={Bot}
              badge="METRICS"
            >
              <div className="mt-4 space-y-4">
                
                {/* Confidence & Impact Level */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-background-secondary border border-border/50 text-center">
                    <span className="text-[9px] text-foreground-subtle block font-semibold">CONFIDENCE</span>
                    <span className="text-xl font-bold font-mono text-primary text-glow mt-1 block">
                      {latestCopilotMsg.confidence}%
                    </span>
                  </div>
                  <div className="p-3 rounded bg-background-secondary border border-border/50 text-center">
                    <span className="text-[9px] text-foreground-subtle block font-semibold">IMPACT LEVEL</span>
                    <span className={`text-xs font-bold font-mono mt-1 block uppercase ${
                      latestCopilotMsg.impact === "Critical" ? "text-danger" : latestCopilotMsg.impact === "High" ? "text-warning" : "text-success"
                    }`}>
                      {latestCopilotMsg.impact}
                    </span>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="p-3 rounded bg-background-secondary border border-border/50 space-y-1">
                  <span className="text-[9px] text-foreground-subtle block font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" /> RECOMMENDED ACTION
                  </span>
                  <p className="text-xs text-foreground leading-relaxed font-mono">
                    {latestCopilotMsg.recommendedAction}
                  </p>
                </div>

                {/* Response SLA Time */}
                <div className="p-3 rounded bg-background-secondary border border-border/50 flex justify-between items-center text-xs font-mono">
                  <span className="text-foreground-subtle flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> EST. RESPONSE TIME
                  </span>
                  <span className="font-bold text-foreground">{latestCopilotMsg.responseTime}</span>
                </div>

                {/* Sources Attribution */}
                {latestCopilotMsg.sources && (
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[9px] text-foreground-subtle uppercase block font-semibold flex items-center gap-1">
                      <Database className="h-3 w-3 text-primary" /> DATA SOURCE CREDIBILITY
                    </span>
                    <div className="space-y-1 font-mono text-[9px]">
                      {latestCopilotMsg.sources.map((src: string, idx: number) => (
                        <div key={idx} className="p-1.5 rounded bg-background-secondary border border-border/40">
                          {src}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </CommandCard>
          </div>

        </div>

      </div>
    </AppShell>
  );
}
