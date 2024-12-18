import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        'react-dropzone-uploader' // Thêm thư viện gây lỗi vào đây
      ],
    },
    commonjsOptions: {
      ignoreTryCatch: false, // Bỏ qua một số kiểm tra
    },
  },
  esbuild: {
    exclude: /node_modules/,
  }
});
