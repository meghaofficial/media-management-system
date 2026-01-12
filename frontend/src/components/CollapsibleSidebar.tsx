import { motion } from "framer-motion";
import { FiMenu, FiHome, FiSettings, FiUser } from "react-icons/fi";

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 56;

export default function CollapsibleSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  return (
    <div className="flex h-full bg-[#0f1117] text-white">
      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: open ? SIDEBAR_WIDTH : COLLAPSED_WIDTH }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full bg-[#1a1c23] flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="h-14 flex items-center px-4 border-b border-white/10">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-xl hover:text-white/80"
          >
            <FiMenu />
          </button>

          <motion.span
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 font-semibold whitespace-nowrap"
          >
            Dashboard
          </motion.span>
        </div>

        {/* NAV */}
        <nav className="flex-1 py-3 space-y-1">
          <SidebarItem icon={<FiHome />} label="Home" open={open} />
          <SidebarItem icon={<FiUser />} label="Profile" open={open} />
          <SidebarItem icon={<FiSettings />} label="Settings" open={open} />
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