import { useState } from "react";
import FolderCard from "../components/FolderCard";
import type { ImagesPanelType } from "../types";
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";

export default function FoldersPanel({
  title,
  left,
  width,
  collapsed,
  foldersList,
  setFoldersList,
  activeFolderID,
  setActiveFolderID
}: ImagesPanelType) {

  const [editFolderID, setEditFolderID] = useState<string | number | null>(null);
  const addFolder = () => {
    setFoldersList(prev => ([...prev, { id: foldersList.length + 1, name: `Folder ${foldersList.length + 1}`, no_of_images: 0, icon: "", size: "0KB" }]));
  }

  return (
    <>
      <div
        className="absolute top-0 bottom-0 bg-[#191919] text-white select-none"
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

          {/* Add button for folders */}
          {title === "Collections" && !collapsed && (
            <div className="rounded bg-[#4ade80] hover:bg-[#4ade80]/80 cursor-pointer p-1.25 text-black hover:text-white" onClick={addFolder}>
              <GoPlus />
            </div>
          )}

        </motion.div>

        <div className="w-full border-b-2 border-[#2a2a2a] absolute top-11"></div>

        <motion.div
          className="relative top-11 px-4 overflow-y-auto overflow-x-hidden"
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            pointerEvents: collapsed ? "none" : "auto",
            height: "calc(100% - 105px)"
          }}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-wrap justify-center gap-x-5">
              {foldersList?.map((folder, index) => (
                <div key={index}
                  // onClick={() => setActiveFolderID(prev => prev ? null : folder?.id)}
                  onClick={() =>
                    setActiveFolderID(prev =>
                      prev === folder.id ? null : folder.id
                    )
                  }
                >
                  <FolderCard
                    key={index}
                    details={folder}
                    activeFolderID={activeFolderID}
                    setActiveFolderID={setActiveFolderID}
                    setFoldersList={setFoldersList}
                    editFolderID={editFolderID}
                    setEditFolderID={setEditFolderID}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}