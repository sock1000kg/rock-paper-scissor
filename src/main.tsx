import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PlayProvider } from '@playhtml/react';
import App from './App';
import { getRoomIdFromUrl } from './multiplayer/room';
import './styles.css';

function Root() {
  const [roomId, setRoomId] = useState(getRoomIdFromUrl);

  useEffect(() => {
    const handleLocationChange = () => setRoomId(getRoomIdFromUrl());
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <PlayProvider
      initOptions={{ room: () => getRoomIdFromUrl() || 'ottv2-home' }}
      pathname={roomId || 'home'}
    >
      <App />
    </PlayProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
