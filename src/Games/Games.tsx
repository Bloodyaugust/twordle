import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useContext, useEffect } from 'react';
import { mutationCreateGame, queryGetGames } from '../api/game';
import { mutationCreatePlayer, queryGetPlayers } from '../api/player';
import Button from '../components/Button';
import { userContext } from '../user/User';
import GameCard from './GameCard';

export default function Games() {
  const { isLoading, data, error } = useQuery(queryGetGames);
  const { data: players } = useQuery(queryGetPlayers);
  const { user } = useContext(userContext);
  const { mutate } = useMutation(mutationCreateGame());
  const { mutate: createPlayer } = useMutation(mutationCreatePlayer());

  const onCreateGameClick = useCallback(() => {
    if (user) {
      mutate(user);
    }
  }, [user]);

  useEffect(() => {
    const unjoinedHostedGames = data?.filter(
      game =>
        game.created_by === user?.profile_id &&
        players?.filter(player => player.game_id === game.game_id && player.player_id === user.profile_id).length === 0
    );

    if (user) {
      unjoinedHostedGames?.forEach(game => {
        createPlayer({
          profileId: user?.profile_id,
          gameId: game.game_id,
        });
      });
    }
  }, [data, user]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>There was an error.</span>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4">
        {data?.map(game => (
          <GameCard game={game} key={game.game_id} />
        ))}
      </div>
      <Button onClick={onCreateGameClick}>Create Game</Button>
    </div>
  );
}
