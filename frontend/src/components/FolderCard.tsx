import { BsThreeDotsVertical } from "react-icons/bs";
import type { FolderItem } from "../types";
import { useState } from "react";
import Popup from "../ReusableComponents/Popup";

type FolderCardType = {
  details: FolderItem;
  activeFolderID: string | number | null;
  setActiveFolderID: React.Dispatch<React.SetStateAction<string | number | null>>;
};

export default function FolderCard({ details, activeFolderID, setActiveFolderID }: FolderCardType) {

  const [editFolder, setEditFolder] = useState<string>("");
  const [open, setOpen] = useState(false);


  return (
    <>
      {activeFolderID === details?.id ? (
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
        <div className="cursor-pointer relative" onClick={() => setActiveFolderID(null)}>
          {details.icon && (
            <img src={details?.icon} alt="" className="rounded-full h-8 w-8 object-cover absolute top-4.5 left-4" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-25 h-25 text-[#2a2d36]"
            fill="currentColor"
          >
            <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z" />
          </svg>
          <p className="absolute bottom-6 right-4.5 text-[14px] text-gray-500">{details?.no_of_images} Files</p>
          {/* menu */}
          {/* <div className={`absolute top-7 right-4 text-gray-500 p-1`} onClick={(e) => {
            e.stopPropagation();
            setEditFolder(id);
            setOpen(true);
            // alert("hi")
          }}>
            <BsThreeDotsVertical size={12} />
          </div> */}
        </div>
      )}

      <p className="relative -top-3.5 left-3 line-clamp-1 max-w-25 text-[14px]">{details?.name}</p>
      <p className="relative -top-3.5 left-3 line-clamp-1 max-w-25 text-[12px] text-gray-500">({details?.size})</p>

      {/* <Popup open={open} onClose={() => setOpen(false)}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" className="rounded-full h-10 w-10 object-cover" alt="" />
      </Popup> */}
    </>
  )
}
