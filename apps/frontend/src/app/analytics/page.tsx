"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

const incomeData = [
  { month: "Jan", actual: 4000, forecast: 4200 },
  { month: "Feb", actual: 3000, forecast: 3500 },
  { month: "Mar", actual: 5000, forecast: 4800 },
  { month: "Apr", actual: 4500, forecast: 5000 },
  { month: "May", actual: 6000, forecast: 5500 },
  { month: "Jun", actual: 5500, forecast: 6200 },
];

const categoryData = [
  { name: "Web Dev", value: 45 },
  { name: "Design", value: 25 },
  { name: "Consulting", value: 20 },
  { name: "Support", value: 10 },
];

const COLORS = ["#ffffff", "#888888", "#444444", "#222222"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your business growth and profitability.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card/30">
          <h2 className="text-lg font-semibold mb-6">Income vs Forecast</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="actual" stroke="#fff" strokeWidth={2} dot={{ fill: '#fff' }} />
                <Line type="monotone" dataKey="forecast" stroke="#666" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/30">
          <h2 className="text-lg font-semibold mb-6">Revenue by Service</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "LTV", value: "$4,200", icon: DollarSign, trend: "up" },
          { label: "CAC", value: "$120", icon: Target, trend: "down" },
          { label: "Churn Rate", value: "2.4%", icon: TrendingDown, trend: "down" },
          { label: "Growth", value: "18%", icon: TrendingUp, trend: "up" },
        ].map((m) => (
          <div key={m.label} className="p-6 rounded-xl border border-border bg-card/30">
            <div className="flex items-center justify-between mb-2">
              <m.icon className="w-4 h-4 text-muted-foreground" />
              {m.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
