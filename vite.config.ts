import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'gh-pages' ? '/rock-paper-scissor/' : '/',
  plugins: [react()],
  test: {
    environment: 'node',
    coverage: { provider: 'v8', reporter: ['text', 'html'] },
  },
}));
