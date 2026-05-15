from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict

from apps.api.routers import leads, meetings

app = FastAPI(
    title="NexusOS API",
    description="Enterprise-grade AI-powered Freelancer CRM API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(leads.router, prefix="/v1")
app.include_router(meetings.router, prefix="/v1")

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "NexusOS Intelligence Engine is running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
