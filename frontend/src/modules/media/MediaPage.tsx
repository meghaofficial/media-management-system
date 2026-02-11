import { useAppSelector } from "../../shared/hooks/hooks";
import ImageCard from "../../shared/components/ImageCard";

const MediaPage = () => {

  const images = useAppSelector((state) => state.images.value);
  const search = useAppSelector((state) => state.search.value);

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
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            All Images
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {/* Click a name to rename; use the search to filter. */}
            Total - {images?.length}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filteredImages.map((img) => (
            <div key={img.id}>
              <ImageCard img={img} />
            </div>
            // <div
            //   key={img.id}
            //   className="relative group aspect-square rounded-4xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-brand/20"
            // >
            //   <img
            //     src={`https://picsum.photos/${img.id + 50}/600`}
            //     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            //     alt={img.name}
            //   />

            //   <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent">
            //     <input
            //       type="text"
            //       value={img.name}
            //       onChange={(e) => renameImg(img.id, e.target.value)}
            //       className="bg-transparent text-white font-bold text-sm outline-none border-b border-transparent focus:border-brand w-full transition-all"
            //     />
            //     <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">
            //       {img.category}
            //     </p>
            //   </div>
            // </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default MediaPage
