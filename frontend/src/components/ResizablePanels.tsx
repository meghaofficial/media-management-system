import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GoGrabber } from "react-icons/go";

const MIN = 40;
const RESIZER = 6;

export default function ResizablePanels() {
  const containerRef = useRef<HTMLDivElement>(null);

  // panel widths (px)
  const htmlW = useRef(0);
  const cssW = useRef(0);
  const jsW = useRef(0);

  const active = useRef<"html" | "js" | null>(null);
  const lastX = useRef(0);

  const [, force] = useState(0);

  useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    const total = width - RESIZER * 2;

    htmlW.current = cssW.current = jsW.current = total / 3;
    force(v => v + 1);
  });

  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);

  /* ---------- DRAG LOGIC (UNCHANGED) ---------- */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!active.current) return;

      let dx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      /* ===== HTML EDGE ===== */
      if (active.current === "html") {
        if (dx > 0) {
          let take = Math.min(cssW.current - MIN, dx);
          cssW.current -= take;
          htmlW.current += take;
          dx -= take;

          if (dx > 0) {
            take = Math.min(jsW.current - MIN, dx);
            jsW.current -= take;
            htmlW.current += take;
          }
        } else {
          let give = Math.min(htmlW.current - MIN, -dx);
          htmlW.current -= give;
          cssW.current += give;
        }
      }

      /* ===== JS EDGE ===== */
      if (active.current === "js") {
        if (dx < 0) {
          dx = -dx;
          let take = Math.min(cssW.current - MIN, dx);
          cssW.current -= take;
          jsW.current += take;
          dx -= take;

          if (dx > 0) {
            take = Math.min(htmlW.current - MIN, dx);
            htmlW.current -= take;
            jsW.current += take;
          }
        } else {
          let give = Math.min(jsW.current - MIN, dx);
          jsW.current -= give;
          cssW.current += give;
        }
      }

      force(v => v + 1);
    };

    const up = () => (active.current = null);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, []);

  const collapsed = (w: number) => w < 60;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-[#0f1117] overflow-hidden"
    >
      <Panel
        title="HTML"
        left={0}
        width={htmlW.current}
        collapsed={collapsed(htmlW.current)}
      />

      <Resizer
        left={htmlW.current}
        onDown={x => {
          active.current = "html";
          lastX.current = x;
        }}
      />

      <Panel
        title="CSS"
        left={htmlW.current + RESIZER}
        width={cssW.current}
        collapsed={collapsed(cssW.current)}
      />

      <Resizer
        left={htmlW.current + cssW.current + RESIZER}
        onDown={x => {
          active.current = "js";
          lastX.current = x;
        }}
      />

      <Panel
        title="JS"
        left={htmlW.current + cssW.current + RESIZER * 2}
        width={jsW.current}
        collapsed={collapsed(jsW.current)}
      />
    </div>
  );
}

/* ---------- PANEL ---------- */
function Panel({
  title,
  left,
  width,
  collapsed,
}: {
  title: string;
  left: number;
  width: number;
  collapsed: boolean;
}) {
  return (
    <div
      className="absolute top-0 bottom-0 bg-[#191919] text-white overflow-hidden select-none"
      style={{ left, width }}
    >
      <motion.div
        className="absolute font-bold left-3"
        animate={{
          rotate: collapsed ? -90 : 0,
          top: collapsed ? "50%" : "10px",
        }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left center" }}
      >
        {title}
      </motion.div>

      <motion.div
        className="pt-10 px-4"
        animate={{ opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: collapsed ? "none" : "auto" }}
      >
        {title} Content
      </motion.div>
    </div>
  );
}

/* ---------- RESIZER ---------- */
function Resizer({
  left,
  onDown,
}: {
  left: number;
  onDown: (x: number) => void;
}) {
  return (
    <div
      className="absolute top-0 bottom-0 w-2 bg-[#2a2a2a]
                 cursor-col-resize z-10 flex items-center justify-center"
      style={{ left }}
      onMouseDown={(e) => onDown(e.clientX)}
    >
      <GoGrabber size={200} />
      {/* 2a2a2a */}
      </div>
  );
}
