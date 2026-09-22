export function normalizeRoomId(input: string): string | null {
  const candidate = input.trim().replace(/^.*#/, '').toUpperCase();
  return /^[A-Z0-9]{4}$/.test(candidate) ? candidate : null;
}

export function generateRoomId(random = Math.random): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => alphabet[Math.floor(random() * alphabet.length)]).join('');
}

export function getRoomIdFromUrl(): string | null {
  return normalizeRoomId(window.location.hash);
}

function navigateWithReload(url: URL): void {
  // playhtml only reconnects to the room encoded in the URL on a fresh page
  // load; a same-document (hash-only) navigation leaves it connected to the
  // previous room, so force a full reload whenever the hash actually changes.
  const isSameDocument = url.toString() === window.location.href;
  window.location.assign(url.toString());
  if (isSameDocument) return;
  window.location.reload();
}

export function openRoom(roomId: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('exercise', 'ottv2');
  url.hash = roomId;
  navigateWithReload(url);
}

export function leaveRoomUrl(): void {
  const url = new URL(window.location.href);
  url.searchParams.set('exercise', 'ottv2');
  url.hash = '';
  navigateWithReload(url);
}
