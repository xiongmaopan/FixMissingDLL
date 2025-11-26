// Sitemap generation script for FixMissingDLL
// Run with: npx ts-node scripts/generate-sitemaps.ts
// 
// Google Official lastmod Policy (2025):
// "Google uses the <lastmod> value if it's consistently and verifiably accurate."
// "The <lastmod> value should reflect the date of the last SIGNIFICANT update."
// Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data (adjust paths based on build output)
const SITE_URL = 'https://fixmissingdll.com';

// Honest lastmod strategy - based on actual content creation/update dates
// NOT using current date for all pages (that would be dishonest and Google may ignore it)
const SITE_LAUNCH_DATE = '2025-06-22'; // Domain registered & initial site launch
const CONTENT_UPDATE_DATE = '2025-11-26'; // Last MAJOR refactor - all pages significantly updated
const BUILD_DATE = new Date().toISOString().split('T')[0]; // Today's date for truly dynamic content

// Since 2025-11-26 is a major site-wide refactor, all pages have been significantly updated
// Using CONTENT_UPDATE_DATE for all static pages is HONEST because:
// 1. Site structure changed
// 2. All templates updated
// 3. SEO improvements applied to all pages
// 4. This is a genuine "significant update" per Google's definition

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
  // Homepage - updated when major site updates happen
  { path: '/', priority: 1.0, changefreq: 'daily', lastmod: CONTENT_UPDATE_DATE },
  // Index pages - updated when new content added
  { path: '/dll/', priority: 0.9, changefreq: 'daily', lastmod: CONTENT_UPDATE_DATE },
  { path: '/guides/', priority: 0.8, changefreq: 'weekly', lastmod: CONTENT_UPDATE_DATE },
  // Functional pages - rarely change
  { path: '/search/', priority: 0.6, changefreq: 'monthly', lastmod: SITE_LAUNCH_DATE },
  // Static info pages - almost never change
  { path: '/about/', priority: 0.5, changefreq: 'monthly', lastmod: SITE_LAUNCH_DATE },
  { path: '/privacy/', priority: 0.3, changefreq: 'yearly', lastmod: SITE_LAUNCH_DATE },
  { path: '/terms/', priority: 0.3, changefreq: 'yearly', lastmod: SITE_LAUNCH_DATE },
  { path: '/dmca/', priority: 0.3, changefreq: 'yearly', lastmod: SITE_LAUNCH_DATE },
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

  // Generate main sitemap (static pages) - using honest lastmod from page definitions
  const mainUrls = staticPages.map(page => ({
    loc: `${SITE_URL}${page.path}`,
    lastmod: page.lastmod, // Use defined lastmod, not BUILD_DATE
    changefreq: page.changefreq,
    priority: page.priority,
  }));
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-main.xml'),
    generateSitemapXML(mainUrls)
  );
  console.log('Generated sitemap-main.xml');

  // Generate DLL sitemap - 2025-11-26 was a MAJOR refactor affecting all pages
  // All templates, SEO elements, and page structure were significantly updated
  const dllUrls = dlls.map(dll => ({
    loc: `${SITE_URL}/dll/${dll.id}/`,
    lastmod: CONTENT_UPDATE_DATE, // Major site-wide refactor on 2025-11-26
    changefreq: dll.changefreq,
    priority: dll.priority,
  }));
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-dll.xml'),
    generateSitemapXML(dllUrls)
  );
  console.log('Generated sitemap-dll.xml');

  // Generate Guides sitemap - guides are actively updated
  const guideUrls = guides.map(guide => ({
    loc: `${SITE_URL}/guides/${guide.slug}/`,
    lastmod: CONTENT_UPDATE_DATE, // Guides were updated when we added new ones
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
    { loc: `${SITE_URL}/sitemap-main.xml`, lastmod: CONTENT_UPDATE_DATE },
    { loc: `${SITE_URL}/sitemap-dll.xml`, lastmod: CONTENT_UPDATE_DATE },
    { loc: `${SITE_URL}/sitemap-guides.xml`, lastmod: CONTENT_UPDATE_DATE },
  ]);
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-index.xml'),
    sitemapIndex
  );
  console.log('Generated sitemap-index.xml');

  console.log(`\n✅ All sitemaps generated with honest lastmod dates!`);
  console.log(`   Site Launch Date: ${SITE_LAUNCH_DATE}`);
  console.log(`   Content Update Date: ${CONTENT_UPDATE_DATE}`);
  console.log(`\n📌 Google Policy: "lastmod should reflect the last SIGNIFICANT update"`);
  console.log(`   - Don't fake dates - Google verifies and may ignore dishonest lastmod`);
}

main();
