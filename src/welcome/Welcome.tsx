import { Dialog } from '@headlessui/react';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { supabaseContext } from '../supabase/Supabase';

export default function Welcome() {
  const { user, supabase, reloadUser } = useContext(supabaseContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

  const onLogin = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailRef?.current?.value || '',
      options: {
        emailRedirectTo: window.location.href,
      },
    });

    if (!error) {
      setDialogOpen(true);
      reloadUser();
    } else {
      alert('Login failed: ' + error.message);
    }
  }, [reloadUser, supabase]);

  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
    reloadUser();
  }, [reloadUser, supabase]);

  const onCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  return (
    <div className="col-span-4 self-center justify-self-center rounded-sm border-2 border-solid p-4">
      <h2 className="mb-4 text-center">Welcome to Twordle!</h2>
      {!user && (
        <div className="flex flex-col items-center gap-4">
          <input className="dark:text-black" id="user-email" type="email" ref={emailRef} />
          <button className="w-fit rounded-sm p-2 dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onLogin}>
            Log In
          </button>
        </div>
      )}
      {user && (
        <div className="flex flex-col gap-4">
          <span>You are signed in as {user.email}</span>
          <button className="rounded-sm p-2 dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onLogout}>
            Log Out
          </button>
        </div>
      )}
      <Dialog className="relative z-10" open={dialogOpen} onClose={onCloseDialog}>
        <Dialog.Panel className="fixed inset-0 left-1/2 top-1/2 flex max-h-fit max-w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-sm p-4 dark:bg-slate-900 dark:text-white">
          <Dialog.Title>Login Email Sent!</Dialog.Title>
          <Dialog.Description>Check your email for a magic login link.</Dialog.Description>
          <button className="rounded-sm p-2 dark:bg-slate-600 dark:hover:bg-slate-500" onClick={onCloseDialog}>
            Okay
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
