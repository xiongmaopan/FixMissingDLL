// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fixmissingdll.com',
  output: 'static',
  
  // Trailing slashes for better SEO
  trailingSlash: 'always',
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Compression and performance
  compressHTML: true,
  
  integrations: [
    sitemap({
      // Custom sitemap settings
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Filter out certain pages
      filter: (page) => !page.includes('/search/') && !page.includes('/404'),
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Improve build performance
      rollupOptions: {
        output: {
          // Chunk files for better caching
          manualChunks: {
            'search': ['./src/pages/search.astro'],
          },
        },
      },
    },
  },
});