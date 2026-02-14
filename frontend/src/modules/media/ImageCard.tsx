import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import { removeImage, renameImage } from "../../shared/state/slices/imageSlice";
import type { ImageItem } from "../../shared/types";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type ImageCardProps = {
  img: ImageItem;
};

const ImageCard = ({ img }: ImageCardProps) => {

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const images = useAppSelector((state) => state.images.value);
  const [currImg, setCurrImg] = useState(img);

  const renameImg = (id: number | string, newName: string) => {
    dispatch(renameImage({ id, name: newName }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handlePrev = () => {
    const currIdx = images?.findIndex(im => im?.id === currImg?.id);
    if (currIdx > 0)
        setCurrImg(images[currIdx+-1]);
  }

  const handleForward = () => {
    const currIdx = images?.findIndex(im => im?.id === currImg?.id);
    if (currIdx < images?.length)
        setCurrImg(images[currIdx+1]);
  };

  return (
    <>
      <div className="relative" onClick={() => setOpen(true)}>
        <div className="bg-zinc-800 h-5 w-5 flex items-center z-9 justify-center rounded-full cursor-pointer absolute right-2 top-2" onClick={() => dispatch(removeImage(img?.id?.toString()))}>
          <RxCross2 />
        </div>
        <div
          className="relative group aspect-square rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-brand/20"
        >
          <img
            src={img?.url}
            className="w-full h-full cursor-pointer object-cover group-hover:scale-110 transition-transform duration-700"
            alt={img.name}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent">
            <input
              type="text"
              value={img.name}
              onChange={(e) => renameImg(img?.id?.toString(), e.target.value)}
              className="bg-transparent text-white font-bold text-sm outline-none border-b border-transparent focus:border-brand w-full transition-all"
            />
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">
              {img.category}
            </p>
          </div>
        </div>
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            // onClick={handleClose}
          >
            <IoChevronBack size={50} className="cursor-pointer" onClick={handlePrev} />
            <div
              className="relative animate-zoomIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currImg?.url}
                alt={currImg?.name}
                className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl transition-transform duration-300 scale-100"
              />
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 cursor-pointer bg-white text-black rounded-full w-10 h-10 shadow-lg hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            <IoChevronForward size={50} className="cursor-pointer" onClick={handleForward} />
          </div>
        </>
      )}
    </>
  )
}

export default ImageCard
