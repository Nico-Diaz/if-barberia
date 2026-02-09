import { defineConfig } from 'astro/config';
// ANTES: import vercel from '@astrojs/vercel/server';
// AHORA: Se importa directo desde el paquete base
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server', // Esto sigue siendo vital para el Login
  adapter: vercel(),
});