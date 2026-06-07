export interface SimulationHistoryItem {
  id: string;
  timestamp: string;
  type: string;
  inputs: {
    crowdIncrease: number;
    availability: number;
    duration: number;
  };
  outputs: {
    staffingGap: number;
    riskIncrease: number;
    predictedIncidents: number;
  };
}

export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  sources?: string[];
  confidence?: number;
  reasoning?: string;
}

export interface ExecutiveReport {
  id: string;
  title: string;
  date: string;
  type: string;
  readinessScore: number;
  summary: string;
  risksCount: number;
  recommendations: string[];
}

export const mockSimHistory: SimulationHistoryItem[] = [
  {
    id: "SIM-001",
    timestamp: "22:15 IST",
    type: "Crowd Surge Simulation",
    inputs: { crowdIncrease: 30, availability: 95, duration: 4 },
    outputs: { staffingGap: 24, riskIncrease: 18, predictedIncidents: 3 }
  },
  {
    id: "SIM-002",
    timestamp: "21:30 IST",
    type: "Volunteer Absence Spike",
    inputs: { crowdIncrease: 10, availability: 80, duration: 6 },
    outputs: { staffingGap: 42, riskIncrease: 28, predictedIncidents: 6 }
  }
];

export const suggestedQuestions = [
  "Which sectors are at risk?",
  "Show staffing shortages.",
  "Recommend volunteer redeployment.",
  "Predict workforce issues.",
  "Generate operational summary.",
  "Show highest fatigue volunteers."
];

export const copilotDefaultResponse: Record<string, { response: string; sources: string[]; confidence: number; reasoning: string }> = {
  "Which sectors are at risk?": {
    response: "Sector 1 (Sangam Ghat) and Sector 2 (Triveni Point) are currently flagged at Critical and High risk due to high pilgrim ingress density and active barricade dispatches.",
    sources: ["Sector Telemetry Database", "Realtime Crowd Sensors"],
    confidence: 94,
    reasoning: "High density sensor inputs matching historical queue limits."
  },
  "Show staffing shortages.": {
    response: "A total staffing deficit of 40 volunteers is predicted across S-01 and S-02 within the next 90 minutes if crowd flows continue at current rates.",
    sources: ["Staffing Ledger API", "Surge Prediction Engine"],
    confidence: 91,
    reasoning: "Capacity curve projection matched against active volunteer shift schedules."
  },
  "Recommend volunteer redeployment.": {
    response: "Recommended Action: Redeploy 12 crowd-control certified volunteers from Ram Ghat (Sector 3) to Sangam Ghat (Sector 1) to reduce response delay by 18%.",
    sources: ["Workforce Optimizer constraints graph"],
    confidence: 93,
    reasoning: "Shortest transit route routing with compatible volunteer skill profiles."
  },
  "Predict workforce issues.": {
    response: "Expected crowd surge of +18% is projected to trigger fatigue flags for 14 active crowd managers at Triveni Point within 3 hours.",
    sources: ["Fatigue Curve Analytics", "Pilgrim Ingress model"],
    confidence: 89,
    reasoning: "Time-on-duty logs tracking cumulative exhaustion factors."
  },
  "Generate operational summary.": {
    response: "Overall system readiness is stable at 87%. Mapped 12 sectors, 487 active duty volunteers. 4 active critical incidents are in progress.",
    sources: ["Operations Briefing Center", "Active Incident Ledger"],
    confidence: 96,
    reasoning: "Consolidated real-time KPIs summary metrics verification."
  },
  "Show highest fatigue volunteers.": {
    response: "Top fatigued volunteers identified in S-02. Avg fatigue index is at 78/100. Redeployment from Sector 3 is advised.",
    sources: ["Volunteer Profile Ledger", "Fatigue tracker database"],
    confidence: 92,
    reasoning: "Exceeded 6-hour active shift thresholds."
  }
};

export const mockExecReports: ExecutiveReport[] = [
  {
    id: "REP-9081",
    title: "Daily Operations Brief — Shift 2",
    date: "2026-06-06",
    type: "Daily Operations Brief",
    readinessScore: 87,
    summary: "Operations managed successfully across all 12 ghat sectors. Total volunteer logins peaked at 487. Incident response SLA averaged 6.5 minutes.",
    risksCount: 2,
    recommendations: ["Redeploy 12 volunteers to S-01", "Increase gate monitoring at Triveni Pontoon"]
  },
  {
    id: "REP-9082",
    title: "Workforce Readiness & Fatigue Assessment",
    date: "2026-06-05",
    type: "Workforce Readiness Brief",
    readinessScore: 91,
    summary: "Volunteer exhaustion tracking shows positive rotation compliance. 86 volunteers flagged for resting breaks resolved potential burnout risks.",
    risksCount: 0,
    recommendations: ["Maintain 6-hour shift limits", "Activate reserve Unit Alpha during evening peaks"]
  }
];
