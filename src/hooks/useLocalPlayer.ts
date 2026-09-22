import { useState } from 'react';

interface LocalPlayer {
  id: string;
  name: string;
}

const PLAYER_ID_KEY = 'ottv2-player-id';
const PLAYER_NAME_KEY = 'ottv2-player-name';

function createPlayer(): LocalPlayer {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
    name: '',
  };
}

export function useLocalPlayer() {
  const [player, setPlayer] = useState<LocalPlayer>(() => {
    const storedId = sessionStorage.getItem(PLAYER_ID_KEY);
    const nextId = storedId || createPlayer().id;
    if (!storedId) sessionStorage.setItem(PLAYER_ID_KEY, nextId);
    return { id: nextId, name: sessionStorage.getItem(PLAYER_NAME_KEY) ?? '' };
  });

  const updateName = (name: string) => {
    setPlayer((current) => {
      const next = { ...current, name };
      sessionStorage.setItem(PLAYER_NAME_KEY, name);
      return next;
    });
  };

  return { player, updateName };
}
