import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search, ShieldCheck, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useAuth } from "@/lib/auth";

export function AdminHeader() {
  const navigate = useNavigate();
  const user = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-3 backdrop-blur md:px-6">
      <SidebarTrigger className="shrink-0" />

      <div className="relative hidden flex-1 max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search vendors, businesses, documents…"
          className="h-10 rounded-full border-border bg-muted/60 pl-9 focus-visible:bg-background"
        />
      </div>
      <div className="flex-1 md:hidden" />

      <Badge className="hidden gap-1 rounded-full border border-sacred-blue/20 bg-sacred-blue/10 px-2.5 py-1 text-sacred-blue hover:bg-sacred-blue/10 sm:inline-flex">
        <ShieldCheck className="h-3.5 w-3.5" />
        Admin · RBAC
      </Badge>

      <Link to="/admin/notifications">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-saffron ring-2 ring-background" />
        </Button>
      </Link>

      <Link to="/admin/profile" className="flex items-center gap-2">
        <Avatar className="h-9 w-9 ring-2 ring-sacred-blue/30">
          <AvatarFallback className="bg-sacred-blue text-white">AD</AvatarFallback>
        </Avatar>
        <div className="hidden text-left lg:block">
          <div className="text-sm font-semibold leading-tight">{user?.name ?? "Admin"}</div>
          <div className="text-xs text-muted-foreground leading-tight">{user?.email ?? "admin@kumbhmela.com"}</div>
        </div>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Sign out"
        onClick={() => {
          signOut();
          navigate({ to: "/login" });
        }}
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </header>
  );
}