import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Điều này cho phép truy cập từ địa chỉ IP hoặc tên miền khác ngoài localhost
    hmr: {
      host: 'baocules.me', // Địa chỉ tên miền của bạn
      protocol: 'wss', // Sử dụng wss cho WebSocket qua HTTPS
      port: 5173, // Đảm bảo rằng cổng này đang được mở trên server EC2
    }
  }
})
