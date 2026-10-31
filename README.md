# Đại lý thịt bò Lam's mom

Website tiếng Việt với đồng cỏ Canvas chuyển động, đàn bò ăn cỏ, chế độ ngày/đêm, nút tạm dừng, bộ lọc sản phẩm và biểu mẫu đặt hàng minh họa. Giao diện thích ứng với điện thoại và hỗ trợ tùy chọn giảm chuyển động của hệ điều hành.

## Chạy dự án

```sh
npm ci
npm run dev -- --port 4173
```

## Build

```sh
npm run build
npm run preview
```

Vite 6 yêu cầu Node.js 18+ (khuyến nghị Node.js 22). Không cần API key hoặc cơ sở dữ liệu cho bản demo. Font Google có font hệ thống dự phòng; đồ họa Canvas/SVG được tạo trực tiếp trong mã nguồn.

## Trạng thái

- Đã kiểm tra production build và Chromium ở 1440 px / 390 px.
- Đã kiểm tra bộ lọc, hộp chọn sản phẩm, kiểm tra dữ liệu biểu mẫu, đổi ngày/đêm, tạm dừng và tràn ngang trên mobile.
- Hình ảnh và giá sản phẩm là minh họa. Biểu mẫu không gửi, lưu hoặc tạo đơn hàng thật. Cần thông tin sản phẩm, giá, liên hệ và dịch vụ nhận đơn chính thức trước khi kinh doanh.
- URL Halcyon do người dùng cung cấp trả HTTP 403 từ môi trường phát triển; thiết kế này được dựng theo yêu cầu thương hiệu và đồng cỏ, chưa được đối chiếu với mẫu gốc.
