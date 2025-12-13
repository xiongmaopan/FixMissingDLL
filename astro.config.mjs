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
    // 内联小于 4KB 的样式表以减少请求
    inlineStylesheets: 'auto',
    // 拆分 CSS 以优化缓存
    assets: '_astro',
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
      // 启用 CSS 代码拆分
      cssCodeSplit: true,
      // 使用 esbuild 压缩（更快）
      minify: 'esbuild',
      // 优化块大小
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // 更好的缓存策略
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
        },
      },
    },
    // CSS 优化
    css: {
      devSourcemap: false,
    },
  },
});