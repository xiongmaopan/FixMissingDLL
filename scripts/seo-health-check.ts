/**
 * SEO 健康检查脚本
 * 检查网站的 SEO 状态和配置
 * 运行: npx tsx scripts/seo-health-check.ts
 */

const SITE_URL = 'https://fixmissingdll.com';

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

const results: CheckResult[] = [];

async function checkUrl(url: string): Promise<{ ok: boolean; status: number; headers: Headers }> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'SEO-Health-Check/1.0' },
    });
    return { ok: response.ok, status: response.status, headers: response.headers };
  } catch {
    return { ok: false, status: 0, headers: new Headers() };
  }
}

async function runChecks(): Promise<void> {
  console.log('🔍 SEO Health Check for fixmissingdll.com\n');
  console.log('='.repeat(50) + '\n');

  // 1. 检查首页
  console.log('📄 Checking homepage...');
  const homepage = await checkUrl(SITE_URL);
  results.push({
    name: 'Homepage Accessible',
    status: homepage.ok ? 'pass' : 'fail',
    message: homepage.ok ? `Status ${homepage.status}` : 'Homepage not accessible',
  });

  // 2. 检查 robots.txt
  console.log('🤖 Checking robots.txt...');
  const robots = await checkUrl(`${SITE_URL}/robots.txt`);
  results.push({
    name: 'robots.txt',
    status: robots.ok ? 'pass' : 'warn',
    message: robots.ok ? 'Present and accessible' : 'Missing or not accessible',
  });

  // 3. 检查 sitemap
  console.log('🗺️  Checking sitemap...');
  const sitemap = await checkUrl(`${SITE_URL}/sitemap-index.xml`);
  results.push({
    name: 'Sitemap Index',
    status: sitemap.ok ? 'pass' : 'fail',
    message: sitemap.ok ? 'Present and accessible' : 'Missing sitemap-index.xml',
  });

  // 4. 检查 IndexNow key
  console.log('🔑 Checking IndexNow key...');
  const indexNowKey = await checkUrl(`${SITE_URL}/f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2.txt`);
  results.push({
    name: 'IndexNow Key',
    status: indexNowKey.ok ? 'pass' : 'warn',
    message: indexNowKey.ok ? 'Key file present' : 'IndexNow key file missing',
  });

  // 5. 检查核心页面
  const corePages = [
    '/dll/',
    '/guides/',
    '/dll/msvcp140.dll',
    '/dll/vcruntime140.dll',
    '/guides/visual-cpp-redistributable',
  ];

  console.log('📑 Checking core pages...');
  for (const page of corePages) {
    const result = await checkUrl(`${SITE_URL}${page}`);
    results.push({
      name: `Page: ${page}`,
      status: result.ok ? 'pass' : 'fail',
      message: result.ok ? `Status ${result.status}` : `Failed (${result.status})`,
    });
  }

  // 6. 检查 HTTPS
  console.log('🔒 Checking HTTPS...');
  results.push({
    name: 'HTTPS Enabled',
    status: SITE_URL.startsWith('https') ? 'pass' : 'fail',
    message: SITE_URL.startsWith('https') ? 'Site uses HTTPS' : 'Site should use HTTPS',
  });

  // 打印结果
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 SEO Health Check Results:\n');

  const icons = { pass: '✅', warn: '⚠️', fail: '❌' };
  
  for (const result of results) {
    console.log(`${icons[result.status]} ${result.name}: ${result.message}`);
  }

  // 统计
  const passCount = results.filter(r => r.status === 'pass').length;
  const warnCount = results.filter(r => r.status === 'warn').length;
  const failCount = results.filter(r => r.status === 'fail').length;

  console.log('\n' + '='.repeat(50));
  console.log(`\n📈 Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed`);
  
  // 健康评分
  const score = Math.round((passCount / results.length) * 100);
  console.log(`\n🏆 SEO Health Score: ${score}%`);

  // 建议
  console.log('\n💡 Recommendations:');
  if (failCount > 0) {
    console.log('   - Fix failed checks immediately');
  }
  console.log('   - Submit sitemap to Google Search Console');
  console.log('   - Submit sitemap to Bing Webmaster Tools');
  console.log('   - Set up Google Analytics / Tag Manager');
  console.log('   - Monitor Core Web Vitals in Search Console');
  console.log('   - Build quality backlinks');
}

runChecks().catch(console.error);
