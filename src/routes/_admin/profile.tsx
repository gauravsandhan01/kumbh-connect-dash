import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Phone, MapPin, Save } from "lucide-react";

export const Route = createFileRoute("/_admin/profile")({
  head: () => ({ meta: [{ title: "Profile · Admin" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-white shadow-elevated md:p-8">
        <div className="absolute inset-0 wave-pattern opacity-30" />
        <div className="relative flex flex-wrap items-center gap-5">
          <Avatar className="h-20 w-20 ring-4 ring-white/40">
            <AvatarFallback className="bg-white text-sacred-blue text-xl font-bold">AD</AvatarFallback>
          </Avatar>
          <div>
            <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15"><ShieldCheck className="mr-1 h-3 w-3" />ADMIN · RBAC</Badge>
            <h1 className="mt-2 font-display text-3xl font-bold">Maha Kumbh Authority</h1>
            <p className="text-white/80">admin@kumbhmela.com</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
          <h2 className="font-display text-lg font-bold">Admin Details</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div><Label>Full Name</Label><Input defaultValue="Maha Kumbh Authority" className="mt-1" /></div>
            <div><Label>Designation</Label><Input defaultValue="Portal Administrator" className="mt-1" /></div>
            <div><Label>Email</Label><Input defaultValue="admin@kumbhmela.com" className="mt-1" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 1800-123-456" className="mt-1" /></div>
            <div className="md:col-span-2"><Label>Office Address</Label><Input defaultValue="Mela Authority Bhavan, Prayagraj" className="mt-1" /></div>
          </div>
          <div className="flex justify-end"><Button className="rounded-full bg-gradient-saffron text-white"><Save className="mr-2 h-4 w-4" />Save</Button></div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-3">
          <h2 className="font-display text-lg font-bold">Contact</h2>
          <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-saffron" />admin@kumbhmela.com</div>
          <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-saffron" />+91 1800-123-456</div>
          <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-saffron" />Prayagraj, UP</div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> 2-Factor authentication enabled
          </div>
        </section>
      </div>
    </div>
  );
}