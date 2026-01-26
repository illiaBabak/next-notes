'use client';

import { NotesUIContext } from '@/contexts/notesUI';
import { useGetNotes } from '@/services/notes/queries';
import { useContext, useState } from 'react';
import { motion } from 'motion/react';
import { Loader } from '@/components/Loader';
import Image from 'next/image';
import { Note } from '@/types';
import { NoteModal } from '../NoteModal/NoteModal';
import { OverlayModal } from '@/components/OverlayModal';

export const NotesList = () => {
  const { noteCreatedId } = useContext(NotesUIContext);

  const { data: notes, isLoading } = useGetNotes();

  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  return (
    <div className="flex flex-col mt-6 md:mt-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Notes</h1>
      <motion.div
        layout="position"
        className="grid gap-3 md:gap-8 mt-6 md:mt-8 w-full grid-template-columns:repeat(auto-fit,_minmax(190px,_190px))] md:[grid-template-columns:repeat(auto-fit,_minmax(240px,_240px))] justify-start"
      >
        {!!notes?.length &&
          notes.map((note) => {
            const isJustCreatedNote = note._id === noteCreatedId;

            const date = new Date(note.created_at);

            const year = date.getFullYear();
            const month = date.toLocaleDateString('default', { month: 'short' });
            const day = date.getDate();

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
                animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                  mass: 1,
                  duration: 1,
                }}
                className={`${note.color} flex flex-col justify-between w-[190px] h-[190px] md:w-[240px] md:h-[240px] rounded-3xl p-4`}
                key={`note-${note._id}`}
              >
                <p>{note.text}</p>
                <div className="flex w-full items-center flex-row justify-between">
                  <p className="italic text-sm relative bottom-0">{`${day} ${month} ${year}`}</p>
                  <div
                    onClick={() => setNoteToEdit(note)}
                    className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center border-2 border-slate-950 cursor-pointer"
                  >
                    <Image src="/pen.png" alt="pen" width={25} height={25} />
                  </div>
                </div>
              </motion.div>
            );
          })}
      </motion.div>

      {isLoading && <Loader />}

      {noteToEdit && (
        <OverlayModal onClose={() => setNoteToEdit(null)}>
          <NoteModal note={noteToEdit} onClose={() => setNoteToEdit(null)} />
        </OverlayModal>
      )}
    </div>
  );
};
