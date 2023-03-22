import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Database } from '../../lib/database.types';
import { queryGetGames } from '../api/game';
import { mutationCreateGameEvent, queryGetGameEventsForGame } from '../api/game_event';
import Button from '../components/Button';
import { userContext } from '../user/User';

export default function Game() {
  const { gameId } = useParams();
  const { data: games } = useQuery(queryGetGames);
  const { user } = useContext(userContext);
  const game = useMemo<Database['public']['Tables']['game']['Row'] | undefined>(
    () => games?.find(g => g.game_id === gameId),
    [gameId]
  );
  const { data: gameEvents } = useQuery(queryGetGameEventsForGame(gameId || ''));
  const { mutate: createGameEvent } = useMutation(mutationCreateGameEvent());

  const onCreateEventClick = useCallback(() => {
    if (user && game) {
      console.log('created event');
      createGameEvent({
        gameId: game?.game_id,
        payload: { event: 'test' },
        user,
      });
    }
  }, [user, game]);

  return (
    <div className="flex flex-col gap-2">
      <span>Viewing game {game?.game_id}</span>
      <Button onClick={onCreateEventClick}>Create Event</Button>
      {gameEvents?.map(event => (
        <span key={event.id}>{JSON.stringify(event.payload)}</span>
      ))}
    </div>
  );
}
