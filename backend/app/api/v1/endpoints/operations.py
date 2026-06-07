from fastapi import APIRouter
from datetime import datetime
from typing import List, Dict, Any, Optional
import random

router = APIRouter()

# High-quality simulation data mirrors
SECTOR_FORECASTS = {
    "1h": [
        { "sectorId": "S-01", "sectorName": "Sangam Ghat", "currentCrowd": 18500, "expectedCrowd": 21000, "currentVolunteers": 142, "requiredVolunteers": 164, "riskLevel": "High", "volunteerGap": 22, "confidence": 91, "trend": "rising" },
        { "sectorId": "S-02", "sectorName": "Triveni Point", "currentCrowd": 9800, "expectedCrowd": 11500, "currentVolunteers": 98, "requiredVolunteers": 116, "riskLevel": "Critical", "volunteerGap": 18, "confidence": 93, "trend": "rising" },
        { "sectorId": "S-03", "sectorName": "Ram Ghat", "currentCrowd": 6200, "expectedCrowd": 6500, "currentVolunteers": 76, "requiredVolunteers": 70, "riskLevel": "Low", "volunteerGap": 0, "confidence": 88, "trend": "stable" },
        { "sectorId": "S-04", "sectorName": "Dasashwamedh", "currentCrowd": 3100, "expectedCrowd": 3200, "currentVolunteers": 54, "requiredVolunteers": 50, "riskLevel": "Low", "volunteerGap": 0, "confidence": 95, "trend": "stable" }
    ],
    "3h": [
        { "sectorId": "S-01", "sectorName": "Sangam Ghat", "currentCrowd": 18500, "expectedCrowd": 23500, "currentVolunteers": 142, "requiredVolunteers": 180, "riskLevel": "Critical", "volunteerGap": 38, "confidence": 89, "trend": "rising" },
        { "sectorId": "S-02", "sectorName": "Triveni Point", "currentCrowd": 9800, "expectedCrowd": 10500, "currentVolunteers": 98, "requiredVolunteers": 105, "riskLevel": "Medium", "volunteerGap": 7, "confidence": 87, "trend": "stable" },
        { "sectorId": "S-03", "sectorName": "Ram Ghat", "currentCrowd": 6200, "expectedCrowd": 7800, "currentVolunteers": 76, "requiredVolunteers": 90, "riskLevel": "High", "volunteerGap": 14, "confidence": 85, "trend": "rising" },
        { "sectorId": "S-04", "sectorName": "Dasashwamedh", "currentCrowd": 3100, "expectedCrowd": 4500, "currentVolunteers": 54, "requiredVolunteers": 60, "riskLevel": "Medium", "volunteerGap": 6, "confidence": 90, "trend": "rising" }
    ],
    "6h": [
        { "sectorId": "S-01", "sectorName": "Sangam Ghat", "currentCrowd": 18500, "expectedCrowd": 25000, "currentVolunteers": 142, "requiredVolunteers": 200, "riskLevel": "Critical", "volunteerGap": 58, "confidence": 84, "trend": "rising" },
        { "sectorId": "S-02", "sectorName": "Triveni Point", "currentCrowd": 9800, "expectedCrowd": 9000, "currentVolunteers": 98, "requiredVolunteers": 90, "riskLevel": "Low", "volunteerGap": 0, "confidence": 82, "trend": "falling" },
        { "sectorId": "S-03", "sectorName": "Ram Ghat", "currentCrowd": 6200, "expectedCrowd": 8500, "currentVolunteers": 76, "requiredVolunteers": 95, "riskLevel": "High", "volunteerGap": 19, "confidence": 81, "trend": "rising" },
        { "sectorId": "S-04", "sectorName": "Dasashwamedh", "currentCrowd": 3100, "expectedCrowd": 5500, "currentVolunteers": 54, "requiredVolunteers": 75, "riskLevel": "High", "volunteerGap": 21, "confidence": 86, "trend": "rising" }
    ],
    "12h": [
        { "sectorId": "S-01", "sectorName": "Sangam Ghat", "currentCrowd": 18500, "expectedCrowd": 16000, "currentVolunteers": 142, "requiredVolunteers": 130, "riskLevel": "Low", "volunteerGap": 0, "confidence": 79, "trend": "falling" },
        { "sectorId": "S-02", "sectorName": "Triveni Point", "currentCrowd": 9800, "expectedCrowd": 8500, "currentVolunteers": 98, "requiredVolunteers": 85, "riskLevel": "Low", "volunteerGap": 0, "confidence": 78, "trend": "falling" },
        { "sectorId": "S-03", "sectorName": "Ram Ghat", "currentCrowd": 6200, "expectedCrowd": 9000, "currentVolunteers": 76, "requiredVolunteers": 100, "riskLevel": "Critical", "volunteerGap": 24, "confidence": 80, "trend": "rising" },
        { "sectorId": "S-04", "sectorName": "Dasashwamedh", "currentCrowd": 3100, "expectedCrowd": 6200, "currentVolunteers": 54, "requiredVolunteers": 80, "riskLevel": "High", "volunteerGap": 26, "confidence": 83, "trend": "rising" }
    ]
}

PREDICTIVE_ALERTS = [
    { "id": "A-01", "type": "shortage", "message": "Volunteer shortage predicted S-01 Sangam Ghat in next 60 minutes.", "timestamp": "23:15 IST", "severity": "danger" },
    { "id": "A-02", "type": "capacity", "message": "Medical response capacity declining below target SLA bounds in S-02.", "timestamp": "23:08 IST", "severity": "warning" },
    { "id": "A-03", "type": "fatigue", "message": "Fatigue thresholds crossed for 14 active crowd managers at Triveni Point.", "timestamp": "22:55 IST", "severity": "warning" }
]

RAW_EVENT_TEMPLATES = [
    { "category": "Safety", "severity": "Minor", "sector": "S-04", "message": "Sector 4: Boundary security scan verified. All nodes stable." },
    { "category": "Crowd", "severity": "Minor", "sector": "S-01", "message": "Sangam Ghat (S-01): Pedestrian inflow rate matched at 420 pilgrims/min." },
    { "category": "Medical", "severity": "Major", "sector": "S-02", "message": "Triveni Point S-02: Dehydration alert triaged. Medical team deployed." },
    { "category": "Logistics", "severity": "Minor", "sector": "S-12", "message": "Route optimized: Volunteer Shift B reallocated to Phaphamau bridge checkpoint." },
    { "category": "Safety", "severity": "Major", "sector": "S-04", "message": "Incident detected: Security boundary checkpoint anomaly resolved at Dasashwamedh Gate." },
    { "category": "Medical", "severity": "Critical", "sector": "S-03", "message": "Medical response activated: Ram Ghat emergency response unit dispatched to bathing platform 4." },
    { "category": "Crowd", "severity": "Critical", "sector": "S-01", "message": "Sector congestion alert: Sangam Ghat (S-01) density reached 91% capacity threshold." },
    { "category": "Logistics", "severity": "Minor", "sector": "S-02", "message": "Route optimized: Pontoon Bridge 2 flow rerouted to avoid pilgrim bottlenecks." },
    { "category": "Safety", "severity": "Major", "sector": "S-06", "message": "Incident detected: Lost child reported at Sector 6 gate; safety coordinators notified." },
    { "category": "Medical", "severity": "Minor", "sector": "S-08", "message": "Medical response activated: Hydration checkpoint S-08 reports heat fatigue support complete." },
    { "category": "Crowd", "severity": "Major", "sector": "S-02", "message": "Sector congestion alert: Triveni Point (S-02) flow volume exceeds safe guidelines." },
    { "category": "Logistics", "severity": "Minor", "sector": "S-02", "message": "Volunteer dispatched: 8 reserve monitors routed to Triveni Point (S-02) sector." },
    { "category": "Logistics", "severity": "Minor", "sector": "S-01", "message": "Volunteer dispatched: Shift B Team assigned to Sangam S-01 riverbank marshal duty." },
    { "category": "Logistics", "severity": "Minor", "sector": "S-03", "message": "Route optimized: Rerouted Volunteer Team C via pontoon bridge to avoid central congestion." }
]

@router.get("/dashboard-summary")
def get_dashboard_summary():
    return {
        "activeVolunteers": 487,
        "activeIncidents": 4,
        "readinessScore": 87,
        "riskLevel": "Medium",
        "predictedShortage": 22,
        "lastUpdated": datetime.now().isoformat()
    }

@router.get("/live-events")
def get_live_events():
    # Return 15 simulated events
    events = []
    # Make them stable but realistic
    for i in range(15):
        template = RAW_EVENT_TEMPLATES[i % len(RAW_EVENT_TEMPLATES)]
        events.append({
            "id": f"ev-{1000 + i}",
            "timestamp": f"{12 + (i // 60):02}:{i % 60:02}:{(i * 7) % 60:02}",
            "category": template["category"],
            "severity": template["severity"],
            "sector": template["sector"],
            "message": template["message"]
        })
    return events

@router.get("/predictions")
def get_predictions():
    return {
        "sectorForecasts": SECTOR_FORECASTS,
        "predictiveAlerts": PREDICTIVE_ALERTS,
        "generatedAt": datetime.now().isoformat()
    }
