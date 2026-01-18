# 🍽️ SmartTable AI – Restaurant Booking System

SmartTable AI là một **website đặt bàn nhà hàng thông minh**, được xây dựng theo kiến trúc **fullstack hiện đại**.  
Hệ thống cho phép khách hàng đặt bàn trực tuyến, xem trước bàn ăn, đăng ký tài khoản, đặt cọc thanh toán và hỗ trợ **AI dự báo lượng khách theo thời gian** nhằm tối ưu hoạt động vận hành của nhà hàng.

Dự án phù hợp cho:
- Đồ án Web / Công nghệ phần mềm
- Học tập React, Fullstack, Serverless
- Demo MVP sản phẩm thực tế

---

## 🚀 Tính năng chính

### 👤 Dành cho khách hàng
- Xem danh sách và hình ảnh bàn ăn
- Xem chi tiết bàn (vị trí, số ghế, mức cọc)
- Đăng ký / đăng nhập tài khoản
- Đặt bàn theo ngày & khung giờ
- Thanh toán đặt cọc
- Nhận thông báo xác nhận

### 🧑‍💼 Dành cho quản lý (Admin)
- Quản lý bàn ăn và lịch đặt bàn
- Theo dõi trạng thái thanh toán
- Xem **AI dự báo lượng khách theo giờ / ngày**
- Hỗ trợ quyết định nhân sự & vận hành

---

## 🧩 Công nghệ sử dụng

- **Frontend:** React, TypeScript, Vite  
- **UI & Styling:** Tailwind CSS, shadcn/ui  
- **Routing:** React Router DOM  
- **Data Fetching:** TanStack React Query  
- **Backend:** Node.js  
- **API:** Netlify Functions (Serverless)  
- **Kiến trúc:** Monorepo (client / server / shared)  
- **Deploy:** Netlify  
- **AI (định hướng):** Machine Learning / Time Series

---

## 📁 Cấu trúc thư mục

```text
smarttable-ai/
│
├─ client/                 # Frontend (React + Vite)
│  ├─ src/
│  ├─ index.html
│  └─ vite.config.ts
│
├─ server/                 # Backend (Node.js)
├─ netlify/functions/      # Serverless API
├─ shared/                 # Code dùng chung
│
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ netlify.toml
└─ package.json
