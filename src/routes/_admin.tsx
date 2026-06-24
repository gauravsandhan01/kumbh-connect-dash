import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/kumbh/admin-sidebar";
import { AdminHeader } from "@/components/kumbh/admin-header";

export const Route = createFileRoute("/_admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("kumbh.auth");
      const user = raw ? JSON.parse(raw) : null;
      if (!user || user.role !== "ADMIN") {
        throw redirect({ to: "/login" });
      }
    } catch (err) {
      if (err && typeof err === "object" && "to" in err) throw err;
      throw redirect({ to: "/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 pb-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}