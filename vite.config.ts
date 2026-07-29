import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({isSsrBuild}) => ({
  plugins: [tailwindcss(), hydrogen(), reactRouter()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
    tsconfigPaths: true,
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
  },
  ssr: {
    optimizeDeps: {
      include: [
        'react-router > set-cookie-parser',
        'react-router > cookie',
        'react-router',
      ],
    },
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev', '.vercel.app'],
  },
}));
