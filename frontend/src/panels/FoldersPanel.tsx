import { useState } from "react";
import FolderCard from "../components/FolderCard";
import type { FolderItem } from "../types";
export default function FoldersPanel() {

  const [activeFolder, setActiveFolder] = useState<FolderItem | null>(null);
  const [foldersList, setFoldersList] = useState<FolderItem[]>([
    { id: 1, name: "Folder 1", no_of_images: 3, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Young_girl_smiling_in_sunshine_%282%29.jpg/960px-Young_girl_smiling_in_sunshine_%282%29.jpg", size: "5KB" },
    { id: 2, name: "Folder 2", no_of_images: 5, icon: "https://i0.wp.com/pixahive.com/wp-content/uploads/2021/02/An-Indian-boy-375075-pixahive.jpg?fit=1702%2C2560&ssl=1", size: "10MB" },
    { id: 3, name: "Folder 3", no_of_images: 10, icon: "https://img.freepik.com/free-photo/close-up-portrait-handsome-smiling-young-man-white-t-shirt-blurry-outdoor-nature_176420-6305.jpg?semt=ais_user_personalization&w=740&q=80", size: "50KB" },
    { id: 4, name: "Folder 4", no_of_images: 3, icon: "", size: "50MB" },
    { id: 5, name: "Folder 5", no_of_images: 16, icon: "", size: "0KB" },
    { id: 6, name: "Folder 6", no_of_images: 7, icon: "", size: "50KB" },
  ]);

  const [activeFolderID, setActiveFolderID] = useState<string | number | null>("");

  const addFolder = () => {
    setFoldersList(prev => ([ ...prev, { id: foldersList.length+1, name: `Folder ${foldersList.length+1}`, no_of_images: 0, icon: "", size: "0KB" } ]));
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-wrap justify-center gap-x-5">
          {foldersList?.map((folder, index) => (
            <div key={index} 
            // onClick={() => setActiveFolder(prev => prev ? null : folder)}
            onClick={() => setActiveFolderID(prev => prev ? null : folder?.id)}
            >
              <FolderCard
                key={index}
                details={folder}
                activeFolderID={activeFolderID}
                setActiveFolderID={setActiveFolderID}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}