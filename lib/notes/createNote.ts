import { NoteCreate } from '@/types';
import { connectMongoDB } from '../mongo';

export const createNote = async (note: NoteCreate) => {
  const db = await connectMongoDB();
  const collection = db.collection('notes');

  const insertedDoc = await collection.insertOne(note);

  return insertedDoc.insertedId;
};
