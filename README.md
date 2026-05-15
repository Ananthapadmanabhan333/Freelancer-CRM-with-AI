# NexusOS: AI-Native Freelancer Intelligence Platform

NexusOS is a comprehensive, enterprise-grade CRM and business operating system designed for freelancers, agencies, and solo entrepreneurs. It leverages multi-agent AI to automate sales, proposals, meetings, and revenue management.

## 🚀 Key Features

- **Multi-Agent Orchestration**: Autonomous agents for Sales, Proposals, Revenue, and Contracts.
- **AI Proposal Studio**: Generate high-converting, interactive proposals in seconds.
- **Sales Intelligence**: Lead scoring, sentiment analysis, and automated follow-ups.
- **Meeting Intelligence**: Automatic transcription, summarization, and CRM synchronization.
- **Revenue Analytics**: Real-time forecasting, cashflow heatmaps, and churn detection.
- **Premium UX**: A cinematic, Linear-style dark mode interface built with Next.js 15.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI.
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Redis.
- **AI**: LangGraph, OpenAI (GPT-4o), Qdrant (Vector DB).
- **Payments**: Stripe.
- **Infrastructure**: Docker, Kubernetes.

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd nexusos
   ```

2. **Setup Backend**:
   ```bash
   cd apps/api
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **Setup Frontend**:
   ```bash
   cd apps/frontend
   npm install
   ```

4. **Environment Variables**:
   Copy `.env.example` to `.env` in both `apps/api` and `apps/frontend` and fill in your credentials.

5. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

## 🏗️ Architecture

NexusOS follows a distributed micro-monolith architecture with a shared state managed by LangGraph.

- `apps/api`: FastAPI backend providing REST and WebSocket interfaces.
- `apps/frontend`: Next.js frontend with React Server Components.
- `packages/agents`: Core AI logic and multi-agent workflows.
- `packages/database`: Shared database schemas and migrations.

## 📄 License
MIT License.
