import { useAppSelector } from "../../shared/hooks/hooks";
import ImageCard from "./ImageCard";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setImages } from "../../shared/state/slices/imageSlice";

const MediaPage = () => {

  const images = useAppSelector((state) => state.images.value);
  const search = useAppSelector((state) => state.search.value);
  const collections = useAppSelector((state) => state.collections.value);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const dispatch = useDispatch();

  const filteredImages = images.filter((img) => {
    // const matchesSearch = img.name.toLowerCase().includes(search.toLowerCase());
    // const matchesCategory =
    //   currentCategory === "All Images" || img.category === currentCategory;
    // return matchesSearch && matchesCategory;
    return img.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <main className="flex-1 p-8 lg:p-12 min-h-screen">
        {images?.length > 0 && (
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              All Images
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-4 mb-2 mt-4">
              <span>Total - {images?.length}</span> <span>|</span> <span>Selected - {selectedImages?.length}</span>
            </p>
            <div className="rounded border p-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                  checked={selectedImages?.length === images?.length}
                  onChange={() => {
                    if (selectedImages?.length === images?.length) {
                      setSelectedImages([]);
                    } else {
                      setSelectedImages(images.map(img => img?.id?.toString()))
                    }
                  }}
                />
                <p className={`${selectedImages?.length > 0 ? 'dark:text-white light:text-black' : 'text-zinc-500 dark:text-zinc-400'}`}>Selected All</p>
              </div>
              <div>
                {collections?.length > 0 && (
                  <select className={`text-[12px] outline-none border border-red-500 rounded py-1 cursor-pointer ${selectedImages?.length > 0 && 'me-4'}`}>
                    <option value="">Select Collection</option>
                    {collections?.map(coll => (
                      <option value={coll?.name} key={coll?.id}>{coll?.name}</option>
                    ))}
                  </select>
                )}
                {selectedImages?.length > 0 && (
                  <button className="cursor-pointer bg-red-500 rounded text-[12px] px-4 py-1" onClick={() => {
                    const arr = images?.filter(im => !selectedImages?.includes(im?.id?.toString()));
                    dispatch(setImages(arr));
                  }}>Remove</button>
                )}
              </div>
            </div>
          </header>
        )}

        {filteredImages?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
            {filteredImages.map((img) => (
              <div key={img.id}>
                <ImageCard img={img} isSelected={selectedImages?.includes(img?.id?.toString())} setSelectedImages={setSelectedImages} />
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
