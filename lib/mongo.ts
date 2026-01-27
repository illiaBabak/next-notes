import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';

const dbName =
  process.env.APP_ENV === 'test' ? process.env.MONGODB_NAME_TEST : process.env.MONGODB_NAME_PROD;

const client = new MongoClient(uri);

export const connectMongoDB = async (): Promise<Db> => {
  try {
    const connection = await client.connect();
    const db = connection.db(dbName);

    return db;
  } catch {
    throw new Error('Something went wrong with MongoDB connection');
  }
};
