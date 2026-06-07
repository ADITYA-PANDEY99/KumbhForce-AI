# KumbhForce AI
> **"Synchronizing humanity at scale: Autonomous volunteer coordination and spatial intelligence for the world's largest gathering."**
> **Planned, Designed & Built by Aditya Pandey**

KumbhForce AI is an AI-powered volunteer command and operations intelligence platform designed to manage the extreme logistics of the Mahakumbh. It acts as a predictive warm room, coordinating thousands of volunteers across a shifting floodplain to ensure pilgrim safety, fast emergency medical responses, and crowd bottleneck prevention.

---

## 🚀 Key Features

*   **Digital Command Twin (`/`):** Real-time spatial tracking of the 12 active sectors of the Mahakumbh with a Live Operations Feed panel streaming alerts.
*   **Workforce Optimizer (`/optimizer`):** A constraint-aware matching system built on a linear program solver that matches volunteers based on skillsets, proximity distance, and fatigue levels.
*   **Scenario Stress Simulator (`/simulator`):** A flagship sandbox sandbox allowing commanders to stress-test capacity and view risk curves on an interactive SVG Capacity Forecast Trend Chart.
*   **AI Operations Copilot (`/copilot`):** A decision-support chatbot returning confidence scores, estimated response times, and executable routing buttons.
*   **Executive Impact Dashboard (`/briefings`):** A performance analyzer displaying Before vs. After AI optimization metrics.

---

## 🛠️ System Architecture

1.  **Telemetry Inputs:** Live pilgrim density metrics, GPS coordinates, and medical feeds.
2.  **AI Decision Layer:** Computes sector threat scores and responder SLA targets.
3.  **Optimization Engine:** Evaluates volunteer capacity constraints using a linear flow network solver.
4.  **UI Visualization:** Next.js 15 App Router running a premium, responsive **Dark Aurora** theme.

---

## 💻 Tech Stack

*   **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, Framer Motion
*   **Backend:** FastAPI, Python, PostgreSQL/SQLite, SQLAlchemy, Alembic
*   **Solvers:** Linear programming constraints matching algorithm

---

## ⚙️ Setup & Installation

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   alembic upgrade head
   ```
5. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## 🌐 Deployment Details

*   **Frontend Deployment:** Configured for Vercel
*   **Backend Deployment:** Configured for Render (FastAPI ASGI startup)

---
*Planned, Designed & Built by Aditya Pandey.*
