"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { generateMockVolunteers, Volunteer } from "@/lib/mock-volunteers";
import { FloatingPanel } from "@/components/ui/floating-panel";
import { CommandCard } from "@/components/ui/command-card";
import {
  Cpu,
  Zap,
  CheckCircle,
  Brain,
  Sliders,
  TrendingUp,
  MapPin,
  Route,
  UserCheck,
  HeartPulse,
  Activity,
  AlertTriangle,
  Award
} from "lucide-react";

interface OptimizationRecommendation {
  volunteer: Volunteer;
  matchScore: number;
  distance: number;
  reasoning: {
    skillMatch: number;
    distanceWeight: number;
    fatigueMitigation: number;
    reliabilityRating: number;
  };
}

export default function WorkforceOptimizerPage() {
  const volunteers = useMemo(() => generateMockVolunteers(), []);

  // Controls state
  const [selectedSector, setSelectedSector] = useState("S-01");
  const [priorityLevel, setPriorityLevel] = useState("High");
  const [requiredCount, setRequiredCount] = useState(12);
  const [optGoal, setOptGoal] = useState("Skill Match");
  
  // Interaction state
  const [selectedRecId, setSelectedRecId] = useState<string | null>(null);
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);
  const [optimizerSuccess, setOptimizerSuccess] = useState(false);

  // Compute recommendations dynamically based on goal input
  const recommendations = useMemo<OptimizationRecommendation[]>(() => {
    // Select subset of available/break volunteers to serve as matching candidates
    const candidates = volunteers.filter(v => v.availabilityStatus === "Available" || v.availabilityStatus === "On Break");
    
    return candidates.slice(0, 15).map((vol, idx) => {
      let skillMatch = 90 - (idx * 2);
      let distance = parseFloat((0.4 + (idx * 0.15)).toFixed(2));
      let distanceWeight = Math.round(100 - (distance * 10));
      let fatigueMitigation = 100 - vol.fatigueScore;
      let reliabilityRating = vol.reliabilityScore;

      // Base weight matches
      let matchScore = 0;
      if (optGoal === "Skill Match") {
        matchScore = Math.round((skillMatch * 0.5) + (reliabilityRating * 0.3) + (fatigueMitigation * 0.2));
      } else if (optGoal === "Distance") {
        matchScore = Math.round((distanceWeight * 0.5) + (skillMatch * 0.3) + (reliabilityRating * 0.2));
      } else if (optGoal === "Fatigue Reduction") {
        matchScore = Math.round((fatigueMitigation * 0.5) + (reliabilityRating * 0.3) + (skillMatch * 0.2));
      } else {
        matchScore = Math.round((skillMatch + distanceWeight + fatigueMitigation + reliabilityRating) / 4);
      }

      // bound limits
      matchScore = Math.min(Math.max(matchScore, 65), 98);

      return {
        volunteer: vol,
        matchScore,
        distance,
        reasoning: {
          skillMatch,
          distanceWeight,
          fatigueMitigation,
          reliabilityRating
        }
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, requiredCount);
  }, [volunteers, optGoal, requiredCount]);

  // Selected Recommendation
  const currentRec = useMemo(() => {
    return recommendations.find(r => r.volunteer.id === selectedRecId) || recommendations[0];
  }, [recommendations, selectedRecId]);

  const triggerOptimization = () => {
    setIsOptimizeModalOpen(true);
    setOptimizerSuccess(false);
    setTimeout(() => {
      setOptimizerSuccess(true);
    }, 1500);
  };

  return (
    <AppShell pageTitle="Workforce Optimization Center">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" /> Workforce Optimization Center
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Linear flow optimization engine matching volunteer capabilities to dynamic field demands.
            </p>
          </div>
        </div>

        {/* 2 column controller structure */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Optimization controls panel */}
          <div className="xl:col-span-4 space-y-4">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4.5 w-4.5 text-primary" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Optimization Controls</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                
                <div>
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold mb-1">Target Sector Zone</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full p-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none"
                  >
                    <option value="S-01">Sangam Ghat (S-01)</option>
                    <option value="S-02">Triveni Point (S-02)</option>
                    <option value="S-03">Ram Ghat (S-03)</option>
                    <option value="S-04">Dasashwamedh (S-04)</option>
                    <option value="S-05">Naini Bridge (S-05)</option>
                    <option value="S-06">Prayag Station (S-06)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold mb-1">Incident Priority Level</label>
                  <select
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value)}
                    className="w-full p-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none"
                  >
                    <option value="Critical">Critical (Immediate dispatch)</option>
                    <option value="High">High priority</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Routine</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold mb-1">Required Volunteers Count</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={requiredCount}
                    onChange={(e) => setRequiredCount(Math.min(15, parseInt(e.target.value) || 1))}
                    className="w-full p-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-foreground-subtle uppercase block font-semibold mb-1">Primary Optimization Goal</label>
                  <select
                    value={optGoal}
                    onChange={(e) => setOptGoal(e.target.value)}
                    className="w-full p-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none"
                  >
                    <option value="Skill Match">Skill Match (Priority)</option>
                    <option value="Distance">Distance (Proximity)</option>
                    <option value="Availability">Availability Index</option>
                    <option value="Fatigue Reduction">Fatigue Mitigation</option>
                    <option value="Balanced Allocation">Balanced Allocation</option>
                  </select>
                </div>

              </div>

              <div className="pt-3">
                <button
                  onClick={triggerOptimization}
                  className="w-full py-2.5 px-4 rounded bg-accent text-white font-bold text-xs shadow-elevated hover:bg-accent/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="h-4 w-4" />
                  AUTO OPTIMIZE DEPLOYMENT
                </button>
              </div>
            </div>

            {/* ALLOCATION IMPACT PANEL */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Allocation Impact Projections</h4>
                <TrendingUp className="h-4.5 w-4.5 text-success" />
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded border border-border/60 bg-background-secondary/40 p-2.5">
                  <span className="text-[9px] text-foreground-subtle block">RESPONSE</span>
                  <span className="text-base font-bold font-mono text-success block mt-0.5">+18%</span>
                  <span className="text-[8px] text-foreground-subtle block">Time reduction</span>
                </div>
                <div className="rounded border border-border/60 bg-background-secondary/40 p-2.5">
                  <span className="text-[9px] text-foreground-subtle block">COVERAGE</span>
                  <span className="text-base font-bold font-mono text-primary block mt-0.5">+22%</span>
                  <span className="text-[8px] text-foreground-subtle block">Duty readiness</span>
                </div>
                <div className="rounded border border-border/60 bg-background-secondary/40 p-2.5">
                  <span className="text-[9px] text-foreground-subtle block">RISK</span>
                  <span className="text-base font-bold font-mono text-success block mt-0.5">-14%</span>
                  <span className="text-[8px] text-foreground-subtle block">Incidents drops</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table list and explainability panel */}
          <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Optimization list table */}
            <div className="lg:col-span-8 rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
                <span>OPTIMIZED ALLOCATION MATCH RESULTS</span>
                <span>GOAL: {optGoal.toUpperCase()}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/60 bg-background-secondary/20 text-foreground-subtle uppercase text-[9px]">
                      <th className="p-3">Volunteer</th>
                      <th className="p-3 text-center">Match</th>
                      <th className="p-3 text-center">Reliability</th>
                      <th className="p-3 text-center">Fatigue</th>
                      <th className="p-3 text-center">Distance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {recommendations.map((rec) => (
                      <tr
                        key={rec.volunteer.id}
                        onClick={() => setSelectedRecId(rec.volunteer.id)}
                        className={`hover:bg-background-secondary/55 cursor-pointer transition-colors ${selectedRecId === rec.volunteer.id ? "bg-primary/5" : ""}`}
                      >
                        <td className="p-3">
                          <p className="font-semibold text-foreground">{rec.volunteer.name}</p>
                          <p className="text-[9px] text-foreground-subtle mt-0.5 font-mono">{rec.volunteer.id} • {rec.volunteer.currentAssignment}</p>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-primary">{rec.matchScore}%</td>
                        <td className="p-3 text-center font-mono text-success">{rec.volunteer.reliabilityScore}%</td>
                        <td className="p-3 text-center font-mono">{rec.volunteer.fatigueScore}%</td>
                        <td className="p-3 text-center font-mono text-foreground-subtle">{rec.distance} km</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* EXPLAINABLE AI PANEL */}
            <div className="lg:col-span-4 space-y-4">
              <CommandCard
                title="Explainable AI Panel"
                subtitle="Decision justification metrics"
                icon={Brain}
                badge={currentRec ? currentRec.volunteer.id : "MATCH"}
              >
                {currentRec ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <span className="text-[9px] text-foreground-subtle block">RECOMMENDED VOLUNTEER</span>
                      <h4 className="text-xs font-bold text-foreground">{currentRec.volunteer.name}</h4>
                      <p className="text-[10px] text-foreground-muted italic leading-relaxed mt-1">
                        &ldquo;{currentRec.volunteer.aiSummary}&rdquo;
                      </p>
                    </div>

                    <div className="border-t border-border/40 pt-3 space-y-2.5 text-xs font-mono">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-foreground">
                        <span>Selection Confidence:</span>
                        <span className="text-primary text-glow text-sm font-bold">{currentRec.matchScore}%</span>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground-subtle flex items-center gap-1"><UserCheck className="h-3.5 w-3.5 text-primary" /> Skill Match</span>
                          <span className="text-foreground font-semibold">{currentRec.reasoning.skillMatch}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground-subtle flex items-center gap-1"><Route className="h-3.5 w-3.5 text-primary" /> Distance Proximity</span>
                          <span className="text-foreground font-semibold">{currentRec.distance} km</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground-subtle flex items-center gap-1"><HeartPulse className="h-3.5 w-3.5 text-warning" /> Fatigue Cap</span>
                          <span className="text-foreground font-semibold">{currentRec.volunteer.fatigueScore}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground-subtle flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-success" /> Reliability History</span>
                          <span className="text-foreground font-semibold">{currentRec.volunteer.reliabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-foreground-muted italic mt-4">Select a volunteer from the matched optimization table to see decision explanations.</p>
                )}
              </CommandCard>
            </div>

          </div>

        </div>

      </div>

      {/* AUTO RESOLVE OPTIMIZER MODAL */}
      <FloatingPanel
        title="Optimizer Deployment Command"
        subtitle="Automatic Workforce Redeployment Command Dispatch"
        isOpen={isOptimizeModalOpen}
        onClose={() => setIsOptimizeModalOpen(false)}
        width="lg"
      >
        <div className="space-y-4">
          {!optimizerSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Calculating Optimal Reallocations...</p>
                <p className="text-xs text-foreground-muted mt-1">Balancing dynamic queue flow constraints and volunteer fatigue curves</p>
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
                  <p className="text-xs font-semibold text-success">Workforce Deployment Rebalanced Successfully</p>
                  <p className="text-[10px] text-success/80">Optimizer algorithms successfully resolved matching dispatches on-site.</p>
                </div>
              </div>

              <div className="rounded bg-background-secondary border border-border p-4 space-y-2">
                <h4 className="text-xs font-semibold text-foreground font-mono">Deployment Impact Output:</h4>
                <ul className="text-xs text-foreground-muted space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong>{requiredCount} Volunteers</strong> reassigned to Zone {selectedSector}.</li>
                  <li>Targeted optimization goals matching profile settings: <strong>{optGoal}</strong>.</li>
                  <li>Expected coverage increase at dispatched zone: <strong>+24% Coverage</strong>.</li>
                  <li>Expected system-level fatigue impact balanced at standard parameters.</li>
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsOptimizeModalOpen(false)}
                  className="px-4 py-2 rounded bg-border hover:bg-border/80 text-xs font-semibold text-foreground transition-all cursor-pointer"
                >
                  Close Command
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </FloatingPanel>

    </AppShell>
  );
}
