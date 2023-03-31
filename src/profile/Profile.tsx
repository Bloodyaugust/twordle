import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { queryGetUserGames } from '../api/game';
import { queryGetProfiles } from '../api/profile';
import { GameState, GAME_WINNER_STATES } from '../game-logic/default-game-reducer';

export default function Profile() {
  const { profileId } = useParams();
  const { data: profiles } = useQuery(queryGetProfiles);

  const currentProfile = useMemo(() => {
    return profiles?.find(profile => profile.profile_id === profileId);
  }, [profiles, profileId]);

  const { data: games } = useQuery(queryGetUserGames(currentProfile));

  const [wins, losses, ties] = useMemo(() => {
    if (!currentProfile || !games) {
      return [0, 0, 0];
    }

    return games.reduce(
      (stats, game) => {
        if (!game.ended_at) {
          return stats;
        }

        const gameState = JSON.parse(game.game_state as string) as GameState;

        if (gameState.winState === GAME_WINNER_STATES.TIE) {
          return [stats[0], stats[1], stats[2] + 1];
        }

        if (gameState.winState === GAME_WINNER_STATES.PLAYER && gameState.winner === currentProfile.profile_id) {
          return [stats[0] + 1, stats[1], stats[2]];
        }

        return [stats[0], stats[1] + 1, stats[2]];
      },
      [0, 0, 0]
    );
  }, [currentProfile, games]);

  if (!currentProfile || !games) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-xl">{currentProfile.name}</h2>
      <span>Wins - {wins}</span>
      <span>Losses - {losses}</span>
      <span>Ties - {ties}</span>
      <span>Total - {games.length}</span>
    </div>
  );
}
