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

export function openRoom(roomId: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('exercise', 'ottv2');
  url.hash = roomId;
  window.location.assign(url.toString());
}

export function leaveRoomUrl(): void {
  const url = new URL(window.location.href);
  url.searchParams.set('exercise', 'ottv2');
  url.hash = '';
  window.location.assign(url.toString());
}
