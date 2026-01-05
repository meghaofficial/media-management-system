import { useRef, useState } from "react";
import Card from "./Card";
import type { FileItem } from "../types";

interface FileGridProps {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const FileGrid = ({ files, setFiles }: FileGridProps) => {
  const dragSource = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    dragSource.current = index;
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (index !== dragSource.current) {
      setOverIndex(index);
    }
  };

  const handleDrop = (index: number) => {
    const sourceIndex = dragSource.current;
    if (sourceIndex === null || sourceIndex === index) return;

    setFiles((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });

    resetDrag();
  };

  const resetDrag = () => {
    dragSource.current = null;
    setDraggingIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="grid grid-cols-6 gap-y-3 justify-items-center px-10 pb-10 pt-5">
      {files.map((file, index) => {
        const isDragging = draggingIndex === index;
        const isOver = overIndex === index;

        return (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            onDragEnd={resetDrag}
            className={`
              transition-all duration-150
              ${isDragging ? "opacity-50 scale-95" : ""}
              ${isOver ? "ring-2 ring-white/50 rounded-xl" : ""}
            `}
          >
            <Card {...file} />
          </div>
        );
      })}
    </div>
  );
};

export default FileGrid;