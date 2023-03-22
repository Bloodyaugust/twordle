import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Database } from '../../lib/database.types';
import { mutationCreatePlayer, queryGetPlayers } from '../api/player';
import { queryGetProfiles } from '../api/profile';
import Button from '../components/Button';
import { userContext } from '../user/User';

type Props = {
  game: Database['public']['Tables']['game']['Row'];
};

function getGameStatus(game: Database['public']['Tables']['game']['Row']): string {
  if (!game.started_at) {
    return 'Pending';
  }

  if (!game.ended_at) {
    return 'In Progress';
  }

  return 'Ended';
}

export default function GameCard({ game }: Props) {
  const { data: players } = useQuery(queryGetPlayers);
  const { data: profiles } = useQuery(queryGetProfiles);
  const { mutate: createPlayer } = useMutation(mutationCreatePlayer());
  const { user } = useContext(userContext);
  const [showInviteList, setShowInviteList] = useState<boolean>(false);
  const status = useMemo(() => getGameStatus(game), [game]);
  const gamePlayers = useMemo(() => players?.filter(player => player.game_id === game.game_id), [players, game]);
  const invitableProfiles = useMemo(
    () =>
      profiles?.filter(
        profile => gamePlayers?.findIndex(gamePlayer => gamePlayer.player_id === profile.profile_id) === -1
      ) || [],
    [profiles, gamePlayers]
  );

  const onInviteClick = useCallback(() => {
    setShowInviteList(!showInviteList);
  }, [showInviteList]);

  const onProfileInviteClick = useCallback(
    (profileId: string) => {
      createPlayer({
        profileId,
        gameId: game.game_id,
      });
    },
    [game]
  );

  return (
    <div className="flex flex-col gap-2 rounded-sm border-2 border-solid p-2">
      <span>Type: {game.type}</span>
      <span>Host: {profiles?.find(profile => profile.profile_id === game.created_by)?.name}</span>
      <span
        className={`${status === 'Pending' && 'text-yellow-500'} ${status === 'In Progress' && 'text-green-500'} ${
          status === 'Ended' && 'text-red-500'
        }`}>
        {status}
      </span>
      <span>Other Players:</span>
      <div className="flex gap-2">
        {gamePlayers?.map(player => (
          <span key={player.player_id}>
            {
              profiles?.find(
                profile => profile.profile_id === player.player_id && profile.profile_id !== game.created_by
              )?.name
            }
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {game.created_by === user?.profile_id && (
          <Button disabled={invitableProfiles.length === 0} onClick={onInviteClick}>
            Invite
          </Button>
        )}
        {gamePlayers?.find(player => player.player_id === user?.profile_id) && gamePlayers.length > 1 && (
          <Button>Play</Button>
        )}
      </div>
      {showInviteList && (
        <div>
          {invitableProfiles?.map(profile => (
            <Button key={profile.profile_id} onClick={() => onProfileInviteClick(profile.profile_id)}>
              {profile.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
