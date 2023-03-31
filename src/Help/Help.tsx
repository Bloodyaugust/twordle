import React from 'react';

export default function Help() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-xl">How to Play</h2>
      <p>- Create a new game on the Games tab or join one that someone else has challenged you to</p>
      <p>- Add an opponent from the dropdown (when creating your own game)</p>
      <p>- Pick a word for your opponent to guess</p>
      <p>- Wait for your opponent to pick a word for you</p>
      <p>
        - Once both players have picked a word, play as you normally would play Wordle. You can watch your opponent play
        in real time!
      </p>
      <p>- Play more games with more players, and have fun!</p>
    </div>
  );
}
