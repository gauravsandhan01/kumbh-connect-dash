import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Hotel,
  UtensilsCrossed,
  Store,
  Tent,
  Car,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/listings/")({
  head: () => ({
    meta: [
      { title: "My Listings · Kumbh Vendor Portal" },
      { name: "description", content: "All your Kumbh Mela business listings in one place." },
    ],
  }),
  component: ListingsPage,
});

const cats = [
  { label: "All", count: 12, icon: Filter, active: true },
  { label: "Hotels", count: 4, icon: Hotel },
  { label: "Mess", count: 2, icon: UtensilsCrossed },
  { label: "Shops", count: 3, icon: Store },
  { label: "Camps", count: 2, icon: Tent },
  { label: "Parking", count: 1, icon: Car },
  { label: "Medical", count: 0, icon: HeartPulse },
];

const listings = [
  {
    name: "Ganga View Heritage Hotel",
    cat: "Hotel",
    icon: Hotel,
    loc: "Sector 14, Triveni Sangam",
    status: "Approved",
    views: 4823,
    cover: "linear-gradient(135deg,#ff8c00,#fbbf24)",
  },
  {
    name: "Annapurna Sattvik Mess",
    cat: "Mess",
    icon: UtensilsCrossed,
    loc: "Sector 7, Jhusi",
    status: "Pending",
    views: 1284,
    cover: "linear-gradient(135deg,#1e40af,#3b82f6)",
  },
  {
    name: "Tulsi Pooja Bhandar",
    cat: "Shop",
    icon: Store,
    loc: "Sector 3, Daraganj",
    status: "Approved",
    views: 932,
    cover: "linear-gradient(135deg,#059669,#84cc16)",
  },
  {
    name: "Shiv Camp Bharadwaj",
    cat: "Camp",
    icon: Tent,
    loc: "Sector 22, Arail",
    status: "Approved",
    views: 2156,
    cover: "linear-gradient(135deg,#dc2626,#fb923c)",
  },
  {
    name: "Sangam Secure Parking",
    cat: "Parking",
    icon: Car,
    loc: "Sector 19, Naini",
    status: "Draft",
    views: 0,
    cover: "linear-gradient(135deg,#475569,#64748b)",
  },
  {
    name: "Mahakal Restaurant",
    cat: "Restaurant",
    icon: UtensilsCrossed,
    loc: "Sector 5, Civil Lines",
    status: "Approved",
    views: 3402,
    cover: "linear-gradient(135deg,#7c2d12,#ea580c)",
  },
];

function ListingsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold md:text-3xl">My Listings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage every service you offer to Kumbh pilgrims.</p>
        </div>
        <Button asChild className="shrink-0 rounded-full bg-gradient-saffron text-white shadow-soft hover:opacity-95">
          <Link to="/listings/add"><Plus className="mr-1 h-4 w-4" /> Add Business</Link>
        </Button>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, location, category…" className="h-11 rounded-full pl-10" />
        </div>
        <Button variant="outline" className="h-11 rounded-full"><Filter className="mr-1 h-4 w-4" /> Filters</Button>
      </div>

      {/* Category chips */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cats.map((c) => (
          <button
            key={c.label}
            className={
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition " +
              (c.active
                ? "border-saffron bg-saffron text-white shadow-soft"
                : "border-border bg-card text-foreground hover:border-saffron/40")
            }
          >
            <c.icon className="h-4 w-4" />
            {c.label}
            <span className={"ml-1 rounded-full px-1.5 text-xs " + (c.active ? "bg-white/25" : "bg-muted")}>{c.count}</span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {listings.map((l) => (
          <article key={l.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="relative h-40 overflow-hidden" style={{ background: l.cover }}>
              <div className="absolute inset-0 wave-pattern opacity-50" />
              <div className="absolute left-3 top-3 flex gap-2">
                <Badge className="bg-white/90 text-foreground hover:bg-white/90">{l.cat}</Badge>
              </div>
              <div className="absolute right-3 top-3">
                <Badge
                  className={
                    l.status === "Approved"
                      ? "bg-emerald-500 text-white hover:bg-emerald-500"
                      : l.status === "Pending"
                      ? "bg-amber-500 text-white hover:bg-amber-500"
                      : "bg-slate-500 text-white hover:bg-slate-500"
                  }
                >
                  ● {l.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/95 text-saffron shadow-soft">
                <l.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold leading-tight">{l.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {l.loc}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-4 w-4" /> {l.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-sacred-blue"><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  <Button size="sm" className="ml-1 rounded-full bg-foreground text-background hover:bg-foreground/90">View</Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}