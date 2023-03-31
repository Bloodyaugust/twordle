import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaGamepad, FaHome, FaQuestion, FaUser } from 'react-icons/fa';
import './App.css';
import { User } from './user/User';

function App() {
  return (
    <div className="App grid gap-2 bg-slate-300 p-6 dark:bg-slate-800 dark:text-white md:grid-cols-4">
      <User>
        <div className="header text-center text-xl font-bold">
          <h1>Twordle</h1>
        </div>
        <nav className="nav flex flex-col gap-4">
          <NavLink
            className={({ isActive }) => `flex items-center gap-2 underline ${isActive && 'text-violet-600'}`}
            to=""
            end>
            <FaHome />
            <span className="hidden md:inline">Home</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `flex items-center gap-2 underline ${isActive && 'text-violet-600'}`}
            to="games">
            <FaGamepad />
            <span className="hidden md:inline">Games</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `flex items-center gap-2 underline ${isActive && 'text-violet-600'}`}
            to="profile">
            <FaUser />
            <span className="hidden md:inline">Profile</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `flex items-center gap-2 underline ${isActive && 'text-violet-600'}`}
            to="help">
            <FaQuestion />
            <span className="hidden md:inline">Help</span>
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
