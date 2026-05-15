"use client";

import { 
  TrendingUp, 
  Users, 
  FileText, 
  ArrowUpRight,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening with your business today.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Ask Nexus AI
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Leads", value: "12", icon: Users, change: "+2 this week" },
          { label: "MRR", value: "$8,450", icon: TrendingUp, change: "+12.5%" },
          { label: "Open Proposals", value: "5", icon: FileText, change: "$12,300 total" },
          { label: "Win Rate", value: "64%", icon: ArrowUpRight, change: "+5% from last month" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Forecast */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Revenue Forecast</h2>
            <select className="bg-transparent text-sm text-muted-foreground border-none outline-none cursor-pointer">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#fff" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Best Action */}
        <div className="p-6 rounded-xl border border-border bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24" />
          </div>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            Next Best Actions
          </h2>
          <div className="space-y-4">
            {[
              { 
                title: "Follow up with Acme Corp", 
                desc: "Proposal sent 3 days ago. 80% closing probability.",
                time: "2h ago",
                type: "Sales"
              },
              { 
                title: "Generate Invoice for Stark Industries", 
                desc: "Milestone 2 completed. $5,000 pending.",
                time: "5h ago",
                type: "Revenue"
              },
              { 
                title: "Meeting Prep: Wayne Ent.", 
                desc: "Discovery call scheduled for tomorrow.",
                time: "1d ago",
                type: "Meeting"
              }
            ].map((action, i) => (
              <div key={i} className="p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{action.type}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {action.time}
                  </span>
                </div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{action.desc}</p>
                <div className="mt-3 flex items-center text-[10px] text-primary font-medium">
                  Take Action <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
