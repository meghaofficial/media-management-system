import { BsThreeDotsVertical } from "react-icons/bs";
import type { FolderItem } from "../types";
import { useState } from "react";
import Popup from "../ReusableComponents/Popup";

type FolderCardType = {
  activeFolder: FolderItem | null;
  setActiveFolder: React.Dispatch<React.SetStateAction<FolderItem | null>>;
  id: string;
};

export default function FolderCard({ activeFolder, setActiveFolder, id } : FolderCardType) {

  const [editFolder, setEditFolder] = useState<string>("");
    const [open, setOpen] = useState(false);


  return (
    <>
      {activeFolder?.id?.toString() === id ? (
        <div className="cursor-pointer">
          <svg  
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            className="w-25 h-25 text-[#2a2d36]"
          >
            <path d="M88 289.6L64.4 360.2L64.4 160C64.4 124.7 93.1 96 128.4 96L267.1 96C280.9 96 294.4 100.5 305.5 108.8L343.9 137.6C349.4 141.8 356.2 144 363.1 144L480.4 144C515.7 144 544.4 172.7 544.4 208L544.4 224L179 224C137.7 224 101 250.4 87.9 289.6zM509.8 512L131 512C98.2 512 75.1 479.9 85.5 448.8L133.5 304.8C140 285.2 158.4 272 179 272L557.8 272C590.6 272 613.7 304.1 603.3 335.2L555.3 479.2C548.8 498.8 530.4 512 509.8 512z" />
          </svg>
        </div>
      ) : (
        <div className="cursor-pointer relative" onClick={() => setActiveFolder(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-25 h-25 text-[#2a2d36]"
            fill="currentColor"
          >
            <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z" />
          </svg>
          <p className="absolute bottom-6 left-4.5 text-[14px] text-gray-500">3 Files</p>
          {/* menu */}
          <div className={`absolute top-7 right-4 text-gray-500 p-1`} onClick={(e) => {
            e.stopPropagation();
            setEditFolder(id);
            setOpen(true);
            // alert("hi")
          }}>
            <BsThreeDotsVertical size={12} />
          </div>
        </div>
      )}

      {/* <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Open Popup
      </button> */}

      <Popup open={open} onClose={() => setOpen(false)}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" className="rounded-full h-10 w-10 object-cover" alt="" />
      </Popup>
    </>
  )
}
