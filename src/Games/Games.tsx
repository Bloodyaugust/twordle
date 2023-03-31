import { useMutation, useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mutationCreateGame, queryGetUserGames } from '../api/game';
import { mutationCreatePlayer, queryGetPlayers } from '../api/player';
import Button from '../components/Button';
import { userContext } from '../user/User';
import GameCard from './GameCard';

export default function Games() {
  const { user } = useContext(userContext);
  const { isLoading, data: games, error } = useQuery(queryGetUserGames(user));
  const { data: players } = useQuery(queryGetPlayers);
  const { mutate } = useMutation(mutationCreateGame());
  const { mutate: createPlayer } = useMutation(mutationCreatePlayer());
  const [showEnded, setShowEnded] = useState(false);

  const filteredGames = useMemo(() => {
    let newFilteredGames = games || [];

    if (!showEnded) {
      newFilteredGames = newFilteredGames.filter(game => !game.ended_at);
    }

    return newFilteredGames.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());
  }, [games, showEnded]);

  const onCreateGameClick = useCallback(() => {
    if (user) {
      mutate(user);
    }
  }, [user]);

  const onShowEndedChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setShowEnded(event.target.checked);
    },
    [showEnded]
  );

  useEffect(() => {
    const unjoinedHostedGames = games?.filter(
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
  }, [games, user]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>There was an error.</span>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 self-baseline">
        <label htmlFor="show-ended-games">Show ended games: </label>
        <input type="checkbox" id="show-ended-games" onChange={onShowEndedChange} />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredGames.map(game => (
          <GameCard game={game} key={game.game_id} />
        ))}
      </div>
      <Button onClick={onCreateGameClick}>Create Game</Button>
    </div>
  );
}
