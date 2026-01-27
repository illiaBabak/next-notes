import { defineConfig } from 'cypress';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, _config) {
      on('task', {
        async clearDatabase() {
          const uri = process.env.MONGODB_URI ?? '';

          const dbName = process.env.MONGODB_NAME_TEST;

          const client = new MongoClient(uri);

          try {
            const connection = await client.connect();
            const db = connection.db(dbName);

            await db.collection('users').deleteMany({});
            await db.collection('notes').deleteMany({});

            return null;
          } catch {
            throw new Error('Something went wrong with MongoDB connection');
          }
        },
      });
    },
  },
});
