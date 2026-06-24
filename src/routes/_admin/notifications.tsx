import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Bell, Users, Megaphone, BadgeCheck, XCircle, Calendar, Info } from "lucide-react";

export const Route = createFileRoute("/_admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Admin" }] }),
  component: NotificationsPage,
});

const templates = [
  { title: "Approval Notification", icon: BadgeCheck, color: "bg-emerald-100 text-emerald-700" },
  { title: "Rejection Notification", icon: XCircle, color: "bg-rose-100 text-rose-700" },
  { title: "Event Updates", icon: Calendar, color: "bg-sacred-blue/10 text-sacred-blue" },
  { title: "Kumbh Guidelines", icon: Info, color: "bg-saffron/10 text-saffron" },
];

const recent = [
  { title: "Document resubmission required", to: "Specific Vendor · KMV-2852", time: "10m ago" },
  { title: "New Kumbh safety guidelines published", to: "All Vendors", time: "2h ago" },
  { title: "Hotels: KYC deadline this Friday", to: "Hotels Category", time: "1d ago" },
  { title: "Annapurna Mess approved", to: "Specific Vendor · KMV-2850", time: "2d ago" },
];

function NotificationsPage() {
  const [audience, setAudience] = useState<"All Vendors" | "Specific Vendor" | "Specific Category">("All Vendors");
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Notification Management</h1>
          <p className="text-sm text-muted-foreground">Send announcements, approvals or guidelines to vendors.</p>
        </header>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-4">
          <div>
            <Label className="text-sm">Send to</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["All Vendors", "Specific Vendor", "Specific Category"] as const).map((a) => (
                <Button key={a} type="button" size="sm" variant={audience === a ? "default" : "outline"} onClick={() => setAudience(a)} className="rounded-full">
                  <Users className="mr-1 h-4 w-4" />{a}
                </Button>
              ))}
            </div>
          </div>
          {audience !== "All Vendors" && (
            <div className="grid gap-2">
              <Label>{audience === "Specific Vendor" ? "Vendor ID or email" : "Category"}</Label>
              <Input placeholder={audience === "Specific Vendor" ? "e.g. KMV-2849" : "e.g. Hotels"} />
            </div>
          )}
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input placeholder="Notification title" />
          </div>
          <div className="grid gap-2">
            <Label>Message</Label>
            <Textarea rows={5} placeholder="Type your message…" />
          </div>
          <div className="flex justify-end">
            <Button className="rounded-full bg-gradient-saffron text-white"><Send className="mr-2 h-4 w-4" />Send Notification</Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-lg font-bold flex items-center gap-2"><Megaphone className="h-4 w-4 text-saffron" />Templates</h3>
          <div className="mt-3 grid gap-2">
            {templates.map((t) => (
              <button key={t.title} className="flex items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:bg-muted">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${t.color}`}><t.icon className="h-4 w-4" /></span>
                <span className="text-sm font-medium">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-lg font-bold flex items-center gap-2"><Bell className="h-4 w-4 text-saffron" />Recently sent</h3>
          <div className="mt-3 space-y-3">
            {recent.map((r) => (
              <div key={r.title} className="rounded-xl border border-border p-3">
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <Badge variant="outline" className="rounded-full">{r.to}</Badge>
                  <span>{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}