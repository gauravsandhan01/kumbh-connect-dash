import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/kumbh/app-sidebar";
import { TopHeader } from "@/components/kumbh/top-header";
import { MobileBottomNav } from "@/components/kumbh/mobile-bottom-nav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <TopHeader />
          <main className="flex-1 pb-24 md:pb-8">
            <Outlet />
          </main>
        </SidebarInset>
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}