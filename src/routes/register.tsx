import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KumbhLogo } from "@/components/kumbh/logo";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register · Kumbh Vendor Portal" },
      { name: "description", content: "Create your Maha Kumbh Mela vendor account." },
    ],
  }),
  component: RegisterPage,
});

const benefits = [
  "Listed on official Kumbh Mela app & website",
  "Direct enquiries from verified pilgrims",
  "Free vendor verification badge",
  "Multi-language listing support",
];

function RegisterPage() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.1fr_1fr]">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8"><KumbhLogo /></div>
          <h1 className="font-display text-3xl font-bold">Create your vendor account</h1>
          <p className="mt-2 text-sm text-muted-foreground">It takes under 2 minutes. You can complete KYC later.</p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="biz">Business / Trust name</Label>
              <Input id="biz" placeholder="Shri Ganga Hotels & Mess" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Owner name</Label>
              <Input id="name" placeholder="Ravi Kumar" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mob">Mobile</Label>
              <Input id="mob" placeholder="+91 98XXXXXX21" className="h-11" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="vendor@example.com" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpw">Confirm password</Label>
              <Input id="cpw" type="password" className="h-11" />
            </div>
            <div className="sm:col-span-2">
              <Button asChild className="h-11 w-full rounded-full bg-gradient-saffron text-base text-white shadow-soft hover:opacity-95">
                <Link to="/dashboard">Create account</Link>
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground sm:col-span-2">
              Already registered?{" "}
              <Link to="/login" className="font-semibold text-saffron hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute inset-0 wave-pattern opacity-40" />
        <div className="relative z-10 max-w-md space-y-8">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Join 24,000+ verified Kumbh vendors.
          </h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-temple-gold" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="text-xs uppercase tracking-wider text-white/70">Expected footfall 2027</div>
            <div className="mt-1 font-display text-3xl font-bold">400 Million +</div>
            <div className="text-sm text-white/80">pilgrims across 45 days</div>
          </div>
        </div>
      </aside>
    </div>
  );
}