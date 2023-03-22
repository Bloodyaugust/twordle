import { Database, Json } from '../../lib/database.types';
import { queryClient } from '../main';
import { supabase } from '../supabase/Supabase';

type getGameEventsForGameParam = {
  queryKey: any;
};

export async function getGameEventsForGame({ queryKey }: getGameEventsForGameParam) {
  const [, gameId] = queryKey;
  const { data: gameEvents, error } = await supabase.from('game_event').select('*').eq('game_id', gameId);

  if (error) {
    throw error;
  }

  return gameEvents;
}

export function queryGetGameEventsForGame(gameId: string) {
  return {
    queryKey: ['game_events', gameId],
    queryFn: getGameEventsForGame,
  };
}

type createGameEventParam = {
  user: Database['public']['Tables']['profile']['Row'];
  gameId: string;
  payload?: Json;
};

export async function createGameEvent({ user, gameId, payload }: createGameEventParam) {
  const { error } = await supabase.from('game_event').insert([
    {
      created_by: user.profile_id,
      game_id: gameId,
      payload,
    },
  ]);

  if (error) {
    throw error;
  }
}

type mutationCreateGameEventReturnType = {
  mutationFn: ({ user, gameId, payload }: createGameEventParam) => Promise<void>;
  onSuccess: (data: any, { gameId }: createGameEventParam) => void;
};

export function mutationCreateGameEvent(): mutationCreateGameEventReturnType {
  return {
    mutationFn: createGameEvent,
    onSuccess: (_, { gameId }) => {
      queryClient.invalidateQueries({ queryKey: ['game_events', gameId] });
    },
  };
}
