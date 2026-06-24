import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  Eye,
  IndianRupee,
  ArrowUpRight,
  ClipboardCheck,
  Hotel,
  Store,
  HeartPulse,
  Bus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin · Dashboard" }] }),
  component: AdminDashboard,
});

const stats = [
  { label: "Total Vendors", value: "1,284", delta: "+42 this week", icon: Users, tint: "bg-sacred-blue/10 text-sacred-blue" },
  { label: "Total Businesses", value: "3,712", delta: "+128", icon: Briefcase, tint: "bg-saffron/10 text-saffron" },
  { label: "Pending Approvals", value: "24", delta: "Avg 2d", icon: Clock, tint: "bg-amber-100 text-amber-700" },
  { label: "Approved", value: "3,425", delta: "92%", icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-700" },
  { label: "Rejected", value: "263", delta: "7%", icon: XCircle, tint: "bg-rose-100 text-rose-700" },
  { label: "Today's Registrations", value: "37", delta: "+9", icon: UserPlus, tint: "bg-violet-100 text-violet-700" },
  { label: "Total Visitors", value: "2.4M", delta: "+18%", icon: Eye, tint: "bg-cyan-100 text-cyan-700" },
  { label: "Revenue (Future)", value: "—", delta: "Coming soon", icon: IndianRupee, tint: "bg-temple-gold/30 text-amber-800" },
];

const queue = [
  { name: "Ganga View Hotel", vendor: "Ravi Kumar", cat: "Hotel", sub: "Sector 14", time: "2m ago" },
  { name: "Annapurna Mess", vendor: "Sita Devi", cat: "Mess", sub: "Sector 7", time: "1h ago" },
  { name: "Sangam Medical", vendor: "Dr. Mehta", cat: "Medical", sub: "Sector 3", time: "3h ago" },
  { name: "Tirth Yatra Transport", vendor: "Mahesh T.", cat: "Transport", sub: "Sector 22", time: "5h ago" },
];

const categoryStats = [
  { name: "Hotels", count: 842, icon: Hotel, color: "bg-saffron" },
  { name: "Shops", count: 1240, icon: Store, color: "bg-sacred-blue" },
  { name: "Medical", count: 312, icon: HeartPulse, color: "bg-rose-500" },
  { name: "Transport", count: 528, icon: Bus, color: "bg-emerald-500" },
];

function AdminDashboard() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-white shadow-elevated md:p-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-temple-gold/30 blur-3xl" />
        <div className="relative">
          <Badge className="gap-1 rounded-full border-0 bg-white/15 text-white hover:bg-white/15">
            🛡 Admin Console
          </Badge>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            Maha Kumbh Mela Authority
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Approve vendors, verify documents and manage all listings published on the Official Kumbh Mela Portal.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-white text-sacred-blue hover:bg-white/95">
              <Link to="/admin/approvals"><ClipboardCheck className="mr-2 h-4 w-4" />Review pending (24)</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/admin/vendors">Manage vendors</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-[11px] font-medium text-emerald-700">{s.delta}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Pending Approval Queue</h2>
            <Link to="/admin/approvals" className="text-sm font-medium text-saffron hover:underline inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {queue.map((q) => (
              <div key={q.name} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.vendor} · {q.cat} · {q.sub} · {q.time}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">Review</Button>
                  <Button size="sm" className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold">Top Categories</h2>
          <div className="mt-4 space-y-4">
            {categoryStats.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${c.color} text-white`}>
                      <c.icon className="h-3.5 w-3.5" />
                    </span>
                    {c.name}
                  </span>
                  <span className="font-semibold">{c.count}</span>
                </div>
                <Progress value={(c.count / 1400) * 100} className="mt-2 h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}