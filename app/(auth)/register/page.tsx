'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from './actions';

const initialState = { ok: false, error: '' };

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="absolute top-1/2 left-1/2 flex sm:h-[500px] h-[450px] sm:w-[360px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/20 bg-white/10 sm:p-5 p-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <form
        action={formAction}
        className="flex h-full w-full flex-col justify-between gap-6 sm:p-2"
      >
        <div className="space-y-1">
          <h2 className="sm:text-3xl text-2xl font-semibold leading-tight">Welcome</h2>
          <p className="text-sm text-white/70">Sign up to continue.</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-medium text-white/80">Username</label>
            <input
              data-testid="username"
              name="username"
              type="text"
              placeholder="your.name"
              autoComplete="username"
              className="w-full rounded-xl border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 focus:bg-white/10 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-medium text-white/80">Password</label>
            <input
              data-testid="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 focus:bg-white/10 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-medium text-white/80">Confirm password</label>
            <input
              data-testid="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 focus:bg-white/10 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          {state.error && <p className="text-red-700 text-xs">{state.error}</p>}

          <Link href="login" className="text-sm text-white/60 hover:text-white cursor-pointer">
            Already have an account? Sign in
          </Link>
        </div>

        <button
          data-testid="sign-up-btn"
          disabled={isPending}
          type="submit"
          className={`cursor-pointer not-last-of-type:mt-2 w-full rounded-xl border border-white/80 bg-white/90 sm:py-3 py-2 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.6)] transition transform hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.98] ${
            isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
          }`}
        >
          {isPending ? 'Loading' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
