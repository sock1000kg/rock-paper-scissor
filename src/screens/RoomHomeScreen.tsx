import { useState } from 'react';
import { generateRoomId, normalizeRoomId, openRoom } from '../multiplayer/room';
import { useLocalPlayer } from '../hooks/useLocalPlayer';

export function RoomHomeScreen() {
  const { player, updateName } = useLocalPlayer();
  const [roomInput, setRoomInput] = useState('');
  const [error, setError] = useState('');

  const validateName = () => {
    if (player.name.trim().length < 2) {
      setError('Nhập tên có ít nhất 2 ký tự trước khi vào phòng.');
      return false;
    }
    return true;
  };

  const createRoom = () => {
    if (!validateName()) return;
    openRoom(generateRoomId());
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
