import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RefreshCcw, Eye, ImageIcon, FileText, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_admin/approvals")({
  head: () => ({ meta: [{ title: "Business Approvals · Admin" }] }),
  component: ApprovalsPage,
});

type Status = "Pending" | "Under Review" | "Approved" | "Rejected";
type Item = { id: string; name: string; vendor: string; cat: string; location: string; submitted: string; status: Status; images: number; docs: number; };

const items: Item[] = [
  { id: "BIZ-9821", name: "Ganga View Hotel", vendor: "Ravi Kumar", cat: "Hotel", location: "Sector 14, Triveni", submitted: "2 hours ago", status: "Pending", images: 12, docs: 5 },
  { id: "BIZ-9822", name: "Annapurna Mess", vendor: "Sita Devi", cat: "Mess", location: "Sector 7, Jhusi", submitted: "5 hours ago", status: "Under Review", images: 6, docs: 4 },
  { id: "BIZ-9823", name: "Sangam Medical Store", vendor: "Dr. Anil Mehta", cat: "Medical", location: "Sector 3, Daraganj", submitted: "1 day ago", status: "Pending", images: 4, docs: 6 },
  { id: "BIZ-9824", name: "Tirth Transport", vendor: "Mahesh Tiwari", cat: "Transport", location: "Naini", submitted: "2 days ago", status: "Under Review", images: 8, docs: 5 },
  { id: "BIZ-9825", name: "Shiv Camp Bharadwaj", vendor: "Rakesh Yadav", cat: "Accommodation", location: "Sector 22", submitted: "3 days ago", status: "Approved", images: 10, docs: 5 },
  { id: "BIZ-9826", name: "Tulsi Bhandar", vendor: "Priya Iyer", cat: "Shop", location: "Sector 3", submitted: "4 days ago", status: "Rejected", images: 3, docs: 2 },
];

const tone = (s: Status) =>
  s === "Approved" ? "bg-emerald-100 text-emerald-700" :
  s === "Rejected" ? "bg-rose-100 text-rose-700" :
  s === "Under Review" ? "bg-sacred-blue/10 text-sacred-blue" :
  "bg-amber-100 text-amber-700";

function ApprovalsPage() {
  const [tab, setTab] = useState<Status | "All">("Pending");
  const [active, setActive] = useState<Item | null>(null);

  const filtered = items.filter((i) => tab === "All" || i.status === tab);
  const counts = {
    All: items.length,
    Pending: items.filter(i => i.status === "Pending").length,
    "Under Review": items.filter(i => i.status === "Under Review").length,
    Approved: items.filter(i => i.status === "Approved").length,
    Rejected: items.filter(i => i.status === "Rejected").length,
  } as const;

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Business Approvals</h1>
        <p className="text-sm text-muted-foreground">Review submissions before they go live on the Official Kumbh Mela Portal.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["All", "Pending", "Under Review", "Approved", "Rejected"] as const).map((t) => (
          <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)} className="rounded-full">
            {t} <Badge className="ml-2 bg-background/40 text-current">{counts[t]}</Badge>
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => (
          <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">{b.id} · {b.cat}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{b.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {b.location}</div>
              </div>
              <Badge className={`${tone(b.status)} rounded-full`}>{b.status}</Badge>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">By <span className="font-semibold text-foreground">{b.vendor}</span> · {b.submitted}</div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><ImageIcon className="h-3.5 w-3.5" />{b.images} images</span>
              <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{b.docs} docs</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 rounded-full" onClick={() => setActive(b)}><Eye className="mr-1 h-4 w-4" />Review</Button>
              {(b.status === "Pending" || b.status === "Under Review") && (
                <Button size="sm" className="flex-1 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"><CheckCircle2 className="mr-1 h-4 w-4" />Approve</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription>{active.id} · {active.cat} · {active.location}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-video rounded-xl bg-gradient-to-br from-saffron/20 via-temple-gold/20 to-sacred-blue/20" />
                ))}
              </div>
              <div className="rounded-xl border border-border p-4">
                <h4 className="text-sm font-semibold">Uploaded Documents</h4>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {["Aadhaar", "PAN", "GST", "FSSAI", "Trade License"].map((d) => (
                    <div key={d} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                      <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-saffron" />{d}</span>
                      <Button size="sm" variant="link" className="h-7 px-0">View</Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin remarks</label>
                <Textarea placeholder="Add internal notes or rejection reason…" />
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="outline" className="rounded-full text-amber-700"><RefreshCcw className="mr-2 h-4 w-4" />Request changes</Button>
                <Button variant="outline" className="rounded-full text-rose-600"><XCircle className="mr-2 h-4 w-4" />Reject</Button>
                <Button className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Approve & Publish</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}