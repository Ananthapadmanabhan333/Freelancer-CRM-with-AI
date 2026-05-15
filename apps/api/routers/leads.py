from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/leads", tags=["leads"])

class LeadSchema(BaseModel):
    id: int
    title: str
    status: str
    probability: float
    estimated_value: float
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[LeadSchema])
async def get_leads():
    # Mock data for now, will connect to DB later
    return [
        {
            "id": 1,
            "title": "Website Redesign - Acme Corp",
            "status": "proposal_sent",
            "probability": 0.75,
            "estimated_value": 5000.0,
            "created_at": datetime.utcnow()
        },
        {
            "id": 2,
            "title": "Mobile App Dev - Stark Industries",
            "status": "discovery_call",
            "probability": 0.4,
            "estimated_value": 15000.0,
            "created_at": datetime.utcnow()
        }
    ]

@router.post("/")
async def create_lead(lead: LeadSchema):
    return {"message": "Lead created successfully", "lead": lead}
