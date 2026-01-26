import { Note } from '@/types';
import { connectMongoDB } from '../mongo';
import { ObjectId } from 'mongodb';

export const editNote = async (note: Partial<Note>) => {
  const db = await connectMongoDB();
  const collection = db.collection('notes');

  const result = await collection.updateOne(
    { _id: new ObjectId(note._id) },
    { $set: { color: note.color, text: note.text } }
  );

  return result;
};
