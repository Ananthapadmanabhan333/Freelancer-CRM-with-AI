import os
from typing import List, Optional
from openai import OpenAI
from pydantic import BaseModel

class AIInsight(BaseModel):
    summary: str
    sentiment: float
    next_actions: List[str]
    relationship_score_delta: float

class AIService:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key)

    def analyze_client_interaction(self, interaction_text: str) -> AIInsight:
        """Analyzes client communication to generate insights and relationship scores."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a CRM intelligence engine. Analyze the provided client interaction and return a JSON object with: summary, sentiment (0-1), next_actions (list), and relationship_score_delta (-0.1 to 0.1)."},
                {"role": "user", "content": interaction_text}
            ],
            response_format={"type": "json_object"}
        )
        import json
        data = json.loads(response.choices[0].message.content)
        return AIInsight(**data)

    def generate_proposal_content(self, client_name: str, project_description: str) -> str:
        """Generates a professional proposal based on client and project details."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a world-class proposal strategist. Generate a detailed, persuasive proposal including: Executive Summary, Scope of Work, Deliverables, Timeline, and Pricing Strategy."},
                {"role": "user", "content": f"Client: {client_name}\nProject: {project_description}"}
            ]
        )
        return response.choices[0].message.content

# Singleton instance
ai_service = AIService()
