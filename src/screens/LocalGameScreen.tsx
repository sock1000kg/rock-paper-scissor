import { useMemo, useState } from 'react';
import { Board } from '../components/Board';
import { applyMove, createInitialGame, getLegalMoves } from '../game/engine';
import {
  PIECE_LABELS,
  PIECE_SYMBOLS,
  SIDE_NAMES,
  type PieceType,
  type PlayerSide,
  type Position,
  type SharedGameState,
} from '../game/types';

const LOCAL_PLAYERS: SharedGameState['players'] = {
  X: { id: 'local-x', name: 'Người chơi 1', side: 'X', isConnected: true },
  O: { id: 'local-o', name: 'Người chơi 2', side: 'O', isConnected: true },
};

const errorMessages: Record<string, string> = {
  GAME_NOT_PLAYING: 'Ván đấu đã kết thúc.',
  NOT_YOUR_TURN: 'Chưa đến lượt này.',
  PIECE_NOT_FOUND: 'Không tìm thấy quân cờ này.',
  NOT_YOUR_PIECE: 'Chỉ được chọn quân của đội đang đến lượt.',
  ILLEGAL_MOVE: 'Nước đi không hợp lệ.',
};

function newGame(): SharedGameState {
  return createInitialGame('local', LOCAL_PLAYERS);
}

export function LocalGameScreen() {
  const [state, setState] = useState<SharedGameState>(newGame);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const legalTargets = useMemo(
    () => (selectedId ? getLegalMoves(state, selectedId) : []),
    [selectedId, state],
  );

  const remaining = (side: PlayerSide) => state.pieces.filter((piece) => piece.owner === side).length;
  const typeCount = (side: PlayerSide, type: PieceType) =>
    state.pieces.filter((piece) => piece.owner === side && piece.type === type).length;

  const selectPiece = (pieceId: string) => {
    const piece = state.pieces.find((candidate) => candidate.id === pieceId);
    if (!piece || piece.owner !== state.turn) {
      setMessage('Chỉ được chọn quân của đội đang đến lượt.');
      return;
    }
    setSelectedId((current) => (current === pieceId ? null : pieceId));
    setMessage('');
  };

  const moveTo = (position: Position) => {
    if (!selectedId) return;
    const currentPlayerId = state.players[state.turn]?.id;
    if (!currentPlayerId) return;
    const result = applyMove(state, currentPlayerId, selectedId, position);
    if (!result.ok) {
      setMessage(errorMessages[result.code]);
      return;
    }
    setState(result.state);
    setSelectedId(null);
    setMessage('');
  };

  const playAgain = () => {
    setState(newGame());
    setSelectedId(null);
    setMessage('');
  };

  const winner = state.winnerId
    ? Object.values(state.players).find((candidate) => candidate?.id === state.winnerId)
    : null;

  return (
    <main className="online-screen">
      <section className="screen-heading">
        <div>
          <p className="context-line">Bài 1 · Cờ OTTv2 tại chỗ</p>
          <h1>Hai người chơi trên cùng thiết bị</h1>
          <p>Thay phiên di chuyển quân của đội mình. Ăn hết quân đối phương hoặc chiếm ô đích đối diện để thắng.</p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-main">
          <div className="turn-banner" aria-live="polite">
            <span className={`turn-dot side-bg-${state.turn.toLowerCase()}`} />
            {state.status === 'FINISHED'
              ? 'Ván đấu đã kết thúc'
              : `Lượt của ${SIDE_NAMES[state.turn]} — ${state.players[state.turn]?.name ?? ''}`}
          </div>
          <div className="mobile-match-status" aria-label="Tóm tắt người chơi">
            <span><i className="side-bg-x" />{state.players.X?.name ?? 'Đội Đỏ'} · {remaining('X')} quân</span>
            <span><i className="side-bg-o" />{state.players.O?.name ?? 'Đội Xanh'} · {remaining('O')} quân</span>
          </div>
          <Board
            pieces={state.pieces}
            turn={state.turn}
            mySide={state.turn}
            selectedPieceId={selectedId}
            legalTargets={legalTargets}
            onPieceSelect={selectPiece}
            onCellSelect={moveTo}
            disabled={state.status !== 'PLAYING'}
          />
          <p className="game-message" role="status">{message || 'Chọn một quân để xem các ô có thể đi.'}</p>
        </div>

        <aside className="game-sidebar">
          {(['X', 'O'] as PlayerSide[]).map((side) => (
            <section className={`player-summary summary-${side.toLowerCase()}`} key={side}>
              <div className="player-name-row">
                <div><small>{SIDE_NAMES[side]}</small><h2>{state.players[side]?.name ?? 'Trống'}</h2></div>
                <strong>{remaining(side)} quân</strong>
              </div>
              <div className="piece-counts">
                {(['ROCK', 'PAPER', 'SCISSORS'] as PieceType[]).map((type) => (
                  <span key={type} title={PIECE_LABELS[type]}>{PIECE_SYMBOLS[type]} {typeCount(side, type)}</span>
                ))}
              </div>
            </section>
          ))}
          <section className="quick-rules">
            <h2>Luật nhanh</h2>
            <p>✊ ăn ✌️ · ✌️ ăn ✋ · ✋ ăn ✊</p>
            <p>Đi một ô theo 8 hướng. Cùng loại sẽ chặn nhau.</p>
            <div className="goal-legend"><span className="legend-red">⚑ a1</span><span className="legend-blue">⚑ i9</span></div>
          </section>
        </aside>
      </section>

      {state.status === 'FINISHED' && (
        <div className="result-backdrop" role="presentation">
          <section className="result-dialog" role="dialog" aria-modal="true" aria-labelledby="winner-title" aria-describedby="winner-description">
            <span className="result-piece" aria-hidden="true">🏆</span>
            <p className="context-line">Kết thúc ván đấu</p>
            <h1 id="winner-title">{winner?.name ?? 'Người chơi'} chiến thắng!</h1>
            <p id="winner-description">
              {state.winReason === 'REACHED_GOAL' ? 'Một quân đã chiếm được đích đối diện.' : 'Toàn bộ quân đối phương đã bị loại.'}
            </p>
            <div className="dialog-actions">
              <button className="primary-button" onClick={playAgain}>Chơi lại</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
