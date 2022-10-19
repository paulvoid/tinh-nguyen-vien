# Giới thiệu
Đây là dự án bài tập Trang web hoặc ứng dụng đăng ký và điểm danh tình nguyện viên
- Được viết bằng TypeScript và ReactJS.
- Dùng framework NextJS.
- Có thể sẽ dùng ElectronJS để tạo ứng dụng desktop.
## Bắt đầu thôi

Đầu tiên, bạn cần cài đặt [Node.js](https://nodejs.org/en/).
Và mở cmd chạy :
```bash
npm install -g yarn
yarn install
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

Sau đó cài đặt database
```bash
prisma migrate dev --name init
prisma db pull
prisma generate
```
Là đã có database sài rồi đó. À quên nhớ bật wamp hoặc sài xamp.
## Yêu cầu bài tập
Giao diện khách:
- [ ] Đăng ký làm tình nguyện viên (sau khi đăng ký sẽ được cấp 1 mã định danh)
- [ ] Đăng nhập
- [ ] Danh sách các hoạt động sắp tổ chức/đang tổ chức/đã tổ chức

Giao diện tình nguyện viên:
- [ ] Danh sách các hoạt động đã tham gia
- [ ] Đăng ký tham gia hoạt động
- [ ] Đăng xuất

Giao diện quản trị viên:
- [ ] Thêm, sửa, xóa hoạt động
- [ ] Tra cứu thông tin tình nguyện viên
- [ ] Điểm danh tình nguyện viên bằng máy quét mã vạch khi tổ chức chương trình
- [ ] Xuất danh sách theo chương trình hoặc theo tình nguyện viên

## Cấu trúc dự án
- `components` chứa các component dùng chung
  - `Landing` chứa các component dùng cho trang chủ
- `pages` chứa các trang
    - `api` chứa các API
      - `user` chứa các API liên quan đến tài khoản
      - `admin` chứa các API liên quan đến quản trị viên
      - `login.ts` API đăng nhập
      - `register.ts` API đăng ký
    - `admin` chứa các trang quản trị viên
    - `user` chứa các trang tình nguyện viên
    - `index.tsx` trang chủ
    - `login.tsx` trang đăng nhập
    - `register.tsx` trang đăng ký
- `prisma` chứa các file cấu hình database
    - `schema.prisma` chứa các bảng trong database
    - `migrations` chứa các file migration
- `public` chứa các file tĩnh
- `styles` chứa các file css

## Change log
- 2022-10-18: ReduxToolkit, Login Page, Register Page đã được thêm vào
- 2022-10-15: Tạo landing page
- 2022-10-11: Middleware cho API.
- 2022-09-27: Tạo api đăng nhập, đăng ký.
- 2022-09-26: Tạo dự án, set up NextJS, Prisma. Và tạo các component chung, thiết kế và tạo database.

