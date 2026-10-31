# Lam's mom — Website đại lý thịt bò

Website demo React/Vite với thiết kế cinematic lấy cảm hứng từ website cao cấp. Không sao chép mã nguồn premium của GetLayers Halcyon.

## Chạy trên GitHub Codespaces

```bash
npm install
npm run dev
```

Mở tab **Ports**, chọn cổng **5173**, rồi **Open in Browser**. Kiểm tra production bằng `npm run build`.

## Chức năng hiện có

- Trang chủ và giao diện responsive.
- Danh mục thịt bò minh họa, bộ lọc sản phẩm, lưu yêu thích và giỏ sản phẩm quan tâm.
- Nhóm khách hàng B2B: nhà hàng, trường học/bếp ăn, khách sạn/sự kiện và đại lý.
- Form yêu cầu tư vấn **chỉ là demo**: chưa gửi hay lưu dữ liệu; chưa có chức năng thanh toán.
- Hình ảnh minh họa, chưa xác nhận giá, nguồn gốc, tồn kho hoặc tiêu chuẩn chất lượng cụ thể.

## Tham khảo

- Graphify: https://github.com/Graphify-Labs/graphify — lập bản đồ cấu trúc code. Có thể cài trong Codespaces bằng `uv tool install graphifyy` và `graphify install --project`; hiện chưa cài chạy trong Codespaces.
- Awesome Opus 5.5 Videos: https://github.com/yihui-dev/awesome-opus5-5-videos — tham khảo kỹ thuật animation CSS, SVG, GSAP và Three.js.
- Halcyon: https://www.getlayers.ai/layer/halcyon — cảm hứng phong cách cinematic; không sao chép mã nguồn giao diện trả phí.

## Trước khi triển khai thực tế

Bổ sung ảnh và thông tin sản phẩm có xác minh, thông tin liên hệ và chính sách, kết nối backend an toàn cho báo giá/đơn hàng/hợp đồng, đồng thời kiểm thử và xác minh yêu cầu về an toàn thực phẩm và quyền riêng tư.
