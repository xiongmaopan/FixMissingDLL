/**
 * 🚑 紧急修复脚本 - 把未来日期的文章移回待发布队列
 * 运行: npx tsx scripts/fix-future-dates.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Guide {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  [key: string]: any;
}

function main() {
  console.log('🚑 Emergency Fix: Moving future-dated articles back to queue...\n');
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0]; // 2025-11-28
  console.log(`📅 Today is: ${todayStr}\n`);
  
  // 读取 auto-generated-guides.json
  const guidesPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
  
  if (!fs.existsSync(guidesPath)) {
    console.log('❌ auto-generated-guides.json not found!');
    return;
  }
  
  const allGuides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, 'utf-8'));
  console.log(`📚 Total guides in database: ${allGuides.length}`);
  
  // 分离：今天及之前的 vs 未来的
  const pastGuides: Guide[] = [];
  const futureGuides: Guide[] = [];
  
  for (const guide of allGuides) {
    if (guide.publishDate <= todayStr) {
      pastGuides.push(guide);
    } else {
      futureGuides.push(guide);
    }
  }
  
  console.log(`\n✅ Articles to KEEP (publishDate <= ${todayStr}): ${pastGuides.length}`);
  console.log(`📦 Articles to MOVE to queue (publishDate > ${todayStr}): ${futureGuides.length}`);
  
  if (futureGuides.length === 0) {
    console.log('\n🎉 No future-dated articles found. Nothing to fix!');
    return;
  }
  
  // 显示将被移除的文章日期范围
  const futureDates = futureGuides.map(g => g.publishDate).sort();
  console.log(`\n📅 Future dates range: ${futureDates[0]} to ${futureDates[futureDates.length - 1]}`);
  
  // 按日期统计
  const byDate = new Map<string, number>();
  for (const guide of futureGuides) {
    byDate.set(guide.publishDate, (byDate.get(guide.publishDate) || 0) + 1);
  }
  
  console.log('\n📊 Articles by date (to be moved to queue):');
  const sortedDates = Array.from(byDate.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [date, count] of sortedDates.slice(0, 10)) {
    console.log(`   ${date}: ${count} articles`);
  }
  if (sortedDates.length > 10) {
    console.log(`   ... and ${sortedDates.length - 10} more days`);
  }
  
  // 1. 更新 auto-generated-guides.json (只保留过去的)
  fs.writeFileSync(guidesPath, JSON.stringify(pastGuides, null, 2));
  console.log(`\n💾 Updated auto-generated-guides.json: ${pastGuides.length} articles`);
  
  // 2. 更新 scheduled-guides.json (添加未来的到队列)
  const scheduledPath = path.join(__dirname, '../src/data/scheduled-guides.json');
  
  // 重新按日期分组
  const scheduleByDate = new Map<string, { game: Guide[], system: Guide[] }>();
  for (const guide of futureGuides) {
    const date = guide.publishDate;
    if (!scheduleByDate.has(date)) {
      scheduleByDate.set(date, { game: [], system: [] });
    }
    // 根据 category 分类
    if (guide.category === 'Gaming') {
      scheduleByDate.get(date)!.game.push(guide);
    } else {
      scheduleByDate.get(date)!.system.push(guide);
    }
  }
  
  const sortedSchedule = Array.from(scheduleByDate.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  const scheduledData = {
    generatedAt: new Date().toISOString(),
    fixedAt: new Date().toISOString(),
    strategy: '3+2 (3 game guides + 2 system guides per day)',
    note: 'Fixed: moved future-dated articles back to queue',
    totalGuides: futureGuides.length,
    daysOfContent: scheduleByDate.size,
    publishSchedule: sortedSchedule.map(([date, guides]) => ({
      date,
      gameCount: guides.game.length,
      systemCount: guides.system.length,
      total: guides.game.length + guides.system.length,
    })),
    queue: futureGuides,
  };
  
  fs.writeFileSync(scheduledPath, JSON.stringify(scheduledData, null, 2));
  console.log(`💾 Updated scheduled-guides.json: ${futureGuides.length} articles in queue`);
  
  console.log('\n✅ Fix complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: git add . && git commit -m "fix: move future articles to queue" && git push');
  console.log('\n⏰ GitHub Actions will publish 5 articles daily at UTC 8:00 (Beijing 16:00)');
}

main();
