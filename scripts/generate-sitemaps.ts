// Sitemap generation script for FixMissingDLL
// Run with: npx ts-node scripts/generate-sitemaps.ts

import * as fs from 'fs';
import * as path from 'path';

// Import data (adjust paths based on build output)
const SITE_URL = 'https://fixmissingdll.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

// DLL data - simplified version for sitemap generation
// In production, this would import from the actual database
const dlls = [
  // Visual C++ Runtime
  { id: 'vcruntime140', priority: 0.9, changefreq: 'monthly' },
  { id: 'vcruntime140_1', priority: 0.8, changefreq: 'monthly' },
  { id: 'msvcp140', priority: 0.9, changefreq: 'monthly' },
  { id: 'msvcp140_1', priority: 0.8, changefreq: 'monthly' },
  { id: 'msvcp120', priority: 0.8, changefreq: 'monthly' },
  { id: 'msvcr120', priority: 0.8, changefreq: 'monthly' },
  { id: 'msvcp110', priority: 0.7, changefreq: 'monthly' },
  { id: 'msvcr110', priority: 0.7, changefreq: 'monthly' },
  { id: 'msvcp100', priority: 0.7, changefreq: 'monthly' },
  { id: 'msvcr100', priority: 0.7, changefreq: 'monthly' },
  { id: 'vcomp140', priority: 0.6, changefreq: 'monthly' },
  { id: 'concrt140', priority: 0.6, changefreq: 'monthly' },
  { id: 'ucrtbase', priority: 0.7, changefreq: 'monthly' },
  // DirectX
  { id: 'd3dx9_43', priority: 0.9, changefreq: 'monthly' },
  { id: 'd3dx9_42', priority: 0.7, changefreq: 'monthly' },
  { id: 'd3dx9_41', priority: 0.7, changefreq: 'monthly' },
  { id: 'd3dx10_43', priority: 0.7, changefreq: 'monthly' },
  { id: 'd3dx11_43', priority: 0.7, changefreq: 'monthly' },
  { id: 'd3dcompiler_43', priority: 0.7, changefreq: 'monthly' },
  { id: 'd3dcompiler_47', priority: 0.7, changefreq: 'monthly' },
  { id: 'xinput1_3', priority: 0.8, changefreq: 'monthly' },
  { id: 'xinput1_4', priority: 0.7, changefreq: 'monthly' },
  { id: 'xinput9_1_0', priority: 0.6, changefreq: 'monthly' },
  { id: 'x3daudio1_7', priority: 0.6, changefreq: 'monthly' },
  { id: 'xaudio2_7', priority: 0.6, changefreq: 'monthly' },
  // System
  { id: 'kernel32', priority: 0.7, changefreq: 'monthly' },
  { id: 'ntdll', priority: 0.7, changefreq: 'monthly' },
  { id: 'user32', priority: 0.6, changefreq: 'monthly' },
  { id: 'advapi32', priority: 0.6, changefreq: 'monthly' },
  { id: 'ole32', priority: 0.6, changefreq: 'monthly' },
  // Gaming
  { id: 'steam_api64', priority: 0.8, changefreq: 'weekly' },
  { id: 'steam_api', priority: 0.7, changefreq: 'weekly' },
  { id: 'openal32', priority: 0.7, changefreq: 'monthly' },
  { id: 'physxloader', priority: 0.6, changefreq: 'monthly' },
  // .NET
  { id: 'clr', priority: 0.6, changefreq: 'monthly' },
  { id: 'mscorlib', priority: 0.6, changefreq: 'monthly' },
];

const guides = [
  { slug: '0xc000007b-error-fix', priority: 0.9, changefreq: 'weekly' },
  { slug: 'directx-install-guide', priority: 0.8, changefreq: 'monthly' },
  { slug: 'visual-cpp-redistributable-guide', priority: 0.8, changefreq: 'monthly' },
  { slug: 'event-id-1000-fix', priority: 0.7, changefreq: 'monthly' },
  { slug: 'dll-download-safety-guide', priority: 0.7, changefreq: 'monthly' },
  { slug: 'steam-api-dll-fix', priority: 0.8, changefreq: 'weekly' },
];

const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/dll/', priority: 0.9, changefreq: 'daily' },
  { path: '/guides/', priority: 0.8, changefreq: 'weekly' },
  { path: '/search/', priority: 0.6, changefreq: 'monthly' },
  { path: '/about/', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy/', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms/', priority: 0.3, changefreq: 'yearly' },
  { path: '/dmca/', priority: 0.3, changefreq: 'yearly' },
];

function generateSitemapXML(urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }>): string {
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

function generateSitemapIndex(sitemaps: Array<{ loc: string; lastmod: string }>): string {
  const sitemapElements = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

function main() {
  const outputDir = path.join(__dirname, '..', 'public');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate main sitemap (static pages)
  const mainUrls = staticPages.map(page => ({
    loc: `${SITE_URL}${page.path}`,
    lastmod: BUILD_DATE,
    changefreq: page.changefreq,
    priority: page.priority,
  }));
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-main.xml'),
    generateSitemapXML(mainUrls)
  );
  console.log('Generated sitemap-main.xml');

  // Generate DLL sitemap
  const dllUrls = dlls.map(dll => ({
    loc: `${SITE_URL}/dll/${dll.id}/`,
    lastmod: BUILD_DATE,
    changefreq: dll.changefreq,
    priority: dll.priority,
  }));
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-dll.xml'),
    generateSitemapXML(dllUrls)
  );
  console.log('Generated sitemap-dll.xml');

  // Generate Guides sitemap
  const guideUrls = guides.map(guide => ({
    loc: `${SITE_URL}/guides/${guide.slug}/`,
    lastmod: BUILD_DATE,
    changefreq: guide.changefreq,
    priority: guide.priority,
  }));
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-guides.xml'),
    generateSitemapXML(guideUrls)
  );
  console.log('Generated sitemap-guides.xml');

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex([
    { loc: `${SITE_URL}/sitemap-main.xml`, lastmod: BUILD_DATE },
    { loc: `${SITE_URL}/sitemap-dll.xml`, lastmod: BUILD_DATE },
    { loc: `${SITE_URL}/sitemap-guides.xml`, lastmod: BUILD_DATE },
  ]);
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-index.xml'),
    sitemapIndex
  );
  console.log('Generated sitemap-index.xml');

  console.log(`\nAll sitemaps generated successfully! (${BUILD_DATE})`);
}

main();
