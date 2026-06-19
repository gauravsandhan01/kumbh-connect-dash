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
  Store,
  UtensilsCrossed,
  BedDouble,
  Wrench,
  ChevronRight,
  PartyPopper,
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
  { n: 1, label: "Basic Info", icon: Building2 },
  { n: 2, label: "Location", icon: MapPin },
  { n: 3, label: "Facilities", icon: Sparkles },
  { n: 4, label: "Gallery", icon: Images },
  { n: 5, label: "Documents", icon: FileText },
  { n: 6, label: "Review", icon: CheckCircle2 },
];

type GroupKey = "shop" | "food" | "stay" | "service";

const groups: {
  key: GroupKey;
  emoji: string;
  icon: typeof Store;
  title: string;
  description: string;
  categories: string[];
  accent: string;
}[] = [
  {
    key: "shop",
    emoji: "🏪",
    icon: Store,
    title: "Shop Based Business",
    description:
      "General stores, mobile shops, clothes shops, medical stores, grocery shops and similar retail businesses.",
    categories: [
      "Grocery Shop",
      "General Store",
      "Mobile Shop",
      "Clothes Shop",
      "Medical Store",
      "Computer Shop",
      "Fruit & Vegetable Shop",
    ],
    accent: "from-amber-400 to-saffron",
  },
  {
    key: "food",
    emoji: "🍽",
    icon: UtensilsCrossed,
    title: "Food Service",
    description: "Food and beverage providers serving pilgrims and visitors.",
    categories: ["Restaurant", "Cafe", "Mess"],
    accent: "from-rose-400 to-saffron",
  },
  {
    key: "stay",
    emoji: "🏨",
    icon: BedDouble,
    title: "Accommodation Service",
    description: "Stay and lodging facilities for visitors.",
    categories: ["Hotel", "Lodge", "Guest House", "Camp"],
    accent: "from-sacred-blue to-indigo-500",
  },
  {
    key: "service",
    emoji: "🚚",
    icon: Wrench,
    title: "Service Provider",
    description: "Utility and transportation service providers.",
    categories: [
      "Transport Service",
      "Electrician",
      "Plumber",
      "Cleaning Service",
      "Event Service Provider",
    ],
    accent: "from-emerald-500 to-teal-600",
  },
];

const facilitiesByGroup: Record<GroupKey, string[]> = {
  shop: ["Card Payment", "UPI", "Home Delivery", "AC", "Parking", "Wheelchair Access", "Wi-Fi", "Power Backup"],
  food: ["Pure Veg", "Jain Food", "AC Seating", "Family Section", "Takeaway", "Home Delivery", "Sattvik Kitchen", "RO Water"],
  stay: ["AC Rooms", "Hot Water", "24x7 Security", "Wi-Fi", "Power Backup", "Parking", "Room Service", "Laundry"],
  service: ["24x7 Available", "On-call Booking", "Trained Staff", "Insured", "Govt. Verified", "GPS Tracked"],
};

function AddBusinessPage() {
  const [groupKey, setGroupKey] = useState<GroupKey | null>(null);
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [selectedFac, setSelectedFac] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const group = groups.find((g) => g.key === groupKey) ?? null;

  const toggleFac = (f: string) =>
    setSelectedFac((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  // ── STEP 0: Category group selection ──────────────────────────────
  if (!group) {
    return (
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="shrink-0">
            <Link to="/listings"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold md:text-3xl">Add new business</h1>
            <p className="text-sm text-muted-foreground">
              Choose the type of business you want to register on the Kumbh Mela portal.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {groups.map((g) => (
            <button
              key={g.key}
              onClick={() => {
                setGroupKey(g.key);
                setSelectedCat(g.categories[0]);
                setStep(1);
              }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-left shadow-card transition hover:-translate-y-0.5 hover:border-saffron hover:shadow-elevated md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-saffron opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className={"grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft " + g.accent}>
                  <g.icon className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{g.emoji}</span>
                    <h2 className="font-display text-xl font-bold md:text-2xl">{g.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {g.categories.slice(0, 4).map((c) => (
                  <span key={c} className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-medium text-saffron">
                    {c}
                  </span>
                ))}
                {g.categories.length > 4 && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    +{g.categories.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {g.categories.length} categories
                </div>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-saffron">
                  Continue <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── SUCCESS SCREEN ─────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4 py-10">
        <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-elevated md:p-12">
          <div className="absolute inset-0 wave-pattern opacity-40" />
          <div className="relative">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold md:text-3xl">
              Registration Submitted Successfully
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              Pending Verification
            </div>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your business information has been submitted successfully. After admin verification,
              your listing will be visible on the Official Kumbh Mela Portal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-gradient-saffron text-white">
                <Link to="/listings">Go to my listings</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setSubmitted(false);
                  setGroupKey(null);
                  setStep(1);
                  setSelectedFac([]);
                }}
              >
                <PartyPopper className="mr-1 h-4 w-4" /> Add another business
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const facilities = facilitiesByGroup[group.key];

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setGroupKey(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold md:text-3xl">{group.title}</h1>
              <Badge className="bg-saffron/10 text-saffron hover:bg-saffron/10">{group.emoji} {group.categories.length} types</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Step {step} of 6 — listings go live after verification (24–48h).
            </p>
          </div>
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
                <h2 className="font-display text-xl font-bold">Basic information</h2>
                <p className="text-sm text-muted-foreground">Tell pilgrims about your {group.title.toLowerCase()}.</p>
              </div>
              <div>
                <Label className="mb-3 block">Select sub-category</Label>
                <div className="flex flex-wrap gap-2">
                  {group.categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCat(c)}
                      className={
                        "rounded-full border px-4 py-2 text-sm font-medium transition " +
                        (selectedCat === c
                          ? "border-saffron bg-saffron text-white shadow-soft"
                          : "border-border bg-card hover:border-saffron/40")
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <BasicInfoFields group={group.key} />
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
                {group.key === "shop" && (
                  <div className="space-y-2"><Label>Shop number</Label><Input placeholder="Shop 12-B" className="h-11" /></div>
                )}
                <div className="space-y-2"><Label>Landmark</Label><Input placeholder="Behind Akhada gate" className="h-11" /></div>
                <div className="space-y-2"><Label>State</Label><Input defaultValue="Uttar Pradesh" className="h-11" /></div>
                <div className="space-y-2"><Label>District</Label><Input defaultValue="Prayagraj" className="h-11" /></div>
                <div className="space-y-2"><Label>City</Label><Input defaultValue="Prayagraj" className="h-11" /></div>
                <div className="space-y-2"><Label>Pincode</Label><Input placeholder="211001" className="h-11" /></div>
                {group.key === "service" && (
                  <div className="space-y-2 sm:col-span-2"><Label>Service area covered</Label><Input placeholder="Sector 1 – Sector 25, Prayagraj" className="h-11" /></div>
                )}
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50">
                <div className="absolute inset-0 wave-pattern" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-white shadow-elevated">
                  📍 Drop Google Map pin at exact location
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold">
                  {group.key === "service" ? "Service details" : "Facilities & details"}
                </h2>
                <p className="text-sm text-muted-foreground">Select all that apply. Helps pilgrims choose you faster.</p>
              </div>

              <GroupSpecificFields group={group.key} />

              <div>
                <Label className="mb-3 block">Facilities offered</Label>
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
              {documentsFor(group.key).map((d) => (
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
                  ["Business group", group.title],
                  ["Sub-category", selectedCat || "—"],
                  ["Location", "Sector 14, Prayagraj"],
                  ["Facilities", `${selectedFac.length} selected`],
                  ["Photos", "4 uploaded"],
                  ["Documents", `${documentsFor(group.key).filter(d=>d.required).length} required uploaded`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-border bg-background p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="mt-1 font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-saffron hover:underline"
              >
                ← Edit details
              </button>
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
              onClick={() => (step === 1 ? setGroupKey(null) : setStep((s) => Math.max(1, s - 1)))}
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> {step === 1 ? "Change category" : "Back"}
            </Button>
            {step < 6 ? (
              <Button
                className="rounded-full bg-gradient-saffron text-white hover:opacity-95"
                onClick={() => setStep((s) => Math.min(6, s + 1))}
              >
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => setSubmitted(true)}
              >
                <CheckCircle2 className="mr-1 h-4 w-4" /> Submit for approval
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

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input className="h-11" {...rest} />
    </div>
  );
}

function BasicInfoFields({ group }: { group: GroupKey }) {
  const nameLabel =
    group === "stay" ? "Property name" : group === "service" ? "Service name" : "Business name";
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label={nameLabel} placeholder="e.g. Ganga View Heritage" /></div>
      <Field label="Owner name" placeholder="Ravi Kumar" />
      <Field label="Mobile number" placeholder="+91 98XXXXXX21" />
      <Field label="Alternate mobile" placeholder="+91 98XXXXXX22" />
      <Field label="Email" type="email" placeholder="hello@business.in" />
      <div className="space-y-2 sm:col-span-2">
        <Label>Short description</Label>
        <Textarea rows={4} placeholder="A short, pilgrim-friendly description of your services…" />
      </div>
      {group === "shop" && <Field label="License number" placeholder="UP-TR-0000-21" />}
      {group === "shop" && <Field label="GST number" placeholder="09AAAAA0000A1Z5" />}
      {group === "food" && <Field label="FSSAI license" placeholder="12345678901234" />}
      {group === "stay" && <Field label="Hotel license" placeholder="HL-UP-21-0000" />}
      {group === "service" && <Field label="Years of experience" placeholder="8" />}
    </div>
  );
}

function GroupSpecificFields({ group }: { group: GroupKey }) {
  if (group === "shop") {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Opening time" type="time" />
        <Field label="Closing time" type="time" />
        <div className="space-y-2 sm:col-span-2">
          <Label>Products available</Label>
          <Textarea rows={3} placeholder="Rice, atta, pulses, packaged food, daily essentials…" />
        </div>
        <Field label="Price range" placeholder="₹ 20 – ₹ 5,000" />
      </div>
    );
  }
  if (group === "food") {
    return (
      <div className="space-y-5">
        <div>
          <Label className="mb-3 block">Food type</Label>
          <div className="flex flex-wrap gap-2">
            {["Veg", "Non-Veg", "Jain", "Breakfast", "Lunch", "Dinner"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Seating capacity" placeholder="60" />
          <Field label="Average cost for two (₹)" placeholder="400" />
        </div>
      </div>
    );
  }
  if (group === "stay") {
    return (
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Total rooms" placeholder="40" />
          <Field label="Available rooms" placeholder="22" />
          <Field label="Check-in time" type="time" />
          <Field label="Check-out time" type="time" />
        </div>
        <div>
          <Label className="mb-3 block">Room types</Label>
          <div className="flex flex-wrap gap-2">
            {["Single", "Double", "Family", "Dormitory"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Starting price / night (₹)" placeholder="800" />
          <Field label="Premium price (₹)" placeholder="3,500" />
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Available timings" placeholder="6:00 AM – 11:00 PM" />
      <Field label="Service charges" placeholder="₹ 300 / visit" />
      <div className="space-y-2 sm:col-span-2">
        <Label>Service details</Label>
        <Textarea rows={3} placeholder="What does your service include…" />
      </div>
    </div>
  );
}

function documentsFor(group: GroupKey) {
  const base = [
    { name: "Owner Aadhaar / DigiLocker", required: true },
    { name: "GST / Trade License", required: true },
    { name: "Property / NOC document", required: false },
  ];
  if (group === "food") base.push({ name: "FSSAI Food License", required: true });
  if (group === "stay") base.push({ name: "Hotel / Lodging License", required: true });
  if (group === "service") base.push({ name: "Professional / Trade Certification", required: false });
  if (group === "shop") base.push({ name: "Drug License (if Medical)", required: false });
  return base;
}