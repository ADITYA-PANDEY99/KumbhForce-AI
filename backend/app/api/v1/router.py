from fastapi import APIRouter
from app.api.v1.endpoints import session, operations

api_router = APIRouter()

api_router.include_router(session.router, prefix="/auth", tags=["authentication"])
api_router.include_router(operations.router, tags=["operations"])
