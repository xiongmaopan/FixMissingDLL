/**
 * 修复所有待发布文章的 SEO 问题
 * - metaTitle 控制在 60 字符以内
 * - metaDescription 控制在 155 字符以内
 */

const fs = require('fs');
const path = require('path');

// 智能截断标题，保持可读性
function optimizeTitle(title, maxLen = 60) {
  if (title.length <= maxLen) return title;
  
  // 尝试移除 " | FixMissingDLL" 后缀
  let newTitle = title.replace(/ \| FixMissingDLL$/, '');
  if (newTitle.length <= maxLen) return newTitle;
  
  // 尝试移除 " - Quick Solution" 或类似后缀
  newTitle = newTitle.replace(/ - (Quick Solution|Complete Guide|Solution Guide|2025 Guide|2025 Complete Guide)$/, '');
  if (newTitle.length <= maxLen) return newTitle;
  
  // 尝试简化年份格式 "(2024)" -> ""
  newTitle = newTitle.replace(/ \(\d{4}\)/, '');
  if (newTitle.length <= maxLen) return newTitle;
  
  // 尝试缩短 "Fix XXX.dll Missing in Game" -> "Fix XXX.dll in Game"
  newTitle = newTitle.replace(/ Missing in /, ' in ');
  if (newTitle.length <= maxLen) return newTitle;
  
  // 尝试缩短 "Fix XXX.dll Error in" -> "Fix XXX.dll -"
  newTitle = newTitle.replace(/ Error in /, ' - ');
  if (newTitle.length <= maxLen) return newTitle;
  
  // 最后手段: 截断
  return newTitle.substring(0, maxLen - 3) + '...';
}

// 优化 description
function optimizeDescription(desc, maxLen = 155) {
  if (desc.length <= maxLen) return desc;
  
  // 找到最后一个完整句子
  let truncated = desc.substring(0, maxLen - 3);
  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod > maxLen * 0.6) {
    return truncated.substring(0, lastPeriod + 1);
  }
  
  return truncated + '...';
}

// 处理文件
function processFile(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  
  let titleFixes = 0;
  let descFixes = 0;
  
  // 处理 guides 数组 (scheduled-guides.json 格式)
  const guides = Array.isArray(data) ? data : data.guides;
  
  if (!guides) {
    console.log('  跳过: 无 guides 数组');
    return;
  }
  
  guides.forEach(guide => {
    // 修复 metaTitle
    if (guide.metaTitle && guide.metaTitle.length > 60) {
      const oldTitle = guide.metaTitle;
      guide.metaTitle = optimizeTitle(guide.metaTitle);
      titleFixes++;
      console.log(`  标题: [${oldTitle.length}→${guide.metaTitle.length}] ${guide.metaTitle}`);
    }
    
    // 修复 metaDescription
    if (guide.metaDescription && guide.metaDescription.length > 155) {
      guide.metaDescription = optimizeDescription(guide.metaDescription);
      descFixes++;
    }
  });
  
  console.log(`\n  修复: ${titleFixes} 个标题, ${descFixes} 个描述`);
  
  // 保存
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('  已保存!');
}

// 主程序
const dataDir = path.join(__dirname, '..', 'src', 'data');

// 处理文件
const files = [
  'auto-generated-guides.json',
  'scheduled-guides.json'
];

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    processFile(filePath);
  }
});

console.log('\n✅ 所有文件处理完成!');
