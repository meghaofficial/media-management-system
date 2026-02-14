import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "../hooks/hooks";
import { removeImage, renameImage } from "../state/slices/imageSlice";
import type { ImageItem } from "../types";

type ImageCardProps = {
  img: ImageItem;
};

const ImageCard = ({ img }: ImageCardProps) => {

  const dispatch = useAppDispatch();

  const renameImg = (id: number | string, newName: string) => {
    dispatch(renameImage({ id, name: newName }));
  };

  return (
    <div className="relative">
      <div className="bg-zinc-800 h-5 w-5 flex items-center z-9 justify-center rounded-full cursor-pointer absolute right-2 top-2" onClick={() => dispatch(removeImage(img?.id?.toString()))}>
        <RxCross2 />
      </div>
      <div
        className="relative group aspect-square rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-brand/20"
      >
        <img
          src={URL.createObjectURL(img?.url)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
      {/* <div
        className="relative group aspect-square rounded-4xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-brand/20"
      >
        <img
          src={URL.createObjectURL(img?.url)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={img.name}
        />

        <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent">
          <input
            type="text"
            value={img.name}
            onChange={(e) => renameImg(img.id, e.target.value)}
            className="bg-transparent text-white font-bold text-sm outline-none border-b border-transparent focus:border-brand w-full transition-all"
          />
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">
            {img.category}
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default ImageCard
