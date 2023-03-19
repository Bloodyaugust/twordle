import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Supabase } from './supabase/Supabase';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Supabase>
      <App />
    </Supabase>
  </React.StrictMode>
);
