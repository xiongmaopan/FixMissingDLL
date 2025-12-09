/**
 * 内容质量审核脚本
 * 基于 Google Search Quality Rater Guidelines
 * 专注于 YMYL (Your Money Your Life) 内容安全性
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, '../src/data');

// 需要删除的"废话"短语
const FLUFF_PHRASES = [
  "In this guide",
  "Welcome to",
  "Don't panic",
  "Computers are complex machines",
  "Have you encountered",
  "Many users report this issue",
  "This is one of the most common Windows errors",
  "Running into",
];

// 不安全的短语 - 需要添加警告
const UNSAFE_PHRASES = [
  "download this dll",
  "download the dll file",
  "registry fix",
  "registry cleaner",
  "download the software",
  "third-party tool",
];

// 需要替换为更精确的术语
const VAGUE_TO_PRECISE: Record<string, string> = {
  "download the software": "download the Microsoft Visual C++ Redistributable",
  "install the runtime": "install the Microsoft Visual C++ 2015-2022 Redistributable",
  "the redistributable": "the Microsoft Visual C++ Redistributable",
};

interface AuditResult {
  file: string;
  issues: {
    type: 'fluff' | 'unsafe' | 'vague';
    phrase: string;
    count: number;
  }[];
  fixed: boolean;
}

function auditAndFixContent(filePath: string): AuditResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  let fixedContent = content;
  const issues: AuditResult['issues'] = [];
  
  // 检查废话短语
  for (const phrase of FLUFF_PHRASES) {
    const regex = new RegExp(phrase, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      issues.push({
        type: 'fluff',
        phrase,
        count: matches.length
      });
    }
  }
  
  // 检查不安全短语
  for (const phrase of UNSAFE_PHRASES) {
    const regex = new RegExp(phrase, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      issues.push({
        type: 'unsafe',
        phrase,
        count: matches.length
      });
    }
  }
  
  // 检查并替换模糊术语
  for (const [vague, precise] of Object.entries(VAGUE_TO_PRECISE)) {
    const regex = new RegExp(vague, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      issues.push({
        type: 'vague',
        phrase: vague,
        count: matches.length
      });
      fixedContent = fixedContent.replace(regex, precise);
    }
  }
  
  // 移除 excerpt 和 metaDescription 中的 "registry fixes"
  try {
    const data = JSON.parse(fixedContent.replace(/^\/\/.*\n/, '')); // 移除可能的注释行
    let modified = false;
    
    const processGuide = (guide: any) => {
      // 清理 excerpt
      if (guide.excerpt && guide.excerpt.includes('registry fix')) {
        guide.excerpt = guide.excerpt.replace(/,?\s*registry fixes?/gi, '');
        modified = true;
      }
      
      // 清理 metaDescription
      if (guide.metaDescription && guide.metaDescription.includes("Don't panic")) {
        guide.metaDescription = guide.metaDescription.replace(/\s*Don't panic!\s*/gi, ' ');
        modified = true;
      }
      
      // 清理 sections 中的废话开头
      if (guide.sections && Array.isArray(guide.sections)) {
        for (const section of guide.sections) {
          if (section.content) {
            for (const phrase of FLUFF_PHRASES) {
              if (section.content.startsWith(phrase) || section.content.includes(`**${phrase}`)) {
                // 尝试改进开头
                section.content = section.content
                  .replace(/^Have you encountered \*\*[^*]+\*\*\? This is one of the most common Windows errors\./, 
                    'This error occurs when Windows cannot load a required DLL file.')
                  .replace(/^Running into \*\*[^*]+\*\*\? Many users report this issue\./,
                    'This DLL error prevents the application from starting properly.');
                modified = true;
              }
            }
          }
        }
      }
    };
    
    if (Array.isArray(data)) {
      data.forEach(processGuide);
    } else if (data.guides && Array.isArray(data.guides)) {
      data.guides.forEach(processGuide);
    }
    
    if (modified) {
      // 保持原有格式
      if (fixedContent.startsWith('//')) {
        const firstLine = fixedContent.split('\n')[0];
        fixedContent = firstLine + '\n' + JSON.stringify(data, null, 2);
      } else {
        fixedContent = JSON.stringify(data, null, 2);
      }
    }
  } catch (e) {
    console.log(`  跳过 JSON 处理 (解析错误): ${(e as Error).message}`);
  }
  
  // 如果有修复，写回文件
  const wasFixed = fixedContent !== content;
  if (wasFixed) {
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
  }
  
  return {
    file: path.basename(filePath),
    issues,
    fixed: wasFixed
  };
}

function main() {
  console.log('🔍 开始内容质量审核...\n');
  console.log('=' .repeat(60));
  
  const files = [
    path.join(DATA_DIR, 'auto-generated-guides.json'),
    path.join(DATA_DIR, 'scheduled-guides.json'),
  ];
  
  const results: AuditResult[] = [];
  
  for (const file of files) {
    if (fs.existsSync(file)) {
      console.log(`\n📄 审核: ${path.basename(file)}`);
      const result = auditAndFixContent(file);
      results.push(result);
      
      if (result.issues.length > 0) {
        console.log(`  ⚠️  发现 ${result.issues.length} 类问题:`);
        for (const issue of result.issues) {
          const icon = issue.type === 'unsafe' ? '🚨' : issue.type === 'fluff' ? '💨' : '🔄';
          console.log(`    ${icon} [${issue.type.toUpperCase()}] "${issue.phrase}" (${issue.count}处)`);
        }
        if (result.fixed) {
          console.log(`  ✅ 已自动修复部分问题`);
        }
      } else {
        console.log(`  ✅ 通过审核`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 审核报告摘要:\n');
  
  // 安全检查结果
  const unsafeIssues = results.flatMap(r => r.issues.filter(i => i.type === 'unsafe'));
  if (unsafeIssues.length === 0) {
    console.log('✅ 安全检查: 通过 - 未发现不安全的下载建议');
  } else {
    console.log('❌ 安全检查: 失败 - 发现不安全内容');
    unsafeIssues.forEach(i => console.log(`   - "${i.phrase}"`));
  }
  
  // 废话检查结果
  const fluffIssues = results.flatMap(r => r.issues.filter(i => i.type === 'fluff'));
  if (fluffIssues.length === 0) {
    console.log('✅ 废话检查: 通过');
  } else {
    console.log(`⚠️  废话检查: 发现 ${fluffIssues.reduce((sum, i) => sum + i.count, 0)} 处需要改进`);
  }
  
  // 精确度检查结果
  const vagueIssues = results.flatMap(r => r.issues.filter(i => i.type === 'vague'));
  if (vagueIssues.length === 0) {
    console.log('✅ 术语精确度: 通过');
  } else {
    console.log(`🔄 术语精确度: 已修复 ${vagueIssues.reduce((sum, i) => sum + i.count, 0)} 处模糊表述`);
  }
  
  console.log('\n✨ 审核完成!');
}

main();
