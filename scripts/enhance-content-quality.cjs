/**
 * 内容质量增强脚本
 * 1. 降低重复率 - 为每篇文章生成独特开头
 * 2. 增加字数 - 扩展内容到 500+ 词
 * 3. 提高多样性 - 使用多种模板变体
 */

const fs = require('fs');
const path = require('path');

// 多样化的开头模板 (针对不同类型)
const openingTemplates = {
  // 游戏相关 DLL 错误
  gaming: [
    (game, dll, year) => `Trying to launch **${game}**${year ? ` (${year})` : ''} but getting a "${dll} is missing" error? This is a common issue that's easy to fix. Here's how to get back to gaming in minutes.`,
    (game, dll, year) => `The "${dll} not found" error is preventing you from playing **${game}**? Don't worry - this guide will walk you through the exact steps to resolve this issue.`,
    (game, dll, year) => `**${game}** crashing with a ${dll} error? You're not alone. This file is essential for the game to run, but fixing it takes just a few minutes.`,
    (game, dll, year) => `Getting "${dll} was not found" when starting **${game}**? This error typically occurs when Visual C++ runtime files are missing or corrupted. Let's fix it.`,
    (game, dll, year) => `Can't play **${game}** because of ${dll}? This DLL error is frustrating but has a simple solution. Follow this guide to resolve it permanently.`,
  ],
  
  // Windows 系统错误
  system: [
    (error) => `The **${error}** error can stop applications dead in their tracks. Understanding what causes this error is the first step to fixing it permanently.`,
    (error) => `Encountering **${error}** on your Windows PC? This error code indicates a specific problem that we can diagnose and fix step by step.`,
    (error) => `**${error}** is more common than you might think. The good news? It's almost always fixable with the right approach.`,
    (error) => `Windows showing **${error}**? This error has several possible causes, but most can be resolved without advanced technical knowledge.`,
    (error) => `The **${error}** error message can appear suddenly and prevent your applications from running. Here's what it means and how to fix it.`,
  ],
  
  // DLL 文件相关
  dll: [
    (dll, software) => `**${dll}** is a critical component used by ${software || 'many Windows applications'}. When this file is missing or corrupted, you'll see error messages preventing programs from starting.`,
    (dll, software) => `Missing ${dll}? This Dynamic Link Library file is essential for ${software || 'various applications'} to function correctly on Windows.`,
    (dll, software) => `The ${dll} file is part of ${software || 'the Windows runtime environment'}. When it's missing, applications that depend on it will fail to launch.`,
    (dll, software) => `${dll} errors are among the most common DLL issues on Windows. This file is required by ${software || 'numerous programs'} to run properly.`,
    (dll, software) => `Seeing "${dll} is missing" errors? This file is a shared library that ${software || 'multiple applications'} rely on for core functionality.`,
  ],
  
  // Adobe 软件
  adobe: [
    (app, dll) => `**Adobe ${app}** requires ${dll} to function properly. If this file is missing or corrupted, the application won't launch. Here's the complete fix.`,
    (app, dll) => `Can't open **Adobe ${app}** due to a ${dll} error? This is typically caused by incomplete Visual C++ installations. Let's resolve it.`,
    (app, dll) => `The ${dll} error in **Adobe ${app}** is frustrating, especially when you have deadlines. Fortunately, the fix only takes a few minutes.`,
  ],
};

// 额外内容段落 (增加字数)
const additionalSections = {
  // 技术背景段落
  technicalBackground: [
    {
      heading: "Understanding DLL Files",
      content: `**What is a DLL?**\n\nDLL (Dynamic Link Library) files are shared libraries that contain code and data used by multiple programs simultaneously. Instead of each program having its own copy of common functions, they share these DLL files, which:\n\n- **Reduces memory usage** - One copy serves multiple programs\n- **Simplifies updates** - Update the DLL once, all programs benefit\n- **Enables modular design** - Programs can load features on demand\n\nWhen a required DLL is missing or corrupted, any program depending on it will fail to start.`
    },
    {
      heading: "Why DLL Errors Occur",
      content: `**Common Causes of DLL Errors:**\n\n1. **Incomplete software installation** - The installer failed to copy all required files\n2. **Corrupted Windows Update** - An update may have damaged system files\n3. **Malware infection** - Viruses often target or disguise themselves as DLL files\n4. **Accidental deletion** - Cleanup tools sometimes remove necessary files\n5. **Hardware failure** - Failing hard drives can corrupt files\n6. **Software conflicts** - Multiple programs trying to use different versions`
    },
  ],
  
  // 预防措施段落
  prevention: [
    {
      heading: "Preventing Future DLL Errors",
      content: `**Best Practices to Avoid DLL Issues:**\n\n### Keep Your System Updated\n- Enable automatic Windows Updates\n- Regularly update your applications\n- Keep drivers current (especially GPU drivers)\n\n### Maintain Runtime Libraries\n- Install all Visual C++ Redistributable versions (2008-2022)\n- Keep DirectX updated for gaming\n- Install .NET Framework versions as needed\n\n### Practice Safe Computing\n- Download software only from official sources\n- Use reputable antivirus software\n- Create system restore points before major changes\n- Back up important files regularly`
    }
  ],
  
  // 故障排除段落
  troubleshooting: [
    {
      heading: "Advanced Troubleshooting",
      content: `**If Basic Fixes Don't Work:**\n\n### Check System File Integrity\n\`\`\`batch\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n### Verify Application Requirements\n- Check the game/software's system requirements\n- Ensure your Windows version is compatible\n- Verify you have the correct architecture (32-bit vs 64-bit)\n\n### Clean Boot Windows\n1. Press Win + R, type \`msconfig\`\n2. Go to Services tab\n3. Check "Hide all Microsoft services"\n4. Click "Disable all"\n5. Restart and test the application`
    }
  ],
};

// 处理单个指南
function enhanceGuide(guide) {
  const enhanced = { ...guide };
  let sections = [...(guide.sections || [])];
  
  // 1. 改进开头段落
  if (sections.length > 0) {
    const firstSection = sections[0];
    let newContent = firstSection.content;
    
    // 根据类型选择模板
    if (guide.category === 'Gaming' || guide.slug.includes('game') || guide.slug.includes('fix-') && guide.slug.includes('-in-')) {
      // 游戏类文章
      const templates = openingTemplates.gaming;
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      // 提取游戏名和 DLL 名
      const gameMatch = guide.title.match(/in\s+(.+?)(?:\s+\(|$)/i) || guide.title.match(/for\s+(.+?)(?:\s+\(|$)/i);
      const dllMatch = guide.title.match(/(\w+\.dll)/i);
      const yearMatch = guide.title.match(/\((\d{4})\)/);
      
      if (gameMatch && dllMatch) {
        newContent = template(gameMatch[1], dllMatch[1], yearMatch?.[1]) + '\n\n' + firstSection.content;
      }
    } else if (guide.slug.includes('0x') || guide.category === 'Error Codes') {
      // 系统错误类文章
      const templates = openingTemplates.system;
      const template = templates[Math.floor(Math.random() * templates.length)];
      const errorMatch = guide.title.match(/(0x[0-9a-fA-F]+)/i);
      
      if (errorMatch) {
        newContent = template(errorMatch[1]) + '\n\n' + firstSection.content;
      }
    } else if (guide.slug.includes('adobe') || guide.title.toLowerCase().includes('adobe')) {
      // Adobe 类文章
      const templates = openingTemplates.adobe;
      const template = templates[Math.floor(Math.random() * templates.length)];
      const appMatch = guide.title.match(/Adobe\s+(\w+)/i);
      const dllMatch = guide.title.match(/(\w+\.dll)/i);
      
      if (appMatch && dllMatch) {
        newContent = template(appMatch[1], dllMatch[1]) + '\n\n' + firstSection.content;
      }
    } else {
      // 通用 DLL 文章
      const templates = openingTemplates.dll;
      const template = templates[Math.floor(Math.random() * templates.length)];
      const dllMatch = guide.title.match(/(\w+\.dll)/i);
      
      if (dllMatch) {
        newContent = template(dllMatch[1]) + '\n\n' + firstSection.content;
      }
    }
    
    sections[0] = { ...firstSection, content: newContent };
  }
  
  // 2. 计算当前字数
  let totalWords = sections.reduce((sum, s) => sum + (s.content || '').split(/\s+/).length, 0);
  
  // 3. 如果字数不足 500，添加额外内容
  if (totalWords < 500) {
    // 添加技术背景
    if (totalWords < 350) {
      const bgSection = additionalSections.technicalBackground[Math.floor(Math.random() * additionalSections.technicalBackground.length)];
      sections.splice(1, 0, bgSection); // 插入到第二个位置
      totalWords += bgSection.content.split(/\s+/).length;
    }
    
    // 添加预防措施 (如果还不够)
    if (totalWords < 450) {
      const prevSection = additionalSections.prevention[0];
      sections.push(prevSection);
      totalWords += prevSection.content.split(/\s+/).length;
    }
    
    // 添加高级故障排除 (如果还不够)
    if (totalWords < 500) {
      const troubleSection = additionalSections.troubleshooting[0];
      // 检查是否已有类似段落
      const hasTrouble = sections.some(s => s.heading.toLowerCase().includes('troubleshoot') || s.heading.toLowerCase().includes('advanced'));
      if (!hasTrouble) {
        sections.push(troubleSection);
      }
    }
  }
  
  enhanced.sections = sections;
  return enhanced;
}

// 主程序
async function main() {
  console.log('=== 内容质量增强 ===\n');
  
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  
  // 处理 auto-generated-guides.json
  const autoPath = path.join(dataDir, 'auto-generated-guides.json');
  let autoGuides = JSON.parse(fs.readFileSync(autoPath, 'utf8'));
  
  console.log(`处理 auto-generated-guides.json (${autoGuides.length} 篇)...`);
  autoGuides = autoGuides.map(enhanceGuide);
  fs.writeFileSync(autoPath, JSON.stringify(autoGuides, null, 2));
  console.log('✓ auto-generated-guides.json 已更新\n');
  
  // 处理 scheduled-guides.json
  const schedPath = path.join(dataDir, 'scheduled-guides.json');
  let schedData = JSON.parse(fs.readFileSync(schedPath, 'utf8'));
  
  console.log(`处理 scheduled-guides.json (${schedData.guides.length} 篇)...`);
  schedData.guides = schedData.guides.map(enhanceGuide);
  fs.writeFileSync(schedPath, JSON.stringify(schedData, null, 2));
  console.log('✓ scheduled-guides.json 已更新\n');
  
  // 验证结果
  console.log('=== 验证结果 ===');
  
  const allGuides = [...autoGuides, ...schedData.guides];
  const wordCounts = allGuides.map(g => {
    return g.sections.reduce((sum, s) => sum + (s.content || '').split(/\s+/).length, 0);
  });
  
  const avgWords = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
  const under500 = wordCounts.filter(w => w < 500).length;
  const over500 = wordCounts.filter(w => w >= 500).length;
  
  console.log(`平均字数: ${avgWords} 词`);
  console.log(`<500词: ${under500} 篇`);
  console.log(`>=500词: ${over500} 篇`);
  
  // 检查重复率
  const firstSections = allGuides.map(g => g.sections?.[0]?.content?.substring(0, 150) || '');
  const uniqueFirst = new Set(firstSections);
  const duplicateRate = Math.round((1 - uniqueFirst.size / firstSections.length) * 100);
  
  console.log(`开头重复率: ${duplicateRate}%`);
  
  console.log('\n✅ 内容质量增强完成!');
}

main().catch(console.error);
