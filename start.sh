#!/bin/sh

# Chạy npm start trong nền từ thư mục server
cd server
npm start &

# Quay trở lại thư mục gốc
cd ../client

# Chạy npm run dev
npm run dev
