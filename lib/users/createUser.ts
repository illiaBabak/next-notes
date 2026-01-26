import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../mongo';

const PASSWORD_REQUIRED_LENGTH = 6;

export type LoginResult = { ok: true; userId: string } | { ok: false; error: string };

export const createUser = async (username: string, password: string, confirmPassword: string) => {
  if (!username || !password) return { ok: false, error: 'Username and password are required' };

  if (password.length < PASSWORD_REQUIRED_LENGTH)
    return { ok: false, error: 'Password must be at least 6 characters long' };

  if (password !== confirmPassword)
    return { ok: false, error: 'Confirm password is not the same as password' };

  const db = await connectMongoDB();
  const users = db.collection('users');

  const isExistUser = await users.findOne({ username });

  if (isExistUser) return { ok: false, error: 'Username already taken' };

  const passwordHash = await bcrypt.hash(password, 10);

  const createdUser = users.insertOne({ username, password: passwordHash });

  return { ok: true, userId: (await createdUser).insertedId };
};
