import { supabase } from '../supabase/Supabase';

export async function getPlayers() {
  const { data: players, error } = await supabase.from('player').select('*');

  if (error) {
    throw error;
  }

  return players;
}

export const queryGetPlayers = {
  queryKey: ['players'],
  queryFn: getPlayers,
};
