import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';
import { User } from './user/User';

function App() {
  return (
    <div className="App grid grid-cols-4 gap-2 bg-slate-300 p-6 dark:bg-slate-800 dark:text-white">
      <User>
        <div className="header text-center text-xl font-bold">
          <h1>Twordle</h1>
        </div>
        <nav className="nav flex flex-col gap-4">
          <NavLink className={({ isActive }) => `underline ${isActive && 'text-violet-600'}`} to="" end>
            Home
          </NavLink>
          <NavLink className={({ isActive }) => `underline ${isActive && 'text-violet-600'}`} to="games">
            Games
          </NavLink>
          <NavLink className={({ isActive }) => `underline ${isActive && 'text-violet-600'}`} to="profile">
            Profile
          </NavLink>
        </nav>
        <div className="content overflow-x-scroll">
          <Outlet />
        </div>
      </User>
    </div>
  );
}

export default App;
