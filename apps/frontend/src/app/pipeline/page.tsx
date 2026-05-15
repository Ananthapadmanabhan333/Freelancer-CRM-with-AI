"use client";

import { MoreHorizontal, Plus, Search, Filter, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const columns = [
  { id: "lead", title: "Lead Captured", count: 3 },
  { id: "discovery", title: "Discovery Call", count: 2 },
  { id: "proposal", title: "Proposal Sent", count: 4 },
  { id: "negotiation", title: "Negotiation", count: 1 },
  { id: "won", title: "Closed Won", count: 8 },
];

const deals = [
  { id: 1, title: "Website Redesign", client: "Acme Corp", value: "$5,000", status: "proposal", probability: 80 },
  { id: 2, title: "Mobile App Dev", client: "Stark Ind.", value: "$15,000", status: "discovery", probability: 40 },
  { id: 3, title: "Cloud Migration", client: "Wayne Ent.", value: "$25,000", status: "negotiation", probability: 65 },
  { id: 4, title: "UI/UX Audit", client: "Globex", value: "$2,500", status: "lead", probability: 20 },
];

export default function PipelinePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1">Manage your deals and track conversion probabilities.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search deals..." 
              className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Deal
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-80">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{col.title}</h3>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{col.count}</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {deals.filter(d => d.status === col.id).map((deal) => (
                <div key={deal.id} className="p-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{deal.title}</h4>
                    <button className="text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">{deal.client}</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold">{deal.value}</div>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                      <ArrowUpRight className="w-3 h-3" />
                      {deal.probability}%
                    </div>
                  </div>

                  <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-xs">
                Drop here
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
