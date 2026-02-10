type CategoryProps = {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ currentCategory, setCurrentCategory } : CategoryProps) => {

    const navItems = [
    "All Images",
    "Collections",
    "People",
    "Folders",
    "Duplicates",
  ];

  return (
    <>
     <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex flex-col p-6 border-r border-zinc-200/50 dark:border-zinc-800/50">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 px-4">
            Menu
          </p>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentCategory(item)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                  ${
                    currentCategory === item
                      ? "bg-brand/10 text-brand font-bold border border-brand/20"
                      : item === "Duplicates"
                      ? "text-red-500 hover:bg-red-500/5"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside> 
    </>
  )
}

export default Sidebar
