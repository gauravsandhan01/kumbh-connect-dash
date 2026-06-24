import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Hotel, Soup, UtensilsCrossed, Store, HeartPulse, Bus, Tent, Search, Eye, Pencil, Trash2, MapPin,
} from "lucide-react";

const CATS = {
  hotels: { label: "Hotels", icon: Hotel },
  mess: { label: "Mess Services", icon: Soup },
  restaurants: { label: "Restaurants", icon: UtensilsCrossed },
  shops: { label: "Shops", icon: Store },
  medical: { label: "Medical Stores", icon: HeartPulse },
  transport: { label: "Transport", icon: Bus },
  accommodation: { label: "Accommodation", icon: Tent },
} as const;
type CatKey = keyof typeof CATS;

export const Route = createFileRoute("/_admin/businesses")({
  validateSearch: (s: Record<string, unknown>): { cat?: CatKey } => {
    const cat = typeof s.cat === "string" && s.cat in CATS ? (s.cat as CatKey) : undefined;
    return { cat };
  },
  head: () => ({ meta: [{ title: "Businesses · Admin" }] }),
  component: BusinessesPage,
});

type Biz = { id: string; name: string; vendor: string; cat: CatKey; loc: string; status: "Approved" | "Pending" | "Rejected"; views: number; };

const all: Biz[] = [
  { id: "BIZ-1001", name: "Ganga View Hotel", vendor: "Ravi Kumar", cat: "hotels", loc: "Sector 14", status: "Approved", views: 4823 },
  { id: "BIZ-1002", name: "Triveni Residency", vendor: "Anita S.", cat: "hotels", loc: "Sector 2", status: "Pending", views: 312 },
  { id: "BIZ-1003", name: "Annapurna Mess", vendor: "Sita Devi", cat: "mess", loc: "Sector 7", status: "Approved", views: 1284 },
  { id: "BIZ-1004", name: "Bhojan Ghar", vendor: "Mohan L.", cat: "mess", loc: "Sector 4", status: "Pending", views: 122 },
  { id: "BIZ-1005", name: "Sangam Bhoj", vendor: "Vinod", cat: "restaurants", loc: "Sector 5", status: "Approved", views: 2156 },
  { id: "BIZ-1006", name: "Tulsi Bhandar", vendor: "Priya Iyer", cat: "shops", loc: "Sector 3", status: "Approved", views: 932 },
  { id: "BIZ-1007", name: "Sangam Medical", vendor: "Dr. Mehta", cat: "medical", loc: "Sector 3", status: "Approved", views: 689 },
  { id: "BIZ-1008", name: "Tirth Transport", vendor: "Mahesh T.", cat: "transport", loc: "Naini", status: "Approved", views: 1450 },
  { id: "BIZ-1009", name: "Shiv Camp", vendor: "Rakesh Y.", cat: "accommodation", loc: "Sector 22", status: "Approved", views: 2156 },
  { id: "BIZ-1010", name: "Yatri Niwas Camp", vendor: "Kiran", cat: "accommodation", loc: "Sector 18", status: "Rejected", views: 12 },
];

const tone = (s: Biz["status"]) =>
  s === "Approved" ? "bg-emerald-100 text-emerald-700" :
  s === "Pending" ? "bg-amber-100 text-amber-700" :
  "bg-rose-100 text-rose-700";

function BusinessesPage() {
  const { cat } = useSearch({ from: "/_admin/businesses" });
  const [active, setActive] = useState<CatKey | "all">(cat ?? "all");
  const [q, setQ] = useState("");

  const list = all.filter(b => (active === "all" || b.cat === active) && (q === "" || b.name.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">All Businesses</h1>
        <p className="text-sm text-muted-foreground">Manage every listing across categories.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={active === "all" ? "default" : "outline"} onClick={() => setActive("all")} className="rounded-full">All</Button>
        {(Object.keys(CATS) as CatKey[]).map((k) => {
          const C = CATS[k];
          return (
            <Button key={k} size="sm" variant={active === k ? "default" : "outline"} onClick={() => setActive(k)} className="rounded-full">
              <C.icon className="mr-1 h-4 w-4" />{C.label}
            </Button>
          );
        })}
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search businesses…" value={q} onChange={(e) => setQ(e.target.value)} className="h-10 rounded-full pl-9" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((b) => {
          const C = CATS[b.cat];
          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron"><C.icon className="h-5 w-5" /></div>
                <Badge className={`${tone(b.status)} rounded-full`}>{b.status}</Badge>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{b.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{b.loc} · {C.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">By {b.vendor} · {b.views.toLocaleString()} views</div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Eye className="mr-1 h-4 w-4" />View</Button>
                <Button size="sm" variant="outline" className="rounded-full"><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline" className="rounded-full text-rose-600"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>
      {list.length === 0 && <div className="py-10 text-center text-sm text-muted-foreground">No businesses found.</div>}
    </div>
  );
}