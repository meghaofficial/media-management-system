import { motion } from "framer-motion";
import { type FolderItem, type ImagesPanelType } from "../types";
import { useEffect, useState } from "react";

const ImagesPanel = ({
  title,
  left,
  width,
  collapsed,
  foldersList,
  setFoldersList,
  activeFolderID,
  setActiveFolderID
}: ImagesPanelType) => {

  const [activeFolder, setActiveFolder] = useState<FolderItem | null>(null);

  useEffect(() => {
    if (activeFolderID) {
      const match = foldersList.find(f => f.id?.toString() === activeFolderID?.toString());
      if (match) {
        setActiveFolder(match);
      }
    }
  }, [activeFolderID, foldersList]);

  return (
    <>
      <div
        className="absolute top-0 bottom-0 bg-[#191919] text-white overflow-hidden select-none"
        style={{ left, width }}
      >
        <motion.div
          className="absolute font-bold left-3 flex items-center justify-between w-[95%]"
          animate={{
            rotate: collapsed ? -90 : 0,
            top: collapsed ? "50%" : "10px",
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left center" }}
        >
          <div className="flex items-center gap-2">
            {activeFolderID && activeFolder?.icon && (
              <img src={activeFolder?.icon} alt="icon" className="h-6 w-6 rounded-sm object-cover" />
            )}
            <span>{activeFolderID ? activeFolder?.name : title}</span>
          </div>
          {activeFolderID && (
            <span>{activeFolder?.no_of_images}</span>
          )}

          {/* Add button for folders */}
          {/* {title === "Collections" && !collapsed && (
            <div className="rounded bg-[#4ade80] hover:bg-[#4ade80]/80 cursor-pointer p-[5px] text-black hover:text-white">
              <GoPlus />
            </div>
          )} */}

        </motion.div>

        <div className="w-full border-b-2 border-[#2a2a2a] absolute top-11"></div>

        <motion.div
          className="pt-14 px-4"
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: collapsed ? "none" : "auto" }}
        >
          images
        </motion.div>
      </div>
    </>
  )
}

export default ImagesPanel;