import { Link } from "@tanstack/react-router";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-3 backdrop-blur md:px-6">
      <SidebarTrigger className="shrink-0" />

      <div className="relative hidden flex-1 max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search listings, enquiries, documents…"
          className="h-10 rounded-full border-border bg-muted/60 pl-9 focus-visible:bg-background"
        />
      </div>
      <div className="flex-1 md:hidden" />

      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>

      <Link to="/notifications">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-saffron ring-2 ring-background" />
        </Button>
      </Link>

      <Badge className="hidden gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 sm:inline-flex">
        <ShieldCheck className="h-3.5 w-3.5" />
        Verified
      </Badge>

      <Link to="/profile" className="flex items-center gap-2">
        <Avatar className="h-9 w-9 ring-2 ring-saffron/30">
          <AvatarFallback className="bg-gradient-saffron text-white">RK</AvatarFallback>
        </Avatar>
        <div className="hidden text-left lg:block">
          <div className="text-sm font-semibold leading-tight">Ravi Kumar</div>
          <div className="text-xs text-muted-foreground leading-tight">Vendor #KMV-2849</div>
        </div>
      </Link>
    </header>
  );
}