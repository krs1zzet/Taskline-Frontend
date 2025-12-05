import { useEffect, useMemo, useRef, useState } from "react";
import GanttLib from "frappe-gantt";

// ----------------------------------------
// Types
// ----------------------------------------
type ViewMode = "Day" | "Week" | "Month" | "Year";
type TaskType = "project" | "task" | "milestone";

interface FrappeTask {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies?: string;
  custom_class?: string;
  type?: TaskType;
  parentId?: string | null;
}

// ----------------------------------------
// Utils
// ----------------------------------------
const pad = (n: number) => String(n).padStart(2, "0");
const toYMD = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d: Date, days: number) =>
  new Date(d.getTime() + days * 86400000);

// Gantt constructor safe wrapper
const Gantt: any = GanttLib;

function createGantt(selector: string, tasks: FrappeTask[], options: any) {
  try {
    return new Gantt(selector, tasks, options);
  } catch {
    return Gantt(selector, tasks, options);
  }
}

// Normalize
function normalizeTasks(tasks: FrappeTask[]): FrappeTask[] {
  return tasks.map((t) => ({
    ...t,
    start: typeof t.start === "string" ? t.start : toYMD(t.start as any),
    end: typeof t.end === "string" ? t.end : toYMD(t.end as any),
    dependencies: t.dependencies || "",
    progress: typeof t.progress === "number" ? t.progress : 0
  }));
}

// Fix project date ranges
function fixProjectRanges(tasks: FrappeTask[]): FrappeTask[] {
  const cloned = [...tasks];
  const byId = Object.fromEntries(cloned.map((x) => [x.id, x]));

  for (const t of cloned) {
    if (t.type === "project") {
      const children = cloned.filter((c) => c.parentId === t.id);
      if (!children.length) continue;

      const start = children.map((c) => c.start).sort()[0];
      const end = children.map((c) => c.end).sort().reverse()[0];

      t.start = start;
      t.end = end;
    }
  }

  return cloned;
}

// ----------------------------------------
// MAIN PLAYGROUND COMPONENT
// ----------------------------------------
export default function FrappeGanttPlayground() {
  const containerId = "fgp-container";
  const ganttRef = useRef<any>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [columnWidth, setColumnWidth] = useState(45);
  const [barHeight, setBarHeight] = useState(30);
  const [cornerRadius, setCornerRadius] = useState(3);
  const [padding, setPadding] = useState(18);
  const [arrowCurve, setArrowCurve] = useState(5);
  const [readonly, setReadonly] = useState(false);

  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState<FrappeTask | null>(null);

  // ----------------------------------------
  // TASK SET (SAFE)
  // ----------------------------------------
  const tasks = useMemo(() => {
    const today = new Date();

    const raw: FrappeTask[] = [
      {
        id: "p1",
        name: "Taskline MVP",
        start: toYMD(addDays(today, -2)),
        end: toYMD(addDays(today, 18)),
        progress: 25,
        type: "project"
      },
      {
        id: "t1",
        name: "Auth Setup",
        start: toYMD(addDays(today, 0)),
        end: toYMD(addDays(today, 4)),
        progress: 70,
        parentId: "p1"
      },
      {
        id: "t2",
        name: "Layout & Sidebar",
        start: toYMD(addDays(today, 2)),
        end: toYMD(addDays(today, 8)),
        progress: 30,
        dependencies: "t1",
        parentId: "p1"
      },
      {
        id: "t3",
        name: "Gantt Integration",
        start: toYMD(addDays(today, 6)),
        end: toYMD(addDays(today, 14)),
        progress: 10,
        dependencies: "t2",
        parentId: "p1"
      },
      {
        id: "m1",
        name: "MVP Beta",
        start: toYMD(addDays(today, 18)),
        end: toYMD(addDays(today, 18)),
        type: "milestone",
        dependencies: "t3",
        progress: 0,
        parentId: "p1"
      }
    ];

    return fixProjectRanges(normalizeTasks(raw));
  }, []);

  // ----------------------------------------
  // Render gantt
  // ----------------------------------------
  useEffect(() => {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = "";

    const options = {
      view_mode: viewMode,
      column_width: columnWidth,
      bar_height: barHeight,
      bar_corner_radius: cornerRadius,
      padding,
      arrow_curve: arrowCurve,
      infinite_padding: true,
      today_button: true,
      language: "tr",
      scroll_to: "today",
      readonly: false,

      on_click: (task: FrappeTask) => {
        setSelected(task);
        setLog((l) => [`Clicked: ${task.name}`, ...l]);
      },

      on_date_change: (task: FrappeTask, s: Date, e: Date) => {
        setLog((l) => [
          `Date changed → ${task.id}: ${toYMD(s)} → ${toYMD(e)}`,
          ...l
        ]);
      },

      on_progress_change: (task: FrappeTask, p: number) => {
        setLog((l) => [`Progress → ${task.id}: %${p}`, ...l]);
      },

      custom_popup_html: (task: FrappeTask) => `
        <div class="popup">
          <h4>${task.name}</h4>
          <p>${task.start} → ${task.end}</p>
          <p>Progress: ${task.progress}%</p>
        </div>
      `
    };

    ganttRef.current = createGantt(`#${containerId}`, tasks, options);

    return () => {
      el.innerHTML = "";
      ganttRef.current = null;
    };
  }, [tasks, viewMode, columnWidth, barHeight, cornerRadius, padding, arrowCurve, readonly]);

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <div className="gap-6 p-4">

      {/* Left – Gantt */}
      <div>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-3 items-center">
          <label>
            View:
            <select
              className="ml-2 border p-1 rounded"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
            >
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </label>

          <label className="ml-4">
            Column:
            <input
              type="number"
              className="ml-1 border p-1 w-16"
              value={columnWidth}
              onChange={(e) => setColumnWidth(Number(e.target.value))}
            />
          </label>

          <label className="ml-4">
            Bar height:
            <input
              type="number"
              className="ml-1 border p-1 w-16"
              value={barHeight}
              onChange={(e) => setBarHeight(Number(e.target.value))}
            />
          </label>

          <label className="ml-4">
            Corner:
            <input
              type="number"
              className="ml-1 border p-1 w-16"
              value={cornerRadius}
              onChange={(e) => setCornerRadius(Number(e.target.value))}
            />
          </label>

          <label className="ml-4">
            Padding:
            <input
              type="number"
              className="ml-1 border p-1 w-16"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
            />
          </label>

          <label className="ml-4">
            Arrow:
            <input
              type="number"
              className="ml-1 border p-1 w-16"
              value={arrowCurve}
              onChange={(e) => setArrowCurve(Number(e.target.value))}
            />
          </label>

          <label className="ml-4 flex items-center gap-1">
            <input
              type="checkbox"
              checked={readonly}
              onChange={(e) => setReadonly(e.target.checked)}
            />
            Readonly
          </label>
        </div>

        {/* Gantt container */}
        <div
          id={containerId}
          style={{
            height: 500,
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: 8
          }}
        />
      </div>

      {/* Right – Selected + Log */}
      <div>
        <h3 className="font-semibold mb-2">Selected task</h3>
        {selected ? (
          <div className="text-sm space-y-1">
            <p>ID: {selected.id}</p>
            <p>{selected.name}</p>
            <p>
              {selected.start} → {selected.end}
            </p>
            <p>Progress: {selected.progress}%</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">None</p>
        )}

        <h3 className="font-semibold mt-6 mb-2">Event log</h3>
        <ul className="text-sm max-h-80 overflow-auto space-y-1">
          {log.map((x, i) => (
            <li key={i}>• {x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
