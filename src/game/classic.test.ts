import { describe, expect, it } from 'vitest';
import { randomChoice, resolveClassic } from './classic';

describe('classic rock paper scissors', () => {
  it('returns draw for identical choices', () => {
    expect(resolveClassic('ROCK', 'ROCK')).toBe('DRAW');
    expect(resolveClassic('PAPER', 'PAPER')).toBe('DRAW');
    expect(resolveClassic('SCISSORS', 'SCISSORS')).toBe('DRAW');
  });

  it('returns all win and lose relationships', () => {
    expect(resolveClassic('ROCK', 'SCISSORS')).toBe('WIN');
    expect(resolveClassic('SCISSORS', 'PAPER')).toBe('WIN');
    expect(resolveClassic('PAPER', 'ROCK')).toBe('WIN');
    expect(resolveClassic('SCISSORS', 'ROCK')).toBe('LOSE');
    expect(resolveClassic('PAPER', 'SCISSORS')).toBe('LOSE');
    expect(resolveClassic('ROCK', 'PAPER')).toBe('LOSE');
  });

  it('maps random values to a valid choice', () => {
    expect(randomChoice(() => 0)).toBe('ROCK');
    expect(randomChoice(() => 0.4)).toBe('PAPER');
    expect(randomChoice(() => 0.99)).toBe('SCISSORS');
  });
});
