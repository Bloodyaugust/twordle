import { useQuery } from '@tanstack/react-query';
import React, { useContext, useMemo } from 'react';
import { queryGetProfiles } from '../api/profile';
import { GameState } from '../game-logic/default-game-reducer';
import { userContext } from '../user/User';
import './GameGrid.css';

type Props = {
  game?: GameState;
  focusPlayer?: string;
};

function getCharacterColorClass(character: string, index: number, targetWord: string, guess: string): string {
  if (character === ' ') {
    return 'bg-slate-900';
  }

  if (targetWord[index] === character) {
    return 'bg-lime-800';
  }

  const totalIncidences = guess.split(character).length;
  const correctIncidences = guess
    .split('')
    .reduce((incidences, char, charIndex) => (char === targetWord[charIndex] ? incidences++ : incidences), 0);
  const targetIncidences = targetWord.split(character).length;
  if (targetWord.includes(character) && targetIncidences >= totalIncidences - correctIncidences) {
    return 'bg-yellow-600';
  }

  return 'bg-red-800';
}

export default function GameGrid({ game, focusPlayer }: Props) {
  const { data: profiles } = useQuery(queryGetProfiles);
  const { user } = useContext(userContext);
  const correctedPlayerGuesses: Record<string, string[]> | undefined = useMemo(() => {
    return game?.players.reduce((prev, player) => {
      const numGuesses: number = game.guesses[player]?.length || 0;

      return {
        ...prev,
        [player]: [...(game.guesses[player] || []), ...Array(6 - numGuesses).fill('     ')],
      };
    }, {});
  }, [game]);
  const sortedPlayers = useMemo(() => {
    if (game?.players && user) {
      if (focusPlayer) {
        return game.players.sort((a, b) => (a === focusPlayer ? 0 : 1) - (b === focusPlayer ? 0 : 1));
      }

      return game.players.sort((a, b) => (a === user.profile_id ? 0 : 1) - (b === user.profile_id ? 0 : 1));
    }

    return [];
  }, [game, focusPlayer]);

  if (!game || !correctedPlayerGuesses || !profiles) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col flex-col-reverse gap-4 md:flex-row">
      {sortedPlayers.map((player, playerIndex) => (
        <div key={player} className={`flex flex-col gap-2 ${playerIndex > 0 && 'scale-90'}`}>
          <span>
            {profiles.find(profile => profile.profile_id === player)?.name}
            {player === user?.profile_id ? ' (You)' : ''}
          </span>
          <div key={player} className="game-grid-inner grid grid-flow-row-dense gap-2">
            {correctedPlayerGuesses[player].map((guess, guessIndex) =>
              guess.split('').map((char, charIndex) => (
                <span
                  className={`h-12 w-12 p-2 text-center text-2xl uppercase ${getCharacterColorClass(
                    char,
                    charIndex,
                    game.targetWords[player] || '',
                    guess
                  )}`}
                  key={`${player}-${guess}-${guessIndex}-${char}-${charIndex}`}>
                  {char}
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
