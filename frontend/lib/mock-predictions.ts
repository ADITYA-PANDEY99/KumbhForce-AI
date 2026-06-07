export interface SectorForecast {
  sectorId: string;
  sectorName: string;
  currentCrowd: number;
  expectedCrowd: number;
  currentVolunteers: number;
  requiredVolunteers: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  volunteerGap: number;
  confidence: number;
  trend: "rising" | "stable" | "falling";
}

export interface PredictiveAlert {
  id: string;
  type: "shortage" | "capacity" | "fatigue";
  message: string;
  timestamp: string;
  severity: "info" | "warning" | "danger";
}

export interface IncidentRecord {
  id: string;
  title: string;
  type: "Medical Emergency" | "Crowd Surge" | "Lost Person" | "Security Concern" | "Infrastructure Issue";
  severity: "Minor" | "Major" | "Critical";
  sectorId: string;
  sectorName: string;
  description: string;
  status: "Reported" | "Assigned" | "Responding" | "Resolved";
  reportedAt: string;
  assignedTeam: string[];
  responseTimeMin: number;
  aiIntervention: boolean;
}

export const mockIncidentsData: IncidentRecord[] = [
  {
    id: "INC-9104",
    title: "Cardiac Distress near Triveni Pontoon",
    type: "Medical Emergency",
    severity: "Critical",
    sectorId: "S-02",
    sectorName: "Triveni Point",
    description: "Pilgrim reports chest pains and breathing difficulty near checkpoint 4B.",
    status: "Responding",
    reportedAt: "23:05 IST",
    assignedTeam: ["VOL-0102 (First Aid Lead)", "VOL-0214 (Emergency Triage)", "VOL-0337 (Logistics)"],
    responseTimeMin: 4,
    aiIntervention: true
  },
  {
    id: "INC-9105",
    title: "Ghat Gate 3 Crowding",
    type: "Crowd Surge",
    severity: "Critical",
    sectorId: "S-01",
    sectorName: "Sangam Ghat",
    description: "Sudden arrival of incoming shuttle wave leading to dense crowd build-up at barrier entry.",
    status: "Assigned",
    assignedTeam: ["VOL-0012 (Crowd Control)", "VOL-0086 (Crowd Control)", "VOL-0115 (Logistics)"],
    reportedAt: "22:58 IST",
    responseTimeMin: 6,
    aiIntervention: true
  },
  {
    id: "INC-9106",
    title: "Lost Child at Sangam Sector 1",
    type: "Lost Person",
    severity: "Minor",
    sectorId: "S-01",
    sectorName: "Sangam Ghat",
    description: "7-year-old child wearing a red jacket separated from family near the bathing stage.",
    status: "Reported",
    assignedTeam: [],
    reportedAt: "23:10 IST",
    responseTimeMin: 2,
    aiIntervention: false
  },
  {
    id: "INC-9102",
    title: "Barricade Damage Checkpoint 7",
    type: "Infrastructure Issue",
    severity: "Major",
    sectorId: "S-07",
    sectorName: "Kali Ghat",
    description: "Pontoon bridge exit gate bracket partially broken under foot traffic.",
    status: "Resolved",
    assignedTeam: ["VOL-0092 (Logistics Coordinator)"],
    reportedAt: "21:40 IST",
    responseTimeMin: 12,
    aiIntervention: true
  }
];

export const sectorForecasts: Record<string, SectorForecast[]> = {
  "1h": [
    { sectorId: "S-01", sectorName: "Sangam Ghat", currentCrowd: 18500, expectedCrowd: 21000, currentVolunteers: 142, requiredVolunteers: 164, riskLevel: "High", volunteerGap: 22, confidence: 91, trend: "rising" },
    { sectorId: "S-02", sectorName: "Triveni Point", currentCrowd: 9800, expectedCrowd: 11500, currentVolunteers: 98, requiredVolunteers: 116, riskLevel: "Critical", volunteerGap: 18, confidence: 93, trend: "rising" },
    { sectorId: "S-03", sectorName: "Ram Ghat", currentCrowd: 6200, expectedCrowd: 6500, currentVolunteers: 76, requiredVolunteers: 70, riskLevel: "Low", volunteerGap: 0, confidence: 88, trend: "stable" },
    { sectorId: "S-04", sectorName: "Dasashwamedh", currentCrowd: 3100, expectedCrowd: 3200, currentVolunteers: 54, requiredVolunteers: 50, riskLevel: "Low", volunteerGap: 0, confidence: 95, trend: "stable" }
  ],
  "3h": [
    { sectorId: "S-01", sectorName: "Sangam Ghat", currentCrowd: 18500, expectedCrowd: 23500, currentVolunteers: 142, requiredVolunteers: 180, riskLevel: "Critical", volunteerGap: 38, confidence: 89, trend: "rising" },
    { sectorId: "S-02", sectorName: "Triveni Point", currentCrowd: 9800, expectedCrowd: 10500, currentVolunteers: 98, requiredVolunteers: 105, riskLevel: "Medium", volunteerGap: 7, confidence: 87, trend: "stable" },
    { sectorId: "S-03", sectorName: "Ram Ghat", currentCrowd: 6200, expectedCrowd: 7800, currentVolunteers: 76, requiredVolunteers: 90, riskLevel: "High", volunteerGap: 14, confidence: 85, trend: "rising" },
    { sectorId: "S-04", sectorName: "Dasashwamedh", currentCrowd: 3100, expectedCrowd: 4500, currentVolunteers: 54, requiredVolunteers: 60, riskLevel: "Medium", volunteerGap: 6, confidence: 90, trend: "rising" }
  ],
  "6h": [
    { sectorId: "S-01", sectorName: "Sangam Ghat", currentCrowd: 18500, expectedCrowd: 25000, currentVolunteers: 142, requiredVolunteers: 200, riskLevel: "Critical", volunteerGap: 58, confidence: 84, trend: "rising" },
    { sectorId: "S-02", sectorName: "Triveni Point", currentCrowd: 9800, expectedCrowd: 9000, currentVolunteers: 98, requiredVolunteers: 90, riskLevel: "Low", volunteerGap: 0, confidence: 82, trend: "falling" },
    { sectorId: "S-03", sectorName: "Ram Ghat", currentCrowd: 6200, expectedCrowd: 8500, currentVolunteers: 76, requiredVolunteers: 95, riskLevel: "High", volunteerGap: 19, confidence: 81, trend: "rising" },
    { sectorId: "S-04", sectorName: "Dasashwamedh", currentCrowd: 3100, expectedCrowd: 5500, currentVolunteers: 54, requiredVolunteers: 75, riskLevel: "High", volunteerGap: 21, confidence: 86, trend: "rising" }
  ],
  "12h": [
    { sectorId: "S-01", sectorName: "Sangam Ghat", currentCrowd: 18500, expectedCrowd: 16000, currentVolunteers: 142, requiredVolunteers: 130, riskLevel: "Low", volunteerGap: 0, confidence: 79, trend: "falling" },
    { sectorId: "S-02", sectorName: "Triveni Point", currentCrowd: 9800, expectedCrowd: 8500, currentVolunteers: 98, requiredVolunteers: 85, riskLevel: "Low", volunteerGap: 0, confidence: 78, trend: "falling" },
    { sectorId: "S-03", sectorName: "Ram Ghat", currentCrowd: 6200, expectedCrowd: 9000, currentVolunteers: 76, requiredVolunteers: 100, riskLevel: "Critical", volunteerGap: 24, confidence: 80, trend: "rising" },
    { sectorId: "S-04", sectorName: "Dasashwamedh", currentCrowd: 3100, expectedCrowd: 6200, currentVolunteers: 54, requiredVolunteers: 80, riskLevel: "High", volunteerGap: 26, confidence: 83, trend: "rising" }
  ]
};

export const predictiveAlerts: PredictiveAlert[] = [
  { id: "A-01", type: "shortage", message: "Volunteer shortage predicted S-01 Sangam Ghat in next 60 minutes.", timestamp: "23:15 IST", severity: "danger" },
  { id: "A-02", type: "capacity", message: "Medical response capacity declining below target SLA bounds in S-02.", timestamp: "23:08 IST", severity: "warning" },
  { id: "A-03", type: "fatigue", message: "Fatigue thresholds crossed for 14 active crowd managers at Triveni Point.", timestamp: "22:55 IST", severity: "warning" }
];
