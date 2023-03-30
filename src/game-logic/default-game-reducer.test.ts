import { describe, expect, it } from 'vitest';
import defaultGameReducer, { GAME_FINISH_STATES, GAME_WINNER_STATES } from './default-game-reducer';
import {
  createGameEventPayloadWordGuessed,
  createGameEventPayloadWordPicked,
  gameEventPayloadWordGuessed,
  gameEventPayloadWordPicked,
} from './game-data';
const testPlayers = ['123', '456'];
const testGameEventPayloads = [
  createGameEventPayloadWordPicked('123', '456', 'alpha'),
  createGameEventPayloadWordPicked('456', '123', 'arose'),
  createGameEventPayloadWordGuessed('123', 'picks'),
  createGameEventPayloadWordGuessed('456', 'speck'),
  createGameEventPayloadWordGuessed('123', 'picks'),
  createGameEventPayloadWordGuessed('123', 'arose'),
  createGameEventPayloadWordGuessed('456', 'speck'),
  createGameEventPayloadWordGuessed('456', 'speck'),
  createGameEventPayloadWordGuessed('456', 'speck'),
  createGameEventPayloadWordGuessed('456', 'speck'),
  createGameEventPayloadWordGuessed('456', 'speck'),
] as (gameEventPayloadWordPicked & gameEventPayloadWordGuessed)[];

describe('Default Game Reducer', () => {
  it('can reduce a series of game event payloads correctly', () => {
    let gameState = defaultGameReducer(testGameEventPayloads.slice(0, 2), testPlayers);

    expect(gameState).not.toBeFalsy();
    expect(gameState.players).toEqual(testPlayers);
    expect(gameState.targetWords).toEqual({ '123': 'arose', '456': 'alpha' });
    expect(gameState.guesses['123']).toEqual(undefined);
    expect(gameState.guesses['456']).toEqual(undefined);
    expect(gameState.finished).toEqual({ '123': GAME_FINISH_STATES.PENDING, '456': GAME_FINISH_STATES.PENDING });
    expect(gameState.winState).toEqual(GAME_WINNER_STATES.PENDING);

    gameState = defaultGameReducer(testGameEventPayloads.slice(0, 6), testPlayers);
    expect(gameState.guesses['123']).toEqual(['picks', 'picks', 'arose']);
    expect(gameState.guesses['456']).toEqual(['speck']);
    expect(gameState.finished).toEqual({ '123': GAME_FINISH_STATES.WON, '456': GAME_FINISH_STATES.PENDING });
    expect(gameState.winState).toEqual(GAME_WINNER_STATES.PENDING);

    gameState = defaultGameReducer(testGameEventPayloads, testPlayers);

    console.log(gameState);
    expect(gameState.guesses['123']).toEqual(['picks', 'picks', 'arose']);
    expect(gameState.guesses['456']).toEqual(['speck', 'speck', 'speck', 'speck', 'speck', 'speck']);
    expect(gameState.winState).toEqual(GAME_WINNER_STATES.PLAYER);
    expect(gameState.finished).toEqual({ '123': GAME_FINISH_STATES.WON, '456': GAME_FINISH_STATES.LOST });
    expect(gameState.letterStates).toEqual({
      '123': { p: 1, i: 1, c: 1, k: 1, s: 0, a: 0, r: 0, o: 0, e: 0 },
      '456': { s: 1, p: 2, e: 1, c: 1, k: 1 },
    });
  });
});
