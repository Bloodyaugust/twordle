import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { queryGetGames } from '../api/game';
import Button from '../components/Button';
import GameCard from './GameCard';

export default function Games() {
  const { isLoading, data, error } = useQuery(queryGetGames);

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
      <Button>Create Game</Button>
    </div>
  );
}
