"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { generateMockVolunteers, Volunteer } from "@/lib/mock-volunteers";
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle,
  TrendingUp,
  Brain,
  Sliders,
  TrendingDown,
  ChevronRight,
  Shield,
  Activity,
  UserCheck,
  Languages,
  Award,
  Layers,
  HeartPulse,
  Scale
} from "lucide-react";

export default function VolunteerIntelligencePage() {
  const volunteers = useMemo(() => generateMockVolunteers(), []);

  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sortField, setSortField] = useState<"name" | "reliabilityScore" | "fatigueScore" | "operationalValueScore">("reliabilityScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const [selectedVolId, setSelectedVolId] = useState<string>("VOL-0001");
  const [compareVolAId, setCompareVolAId] = useState<string>("VOL-0001");
  const [compareVolBId, setCompareVolBId] = useState<string>("VOL-0002");
  const [activeTab, setActiveTab] = useState<"directory" | "comparison" | "analytics">("directory");

  // All unique lists for filter options
  const uniqueSkills = useMemo(() => {
    const s = new Set<string>();
    volunteers.forEach(v => v.skills.forEach(sk => s.add(sk)));
    return Array.from(s);
  }, [volunteers]);

  const uniqueSectors = useMemo(() => {
    const s = new Set<string>();
    volunteers.forEach(v => {
      if (v.currentAssignment !== "Unassigned") s.add(v.currentAssignment);
    });
    return Array.from(s);
  }, [volunteers]);

  // Selected Volunteer computed properties
  const selectedVolunteer = useMemo(() => {
    return volunteers.find(v => v.id === selectedVolId) || volunteers[0];
  }, [volunteers, selectedVolId]);

  const compVolA = useMemo(() => volunteers.find(v => v.id === compareVolAId) || volunteers[0], [volunteers, compareVolAId]);
  const compVolB = useMemo(() => volunteers.find(v => v.id === compareVolBId) || volunteers[1] || volunteers[0], [volunteers, compareVolBId]);

  // Filtering & Sorting List
  const filteredVolunteers = useMemo(() => {
    return volunteers
      .filter((v) => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = selectedSkill ? v.skills.includes(selectedSkill) : true;
        const matchesStatus = selectedStatus ? v.availabilityStatus === selectedStatus : true;
        const matchesSector = selectedSector ? v.currentAssignment === selectedSector : true;
        return matchesSearch && matchesSkill && matchesStatus && matchesSector;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "string" && typeof valB === "string") {
          return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
        return 0;
      });
  }, [volunteers, searchTerm, selectedSkill, selectedStatus, selectedSector, sortField, sortOrder]);

  // Leaderboard computed
  const leaderboard = useMemo(() => {
    return [...volunteers]
      .sort((a, b) => b.reliabilityScore + b.operationalValueScore - (a.reliabilityScore + a.operationalValueScore))
      .slice(0, 5);
  }, [volunteers]);

  // Heatmap Volunteer Distribution
  const sectorHeatmap = useMemo(() => {
    const distribution: Record<string, { count: number; fatigueAvg: number }> = {};
    volunteers.forEach(v => {
      if (v.currentAssignment !== "Unassigned") {
        if (!distribution[v.currentAssignment]) {
          distribution[v.currentAssignment] = { count: 0, fatigueAvg: 0 };
        }
        distribution[v.currentAssignment].count += 1;
        distribution[v.currentAssignment].fatigueAvg += v.fatigueScore;
      }
    });
    return Object.entries(distribution).map(([sectorName, data]) => ({
      name: sectorName,
      count: data.count,
      fatigue: Math.round(data.fatigueAvg / data.count)
    })).sort((a, b) => b.count - a.count);
  }, [volunteers]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <AppShell pageTitle="Volunteer Intelligence Center">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Volunteer Intelligence Center
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Analyze performance indices, fatigue metrics, skill sets, and compare live operational profiles.
            </p>
          </div>
          
          {/* Tabs Control */}
          <div className="flex border border-border rounded-lg overflow-hidden bg-background-secondary p-1 shrink-0 self-start">
            {[
              { id: "directory", label: "Intel Directory", icon: Users },
              { id: "comparison", label: "Side-by-Side compare", icon: Scale },
              { id: "analytics", label: "Distribution Heatmap", icon: Layers }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${activeTab === tab.id ? "bg-primary text-white shadow-elevated" : "text-foreground-muted hover:text-foreground"}`}
                >
                  <TabIcon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: DIRECTORY SECTION */}
          {activeTab === "directory" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-6"
            >
              {/* Directory search and filters sidebar */}
              <div className="xl:col-span-8 space-y-4">
                
                {/* Controls Bar */}
                <div className="rounded-lg p-4 bg-card border border-border space-y-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground-subtle" />
                      <input
                        type="text"
                        placeholder="Search volunteers by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-md bg-background-secondary border border-border text-xs text-foreground placeholder-foreground-subtle focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="px-3 py-2 rounded-md bg-background-secondary border border-border text-xs text-foreground focus:outline-none"
                      >
                        <option value="">All Skills</option>
                        {uniqueSkills.map(sk => <option key={sk} value={sk}>{sk}</option>)}
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 rounded-md bg-background-secondary border border-border text-xs text-foreground focus:outline-none"
                      >
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Available">Available</option>
                        <option value="On Break">On Break</option>
                        <option value="Deployed">Deployed</option>
                      </select>

                      <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="px-3 py-2 rounded-md bg-background-secondary border border-border text-xs text-foreground focus:outline-none"
                      >
                        <option value="">All Sectors</option>
                        {uniqueSectors.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Sorters */}
                  <div className="flex items-center gap-4 text-xs border-t border-border/40 pt-2 text-foreground-subtle">
                    <span className="font-semibold uppercase text-[10px]">Sort by:</span>
                    <button onClick={() => handleSort("name")} className={`hover:text-foreground flex items-center gap-1 cursor-pointer ${sortField === "name" ? "text-primary font-bold" : ""}`}>
                      Name <ArrowUpDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleSort("reliabilityScore")} className={`hover:text-foreground flex items-center gap-1 cursor-pointer ${sortField === "reliabilityScore" ? "text-primary font-bold" : ""}`}>
                      Reliability <ArrowUpDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleSort("fatigueScore")} className={`hover:text-foreground flex items-center gap-1 cursor-pointer ${sortField === "fatigueScore" ? "text-primary font-bold" : ""}`}>
                      Fatigue <ArrowUpDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleSort("operationalValueScore")} className={`hover:text-foreground flex items-center gap-1 cursor-pointer ${sortField === "operationalValueScore" ? "text-primary font-bold" : ""}`}>
                      Operational Value <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Directory List Container */}
                <div className="rounded-lg border border-border bg-card overflow-hidden max-h-[600px] overflow-y-auto">
                  <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
                    <span>SHOWING {filteredVolunteers.length} OF 500 PROFILES</span>
                    <span>CLICK ROW TO LOAD INTELLIGENCE PROFILE</span>
                  </div>
                  
                  <div className="divide-y divide-border/60">
                    {filteredVolunteers.slice(0, 50).map((vol) => (
                      <div
                        key={vol.id}
                        onClick={() => setSelectedVolId(vol.id)}
                        className={`flex items-center justify-between p-3.5 cursor-pointer transition-all ${selectedVolId === vol.id ? "bg-primary/10 border-l-2 border-primary" : "hover:bg-background-secondary/50"}`}
                        role="button"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                            {vol.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{vol.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-foreground-subtle mt-0.5">
                              <span>{vol.id}</span>
                              <span>•</span>
                              <span>{vol.currentAssignment}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Badges */}
                          <div className="hidden sm:flex items-center gap-1.5">
                            {vol.skills.slice(0, 2).map((sk) => (
                              <span key={sk} className="text-[9px] px-1.5 py-0.5 rounded bg-border text-foreground-muted">
                                {sk}
                              </span>
                            ))}
                          </div>

                          {/* Scores */}
                          <div className="flex items-center gap-3 font-mono text-xs text-right">
                            <div>
                              <span className="text-[9px] text-foreground-subtle block">FATIGUE</span>
                              <span className={`font-bold ${vol.fatigueScore > 70 ? "text-danger" : vol.fatigueScore > 45 ? "text-warning" : "text-success"}`}>{vol.fatigueScore}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-foreground-subtle block">OP VALUE</span>
                              <span className="font-bold text-primary">{vol.operationalValueScore}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-foreground-subtle" />
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredVolunteers.length === 0 && (
                      <div className="p-8 text-center text-xs text-foreground-muted">
                        No volunteer matching selected intelligence criteria found.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* PROFILE INTELLIGENCE PANEL (xl:col-span-4) */}
              <div className="xl:col-span-4 space-y-6">
                
                {/* VOLUNTEER INTERACTIVE PROFILE */}
                <div className="rounded-lg border border-border bg-card p-5 space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-lg text-primary shadow-glow">
                        {selectedVolunteer.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground leading-tight">{selectedVolunteer.name}</h3>
                        <p className="text-[10px] text-foreground-subtle mt-0.5 font-mono">{selectedVolunteer.id}</p>
                      </div>
                    </div>
                    
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      selectedVolunteer.availabilityStatus === "Active" ? "bg-primary/10 text-primary border border-primary/20" :
                      selectedVolunteer.availabilityStatus === "Deployed" ? "bg-danger/10 text-danger border border-danger/20" :
                      selectedVolunteer.availabilityStatus === "On Break" ? "bg-warning/10 text-warning border border-warning/20" :
                      "bg-success/10 text-success border border-success/20"
                    }`}>
                      {selectedVolunteer.availabilityStatus}
                    </span>
                  </div>

                  {/* Summary Profile Detail Fields */}
                  <div className="grid grid-cols-2 gap-3.5 text-xs border-y border-border/50 py-3.5">
                    <div>
                      <span className="text-[9px] text-foreground-subtle block mb-0.5">CURRENT SECTOR</span>
                      <span className="font-medium text-foreground flex items-center gap-1">
                        <Shield className="h-3 w-3 text-primary" /> {selectedVolunteer.currentAssignment}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-foreground-subtle block mb-0.5">EXPERIENCE</span>
                      <span className="font-medium text-foreground">{selectedVolunteer.experience}</span>
                    </div>
                  </div>

                  {/* Skills & Langs list */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-subtle flex items-center gap-1.5 mb-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-primary" /> SKILL COMPLIANCE MATRIX
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVolunteer.skills.map(sk => (
                          <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-background-secondary border border-border text-foreground">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-foreground-subtle flex items-center gap-1.5 mb-1.5">
                        <Languages className="h-3.5 w-3.5 text-primary" /> LANGUAGES SECURED
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVolunteer.languages.map(lang => (
                          <span key={lang} className="text-[10px] px-2 py-0.5 rounded bg-background-secondary border border-border text-foreground">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedVolunteer.certifications.length > 0 && (
                      <div>
                        <span className="text-[10px] font-semibold text-foreground-subtle flex items-center gap-1.5 mb-1.5">
                          <Award className="h-3.5 w-3.5 text-warning" /> VERIFIED CERTIFICATIONS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedVolunteer.certifications.map(cert => (
                            <span key={cert} className="text-[9px] px-2 py-0.5 rounded bg-warning/10 border border-warning/20 text-warning">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* INTELLIGENCE SCORECARDS (4 Indicators) */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Score card 1 */}
                  <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                    <span className="text-[10px] text-foreground-subtle block uppercase font-bold">Readiness Score</span>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold font-mono text-foreground">{selectedVolunteer.readinessScore}%</span>
                      <span className="text-[9px] font-semibold text-success flex items-center gap-0.5"><TrendingUp className="h-2.5 w-2.5" /> Stable</span>
                    </div>
                    <div className="w-full bg-border h-1 rounded-full overflow-hidden mt-1">
                      <div className="bg-primary h-full" style={{ width: `${selectedVolunteer.readinessScore}%` }} />
                    </div>
                  </div>

                  {/* Score card 2 */}
                  <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                    <span className="text-[10px] text-foreground-subtle block uppercase font-bold">Reliability Score</span>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold font-mono text-foreground">{selectedVolunteer.reliabilityScore}%</span>
                      <span className="text-[9px] font-semibold text-success flex items-center gap-0.5"><TrendingUp className="h-2.5 w-2.5" /> High</span>
                    </div>
                    <div className="w-full bg-border h-1 rounded-full overflow-hidden mt-1">
                      <div className="bg-success h-full" style={{ width: `${selectedVolunteer.reliabilityScore}%` }} />
                    </div>
                  </div>

                  {/* Score card 3 */}
                  <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                    <span className="text-[10px] text-foreground-subtle block uppercase font-bold">Fatigue Index</span>
                    <div className="flex items-end justify-between">
                      <span className={`text-xl font-bold font-mono ${selectedVolunteer.fatigueScore > 70 ? "text-danger" : "text-foreground"}`}>{selectedVolunteer.fatigueScore}%</span>
                      <span className={`text-[9px] font-semibold flex items-center gap-0.5 ${selectedVolunteer.fatigueScore > 70 ? "text-danger" : "text-success"}`}>
                        {selectedVolunteer.fatigueScore > 70 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />} Check
                      </span>
                    </div>
                    <div className="w-full bg-border h-1 rounded-full overflow-hidden mt-1">
                      <div className={`h-full ${selectedVolunteer.fatigueScore > 70 ? "bg-danger" : selectedVolunteer.fatigueScore > 45 ? "bg-warning" : "bg-success"}`} style={{ width: `${selectedVolunteer.fatigueScore}%` }} />
                    </div>
                  </div>

                  {/* Score card 4 */}
                  <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                    <span className="text-[10px] text-foreground-subtle block uppercase font-bold">Operational Value</span>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold font-mono text-primary text-glow">{selectedVolunteer.operationalValueScore}%</span>
                      <span className="text-[9px] font-mono text-foreground-subtle">Index rating</span>
                    </div>
                    <div className="w-full bg-border h-1 rounded-full overflow-hidden mt-1">
                      <div className="bg-primary h-full" style={{ width: `${selectedVolunteer.operationalValueScore}%` }} />
                    </div>
                  </div>

                </div>

                {/* AI SUMMARY PANEL */}
                <div className="rounded-lg p-5 bg-gradient-to-br from-primary/10 via-card to-background border border-primary/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4.5 w-4.5 text-primary" />
                    <h4 className="text-xs font-bold text-foreground">AI Intelligence Attribution</h4>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {selectedVolunteer.aiSummary}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-foreground-subtle font-mono pt-1">
                    <span>MODEL CONFIDENCE: 94.2%</span>
                    <span>ATTRIBUTION RUN LIVE</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: COMPARISON SECTION */}
          {activeTab === "comparison" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Comparator selectors */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-card border border-border p-4">
                <div>
                  <label className="text-[10px] font-bold text-foreground-subtle block mb-1">COMPARE VOLUNTEER A</label>
                  <select
                    value={compareVolAId}
                    onChange={(e) => setCompareVolAId(e.target.value)}
                    className="w-full p-2.5 rounded-md bg-background-secondary border border-border text-xs text-foreground focus:outline-none"
                  >
                    {volunteers.slice(0, 30).map(v => <option key={v.id} value={v.id}>{v.name} ({v.id})</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-foreground-subtle block mb-1">COMPARE VOLUNTEER B</label>
                  <select
                    value={compareVolBId}
                    onChange={(e) => setCompareVolBId(e.target.value)}
                    className="w-full p-2.5 rounded-md bg-background-secondary border border-border text-xs text-foreground focus:outline-none"
                  >
                    {volunteers.slice(0, 30).map(v => <option key={v.id} value={v.id}>{v.name} ({v.id})</option>)}
                  </select>
                </div>
              </div>

              {/* Side by side stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Volunteer A */}
                <div className="rounded-lg bg-card border border-border p-6 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-full flex items-center justify-center font-mono text-xs text-primary/40 font-bold border-l border-b border-primary/10">A</div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {compVolA.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{compVolA.name}</h4>
                      <p className="text-[10px] text-foreground-subtle mt-0.5">{compVolA.id} • {compVolA.currentAssignment}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    {[
                      { label: "Readiness Index", value: compVolA.readinessScore, color: "text-primary" },
                      { label: "Reliability Index", value: compVolA.reliabilityScore, color: "text-success" },
                      { label: "Fatigue Loading", value: compVolA.fatigueScore, color: compVolA.fatigueScore > 70 ? "text-danger" : "text-warning" },
                      { label: "Operational Value", value: compVolA.operationalValueScore, color: "text-primary" }
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-foreground-muted">{stat.label}</span>
                          <span className={`font-bold ${stat.color}`}>{stat.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-border overflow-hidden">
                          <div className={`h-full ${stat.color.replace("text-", "bg-")}`} style={{ width: `${stat.value}%` }} />
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-border/40 space-y-2.5 text-xs">
                      <div>
                        <span className="text-[10px] text-foreground-subtle block font-semibold">SKILLS MATRIX</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {compVolA.skills.map(s => <span key={s} className="text-[9px] px-1.5 py-0.5 bg-background border border-border rounded text-foreground">{s}</span>)}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-[10px] text-foreground-subtle block font-semibold">CERTIFICATIONS</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {compVolA.certifications.map(c => <span key={c} className="text-[9px] px-1.5 py-0.5 bg-warning/10 border border-warning/20 rounded text-warning">{c}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Volunteer B */}
                <div className="rounded-lg bg-card border border-border p-6 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-full flex items-center justify-center font-mono text-xs text-primary/40 font-bold border-l border-b border-primary/10">B</div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {compVolB.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{compVolB.name}</h4>
                      <p className="text-[10px] text-foreground-subtle mt-0.5">{compVolB.id} • {compVolB.currentAssignment}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    {[
                      { label: "Readiness Index", value: compVolB.readinessScore, color: "text-primary" },
                      { label: "Reliability Index", value: compVolB.reliabilityScore, color: "text-success" },
                      { label: "Fatigue Loading", value: compVolB.fatigueScore, color: compVolB.fatigueScore > 70 ? "text-danger" : "text-warning" },
                      { label: "Operational Value", value: compVolB.operationalValueScore, color: "text-primary" }
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-foreground-muted">{stat.label}</span>
                          <span className={`font-bold ${stat.color}`}>{stat.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-border overflow-hidden">
                          <div className={`h-full ${stat.color.replace("text-", "bg-")}`} style={{ width: `${stat.value}%` }} />
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-border/40 space-y-2.5 text-xs">
                      <div>
                        <span className="text-[10px] text-foreground-subtle block font-semibold">SKILLS MATRIX</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {compVolB.skills.map(s => <span key={s} className="text-[9px] px-1.5 py-0.5 bg-background border border-border rounded text-foreground">{s}</span>)}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-foreground-subtle block font-semibold">CERTIFICATIONS</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {compVolB.certifications.map(c => <span key={c} className="text-[9px] px-1.5 py-0.5 bg-warning/10 border border-warning/20 rounded text-warning">{c}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: HEATMAP & LEADERBOARD VIEW */}
          {activeTab === "analytics" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-6"
            >
              
              {/* Sector heatmap grid */}
              <div className="xl:col-span-8 space-y-4">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground mb-4">Live Sector Distribution Matrix</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {sectorHeatmap.map((item, idx) => (
                      <div key={idx} className="rounded-md border border-border bg-background-secondary p-4 space-y-3 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 h-1.5 left-0 ${item.fatigue > 60 ? "bg-danger" : item.fatigue > 45 ? "bg-warning" : "bg-success"}`} />
                        <div>
                          <span className="text-[10px] text-foreground-subtle uppercase block font-semibold">SECTOR</span>
                          <span className="text-xs font-bold text-foreground">{item.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div>
                            <span className="text-[9px] text-foreground-subtle block">VOLUNTEERS</span>
                            <span className="font-bold text-foreground">{item.count}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-foreground-subtle block">AVG FATIGUE</span>
                            <span className={`font-bold ${item.fatigue > 60 ? "text-danger" : "text-foreground"}`}>{item.fatigue}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Volunteer Leaderboard */}
              <div className="xl:col-span-4 space-y-4">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground mb-4">Top Operational Performers</h3>
                  
                  <div className="space-y-3">
                    {leaderboard.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-md bg-background-secondary border border-border/60">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-primary w-5 text-center">#{idx + 1}</span>
                          <div>
                            <p className="text-xs font-bold text-foreground">{item.name}</p>
                            <p className="text-[10px] text-foreground-subtle mt-0.5">{item.id} • {item.currentAssignment}</p>
                          </div>
                        </div>
                        <div className="text-right font-mono text-xs">
                          <span className="text-[9px] text-foreground-subtle block">SCORE</span>
                          <span className="font-bold text-primary">{item.reliabilityScore + item.operationalValueScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </AppShell>
  );
}
