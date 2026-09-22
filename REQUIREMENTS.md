# OTTv2 — Yêu cầu và phân chia công việc

> Trạng thái: bản nháp v0.1, dùng để nhóm bắt đầu triển khai và sẽ tiếp tục cập nhật.
> Ngày cập nhật: 22/09/2026.

## 1. Mục tiêu

Xây dựng một web game Oẳn Tù Tì v2 (OTTv2) cho đúng 2 người chơi trong một phòng trực tuyến. Trò chơi dùng bàn cờ 9×9, ba loại quân **Kéo — Búa — Bao**, đồng bộ trạng thái thời gian thực bằng `playhtml`, và cho phép tạo/tham gia phòng qua mã phòng nằm trong URL hash.

Sản phẩm cuối phải có:

- Mã nguồn trên GitHub.
- Link deploy công khai trong `README.md`.
- Hai trình duyệt hoặc hai tab có thể vào cùng một phòng và chơi cùng ván.
- Kiểm thử tự động cho luật chơi, giao diện chính và luồng nhiều người chơi.

## 2. Phạm vi và công nghệ bắt buộc

- Frontend: **React**; khuyến nghị React + TypeScript + Vite.
- Multiplayer/shared state: `@playhtml/react` và `playhtml`.
- Bàn cờ: 9 cột `a..i`, 9 hàng `1..9`.
- Số người chơi trong một phòng: đúng 2; người thứ ba không được chiếm một bên chơi.
- Ba loại quân:
  - `ROCK` — Búa.
  - `PAPER` — Bao.
  - `SCISSORS` — Kéo.
- Hai phe được ký hiệu nội bộ là **X** và **O**. Mỗi phe có 9 quân, spawn thành hai cụm đối xứng ở góc dưới-trái và góc trên-phải như mục 3.1. Trên UI, X/O được thay bằng quân cờ trực quan.
- X/O là ký hiệu nhận biết phe; mỗi quân vẫn có một loại riêng là Kéo, Búa hoặc Bao.
- Không nằm trong phạm vi bản đầu: tài khoản, bảng xếp hạng toàn hệ thống, chat, ghép trận tự động và AI chơi thay người.

## 3. Quy ước luật chơi dùng cho bản đầu

Phần này chốt các điểm đề bài gốc chưa mô tả đủ để cả nhóm có thể code và test cùng một kết quả. Có thể sửa ở phiên bản yêu cầu sau.

### 3.1 Bàn cờ và vị trí ban đầu

- Mỗi bên có 9 quân: 3 Búa, 3 Bao và 3 Kéo.
- Phe **X** spawn ở góc dưới-trái tại: `a4`, `b4`, `a3`, `b3`, `c3`, `b2`, `c2`, `d2`, `c1`.
- Phe **O** spawn ở góc trên-phải tại: `g9`, `f8`, `g8`, `h8`, `g7`, `h7`, `i7`, `h6`, `i6`.
- Hai cụm spawn đối xứng nhau 180° qua tâm bàn cờ.
- Ô `a1` là **đích đỏ**, nằm cạnh cụm X và để trống khi bắt đầu.
- Ô `i9` là **đích xanh**, nằm cạnh cụm O và để trống khi bắt đầu.
- X đi trước. Đích của X là ô xanh `i9`; đích của O là ô đỏ `a1`.

Sơ đồ chuẩn hóa, hàng 9 ở trên và hàng 1 ở dưới:

```text
9 | . . . . . . O . B
8 | . . . . . O O O .
7 | . . . . . . O O O
6 | . . . . . . . O O
5 | . . . . . . . . .
4 | X X . . . . . . .
3 | X X X . . . . . .
2 | . X X X . . . . .
1 | R . X . . . . . .
    a b c d e f g h i
```

Trong sơ đồ, `R` là đích đỏ `a1`, `B` là đích xanh `i9`, còn `.` là ô trống. Sơ đồ chỉ thể hiện phe X/O; giao diện dùng quân cờ trực quan và thể hiện thêm loại Kéo/Búa/Bao. Phân bổ ban đầu:

- X — Búa: `a4`, `b3`, `c2`; Bao: `b4`, `c3`, `d2`; Kéo: `a3`, `b2`, `c1`.
- O — Búa: `i6`, `h7`, `g8`; Bao: `h6`, `g7`, `f8`; Kéo: `i7`, `h8`, `g9`.

### 3.2 Di chuyển

- Hai người chơi đi luân phiên, mỗi lượt chỉ chọn một quân của mình.
- Một quân đi đúng 1 ô theo một trong 8 hướng, giống quân vua trong cờ vua.
- Không được đi ra ngoài bàn cờ.
- Không được đi vào ô đang có quân cùng bên.
- Khi ván đã kết thúc, mọi thao tác di chuyển tiếp theo đều bị từ chối.

### 3.3 Ăn quân

Quan hệ thắng theo vòng:

- Búa ăn Kéo.
- Kéo ăn Bao.
- Bao ăn Búa.

Khi đi vào ô có quân đối phương:

- Nếu quân đi thắng quân tại đích: quân đối phương bị xóa và quân đi chiếm ô đích.
- Nếu hai quân cùng loại: nước đi không hợp lệ; hai quân chặn nhau.
- Nếu quân đi thua quân tại đích: nước đi không hợp lệ; không cho phép “tự sát”.

### 3.4 Điều kiện kết thúc

Một người chơi thắng ngay khi thỏa một trong hai điều kiện:

1. Ăn hết **toàn bộ quân** của đối phương, tức số quân còn lại của đối phương bằng 0.
2. Đưa bất kỳ quân nào của mình vào ô đích đối diện: `X → i9` (đích xanh), `O → a1` (đích đỏ).

Nếu một nước đi đồng thời thỏa cả hai điều kiện, người thực hiện nước đi vẫn là người thắng và ưu tiên lưu `winReason = "REACHED_GOAL"`. Kết quả phải lưu `winnerId` và `winReason` (`ELIMINATED_ALL_PIECES` hoặc `REACHED_GOAL`) trong shared state để hai máy hiển thị giống nhau.

## 4. Phòng chơi bằng URL hash

Tham khảo cách tổ chức phòng của [sock1000kg/playHTML](https://github.com/sock1000kg/playHTML), tại commit `a820905b29eb2badf85463e2882abdb9a168a3f3`. Chỉ tham khảo cơ chế phòng; không sao chép game mẫu vào dự án.

### 4.1 Dạng URL

- Trang chủ: `https://<domain>/`
- Phòng mẫu: `https://<domain>/#ABCD`
- Room ID gồm đúng 4 ký tự in hoa trong tập `[A-Z0-9]`.
- Khi nhập mã, phải `trim`, chuyển thành chữ hoa và kiểm tra regex `^[A-Z0-9]{4}$`.
- Nút **Tạo phòng** sinh mã mới và chuyển URL sang `#<ROOM_ID>`.
- Nút **Vào phòng** nhận mã hoặc link chia sẻ và chuyển vào đúng hash.
- Reload hoặc mở trực tiếp link có hash phải vào lại đúng phòng, không quay về phòng chung.
- Hai hash khác nhau phải có shared state tách biệt hoàn toàn.

Lưu ý: `#ABCD` là URL fragment dùng làm khóa phòng, không phải API endpoint và không phải mã băm bảo mật.

### 4.2 Tích hợp `playhtml`

Mẫu tích hợp cần giữ cùng ý nghĩa sau:

```tsx
<PlayProvider
  initOptions={{ room: () => getRoomIdFromUrl() || "lobby" }}
  pathname={roomId || "home"}
>
  <App />
</PlayProvider>
```

- `room` phải là hàm đọc room ID hiện tại thay vì một chuỗi cố định.
- `pathname` phải thay đổi theo `roomId` để provider xử lý chuyển phòng.
- Chỉ render màn hình game sau khi provider kết nối/xong trạng thái loading.
- Nếu phiên bản thư viện được chốt gặp race condition khi đổi hash, được phép reload trang khi `hashchange`; phải có test chứng minh vào đúng phòng và không tạo kết nối/trạng thái trùng.
- Đăng ký người chơi chỉ sau khi đồng bộ sẵn sàng; thao tác phải idempotent để reload không sinh người chơi thứ hai.
- Người vào đầu tiên nhận phe `X`/host; người tiếp theo nhận phe `O`; người thứ ba thấy trạng thái “Phòng đã đủ người” và chỉ được xem hoặc quay lại trang chủ.
- Chỉ người có đúng `playerId` và đúng lượt mới được gửi nước đi hợp lệ. Mọi client đều kiểm tra lại luật trước khi ghi shared state.

## 5. Hợp đồng dữ liệu chung

Tên trường có thể bổ sung nhưng không được đổi ý nghĩa khi chưa thống nhất cả nhóm.

```ts
type PieceType = "ROCK" | "PAPER" | "SCISSORS";
type PlayerSide = "X" | "O";
type GameStatus = "WAITING" | "PLAYING" | "FINISHED";
type WinReason = "ELIMINATED_ALL_PIECES" | "REACHED_GOAL";

type Position = { col: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; row: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 };

interface Piece {
  id: string;
  owner: PlayerSide;
  type: PieceType;
  position: Position;
}

interface Player {
  id: string;
  name: string;
  side: PlayerSide;
  isConnected: boolean;
}

interface SharedGameState {
  schemaVersion: 1;
  roomId: string;
  status: GameStatus;
  players: Partial<Record<PlayerSide, Player>>;
  pieces: Piece[];
  turn: PlayerSide;
  winnerId: string | null;
  winReason: WinReason | null;
  revision: number;
}
```

Quy ước:

- Logic luật là các hàm thuần, không import React hoặc `playhtml`.
- Mỗi nước đi hợp lệ tăng `revision` đúng 1; nước đi không hợp lệ không đổi state.
- Không dùng thời gian máy client để quyết định người thắng.
- `playerId` được tạo một lần và lưu local storage; room state chỉ lưu dữ liệu cần chia sẻ.

## 6. Giao diện và hành vi bắt buộc

- Màn hình Home có tên người chơi, **Tạo phòng**, ô nhập mã và **Vào phòng**.
- Màn hình Lobby hiển thị mã/link phòng, nút sao chép link và hai vị trí phe `X`, `O`.
- Chỉ bắt đầu khi đủ 2 người; host có nút **Bắt đầu**.
- Màn hình Game hiển thị bàn 9×9, hai cụm 9 quân spawn đúng sơ đồ mục 3.1, lượt hiện tại và thông tin của hai người chơi.
- Mỗi quân phải hiển thị rõ cả phe `X`/`O` và loại Kéo/Búa/Bao; không chỉ phân biệt bằng màu.
- Chỉ highlight các ô đích hợp lệ sau khi chọn quân của mình.
- Có thông báo rõ cho nước đi sai, mất kết nối, phòng đầy và mã phòng không hợp lệ.
- Màn hình kết quả hiển thị người thắng, lý do thắng, **Chơi lại** và **Rời phòng**.
- Bàn cờ dùng được trên desktop và màn hình mobile từ 360 px; không tràn ngang.

## 7. Chia việc thành 4 phần độc lập

Mỗi thành viên làm trên một branch riêng, sở hữu thư mục chính riêng và phải kèm test. Dùng dữ liệu fixture/mock theo hợp đồng tại mục 5 để bốn phần có thể được phát triển song song.

### Phần 1 — React shell, UI và bàn cờ

**Phạm vi**

- Khởi tạo React + TypeScript + Vite, cấu hình lint/test cơ bản.
- Xây Home, Lobby, Board, Piece, TurnIndicator và Result screen.
- Render đúng tọa độ `a..i`, `1..9`, ba loại quân và hai phía đối diện.
- Xử lý chọn quân/highlight ô từ props; chưa tự quyết định luật.
- Responsive và accessibility cơ bản.

**Vùng file sở hữu**

- `src/components/**`
- `src/screens/**`
- `src/styles/**`
- Cấu hình khởi tạo dự án sau khi nhóm thống nhất.

**API bàn giao**

```ts
interface BoardProps {
  pieces: Piece[];
  selectedPieceId: string | null;
  legalTargets: Position[];
  onPieceSelect(id: string): void;
  onCellSelect(position: Position): void;
  disabled?: boolean;
}
```

**Tự test/tiêu chí nghiệm thu**

- Component test đủ 81 ô và nhãn tọa độ đúng.
- Fixture ban đầu render đúng 18 quân tại toàn bộ tọa độ spawn trong mục 3.1; `a1` và `i9` là hai ô đích trống.
- Click quân/ô gọi callback đúng; trạng thái disabled không phát sinh callback.
- Test viewport 360 px và desktop; không có overflow ngang.

**Branch gợi ý:** `feature/ui-board`.

### Phần 2 — Game engine và luật OTTv2

**Phạm vi**

- Khai báo types, tạo state ban đầu và logic lượt chơi.
- Viết hàm tính nước đi hợp lệ, quan hệ Búa–Kéo–Bao, ăn quân và kiểm tra thắng.
- Trả lỗi có mã ổn định để UI dịch thành thông báo.
- Không phụ thuộc DOM, React hay mạng.

**Vùng file sở hữu**

- `src/game/**`
- `src/game/__tests__/**`

**API bàn giao**

```ts
createInitialGame(roomId: string, players: SharedGameState["players"]): SharedGameState;
getLegalMoves(state: SharedGameState, pieceId: string): Position[];
applyMove(state: SharedGameState, playerId: string, pieceId: string, to: Position):
  | { ok: true; state: SharedGameState }
  | { ok: false; code: string };
```

**Tự test/tiêu chí nghiệm thu**

- Test 8 hướng, biên/góc bàn cờ và chặn bởi quân cùng bên.
- Test đủ 3 quan hệ ăn quân, 3 cặp cùng loại và 3 trường hợp quân yếu không được đi vào quân mạnh.
- Test từ chối sai lượt, sai chủ quân và nước đi sau khi kết thúc.
- Test thắng khi quân cuối cùng của đối phương bị ăn, thắng khi X chiếm `i9`, thắng khi O chiếm `a1`, và việc tăng `revision`.
- Coverage nhánh cho `src/game/**` tối thiểu 90%.

**Branch gợi ý:** `feature/game-engine`.

### Phần 3 — Phòng chơi và đồng bộ `playhtml`

**Phạm vi**

- Cài và cấu hình `@playhtml/react`/`playhtml`.
- Viết helper sinh/đọc/ghi/validate room ID từ URL hash.
- Quản lý player ID local, gán phe `X`/`O`, phòng đầy, reconnect và rời phòng.
- Đồng bộ `SharedGameState`; gọi game engine trước khi ghi một nước đi.
- Ngăn tạo người chơi trùng và tách biệt dữ liệu giữa các room ID.

**Vùng file sở hữu**

- `src/multiplayer/**`
- `src/hooks/**`
- `src/providers/**`

**API bàn giao**

```ts
generateRoomId(): string;
normalizeRoomId(input: string): string | null;
getRoomIdFromUrl(): string | null;
setRoomIdInUrl(roomId: string | null): void;

interface MultiplayerAdapter {
  state: SharedGameState;
  connection: "CONNECTING" | "CONNECTED" | "DISCONNECTED";
  join(name: string): Promise<void>;
  submitMove(pieceId: string, to: Position): Promise<void>;
  leave(): Promise<void>;
}
```

**Tự test/tiêu chí nghiệm thu**

- Unit test mã hợp lệ/không hợp lệ, normalize và round-trip URL hash.
- Integration test hai client cùng `#ABCD` thấy cùng state sau một nước đi.
- Client tại `#WXYZ` không nhìn thấy state của `#ABCD`.
- Reload giữ đúng vai/player ID và không sinh bản ghi trùng.
- Client thứ ba không thể ghi nước đi.

**Branch gợi ý:** `feature/multiplayer-rooms`.

### Phần 4 — Tích hợp, E2E, CI và deploy

**Phạm vi**

- Nối UI của phần 1 với engine phần 2 và multiplayer adapter phần 3.
- Hoàn thiện state flow: Home → Lobby → Playing → Finished → Replay/Leave.
- Viết E2E hai browser context, kiểm tra lỗi và reconnect cơ bản.
- Cấu hình CI chạy lint, unit/component test và build.
- Deploy; cập nhật `README.md` với cách chạy, luật chơi, link deploy và link chia sẻ phòng mẫu.

**Vùng file sở hữu**

- `src/App.tsx`
- `src/main.tsx`
- `tests/e2e/**`
- `.github/workflows/**`
- `README.md`

**Tự test/tiêu chí nghiệm thu**

- E2E: người 1 tạo phòng, người 2 mở link hash, đủ hai người thì bắt đầu.
- E2E: thực hiện nước đi trên browser A và browser B thấy cùng kết quả/lượt.
- E2E: mô phỏng ít nhất một chiến thắng do ăn sạch quân đối phương và một chiến thắng do chiếm góc đích.
- E2E: chơi lại reset bàn cờ nhưng giữ hai người; rời phòng quay về Home.
- `npm run lint`, `npm test` và `npm run build` cùng pass trên CI.
- Link deploy mở trực tiếp `/#ABCD` không trả 404 và không mất hash.

**Branch gợi ý:** `feature/integration-e2e-deploy`.

## 8. Quy trình ghép nhánh

1. Cả nhóm thống nhất mục 3 và mục 5 trước khi code; mọi thay đổi hợp đồng phải sửa file này trong cùng pull request.
2. Phần 1 tạo skeleton dự án và merge sớm; phần 2 và phần 3 phát triển song song dựa trên types/fixtures đã chốt.
3. Mỗi pull request phải có test của phần mình, không sửa vùng file của thành viên khác nếu chưa trao đổi.
4. Phần 4 ghép các adapter, bổ sung E2E và deploy sau khi ba phần đầu có API ổn định.
5. Chỉ merge vào nhánh chính khi CI xanh và có ít nhất một thành viên khác review.

## 9. Definition of Done toàn dự án

- [ ] Dùng React và chạy được bằng lệnh ghi trong `README.md`.
- [ ] Bàn 9×9 và vị trí ban đầu đúng mục 3.1.
- [ ] Có đúng 9 quân mỗi phe (3 Búa, 3 Bao, 3 Kéo); ô đích đỏ `a1` và xanh `i9` để trống lúc bắt đầu.
- [ ] Đủ ba loại quân Kéo, Búa, Bao và đúng quan hệ ăn quân.
- [ ] Chỉ cho phép nước đi hợp lệ, luân phiên đúng người.
- [ ] Cả hai điều kiện thắng hoạt động và đồng bộ trên hai client.
- [ ] Tạo/join phòng bằng URL dạng `#ABCD`.
- [ ] Hai phòng khác mã không rò rỉ state sang nhau.
- [ ] Xử lý được reload, phòng đầy, mất kết nối và rời phòng ở mức yêu cầu.
- [ ] Unit/component/integration/E2E test đều pass.
- [ ] Có repository GitHub và link deploy công khai trong `README.md`.

## 10. Điểm cần xác nhận ở lần cập nhật sau

- Người thứ ba được làm khán giả hay phải bị chặn hoàn toàn?
- Khi một người mất kết nối lâu, đối thủ thắng mặc định hay ván chỉ tạm dừng?
- Có cần giới hạn thời gian cho mỗi lượt đi không?
