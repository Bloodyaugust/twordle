import React from 'react';
import { Database } from '../../lib/database.types';

type Props = {
  game: Database['public']['Tables']['game']['Row'];
};

export default function Game({ game }: Props) {
  return <span>Viewing game {game.game_id}</span>;
}
