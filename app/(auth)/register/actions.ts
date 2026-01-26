'use server';

import { createUser } from '@/lib/users/createUser';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type State = { ok: boolean; error?: string };

export const registerAction = async (_: State, formData: FormData): Promise<State> => {
  const username = (formData.get('username') ?? '').toString();
  const password = (formData.get('password') ?? '').toString();
  const confirmPassword = (formData.get('confirm-password') ?? '').toString();

  const result = await createUser(username, password, confirmPassword);

  if (!result.ok)
    return {
      ok: false,
      error: result.error,
    };

  const token = jwt.sign({ username }, process.env.JWT_SECRET ?? '', {
    expiresIn: '7d',
  });

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/');
};
