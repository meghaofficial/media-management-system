import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import { setSearch } from "../../shared/state/slices/searchSlice";
import { setTheme } from "../../shared/state/slices/themeSlice";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { setImages } from "../../shared/state/slices/imageSlice";

const Topbar = () => {

  const search = useAppSelector((state) => state.search.value);
  const theme = useAppSelector((state) => state.theme.value);
  const images = useAppSelector((state) => state.images.value);
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length > 50) {
      alert("You can upload maximum 50 images only.");
      e.target.value = "";
      return;
    }

    const imageArray = Array.from(files);
    const arr = imageArray.map((img, index) => ({
      id: Date.now() + Math.random(),
      name: `Image-${index + 1}`,
      category: "",
      url: img
    }));
    dispatch(setImages([...images, ...arr]));
    setProgress(0);
  };

  useEffect(() => {
    if (images?.length > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <>
      <nav className="bg-[#fafafa] dark:bg-[#09090b] sticky top-0 z-50 glass border-b border-zinc-200/50 dark:border-zinc-800/50 h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <span className="font-extrabold tracking-tight text-xl">
            IMAGR
          </span>

          <div className="hidden md:flex gap-6 text-sm font-semibold text-zinc-500">
            <label className={`hover:text-brand transition ${images?.length < 50 && 'hover:text-white cursor-pointer'}`} title={images?.length < 50 ? 'Can upload only upto 50 images' : undefined}>
              Upload
              {images?.length < 50 && (
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                  multiple
                />
              )}
            </label>
            {/* {progress > 0 && (
              <div className="w-37.5 flex items-center gap-4">
                <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden relative">
                  <div
                    className={`h-full liquid-loader ${progress < 100 && 'animate-[flow_2s_linear_infinite]'} transition-all duration-300 ease-out`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm">{progress}%</p>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-3 flex items-center opacity-40">
              <IoMdSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search images..."
              className="w-64 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:w-80 transition-all outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <button
            onClick={() => theme === "dark" ? dispatch(setTheme("light")) : dispatch(setTheme("dark"))}
            className="w-10 h-10 rounded-xl cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          <div className="w-10 h-10 rounded-full border-2 border-brand p-0.5">
            <img
              src="https://i.pravatar.cc"
              className="rounded-full"
              alt="avatar"
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Topbar
