import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { usePageData, usePlayContext } from '@playhtml/react';
import { Board } from '../components/Board';
import { applyMove, createInitialGame, createInitialPieces, getLegalMoves } from '../game/engine';
import {
  PIECE_LABELS,
  PIECE_SYMBOLS,
  SIDE_NAMES,
  emptyGameState,
  type PieceType,
  type PlayerSide,
  type Position,
  type SharedGameState,
} from '../game/types';
import { useLocalPlayer } from '../hooks/useLocalPlayer';
import { leaveRoomUrl } from '../multiplayer/room';

const errorMessages: Record<string, string> = {
  GAME_NOT_PLAYING: 'Ván đấu chưa bắt đầu hoặc đã kết thúc.',
  NOT_YOUR_TURN: 'Chưa đến lượt của bạn.',
  PIECE_NOT_FOUND: 'Không tìm thấy quân cờ này.',
  NOT_YOUR_PIECE: 'Bạn chỉ có thể điều khiển quân của đội mình.',
  ILLEGAL_MOVE: 'Nước đi không hợp lệ.',
};

interface OnlineGameScreenProps {
  roomId: string;
}

export function OnlineGameScreen({ roomId }: OnlineGameScreenProps) {
  const { player, updateName } = useLocalPlayer();
  const { isLoading } = usePlayContext();
  const [state, setState] = usePageData<SharedGameState>('ottv2-game-state', emptyGameState);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [connectionSlow, setConnectionSlow] = useState(false);
  const resultDialogRef = useRef<HTMLElement>(null);
  const leavingRef = useRef(false);

  const mySide = (Object.keys(state.players ?? {}) as PlayerSide[]).find(
    (side) => state.players[side]?.id === player.id,
  ) ?? null;
  const isHost = Boolean(state.hostId) && state.hostId === player.id;
  const roomFull = Boolean(state.players?.X && state.players?.O);

  useEffect(() => {
    if (isLoading || !player.name || leavingRef.current) return;
    const alreadyJoined = state.players?.X?.id === player.id || state.players?.O?.id === player.id;
    if (alreadyJoined) return;

    const register = () => {
      if (leavingRef.current) return;
      setState((draft) => {
        if (!draft.players) draft.players = {};
        if (!draft.roomId) draft.roomId = roomId;
        if (draft.players.X?.id === player.id || draft.players.O?.id === player.id) return;
        if (!draft.players.X || !draft.players.X.isConnected) {
          draft.players.X = { id: player.id, name: player.name, side: 'X', isConnected: true };
        } else if (!draft.players.O || !draft.players.O.isConnected) {
          draft.players.O = { id: player.id, name: player.name, side: 'O', isConnected: true };
        }
      });
    };

    register();
    const retry = window.setInterval(register, 600);
    return () => window.clearInterval(retry);
  }, [isLoading, player.id, player.name, roomId, setState, state.players]);

  useEffect(() => {
    if (!isLoading) {
      setConnectionSlow(false);
      return;
    }
    const timer = window.setTimeout(() => setConnectionSlow(true), 7000);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    setSelectedId(null);
  }, [state.revision, state.turn]);

  useEffect(() => {
    if (state.status !== 'FINISHED') return;
    resultDialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [state.status]);

  const trapResultFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return;
    const buttons = Array.from(resultDialogRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
    if (!buttons.length) return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const legalTargets = useMemo(
    () => (selectedId ? getLegalMoves(state, selectedId) : []),
    [selectedId, state],
  );

  const previewPieces = state.pieces?.length ? state.pieces : createInitialPieces();
  const remaining = (side: PlayerSide) => state.pieces.filter((piece) => piece.owner === side).length;
  const typeCount = (side: PlayerSide, type: PieceType) =>
    state.pieces.filter((piece) => piece.owner === side && piece.type === type).length;

  const startGame = () => {
    if (!isHost || !roomFull) return;
    setState(createInitialGame(roomId, state.players));
    setMessage('Ván đấu bắt đầu. Đội Đỏ đi trước!');
  };

  const selectPiece = (pieceId: string) => {
    const piece = state.pieces.find((candidate) => candidate.id === pieceId);
    if (!piece || piece.owner !== mySide || state.turn !== mySide) {
      setMessage('Chỉ chọn quân của bạn khi đến lượt.');
      return;
    }
    setSelectedId((current) => (current === pieceId ? null : pieceId));
    setMessage('');
  };

  const moveTo = (position: Position) => {
    if (!selectedId || !mySide) return;
    const result = applyMove(state, player.id, selectedId, position);
    if (!result.ok) {
      setMessage(errorMessages[result.code]);
      return;
    }
    setState(result.state);
    setMessage('Nước đi đã được đồng bộ.');
  };

  const leave = () => {
    leavingRef.current = true;
    if (mySide) {
      setState((draft) => {
        if (draft.players?.[mySide]?.id === player.id) delete draft.players[mySide];
        draft.status = 'WAITING';
        draft.pieces = [];
        draft.winnerId = null;
        draft.winReason = null;
      });
    }
    window.setTimeout(leaveRoomUrl, 800);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (isLoading) {
    return (
      <main className="connection-screen">
        <div className="loading-piece">✊</div>
        <h1>{connectionSlow ? 'Kết nối đang lâu hơn dự kiến' : 'Đang kết nối phòng…'}</h1>
        <p>{connectionSlow ? 'Kiểm tra mạng rồi thử tải lại hoặc quay về sảnh.' : 'Đồng bộ bàn cờ và người chơi.'}</p>
        {connectionSlow && (
          <div className="dialog-actions">
            <button className="primary-button" onClick={() => window.location.reload()}>Thử lại</button>
            <button className="secondary-button" onClick={leaveRoomUrl}>Về sảnh</button>
          </div>
        )}
      </main>
    );
  }

  if (!player.name.trim()) {
    return (
      <main className="connection-screen identity-screen">
        <p className="context-line">Phòng {roomId}</p>
        <h1>Nhập tên để tham gia</h1>
        <p>Link phòng hợp lệ. Hãy đặt tên trước khi nhận đội.</p>
        <label htmlFor="direct-player-name">Tên người chơi</label>
        <input
          id="direct-player-name"
          value={player.name}
          onChange={(event) => updateName(event.target.value.slice(0, 24))}
          placeholder="Ví dụ: Minh"
          autoFocus
        />
      </main>
    );
  }

  const winner = state.winnerId
    ? Object.values(state.players).find((candidate) => candidate?.id === state.winnerId)
    : null;

  return (
    <main className="online-screen">
      <section className="room-toolbar">
        <div>
          <span className="room-label">Phòng</span>
          <strong className="room-id">{roomId}</strong>
        </div>
        <div className="toolbar-actions">
          <button className="text-button" onClick={copyLink}>{copied ? 'Đã sao chép' : 'Sao chép link'}</button>
          <button className="text-button danger-text" onClick={leave}>Rời phòng</button>
        </div>
      </section>

      {state.status === 'WAITING' ? (
        <section className="lobby-layout">
          <div className="lobby-copy">
            <p className="context-line">Sảnh chờ · {roomId}</p>
            <h1>{roomFull ? 'Đủ đội hình.' : 'Đang chờ đối thủ…'}</h1>
            <p>{roomFull ? 'Host có thể bắt đầu. Đội Đỏ sẽ đi trước.' : 'Gửi link phòng cho người chơi thứ hai để bắt đầu.'}</p>
            <div className="seat-list">
              {(['X', 'O'] as PlayerSide[]).map((side) => (
                <div className={`seat side-seat-${side.toLowerCase()}`} key={side}>
                  <span className="seat-token">{side === 'X' ? '✊' : '✋'}</span>
                  <div><small>{SIDE_NAMES[side]}</small><strong>{state.players?.[side]?.name ?? 'Đang chờ…'}</strong></div>
                  {state.players?.[side]?.id === player.id && <span className="you-badge">Bạn</span>}
                </div>
              ))}
            </div>
            {mySide ? (
              isHost ? (
                <button className="primary-button" disabled={!roomFull} onClick={startGame}>Bắt đầu ván đấu</button>
              ) : <p className="waiting-note">Đang chờ host bắt đầu…</p>
            ) : <p className="form-error">Phòng đã đủ hai người. Bạn đang xem với vai trò khán giả.</p>}
          </div>
          <div className="lobby-board" aria-hidden="true">
            <Board pieces={previewPieces} turn="X" mySide={null} selectedPieceId={null} legalTargets={[]} onPieceSelect={() => {}} onCellSelect={() => {}} disabled />
          </div>
        </section>
      ) : (
        <section className="game-layout">
          <div className="game-main">
            <div className="turn-banner" aria-live="polite">
              <span className={`turn-dot side-bg-${state.turn.toLowerCase()}`} />
              {state.status === 'FINISHED' ? 'Ván đấu đã kết thúc' : `Lượt của ${SIDE_NAMES[state.turn]}`}
              {mySide === state.turn && state.status === 'PLAYING' && <strong> · Đến lượt bạn</strong>}
            </div>
            <div className="mobile-match-status" aria-label="Tóm tắt người chơi">
              <span><i className="side-bg-x" />{state.players.X?.name ?? 'Đội Đỏ'} · {remaining('X')} quân</span>
              <span><i className="side-bg-o" />{state.players.O?.name ?? 'Đội Xanh'} · {remaining('O')} quân</span>
            </div>
            <Board
              pieces={state.pieces}
              turn={state.turn}
              mySide={mySide}
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
      )}

      {state.status === 'FINISHED' && (
        <div className="result-backdrop" role="presentation">
          <section ref={resultDialogRef} className="result-dialog" role="dialog" aria-modal="true" aria-labelledby="winner-title" aria-describedby="winner-description" tabIndex={-1} onKeyDown={trapResultFocus}>
            <span className="result-piece" aria-hidden="true">🏆</span>
            <p className="context-line">Kết thúc ván đấu</p>
            <h1 id="winner-title">{winner?.name ?? 'Người chơi'} chiến thắng!</h1>
            <p id="winner-description">{state.winReason === 'REACHED_GOAL' ? 'Một quân đã chiếm được đích đối diện.' : 'Toàn bộ quân đối phương đã bị loại.'}</p>
            <div className="dialog-actions">
              {isHost && <button className="primary-button" onClick={startGame}>Chơi lại</button>}
              <button className="secondary-button" onClick={leave}>Rời phòng</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
