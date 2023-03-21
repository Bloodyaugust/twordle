import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Database } from '../../lib/database.types';
import { queryGetProfiles } from '../api/profile';
import { supabaseContext } from '../supabase/Supabase';

type UserContext = {
  user?: Database['public']['Tables']['profile']['Row'];
};
type Props = {
  children: ReactNode;
};

export const userContext = createContext<UserContext>({});

export function User({ children }: Props) {
  const { data: profiles } = useQuery(queryGetProfiles);
  const { user: supabaseUser } = useContext(supabaseContext);
  const user = useMemo(
    () => profiles?.find(profile => profile.profile_id === supabaseUser?.id),
    [profiles, supabaseUser]
  );

  return <userContext.Provider value={{ user }}>{children}</userContext.Provider>;
}
