"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const COLORS = [
  "bg-red-400",
  "bg-orange-400",
  "bg-violet-400",
  "bg-sky-400",
  "bg-emerald-400",
] as const;

export const NoteColorPicker = () => {
  const [isColorsShow, setIsColorsShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onClick={() => {
          setIsColorsShow(true);
        }}
        className="text-white bg-slate-900 select-none rounded-full w-[50px] h-[50px] flex items-center justify-center text-3xl text-center mt-4 cursor-pointer duration-300 hover:scale-115"
      >
        +
      </div>

      {isColorsShow && (
        <AnimatePresence>
          <div className="flex flex-col gap-4 items-center mt-4 relative">
            {COLORS.map((color, index) => {
              return (
                <motion.div
                  onClick={() => setIsColorsShow(false)}
                  initial={{ opacity: 0, scale: 0.1, y: -15 + index * 15 }}
                  animate={{ opacity: 1, scale: 1, y: index * 32 }}
                  transition={{
                    duration: index / 14,
                    delay: index / 19,
                  }}
                  whileHover={{ scale: 1.15 }}
                  key={`color-${color}-${index}`}
                  className={`${color} w-[20px] h-[20px] rounded-full cursor-pointer duration-300 absolute`}
                />
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};
