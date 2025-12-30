import { NoteColorPicker } from "./NoteColorPicker";
import { User } from "./User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export const SideBar = async () => {
  const token = (await cookies()).get("session")?.value ?? "";

  if (!token) redirect("/");

  const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as {
    username: string;
  };

  return (
    <div className="h-full w-[80px] shadow-2xl bg-gray-100 justify-start flex flex-col items-center">
      <User username={payload.username} />
      <NoteColorPicker />
    </div>
  );
};
