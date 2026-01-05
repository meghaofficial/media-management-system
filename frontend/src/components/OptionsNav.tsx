import { motion } from "framer-motion";
import { useState } from "react";

const navItems = ["Default", "Faces", "Months", "Dates", "Size"];

export default function OptionsNav() {
  const [active, setActive] = useState("Faces");

  return (
    <nav className="flex items-center justify-center px-10 pt-5 mb-3 mt-5">
      <div className="w-full rounded-full bg-[#2b2b2b] p-2">
        <div className="relative flex gap-2">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className="relative z-10 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {active === item && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white dark:bg-[#050505] shadow"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
