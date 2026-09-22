import type { PieceType } from './types';

export type ClassicResult = 'WIN' | 'LOSE' | 'DRAW';

export function resolveClassic(player: PieceType, computer: PieceType): ClassicResult {
  if (player === computer) return 'DRAW';
  return (
    (player === 'ROCK' && computer === 'SCISSORS') ||
    (player === 'SCISSORS' && computer === 'PAPER') ||
    (player === 'PAPER' && computer === 'ROCK')
  )
    ? 'WIN'
    : 'LOSE';
}

export function randomChoice(random = Math.random): PieceType {
  const choices: PieceType[] = ['ROCK', 'PAPER', 'SCISSORS'];
  return choices[Math.floor(random() * choices.length)];
}
