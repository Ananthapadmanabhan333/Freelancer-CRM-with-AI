from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from typing import List, Dict
from pydantic import BaseModel
from packages.ai_sdk.service import ai_service
import uuid

router = APIRouter(prefix="/meetings", tags=["meetings"])

class MeetingSummary(BaseModel):
    id: str
    transcript: str
    summary: str
    action_items: List[str]
    sentiment: float

@router.post("/process", response_model=MeetingSummary)
async def process_meeting(
    background_tasks: BackgroundTasks, 
    file: UploadFile = File(...)
):
    """
    Simulates meeting processing:
    1. Ingests audio/video
    2. Transcribes using Whisper (simulated)
    3. Analyzes with AI Service
    4. Updates CRM
    """
    meeting_id = str(uuid.uuid4())
    
    # In a real app, we'd save the file and run a Celery task
    # Here we simulate the AI extraction
    mock_transcript = "We discussed the project milestones and agreed on a $5,000 budget for the first phase."
    insight = ai_service.analyze_client_interaction(mock_transcript)
    
    return MeetingSummary(
        id=meeting_id,
        transcript=mock_transcript,
        summary=insight.summary,
        action_items=insight.next_actions,
        sentiment=insight.sentiment
    )

@router.get("/recent")
async def get_recent_meetings():
    return [
        {
            "id": "1",
            "title": "Discovery Call: Wayne Ent.",
            "date": "2024-03-15T10:00:00Z",
            "sentiment": 0.85
        },
        {
            "id": "2",
            "title": "Strategy Session: Stark Ind.",
            "date": "2024-03-14T14:30:00Z",
            "sentiment": 0.92
        }
    ]
