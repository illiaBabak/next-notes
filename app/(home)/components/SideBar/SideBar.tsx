import { NoteColorPicker } from './components/NoteColorPicker';
import { User } from './components/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export const SideBar = async () => {
  const token = (await cookies()).get('session')?.value ?? '';

  if (!token) redirect('/');

  const payload = jwt.verify(token, process.env.JWT_SECRET ?? '') as {
    username: string;
  };

  return (
    <div className="h-[100vh] min-w-[60px] max-w-[60px]  md:min-w-[80px] md:max-w-[80px] shadow-2xl bg-gray-100 justify-start flex flex-col items-center sticky top-0 left-0">
      <User username={payload.username} />
      <NoteColorPicker />
    </div>
  );
};
