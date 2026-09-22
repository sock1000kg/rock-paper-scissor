import { createInitialPieces, fromSquare } from './engine';
import type { MapId, MapObstacle, Piece, Position } from './types';

export interface MapPreset {
  id: MapId;
  name: string;
  description: string;
  obstacles: MapObstacle[];
}

const squares = (values: string[]) => values.map(fromSquare);

export const MAP_PRESETS: MapPreset[] = [
  { id: 'default', name: 'Map mặc định', description: 'Bàn cờ mở, phù hợp cho ván đầu tiên.', obstacles: [] },
  {
    id: 'obstacles',
    name: 'Map chướng ngại vật',
    description: 'Các khối đá trung tâm tạo những lối đi hẹp.',
    obstacles: squares(['d4', 'e4', 'f4', 'd5', 'f5', 'd6', 'e6', 'f6']),
  },
  { id: 'custom', name: 'Map tùy chỉnh', description: 'Tự xếp quân và đặt chướng ngại vật.', obstacles: [] },
];

export function mapFromQuery(value: string | null): MapId {
  return value === 'obstacles' || value === 'custom' ? value : 'default';
}

export function clonePositions(positions: Position[]): Position[] {
  return positions.map((position) => ({ ...position }));
}

export function createEditorPieces(): Piece[] {
  return createInitialPieces();
}

export interface MapLayout {
  obstacles: MapObstacle[];
  pieces: Piece[];
}

export function readCustomLayout(): MapLayout | null {
  const encoded = new URLSearchParams(window.location.search).get('layout');
  if (!encoded) return null;
  try {
    const parsed = JSON.parse(encoded) as MapLayout;
    if (!Array.isArray(parsed.obstacles) || !Array.isArray(parsed.pieces)) return null;
    return { obstacles: clonePositions(parsed.obstacles), pieces: parsed.pieces };
  } catch {
    try {
      const parsed = JSON.parse(decodeURIComponent(encoded)) as MapLayout;
      if (!Array.isArray(parsed.obstacles) || !Array.isArray(parsed.pieces)) return null;
      return { obstacles: clonePositions(parsed.obstacles), pieces: parsed.pieces };
    } catch {
      return null;
    }
  }
}