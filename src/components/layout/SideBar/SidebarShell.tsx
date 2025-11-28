import { useEffect } from "react";

export type SidebarShellProps = {
  open: boolean;
  onClose: () => void;

  collapsed: boolean;
  onToggleCollapsed: () => void;

  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function SidebarShell({
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
  sidebar,
  children,
}: SidebarShellProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex flex-1">
      {/* Desktop */}
      <aside
        className={[
          "hidden md:flex flex-col border-r bg-white",
          "transition-[width] duration-200 ease-out",
          collapsed ? "w-12" : "w-48",
        ].join(" ")}
      >
        <div
          className={[
            "h-14 border-b flex items-center",
            collapsed ? "justify-center" : "justify-between px-3",
          ].join(" ")}
        >
          {!collapsed && <span className="font-semibold">Menu</span>}
          <button
            onClick={onToggleCollapsed}
            className="rounded px-2 py-1.5 hover:bg-gray-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <div>{sidebar}</div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close sidebar" />
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl"
            tabIndex={-1}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
          >
            <div className="h-14 border-b px-3 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button className="rounded px-3 py-1.5 hover:bg-gray-100" onClick={onClose}>
                Kapat
              </button>
            </div>
            <div className="p-2">{/* mobile always expanded */}{sidebar}</div>
          </aside>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
