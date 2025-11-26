/**
 * 自动 Ping 搜索引擎，通知站点地图更新
 * 运行: npx tsx scripts/ping-search-engines.ts
 */

const SITE_URL = 'https://fixmissingdll.com';
const SITEMAPS = [
  `${SITE_URL}/sitemap-index.xml`,
  `${SITE_URL}/sitemap-0.xml`,
];

interface PingResult {
  engine: string;
  url: string;
  success: boolean;
  status?: number;
  error?: string;
}

async function pingSearchEngine(engine: string, pingUrl: string): Promise<PingResult> {
  try {
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'FixMissingDLL-Bot/1.0',
      },
    });
    
    return {
      engine,
      url: pingUrl,
      success: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      engine,
      url: pingUrl,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function pingAllSearchEngines(): Promise<void> {
  console.log('🔔 Pinging search engines with sitemap updates...\n');
  
  const results: PingResult[] = [];
  
  for (const sitemap of SITEMAPS) {
    const encodedSitemap = encodeURIComponent(sitemap);
    
    // Google (使用 IndexNow 替代已弃用的 ping)
    // Google 现在推荐使用 Search Console API 或 IndexNow
    
    // Bing (支持直接 ping)
    results.push(await pingSearchEngine(
      'Bing',
      `https://www.bing.com/ping?sitemap=${encodedSitemap}`
    ));
    
    // IndexNow (Bing, Yandex, Seznam 等支持)
    // 注意: IndexNow 需要 API key，这里使用简单 ping
    
    // Yandex
    results.push(await pingSearchEngine(
      'Yandex',
      `https://webmaster.yandex.com/ping?sitemap=${encodedSitemap}`
    ));
  }
  
  // 打印结果
  console.log('📊 Ping Results:\n');
  console.log('| Engine | Status | URL |');
  console.log('|--------|--------|-----|');
  
  for (const result of results) {
    const status = result.success ? `✅ ${result.status}` : `❌ ${result.error}`;
    console.log(`| ${result.engine} | ${status} | ${result.url.substring(0, 50)}... |`);
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n✨ Successfully pinged ${successCount}/${results.length} endpoints`);
  
  // 输出手动操作提示
  console.log('\n📝 Manual Actions Required:');
  console.log('1. Google Search Console: https://search.google.com/search-console');
  console.log('   - Submit sitemap: ' + SITEMAPS[0]);
  console.log('   - Request indexing for key pages');
  console.log('');
  console.log('2. Bing Webmaster Tools: https://www.bing.com/webmasters');
  console.log('   - Submit sitemap: ' + SITEMAPS[0]);
  console.log('   - Configure IndexNow for automatic updates');
}

// 运行
pingAllSearchEngines().catch(console.error);
