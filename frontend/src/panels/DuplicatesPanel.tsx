import { motion } from "framer-motion";
import type { ImagesPanelType } from "../types";

export default function DuplicatesPanel({
  title,
  left,
  width,
  collapsed,
  foldersList,
  setFoldersList,
  activeFolderID,
  setActiveFolderID
}: ImagesPanelType) {
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
          <span>{title}</span>

        </motion.div>

        <div className="w-full border-b-2 border-[#2a2a2a] absolute top-11"></div>

        <motion.div
          className="pt-14 px-4"
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: collapsed ? "none" : "auto" }}
        >
          duplicated
        </motion.div>
      </div>
    </>
  )
}