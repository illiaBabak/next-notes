import { ObjectId } from 'mongodb';
import { connectMongoDB } from '../mongo';

export const deleteNote = async (id: string) => {
  const db = await connectMongoDB();
  const col = db.collection('notes');

  const result = await col.deleteOne({ _id: new ObjectId(id) });

  return result;
};
