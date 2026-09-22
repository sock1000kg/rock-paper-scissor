export type PieceType = 'ROCK' | 'PAPER' | 'SCISSORS';
export type PlayerSide = 'X' | 'O';
export type GameStatus = 'WAITING' | 'PLAYING' | 'FINISHED';
export type WinReason = 'ELIMINATED_ALL_PIECES' | 'REACHED_GOAL';

export interface Position {
  col: number;
  row: number;
}

export interface Piece {
  id: string;
  owner: PlayerSide;
  type: PieceType;
  position: Position;
}

export interface Player {
  id: string;
  name: string;
  side: PlayerSide;
  isConnected: boolean;
}

export interface SharedGameState {
  schemaVersion: 1;
  roomId: string;
  status: GameStatus;
  players: Partial<Record<PlayerSide, Player>>;
  pieces: Piece[];
  turn: PlayerSide;
  winnerId: string | null;
  winReason: WinReason | null;
  revision: number;
  hostId: string | null;
}

export const PIECE_LABELS: Record<PieceType, string> = {
  ROCK: 'Búa',
  PAPER: 'Bao',
  SCISSORS: 'Kéo',
};

export const PIECE_SYMBOLS: Record<PieceType, string> = {
  ROCK: '✊',
  PAPER: '✋',
  SCISSORS: '✌️',
};

export const SIDE_NAMES: Record<PlayerSide, string> = {
  X: 'Đội Đỏ',
  O: 'Đội Xanh',
};

export const emptyGameState: SharedGameState = {
  schemaVersion: 1,
  roomId: '',
  status: 'WAITING',
  players: {},
  pieces: [],
  turn: 'X',
  winnerId: null,
  winReason: null,
  revision: 0,
  hostId: null,
};
