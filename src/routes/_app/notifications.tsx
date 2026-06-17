import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Sparkles, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · Kumbh Vendor Portal" },
      { name: "description", content: "Approvals, enquiries and Mela authority updates." },
    ],
  }),
  component: NotificationsPage,
});

const groups = [
  {
    label: "Today",
    items: [
      { icon: CheckCircle2, tint: "bg-emerald-100 text-emerald-700", title: "Ganga View Hotel approved", desc: "Now live on Kumbh Mela app & website.", time: "10:24 AM", unread: true },
      { icon: MessageSquare, tint: "bg-sacred-blue/10 text-sacred-blue", title: "New enquiry from Anita Sharma", desc: "Room availability for Mauni Amavasya?", time: "09:12 AM", unread: true },
      { icon: Sparkles, tint: "bg-saffron/10 text-saffron", title: "Boost your listing", desc: "Add 3 more photos to rank higher in search.", time: "08:00 AM" },
    ],
  },
  {
    label: "Earlier this week",
    items: [
      { icon: AlertTriangle, tint: "bg-amber-100 text-amber-700", title: "FSSAI document expiring soon", desc: "Renew before 28 Jan to keep your mess listed.", time: "Mon" },
      { icon: Calendar, tint: "bg-rose-100 text-rose-700", title: "Mauni Amavasya Snan reminder", desc: "Expected 60M pilgrims. Prepare your inventory.", time: "Sun" },
      { icon: Bell, tint: "bg-muted text-foreground", title: "New Authority guideline", desc: "Updated parking rules for Sector 19. View PDF.", time: "Sat" },
    ],
  },
];

function NotificationsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">All approvals, enquiries and Mela Authority updates.</p>
        </div>
        <Button variant="outline" className="shrink-0 rounded-full">Mark all read</Button>
      </header>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {["All", "Unread", "Approvals", "Enquiries", "Authority", "Reminders"].map((t, i) => (
          <button
            key={t}
            className={
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium " +
              (i === 0 ? "border-saffron bg-saffron text-white" : "border-border bg-card text-foreground hover:border-saffron/40")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((g) => (
          <section key={g.label}>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <ul className="divide-y divide-border">
                {g.items.map((n, i) => (
                  <li key={i} className={"flex gap-4 px-5 py-4 " + (n.unread ? "bg-saffron/5" : "")}>
                    <div className={"grid h-11 w-11 shrink-0 place-items-center rounded-xl " + n.tint}>
                      <n.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{n.title}</span>
                          {n.unread && <Badge className="h-5 bg-saffron px-1.5 text-[10px] text-white hover:bg-saffron">New</Badge>}
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{n.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}