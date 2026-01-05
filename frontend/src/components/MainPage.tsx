import { useState } from "react";
import FileGrid from "./FileGrid";
import OptionsNav from "./OptionsNav";
import type { FileItem } from "../types";

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

  const [files, setFiles] = useState<FileItem[]>(filesData);

  return (
    <div>
      {/* button options */}
      <OptionsNav />
      <FileGrid files={files} setFiles={setFiles} />
    </div>
  )
}

export default MainPage;