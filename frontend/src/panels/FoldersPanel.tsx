import { useState } from "react";
import FolderCard from "../components/FolderCard";
import type { FolderItem } from "../types";
export default function FoldersPanel() {

  const [activeFolder, setActiveFolder] = useState<FolderItem | null>(null);
  const [foldersList, setFoldersList] = useState<FolderItem[]>([
    { id: 1, name: "Folder 1", no_of_images: 3, icon: "", size: "5KB" },
    { id: 2, name: "Folder 2", no_of_images: 5, icon: "", size: "10MB" },
    { id: 3, name: "Folder 3", no_of_images: 10, icon: "", size: "50KB" },
    { id: 4, name: "Folder 4", no_of_images: 3, icon: "", size: "50MB" },
    { id: 5, name: "Folder 5", no_of_images: 16, icon: "", size: "0KB" },
    { id: 6, name: "Folder 6", no_of_images: 7, icon: "", size: "50KB" },
  ]);

  // const addFolder = () => {
  //   console.log("Test")
  //   setFoldersList(prev => ([ ...prev, { id: foldersList.length+1, name: `Folder ${foldersList.length+1}`, no_of_images: 4, icon: "" } ]));
  // }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {foldersList?.map((folder, index) => (
            <div key={index} onClick={() => setActiveFolder(prev => prev ? null : folder)}>
              <FolderCard
                key={index}
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                id={folder?.id.toString()}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}