import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Popup({ open, onClose, children }: PopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Popup */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} 
          >
            <RxCross2 className="text-black absolute right-3 top-3 cursor-pointer" onClick={onClose} />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
