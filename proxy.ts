import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const isAuth = (await cookies()).get('session');

  if (req.nextUrl.pathname === '/' && !isAuth)
    return NextResponse.redirect(new URL('/login', req.url));
}
