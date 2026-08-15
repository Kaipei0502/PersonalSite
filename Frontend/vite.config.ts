import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 前端呼叫 /api/xxx 會自動轉發到後端
      "/api": {
        target: "http://localhost:5250",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
