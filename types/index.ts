export type Note = {
  _id: string;
  created_at: Date;
  username: string;
  color: string;
  text: string;
};

export type NoteCreate = Omit<Note, "_id">;

export type NotesResponse = {
  notes: Note[];
};

export type CreatedId = {
  id: string;
};
