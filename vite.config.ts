import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(),
    react({
      babel: {
        plugins: [
          // Support for styled-components
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
            },
          ],
          // Enable Babel macros
          'babel-plugin-macros',
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/utils/setupTests.tsx', // Optional for any setup you need
  },
});
