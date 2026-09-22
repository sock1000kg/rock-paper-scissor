import { PIECE_LABELS, PIECE_SYMBOLS, SIDE_NAMES, type Piece } from '../game/types';

interface GamePieceProps {
  piece: Piece;
  selected: boolean;
  interactive: boolean;
  onSelect: () => void;
}

export function GamePiece({ piece, selected, interactive, onSelect }: GamePieceProps) {
  const label = `${SIDE_NAMES[piece.owner]} — ${PIECE_LABELS[piece.type]}`;
  const className = `game-piece side-${piece.owner.toLowerCase()}${selected ? ' is-selected' : ''}`;
  if (!interactive) {
    return <span className={className} role="img" aria-label={label}><span aria-hidden="true">{PIECE_SYMBOLS[piece.type]}</span></span>;
  }
  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      aria-label={label}
      aria-pressed={selected}
      title={label}
    >
      <span aria-hidden="true">{PIECE_SYMBOLS[piece.type]}</span>
    </button>
  );
}
