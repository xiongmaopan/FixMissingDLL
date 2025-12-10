/**
 * 清理 scheduled-guides.json 中的废话内容
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/scheduled-guides.json');

console.log('🔍 开始审核 scheduled-guides.json...\n');

// 读取文件
let content = fs.readFileSync(filePath, 'utf-8');

// 移除开头可能的注释行
const hasComment = content.startsWith('//');
let commentLine = '';
if (hasComment) {
  const lines = content.split('\n');
  commentLine = lines[0];
  content = lines.slice(1).join('\n');
}

const data = JSON.parse(content);
const guides = data.guides || [];

let fixCount = 0;

// 需要替换的废话开头模式
const replacements = [
  {
    pattern: /Getting \*\*[^*]+\*\*\? Many users report this issue\./g,
    replacement: 'This DLL error prevents the game from starting properly.'
  },
  {
    pattern: /Have you encountered \*\*[^*]+\*\*\? This is one of the most common Windows errors\./g,
    replacement: 'This error occurs when Windows cannot load a required game component.'
  },
  {
    pattern: /Running into \*\*[^*]+\*\*\? Many users report this issue\./g,
    replacement: 'This DLL error is commonly encountered when launching the game.'
  },
  {
    pattern: /Seeing \*\*[^*]+\*\*\? Many users face this problem\./g,
    replacement: 'This error indicates a missing runtime component required by the game.'
  },
  {
    pattern: /Encountering \*\*[^*]+\*\*\? This is a common issue\./g,
    replacement: 'This DLL file is essential for the game to function properly.'
  },
];

for (const guide of guides) {
  if (guide.sections && Array.isArray(guide.sections)) {
    for (const section of guide.sections) {
      if (section.content) {
        const originalContent = section.content;
        
        for (const { pattern, replacement } of replacements) {
          section.content = section.content.replace(pattern, replacement);
        }
        
        if (section.content !== originalContent) {
          fixCount++;
          console.log(`  ✅ 修复: ${guide.slug} - ${section.heading}`);
        }
      }
    }
  }
  
  // 清理 excerpt 中的 "registry fixes"
  if (guide.excerpt && guide.excerpt.includes('registry fix')) {
    guide.excerpt = guide.excerpt.replace(/,?\s*registry fixes?/gi, '').trim();
    console.log(`  ✅ 清理 excerpt: ${guide.slug}`);
    fixCount++;
  }
  
  // 清理 metaDescription 中的 "Don't panic"
  if (guide.metaDescription && guide.metaDescription.includes("Don't panic")) {
    guide.metaDescription = guide.metaDescription.replace(/\s*Don't panic!\s*/gi, ' ').trim();
    console.log(`  ✅ 清理 metaDescription: ${guide.slug}`);
    fixCount++;
  }
}

// 保存文件
let output = JSON.stringify(data, null, 2);
if (hasComment) {
  output = commentLine + '\n' + output;
}
fs.writeFileSync(filePath, output, 'utf-8');

console.log(`\n📊 审核完成: 修复了 ${fixCount} 处问题`);
console.log('✨ scheduled-guides.json 已更新!');
