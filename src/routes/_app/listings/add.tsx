import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  MapPin,
  Sparkles,
  Images,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Upload,
  Hotel,
  UtensilsCrossed,
  Store,
  Tent,
  Car,
  HeartPulse,
  Bus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/listings/add")({
  head: () => ({
    meta: [
      { title: "Add Business · Kumbh Vendor Portal" },
      { name: "description", content: "Register a new business or service for Maha Kumbh Mela." },
    ],
  }),
  component: AddBusinessPage,
});

const steps = [
  { n: 1, label: "Business Info", icon: Building2 },
  { n: 2, label: "Location", icon: MapPin },
  { n: 3, label: "Facilities", icon: Sparkles },
  { n: 4, label: "Gallery", icon: Images },
  { n: 5, label: "Documents", icon: FileText },
  { n: 6, label: "Review", icon: CheckCircle2 },
];

const categories = [
  { label: "Hotel", icon: Hotel },
  { label: "Mess", icon: UtensilsCrossed },
  { label: "Shop", icon: Store },
  { label: "Camp", icon: Tent },
  { label: "Parking", icon: Car },
  { label: "Medical", icon: HeartPulse },
  { label: "Transport", icon: Bus },
  { label: "Restaurant", icon: UtensilsCrossed },
];

const facilities = [
  "AC Rooms", "Hot Water", "Vegetarian Food", "Sattvik Kitchen", "24x7 Security",
  "Wi-Fi", "Power Backup", "Doctor on call", "Parking", "Wheelchair Access",
  "Pilgrim Guide", "Locker Storage",
];

function AddBusinessPage() {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState("Hotel");
  const [selectedFac, setSelectedFac] = useState<string[]>(["Vegetarian Food", "24x7 Security"]);

  const toggleFac = (f: string) =>
    setSelectedFac((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="shrink-0">
          <Link to="/listings"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Add new business</h1>
          <p className="text-sm text-muted-foreground">Step {step} of 6 — listings go live after verification (24–48h).</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-4 shadow-card">
        <ol className="flex min-w-max items-center gap-2">
          {steps.map((s, i) => {
            const active = s.n === step;
            const done = s.n < step;
            return (
              <li key={s.n} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(s.n)}
                  className={
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition " +
                    (active
                      ? "bg-gradient-saffron text-white shadow-soft"
                      : done
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-muted text-muted-foreground hover:bg-muted/70")
                  }
                >
                  <span className={"grid h-6 w-6 place-items-center rounded-full text-xs " + (active ? "bg-white/25" : done ? "bg-emerald-200" : "bg-background")}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <span className="h-px w-6 bg-border" />}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Tell us about your business</h2>
                <p className="text-sm text-muted-foreground">Choose category and basic details.</p>
              </div>
              <div>
                <Label className="mb-3 block">Business category</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {categories.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setSelectedCat(c.label)}
                      className={
                        "flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition " +
                        (selectedCat === c.label
                          ? "border-saffron bg-saffron/5 ring-2 ring-saffron/30"
                          : "border-border hover:border-saffron/40")
                      }
                    >
                      <div className={"grid h-9 w-9 place-items-center rounded-lg " + (selectedCat === c.label ? "bg-saffron text-white" : "bg-muted text-foreground")}>
                        <c.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bname">Business name</Label>
                  <Input id="bname" placeholder="Ganga View Heritage Hotel" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact number</Label>
                  <Input id="phone" placeholder="+91 98XXXXXX21" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bemail">Business email</Label>
                  <Input id="bemail" type="email" placeholder="hello@gangaview.in" className="h-11" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" rows={4} placeholder="A short, pilgrim-friendly description of your services…" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Where is it located?</h2>
                <p className="text-sm text-muted-foreground">Pilgrims will see this on the Kumbh Mela map.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="addr">Street address</Label>
                  <Input id="addr" placeholder="Plot 21, near Triveni Sangam" className="h-11" />
                </div>
                <div className="space-y-2"><Label>Sector</Label><Input placeholder="Sector 14" className="h-11" /></div>
                <div className="space-y-2"><Label>Landmark</Label><Input placeholder="Behind Akhada gate" className="h-11" /></div>
                <div className="space-y-2"><Label>City</Label><Input defaultValue="Prayagraj" className="h-11" /></div>
                <div className="space-y-2"><Label>Pincode</Label><Input placeholder="211001" className="h-11" /></div>
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
                <div className="absolute inset-0 wave-pattern" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-white shadow-elevated">
                  📍 Drop pin at exact location
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Facilities & amenities</h2>
                <p className="text-sm text-muted-foreground">Select all that apply. Helps pilgrims choose you faster.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {facilities.map((f) => {
                  const on = selectedFac.includes(f);
                  return (
                    <button
                      key={f}
                      onClick={() => toggleFac(f)}
                      className={
                        "rounded-full border px-4 py-2 text-sm font-medium transition " +
                        (on
                          ? "border-saffron bg-saffron text-white"
                          : "border-border bg-card text-foreground hover:border-saffron/40")
                      }
                    >
                      {on ? "✓ " : "+ "}{f}
                    </button>
                  );
                })}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label>Total capacity</Label><Input placeholder="120 guests" className="h-11" /></div>
                <div className="space-y-2"><Label>Starting price (₹)</Label><Input placeholder="800" className="h-11" /></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Upload photos</h2>
                <p className="text-sm text-muted-foreground">Up to 12 photos. First photo becomes the cover.</p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-saffron/50 bg-saffron/5 p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-saffron text-white shadow-soft">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-4 font-semibold">Drag & drop photos here</div>
                <div className="text-sm text-muted-foreground">JPG, PNG up to 8MB each</div>
                <Button className="mt-4 rounded-full bg-foreground text-background hover:bg-foreground/90">Browse files</Button>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-border" style={{ background: `linear-gradient(${i * 60}deg,#ff8c00,#1e40af)` }}>
                    {i === 1 && <Badge className="absolute left-2 top-2 bg-temple-gold text-foreground hover:bg-temple-gold">Cover</Badge>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Verification documents</h2>
                <p className="text-sm text-muted-foreground">Required by Mela Authority for vendor verification.</p>
              </div>
              {[
                { name: "GST / Trade License", required: true },
                { name: "Owner Aadhaar / DigiLocker", required: true },
                { name: "Property / NOC document", required: false },
                { name: "Food License (FSSAI)", required: false },
              ].map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-saffron/10 text-saffron"><FileText className="h-5 w-5" /></div>
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.required ? "Required" : "Optional"} · PDF / JPG up to 5MB</div>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full"><Upload className="mr-1 h-4 w-4" /> Upload</Button>
                </div>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">Review & submit</h2>
                <p className="text-sm text-muted-foreground">Confirm details. Approval usually takes 24–48 hours.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Category", selectedCat],
                  ["Business", "Ganga View Heritage Hotel"],
                  ["Location", "Sector 14, Prayagraj"],
                  ["Facilities", `${selectedFac.length} selected`],
                  ["Photos", "4 uploaded"],
                  ["Documents", "2 of 4 uploaded"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-border bg-background p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="mt-1 font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-saffron p-5 text-white">
                <div className="font-display text-lg font-bold">Ready to submit?</div>
                <p className="text-sm text-white/90">You'll receive an SMS once your listing is approved.</p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button
              variant="outline"
              className="rounded-full"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < 6 ? (
              <Button
                className="rounded-full bg-gradient-saffron text-white hover:opacity-95"
                onClick={() => setStep((s) => Math.min(6, s + 1))}
              >
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button asChild className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                <Link to="/listings"><CheckCircle2 className="mr-1 h-4 w-4" /> Submit for approval</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Side tip */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Tip</div>
              <h4 className="mt-1 font-display text-lg font-bold">Add high quality photos</h4>
              <p className="mt-1 text-sm text-muted-foreground">Listings with 5+ clear photos receive 3× more enquiries during Snan periods.</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-gradient-hero p-5 text-white shadow-elevated">
              <div className="font-display text-lg font-bold">Need help?</div>
              <p className="mt-1 text-sm text-white/85">Our vendor support team speaks Hindi, English & Awadhi.</p>
              <Button className="mt-3 rounded-full bg-white text-saffron hover:bg-white/95">Call 1800-KUMBH</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}