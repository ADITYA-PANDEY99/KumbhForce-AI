from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List, Any

# Token Validation
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    role: str
    full_name: str

class TokenData(BaseModel):
    username: Optional[str] = None

# User Scaffolding
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

# Sector Schemas
class SectorBase(BaseModel):
    name: str
    capacity: int
    current_occupancy: int
    risk_level: str
    lat: float
    lng: float
    readiness_score: float

class SectorOut(SectorBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

# Audit Log Scaffolding
class AuditLogCreate(BaseModel):
    action: str
    entity_affected: str
    payload: Optional[str] = None

class AuditLogOut(BaseModel):
    id: str
    user_id: Optional[str]
    action: str
    entity_affected: str
    ip_address: Optional[str]
    payload: Optional[str]
    timestamp: datetime

    class Config:
        from_attributes = True
