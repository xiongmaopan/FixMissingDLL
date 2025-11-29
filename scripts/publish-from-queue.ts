/**
 * 从预定队列发布内容脚本
 * 
 * 这个脚本从 scheduled-guides.json 的 queue 中取出今天日期的文章，
 * 并将它们移动到 auto-generated-guides.json
 * 
 * 运行: npx tsx scripts/publish-from-queue.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文件路径
const SCHEDULED_PATH = path.join(__dirname, '../src/data/scheduled-guides.json');
const PUBLISHED_PATH = path.join(__dirname, '../src/data/auto-generated-guides.json');

interface Guide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishDate: string;
  updateDate: string;
  author: string;
  keywords: string[];
  searchVolume?: string;
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedDlls: string[];
}

interface ScheduledData {
  generatedAt: string;
  fixedAt?: string;
  strategy: string;
  note?: string;
  totalGuides: number;
  daysOfContent: number;
  publishSchedule: { date: string; gameCount: number; systemCount: number; total: number }[];
  queue: Guide[];
}

function getToday(): string {
  const now = new Date();
  // 使用北京时间（UTC+8）
  const beijingOffset = 8 * 60 * 60 * 1000;
  const beijingTime = new Date(now.getTime() + beijingOffset);
  return beijingTime.toISOString().split('T')[0];
}

function loadScheduledData(): ScheduledData {
  const content = fs.readFileSync(SCHEDULED_PATH, 'utf-8');
  return JSON.parse(content);
}

function loadPublishedGuides(): Guide[] {
  if (!fs.existsSync(PUBLISHED_PATH)) {
    return [];
  }
  const content = fs.readFileSync(PUBLISHED_PATH, 'utf-8');
  return JSON.parse(content);
}

function saveScheduledData(data: ScheduledData): void {
  fs.writeFileSync(SCHEDULED_PATH, JSON.stringify(data, null, 2));
}

function savePublishedGuides(guides: Guide[]): void {
  fs.writeFileSync(PUBLISHED_PATH, JSON.stringify(guides, null, 2));
}

function publishTodaysContent(): void {
  const today = getToday();
  console.log(`🗓️  Today's date (Beijing time): ${today}`);
  console.log('');

  // 加载数据
  const scheduledData = loadScheduledData();
  const publishedGuides = loadPublishedGuides();

  console.log(`📚 Queue size: ${scheduledData.queue.length} guides`);
  console.log(`📖 Already published: ${publishedGuides.length} guides`);
  console.log('');

  // 找到今天和之前日期应该发布的文章
  const toPublish: Guide[] = [];
  const remaining: Guide[] = [];

  for (const guide of scheduledData.queue) {
    if (guide.publishDate <= today) {
      // 检查是否已经发布
      const alreadyPublished = publishedGuides.some(p => p.id === guide.id);
      if (!alreadyPublished) {
        toPublish.push(guide);
      } else {
        console.log(`⏭️  Skipping already published: ${guide.title}`);
      }
    } else {
      remaining.push(guide);
    }
  }

  if (toPublish.length === 0) {
    console.log('ℹ️  No new content to publish for today.');
    console.log(`📅 Next scheduled: ${remaining.length > 0 ? remaining[0].publishDate : 'No more scheduled content'}`);
    return;
  }

  // 发布内容
  console.log(`🚀 Publishing ${toPublish.length} guides:`);
  for (const guide of toPublish) {
    console.log(`   ✅ ${guide.title}`);
    console.log(`      Date: ${guide.publishDate}, Category: ${guide.category}`);
  }
  console.log('');

  // 更新已发布列表
  const updatedPublished = [...publishedGuides, ...toPublish];
  savePublishedGuides(updatedPublished);

  // 更新队列（只保留未来日期的内容）
  scheduledData.queue = remaining;
  scheduledData.totalGuides = remaining.length;
  scheduledData.note = `Last publish: ${today}, published ${toPublish.length} guides`;
  
  // 更新发布计划，移除已发布日期
  scheduledData.publishSchedule = scheduledData.publishSchedule.filter(
    s => s.date > today
  );
  scheduledData.daysOfContent = scheduledData.publishSchedule.length;
  
  saveScheduledData(scheduledData);

  // 统计摘要
  console.log('📊 Summary:');
  console.log(`   Published today: ${toPublish.length} guides`);
  console.log(`   Total published: ${updatedPublished.length} guides`);
  console.log(`   Remaining in queue: ${remaining.length} guides`);
  console.log(`   Days of content left: ${scheduledData.daysOfContent}`);
  
  if (remaining.length > 0) {
    console.log(`\n📅 Next scheduled publish date: ${remaining[0].publishDate}`);
  }
}

// 运行
console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('    🚀 FixMissingDLL Daily Content Publisher');
console.log('═══════════════════════════════════════════════════════');
console.log('');

try {
  publishTodaysContent();
  console.log('');
  console.log('✅ Done!');
} catch (error) {
  console.error('❌ Error publishing content:', error);
  process.exit(1);
}
