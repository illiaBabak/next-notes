import { connectMongoDB } from '../mongo';

export const getNotes = async (username: string) => {
  const db = await connectMongoDB();
  const collection = db.collection('notes');

  const userNotes = await collection.find({ username }).sort({ created_at: -1 });

  return await userNotes.toArray();
};
