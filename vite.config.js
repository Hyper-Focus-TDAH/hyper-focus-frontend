import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as process from 'process';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 8081, // Set your desired port number here
  },
});
