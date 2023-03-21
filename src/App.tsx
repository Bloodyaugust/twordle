import React from 'react';
import './App.css';
import { User } from './user/User';
import Welcome from './welcome/Welcome';

function App() {
  return (
    <div className="App grid grid-cols-4 overflow-x-scroll p-6 dark:bg-slate-800 dark:text-white">
      <User>
        <Welcome />
      </User>
    </div>
  );
}

export default App;
