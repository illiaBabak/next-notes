import { deleteNote } from '@/lib/notes/deleteNote';
import { editNote } from '@/lib/notes/editNote';
import { cookies } from 'next/headers';

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const session = (await cookies()).get('session')?.value;

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const note = await req.json();

  if (!note) return Response.json({ error: 'Body is required' }, { status: 400 });

  const { id } = await params;

  const noteToUpdate = {
    ...note,
    _id: id,
  };

  const res = await editNote(noteToUpdate);

  return Response.json({ res }, { status: 201 });
};

export const DELETE = async (_: Request, { params }: { params: { id: string } }) => {
  const session = (await cookies()).get('session')?.value;

  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const res = await deleteNote(id);

  return Response.json({ res }, { status: 201 });
};
