import { describe, expect, it } from 'vitest';
import { applyMove, beats, createInitialGame, createInitialPieces, fromSquare, getLegalMoves, toSquare } from './engine';
import type { SharedGameState } from './types';

const players: SharedGameState['players'] = {
  X: { id: 'player-x', name: 'Đỏ', side: 'X', isConnected: true },
  O: { id: 'player-o', name: 'Xanh', side: 'O', isConnected: true },
};

describe('initial setup', () => {
  it('creates 9 pieces per side and 3 of each type', () => {
    const pieces = createInitialPieces();
    expect(pieces).toHaveLength(18);
    for (const owner of ['X', 'O'] as const) {
      const ownPieces = pieces.filter((piece) => piece.owner === owner);
      expect(ownPieces).toHaveLength(9);
      expect(ownPieces.filter((piece) => piece.type === 'ROCK')).toHaveLength(3);
      expect(ownPieces.filter((piece) => piece.type === 'PAPER')).toHaveLength(3);
      expect(ownPieces.filter((piece) => piece.type === 'SCISSORS')).toHaveLength(3);
    }
  });

  it('keeps goals empty and mirrors both formations', () => {
    const squares = createInitialPieces().map((piece) => toSquare(piece.position));
    expect(squares).not.toContain('a1');
    expect(squares).not.toContain('i9');
    expect(squares).toContain('c1');
    expect(squares).toContain('g9');
  });
});

describe('rules', () => {
  it('implements the rock-paper-scissors cycle', () => {
    expect(beats('ROCK', 'SCISSORS')).toBe(true);
    expect(beats('SCISSORS', 'PAPER')).toBe(true);
    expect(beats('PAPER', 'ROCK')).toBe(true);
    expect(beats('ROCK', 'PAPER')).toBe(false);
    expect(beats('ROCK', 'ROCK')).toBe(false);
  });

  it('allows all eight directions from an open center cell', () => {
    const state = createInitialGame('TEST', players);
    state.pieces = [{ id: 'x-rock', owner: 'X', type: 'ROCK', position: fromSquare('e5') }];
    expect(getLegalMoves(state, 'x-rock')).toHaveLength(8);
  });

  it('does not allow moving onto an obstacle', () => {
    const state = createInitialGame('TEST', players, 'PLAYING', [fromSquare('e6')]);
    state.pieces = [{ id: 'x-rock', owner: 'X', type: 'ROCK', position: fromSquare('e5') }];
    expect(getLegalMoves(state, 'x-rock').map(toSquare)).not.toContain('e6');
  });

  it('blocks same type and weaker attacks while allowing a winning capture', () => {
    const base = createInitialGame('TEST', players);
    base.pieces = [
      { id: 'x-rock', owner: 'X', type: 'ROCK', position: fromSquare('e5') },
      { id: 'o-scissors', owner: 'O', type: 'SCISSORS', position: fromSquare('f5') },
      { id: 'o-rock', owner: 'O', type: 'ROCK', position: fromSquare('e6') },
      { id: 'o-paper', owner: 'O', type: 'PAPER', position: fromSquare('d5') },
    ];
    const legal = getLegalMoves(base, 'x-rock').map(toSquare);
    expect(legal).toContain('f5');
    expect(legal).not.toContain('e6');
    expect(legal).not.toContain('d5');
  });

  it('wins when X reaches i9', () => {
    const state = createInitialGame('TEST', players);
    state.pieces = [
      { id: 'x-rock', owner: 'X', type: 'ROCK', position: fromSquare('h8') },
      { id: 'o-paper', owner: 'O', type: 'PAPER', position: fromSquare('a9') },
    ];
    const result = applyMove(state, 'player-x', 'x-rock', fromSquare('i9'));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.status).toBe('FINISHED');
      expect(result.state.winReason).toBe('REACHED_GOAL');
      expect(result.state.winnerId).toBe('player-x');
    }
  });

  it('wins when the final opposing piece is captured', () => {
    const state = createInitialGame('TEST', players);
    state.pieces = [
      { id: 'x-rock', owner: 'X', type: 'ROCK', position: fromSquare('e5') },
      { id: 'o-scissors', owner: 'O', type: 'SCISSORS', position: fromSquare('f5') },
    ];
    const result = applyMove(state, 'player-x', 'x-rock', fromSquare('f5'));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.state.winReason).toBe('ELIMINATED_ALL_PIECES');
  });

  it('rejects a move made by the wrong player', () => {
    const state = createInitialGame('TEST', players);
    const result = applyMove(state, 'player-o', state.pieces[9].id, fromSquare('h5'));
    expect(result).toEqual({ ok: false, code: 'NOT_YOUR_TURN' });
  });
});
