export enum GAME_EVENT_PAYLOAD_TYPES {
  WORD_PICKED,
  WORD_GUESSED,
}

export type gameEventPayloadWordPicked = {
  createdBy: string;
  target: string;
  type: GAME_EVENT_PAYLOAD_TYPES;
  word: string;
};

export function createGameEventPayloadWordPicked(
  userId: string,
  forUserId: string,
  word: string
): gameEventPayloadWordPicked {
  return {
    createdBy: userId,
    target: forUserId,
    type: GAME_EVENT_PAYLOAD_TYPES.WORD_PICKED,
    word,
  };
}

export type gameEventPayloadWordGuessed = {
  createdBy: string;
  type: GAME_EVENT_PAYLOAD_TYPES;
  word: string;
};

export function createGameEventPayloadWordGuessed(userId: string, word: string): gameEventPayloadWordGuessed {
  return {
    createdBy: userId,
    type: GAME_EVENT_PAYLOAD_TYPES.WORD_GUESSED,
    word,
  };
}
