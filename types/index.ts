import { NOTE_COLORS } from '@/utils/constants';

export type Note = {
  _id: string;
  created_at: string;
  username: string;
  color: (typeof NOTE_COLORS)[number];
  text: string;
};

export type NoteCreate = Omit<Note, '_id'>;

export type NotesResponse = {
  notes: Note[];
};

export type CreatedId = {
  id: string;
};
