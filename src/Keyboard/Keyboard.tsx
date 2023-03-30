import React, { useContext } from 'react';
import { Database } from '../../lib/database.types';
import { GameState, LETTER_STATES } from '../game-logic/default-game-reducer';
import { userContext } from '../user/User';

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

type Props = {
  gameState: GameState;
  onClick?: (character: string) => void;
};

function getCharacterColor(
  character: string,
  gameState: GameState,
  user: Database['public']['Tables']['profile']['Row']
): string {
  if (gameState.letterStates[user.profile_id][character] === LETTER_STATES.CORRECT) {
    return 'bg-lime-800';
  }

  if (gameState.letterStates[user.profile_id][character] === LETTER_STATES.MISPLACED) {
    return 'bg-yellow-600';
  }

  if (gameState.letterStates[user.profile_id][character] === LETTER_STATES.INCORRECT) {
    return 'bg-red-800';
  }

  return 'bg-slate-900';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Keyboard({ gameState, onClick = () => {} }: Props) {
  const { user } = useContext(userContext);

  if (!user) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-1">
          {row.split('').map(character => (
            <span
              className={`h-8 w-8 p-2 text-center align-middle uppercase leading-4 text-white hover:cursor-pointer ${getCharacterColor(
                character,
                gameState,
                user
              )}`}
              onClick={() => {
                onClick(character);
              }}
              key={character}>
              {character}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
