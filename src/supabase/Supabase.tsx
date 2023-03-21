import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from '../../lib/database.types';

type ContextValue = {
  supabase: SupabaseClient;
  user: User | null;
  reloadUser: () => void;
};

export const supabase = createClient<Database>(
  'https://bkclaoukhxadbbtdsqec.supabase.co',
  import.meta.env.VITE_SUPABASE_KEY
);
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const supabaseContext = createContext<ContextValue>({ supabase, user: null, reloadUser: () => {} });

type Props = {
  children: ReactNode;
};

export function Supabase({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user: newUser },
      } = await supabase.auth.getUser();

      setUser(newUser);
    }

    if (loadingUser) {
      loadUser();
      setLoadingUser(false);
    }
  }, [loadingUser]);
  return (
    <supabaseContext.Provider
      value={{
        supabase,
        user,
        reloadUser: () => {
          setLoadingUser(true);
        },
      }}>
      {children}
    </supabaseContext.Provider>
  );
}
