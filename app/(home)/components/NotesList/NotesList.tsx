"use client";

import { NotesUIContext } from "@/contexts/notesUI";
import { useGetNotes } from "@/services/notes/queries";
import { useContext } from "react";
import { motion } from "motion/react";
import { Loader } from "@/components/Loader";

export const NotesList = () => {
  const { noteCreatedId } = useContext(NotesUIContext);

  const { data: notes, isLoading } = useGetNotes();

  return (
    <div className="flex flex-col mt-6 md:mt-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Notes</h1>
      <motion.div layout="position" className="grid gap-3 md:gap-8 mt-6 md:mt-8 w-full grid-template-columns:repeat(auto-fit,_minmax(190px,_190px))] md:[grid-template-columns:repeat(auto-fit,_minmax(240px,_240px))] justify-start">
        {!!notes?.length &&
          notes.map((note) => {
            const isJustCreatedNote = note._id === noteCreatedId;
            
            return (
              <motion.div
                layout="position"
                initial={
                  isJustCreatedNote
                    ? {
                        scale: 0,
                        opacity: 0,
                        rotate: -10,
                        y: 20,
                      }
                    : false
                }
                animate={{scale: 1, opacity: 1, rotate: 0, y: 0}}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  mass: 1,
                  duration: 1,
                }}
                className={`${note.color} w-[190px] h-[190px] md:w-[240px] md:h-[240px] rounded-3xl p-4`}
                key={`note-${note._id}`}
              >
                <p >
                  {note.text}
                </p>
              </motion.div>
            );
          })}
      </motion.div>

      {isLoading && <Loader/>}
    </div>
  );
};
