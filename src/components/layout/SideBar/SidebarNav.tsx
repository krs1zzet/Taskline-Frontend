import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "../../../features/auth/hooks/useAuth";
import { NAV_ITEMS, NavContext, NavItem } from "./NavItems";

type Props = { collapsed?: boolean };

export default function SidebarNav({ collapsed = false }: Props) {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    signOut.mutate(undefined, { onSuccess: () => navigate("/", { replace: true }) });
  };

  // action key -> gerçek handler map’i
  const actions = {
    signOut: handleSignOut,
  } as const;

  // burası büyüdükçe genişler (roles, flags vs)
  const ctx: NavContext = {
    path: location.pathname,
    isAuthed: true, // TODO: auth state'inden çek (örn !!user)
    // roles: user?.roles,
    // flags: featureFlags,
  };

  const base = "flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-gray-100";
  const active = "bg-gray-100 font-medium";
  const collapsedCls = collapsed ? "justify-center" : "";

  // 👇 sadece burada filtre + action binding
  const items: NavItem[] = NAV_ITEMS
    .filter((i) => (i.showIf ? i.showIf(ctx) : true))
    .map((i) => {
      if (i.type === "action") {
        return { ...i, onClick: actions[i.onClickKey] };
      }
      return i;
    });

  const renderItem = (item: NavItem & { onClick?: () => void }) => {
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

      {bottomItems.length > 0 && (
        <div className="mt-auto pt-3">
          <div className="mb-2 h-px bg-gray-200" />
          <div className="space-y-1">{bottomItems.map(renderItem)}</div>
        </div>
      )}
    </nav>
  );
}
