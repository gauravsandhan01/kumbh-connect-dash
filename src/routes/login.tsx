import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KumbhLogo } from "@/components/kumbh/logo";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Kumbh Vendor Portal" },
      { name: "description", content: "Sign in to manage your Maha Kumbh Mela vendor listings." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 wave-pattern opacity-40" />
        <Link to="/" className="relative z-10 text-white">
          <KumbhLogo />
        </Link>
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-5xl font-bold leading-tight">
            Welcome back,<br /> Sevak.
          </h2>
          <p className="max-w-md text-white/85">
            Manage hotels, mess services, camps and more for millions of Kumbh pilgrims.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck className="h-4 w-4" /> Government verified · Secure sign-in
          </div>
        </div>
        <div className="relative z-10 text-xs text-white/60">© Maha Kumbh Mela Authority</div>
      </aside>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><KumbhLogo /></div>
          <h1 className="font-display text-3xl font-bold">Sign in to your portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your registered mobile or email to continue.</p>

          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="id">Mobile number or Email</Label>
              <Input id="id" placeholder="+91 98XXXXXX21" className="h-11" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pw">Password</Label>
                <a href="#" className="text-xs font-medium text-saffron hover:underline">Forgot?</a>
              </div>
              <Input id="pw" type="password" placeholder="••••••••" className="h-11" />
            </div>
            <Button asChild className="h-11 w-full rounded-full bg-gradient-saffron text-base text-white shadow-soft hover:opacity-95">
              <Link to="/dashboard">Sign in securely</Link>
            </Button>
            <div className="relative py-2 text-center text-xs text-muted-foreground">
              <span className="bg-background px-3">or continue with</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11 rounded-full">DigiLocker</Button>
              <Button variant="outline" className="h-11 rounded-full">Aadhaar OTP</Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              New vendor?{" "}
              <Link to="/register" className="font-semibold text-saffron hover:underline">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}