import { useState } from 'react';

interface LocalPlayer {
  id: string;
  name: string;
}

const STORAGE_KEY = 'ottv2-local-player';

function createPlayer(): LocalPlayer {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
    name: '',
  };
}

export function useLocalPlayer() {
  const [player, setPlayer] = useState<LocalPlayer>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '') as LocalPlayer;
    } catch {
      const next = createPlayer();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    }
  });

  const updateName = (name: string) => {
    setPlayer((current) => {
      const next = { ...current, name };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { player, updateName };
}
