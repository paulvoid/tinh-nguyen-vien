# Giới thiệu
Đây là dự án bài tập Trang web hoặc ứng dụng đăng ký và điểm danh tình nguyện viên
- Được viết bằng TypeScript và ReactJS
- Dùng framework NextJS
- Có thể sẽ dùng ElectronJS để tạo ứng dụng desktop
## Bắt đầu thôi

Đầu tiên, bạn cần cài đặt [Node.js](https://nodejs.org/en/).
Và mở cmd chạy :
```bash
npm install
```
để cài đặt các thư viện cần thiết.

Sau đó chạy:

```bash
npm run dev
# or
yarn dev
```
để khởi động server

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

## Yêu cầu bài tập
Giao diện khách:
- [ ] Đăng ký làm tình nguyện viên (sau khi đăng ký sẽ được cấp 1 mã định danh)
- [ ] Đăng nhập bằng mã định danh
- [ ] Danh sách các hoạt động sắp tổ chức/đang tổ chức/đã tổ chức

Giao diện tình nguyện viên:
- [ ] Thông tin cá nhân
- [ ] Danh sách các hoạt động đã tham gia
- [ ] Đăng ký tham gia hoạt động
- [ ] Đăng xuất

Giao diện quản trị viên:
- [ ] Thêm, sửa, xóa hoạt động
- [ ] Tra cứu thông tin tình nguyện viên
- [ ] Điểm danh tình nguyện viên bằng máy quét mã vạch khi tổ chức chương trình
- [ ] Xuất danh sách theo chương trình hoặc theo tình nguyện viên