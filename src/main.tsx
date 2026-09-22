import React from 'react';
import ReactDOM from 'react-dom/client';
import { PlayProvider } from '@playhtml/react';
import App from './App';
import { getRoomIdFromUrl } from './multiplayer/room';
import './styles.css';

const roomId = getRoomIdFromUrl();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayProvider
      initOptions={{ room: () => getRoomIdFromUrl() || 'ottv2-home' }}
      pathname={roomId || 'home'}
    >
      <App />
    </PlayProvider>
  </React.StrictMode>,
);
