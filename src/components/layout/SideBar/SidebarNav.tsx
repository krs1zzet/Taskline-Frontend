import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "../../../features/auth/hooks/useAuth";
import { NAV_ITEMS, NavContext, NavItem } from "./NavItems";

type Props = { collapsed?: boolean };
const HIDE_SIDEBAR_PATHS = ["/main-page", "/issues", "/"];

export default function SidebarNav({ collapsed = false }: Props) {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    signOut.mutate(undefined, { onSuccess: () => navigate("/", { replace: true }) });
  };

  const actions = {
    signOut: handleSignOut,
  } as const;


  const match = location.pathname.match(/^\/issues\/([^/]+)/);
  const activeIssueKey = match?.[1];

  const ctx: NavContext = {
    path: location.pathname,
    isAuthed: true,
    activeIssueKey,
  };

  const shouldHideSidebar = HIDE_SIDEBAR_PATHS.includes(location.pathname);

  const base = "flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-gray-100";
  const active = "bg-gray-100 font-medium";
  const collapsedCls = collapsed ? "justify-center" : "";

  const items: (NavItem & { onClick?: () => void })[] = shouldHideSidebar
  ? []
  : NAV_ITEMS
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
      const href = typeof item.to === "function" ? item.to(ctx) : item.to;

      return (
        <NavLink
          key={`${item.label}-${href}`}
          to={href}
          end={item.end}   // ✅ ekle
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
