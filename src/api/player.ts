import { queryClient } from '../main';
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

type createPlayerParam = {
  profileId: string;
  gameId: string;
};

export async function createPlayer({ profileId, gameId }: createPlayerParam) {
  const { error } = await supabase.from('player').insert([
    {
      player_id: profileId,
      game_id: gameId,
    },
  ]);

  if (error) {
    throw error;
  }
}

type mutationCreatePlayerReturnType = {
  mutationFn: ({ profileId, gameId }: createPlayerParam) => Promise<void>;
  onSuccess: () => void;
};

export function mutationCreatePlayer(): mutationCreatePlayerReturnType {
  return {
    mutationFn: createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  };
}
