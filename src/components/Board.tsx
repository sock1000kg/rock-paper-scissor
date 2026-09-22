import { toSquare } from '../game/engine';
import type { Piece, Position, PlayerSide } from '../game/types';
import { GamePiece } from './GamePiece';

interface BoardProps {
  pieces: Piece[];
  turn: PlayerSide;
  mySide: PlayerSide | null;
  selectedPieceId: string | null;
  legalTargets: Position[];
  onPieceSelect: (id: string) => void;
  onCellSelect: (position: Position) => void;
  disabled?: boolean;
}

const samePosition = (a: Position, b: Position) => a.col === b.col && a.row === b.row;

export function Board({
  pieces,
  turn,
  mySide,
  selectedPieceId,
  legalTargets,
  onPieceSelect,
  onCellSelect,
  disabled = false,
}: BoardProps) {
  const cells: Position[] = [];
  for (let row = 8; row >= 0; row -= 1) {
    for (let col = 0; col < 9; col += 1) cells.push({ col, row });
  }

  return (
    <div className="board-scroll">
      <div className={`board-frame${disabled ? ' is-static' : ''}`} aria-label="Bàn cờ OTTv2 9 nhân 9">
        <div className="board" role="grid" aria-rowcount={9} aria-colcount={9}>
        {cells.map((position) => {
          const square = toSquare(position);
          const piece = pieces.find((candidate) => samePosition(candidate.position, position));
          const isLegal = legalTargets.some((candidate) => samePosition(candidate, position));
          const isRedGoal = square === 'a1';
          const isBlueGoal = square === 'i9';
          const isSelected = piece?.id === selectedPieceId;
          const canSelect = Boolean(
            piece && !disabled && piece.owner === mySide && piece.owner === turn,
          );

          const pieceInteractive = Boolean(piece && (canSelect || isLegal));
          return (
            <div
              role="gridcell"
              key={square}
              className={`board-cell${isLegal ? ' is-legal' : ''}${isRedGoal ? ' goal-red' : ''}${isBlueGoal ? ' goal-blue' : ''}`}
              aria-label={`${square}${isLegal ? ', nước đi hợp lệ' : ''}${isRedGoal ? ', đích đỏ' : ''}${isBlueGoal ? ', đích xanh' : ''}`}
              data-square={square}
            >
              {(isRedGoal || isBlueGoal) && !piece && (
                <span className="goal-flag" aria-hidden="true">⚑<small>{isRedGoal ? 'ĐỎ' : 'XANH'}</small></span>
              )}
              {isLegal && !piece && (
                <button className="cell-target" type="button" onClick={() => onCellSelect(position)} aria-label={`Đi đến ${square}`} />
              )}
              {piece && (
                <GamePiece
                  piece={piece}
                  selected={isSelected}
                  interactive={pieceInteractive}
                  onSelect={() => isLegal && selectedPieceId ? onCellSelect(position) : onPieceSelect(piece.id)}
                />
              )}
              {position.col === 0 && <span className="row-label">{position.row + 1}</span>}
              {position.row === 0 && <span className="col-label">{String.fromCharCode(97 + position.col)}</span>}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
