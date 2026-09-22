import type { MapId, Piece, PieceType, PlayerSide, Position, SharedGameState } from './types';

const X_SETUP: Array<{ square: string; type: PieceType }> = [
  { square: 'a4', type: 'ROCK' },
  { square: 'b4', type: 'PAPER' },
  { square: 'a3', type: 'SCISSORS' },
  { square: 'b3', type: 'ROCK' },
  { square: 'c3', type: 'PAPER' },
  { square: 'b2', type: 'SCISSORS' },
  { square: 'c2', type: 'ROCK' },
  { square: 'd2', type: 'PAPER' },
  { square: 'c1', type: 'SCISSORS' },
];

function clonePlayers(players: SharedGameState['players']): SharedGameState['players'] {
  return {
    ...(players.X ? { X: { ...players.X } } : {}),
    ...(players.O ? { O: { ...players.O } } : {}),
  };
}

export function fromSquare(square: string): Position {
  return { col: square.toLowerCase().charCodeAt(0) - 97, row: Number(square.slice(1)) - 1 };
}

export function toSquare(position: Position): string {
  return `${String.fromCharCode(97 + position.col)}${position.row + 1}`;
}

function mirror(position: Position): Position {
  return { col: 8 - position.col, row: 8 - position.row };
}

export function createInitialPieces(): Piece[] {
  const xPieces = X_SETUP.map(({ square, type }, index) => ({
    id: `X-${type}-${index + 1}`,
    owner: 'X' as const,
    type,
    position: fromSquare(square),
  }));

  const oPieces = xPieces.map((piece, index) => ({
    id: `O-${piece.type}-${index + 1}`,
    owner: 'O' as const,
    type: piece.type,
    position: mirror(piece.position),
  }));

  return [...xPieces, ...oPieces];
}

export function createInitialGame(
  roomId: string,
  players: SharedGameState['players'],
  status: SharedGameState['status'] = 'PLAYING',
  hostIdOrObstacles: string | null | SharedGameState['obstacles'] = null,
  pieces: Piece[] = createInitialPieces(),
  mapId: MapId = 'default',
  hostId: string | null = null,
): SharedGameState {
  const legacyHostId = Array.isArray(hostIdOrObstacles) ? hostId : hostIdOrObstacles;
  const obstacles = Array.isArray(hostIdOrObstacles) ? hostIdOrObstacles : [];
  return {
    schemaVersion: 1,
    roomId,
    status,
    players: clonePlayers(players),
    pieces: pieces.map((piece) => ({ ...piece, position: { ...piece.position } })),
    obstacles: obstacles.map((position) => ({ ...position })),
    mapId,
    turn: 'X',
    winnerId: null,
    winReason: null,
    revision: 0,
    hostId: hostId ?? legacyHostId,
  };
}

export function beats(attacker: PieceType, defender: PieceType): boolean {
  return (
    (attacker === 'ROCK' && defender === 'SCISSORS') ||
    (attacker === 'SCISSORS' && defender === 'PAPER') ||
    (attacker === 'PAPER' && defender === 'ROCK')
  );
}

const inBounds = ({ col, row }: Position) => col >= 0 && col < 9 && row >= 0 && row < 9;
const samePosition = (a: Position, b: Position) => a.col === b.col && a.row === b.row;

export function getLegalMoves(state: SharedGameState, pieceId: string): Position[] {
  if (state.status !== 'PLAYING') return [];
  const piece = state.pieces.find((candidate) => candidate.id === pieceId);
  if (!piece || piece.owner !== state.turn) return [];

  const moves: Position[] = [];
  for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
    for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
      if (rowDelta === 0 && colDelta === 0) continue;
      const target = { col: piece.position.col + colDelta, row: piece.position.row + rowDelta };
      if (!inBounds(target)) continue;
      if ((state.obstacles ?? []).some((obstacle) => samePosition(obstacle, target))) continue;
      const occupant = state.pieces.find((candidate) => samePosition(candidate.position, target));
      if (!occupant) {
        moves.push(target);
      } else if (occupant.owner !== piece.owner && beats(piece.type, occupant.type)) {
        moves.push(target);
      }
    }
  }
  return moves;
}

export type MoveResult =
  | { ok: true; state: SharedGameState }
  | { ok: false; code: 'GAME_NOT_PLAYING' | 'NOT_YOUR_TURN' | 'PIECE_NOT_FOUND' | 'NOT_YOUR_PIECE' | 'ILLEGAL_MOVE' };

const opposite = (side: PlayerSide): PlayerSide => (side === 'X' ? 'O' : 'X');

export function applyMove(
  state: SharedGameState,
  playerId: string,
  pieceId: string,
  to: Position,
): MoveResult {
  if (state.status !== 'PLAYING') return { ok: false, code: 'GAME_NOT_PLAYING' };
  const side = (Object.keys(state.players) as PlayerSide[]).find(
    (candidate) => state.players[candidate]?.id === playerId,
  );
  if (!side || side !== state.turn) return { ok: false, code: 'NOT_YOUR_TURN' };
  const piece = state.pieces.find((candidate) => candidate.id === pieceId);
  if (!piece) return { ok: false, code: 'PIECE_NOT_FOUND' };
  if (piece.owner !== side) return { ok: false, code: 'NOT_YOUR_PIECE' };
  if (!getLegalMoves(state, pieceId).some((target) => samePosition(target, to))) {
    return { ok: false, code: 'ILLEGAL_MOVE' };
  }

  const pieces = state.pieces
    .filter((candidate) => !samePosition(candidate.position, to))
    .map((candidate) =>
      candidate.id === pieceId ? { ...candidate, position: { ...to } } : { ...candidate, position: { ...candidate.position } },
    );
  const reachedGoal = (side === 'X' && to.col === 8 && to.row === 8) || (side === 'O' && to.col === 0 && to.row === 0);
  const eliminatedOpponent = !pieces.some((candidate) => candidate.owner === opposite(side));
  const won = reachedGoal || eliminatedOpponent;

  return {
    ok: true,
    state: {
      ...state,
      players: clonePlayers(state.players),
      pieces,
      turn: won ? state.turn : opposite(side),
      status: won ? 'FINISHED' : 'PLAYING',
      winnerId: won ? playerId : null,
      winReason: reachedGoal ? 'REACHED_GOAL' : eliminatedOpponent ? 'ELIMINATED_ALL_PIECES' : null,
      revision: state.revision + 1,
    },
  };
}
