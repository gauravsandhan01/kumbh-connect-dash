import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Briefcase, Plus, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Listings", url: "/listings", icon: Briefcase },
  { title: "Add", url: "/listings/add", icon: Plus, fab: true },
  { title: "Alerts", url: "/notifications", icon: Bell },
  { title: "Profile", url: "/profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
      <ul className="grid grid-cols-5 items-end gap-1 px-2">
        {items.map((item) => {
          const active =
            item.url === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.url || pathname.startsWith(item.url + "/");

          if (item.fab) {
            return (
              <li key={item.title} className="flex justify-center">
                <Link
                  to={item.url}
                  className="-mt-7 grid h-14 w-14 place-items-center rounded-full bg-gradient-saffron text-white shadow-elevated ring-4 ring-background"
                  aria-label="Add business"
                >
                  <item.icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }

          return (
            <li key={item.title}>
              <Link
                to={item.url}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-saffron" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5", active && "scale-110")} />
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}