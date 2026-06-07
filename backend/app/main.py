from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import Base, engine

# Ensure tables are built automatically on launch for demo-grade ease
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Policy configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "KumbhForce AI Operations Engine API",
        "version": "1.0.0"
    }

@app.get("/health")
def read_health():
    return {
        "status": "healthy",
        "service": "KumbhForce AI Operations Engine API",
        "version": "1.0.0"
    }
