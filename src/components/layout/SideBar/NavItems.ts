// navItems.ts
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings, LogOut, Sheet } from "lucide-react";

export type NavContext = {
  path: string;
  isAuthed: boolean;
  activeIssueKey?: string; 
  roles?: string[];
  flags?: Record<string, boolean>;
};

export type NavItem =
  | {
    type: "link";
    to: string | ((ctx: NavContext) => string);
    label: string;
    icon: LucideIcon;
    end?: boolean; // ✅ ekle
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
    to: (ctx) => `/issues/${ctx.activeIssueKey}`,
    label: "Issue Dashboard",
    icon: LayoutDashboard,
    end: true, // ✅ sadece tam /issues/:issueKey iken aktif
    showIf: (ctx) => ctx.isAuthed && !!ctx.activeIssueKey,
  },
  
  {
    type: "link",
    to: (ctx) => `/issues/${ctx.activeIssueKey}/gantt`,
    label: "Issue Gantt",
    icon: Settings,
    section: "top",
    showIf: (ctx) => ctx.isAuthed && !!ctx.activeIssueKey,
  },
  {
    type: "link",
    to: (ctx) => `/issues/${ctx.activeIssueKey}/excel`,
    label: "Issue Excel",
    icon: Sheet,
    section: "top",
    showIf: (ctx) => ctx.isAuthed && !!ctx.activeIssueKey,
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
