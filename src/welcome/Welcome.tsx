import React, { useCallback, useContext, useRef } from 'react';
import { supabaseContext } from '../supabase/Supabase';

export default function Welcome() {
  const { user, supabase, reloadUser } = useContext(supabaseContext);
  const emailRef = useRef<HTMLInputElement>(null);

  const onLogin = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailRef?.current?.value || '',
      options: {
        emailRedirectTo: window.location.href,
      },
    });

    reloadUser();
  }, [reloadUser, supabase]);

  const onLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    reloadUser();
  }, [reloadUser, supabase]);

  return (
    <div className="col-span-4 self-center justify-self-center rounded-sm border-2 border-solid p-4">
      <h2 className="text-center">Welcome to Twordle!</h2>
      {!user && (
        <div className="flex flex-col gap-1">
          <input className="dark:text-black" id="user-email" type="email" ref={emailRef} />
          <button className="rounded-sm dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onLogin}>
            Log In
          </button>
        </div>
      )}
      {user && (
        <div className="flex flex-col gap-1">
          <span>You are signed in as {user.email}</span>
          <button className="rounded-sm dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
