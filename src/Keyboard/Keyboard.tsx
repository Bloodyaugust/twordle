import React, { useContext } from 'react';
import { Database } from '../../lib/database.types';
import { GameState, LETTER_STATES } from '../game-logic/default-game-reducer';
import { userContext } from '../user/User';

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm0'];

export enum INT_CHARACTER_MAP {
  ENTER,
}

export const CHARACTER_MAP_STRINGS = ['enter'];

type Props = {
  gameState: GameState;
  onClick?: (character: string) => void;
};

function getCharacterColor(
  character: string,
  gameState: GameState,
  user: Database['public']['Tables']['profile']['Row']
): string {
  if (!gameState.letterStates[user.profile_id] || gameState.letterStates[user.profile_id][character] === undefined) {
    return 'bg-slate-900';
  }

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
          {row.split('').map(character => {
            if (!isNaN(parseInt(character, 10))) {
              const characterIndex = parseInt(character, 10);
              return (
                <span
                  className="bg-slate-900 p-1 px-2 text-center align-middle uppercase leading-4 text-white hover:cursor-pointer md:p-2"
                  onClick={() => {
                    onClick(CHARACTER_MAP_STRINGS[characterIndex]);
                  }}
                  key={INT_CHARACTER_MAP[characterIndex]}>
                  {CHARACTER_MAP_STRINGS[characterIndex]}
                </span>
              );
            }

            return (
              <span
                className={`h-6 w-6 p-1 text-center align-middle uppercase leading-4 text-white hover:cursor-pointer md:h-8 md:w-8 md:p-2 ${getCharacterColor(
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
            );
          })}
        </div>
      ))}
    </div>
  );
}
