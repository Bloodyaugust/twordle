import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Database } from '../../lib/database.types';
import { queryGetGames } from '../api/game';
import { queryGetPlayers } from '../api/player';
import { queryGetProfiles } from '../api/profile';

function getGameStatus(game: Database['public']['Tables']['game']['Row']): string {
  if (!game.started_at) {
    return 'Pending';
  }

  if (!game.ended_at) {
    return 'In Progress';
  }

  return 'Ended';
}

export default function Games() {
  const { isLoading, data, error } = useQuery(queryGetGames);
  const { data: profiles } = useQuery(queryGetProfiles);
  const { data: players } = useQuery(queryGetPlayers);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>There was an error.</span>;
  }

  return (
    <div>
      <span>These are all the games</span>
      <div className="flex flex-col gap-4">
        {data?.map(game => (
          <div className="flex flex-col gap-2" key={game.game_id}>
            <span>{game.game_id}</span>
            <span>Created By: {profiles?.find(profile => profile.profile_id === game.created_by)?.name}</span>
            <span>Players: </span>
            <div className="flex flex-col gap-1">
              {players
                ?.filter(player => player.game_id === game.game_id)
                .map(player => (
                  <span key={player.player_id}>
                    - {profiles?.find(profile => profile.profile_id === player.player_id)?.name}
                  </span>
                ))}
            </div>
            <span>{JSON.stringify(game.game_state)}</span>
            <span>Created At: {new Date(game.created_at).toISOString()}</span>
            <span>{getGameStatus(game)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
