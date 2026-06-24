import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Hotel, Soup, UtensilsCrossed, Coffee, Store, HeartPulse, Bus, Tent, Wrench } from "lucide-react";

export const Route = createFileRoute("/_admin/categories")({
  head: () => ({ meta: [{ title: "Categories · Admin" }] }),
  component: CategoriesPage,
});

const initial = [
  { name: "Hotels", icon: Hotel, count: 842, enabled: true },
  { name: "Mess", icon: Soup, count: 312, enabled: true },
  { name: "Restaurant", icon: UtensilsCrossed, count: 198, enabled: true },
  { name: "Cafe", icon: Coffee, count: 72, enabled: true },
  { name: "Shop", icon: Store, count: 1240, enabled: true },
  { name: "Medical Store", icon: HeartPulse, count: 312, enabled: true },
  { name: "Transport", icon: Bus, count: 528, enabled: true },
  { name: "Camp", icon: Tent, count: 412, enabled: true },
  { name: "Service Providers", icon: Wrench, count: 96, enabled: false },
];

function CategoriesPage() {
  const [cats, setCats] = useState(initial);
  const [newName, setNewName] = useState("");

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Categories Management</h1>
        <p className="text-sm text-muted-foreground">Add, enable or disable business categories shown to vendors.</p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="New category name" value={newName} onChange={(e) => setNewName(e.target.value)} className="h-10 max-w-xs rounded-full" />
          <Button className="rounded-full bg-gradient-saffron text-white"
            onClick={() => {
              if (!newName.trim()) return;
              setCats((c) => [...c, { name: newName.trim(), icon: Store, count: 0, enabled: true }]);
              setNewName("");
            }}>
            <Plus className="mr-2 h-4 w-4" />Create Category
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c, i) => (
          <div key={c.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron/10 text-saffron"><c.icon className="h-5 w-5" /></div>
              <Switch
                checked={c.enabled}
                onCheckedChange={(v) => setCats((arr) => arr.map((x, idx) => idx === i ? { ...x, enabled: v } : x))}
              />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{c.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <Badge variant="outline" className="rounded-full">{c.count} listings</Badge>
              <Badge className={`rounded-full ${c.enabled ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                {c.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 rounded-full"><Pencil className="mr-1 h-4 w-4" />Edit</Button>
              <Button size="sm" variant="outline" className="rounded-full text-rose-600"
                onClick={() => setCats((arr) => arr.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}