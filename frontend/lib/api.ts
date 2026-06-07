import { sectorForecasts, predictiveAlerts } from "./mock-predictions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface DashboardSummary {
  activeVolunteers: number;
  activeIncidents: number;
  readinessScore: number;
  riskLevel: string;
  predictedShortage: number;
  lastUpdated: string;
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  category: "Safety" | "Medical" | "Crowd" | "Logistics";
  severity: "Minor" | "Major" | "Critical";
  sector: string;
  message: string;
  highlighted?: boolean;
}

export interface PredictionsData {
  sectorForecasts: typeof sectorForecasts;
  predictiveAlerts: typeof predictiveAlerts;
  generatedAt: string;
}

// Global hook/state listener callback to update components of connection state
let connectionListeners: ((isConnected: boolean) => void)[] = [];
let lastKnownConnectionState = false; // defaults to false, will resolve to true on successful fetch

export function registerConnectionListener(callback: (isConnected: boolean) => void) {
  connectionListeners.push(callback);
  // Send the current known state immediately
  callback(lastKnownConnectionState);
  return () => {
    connectionListeners = connectionListeners.filter(cb => cb !== callback);
  };
}

function notifyConnectionState(isConnected: boolean) {
  lastKnownConnectionState = isConnected;
  connectionListeners.forEach(cb => cb(isConnected));
}

export function isBackendConnected(): boolean {
  return lastKnownConnectionState;
}

export async function fetchDashboardSummary(): Promise<{ data: DashboardSummary; isFallback: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/dashboard-summary`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Dashboard summary fetch failed");
    const data = await res.json();
    notifyConnectionState(true);
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Using fallback dashboard summary data due to error:", error);
    notifyConnectionState(false);
    return {
      data: {
        activeVolunteers: 487,
        activeIncidents: 4,
        readinessScore: 87,
        riskLevel: "Medium",
        predictedShortage: 22,
        lastUpdated: new Date().toISOString()
      },
      isFallback: true
    };
  }
}

export async function fetchLiveEvents(): Promise<{ data: LiveEvent[]; isFallback: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/live-events`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Live events fetch failed");
    const data = await res.json();
    notifyConnectionState(true);
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Using fallback live events due to error:", error);
    notifyConnectionState(false);
    // Convert templates to match LiveEvent format
    const mockEvents: LiveEvent[] = [
      { id: "ev-1", timestamp: "12:30:15", category: "Safety", severity: "Minor", sector: "S-04", message: "Sector 4: Boundary security scan verified. All nodes stable." },
      { id: "ev-2", timestamp: "12:30:40", category: "Crowd", severity: "Minor", sector: "S-01", message: "Sangam Ghat (S-01): Pedestrian inflow rate matched at 420 pilgrims/min." },
      { id: "ev-3", timestamp: "12:31:05", category: "Medical", severity: "Critical", sector: "S-02", message: "Triveni Point S-02: Dehydration alert triaged. Medical team deployed." },
      { id: "ev-4", timestamp: "12:31:22", category: "Logistics", severity: "Minor", sector: "S-12", message: "Route optimized: Volunteer Shift B reallocated to Phaphamau bridge checkpoint." }
    ];
    return { data: mockEvents, isFallback: true };
  }
}

export async function fetchPredictions(): Promise<{ data: PredictionsData; isFallback: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/predictions`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Predictions fetch failed");
    const data = await res.json();
    notifyConnectionState(true);
    return { data, isFallback: false };
  } catch (error) {
    console.warn("Using fallback predictions data due to error:", error);
    notifyConnectionState(false);
    return {
      data: {
        sectorForecasts,
        predictiveAlerts,
        generatedAt: new Date().toISOString()
      },
      isFallback: true
    };
  }
}
