# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56: Build React Application trong quá trình xây dựng Image
RUN npm run build

# Câu 57: Kết quả build sẽ nằm trong thư mục dist/
# Thêm cấu hình chạy Frontend trên port 3000:
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]