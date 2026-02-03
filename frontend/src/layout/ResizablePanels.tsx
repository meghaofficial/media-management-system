import { useEffect, useRef, useState } from "react";
import { GoGrabber } from "react-icons/go";
import type { FolderItem } from "../types";
import FoldersPanel from "../panels/FoldersPanel";
import ImagesPanel from "../panels/ImagesPanel";
import DuplicatesPanel from "../panels/DuplicatesPanel";

const MIN = 40;
const RESIZER = 6;

export default function ResizablePanels() {

  // UI BASED 
  const containerRef = useRef<HTMLDivElement>(null);
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

  // FUNCTIONALITY BASED
  const [foldersList, setFoldersList] = useState<FolderItem[]>([
    { id: 1, name: "Folder 1", no_of_images: 3, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg/960px-Young_girl_smiling_in_sunshine_%282%29.jpg", size: "5KB" },
    { id: 2, name: "Folder 2", no_of_images: 5, icon: "https://i0.wp.com/pixahive.com/wp-content/uploads/2021/02/An-Indian-boy-375075-pixahive.jpg?fit=1702%2C2560&ssl=1", size: "10MB" },
    { id: 3, name: "Folder 3", no_of_images: 10, icon: "https://img.freepik.com/free-photo/close-up-portrait-handsome-smiling-young-man-white-t-shirt-blurry-outdoor-nature_176420-6305.jpg?semt=ais_user_personalization&w=740&q=80", size: "50KB" },
    { id: 4, name: "Folder 4", no_of_images: 3, icon: "", size: "50MB" },
    { id: 5, name: "Folder 5", no_of_images: 16, icon: "", size: "0KB" },
    { id: 6, name: "Folder 6", no_of_images: 7, icon: "", size: "50KB" },
  ]);
  const [activeFolderID, setActiveFolderID] = useState<string | number | null>("");

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-[#0f1117] overflow-hidden"
    >
      {/* <Panel
        title="Collections"
        left={0}
        width={folderW.current}
        collapsed={collapsed(folderW.current)}
      /> */}
      <FoldersPanel 
        title="Collections" 
        left={0} 
        width={folderW.current} 
        collapsed={collapsed(folderW.current)} 
        foldersList={foldersList} 
        setFoldersList={setFoldersList} 
        activeFolderID={activeFolderID} 
        setActiveFolderID={setActiveFolderID} 
      />

      <Resizer
        left={folderW.current}
        onDown={x => {
          active.current = "folder";
          lastX.current = x;
        }}
      />

      {/* <Panel
        title="Images"
        left={folderW.current + RESIZER}
        width={imageW.current}
        collapsed={collapsed(imageW.current)}
      /> */}

      <ImagesPanel 
        title="Images" 
        left={folderW.current + RESIZER} 
        width={imageW.current} 
        collapsed={collapsed(imageW.current)} 
        foldersList={foldersList} 
        setFoldersList={setFoldersList} 
        activeFolderID={activeFolderID} 
        setActiveFolderID={setActiveFolderID} 
      />

      <Resizer
        left={folderW.current + imageW.current + RESIZER}
        onDown={x => {
          active.current = "duplicate";
          lastX.current = x;
        }}
      />

      {/* <Panel
        title="Duplicates"
        left={folderW.current + imageW.current + RESIZER * 2}
        width={duplicateW.current}
        collapsed={collapsed(duplicateW.current)}
      /> */}

      <DuplicatesPanel 
        title="Duplicated" 
        left={folderW.current + imageW.current + RESIZER * 2} 
        width={duplicateW.current} 
        collapsed={collapsed(duplicateW.current)} 
        foldersList={foldersList} 
        setFoldersList={setFoldersList} 
        activeFolderID={activeFolderID} 
        setActiveFolderID={setActiveFolderID} />
    </div>
  );
}

function Resizer({
  left,
  onDown,
}: {
  left: number;
  onDown: (x: number) => void;
}) {
  return (
    <div
      className="absolute top-0 bottom-0 w-2 bg-[#2a2a2a] cursor-col-resize z-10 flex items-center justify-center"
      style={{ left }}
      onMouseDown={(e) => onDown(e.clientX)}
    >
      <GoGrabber size={200} />
      {/* 2a2a2a */}
    </div>
  );
}
