import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  
  // Add this server configuration block
  server: {
    proxy: {
      // Jab bhi URL mein '/api' hoga
      '/api': {
        // Usko is address par bhej do
        target: 'http://localhost:5000',
        // Origin ko change karo taaki CORS error na aaye
        changeOrigin: true,
      },
    },
  },
})

