import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Hotel,
  UtensilsCrossed,
  Soup,
  Store,
  HeartPulse,
  Bus,
  Tent,
  Layers,
  FileCheck2,
  Bell,
  BarChart3,
  Settings,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { KumbhLogo } from "./logo";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth";

const main = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Vendor Management", url: "/admin/vendors", icon: Users },
  { title: "Business Approvals", url: "/admin/approvals", icon: ClipboardCheck, badge: "24" },
];

const business = [
  { title: "Hotels", url: "/admin/businesses?cat=hotels", icon: Hotel },
  { title: "Mess Services", url: "/admin/businesses?cat=mess", icon: Soup },
  { title: "Restaurants", url: "/admin/businesses?cat=restaurants", icon: UtensilsCrossed },
  { title: "Shops", url: "/admin/businesses?cat=shops", icon: Store },
  { title: "Medical Stores", url: "/admin/businesses?cat=medical", icon: HeartPulse },
  { title: "Transport", url: "/admin/businesses?cat=transport", icon: Bus },
  { title: "Accommodation", url: "/admin/businesses?cat=accommodation", icon: Tent },
];

const manage = [
  { title: "Categories", url: "/admin/categories", icon: Layers },
  { title: "Documents", url: "/admin/documents", icon: FileCheck2 },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Reports & Analytics", url: "/admin/reports", icon: BarChart3 },
];

const account = [
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();
  const isActive = (url: string) => {
    const path = url.split("?")[0];
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/admin/dashboard" className="block">
          <KumbhLogo />
        </Link>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-sacred-blue/10 px-2.5 py-1.5 text-xs font-semibold text-sacred-blue">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin Console
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto h-5 bg-saffron px-1.5 text-[10px] text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Businesses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {business.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manage.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                signOut();
                navigate({ to: "/login" });
              }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}