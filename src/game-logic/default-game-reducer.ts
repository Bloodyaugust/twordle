import { gameEventPayloadWordGuessed, gameEventPayloadWordPicked, GAME_EVENT_PAYLOAD_TYPES } from './game-data';

export const GAME_MAX_GUESSES = 6;

export enum GAME_FINISH_STATES {
  PENDING,
  WON,
  LOST,
}

export const GAME_FINISH_STATES_STRINGS = {
  [GAME_FINISH_STATES.PENDING]: 'Pending',
  [GAME_FINISH_STATES.WON]: 'Won',
  [GAME_FINISH_STATES.LOST]: 'Lost',
};

export enum GAME_WINNER_STATES {
  PENDING,
  PLAYER,
  TIE,
}

export const GAME_WINNER_STATES_STRINGS = {
  [GAME_WINNER_STATES.PENDING]: 'Pending',
  [GAME_WINNER_STATES.PLAYER]: 'Player',
  [GAME_WINNER_STATES.TIE]: 'Tied',
};

export type GameState = {
  players: string[];
  targetWords: Record<string, string | undefined>;
  finished: Record<string, GAME_FINISH_STATES | undefined>;
  guesses: Record<string, string[] | undefined>;
  winState: GAME_WINNER_STATES;
  winner?: string;
};

export default function defaultGameReducer(
  payloads: (gameEventPayloadWordPicked & gameEventPayloadWordGuessed)[],
  players: string[]
): GameState {
  const gameState: GameState = {
    players,
    targetWords: {},
    finished: {},
    guesses: {},
    winState: GAME_WINNER_STATES.PENDING,
  };

  payloads.reduce((state, payload) => {
    if (payload.type === GAME_EVENT_PAYLOAD_TYPES.WORD_PICKED) {
      state.targetWords[payload.target] = payload.word;
    }

    if (payload.type === GAME_EVENT_PAYLOAD_TYPES.WORD_GUESSED) {
      if (!state.guesses[payload.createdBy]?.length) {
        state.guesses[payload.createdBy] = [];
      }

      state.guesses[payload.createdBy]?.push(payload.word);
    }

    players.forEach(player => {
      if (
        state.guesses[player]?.length &&
        state.guesses[player]?.findIndex(guess => state.targetWords[player] === guess) !== -1
      ) {
        state.finished[player] = GAME_FINISH_STATES.WON;
      } else if (state.guesses[player]?.length === 6) {
        state.finished[player] = GAME_FINISH_STATES.LOST;
      } else {
        state.finished[player] = GAME_FINISH_STATES.PENDING;
      }
    });

    if (
      players.every(
        player =>
          state.finished[player] === GAME_FINISH_STATES.WON || state.finished[player] === GAME_FINISH_STATES.LOST
      )
    ) {
      const sortedPlayers = [...players].sort(
        (a, b) => (state.guesses[a]?.length || GAME_MAX_GUESSES) - (state.guesses[b]?.length || GAME_MAX_GUESSES)
      );

      if (state.guesses[sortedPlayers[0]]?.length === state.guesses[sortedPlayers[1]]) {
        state.winState = GAME_WINNER_STATES.TIE;
      } else {
        state.winState = GAME_WINNER_STATES.PLAYER;
        state.winner = sortedPlayers[0];
      }
    }

    return state;
  }, gameState);

  return gameState;
}
