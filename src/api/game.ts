import { supabase } from '../supabase/Supabase';

export async function getGames() {
  const { data: games, error } = await supabase.from('game').select('*');

  if (error) {
    throw error;
  }

  return games;
}

export const queryGetGames = {
  queryKey: ['games'],
  queryFn: getGames,
};
