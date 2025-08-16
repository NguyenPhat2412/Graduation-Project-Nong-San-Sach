Graduation Project - Nông Sản Sạch
📌 Giới thiệu

Dự án Nông Sản Sạch là một nền tảng thương mại điện tử đơn giản được xây dựng với mục đích kết nối trực tiếp giữa nông dân – hợp tác xã – hộ sản xuất với người tiêu dùng, cửa hàng, siêu thị nhỏ lẻ.
Thông qua website này, nông sản sạch có thể được đưa đến tay người mua một cách minh bạch, an toàn, rõ nguồn gốc. Đồng thời, đây cũng là sản phẩm học tập giúp nhóm chúng em vận dụng những kiến thức đã học về:

Lập trình web (Frontend + Backend)

Thiết kế cơ sở dữ liệu (MongoDB)

Xây dựng API và xử lý logic nghiệp vụ

Phân quyền và bảo mật trong ứng dụng web

🎯 Mục tiêu của dự án

Hỗ trợ người nông dân tiếp cận thị trường dễ dàng hơn, giảm tình trạng “được mùa mất giá”.

Đáp ứng nhu cầu ngày càng cao của xã hội về thực phẩm sạch - an toàn - truy xuất nguồn gốc.

Là sản phẩm thực hành giúp sinh viên rèn kỹ năng phân tích, thiết kế và triển khai một hệ thống phần mềm hoàn chỉnh.

📂 Công nghệ sử dụng

Frontend: ReactJS + Redux Toolkit + TailwindCSS + React Router + Axios

Backend: NodeJS + ExpressJS

Database: MongoDB Atlas (Cloud)

Triển khai: Render.com

Công cụ hỗ trợ: Git, VSCode, MongoDB Compass, Figma, Postman

⚙️ Các chức năng chính
Người dùng (User)

Đăng ký, đăng nhập, chỉnh sửa thông tin cá nhân

Xem danh sách sản phẩm, chi tiết sản phẩm

Tìm kiếm, lọc sản phẩm

Quản lý giỏ hàng (thêm / xóa / chỉnh sửa số lượng)

Đặt hàng & chọn phương thức thanh toán (COD, VNPay/MoMo - sandbox)

Theo dõi trạng thái đơn hàng

Xem tin tức (Blog) và bình luận dưới mỗi bài viết

Gửi phản hồi / liên hệ trực tiếp với Admin

Quản trị viên (Admin)

Quản lý sản phẩm: thêm, sửa, xóa, ẩn/hiện sản phẩm

Quản lý đơn hàng: cập nhật trạng thái, hủy, xem chi tiết

Quản lý người dùng (phân quyền, khóa tài khoản)

Quản lý Blog (thêm/sửa/xóa bài viết, ẩn/hiện blog)

Thống kê doanh thu, số lượng đơn hàng, số lượng user đăng ký

Quản lý phản hồi từ người dùng thông qua hệ thống tin nhắn

🗄️ Thiết kế cơ sở dữ liệu

Hệ thống sử dụng MongoDB với các Collections chính:

STT	Collection	Mô tả
1	Users	Thông tin người dùng & admin
2	Products	Dữ liệu sản phẩm nông sản
3	Orders	Đơn hàng (bao gồm chi tiết sản phẩm)
4	Blogs	Tin tức, bài viết blog
5	Categories	Danh mục sản phẩm
6	Contact	Phản hồi liên hệ từ người dùng
7	Comment	Bình luận dưới mỗi bài Blog
🚀 Hướng dẫn cài đặt
1. Cài đặt Database (MongoDB Atlas)

Truy cập: https://www.mongodb.com/cloud/atlas

Tạo Cluster -> Database -> User + Password

Copy connection string:

mongodb+srv://<username>:<password>@cluster0.mongodb.net/nongsansach

Thêm vào file .env:

MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/nongsansach

2. Cài đặt Backend
git clone https://github.com/NguyenPhat2412/Graduation-Project-Nong-San-Sach.git
cd ServerWebNongSan
npm install
npm start

3. Cài đặt Frontend
git clone https://github.com/NguyenPhat2412/Graduation-Project-Nong-San-Sach.git
cd ShopNongSan
npm install
npm run dev

4. Truy cập ứng dụng

Frontend: http://localhost:5173/

Backend: http://localhost:5000/

5. Link triển khai trực tiếp

Website cho User: https://shop-nong-san-sach.onrender.com/

Admin Dashboard: https://graduation-project-nong-san-sach.onrender.com/

Server API: https://server-web-nong-san-sach.onrender.com/

✅ Kết quả đạt được

Xây dựng thành công website thương mại điện tử Nông Sản Sạch.

Hoàn thiện đầy đủ các chức năng cơ bản: đăng ký, đăng nhập, giỏ hàng, đặt hàng, theo dõi đơn hàng, quản trị sản phẩm, blog, thống kê.

Giao diện thân thiện, responsive trên nhiều thiết bị.

Dữ liệu được quản lý trên MongoDB Atlas, dễ mở rộng và bảo trì.

Có hệ thống phân quyền rõ ràng: User / Admin.

⚠️ Hạn chế hiện tại

Thanh toán online (VNPay, MoMo) mới chỉ ở mức sandbox, chưa tích hợp thực tế.

Chưa tối ưu UX/UI cho mobile.

Thiếu hệ thống email/SMS notification thực tế (mới chỉ log/toast).

Chưa tích hợp API vận chuyển (GHN, GHTK).

Bộ lọc sản phẩm còn đơn giản, chưa hỗ trợ nâng cao.

🔮 Hướng phát triển

Tích hợp thanh toán trực tuyến thực tế (VNPay, MoMo, ZaloPay).

Phát triển ứng dụng di động bằng React Native / Flutter.

Tích hợp API giao vận: GHN, GHTK.

Ứng dụng AI/ML để gợi ý sản phẩm theo hành vi người dùng.

Xây dựng hệ thống quản lý kho & chuỗi cung ứng.

Nâng cấp hệ thống báo cáo, thống kê (xuất PDF/Excel).

Cải thiện bảo mật: OAuth2, Google Auth, chống XSS, CSRF.

👨‍🎓 Lời kết

Đây là sản phẩm của một sinh viên năm 2, vừa là bài tập thực hành lớn vừa là nền tảng thực tế có thể mở rộng.
Trong quá trình làm, mình đã học được rất nhiều về tổ chức dự án, quản lý code, triển khai backend/frontend và làm việc với database.

Mong nhận được sự góp ý từ thầy cô và các bạn để dự án ngày càng hoàn thiện hơn!
