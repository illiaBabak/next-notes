"use client";

import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { motion, AnimatePresence } from "motion/react";
import { logoutAction } from "./actions";

export const User = ({ username }: { username: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => await logoutAction();

  return (
    <ClickAwayListener onClickAway={() => setIsModalOpen(false)}>
      <div className="relative">
        <div
          className="text-white bg-slate-900 select-none rounded-full w-[50px] h-[50px] flex items-center justify-center text-xl text-center mt-4 cursor-pointer duration-300 hover:scale-115"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {username[0].toLocaleUpperCase()}
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.2,
              }}
              className="absolute top-0 left-[60px] bg-white rounded-lg shadow-lg p-4 min-w-[200px] z-50 border border-gray-200"
            >
              <div className="text-gray-800 font-medium mb-3">{username}</div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};
