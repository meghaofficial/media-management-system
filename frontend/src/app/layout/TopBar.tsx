import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import { setSearch } from "../../shared/state/slices/searchSlice";
import { setTheme } from "../../shared/state/slices/themeSlice";

const Topbar = () => {

  const search = useAppSelector((state) => state.search.value);
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav className="bg-[#fafafa] dark:bg-[#09090b] sticky top-0 z-50 glass border-b border-zinc-200/50 dark:border-zinc-800/50 h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <span className="font-extrabold tracking-tight text-xl">
              I-IMAGR
            </span>

          <div className="hidden md:flex gap-6 text-sm font-semibold text-zinc-500">
            <button className="hover:text-brand transition">Upload</button>
            <button className="hover:text-brand transition">Job Status</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-3 flex items-center opacity-40">
              🔍
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
            className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {theme === "light" ? "☀️" : "🌙"}
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
