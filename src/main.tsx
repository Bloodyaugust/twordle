import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Game from './Game/Game';
import Games from './Games/Games';
import Help from './Help/Help';
import './index.css';
import Profile from './profile/Profile';
import { Supabase } from './supabase/Supabase';
import Welcome from './welcome/Welcome';

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/twordle',
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'games',
        element: <Games />,
      },
      {
        path: 'profile/:profileId',
        element: <Profile />,
      },
      {
        path: 'game/:gameId',
        element: <Game />,
      },
      {
        path: 'help',
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Supabase>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Supabase>
  </React.StrictMode>
);
