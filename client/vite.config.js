/* eslint-disable no-undef */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0', // Cho phép truy cập từ các thiết bị khác
        port: 5173, // Cổng chạy ứng dụng
    },
});
