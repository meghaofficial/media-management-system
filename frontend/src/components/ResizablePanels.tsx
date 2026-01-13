import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GoGrabber } from "react-icons/go";

const MIN = 40;
const RESIZER = 6;

export default function ResizablePanels() {
  const containerRef = useRef<HTMLDivElement>(null);

  // panel widths (px)
  const folderW = useRef(0);
  const imageW = useRef(0);
  const duplicateW = useRef(0);

  const active = useRef<"folder" | "duplicate" | null>(null);
  const lastX = useRef(0);

  const [, force] = useState(0);

  useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    const total = width - RESIZER * 2;

    folderW.current = imageW.current = duplicateW.current = total / 3;
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

      /* ===== folder EDGE ===== */
      if (active.current === "folder") {
        if (dx > 0) {
          let take = Math.min(imageW.current - MIN, dx);
          imageW.current -= take;
          folderW.current += take;
          dx -= take;

          if (dx > 0) {
            take = Math.min(duplicateW.current - MIN, dx);
            duplicateW.current -= take;
            folderW.current += take;
          }
        } else {
          let give = Math.min(folderW.current - MIN, -dx);
          folderW.current -= give;
          imageW.current += give;
        }
      }

      /* ===== duplicate EDGE ===== */
      if (active.current === "duplicate") {
        if (dx < 0) {
          dx = -dx;
          let take = Math.min(imageW.current - MIN, dx);
          imageW.current -= take;
          duplicateW.current += take;
          dx -= take;

          if (dx > 0) {
            take = Math.min(folderW.current - MIN, dx);
            folderW.current -= take;
            duplicateW.current += take;
          }
        } else {
          let give = Math.min(duplicateW.current - MIN, dx);
          duplicateW.current -= give;
          imageW.current += give;
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
        title="Folders"
        left={0}
        width={folderW.current}
        collapsed={collapsed(folderW.current)}
      />

      <Resizer
        left={folderW.current}
        onDown={x => {
          active.current = "folder";
          lastX.current = x;
        }}
      />

      <Panel
        title="Images"
        left={folderW.current + RESIZER}
        width={imageW.current}
        collapsed={collapsed(imageW.current)}
      />

      <Resizer
        left={folderW.current + imageW.current + RESIZER}
        onDown={x => {
          active.current = "duplicate";
          lastX.current = x;
        }}
      />

      <Panel
        title="Duplicates"
        left={folderW.current + imageW.current + RESIZER * 2}
        width={duplicateW.current}
        collapsed={collapsed(duplicateW.current)}
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

      <div className="w-full border-b-2 border-[#2a2a2a] absolute top-11"></div>

      <motion.div
        className="pt-14 px-4"
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
