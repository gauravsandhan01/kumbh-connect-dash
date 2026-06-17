import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Hotel,
  UtensilsCrossed,
  Store,
  Tent,
  Images,
  MessageSquare,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  TrendingUp,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Kumbh Vendor Portal" },
      { name: "description", content: "Overview of your Kumbh Mela vendor listings, enquiries and approvals." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Total Listings", value: "12", delta: "+2", icon: Briefcase, tint: "bg-saffron/10 text-saffron" },
  { label: "Approved", value: "9", delta: "75%", icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-700" },
  { label: "Pending Approval", value: "3", delta: "Avg 2d", icon: Clock, tint: "bg-amber-100 text-amber-700" },
  { label: "Total Views", value: "48,231", delta: "+18%", icon: Eye, tint: "bg-sacred-blue/10 text-sacred-blue" },
  { label: "Enquiries", value: "284", delta: "+34", icon: MessageSquare, tint: "bg-rose-100 text-rose-700" },
  { label: "Profile", value: "82%", delta: "Complete KYC", icon: ShieldCheck, tint: "bg-temple-gold/20 text-amber-700" },
];

const quickActions = [
  { label: "Add Hotel", icon: Hotel, color: "from-orange-500 to-rose-500" },
  { label: "Add Mess", icon: UtensilsCrossed, color: "from-amber-500 to-orange-500" },
  { label: "Add Shop", icon: Store, color: "from-blue-500 to-indigo-600" },
  { label: "Add Camp", icon: Tent, color: "from-emerald-500 to-teal-600" },
  { label: "Upload Photos", icon: Images, color: "from-fuchsia-500 to-pink-600" },
  { label: "View Enquiries", icon: MessageSquare, color: "from-cyan-500 to-sky-600" },
];

const recentListings = [
  { name: "Ganga View Hotel", cat: "Hotels", loc: "Sector 14, Triveni", status: "Approved", views: 4823 },
  { name: "Annapurna Mess", cat: "Mess", loc: "Sector 7, Jhusi", status: "Pending", views: 1284 },
  { name: "Tulsi Bhandar", cat: "Shop", loc: "Sector 3, Daraganj", status: "Approved", views: 932 },
  { name: "Shiv Camp Bharadwaj", cat: "Camps", loc: "Sector 22", status: "Approved", views: 2156 },
];

const enquiries = [
  { name: "Anita Sharma", msg: "Room availability for Mauni Amavasya?", time: "2m ago" },
  { name: "Rakesh Yadav", msg: "Bulk booking for 40 sadhus", time: "1h ago" },
  { name: "Priya Iyer", msg: "Vegetarian menu and timings?", time: "3h ago" },
  { name: "Mahesh Tiwari", msg: "Parking near Sangam ghat", time: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-white shadow-elevated md:p-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-temple-gold/30 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Badge className="gap-1 rounded-full border-0 bg-white/15 text-white hover:bg-white/15">
              🙏 Namaste, Ravi ji
            </Badge>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
              Welcome to Kumbh Mela Vendor Portal
            </h1>
            <p className="mt-3 max-w-2xl text-white/85">
              Manage your hotels, shops, mess services, camps and other services for Kumbh Mela visitors —
              all in one trusted place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-white px-6 text-saffron hover:bg-white/95">
                <Link to="/listings/add"><Plus className="mr-1 h-4 w-4" /> Add New Business</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/40 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white">
                <Link to="/listings">View Listings <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur md:block">
            <div className="text-xs uppercase tracking-wider text-white/70">Next Major Snan</div>
            <div className="mt-1 font-display text-2xl font-bold">Mauni Amavasya</div>
            <div className="text-sm text-white/80">14 February · 60M expected</div>
            <Progress value={62} className="mt-4 h-2 bg-white/20 [&>div]:bg-temple-gold" />
            <div className="mt-2 text-xs text-white/80">42 days to go · prepare inventory</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tint}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                {s.delta}
              </span>
            </div>
            <div className="mt-3 font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Quick actions */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Quick actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((a) => (
            <button
              key={a.label}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-saffron/40"
            >
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-soft`}>
                <a.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{a.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Two-column widgets */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-display text-lg font-bold">Recent listings</h3>
            <Link to="/listings" className="text-sm font-medium text-saffron hover:underline">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {recentListings.map((l) => (
              <li key={l.name} className="flex items-center gap-4 px-5 py-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron/10 text-saffron">
                  <Hotel className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{l.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{l.cat} · {l.loc}</div>
                </div>
                <Badge
                  className={
                    l.status === "Approved"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                  }
                >
                  {l.status}
                </Badge>
                <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                  <Eye className="h-3.5 w-3.5" /> {l.views.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-display text-lg font-bold">Latest enquiries</h3>
            <Link to="/notifications" className="text-sm font-medium text-saffron hover:underline">All</Link>
          </div>
          <ul className="divide-y divide-border">
            {enquiries.map((e) => (
              <li key={e.name} className="flex gap-3 px-5 py-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-saffron text-xs font-bold text-white">
                  {e.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{e.name}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{e.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{e.msg}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}