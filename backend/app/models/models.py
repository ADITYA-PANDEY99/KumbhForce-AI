import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

# Association table for Volunteer - Skill many-to-many relationship
volunteer_skills = Table(
    "volunteer_skills",
    Base.metadata,
    Column("volunteer_id", String, ForeignKey("volunteers.id", ondelete="CASCADE"), primary_key=True),
    Column("skill_id", String, ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True),
    Column("proficiency_level", Integer, default=3)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # Command Center Officer, Sector Coordinator, Event Administrator, Operations Supervisor
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    logs = relationship("AuditLog", back_populates="user")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String, nullable=False)
    entity_affected = Column(String, nullable=False)
    ip_address = Column(String, nullable=True)
    payload = Column(String, nullable=True)  # JSON formatted snapshot
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="logs")

class Sector(Base):
    __tablename__ = "sectors"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    current_occupancy = Column(Integer, nullable=False, default=0)
    risk_level = Column(String, default="Low")  # Low, Medium, High, Critical
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    readiness_score = Column(Float, default=100.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    volunteers = relationship("Volunteer", back_populates="sector")
    deployments = relationship("Deployment", back_populates="sector")
    incidents = relationship("Incident", back_populates="sector")
    predictions = relationship("Prediction", back_populates="sector")

class Volunteer(Base):
    __tablename__ = "volunteers"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    status = Column(String, default="Active")  # Active, Deployed, On Break, Inactive
    fatigue_index = Column(Float, default=0.0)
    reliability_score = Column(Float, default=100.0)
    current_sector_id = Column(String, ForeignKey("sectors.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    sector = relationship("Sector", back_populates="volunteers")
    skills = relationship("Skill", secondary=volunteer_skills, back_populates="volunteers")
    deployments = relationship("Deployment", back_populates="volunteer")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)  # Medical, Crowd Control, Logistics, Language Support, Disaster Response

    volunteers = relationship("Volunteer", secondary=volunteer_skills, back_populates="skills")

class Deployment(Base):
    __tablename__ = "deployments"

    id = Column(String, primary_key=True, default=generate_uuid)
    volunteer_id = Column(String, ForeignKey("volunteers.id", ondelete="CASCADE"))
    sector_id = Column(String, ForeignKey("sectors.id", ondelete="CASCADE"))
    task_description = Column(String, nullable=False)
    status = Column(String, default="Scheduled")  # Scheduled, In Progress, Completed, Cancelled
    started_at = Column(DateTime, nullable=True)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    volunteer = relationship("Volunteer", back_populates="deployments")
    sector = relationship("Sector", back_populates="deployments")
    incidents = relationship("Incident", back_populates="deployment")

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, default="Reported")  # Reported, Assigned, In Progress, Resolved
    severity = Column(String, nullable=False)  # Minor, Major, Critical
    sector_id = Column(String, ForeignKey("sectors.id", ondelete="CASCADE"))
    assigned_deployment_id = Column(String, ForeignKey("deployments.id", ondelete="SET NULL"), nullable=True)
    reported_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    resolved_at = Column(DateTime, nullable=True)

    sector = relationship("Sector", back_populates="incidents")
    deployment = relationship("Deployment", back_populates="incidents")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String, primary_key=True, default=generate_uuid)
    sector_id = Column(String, ForeignKey("sectors.id", ondelete="CASCADE"))
    predicted_metric = Column(String, nullable=False)  # crowd_surge, staffing_shortage
    predicted_value = Column(Float, nullable=False)
    confidence_interval = Column(Float, nullable=False)
    target_timestamp = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    sector = relationship("Sector", back_populates="predictions")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    rationale = Column(String, nullable=False)
    action_type = Column(String, nullable=False)  # Reassign Staff, Activate Reserve
    status = Column(String, default="Pending")  # Pending, Approved, Rejected
    risk_impact = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(String, primary_key=True, default=generate_uuid)
    creator_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    parameters = Column(String, nullable=False)  # JSON formatted inputs
    results = Column(String, nullable=False)     # JSON formatted output metrics
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
