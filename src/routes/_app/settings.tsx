import { createFileRoute } from "@tanstack/react-router";
import { Bell, Globe, Lock, CreditCard, Smartphone, UserCog, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Kumbh Vendor Portal" },
      { name: "description", content: "Account, notification and security settings." },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  { icon: UserCog, label: "Account" },
  { icon: Bell, label: "Notifications" },
  { icon: Lock, label: "Security" },
  { icon: Globe, label: "Language & Region" },
  { icon: CreditCard, label: "Billing" },
  { icon: Smartphone, label: "Mobile App" },
];

function SettingsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <header className="min-w-0">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, security and notification preferences.</p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-2 shadow-card lg:sticky lg:top-20 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sections.map((s, i) => (
              <li key={s.label} className="shrink-0 lg:shrink">
                <button className={"flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium " + (i === 0 ? "bg-saffron/10 text-saffron" : "text-foreground hover:bg-muted")}>
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">Account information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label>Full name</Label><Input defaultValue="Ravi Kumar" className="h-11" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="ravi@gangaview.in" className="h-11" /></div>
              <div className="space-y-2"><Label>Mobile</Label><Input defaultValue="+91 98XXXXXX21" className="h-11" /></div>
              <div className="space-y-2"><Label>Preferred language</Label><Input defaultValue="हिन्दी (Hindi)" className="h-11" /></div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" className="rounded-full">Cancel</Button>
              <Button className="rounded-full bg-gradient-saffron text-white hover:opacity-95">Save changes</Button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">Notifications</h2>
            <ul className="mt-4 divide-y divide-border">
              {[
                ["New enquiries", "SMS + Email when pilgrims contact you", true],
                ["Approval updates", "Status changes on your listings", true],
                ["Mela Authority alerts", "Important guidelines & advisories", true],
                ["Marketing tips", "Boost & promotion suggestions", false],
              ].map(([t, d, on]) => (
                <li key={t as string} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <div className="font-semibold">{t as string}</div>
                    <div className="text-sm text-muted-foreground">{d as string}</div>
                  </div>
                  <Switch defaultChecked={Boolean(on)} />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <h2 className="font-display text-lg font-bold text-destructive">Danger zone</h2>
            <p className="mt-1 text-sm text-muted-foreground">Logout or deactivate your vendor account.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-full"><LogOut className="mr-1 h-4 w-4" /> Logout</Button>
              <Button variant="outline" className="rounded-full border-destructive/40 text-destructive hover:bg-destructive hover:text-white">Deactivate account</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}