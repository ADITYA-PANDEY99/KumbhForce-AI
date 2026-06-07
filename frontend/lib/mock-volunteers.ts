export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  languages: string[];
  certifications: string[];
  experience: string; // e.g. "2 years", "First Mahakumbh", etc.
  currentAssignment: string; // Sector name or "Unassigned"
  currentSectorId: string; // S-01 to S-12 or "None"
  availabilityStatus: "Active" | "Available" | "On Break" | "Deployed";
  readinessScore: number;
  reliabilityScore: number;
  fatigueScore: number;
  operationalValueScore: number;
  aiSummary: string;
}

// Seed names
const firstNames = ["Rahul", "Amit", "Priya", "Sneha", "Rajesh", "Aarav", "Vikram", "Neha", "Anjali", "Sanjay", "Rohan", "Karan", "Aditi", "Shalini", "Sunita", "Manoj", "Vijay", "Deepak", "Ravi", "Jyoti"];
const lastNames = ["Sharma", "Verma", "Singh", "Patel", "Gupta", "Kumar", "Mishra", "Joshi", "Yadav", "Trivedi", "Pandey", "Chatterjee", "Nair", "Reddy", "Mehta", "Chawla", "Saxena", "Sen", "Bose", "Rao"];

const skillPool = ["Crowd Control", "First Aid", "Disaster Management", "Languages", "Logistics coordination", "Emergency Triage", "Information Desk", "Lost & Found Assistance", "VIP Escort"];
const languagePool = ["Hindi", "English", "Sanskrit", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati", "Kannada"];
const certPool = ["Red Cross First Aid", "NDRF Disaster Rescue", "Mahakumbh Marshal Training", "Command Center Operator Cert", "Language Translator Badge"];
const experiencePool = ["3 Mahakumbh Events", "1 Prayagraj Ardh Kumbh", "First-time Volunteer", "2 years field operations", "5 years local community lead"];
const sectorPool = [
  { id: "S-01", name: "Sangam Ghat" },
  { id: "S-02", name: "Triveni Point" },
  { id: "S-03", name: "Ram Ghat" },
  { id: "S-04", name: "Dasashwamedh" },
  { id: "S-05", name: "Naini Bridge" },
  { id: "S-06", name: "Prayag Station" },
  { id: "S-07", name: "Kali Ghat" },
  { id: "S-08", name: "Akshayvat" },
  { id: "S-09", name: "Alopi Bagh" },
  { id: "S-10", name: "Naini Ghat" },
  { id: "S-11", name: "Jhunsi Bridge" },
  { id: "S-12", name: "Phaphamau" }
];

export function generateMockVolunteers(): Volunteer[] {
  const list: Volunteer[] = [];
  for (let i = 1; i <= 500; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${fn} ${ln}`;
    
    // Choose skills (1 to 3)
    const numSkills = Math.floor(Math.random() * 3) + 1;
    const skills: string[] = [];
    while (skills.length < numSkills) {
      const s = skillPool[Math.floor(Math.random() * skillPool.length)];
      if (!skills.includes(s)) skills.push(s);
    }
    
    // Choose languages (1 to 3)
    const numLangs = Math.floor(Math.random() * 3) + 1;
    const languages: string[] = [];
    while (languages.length < numLangs) {
      const l = languagePool[Math.floor(Math.random() * languagePool.length)];
      if (!languages.includes(l)) languages.push(l);
    }

    // Choose certs (0 to 2)
    const numCerts = Math.floor(Math.random() * 3);
    const certifications: string[] = [];
    while (certifications.length < numCerts) {
      const c = certPool[Math.floor(Math.random() * certPool.length)];
      if (!certifications.includes(c)) certifications.push(c);
    }

    const experience = experiencePool[Math.floor(Math.random() * experiencePool.length)];
    
    const assignedSector = Math.random() > 0.35 ? sectorPool[Math.floor(Math.random() * sectorPool.length)] : null;
    const currentAssignment = assignedSector ? assignedSector.name : "Unassigned";
    const currentSectorId = assignedSector ? assignedSector.id : "None";

    const availabilityStatus: Volunteer["availabilityStatus"] = assignedSector 
      ? (Math.random() > 0.2 ? "Active" : "Deployed") 
      : (Math.random() > 0.4 ? "Available" : "On Break");

    // Dynamic metrics
    const readinessScore = Math.floor(Math.random() * 30) + 70; // 70 to 99
    const reliabilityScore = Math.floor(Math.random() * 25) + 75; // 75 to 99
    const fatigueScore = Math.floor(Math.random() * 60) + 20; // 20 to 80
    const operationalValueScore = Math.round((readinessScore + reliabilityScore + (100 - fatigueScore)) / 3);

    // AI suitability summary generator
    const suitability = skills.includes("First Aid") || skills.includes("Emergency Triage") 
      ? "Highly suitable for medical checkpoints and emergency triage operations."
      : skills.includes("Crowd Control") 
      ? "Highly suitable for crowd flow optimization, barrier control, and sector monitoring."
      : "Excellent fit for administrative logging, pilgrim navigation support, or lost-and-found coordination.";

    const reliabilityText = reliabilityScore > 90 
      ? "Demonstrates impeccable shift presence and punctual logins."
      : "Maintains steady communication logs with positive dispatcher feedback.";

    const fatigueWarning = fatigueScore > 70 
      ? "High fatigue detected — rotation highly recommended immediately."
      : "Fatigue level within healthy operational threshold.";

    const aiSummary = `${suitability} ${reliabilityText} ${fatigueWarning}`;

    list.push({
      id: `VOL-${String(i).padStart(4, "0")}`,
      name,
      avatar: "", // Handled on UI with placeholder initials
      skills,
      languages,
      certifications,
      experience,
      currentAssignment,
      currentSectorId,
      availabilityStatus,
      readinessScore,
      reliabilityScore,
      fatigueScore,
      operationalValueScore,
      aiSummary
    });
  }
  return list;
}
