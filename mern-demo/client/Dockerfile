# Khai báo Node.js Image làm Base Image
FROM node:20-alpine
# : Thiết lập thư mục làm việc bên trong Container
WORKDIR /app
#  Sao chép package.json và package-lock.json vào Container
COPY package*.json ./
#  Cài đặt các package của React Application
RUN npm install
# Sao chép toàn bộ source code React vào Container
COPY . .
# Build React Application trong quá trình xây dựng Image
RUN npm run build
# Thêm cấu hình chạy Frontend trên port 3000:
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]