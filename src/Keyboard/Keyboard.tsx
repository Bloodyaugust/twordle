import React, { useContext } from 'react';
import { GameState } from '../game-logic/default-game-reducer';
import { userContext } from '../user/User';

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

type Props = {
  gameState: GameState;
  onClick?: (character: string) => void;
};

function getCharacterColor(character: string, gameState: GameState): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Keyboard({ gameState, onClick = () => {} }: Props) {
  const { user } = useContext(userContext);

  return (
    <div className="flex flex-col items-center gap-1">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-1">
          {row.split('').map(character => (
            <span
              className={`h-8 w-8 bg-slate-900 p-2 text-center align-middle uppercase leading-4 text-white hover:cursor-pointer ${getCharacterColor(
                character,
                gameState
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
