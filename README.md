# OTT Lab — Kéo Búa Bao

Ứng dụng React gồm hai bài tập:

1. **Kéo Búa Bao cổ điển** — người chơi đấu với máy, ai đạt 5 điểm trước sẽ thắng.
2. **OTTv2** — hai người chơi trong phòng riêng, điều khiển 9 quân trên bàn cờ 9×9 và đồng bộ bằng `playhtml`.

## Chạy local

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra terminal. Bài 2 cần hai tab hoặc hai trình duyệt mở cùng link phòng dạng:

```text
http://localhost:5173/?exercise=ottv2#ABCD
```

## Kiểm thử và build

```bash
npm test
npm run build
```

## Luật OTTv2

- Mỗi phe có 9 quân: 3 Búa, 3 Bao, 3 Kéo.
- Mỗi lượt đi một ô theo 8 hướng như quân vua trong cờ vua.
- Búa ăn Kéo, Kéo ăn Bao, Bao ăn Búa; cùng loại chặn nhau.
- Thắng khi loại toàn bộ quân đối phương hoặc chiếm đích đối diện (`a1`/`i9`).

Chi tiết kỹ thuật, phân công và tiêu chí test nằm trong [REQUIREMENTS.md](./REQUIREMENTS.md).

## Deploy

Link deploy: https://sock1000kg.github.io/rock-paper-scissor/
