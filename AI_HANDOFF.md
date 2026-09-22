# OTTv2 — AI Handoff

## 1. Mục tiêu dự án

Dự án môn học gồm **2 bài tập độc lập trong cùng một ứng dụng React**:

1. **Bài 1 — Oẳn Tù Tì cổ điển**
   - Người chơi đấu với máy.
   - Chọn Kéo, Búa hoặc Bao.
   - Người đầu tiên đạt 5 điểm thắng trận.

2. **Bài 2 — OTTv2 multiplayer**
   - Hai người chơi trong một phòng trực tuyến.
   - Bàn cờ 9×9.
   - Phòng được phân tách bằng mã nằm trong URL hash, ví dụ `?exercise=ottv2#ABCD`.
   - Dùng `@playhtml/react` và `playhtml` để đồng bộ shared state.

Đề gốc nằm trong file `requirements`. Đặc tả chi tiết Bài 2 nằm trong `REQUIREMENTS.md`.

## 2. Các quyết định đã chốt

### Phân biệt hai bài

- `requirements` mô tả hai bài tập của đề môn học.
- Bài 1 là game Kéo–Búa–Bao thông thường.
- Bài 2 dùng ý tưởng và đặc tả trong `REQUIREMENTS.md`.
- Hai bài được chọn từ trang Home hoặc thanh điều hướng chung.

### Bàn cờ OTTv2

- Bàn 9 cột `a..i`, 9 hàng `1..9`.
- Mỗi phe có **9 quân**, không phải 10 quân.
- Mỗi phe có đúng:
  - 3 Búa.
  - 3 Bao.
  - 3 Kéo.
- Phe được ký hiệu nội bộ bằng `X` và `O`, nhưng **UI không hiển thị chữ X/O trên quân**.
- UI dùng token quân cờ tròn với biểu tượng:
  - Búa: `✊`.
  - Bao: `✋`.
  - Kéo: `✌️`.
- Phe X được hiển thị là **Đội Đỏ**.
- Phe O được hiển thị là **Đội Xanh**.

### Vị trí spawn

Đã bỏ cặp vị trí đối xứng `d1` và `f9` khỏi hình ban đầu để còn 9 quân mỗi phe.

Phe X:

- Búa: `a4`, `b3`, `c2`.
- Bao: `b4`, `c3`, `d2`.
- Kéo: `a3`, `b2`, `c1`.

Phe O là ảnh xoay 180° của phe X:

- Búa: `i6`, `h7`, `g8`.
- Bao: `h6`, `g7`, `f8`.
- Kéo: `i7`, `h8`, `g9`.

### Ô đích

- `a1`: đích đỏ, để trống lúc bắt đầu; phe O phải chiếm ô này.
- `i9`: đích xanh, để trống lúc bắt đầu; phe X phải chiếm ô này.

### Luật di chuyển và ăn quân

- X đi trước.
- Hai phe đi luân phiên.
- Mỗi quân đi đúng 1 ô theo một trong 8 hướng, giống quân vua trong cờ vua.
- Không được đi ra ngoài bàn.
- Không được đi vào ô có quân cùng phe.
- Búa ăn Kéo.
- Kéo ăn Bao.
- Bao ăn Búa.
- Hai quân cùng loại chặn nhau.
- Quân yếu không được đi vào ô có quân mạnh hơn; không có nước đi tự sát.

### Điều kiện thắng

Người chơi thắng khi:

1. Ăn sạch toàn bộ quân đối phương; hoặc
2. Đưa một quân vào đích đối diện.

Shared state lưu:

- `winnerId`.
- `winReason = "ELIMINATED_ALL_PIECES" | "REACHED_GOAL"`.

Nếu một nước đi đồng thời thỏa hai điều kiện, ưu tiên `REACHED_GOAL`.

## 3. Cơ chế phòng multiplayer

Tham khảo repository:

- <https://github.com/sock1000kg/playHTML>
- Commit đã tham khảo: `a820905b29eb2badf85463e2882abdb9a168a3f3`.

Quy ước URL:

- Home: `/`
- Bài 1: `/?exercise=classic`
- Sảnh Bài 2: `/?exercise=ottv2`
- Phòng Bài 2: `/?exercise=ottv2#ABCD`

Room ID:

- Đúng 4 ký tự.
- Chỉ gồm chữ hoa và chữ số.
- Regex: `^[A-Z0-9]{4}$`.
- Khi nhập mã: trim và chuyển thành chữ hoa.

Vai trò:

- Người đầu tiên vào phòng nhận phe X và là host.
- Người thứ hai nhận phe O.
- Người thứ ba chỉ xem với vai trò spectator.
- Chỉ host bắt đầu/chơi lại ván.
- Player ID lưu trong local storage để reload không sinh người chơi mới.

`PlayProvider` được cấu hình theo ý tưởng:

```tsx
<PlayProvider
  initOptions={{ room: () => getRoomIdFromUrl() || 'ottv2-home' }}
  pathname={roomId || 'home'}
>
  <App />
</PlayProvider>
```

## 4. Những gì đã được triển khai

### Cấu hình dự án

- React 18.
- TypeScript.
- Vite 8.
- Vitest 5.
- `@playhtml/react`.
- `playhtml`.

Các file cấu hình:

- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `.gitignore`

### Bài 1

File chính:

- `src/screens/ClassicScreen.tsx`
- `src/game/classic.ts`

Đã có:

- Chọn Kéo/Búa/Bao.
- Máy chọn ngẫu nhiên.
- Tính thắng/thua/hòa.
- Tính điểm đến 5.
- Reset để chơi trận mới.
- UI responsive desktop/mobile.

### Bài 2

Game engine:

- `src/game/types.ts`
- `src/game/engine.ts`

Multiplayer:

- `src/multiplayer/room.ts`
- `src/hooks/useLocalPlayer.ts`
- `src/screens/RoomHomeScreen.tsx`
- `src/screens/OnlineGameScreen.tsx`

UI bàn cờ:

- `src/components/Board.tsx`
- `src/components/GamePiece.tsx`

Đã có:

- Tạo phòng và vào phòng bằng mã/link.
- Đăng ký người chơi vào X/O.
- Lobby hiển thị hai vị trí người chơi.
- Bắt đầu ván khi đủ hai người.
- Bàn 9×9 và 18 quân đúng cấu hình 3–3–3.
- Chọn quân và highlight nước đi hợp lệ.
- Ăn quân, đổi lượt và kiểm tra thắng.
- Hiển thị số quân và số lượng từng loại còn lại.
- Chơi lại và rời phòng.
- Xử lý phòng đầy/spectator.
- Màn hình loading và trạng thái kết nối chậm.
- Người mở trực tiếp link phòng nhưng chưa có tên sẽ được yêu cầu nhập tên.
- Dùng clone dữ liệu thuần thay cho `structuredClone` để tránh lỗi với proxy Yjs/SyncedStore.

### Giao diện chung

- `src/App.tsx`
- `src/main.tsx`
- `src/components/AppHeader.tsx`
- `src/screens/HomeScreen.tsx`
- `src/styles.css`

UI đã được kiểm tra ở:

- Desktop: 1440×1000.
- Mobile: 390×844.

Quyết định thiết kế được lưu tại:

- `PRODUCT.md`
- `DESIGN.md`

## 5. Accessibility và responsive đã xử lý

- Không còn `<button>` lồng trong `<button>` trên bàn cờ.
- Gridcell là phần tử tĩnh; chỉ quân hoặc ô đích thực sự tương tác mới là button.
- Preview bàn cờ trong lobby không còn các phần tử focus ẩn.
- Quân đối phương không bị làm mờ chỉ vì không thể click.
- Bàn cờ mobile giữ kích thước ô tương tác khoảng 48 px và nằm trong vùng cuộn ngang riêng.
- Ô đích có cả màu, cờ và nhãn `ĐỎ`/`XANH`.
- Có tóm tắt hai đội phía trên bàn cờ trên mobile.
- Modal kết quả tự đưa focus vào action và giữ focus trong modal.
- Touch target toolbar giữ tối thiểu 44 px.
- Có `prefers-reduced-motion`.
- Impeccable detector cuối cùng trả về `[]`, không còn cảnh báo UI tự động.

## 6. Kiểm thử hiện tại

Các test:

- `src/game/classic.test.ts`
- `src/game/engine.test.ts`
- `src/multiplayer/room.test.ts`

Kết quả gần nhất:

- 3 test files pass.
- 14/14 tests pass.
- `npm run build` pass.
- `npm audit --audit-level=moderate`: 0 vulnerabilities.
- `git diff --check`: không có lỗi whitespace.

Các test đã bao phủ:

- Luật Kéo–Búa–Bao cổ điển.
- Random choice của máy.
- 9 quân mỗi phe, 3 quân mỗi loại.
- Hai đích trống.
- Di chuyển 8 hướng.
- Cùng loại và quân mạnh/yếu.
- Thắng do chiếm `i9`.
- Thắng do ăn quân cuối cùng.
- Từ chối người chơi sai lượt.
- Normalize, validate và generate room ID.

## 7. Lệnh chạy

```bash
npm install
npm run dev
```

Kiểm thử và build:

```bash
npm test
npm run build
```

## 8. Giới hạn và việc nên làm tiếp

### Chưa xác minh hoàn toàn

- Chưa chạy thành công E2E thật với hai browser kết nối qua dịch vụ `playhtml`.
- Trong Chrome headless của môi trường phát triển, WebSocket handshake của dịch vụ bên ngoài bị giữ ở trạng thái loading.
- Game engine, build và UI đã được kiểm tra; multiplayer thực tế cần test thủ công trên môi trường có kết nối mạng ngoài ổn định.

### Việc ưu tiên tiếp theo

1. Chạy `npm run dev`.
2. Mở một link phòng trong hai browser/profile khác nhau.
3. Xác minh người đầu tiên là Đội Đỏ, người thứ hai là Đội Xanh.
4. Bắt đầu ván và kiểm tra một nước đi được đồng bộ ở cả hai client.
5. Kiểm tra reload không sinh người chơi trùng.
6. Kiểm tra phòng thứ ba không ghi được nước đi.
7. Viết Playwright E2E hai browser context nếu môi trường CI cho phép WebSocket ngoài.
8. Deploy lên GitHub Pages/Vercel/Netlify và cập nhật link trong `README.md`.

## 9. Trạng thái Git

Ở lần kiểm tra gần nhất:

- `README.md` đã được sửa.
- Các file dự án React và tài liệu mới đang là thay đổi chưa commit.
- Không có commit hoặc push nào được thực hiện bởi AI.

Trước khi commit, nên chạy lại:

```bash
npm test
npm run build
git diff --check
git status --short
```

