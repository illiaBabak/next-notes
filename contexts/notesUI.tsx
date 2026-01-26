'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

type NotesUIContextType = {
  noteCreatedId: string;
  setNoteCreatedId: Dispatch<SetStateAction<string>>;
};

export const NotesUIContext = createContext<NotesUIContextType>({
  noteCreatedId: '',
  setNoteCreatedId: () => {
    throw new Error('Notes UI context is not initalized');
  },
});

export const NotesUIContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [noteCreatedId, setNoteCreatedId] = useState('');

  return (
    <NotesUIContext.Provider value={{ noteCreatedId, setNoteCreatedId }}>
      {children}
    </NotesUIContext.Provider>
  );
};
