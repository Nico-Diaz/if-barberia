import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/server'; // <--- Importante: 'server'

export default defineConfig({
  output: 'server', // <--- ESTO ES VITAL para que funcione el Login
  adapter: vercel(),
});