### 1.Project trang web bán đồ nội thất
- Mục tiêu là tạo trang web bán các sản phẩm nột thất (với hơn 100 sản phẩm cao cấp).

### Sử dụng các công nghệ, CSDL:
### Client
- react, redux, tailwind-CSS,...
- Sử dụng Cloudinary để lưu trữ ảnh sản phẩm , ảnh đại diện (số lượng có hạn).

### Server
- Nodejs, Express, mongoose,..., lưu trữ dữ liệu trên mongodb-Sever và postman để test api.
- Jsonwebtoken(JWT) dùng mã hóa 1 vài thông tin người dùng và xác thực, phân quyền người dùng.(thiếu phần refesh token) 
  
### Trang web có các chức năng:
- Reponsive trên nhiều thiết bị.
- Đăng nhập, đăng ký.
- Chỉnh sửa thêm tin người dùng, upload avatar, tìm kiếm sản phẩm(chưa hoàn thiện tốt).
- Lọc Sản phẩm (trong phần hiển thị với từng danh mục cụ thể) : Lọc theo màu sắc, lọc theo giá thành, sắp xếp theo giá từ thấp -> cao, từ cao -> thấp.
- Mua hàng: thêm, xóa sản phẩm giỏ hàng, yêu thích, thanh toán sản phẩm thàng công.
- CURD (quản lý địa chỉ): Read đọc dữ liệu từ cơ sở dữ liệu, Create địa chỉ mới, update địa chỉ hiện tại đang được chọn, delete địa chỉ đang được chọn.
  
### 2.Api
- Tự tạo các api:  API người dùng tạo tài khoản, thay đổi-tạo các thông tin cá nhân người dùng.
- Api lựa chọn tỉnh thành Việt Nam: tham khảo từ trang Api "https://provinces.open-api.vn/".

### 3.test
- Dùng POSTMAN để test các Api: khi api được test thành công -> đưa vào code sử dụng.
  

## ẢNH CHẠY PROJECT THÀNH CÔNG!

<p>Hình ảnh 1:</p>
<img src="./client/src/assets/screen/img1.png" alt="Hình ảnh 1" width="500"/>

<p>Hình ảnh 2:</p>
<img src="./client/src/assets/screen/img2.png" alt="Hình ảnh 1" width="500"/>
