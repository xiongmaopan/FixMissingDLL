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
    // 内联小于 10KB 的样式表以减少请求 (移动端优化)
    inlineStylesheets: 'auto',
    // 资源目录
    assets: '_astro',
  },
  
  // Compression and performance
  compressHTML: true,
  
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
      // CSS 压缩目标
      cssMinify: 'esbuild',
      // 优化块大小
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // 更好的缓存策略
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
          // 手动分块 - 分离第三方库
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    // CSS 优化
    css: {
      devSourcemap: false,
    },
    // 优化依赖预构建
    optimizeDeps: {
      exclude: [],
    },
  },
});