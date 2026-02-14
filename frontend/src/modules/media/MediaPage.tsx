import { useAppSelector } from "../../shared/hooks/hooks";
import ImageCard from "./ImageCard";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useEffect, useState } from "react";
import type { ImageItem } from "../../shared/types";

const MediaPage = () => {

  const images = useAppSelector((state) => state.images.value);
  const search = useAppSelector((state) => state.search.value);
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);

  const filteredImages = images.filter((img) => {
    // const matchesSearch = img.name.toLowerCase().includes(search.toLowerCase());
    // const matchesCategory =
    //   currentCategory === "All Images" || img.category === currentCategory;
    // return matchesSearch && matchesCategory;
    return img.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleSelectAll = () => {}

  return (
    <>
      <main className="flex-1 p-8 lg:p-12 min-h-screen">
        {images?.length > 0 && (
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              All Images
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Total - {images?.length}
            </p>
          </header>
        )}

        {filteredImages?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredImages.map((img) => (
              <div key={img.id}>
                <ImageCard img={img} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-78 text-zinc-200 dark:text-zinc-800">
            <MdOutlineImageNotSupported size={80} />
            <span className="mt-3">Select Images by clicking on Upload button.</span>
          </div>
        )}
      </main>
    </>
  )
}

export default MediaPage
