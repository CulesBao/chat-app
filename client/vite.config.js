import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // Cổng mà Vite sẽ lắng nghe
    host: '0.0.0.0',   // Cho phép truy cập từ mọi địa chỉ IP
    strictPort: true   // Kích hoạt để đảm bảo rằng cổng không bị thay đổi nếu đã được sử dụng
  }
})
