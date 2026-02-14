import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import { useAppSelector } from "../../shared/hooks/hooks";
import MediaPage from "../../modules/media/MediaPage";

export default function MainLayout() {
  const [currentCategory, setCurrentCategory] = useState<string>("All Images");
  const search = useAppSelector((state) => state.search.value);
  const theme = useAppSelector((state) => state.theme.value);


  useEffect(() => {
    if (theme === "dark")
      document.documentElement.classList.toggle("dark", theme === "dark");
    else
      document.documentElement.classList.toggle("dark", theme !== "light");
  }, [theme]);

  return (
    <div className="bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans antialiased">
      <Topbar />

      <div className="flex">
        <Sidebar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        {currentCategory === "All Images" && <MediaPage />}
      </div>
    </div>
  );
}