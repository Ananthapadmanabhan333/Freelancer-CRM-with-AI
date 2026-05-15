from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, JSON, Enum
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class LeadStatus(str, enum.Enum):
    LEAD_CAPTURED = "lead_captured"
    CONTACTED = "contacted"
    DISCOVERY_CALL = "discovery_call"
    PROPOSAL_SENT = "proposal_sent"
    NEGOTIATION = "negotiation"
    CLOSED_WON = "closed_won"
    CLOSED_LOST = "closed_lost"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    clients = relationship("Client", back_populates="owner")

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    company = Column(String, nullable=True)
    relationship_score = Column(Float, default=0.0)
    insights = Column(JSON, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="clients")
    leads = relationship("Lead", back_populates="client")
    invoices = relationship("Invoice", back_populates="client")
    proposals = relationship("Proposal", back_populates="client")

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    status = Column(Enum(LeadStatus), default=LeadStatus.LEAD_CAPTURED)
    probability = Column(Float, default=0.0)
    estimated_value = Column(Float, default=0.0)
    client_id = Column(Integer, ForeignKey("clients.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="leads")

class Proposal(Base):
    __tablename__ = "proposals"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    pricing_details = Column(JSON)
    status = Column(String, default="draft") # draft, sent, accepted, rejected
    client_id = Column(Integer, ForeignKey("clients.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="proposals")

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    currency = Column(String, default="USD")
    status = Column(String, default="pending") # pending, paid, overdue
    due_date = Column(DateTime)
    stripe_invoice_id = Column(String, nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="invoices")

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    scheduled_at = Column(DateTime)
    transcript = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    action_items = Column(JSON, nullable=True)
    sentiment_score = Column(Float, nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class Contract(Base):
    __tablename__ = "contracts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(Text)
    status = Column(String, default="draft") # draft, active, expired
    signed_at = Column(DateTime, nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client")
