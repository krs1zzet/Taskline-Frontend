// navItems.ts
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";

export type NavContext = {
  path: string;
  isAuthed: boolean;
  roles?: string[];
  flags?: Record<string, boolean>;
};

export type NavItem =
  | {
      type: "link";
      to: string;
      label: string;
      icon: LucideIcon;
      section?: "top" | "bottom";
      showIf?: (ctx: NavContext) => boolean;
    }
  | {
      type: "action";
      label: string;
      icon: LucideIcon;
      section: "bottom";
      onClickKey: "signOut";
      showIf?: (ctx: NavContext) => boolean;
    };

const isOn =
  (prefix: string) =>
  (ctx: NavContext): boolean =>
    ctx.path.startsWith(prefix);

export const NAV_ITEMS: NavItem[] = [
  {
    type: "link",
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    section: "top",
    showIf: (ctx) => ctx.isAuthed && !isOn("/main-page")(ctx),
  },
  {
    type: "link",
    to: "/gantt",
    label: "Gantt",
    icon: Settings,
    section: "top",
    showIf: (ctx) => ctx.isAuthed && !isOn("/main-page")(ctx),
  },
  {
    type: "action",
    label: "Sign Out",
    icon: LogOut,
    section: "bottom",
    onClickKey: "signOut",
    showIf: (ctx) => ctx.isAuthed,
  },
];
