import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Tab from "../ReusableComponents/Tab";
import { useState } from "react";
import Arrangements from "./Arrangements";

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 56;

type TabDetail = {
  name: string,
  isActive: boolean,
  isLoading: boolean
}

export default function CollapsibleSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [activeTab, setActiveTab] = useState<String>("Default");

  const [tabsDetails, setTabsDetails] = useState<TabDetail[]>([
    { name: "Default", isActive: true, isLoading: false },
    { name: "Faces", isActive: false, isLoading: false },
    { name: "Date", isActive: false, isLoading: false },
    { name: "Month", isActive: false, isLoading: false },
    { name: "Year", isActive: false, isLoading: false },
    { name: "File Size (lg / sm)", isActive: false, isLoading: false }
  ]);

  return (
    <div className="flex h-full bg-[#0f1117] text-white border-r border-[#2a2a2a]">
      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: open ? SIDEBAR_WIDTH : COLLAPSED_WIDTH }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full bg-[#202020] flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        {/* border-b border-white/10 */}
        <div className="h-14 flex items-center px-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-xl hover:text-white/80 cursor-pointer"
          >
            <FiMenu />
          </button>

          <motion.span
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 font-semibold whitespace-nowrap"
          >
            {/* Options */}
          </motion.span>
        </div>

        {/* NAV */}
        <nav className={`flex-1 space-y-1 relative transition-all duration-500 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}>
          {/* Upper tabs */}
          <div className={`px-4 w-full flex flex-col gap-2`}>
            {tabsDetails?.map((tab: TabDetail, index: number) => (
              <div key={index} onClick={() =>
                setTabsDetails(prev =>
                  prev.map((t, i) => ({
                    ...t,
                    isActive: i === index,
                  }))
                )
              }>
                <Tab isActive={tab.isActive} isLoading={tab.isLoading} name={tab.name} />
              </div>
            ))}
          </div>
          {/* Lower arrangements */}
          <div className="absolute bottom-4 px-4 w-full">
            {/* <div className="bg-[#2c2c2c] text-sm rounded-md p-3 cursor-pointer hover:bg-slate-950">Arrangement 1</div> */}
            <Arrangements />
          </div>
        </nav>
      </motion.aside>
    </div>
  );
}

/* ---------- SIDEBAR ITEM ---------- */
function SidebarItem({
  icon,
  label,
  open,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
}) {
  return (
    <button
      className="flex items-center h-11 px-4 w-full hover:bg-white/5 transition"
    >
      <span className="text-lg">{icon}</span>

      <motion.span
        animate={{
          opacity: open ? 1 : 0,
          x: open ? 0 : -10,
        }}
        transition={{ duration: 0.2 }}
        className="ml-3 text-sm whitespace-nowrap"
      >
        {label}
      </motion.span>
    </button>
  );
}