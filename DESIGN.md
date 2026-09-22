# Design System

## Direction

Giao diện game chiến thuật đặt trong một phòng học sáng: nền trắng trung tính, bàn cờ sắc nét, điểm nhấn san hô cho hành động và xanh lam cho trạng thái phòng. Màu chỉ xuất hiện khi mang ý nghĩa: phe, đích, lượt và kết quả.

## Color

Tất cả màu được khai báo bằng OKLCH trong `src/styles.css`.

- Background: `oklch(1 0 0)`.
- Surface: `oklch(0.97 0.006 36)`.
- Ink: `oklch(0.2 0.025 35.8)`.
- Muted: `oklch(0.48 0.025 35.8)`.
- Primary coral: `oklch(0.59 0.188 35.8)`.
- Blue accent: `oklch(0.52 0.16 250)`.
- Success: `oklch(0.55 0.14 150)`.

## Typography

Một font stack hệ thống cho tốc độ và độ ổn định: `ui-sans-serif, system-ui, sans-serif`. Heading 700–800; nội dung 400–600. Không dùng display font trong điều khiển game.

## Layout

- Shell tối đa 1440 px.
- Desktop: bàn cờ là vùng chính, bảng trạng thái bên phải.
- Mobile: trạng thái tóm tắt ở trên, bàn cờ toàn chiều rộng, điều khiển bên dưới.
- Spacing theo thang 4, 8, 12, 16, 24, 32, 48 px.

## Components

- Button cao tối thiểu 44 px, focus ring 3 px.
- Card bán kính tối đa 16 px, không lồng card.
- Quân cờ là token tròn có chiều sâu nhẹ, viền phe và biểu tượng tay ở giữa; tuyệt đối không hiển thị chữ X/O trên quân.
- Ô đích có màu, nhãn và icon cờ để không phụ thuộc màu.

## Motion

Chuyển trạng thái 160–220 ms, chỉ dùng cho chọn quân, nước đi, thông báo và kết quả. Với `prefers-reduced-motion`, loại bỏ transform và animation không thiết yếu.
