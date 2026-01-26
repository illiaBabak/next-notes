import { createNote } from '@/lib/notes/createNote';
import { NoteCreate } from '@/types';
import { getNotes } from '@/lib/notes/getNotes';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const DEFAULT_NOTE_TEXT = 'New note';

export const GET = async () => {
  const session = (await cookies()).get('session')?.value;

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = jwt.verify(session, process.env.JWT_SECRET ?? '') as {
    username: string;
  };

  const notes = await getNotes(payload.username);

  return Response.json({ notes }, { status: 200 });
};

export const POST = async (req: Request) => {
  const session = (await cookies()).get('session')?.value;

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = jwt.verify(session, process.env.JWT_SECRET ?? '') as {
    username: string;
  };

  const body = await req.json();

  const color = body.color.toString();

  if (!color) return Response.json({ error: 'Color is required!' }, { status: 400 });

  const date = new Date().toString();

  const newNote: NoteCreate = {
    created_at: date,
    username: payload.username,
    color,
    text: DEFAULT_NOTE_TEXT,
  };

  const id = await createNote(newNote);

  return Response.json({ id }, { status: 201 });
};
