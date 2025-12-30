"use server";

import { loginUser } from "@/lib/users/loginUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

type State = { ok: boolean; error?: string };

export const loginAction = async (
  _: State,
  formData: FormData
): Promise<State> => {
  const username = (formData.get("username") ?? "").toString();
  const password = (formData.get("password") ?? "").toString();

  const result = await loginUser(username, password);

  if (!result.ok)
    return {
      ok: false,
      error: result.error,
    };

  const token = jwt.sign({ username }, process.env.JWT_SECRET ?? "", {
    expiresIn: "7d",
  });

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/");
};
