import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Database } from '../../lib/database.types';
import { mutationUpdateGame, queryGetGames } from '../api/game';
import { mutationCreateGameEvent, queryGetGameEventsForGame } from '../api/game_event';
import { queryGetPlayers } from '../api/player';
import { queryGetProfiles } from '../api/profile';
import Button from '../components/Button';
import Input from '../components/Input';
import defaultGameReducer, { GAME_FINISH_STATES, GAME_WINNER_STATES } from '../game-logic/default-game-reducer';
import {
  createGameEventPayloadWordGuessed,
  createGameEventPayloadWordPicked,
  gameEventPayloadWordGuessed,
  gameEventPayloadWordPicked,
} from '../game-logic/game-data';
import { userContext } from '../user/User';
import { WORDS } from '../../lib/dictionary';
import GameGrid from './GameGrid';

export default function Game() {
  const { gameId } = useParams();
  const { data: games } = useQuery(queryGetGames);
  const { data: players } = useQuery(queryGetPlayers);
  const { data: profiles } = useQuery(queryGetProfiles);
  const { user } = useContext(userContext);
  const opponentWordInputRef = useRef<HTMLInputElement>(null);
  const guessWordInputRef = useRef<HTMLInputElement>(null);
  const game = useMemo<Database['public']['Tables']['game']['Row'] | undefined>(
    () => games?.find(g => g.game_id === gameId),
    [games, gameId]
  );
  const gamePlayers = useMemo(() => players?.filter(player => player.game_id === gameId), [players, game]);
  const opponent = useMemo(
    () => gamePlayers?.find(player => player.player_id !== user?.profile_id),
    [gamePlayers, user]
  );

  const { data: gameEvents } = useQuery(queryGetGameEventsForGame(gameId || ''));
  const sortedGameEvents = useMemo(
    () => gameEvents?.sort((a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()) || [],
    [gameEvents]
  );
  const { mutate: doUpdateGame } = useMutation(mutationUpdateGame());
  const { mutate: doCreateGameEvent } = useMutation(mutationCreateGameEvent());
  const gameState = useMemo(() => {
    return defaultGameReducer(
      (sortedGameEvents.map(gameEvent => gameEvent.payload) || []) as (gameEventPayloadWordPicked &
        gameEventPayloadWordGuessed)[],
      gamePlayers?.map(player => player.player_id) || []
    );
  }, [game, sortedGameEvents, gamePlayers]);

  const userPicking = useMemo(
    () => opponent && gameState.winState === GAME_WINNER_STATES.PENDING && !gameState.targetWords[opponent.player_id],
    [user, gameState, opponent]
  );
  const anyPicking = useMemo(() => Object.keys(gameState.targetWords).length < gameState.players.length, [gameState]);
  const userGuessing = useMemo(
    () =>
      user &&
      gameState &&
      gameState.finished[user.profile_id] === GAME_FINISH_STATES.PENDING &&
      gameState.targetWords[user.profile_id],
    [user, gameState]
  );
  const gameOver = useMemo(() => gameState.winState !== GAME_WINNER_STATES.PENDING, [gameState]);

  const onPickOpponentWord = useCallback(() => {
    if (user && gameId && opponent && opponentWordInputRef.current) {
      if (opponentWordInputRef.current.value.length !== 5) {
        alert('Words must be 5 letters long');
      } else if (WORDS.indexOf(opponentWordInputRef.current.value) === -1) {
        alert('Word not found in dictionary');
      } else {
        doCreateGameEvent({
          user,
          gameId,
          payload: createGameEventPayloadWordPicked(
            user.profile_id,
            opponent.player_id,
            opponentWordInputRef.current.value
          ),
        });
      }
    }
  }, [user, gameId, opponent, opponentWordInputRef]);

  const onGuess = useCallback(() => {
    if (user && gameId && opponent && guessWordInputRef.current) {
      if (guessWordInputRef.current.value.length !== 5) {
        alert('Words must be 5 letters long');
      } else if (WORDS.indexOf(guessWordInputRef.current.value) === -1) {
        alert('Word not found in dictionary');
      } else {
        const guessValue: string = guessWordInputRef.current.value;
        guessWordInputRef.current.value = '';
        doCreateGameEvent({
          user,
          gameId,
          payload: createGameEventPayloadWordGuessed(user.profile_id, guessValue),
        });
      }
    }
  }, [user, gameId, opponent, guessWordInputRef]);

  useEffect(() => {
    if (game && user && game.created_by === user.profile_id && JSON.stringify(gameState) !== game.game_state) {
      doUpdateGame({
        ...game,
        game_state: JSON.stringify(gameState),
        ...(!game.started_at &&
          Object.keys(gameState.targetWords).length >= 2 && { started_at: new Date().toISOString() }),
        ...(!game.ended_at &&
          gameState.winState !== GAME_WINNER_STATES.PENDING && { ended_at: new Date().toISOString() }),
      });
    }
  }, [game, gameState, user]);

  if (!game || !gameState || !user || !profiles) {
    return <span>Loading...</span>;
  }

  if (!gameOver && userPicking) {
    return (
      <div className="flex gap-2">
        <span>You are picking a word for your opponent:</span>
        <Input
          id="opponent-word-pick"
          placeholder="a five letter word"
          ref={opponentWordInputRef}
          maxLength={5}
          onEnterUp={onPickOpponentWord}
        />
        <Button onClick={onPickOpponentWord}>Pick Word</Button>
      </div>
    );
  }

  if (!gameOver && !userPicking && anyPicking) {
    return (
      <div>
        <span>You are waiting for your opponent to pick a word for you.</span>
      </div>
    );
  }

  if (!gameOver) {
    return (
      <div className="flex flex-col gap-2">
        <GameGrid game={gameState} />
        {userGuessing && (
          <>
            <span>Please make your next guess:</span>
            <Input
              id="word-guess"
              placeholder="a five letter word"
              ref={guessWordInputRef}
              maxLength={5}
              onEnterUp={onGuess}
            />
            <Button onClick={onGuess}>Guess</Button>
          </>
        )}
        {!userGuessing && <span>Waiting for opponent to finish guessing...</span>}
      </div>
    );
  }

  if (gameOver) {
    return (
      <div>
        {gameState.winState === GAME_WINNER_STATES.PLAYER && (
          <span>{profiles?.find(profile => profile.profile_id === gameState.winner)?.name} won!</span>
        )}
        {gameState.winState === GAME_WINNER_STATES.TIE && <span>The game was a tie!</span>}
        <GameGrid game={gameState} />
      </div>
    );
  }

  return <span>How did you get here?</span>;
}
