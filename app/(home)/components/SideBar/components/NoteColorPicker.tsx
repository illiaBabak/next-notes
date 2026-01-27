'use client';

import { NotesUIContext } from '@/contexts/notesUI';
import { useAddNote } from '@/services/notes/mutations';
import { NOTE_COLORS } from '@/utils/constants';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';

export const NoteColorPicker = () => {
  const { setNoteCreatedId } = useContext(NotesUIContext);

  const [isColorsShow, setIsColorsShow] = useState(false);

  const { mutateAsync: addNote } = useAddNote();

  const handleAddNote = async (color: (typeof NOTE_COLORS)[number]) => {
    setIsColorsShow(false);

    setNoteCreatedId(`new-note`);

    await addNote(color);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        data-testid="add-note-btn"
        onClick={() => {
          setIsColorsShow(true);
        }}
        className="text-white bg-slate-900 select-none rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center text-3xl text-center mt-4 cursor-pointer duration-300 hover:scale-115"
      >
        +
      </div>

      {isColorsShow && (
        <AnimatePresence>
          <div className="flex flex-col gap-4 items-center mt-4 relative">
            {NOTE_COLORS.map((color, index) => {
              return (
                <motion.div
                  data-testid={`color-picker-${color}`}
                  onClick={() => handleAddNote(color)}
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
