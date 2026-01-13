import { MdOutlineFileDownload } from "react-icons/md";

export default function Arrangements() {

  return (
    <>
      {/* Arrangement 1 */}
      <div className="flex items-center gap-3">
        {/* bg-[#2c2c2c] bg-slate-950 */}
        <div className={`text-sm rounded-md p-3 bg-[#2c2c2c] outline-2 outline-[#4ade80] w-full flex items-center justify-between`}>
          <span>Arrangement 1</span>
          <MdOutlineFileDownload size={18} className="cursor-pointer" />
        </div>
        {/* Will Add this in next version */}
        {/* <div className="bg-[#2c2c2c] rounded h-full cursor-pointer p-2">
          <GoPlus size={18} />
        </div> */}
      </div>
    </>
  )
}