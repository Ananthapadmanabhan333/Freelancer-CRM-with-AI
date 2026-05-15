"use client";

import { Zap, Play, Settings2, Trash2, Plus, Sparkles, SwitchCamera as Switch } from "lucide-react";

const workflows = [
  { 
    id: 1, 
    name: "Auto-Followup: Proposal", 
    trigger: "Proposal Sent", 
    action: "Send AI nudge after 3 days",
    status: true,
    executions: 42
  },
  { 
    id: 2, 
    name: "Meeting Summarizer", 
    trigger: "Zoom Recording Finished", 
    action: "Extract action items & update CRM",
    status: true,
    executions: 128
  },
  { 
    id: 3, 
    name: "Payment Reminder", 
    trigger: "Invoice Overdue (2 days)", 
    action: "Send polite reminder via WhatsApp",
    status: false,
    executions: 15
  },
  { 
    id: 4, 
    name: "Lead Enrichment", 
    trigger: "New Lead Added", 
    action: "Scrape LinkedIn & Company Website",
    status: true,
    executions: 89
  },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation Workflows</h1>
          <p className="text-muted-foreground mt-1">Autonomous triggers that run your business while you sleep.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((w) => (
          <div key={w.id} className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm relative group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${w.status ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{w.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      Trigger: {w.trigger}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${w.status ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span className="text-xs font-medium text-muted-foreground">{w.status ? 'Active' : 'Paused'}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 mb-6">
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Action
              </div>
              <p className="text-sm text-foreground/80">{w.action}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{w.executions}</span> total executions
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-md text-muted-foreground transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder for New Workflow */}
        <div className="p-6 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer min-h-[250px]">
          <div className="p-4 rounded-full bg-secondary">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">New Automation</h3>
            <p className="text-sm text-muted-foreground">Define a custom trigger and AI action.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
