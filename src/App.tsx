import React from 'react';
import './App.css';
import Welcome from './welcome/Welcome';

function App() {
  return (
    <div className="App dark:bg-slate-800 dark:text-white p-6 grid grid-cols-4">
      <Welcome />
    </div>
  );
}

export default App;
