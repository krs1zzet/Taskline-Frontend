import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SidebarShell from "./SideBar/SidebarShell";
import SidebarNav from "./SideBar/SidebarNav";
import { useAuthUser } from "../../features/auth/hooks/useAuth";

export default function ProtectedLayout() {
    const { pathname } = useLocation();
    const transparent = pathname === "/";
  
    const { data: user, isLoading } = useAuthUser();
  
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const [collapsed, setCollapsed] = useState(() => {
      const v = localStorage.getItem("sidebar:collapsed");
      return v === "1";
    });
  
    useEffect(() => setMobileOpen(false), [pathname]);
    useEffect(() => {
      localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
    }, [collapsed]);
  
    if (isLoading) return <div className="min-h-screen" />;
    const hideSidebar = ["/", "/main-page"].includes(location.pathname);

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onSidebarToggle={() => setMobileOpen((v) => !v) } isProtectedRoute />


        <SidebarShell
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
          sidebar={<SidebarNav collapsed={collapsed} />}
          hideSidebar = {hideSidebar}
        >
          <main className="flex-1 min-w-0 p-4">
            <Outlet />
          </main>
        </SidebarShell>
  
      </div>
    );
  }