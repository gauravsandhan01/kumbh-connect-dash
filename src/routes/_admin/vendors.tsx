import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, Filter, Eye, Ban, CheckCircle2, Trash2, FileText, Phone, Mail, MapPin, X,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_admin/vendors")({
  head: () => ({ meta: [{ title: "Vendor Management · Admin" }] }),
  component: VendorsPage,
});

type Vendor = {
  id: string; name: string; email: string; phone: string; city: string;
  status: "Active" | "Suspended" | "Pending"; biz: number; joined: string; initials: string;
};

const vendors: Vendor[] = [
  { id: "KMV-2849", name: "Ravi Kumar", email: "ravi@hotel.com", phone: "+91 98765 43210", city: "Prayagraj", status: "Active", biz: 4, joined: "12 Jan 2026", initials: "RK" },
  { id: "KMV-2850", name: "Sita Devi", email: "sita@mess.com", phone: "+91 98765 11122", city: "Jhusi", status: "Pending", biz: 1, joined: "18 Feb 2026", initials: "SD" },
  { id: "KMV-2851", name: "Dr. Anil Mehta", email: "anil@med.com", phone: "+91 99887 65432", city: "Daraganj", status: "Active", biz: 2, joined: "03 Mar 2026", initials: "AM" },
  { id: "KMV-2852", name: "Mahesh Tiwari", email: "mahesh@transport.in", phone: "+91 99000 22334", city: "Naini", status: "Suspended", biz: 3, joined: "21 Apr 2026", initials: "MT" },
  { id: "KMV-2853", name: "Priya Iyer", email: "priya@shop.com", phone: "+91 90000 33445", city: "Sangam", status: "Active", biz: 2, joined: "10 May 2026", initials: "PI" },
  { id: "KMV-2854", name: "Rakesh Yadav", email: "rakesh@camp.in", phone: "+91 91111 44556", city: "Sector 22", status: "Pending", biz: 1, joined: "01 Jun 2026", initials: "RY" },
];

const tone = (s: Vendor["status"]) =>
  s === "Active" ? "bg-emerald-100 text-emerald-700" :
  s === "Suspended" ? "bg-rose-100 text-rose-700" :
  "bg-amber-100 text-amber-700";

function VendorsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | Vendor["status"]>("All");
  const [open, setOpen] = useState<Vendor | null>(null);

  const filtered = vendors.filter((v) =>
    (filter === "All" || v.status === filter) &&
    (q === "" || `${v.name} ${v.email} ${v.id} ${v.city}`.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Vendor Management</h1>
          <p className="text-sm text-muted-foreground">Search, suspend, activate and review vendor accounts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full"><Filter className="mr-2 h-4 w-4" />Export</Button>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, email, ID, city" value={q} onChange={(e) => setQ(e.target.value)} className="h-10 rounded-full pl-9" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {(["All", "Active", "Pending", "Suspended"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="rounded-full">
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Vendor</th>
                <th className="py-2 pr-4 hidden md:table-cell">Contact</th>
                <th className="py-2 pr-4 hidden lg:table-cell">City</th>
                <th className="py-2 pr-4">Businesses</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="bg-gradient-saffron text-white">{v.initials}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-semibold">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.id} · Joined {v.joined}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell">
                    <div className="text-xs">{v.email}</div>
                    <div className="text-xs text-muted-foreground">{v.phone}</div>
                  </td>
                  <td className="py-3 pr-4 hidden lg:table-cell">{v.city}</td>
                  <td className="py-3 pr-4">{v.biz}</td>
                  <td className="py-3 pr-4"><Badge className={`${tone(v.status)} rounded-full`}>{v.status}</Badge></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setOpen(v)} aria-label="View"><Eye className="h-4 w-4" /></Button>
                      {v.status === "Suspended" ? (
                        <Button size="icon" variant="ghost" aria-label="Activate"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></Button>
                      ) : (
                        <Button size="icon" variant="ghost" aria-label="Suspend"><Ban className="h-4 w-4 text-amber-600" /></Button>
                      )}
                      <Button size="icon" variant="ghost" aria-label="Delete"><Trash2 className="h-4 w-4 text-rose-600" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">No vendors match your search.</div>
          )}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-saffron text-white">{open.initials}</AvatarFallback></Avatar>
                  {open.name}
                  <Badge className={`${tone(open.status)} rounded-full`}>{open.status}</Badge>
                </DialogTitle>
                <DialogDescription>{open.id} · Joined {open.joined}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <Info icon={<Mail className="h-4 w-4" />} label="Email" value={open.email} />
                <Info icon={<Phone className="h-4 w-4" />} label="Phone" value={open.phone} />
                <Info icon={<MapPin className="h-4 w-4" />} label="City" value={open.city} />
                <Info icon={<FileText className="h-4 w-4" />} label="Businesses" value={String(open.biz)} />
              </div>
              <div className="rounded-xl border border-border p-4">
                <h4 className="text-sm font-semibold">KYC Documents</h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {["Aadhaar Card", "PAN Card", "GST Certificate"].map((d) => (
                    <div key={d} className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs font-medium">{d}</div>
                      <div className="mt-1 text-[11px] text-emerald-700">✓ Verified</div>
                      <Button size="sm" variant="link" className="h-7 px-0 text-saffron">View</Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="outline" className="rounded-full" onClick={() => setOpen(null)}><X className="mr-2 h-4 w-4" />Close</Button>
                {open.status === "Suspended" ? (
                  <Button className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Activate</Button>
                ) : (
                  <Button variant="outline" className="rounded-full text-amber-700"><Ban className="mr-2 h-4 w-4" />Suspend</Button>
                )}
                <Button variant="outline" className="rounded-full text-rose-600"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}