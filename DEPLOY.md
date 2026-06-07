# KumbhForce AI — Production Deployment Guide

This guide details instructions for preparing and deploying the **KumbhForce AI** (Autonomous Volunteer Operations Command Center) platform to cloud production environments.

---

## 1. Frontend Deployment (Vercel)

The Next.js 15 frontend is optimized for zero-configuration deployments on Vercel.

### Prerequisites
*   Ensure Next.js static build outputs are functional.
*   Setup environment variables in your Vercel project dashboard.

### Environment Variables
Configure the following keys in Vercel:

| Variable | Recommended Value | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://kumbhforce-api.onrender.com` | FastAPI backend target |
| `NEXT_PUBLIC_WS_URL` | `wss://kumbhforce-api.onrender.com/api/v1/ws/telemetry` | Secure WebSocket streams |

### Deployment Steps
1.  Connect your GitHub repository to Vercel.
2.  Set **Framework Preset** to **Next.js**.
3.  Set **Root Directory** to `frontend/`.
4.  Add environment variables, then click **Deploy**.

---

## 2. Backend Deployment (Render)

The FastAPI Python backend can be deployed onto Render as a **Web Service**.

### Environment Variables
Configure the following keys in Render:

| Variable | Recommended Value |
|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host/db` (or SQLite fallback) |
| `JWT_SECRET_KEY` | (Secure hex string generated via `openssl rand -hex 32`) |
| `GEMINI_API_KEY` | (Your Gemini access key) |

### Deployment Configuration
*   **Service Type:** Web Service
*   **Runtime:** Python 3.11+
*   **Build Command:** `pip install -r backend/requirements.txt`
*   **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 10000`

---

## 3. Security Considerations

1.  **JWT Verification:** Rotate the `JWT_SECRET_KEY` routinely. Never commit access keys directly to raw Git logs.
2.  **CORS Headers:** Ensure backend CORS settings restrict headers exclusively to your verified Vercel subdomains instead of `["*"]`.
3.  **Database Migration:** Execute Alembic migration runs (`alembic upgrade head`) before launching backend nodes.
