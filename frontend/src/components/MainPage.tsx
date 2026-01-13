import { useRef, useState } from "react";
import FileGrid from "./FileGrid";
import OptionsNav from "./OptionsNav";
import type { FileItem } from "../types";
import CollapsibleSidebar from "./CollapsibleSidebar";
import ResizablePanels from "./ResizablePanels";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaRecycleSolid } from "react-icons/lia";

const filesData: FileItem[] = [
  {
    org_index: 0,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    name: "IMG_593265.jpg",
    date: "7/11/19",
    size: "6.8 mb",
  },
  {
    org_index: 1,
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg",
    name: "IMG_461207.jpg",
    date: "7/27/13",
    size: "3.4 mb",
  },
  {
    org_index: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtF1Gz_Xsh2r_DfO5JaLspe4oKYcEGo-myBg&s",
    name: "IMG_593265.jpg",
    date: "7/11/19",
    size: "6.8 mb",
  },
  {
    org_index: 3,
    image: "https://i.pinimg.com/736x/18/c4/6b/18c46b9408ee828b07f8614e205be2e1.jpg",
    name: "IMG_461207.jpg",
    date: "7/27/13",
    size: "3.4 mb",
  },
  {
    org_index: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZZJmlZJdlRrWRyMzmwiNJtrass_vP3Axaw&s",
    name: "IMG_593265.jpg",
    date: "7/11/19",
    size: "6.8 mb",
  },
  {
    org_index: 5,
    image: "https://i.pinimg.com/originals/9c/b0/70/9cb070d62dc738a0c3a1a408d68e4af5.jpg",
    name: "IMG_461207.jpg",
    date: "7/27/13",
    size: "3.4 mb",
  },
  {
    org_index: 6,
    image: "https://m.media-amazon.com/images/I/81+AV5fok6L._AC_UF894,1000_QL80_.jpg",
    name: "IMG_593265.jpg",
    date: "7/11/19",
    size: "6.8 mb",
  },
];

const MainPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <div>

      <div className="flex h-screen w-full overflow-hidden">
        <CollapsibleSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <div className="flex-1 flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-3 px-4 bg-[#202020]">
            <span>LOGO</span>
            <div className="flex items-center gap-3">
              <button className="p-[1.5px] relative cursor-pointer group">
                <div
                  className="
                    relative
                    p-2 px-3
                    rounded
                    flex items-center justify-start
                    w-full
                    text-left
                    text-[12px]
                    font-medium
                    text-white
                    bg-indigo-500
                    group-hover:bg-indigo-500/80
                    group-hover:text-white/80
                  "
                >
                  Add More
                </div>
              </button>
              <div className="rounded bg-[#ff5b5b] hover:bg-[#ff5b5b]/80 cursor-pointer p-[8px]">
                <LiaRecycleSolid />
              </div>
            </div>
          </div>
          <ResizablePanels />
        </div>
      </div>




      {/* button options */}
      {/* <OptionsNav />
      <FileGrid files={files} setFiles={setFiles} /> */}
    </div>
  )
}

export default MainPage;