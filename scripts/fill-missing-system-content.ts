/**
 * 补充缺失的系统错误内容
 * 针对 2026-01-23 之后缺少 system 类型的日期
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 额外的系统错误场景
const additionalSystemScenarios = [
  { name: 'SFC cannot repair', dll: 'winsxs.dll', errorType: 'SFC 无法修复系统文件', eventId: '101' },
  { name: 'DISM repair failure', dll: 'dismcore.dll', errorType: 'DISM 修复失败', eventId: '8' },
  { name: 'Windows Installer error', dll: 'msi.dll', errorType: 'Windows Installer 服务错误', eventId: '11708' },
  { name: 'Event log crash', dll: 'wevtsvc.dll', errorType: '事件日志服务崩溃', eventId: '7034' },
  { name: 'Background task host crash', dll: 'backgroundtaskhost.exe', errorType: '后台任务崩溃', eventId: '1000' },
  { name: 'Settings app crash', dll: 'systemsettings.dll', errorType: '设置应用崩溃', eventId: '1000' },
  { name: 'Action Center crash', dll: 'actioncenter.dll', errorType: '操作中心崩溃', eventId: '1000' },
  { name: 'Cortana crash', dll: 'searchui.exe', errorType: 'Cortana 搜索崩溃', eventId: '1000' },
  { name: 'Start menu crash', dll: 'startmenuexperiencehost.exe', errorType: '开始菜单崩溃', eventId: '1000' },
  { name: 'Taskbar crash', dll: 'explorer.exe', errorType: '任务栏崩溃消失', eventId: '1000' },
];

function generateSystemGuide(item: any, publishDate: string) {
  const slug = `fix-${item.dll.replace('.dll', '').replace('.exe', '').replace('.sys', '')}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;
  
  return {
    id: slug,
    slug,
    title: `Fix ${item.dll} Error - ${item.name}`,
    metaTitle: `Fix ${item.dll} Error - ${item.name} - Quick Solution 2025`,
    metaDescription: `Experiencing ${item.errorType}? Learn how to fix ${item.dll} errors and resolve this issue.`,
    excerpt: `Experiencing ${item.errorType}? Learn how to fix ${item.dll} errors and resolve this issue.`,
    category: 'System',
    publishDate,
    updateDate: publishDate,
    author: 'System Admin Team',
    keywords: [
      `${item.dll} error`,
      `${item.errorType}`,
      `fix ${item.dll}`,
      `${item.dll} crash`,
      `Event ID ${item.eventId}`
    ],
    relatedDlls: [item.dll],
    systemError: item.name,
    contentType: 'system'
  };
}

function fillMissingSystemContent() {
  const scheduledPath = path.join(__dirname, '../src/data/scheduled-guides.json');
  const existingData = JSON.parse(fs.readFileSync(scheduledPath, 'utf-8'));
  const existingGuides = existingData.guides || [];
  
  // 找出缺少 system 内容的日期 (2026-01-23 之后)
  const byDate: { [key: string]: any[] } = {};
  existingGuides.forEach((g: any) => {
    if (!byDate[g.publishDate]) byDate[g.publishDate] = [];
    byDate[g.publishDate].push(g);
  });
  
  const incompleteDates = Object.entries(byDate)
    .filter(([date, guides]) => {
      // 只处理 2026-01-23 之后缺少 system 的日期
      if (date < '2026-01-23') return false;
      const hasSystem = guides.some(g => g.contentType === 'system');
      return !hasSystem && guides.length === 4;
    })
    .map(([date]) => date)
    .sort();
  
  console.log(`找到 ${incompleteDates.length} 个缺少 system 内容的日期`);
  
  const usedSlugs = new Set(existingGuides.map((g: any) => g.slug));
  const newGuides: any[] = [];
  let scenarioIndex = 0;
  
  for (const date of incompleteDates) {
    let found = false;
    let attempts = 0;
    
    while (!found && attempts < additionalSystemScenarios.length) {
      const scenario = additionalSystemScenarios[scenarioIndex % additionalSystemScenarios.length];
      const guide = generateSystemGuide(scenario, date);
      
      if (!usedSlugs.has(guide.slug)) {
        usedSlugs.add(guide.slug);
        newGuides.push(guide);
        found = true;
        console.log(`  ${date}: 添加 ${guide.title}`);
      }
      scenarioIndex++;
      attempts++;
    }
    
    if (!found) {
      console.log(`  ${date}: 无法找到唯一的 system 内容`);
    }
  }
  
  // 合并并保存
  const allGuides = [...existingGuides, ...newGuides];
  
  const output = {
    generatedAt: new Date().toISOString(),
    strategy: '2+1+1+1 (2 classic games + 1 hot game + 1 office + 1 system per day)',
    totalGuides: allGuides.length,
    guides: allGuides
  };
  
  fs.writeFileSync(scheduledPath, JSON.stringify(output, null, 2));
  
  console.log(`\n✅ 补充完成！`);
  console.log(`📊 新增: ${newGuides.length} 篇 system 内容`);
  console.log(`📊 总计: ${allGuides.length} 篇待发布`);
}

fillMissingSystemContent();
