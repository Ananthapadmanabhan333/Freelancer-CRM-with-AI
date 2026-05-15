from typing import Annotated, List, TypedDict, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], "The messages in the conversation"]
    context: Dict[str, Any]
    next_step: str
    outputs: Dict[str, Any]

class NexusOrchestrator:
    def __init__(self, model_name: str = "gpt-4o"):
        self.llm = ChatOpenAI(model=model_name, streaming=True)
        self.workflow = StateGraph(AgentState)
        self._build_graph()

    def _build_graph(self):
        # Define Nodes
        self.workflow.add_node("sales_agent", self.sales_node)
        self.workflow.add_node("proposal_agent", self.proposal_node)
        self.workflow.add_node("revenue_agent", self.revenue_node)
        self.workflow.add_node("router", self.router_node)

        # Define Edges
        self.workflow.set_entry_point("router")
        self.workflow.add_edge("sales_agent", END)
        self.workflow.add_edge("proposal_agent", END)
        self.workflow.add_edge("revenue_agent", END)

        # Conditional Edges from Router
        self.workflow.add_conditional_edges(
            "router",
            lambda x: x["next_step"],
            {
                "sales": "sales_agent",
                "proposal": "proposal_agent",
                "revenue": "revenue_agent",
                "end": END
            }
        )

    def router_node(self, state: AgentState):
        last_message = state["messages"][-1].content.lower()
        if "proposal" in last_message:
            return {**state, "next_step": "proposal"}
        elif "lead" in last_message or "sale" in last_message:
            return {**state, "next_step": "sales"}
        elif "revenue" in last_message or "forecast" in last_message:
            return {**state, "next_step": "revenue"}
        return {**state, "next_step": "end"}

    async def sales_node(self, state: AgentState):
        prompt = f"Act as a world-class Sales Assistant. Analyze the context and provide lead insights: {state['context']}"
        response = await self.llm.ainvoke(state["messages"] + [HumanMessage(content=prompt)])
        return {**state, "messages": state["messages"] + [response]}

    async def proposal_node(self, state: AgentState):
        prompt = f"Act as a Proposal Strategist. Generate a compelling project proposal based on: {state['context']}"
        response = await self.llm.ainvoke(state["messages"] + [HumanMessage(content=prompt)])
        return {**state, "messages": state["messages"] + [response]}

    async def revenue_node(self, state: AgentState):
        prompt = f"Act as a Revenue Analyst. Forecast business growth based on: {state['context']}"
        response = await self.llm.ainvoke(state["messages"] + [HumanMessage(content=prompt)])
        return {**state, "messages": state["messages"] + [response]}

    def get_executor(self):
        return self.workflow.compile()

# Singleton instance
orchestrator = NexusOrchestrator()
