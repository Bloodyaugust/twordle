import { Database } from '../../lib/database.types';
import { queryClient } from '../main';
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

export async function createGame(user: Database['public']['Tables']['profile']['Row']) {
  const { error } = await supabase.from('game').insert([
    {
      updated_at: new Date().toISOString(),
      created_by: user.profile_id,
      game_state: {},
      type: 'default',
    },
  ]);

  if (error) {
    throw error;
  }
}

type mutationCreateGameReturnType = {
  mutationFn: (user: Database['public']['Tables']['profile']['Row']) => Promise<void>;
  onSuccess: () => void;
};

export function mutationCreateGame(): mutationCreateGameReturnType {
  return {
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  };
}

export async function updateGame(game: Database['public']['Tables']['game']['Row']) {
  const { error } = await supabase
    .from('game')
    .update({ ...game, updated_at: new Date().toISOString() })
    .eq('game_id', game.game_id);

  if (error) {
    throw error;
  }
}

type mutationUpdateGameReturnType = {
  mutationFn: (game: Database['public']['Tables']['game']['Row']) => Promise<void>;
  onSuccess: () => void;
};

export function mutationUpdateGame(): mutationUpdateGameReturnType {
  return {
    mutationFn: updateGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  };
}
