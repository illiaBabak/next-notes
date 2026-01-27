'use client';

import { useDeleteNote, useEditNote } from '@/services/notes/mutations';
import type { Note } from '@/types';
import { NOTE_COLORS } from '@/utils/constants';
import { useState, type JSX } from 'react';

type Props = {
  note: Note;
  onClose: () => void;
};

export const NoteModal = ({ note, onClose }: Props): JSX.Element => {
  const [selectedColor, setSelectedColor] = useState<(typeof NOTE_COLORS)[number]>(note.color);
  const [textToEdit, setTextToEdit] = useState(note.text);

  const { mutateAsync: editNote } = useEditNote();

  const { mutateAsync: deleteNote } = useDeleteNote();

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="h-[90%] w-[75%] md:w-1/2 bg-white relative rounded-lg p-5 cursor-default outline-2 outline-gray-200 shadow-md"
    >
      <div
        onClick={onClose}
        className="w-[20px] h-[20px] font-semibold flex items-center justify-center cursor-pointer hover:scale-110 duration-300 text-3xl text-center absolute top-[8px] right-[8px]"
      >
        x
      </div>

      <div className="flex flex-col items-center justify-start mt-4 h-full">
        <textarea
          data-testid="note-textarea"
          value={textToEdit}
          onChange={({ currentTarget: { value } }) => setTextToEdit(value)}
          className="
            w-full
            h-1/3
            md:h-1/2
            resize-none
            rounded-xl
            border-2
            border-stone-200
            bg-stone-50
            p-4
            text-base
            leading-relaxed
            text-stone-700
            shadow-inner
            outline-none
            transition-all
            duration-200
            focus:border-violet-400
            focus:bg-white
            focus:shadow-md
            overflow-y-auto
            [&::-webkit-scrollbar]:w-3
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-stone-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-stone-300
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-stone-100
            hover:[&::-webkit-scrollbar-thumb]:bg-stone-400
          "
        />

        <div className="flex flex-col justify-center items-center mt-8">
          <p className="text-xl">Choose color</p>
          <div className="flex flex-row mt-6">
            {NOTE_COLORS.map((color, index) => {
              return (
                <div
                  data-testid={`modal-color-${color}`}
                  onClick={() => setSelectedColor(color)}
                  key={`color-modal-${index}`}
                  className={`${color} ${selectedColor === color ? 'ring-3 ring-blue-500 ring-offset-2 ring-offset-white scale-110 duration-300' : ''} cursor-pointer w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full mx-2 md:mx-4 lg:mx-6`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col mt-8 w-[80%] gap-3 justify-center items-center absolute bottom-[24px]">
          <div
            data-testid="save-note-btn"
            onClick={async () => {
              onClose();
              await editNote({ ...note, _id: note._id, text: textToEdit, color: selectedColor });
            }}
            className={`w-full bg-green-500 text-white p-2 rounded-md cursor-pointer hover:scale-105 duration-300 text-center ${textToEdit === note._id && selectedColor === note.color ? 'bg-green-500' : 'bg-gray-500'}`}
          >
            Save
          </div>
          <div
            data-testid="delete-note-btn"
            onClick={async () => {
              onClose();
              await deleteNote(note._id);
            }}
            className="w-full bg-red-500 text-white p-2 rounded-md cursor-pointer hover:scale-105 duration-300 text-center"
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
