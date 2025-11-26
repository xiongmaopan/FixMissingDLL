/**
 * Google 索引状态检查器
 * 检查网站在 Google 中的索引情况
 */

const SITE_URL = 'https://fixmissingdll.com';

interface IndexCheckResult {
  query: string;
  description: string;
  checkUrl: string;
}

const indexChecks: IndexCheckResult[] = [
  {
    query: `site:${SITE_URL}`,
    description: '总索引页面数',
    checkUrl: `https://www.google.com/search?q=site:${encodeURIComponent(SITE_URL)}`
  },
  {
    query: `site:${SITE_URL}/dll/`,
    description: 'DLL 页面索引数',
    checkUrl: `https://www.google.com/search?q=site:${encodeURIComponent(SITE_URL)}/dll/`
  },
  {
    query: `site:${SITE_URL}/guides/`,
    description: '指南页面索引数',
    checkUrl: `https://www.google.com/search?q=site:${encodeURIComponent(SITE_URL)}/guides/`
  },
  {
    query: `"fixmissingdll.com" msvcp140.dll`,
    description: '热门 DLL 搜索排名',
    checkUrl: `https://www.google.com/search?q=${encodeURIComponent('"fixmissingdll.com" msvcp140.dll')}`
  },
  {
    query: `"fixmissingdll.com" vcruntime140.dll`,
    description: 'vcruntime140 排名',
    checkUrl: `https://www.google.com/search?q=${encodeURIComponent('"fixmissingdll.com" vcruntime140.dll')}`
  }
];

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║        🔍 Google 索引状态检查 - FixMissingDLL.com            ║');
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log('║                                                               ║');
console.log('║  请在浏览器中打开以下链接检查索引状态：                       ║');
console.log('║                                                               ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');
console.log('');

indexChecks.forEach((check, index) => {
  console.log(`${index + 1}. ${check.description}`);
  console.log(`   查询: ${check.query}`);
  console.log(`   链接: ${check.checkUrl}`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('📋 快速检查清单：');
console.log('');
console.log('□ Google Search Console: https://search.google.com/search-console');
console.log('  - 提交站点地图: https://fixmissingdll.com/sitemap-index.xml');
console.log('  - 检查索引覆盖率');
console.log('  - 查看搜索效果报告');
console.log('');
console.log('□ Bing Webmaster Tools: https://www.bing.com/webmasters');
console.log('  - 提交站点地图');
console.log('  - 使用 URL 提交工具');
console.log('');
console.log('□ 验证 AdSense 广告显示:');
console.log('  - 访问 https://fixmissingdll.com');
console.log('  - 检查广告位是否正常加载');
console.log('  - AdSense 账户: ca-pub-1411631093585461');
console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('🚀 加速索引的方法：');
console.log('');
console.log('1. IndexNow 即时提交 (Bing/Yandex):');
console.log('   npx tsx scripts/indexnow-submit.ts');
console.log('');
console.log('2. Ping 搜索引擎:');
console.log('   npx tsx scripts/ping-search-engines.ts');
console.log('');
console.log('3. SEO 健康检查:');
console.log('   npx tsx scripts/seo-health-check.ts');
console.log('');
