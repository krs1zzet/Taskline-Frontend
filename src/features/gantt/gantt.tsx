import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gantt, Task, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";


export type GanttDemoProps = {
  workbookId?: string | number;
  initialViewMode?: ViewMode;
  initialShowList?: boolean;
  tasksProp?: Task[];
  height?: number;
  captureRef?: React.Ref<HTMLDivElement>;
  onReady?: (ready: boolean) => void;
  onTasks?: (tasks: Task[]) => void;

  /** ✅ Şimdilik dummy veri ile çalışsın */
  useDummyData?: boolean;
};

const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const GanttDemo: React.FC<GanttDemoProps> = ({
  workbookId,
  initialViewMode = ViewMode.Day,
  initialShowList = true,
  tasksProp,
  height,
  captureRef,
  onReady,
  onTasks,
  useDummyData = true, // ✅ default dummy
}) => {
  const [view, setView] = useState<ViewMode>(initialViewMode);
  const [showList, setShowList] = useState<boolean>(initialShowList);

  const dummyTasks = useMemo<Task[]>(() => {
    const today = startOfDay(new Date());

    const p1Start = addDays(today, -2);
    const p1End = addDays(today, 18);

    return [
      {
        id: "p1", //issue key
        name: "Taskline MVP", // issue description
        type: "project", //issue type
        start: p1Start, //calculated start
        end: p1End, ///calculated end
        progress: 28, // statu progress
        hideChildren: false, //
      },
      {
        id: "t1", //
        name: "Auth (Login/Register)",
        type: "task",
        start: addDays(today, 0),
        end: addDays(today, 4),
        progress: 80,
        project: "p1",
      },
      {
        id: "t2",
        name: "Protected Layout + Sidebar",
        type: "task",
        start: addDays(today, 2),
        end: addDays(today, 9),
        progress: 35,
        project: "p1",
        dependencies: ["t1"],
      },
      {
        id: "t3",
        name: "Gantt ekranı entegrasyonu",
        type: "task",
        start: addDays(today, 6),
        end: addDays(today, 14),
        progress: 10,
        project: "p1",
        dependencies: ["t2"],
      },
      {
        id: "m1",
        name: "Beta",
        type: "milestone",
        start: p1End,
        end: p1End,
        progress: 0,
        project: "p1",
        dependencies: ["t3"],
      },

      {
        id: "p2",
        name: "Ops & Docs",
        type: "project",
        start: addDays(today, 1),
        end: addDays(today, 12),
        progress: 15,
      },
      {
        id: "t4",
        name: "Readme / Setup",
        type: "task",
        start: addDays(today, 1),
        end: addDays(today, 3),
        progress: 40,
        project: "p2",
      },
      {
        id: "t5",
        name: "Deploy checklist",
        type: "task",
        start: addDays(today, 4),
        end: addDays(today, 8),
        progress: 0,
        project: "p2",
        dependencies: ["t4"],
      },
    ];
  }, []);

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (tasksProp) return tasksProp;
    if (useDummyData) return dummyTasks;
    return [];
  });

  const [loading, setLoading] = useState<boolean>(() => {
    // Dummy veya tasksProp varken loading yok
    if (tasksProp || useDummyData) return false;
    return !!workbookId;
  });

  const [error, setError] = useState<string>("");

  const [isFill, setIsFill] = useState(false);
  const [viewportH, setViewportH] = useState<number>(window.innerHeight);
  const [toolbarH, setToolbarH] = useState<number>(0);

  useEffect(() => {
    onTasks?.(tasks);
  }, [tasks, onTasks]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const setCaptureNode = useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node ?? null;
      if (!captureRef) return;
      if (typeof captureRef === "function") captureRef(node);
      else if (typeof captureRef === "object") {
        try {
          (captureRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        } catch {}
      }
    },
    [captureRef]
  );

  const toolbarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => {
      setViewportH(window.innerHeight);
      setToolbarH(toolbarRef.current?.offsetHeight ?? 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (toolbarRef.current) ro.observe(toolbarRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ✅ tasks kaynağı seçimi (mantık aynı, sadece dummy seçeneği eklendi)
  useEffect(() => {
    if (tasksProp) {
      setTasks(tasksProp);
      setLoading(false);
      return;
    }

    if (useDummyData) {
      setTasks(dummyTasks);
      setLoading(false);
      setError("");
      return;
    }

    if (!workbookId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    

    return () => {
      cancelled = true;
    };
  }, [workbookId, tasksProp, useDummyData, dummyTasks]);

  const prevReadyRef = useRef<boolean | null>(null);
  useEffect(() => {
    const isReady = !loading && !error && (tasksProp ? tasksProp.length > 0 : tasks.length > 0);
    if (prevReadyRef.current !== isReady) {
      prevReadyRef.current = isReady;
      onReady?.(isReady);
    }
  }, [loading, error, tasks, tasksProp, onReady]);

  const columnWidth = useMemo(() => {
    switch (view) {
      case ViewMode.Year:
        return 350;
      case ViewMode.Month:
        return 300;
      case ViewMode.Week:
        return 200;
      default:
        return 60;
    }
  }, [view]);

  

  const handleTaskDelete = useCallback((task: Task) => {
    const conf = window.confirm(`"${task.name}" silinsin mi?`);
    if (conf) setTasks((prev) => prev.filter((t) => t.id !== task.id));
    return conf;
  }, []);

  const handleProgressChange = useCallback((task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }, []);

  const handleDblClick = useCallback((task: Task) => {
    alert("On Double Click event Id : " + task.id);
  }, []);

  const handleSelect = useCallback((_task: Task, _isSelected: boolean) => {}, []);
  const handleExpanderClick = useCallback((task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  }, []);

  if (loading) return <div className="p-4">Yükleniyor…</div>;
  if (error) return <div className="p-4 text-red-600">Hata: {error}</div>;

  const ganttHeight = isFill ? Math.max(200, viewportH - toolbarH) : height ?? 1000;

  return (
    <div className="w-full">
      

      <div
        ref={setCaptureNode}
        className={isFill ? "fixed inset-0 z-50 bg-white grid grid-rows-[auto,1fr]" : "space-y-6"}
      >
        

        <div className={isFill ? "min-h-0 overflow-hidden" : ""}>
          {!isFill && <h3 className="font-semibold mb-2">Gantt</h3>}

          <Gantt
            key="gantt"
            tasks={tasks}
            viewMode={view}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDoubleClick={handleDblClick}
            onSelect={handleSelect}
            onExpanderClick={handleExpanderClick}
            listCellWidth={showList ? "120px" : ""}
            ganttHeight={ganttHeight}
            columnWidth={columnWidth}  
          />
        </div>
      </div>
    </div>
  );
};

export default GanttDemo;
