import bcrypt from "bcryptjs";
import { connectMongoDB } from "../mongo";

export type LoginResult =
  | { ok: true; userId: string }
  | { ok: false; error: string };

export const loginUser = async (username: string, password: string) => {
  if (!username || !password)
    return { ok: false, error: "Username and password are required" };

  const db = await connectMongoDB();
  const users = db.collection("users");

  const user = await users.findOne({ username });

  if (!user) return { ok: false, error: "Invalid credentials" };

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) return { ok: false, error: "Invalid credentials" };

  return { ok: true, userId: user._id };
};
