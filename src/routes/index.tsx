import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Hotel,
  UtensilsCrossed,
  Store,
  Tent,
  Car,
  HeartPulse,
  Bus,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KumbhLogo } from "@/components/kumbh/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kumbh Vendor Portal — Maha Kumbh Mela" },
      { name: "description", content: "Official vendor portal for Maha Kumbh Mela. Register hotels, mess, shops, camps, parking, medical and transport services for pilgrims." },
      { property: "og:title", content: "Kumbh Vendor Portal — Maha Kumbh Mela" },
      { property: "og:description", content: "Register your business and reach millions of Kumbh Mela pilgrims through the official portal." },
    ],
  }),
  component: Index,
});

const categories = [
  { icon: Hotel, label: "Hotels" },
  { icon: UtensilsCrossed, label: "Mess Services" },
  { icon: Store, label: "Shops" },
  { icon: Tent, label: "Camps" },
  { icon: Car, label: "Parking" },
  { icon: HeartPulse, label: "Medical" },
  { icon: Bus, label: "Transport" },
  { icon: Briefcase, label: "Restaurants" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <KumbhLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#categories" className="hover:text-foreground">Categories</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#trust" className="hover:text-foreground">Trust & Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="rounded-full bg-gradient-saffron text-white shadow-soft hover:opacity-95">
              <Link to="/register">Register Business</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 wave-pattern" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-saffron opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sacred-blue opacity-15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit gap-1.5 rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-saffron hover:bg-saffron/10">
              <Sparkles className="h-3.5 w-3.5" />
              Official Maha Kumbh Mela 2027 Portal
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
              Serve <span className="text-saffron">millions of pilgrims</span>
              <br /> at the world's largest gathering.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Register your hotel, mess, shop, camp, parking, medical or transport service.
              Approved listings appear on the official Kumbh Mela website and mobile app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-saffron px-7 text-base text-white shadow-elevated hover:opacity-95">
                <Link to="/register">
                  Start Registration <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-card px-7 text-base">
                <Link to="/login">Vendor Sign in</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Govt. verified</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-sacred-blue" /> 24,000+ vendors</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-saffron" /> Free to list</div>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-gold opacity-40 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-elevated">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Live Stats</div>
                  <div className="font-display text-2xl font-bold">Triveni Sector 14</div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">● Live</Badge>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { k: "Pilgrims today", v: "4.2 M", c: "text-saffron" },
                  { k: "Active vendors", v: "24,830", c: "text-sacred-blue" },
                  { k: "Approved hotels", v: "1,284", c: "text-emerald-600" },
                  { k: "Camps booked", v: "9,612", c: "text-amber-600" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-border/70 bg-background p-4">
                    <div className={`font-display text-2xl font-bold ${s.c}`}>{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-hero p-5 text-white">
                <div className="text-xs uppercase tracking-wider opacity-80">Next Snan</div>
                <div className="font-display text-xl font-bold">Mauni Amavasya · 14 Feb</div>
                <div className="mt-1 text-sm opacity-90">Expected footfall: 60M pilgrims</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Eight service categories</h2>
            <p className="mt-2 text-muted-foreground">Register any service you offer to Kumbh pilgrims.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <div key={c.label} className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-saffron/40">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-saffron/10 text-saffron group-hover:bg-saffron group-hover:text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-white shadow-elevated md:p-16">
          <div className="relative max-w-2xl">
            <h3 className="font-display text-3xl font-bold md:text-4xl">Ready to serve the pilgrimage?</h3>
            <p className="mt-3 text-white/85">Register in minutes. Get verified. Reach millions through the official Kumbh Mela app.</p>
            <Button asChild size="lg" className="mt-6 rounded-full bg-white px-7 text-saffron hover:bg-white/95">
              <Link to="/register">Register Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
          <KumbhLogo />
          <div>© Maha Kumbh Mela Authority · Official Vendor Portal</div>
        </div>
      </footer>
    </div>
  );
}
