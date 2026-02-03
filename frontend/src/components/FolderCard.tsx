import type { FolderItem } from "../types";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoCheck } from "react-icons/go";

type FolderCardType = {
  details: FolderItem;
  activeFolderID: string | number | null;
  editFolderID: string | number | null;
  setEditFolderID: React.Dispatch<React.SetStateAction<string | number | null>>;
  setActiveFolderID: React.Dispatch<React.SetStateAction<string | number | null>>;
  setFoldersList: React.Dispatch<React.SetStateAction<FolderItem[]>>;
};

export default function FolderCard({ details, activeFolderID, setActiveFolderID, setFoldersList, editFolderID, setEditFolderID }: FolderCardType) {

  const [folderName, setFolderName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveFolderName = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    setFoldersList(prev =>
      prev.map(folder =>
        folder.id === editFolderID
          ? { ...folder, name: folderName }
          : folder
      )
    );

    setEditFolderID(null);
  };

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
        <div className="cursor-pointer relative"
          onClick={(e) => {
            e.stopPropagation();
            setActiveFolderID(details?.id);
          }}
        >
          {details.icon && (
            <div onClick={(e) => e.stopPropagation()}>
              {/* <img src={details?.icon} alt="icon" className="rounded-full h-8 w-8 object-cover absolute top-4.5 left-4" /> */}
              <img
                src={details?.icon}
                alt=""
                className="rounded-full h-8 w-8 object-cover absolute top-4.5 left-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  e.stopPropagation();
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const previewUrl = URL.createObjectURL(file);

                  // update folder icon
                  setFoldersList(prev =>
                    prev.map(folder =>
                      folder.id === details.id
                        ? { ...folder, icon: previewUrl }
                        : folder
                    )
                  );
                }}
              />

            </div>
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
        </div>
      )}
      <p className="relative -top-3.5 left-3 line-clamp-1 max-w-25 text-[12px] text-gray-500">({details?.size})</p>
      {/* input or folder name */}
      <div className="relative -top-3.5 left-3 max-w-25 text-[14px]">
        {editFolderID === details?.id ? (
          <div className="flex items-center gap-1">
            <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="outline-none p-1 border border-gray-500 rounded max-w-20" onClick={(e) => e.stopPropagation()} placeholder={details?.name} />
            {folderName ? (
              <div
                className="rounded bg-[#4ade80] hover:bg-[#4ade80]/80 flex items-center justify-center p-1.5 cursor-pointer"
                onClick={handleSaveFolderName}
              >
                <GoCheck />
              </div>

            ) : (
              <RxCross2 className="cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                setEditFolderID(null);
              }} />
            )}
          </div>
        ) : (
          <p className="line-clamp-1"
            onClick={(e) => {
              e.stopPropagation();
              setEditFolderID(details?.id);
            }}
          >
            {details?.name}
          </p>
        )}
      </div>
    </>
  )
}
