import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Briefcase, BarChart3, Eye, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/_admin/reports")({
  head: () => ({ meta: [{ title: "Reports & Analytics · Admin" }] }),
  component: ReportsPage,
});

const kpis = [
  { label: "Total Registrations", value: "1,284", icon: Users, tint: "bg-sacred-blue/10 text-sacred-blue" },
  { label: "Daily Registrations", value: "37", icon: TrendingUp, tint: "bg-saffron/10 text-saffron" },
  { label: "Approved", value: "3,425", icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-700" },
  { label: "Rejected", value: "263", icon: XCircle, tint: "bg-rose-100 text-rose-700" },
];

const categoryStats = [
  { name: "Shops", count: 1240 },
  { name: "Hotels", count: 842 },
  { name: "Transport", count: 528 },
  { name: "Camps", count: 412 },
  { name: "Medical", count: 312 },
  { name: "Mess", count: 312 },
];

const top = [
  { name: "Ganga View Hotel", views: 48230 },
  { name: "Shiv Camp Bharadwaj", views: 21560 },
  { name: "Annapurna Mess", views: 12840 },
  { name: "Tulsi Bhandar", views: 9320 },
];

const growth = [12, 18, 22, 28, 24, 30, 38, 42, 36, 48, 56, 62];

function ReportsPage() {
  const max = Math.max(...growth);
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights into vendor growth, approvals and category performance.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${k.tint}`}><k.icon className="h-5 w-5" /></div>
            <div className="mt-3 text-2xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-saffron" />Vendor Growth (last 12 months)</h2>
            <Badge className="rounded-full bg-emerald-100 text-emerald-700">+24% YoY</Badge>
          </div>
          <div className="mt-6 flex h-48 items-end gap-2">
            {growth.map((v, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-saffron to-temple-gold" style={{ height: `${(v / max) * 100}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold flex items-center gap-2"><Briefcase className="h-4 w-4 text-saffron" />Category Statistics</h2>
          <div className="mt-4 space-y-3">
            {categoryStats.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm"><span>{c.name}</span><span className="font-semibold">{c.count}</span></div>
                <Progress value={(c.count / 1400) * 100} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold flex items-center gap-2"><Eye className="h-4 w-4 text-saffron" />Most Viewed Businesses</h2>
        <div className="mt-4 divide-y divide-border">
          {top.map((t, i) => (
            <div key={t.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 font-bold text-saffron">{i + 1}</span>
                <span className="font-semibold">{t.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{t.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}