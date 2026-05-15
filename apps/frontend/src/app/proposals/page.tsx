"use client";

import { 
  FileText, 
  Plus, 
  Sparkles, 
  Clock, 
  Eye, 
  Download,
  CheckCircle2,
  XCircle
} from "lucide-react";

const proposals = [
  { id: 1, title: "Modern E-commerce Platform", client: "Fashion Nova", status: "accepted", date: "2 days ago", value: "$12,000" },
  { id: 2, title: "Branding & Identity", client: "Tech Start", status: "sent", date: "5 days ago", value: "$4,500" },
  { id: 3, title: "SEO Strategy", client: "Local Shop", status: "draft", date: "1 week ago", value: "$2,000" },
  { id: 4, title: "Mobile App V2", client: "Uber", status: "rejected", date: "2 weeks ago", value: "$45,000" },
];

const statusColors = {
  accepted: "text-emerald-500 bg-emerald-500/10",
  sent: "text-blue-500 bg-blue-500/10",
  draft: "text-muted-foreground bg-secondary",
  rejected: "text-rose-500 bg-rose-500/10",
};

export default function ProposalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proposal Studio</h1>
          <p className="text-muted-foreground mt-1">Generate and track high-converting project proposals.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Manual Draft
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Generate Proposal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Value", value: "$63,500" },
          { label: "Conversion Rate", value: "72%" },
          { label: "Pending", value: "3 Proposals" },
          { label: "Avg. Closing Time", value: "4.2 Days" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card/30">
            <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
            <div className="text-xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card/30 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proposal Name</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Activity</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {proposals.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{p.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{p.client}</td>
                <td className="px-6 py-4 text-sm font-semibold">{p.value}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[p.status as keyof typeof statusColors]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {p.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
