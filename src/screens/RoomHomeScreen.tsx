import { useMemo, useState } from 'react';
import { Board } from '../components/Board';
import { createEditorPieces } from '../game/maps';
import { PIECE_LABELS, PIECE_SYMBOLS, SIDE_NAMES, type Piece, type PieceType, type PlayerSide, type Position } from '../game/types';
import { generateRoomId, normalizeRoomId, openRoom } from '../multiplayer/room';
import { useLocalPlayer } from '../hooks/useLocalPlayer';
import { MAP_PRESETS } from '../game/maps';
import type { MapId } from '../game/types';

export function RoomHomeScreen() {
  const { player, updateName } = useLocalPlayer();
  const [roomInput, setRoomInput] = useState('');
  const [error, setError] = useState('');
  const [pendingRoom, setPendingRoom] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<MapId>('default');
  const [editorPieces, setEditorPieces] = useState<Piece[]>(createEditorPieces);
  const [editorObstacles, setEditorObstacles] = useState<Position[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [newPieceSide, setNewPieceSide] = useState<PlayerSide>('X');
  const [newPieceType, setNewPieceType] = useState<PieceType>('ROCK');

  const activePreset = useMemo(
    () => MAP_PRESETS.find((preset) => preset.id === selectedMap) ?? MAP_PRESETS[0],
    [selectedMap],
  );

  const validateName = () => {
    if (player.name.trim().length < 2) {
      setError('Nhập tên có ít nhất 2 ký tự trước khi vào phòng.');
      return false;
    }
    return true;
  };

  const createRoom = () => {
    if (!validateName()) return;
    setPendingRoom(generateRoomId());
  };

  const joinRoom = () => {
    if (!validateName()) return;
    const roomId = normalizeRoomId(roomInput);
    if (!roomId) {
      setError('Mã phòng gồm đúng 4 chữ cái hoặc chữ số.');
      return;
    }
    openRoom(roomId);
  };

  const chooseMap = (mapId: MapId) => {
    setSelectedMap(mapId);
    setSelectedPieceId(null);
    if (mapId !== 'custom') setEditorObstacles([]);
  };

  const editCell = (position: Position) => {
    const occupied = editorPieces.find((piece) => piece.position.col === position.col && piece.position.row === position.row);
    if (selectedPieceId) {
      if (occupied && occupied.id !== selectedPieceId) return;
      setEditorPieces((pieces) => pieces.map((piece) => piece.id === selectedPieceId ? { ...piece, position } : piece));
      setEditorObstacles((obstacles) => obstacles.filter((obstacle) => obstacle.col !== position.col || obstacle.row !== position.row));
      return;
    }
    if (occupied) return;
    setEditorObstacles((obstacles) => {
      const exists = obstacles.some((obstacle) => obstacle.col === position.col && obstacle.row === position.row);
      return exists
        ? obstacles.filter((obstacle) => obstacle.col !== position.col || obstacle.row !== position.row)
        : [...obstacles, position];
    });
  };

  const addPiece = () => {
    const typeCount = editorPieces.filter((piece) => piece.owner === newPieceSide && piece.type === newPieceType).length;
    if (typeCount >= 4) {
      window.alert('Tối đa 4 quân cùng loại cho mỗi bên.');
      return;
    }
    const occupied = new Set(editorPieces.map((piece) => `${piece.position.col}:${piece.position.row}`));
    const blocked = new Set(editorObstacles.map((obstacle) => `${obstacle.col}:${obstacle.row}`));
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        if (occupied.has(`${col}:${row}`) || blocked.has(`${col}:${row}`)) continue;
        const piece: Piece = {
          id: `custom-${newPieceSide}-${newPieceType}-${Date.now()}`,
          owner: newPieceSide,
          type: newPieceType,
          position: { col, row },
        };
        setEditorPieces((pieces) => [...pieces, piece]);
        setSelectedPieceId(piece.id);
        return;
      }
    }
  };

  const removeSelectedPiece = () => {
    if (!selectedPieceId) return;
    setEditorPieces((pieces) => pieces.filter((piece) => piece.id !== selectedPieceId));
    setSelectedPieceId(null);
  };

  const continueToRoom = () => {
    if (!pendingRoom) return;
    const layout = selectedMap === 'custom'
      ? JSON.stringify({ obstacles: editorObstacles, pieces: editorPieces })
      : undefined;
    openRoom(pendingRoom, selectedMap, layout);
  };

  if (pendingRoom) {
    const mapObstacles = selectedMap === 'custom' ? editorObstacles : activePreset.obstacles;
    return (
      <main className="map-selection-screen">
        <section className="screen-heading">
          <div>
            <p className="context-line">Phòng {pendingRoom} · Bước 2</p>
            <h1>Chọn bản đồ</h1>
            <p>Chọn địa hình trước khi vào sảnh. Host sẽ dùng lựa chọn này khi bắt đầu ván.</p>
          </div>
          <button className="text-button" onClick={() => setPendingRoom(null)}>Quay lại</button>
        </section>
        <div className="map-selection-layout">
          <section className="map-options" aria-label="Các bản đồ">
            {MAP_PRESETS.map((preset) => (
              <button
                className={`map-option${selectedMap === preset.id ? ' is-selected' : ''}`}
                key={preset.id}
                onClick={() => chooseMap(preset.id)}
              >
                <strong>{preset.name}</strong>
                <span>{preset.description}</span>
              </button>
            ))}
            {selectedMap === 'custom' && (
              <div className="editor-tools">
                <p><strong>Chỉnh map:</strong> chọn quân để đặt lại vị trí, thêm/xóa quân, hoặc bỏ chọn để bật/tắt chướng ngại vật.</p>
                <button className={`secondary-button editor-tool${selectedPieceId ? '' : ' is-selected'}`} onClick={() => setSelectedPieceId(null)}>▦ Chướng ngại vật</button>
                <div className="editor-add-piece">
                  <select value={newPieceSide} onChange={(event) => setNewPieceSide(event.target.value as PlayerSide)} aria-label="Bên quân mới">
                    <option value="X">{SIDE_NAMES.X}</option>
                    <option value="O">{SIDE_NAMES.O}</option>
                  </select>
                  <select value={newPieceType} onChange={(event) => setNewPieceType(event.target.value as PieceType)} aria-label="Loại quân mới">
                    {(['ROCK', 'PAPER', 'SCISSORS'] as PieceType[]).map((type) => <option key={type} value={type}>{PIECE_LABELS[type]}</option>)}
                  </select>
                  <button className="secondary-button" onClick={addPiece}>Thêm quân</button>
                </div>
                <button className="text-button danger-text" disabled={!selectedPieceId} onClick={removeSelectedPiece}>Xóa quân đang chọn</button>
                <div className="editor-piece-list">
                  {editorPieces.map((piece, index) => (
                    <button className={`secondary-button editor-piece-choice${selectedPieceId === piece.id ? ' is-selected' : ''}`} key={piece.id} onClick={() => setSelectedPieceId(piece.id)}>
                      {PIECE_SYMBOLS[piece.type]} {SIDE_NAMES[piece.owner]} · {PIECE_LABELS[piece.type]} {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button className="primary-button full-width" onClick={continueToRoom}>Tiếp tục vào phòng</button>
          </section>
          <section className="map-preview">
            <div className="map-preview-heading"><strong>{activePreset.name}</strong><span>{mapObstacles.length} chướng ngại vật</span></div>
            <Board
              pieces={selectedMap === 'custom' ? editorPieces : createEditorPieces()}
              obstacles={mapObstacles}
              turn="X"
              mySide={null}
              selectedPieceId={selectedPieceId}
              legalTargets={[]}
              onPieceSelect={() => {}}
              onCellSelect={() => {}}
              editorMode={selectedMap === 'custom'}
              onEditorCellSelect={editCell}
              disabled={selectedMap !== 'custom'}
            />
            {selectedMap === 'custom' && <p className="editor-hint">Chọn quân bên trái rồi bấm ô đích. Bỏ chọn quân để bật/tắt chướng ngại vật.</p>}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="room-home">
      <section className="room-copy">
        <p className="context-line">Bài 2 · Multiplayer</p>
        <h1>Một bàn cờ.<br />Hai chiến thuật.</h1>
        <p>
          Tạo phòng riêng, gửi link cho bạn chơi và đưa quân đến đích đối diện — hoặc loại toàn bộ đội hình của họ.
        </p>
        <div className="rules-strip">
          <span><strong>9×9</strong> bàn cờ</span>
          <span><strong>8</strong> hướng đi</span>
          <span><strong>3</strong> loại quân</span>
        </div>
      </section>

      <section className="join-panel" aria-labelledby="join-title">
        <h2 id="join-title">Vào trận</h2>
        <label htmlFor="player-name">Tên người chơi</label>
        <input
          id="player-name"
          value={player.name}
          onChange={(event) => {
            updateName(event.target.value.slice(0, 24));
            setError('');
          }}
          placeholder="Ví dụ: Minh"
          autoComplete="nickname"
        />
        <button className="primary-button full-width" onClick={createRoom}>Tạo phòng mới</button>
        <div className="or-divider"><span>hoặc vào phòng có sẵn</span></div>
        <div className="room-code-row">
          <input
            aria-label="Mã phòng"
            value={roomInput}
            onChange={(event) => {
              setRoomInput(event.target.value.toUpperCase().slice(0, 4));
              setError('');
            }}
            placeholder="ABCD"
            maxLength={4}
          />
          <button className="secondary-button" onClick={joinRoom}>Tham gia</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <p className="privacy-note">Mã phòng nằm sau dấu # trong link và có thể gửi trực tiếp cho người chơi thứ hai.</p>
      </section>
    </main>
  );
}
