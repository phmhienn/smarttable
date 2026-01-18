📊 SmartTable - Hệ thống Quản lý Dữ liệu Thông minh
SmartTable là một ứng dụng web hiện đại được thiết kế để hiển thị, quản lý và tương tác với các tập dữ liệu lớn một cách tối ưu. Dự án tập trung vào trải nghiệm người dùng (UX/UI) và khả năng xử lý dữ liệu linh hoạt thông qua các tính năng lọc, sắp xếp và phân trang.

✨ Tính năng nổi bật
Quản lý CRUD: Thêm, sửa, xóa và hiển thị dữ liệu trực quan.

Bộ lọc nâng cao: Tìm kiếm và lọc dữ liệu theo nhiều tiêu chí (n:n relationships).

Hiển thị thông minh: Sắp xếp (Sorting) và Phân trang (Pagination) mượt mà.

Giao diện Responsive: Hoạt động tốt trên cả máy tính và thiết bị di động.

Xuất dữ liệu: Hỗ trợ xuất file Excel/CSV (nếu có).

🛠 Công nghệ sử dụng
Dự án được xây dựng trên mô hình MVC với các công nghệ chính:

Backend: ASP.NET Core (C#) / Spring Boot (Java) (Chọn 1 cái phù hợp)

Database: SQL Server / MySQL (Thiết kế tối ưu cho quan hệ nhiều-nhiều)

Frontend: HTML5, CSS3, JavaScript (kết hợp các thư viện như DataTables hoặc React/Vue)

Công cụ thiết kế: StarUML (để thiết kế Class Diagram và Sequence Diagram)

🚀 Hướng dẫn cài đặt
Để chạy dự án này trên máy cục bộ, bạn hãy thực hiện các bước sau:

1. Yêu cầu hệ thống
Cài đặt Git.

Cài đặt IDE (Visual Studio, IntelliJ hoặc VS Code).

Cài đặt hệ quản trị cơ sở dữ liệu tương ứng.

2. Clone dự án
Bash

git clone https://github.com/phmhienn/smarttable.git
cd smarttable
3. Cấu hình Cơ sở dữ liệu
Mở file cấu hình (appsettings.json hoặc application.properties).

Thay đổi chuỗi kết nối (Connection String) phù hợp với máy của bạn.

Chạy lệnh cập nhật database:

Đối với .NET: Update-Database

Đối với Java: Hibernate sẽ tự động tạo table nếu được cấu hình ddl-auto: update.

4. Chạy ứng dụng
Sử dụng lệnh:

Bash

# Nếu là dự án .NET
dotnet run

# Nếu là dự án Java
./mvnw spring-boot:run
Truy cập vào trình duyệt tại địa chỉ: http://localhost:5000 (hoặc cổng tương ứng).

📂 Cấu trúc dự án
Plaintext

├── Controllers/       # Xử lý logic nghiệp vụ
├── Models/            # Định nghĩa thực thể và quan hệ database
├── Views/             # Giao diện người dùng (Razor Pages/JSP)
├── wwwroot/           # Chứa file tĩnh (CSS, JS, Images)
└── Diagrams/          # File thiết kế StarUML (Class, Sequence)
🤝 Đóng góp
Nếu bạn có ý tưởng cải thiện dự án, đừng ngần ngại:

Fork dự án.

Tạo nhánh mới (git checkout -b feature/NewFeature).

Commit thay đổi (git commit -m 'Add some NewFeature').

Push lên nhánh (git push origin feature/NewFeature).

Mở một Pull Request.

Author: Fly6K

Project Link: https://github.com/phmhienn/smarttable
