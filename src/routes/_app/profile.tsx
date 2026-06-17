import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Phone, Mail, MapPin, Building2, Pencil, BadgeCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile · Kumbh Vendor Portal" },
      { name: "description", content: "Your vendor profile, verification and business summary." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-white shadow-elevated md:p-8">
        <div className="absolute inset-0 wave-pattern opacity-40" />
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 md:gap-6">
          <Avatar className="h-20 w-20 ring-4 ring-white/40 md:h-24 md:w-24">
            <AvatarFallback className="bg-white text-2xl font-bold text-saffron">RK</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate font-display text-2xl font-bold md:text-3xl">Ravi Kumar</h1>
              <Badge className="gap-1 border-0 bg-white/20 text-white hover:bg-white/20">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified Vendor
              </Badge>
            </div>
            <div className="mt-1 text-sm text-white/85">Shri Ganga Hospitality Trust · Vendor #KMV-2849</div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> +91 98XXXXXX21</span>
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> ravi@gangaview.in</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Prayagraj, UP</span>
            </div>
          </div>
        </div>
        <Button className="absolute right-4 top-4 rounded-full bg-white/15 text-white hover:bg-white/25"><Pencil className="mr-1 h-4 w-4" /> Edit</Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Verification */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-display text-lg font-bold">Verification</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Government KYC & business documents.</p>
          <Progress value={82} className="mt-4 h-2 [&>div]:bg-gradient-saffron" />
          <div className="mt-2 text-sm font-medium">82% complete</div>

          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["Aadhaar / DigiLocker", true],
              ["GST / Trade License", true],
              ["FSSAI License", true],
              ["Property NOC", false],
            ].map(([n, ok]) => (
              <li key={n as string} className="flex items-center justify-between">
                <span>{n as string}</span>
                {ok ? (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Verified</Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Business summary */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-saffron" />
            <span className="font-display text-lg font-bold">Business summary</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Listings", "12"],
              ["Approved", "9"],
              ["Enquiries", "284"],
              ["Avg rating", "4.7★"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-background p-4">
                <div className="font-display text-2xl font-bold">{v}</div>
                <div className="text-xs text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Documents</div>
            <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
              {["GST Certificate.pdf", "Aadhaar.pdf", "FSSAI License.pdf"].map((d) => (
                <li key={d} className="flex items-center gap-3 px-4 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron/10 text-saffron"><FileText className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1 truncate text-sm font-medium">{d}</div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Verified</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-saffron/10 p-4 text-sm">
            <Calendar className="h-5 w-5 text-saffron" />
            <div className="flex-1">
              <div className="font-semibold">Member since Magh 2024</div>
              <div className="text-muted-foreground text-xs">Serving Kumbh pilgrims for 2 mela cycles.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}