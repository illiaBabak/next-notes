"use server";

import { createUser } from "@/lib/users/createUser";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type State = { ok: boolean; error?: string };

export const registerAction = async (
  _: State,
  formData: FormData
): Promise<State> => {
  const username = (formData.get("username") ?? "").toString();
  const password = (formData.get("password") ?? "").toString();
  const confirmPassword = (formData.get("confirm-password") ?? "").toString();

  const result = await createUser(username, password, confirmPassword);

  if (!result.ok)
    return {
      ok: false,
      error: result.error,
    };

  (await cookies()).set("session", "token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
};
