# 🍽️ SmartTable AI – Restaurant Booking System

SmartTable AI là một ứng dụng **đặt bàn nhà hàng thông minh** được xây dựng bằng **React + TypeScript**, cho phép người dùng đặt bàn nhanh chóng, theo dõi lịch sử đặt bàn và sử dụng **AI Prediction** để hỗ trợ gợi ý, dự đoán tình trạng bàn trống, giúp nâng cao trải nghiệm khách hàng và hiệu quả quản lý nhà hàng.

---

## 🚀 Tính năng

- Đăng ký / Đăng nhập người dùng
- Đặt bàn nhà hàng
- Xem lịch sử đặt bàn
- AI Prediction hỗ trợ gợi ý & dự đoán
- Giao diện hiện đại, dễ sử dụng
- Hiệu năng cao với Vite

---

## 🛠️ Công nghệ sử dụng

- React
- TypeScript
- Vite
- HTML / CSS
- Node.js

---

## 📁 Cấu trúc thư mục
```text
smarttable-ai---restaurant-booking/
│
├── components/
│ ├── BookingForm.tsx
│ ├── BookingHistory.tsx
│ ├── AIPrediction.tsx
│ ├── Login.tsx
│ ├── Register.tsx
│ └── ...
│
├── App.tsx
├── index.tsx
├── index.html
├── constants.ts
├── .env.local
├── package.json
└── README.md
```
## ⚙️ Yêu cầu hệ thống

- Node.js >= 16
- npm hoặc yarn

Kiểm tra:

```bash
node -v
npm -v
```

## 📦 Cài đặt & chạy dự án

Bước 1: Clone hoặc giải nén source code

git clone [<repository-url>](https://github.com/phmhienn/smarttable)
cd smarttable

Bước 2: Cài đặt các thư viện cần thiết

npm install

Bước 3: Cấu hình biến môi trường (nếu có)

Mở file .env.local:
VITE_API_URL=your_api_url_here

Bước 4: Chạy ứng dụng

npm run dev

## 📌 Ghi chú
- Project hiện tại chủ yếu là frontend, có thể chạy với dữ liệu mock.

- AI Prediction mang tính mô phỏng, có thể mở rộng bằng:

- Backend Node.js / Spring Boot

- Python / FastAPI

- OpenAI API

## 🌱 Hướng phát triển
- Kết nối backend hoàn chỉnh

- Dashboard cho quản lý nhà hàng

- Tối ưu giao diện mobile

- AI dự đoán theo thời gian thực

- Tích hợp thanh toán online
