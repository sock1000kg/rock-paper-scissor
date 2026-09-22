import { describe, expect, it } from 'vitest';
import { generateRoomId, normalizeRoomId } from './room';

describe('room ids', () => {
  it('normalizes codes and shared links', () => {
    expect(normalizeRoomId(' ab12 ')).toBe('AB12');
    expect(normalizeRoomId('https://example.com/?exercise=ottv2#xy9z')).toBe('XY9Z');
  });

  it('rejects malformed room ids', () => {
    expect(normalizeRoomId('ABC')).toBeNull();
    expect(normalizeRoomId('ABCDE')).toBeNull();
    expect(normalizeRoomId('A-B1')).toBeNull();
  });

  it('generates a four-character room id', () => {
    expect(generateRoomId(() => 0)).toBe('AAAA');
    expect(generateRoomId()).toMatch(/^[A-Z0-9]{4}$/);
  });
});
