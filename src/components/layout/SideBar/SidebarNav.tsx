import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useSignOut } from "../../../features/auth/hooks/useAuth";

type Props = { collapsed?: boolean };

type NavItem =
  | { type: "link"; to: string; label: string; icon: any; section?: "top" | "bottom" }
  | { type: "action"; label: string; icon: any; onClick: () => void; section: "bottom" };

export default function SidebarNav({ collapsed = false }: Props) {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut.mutate(undefined, { onSuccess: () => navigate("/", { replace: true }) });
  };

  const base = "flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-gray-100";
  const active = "bg-gray-100 font-medium";
  const collapsedCls = collapsed ? "justify-center" : "";

  const items: NavItem[] = [
    { type: "link", to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "top" },
    { type: "link", to: "/gantt", label: "Gantt", icon: Settings, section: "top" },

    { type: "action", label: "Sign Out", icon: LogOut, onClick: handleSignOut, section: "bottom" },
  ];

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;

    if (item.type === "link") {
      return (
        <NavLink
          key={item.to}
          to={item.to}
          title={collapsed ? item.label : undefined}
          className={({ isActive }) => [base, isActive ? active : "", collapsedCls].join(" ")}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className={collapsed ? "sr-only" : ""}>{item.label}</span>
        </NavLink>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        onClick={item.onClick}
        title={collapsed ? item.label : undefined}
        className={[base, collapsedCls].join(" ")}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span className={collapsed ? "sr-only" : ""}>{item.label}</span>
      </button>
    );
  };

  const topItems = items.filter((i) => (i.section ?? "top") === "top");
  const bottomItems = items.filter((i) => i.section === "bottom");

  return (
    <nav className="h-full flex flex-col">
      <div className="space-y-1">{topItems.map(renderItem)}</div>

      <div className="mt-auto pt-3">
        <div className="mb-2 h-px bg-gray-200" />
        <div className="space-y-1">{bottomItems.map(renderItem)}</div>
      </div>
    </nav>
  );
}
