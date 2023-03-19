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
  }, []);

  return (
    <div className="col-span-4 self-center justify-self-center rounded-sm border-2 border-solid p-4">
      <h2 className="text-center">Welcome to Twordle!</h2>
      {!user && (
        <div>
          <input className="dark:text-black" id="user-email" type="email" ref={emailRef} />
          <button onClick={onLogin}>Log In</button>
        </div>
      )}
      {user && <span>You are signed in as {user.email}</span>}
    </div>
  );
}
