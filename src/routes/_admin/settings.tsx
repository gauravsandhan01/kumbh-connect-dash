import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, KeyRound, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_admin/settings")({
  head: () => ({ meta: [{ title: "Settings · Admin" }] }),
  component: SettingsPage,
});

const roles = [
  { name: "ADMIN", desc: "Full access to all modules", perms: ["Manage vendors", "Approve listings", "Verify documents", "Send notifications", "Manage categories", "View reports"] },
  { name: "VENDOR", desc: "Self-service portal access", perms: ["Manage own listings", "Upload documents", "View enquiries"] },
];

function SettingsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Portal configuration, security and role based access control.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
          <h2 className="font-display text-lg font-bold">Portal Settings</h2>
          <div className="grid gap-3">
            <div><Label>Portal Name</Label><Input defaultValue="Maha Kumbh Mela Vendor Portal" className="mt-1" /></div>
            <div><Label>Support Email</Label><Input defaultValue="support@kumbhmela.com" className="mt-1" /></div>
            <div><Label>Helpline</Label><Input defaultValue="1800-123-456" className="mt-1" /></div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div><div className="text-sm font-semibold">New vendor registrations</div><div className="text-xs text-muted-foreground">Allow new vendors to sign up</div></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div><div className="text-sm font-semibold">Auto-publish approved listings</div><div className="text-xs text-muted-foreground">Push to official portal & app</div></div>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-end"><Button className="rounded-full bg-gradient-saffron text-white"><Save className="mr-2 h-4 w-4" />Save changes</Button></div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
          <h2 className="font-display text-lg font-bold flex items-center gap-2"><KeyRound className="h-4 w-4 text-saffron" />Change Password</h2>
          <div className="grid gap-3">
            <div><Label>Current Password</Label><Input type="password" className="mt-1" /></div>
            <div><Label>New Password</Label><Input type="password" className="mt-1" /></div>
            <div><Label>Confirm Password</Label><Input type="password" className="mt-1" /></div>
          </div>
          <div className="flex justify-end"><Button variant="outline" className="rounded-full">Update password</Button></div>
          <div className="rounded-xl border border-saffron/30 bg-saffron/5 p-3 text-xs text-foreground/80">
            Passwords are stored using BCrypt encoding.
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold flex items-center gap-2"><Users className="h-4 w-4 text-saffron" />Roles & Permissions (RBAC)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <Badge className="rounded-full bg-sacred-blue/10 text-sacred-blue">{r.name}</Badge>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{r.desc}</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {r.perms.map((p) => (
                  <li key={p} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron" />{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}