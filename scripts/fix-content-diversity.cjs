/**
 * 修复内容多样性 - 降低重复率，增加字数
 */
const fs = require('fs');
const path = require('path');

// 多样化的开头模板
const openingVariants = [
  (name, error) => `Encountering the **${error}** error? This is a common issue that many Windows users face, but don't worry—it's completely fixable.`,
  (name, error) => `If you're seeing **${error}** when trying to run an application, you've come to the right place. Let's solve this step by step.`,
  (name, error) => `The **${error}** error is frustrating, but it's one of the most straightforward Windows issues to resolve.`,
  (name, error) => `Getting the **${error}** message? This typically happens due to missing or corrupted system files, but we have solutions.`,
  (name, error) => `Stuck with **${error}**? This guide will walk you through multiple proven solutions to get your application running again.`,
  (name, error) => `The dreaded **${error}** error has stopped many users in their tracks. Here's how to fix it once and for all.`,
  (name, error) => `When Windows displays **${error}**, it's signaling a fixable problem. Let's diagnose and repair it together.`,
  (name, error) => `Experiencing **${error}**? Before you panic, know that this is a well-documented issue with reliable solutions.`,
  (name, error) => `The **${error}** error might seem daunting, but with the right approach, you can resolve it in minutes.`,
  (name, error) => `Can't launch your application due to **${error}**? This comprehensive guide covers all the fixes you need.`,
];

// 额外内容段落
const additionalContent = {
  understanding: [
    `\n\n### Why This Error Occurs\n\nThis error typically appears when:\n- Required runtime libraries are missing or corrupted\n- There's a mismatch between 32-bit and 64-bit components\n- Windows system files have become damaged\n- A recent update caused compatibility issues`,
    `\n\n### Root Causes Explained\n\nUnderstanding why this happens helps prevent future occurrences:\n- **Missing Dependencies**: The application requires files that aren't installed\n- **Registry Issues**: Windows registry entries may be corrupted\n- **Incomplete Installation**: The original software wasn't installed properly\n- **Antivirus Interference**: Security software sometimes quarantines essential files`,
    `\n\n### Technical Background\n\nThis error occurs at the system level when:\n- Dynamic Link Libraries (DLLs) fail to load\n- Memory allocation fails during application startup\n- Required Visual C++ components are unavailable\n- DirectX or .NET Framework installations are incomplete`,
  ],
  prevention: [
    `\n\n### Preventing Future Issues\n\n1. **Keep Windows Updated**: Regular updates patch known issues\n2. **Use Official Sources**: Only download software from trusted websites\n3. **Maintain Runtime Libraries**: Keep Visual C++ and DirectX current\n4. **Create System Restore Points**: Before installing new software\n5. **Run Regular Maintenance**: Use built-in Windows tools monthly`,
    `\n\n### Best Practices for System Health\n\n- **Regular Backups**: Protect your system with periodic backups\n- **Monitor Disk Space**: Ensure adequate free space on your system drive\n- **Update Drivers**: Keep hardware drivers current\n- **Scan for Malware**: Run periodic security scans\n- **Clean Temporary Files**: Remove unnecessary cached data`,
  ],
  gaming: [
    `\n\n### For Gamers\n\nIf you're experiencing this in a game:\n- **Verify Game Files**: Use Steam/Epic/GOG's built-in verification\n- **Run as Administrator**: Right-click the game and select "Run as administrator"\n- **Disable Overlays**: Turn off Discord, Steam, or GeForce overlays\n- **Check Antivirus Exclusions**: Add the game folder to your antivirus whitelist`,
  ],
  advanced: [
    `\n\n### Advanced Troubleshooting\n\nIf basic solutions don't work:\n\n\`\`\`batch\n:: Run these commands in Administrator Command Prompt\nDISM /Online /Cleanup-Image /CheckHealth\nDISM /Online /Cleanup-Image /ScanHealth\nDISM /Online /Cleanup-Image /RestoreHealth\nsfc /scannow\n\`\`\`\n\nThese commands repair Windows system image and scan for corrupted files.`,
  ]
};

function processGuides(filePath) {
  console.log(`Processing: ${path.basename(filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  
  // 获取 guides 数组
  const guides = Array.isArray(data) ? data : data.guides;
  if (!guides) {
    console.log('  No guides array found, skipping');
    return;
  }
  
  let modified = 0;
  
  guides.forEach((guide, index) => {
    if (!guide.sections || guide.sections.length === 0) return;
    
    // 1. 多样化第一段开头
    const variantIndex = index % openingVariants.length;
    const errorName = guide.title || guide.slug || 'this error';
    const dllName = guide.slug?.match(/fix-(\w+)/)?.[1] || 'DLL';
    
    try {
      const newOpening = openingVariants[variantIndex](dllName, errorName);
      
      // 检查是否以常见重复开头
      const firstContent = guide.sections[0].content || '';
      if (firstContent.startsWith('Seeing the **') || 
          firstContent.startsWith("If you're seeing") ||
          firstContent.startsWith('Encountering')) {
        // 替换开头
        const restOfContent = firstContent.substring(firstContent.indexOf('\n\n') + 2);
        guide.sections[0].content = newOpening + '\n\n' + restOfContent;
        modified++;
      }
      
      // 2. 增加内容长度
      let totalWords = 0;
      guide.sections.forEach(s => {
        totalWords += (s.content || '').split(/\s+/).length;
      });
      
      if (totalWords < 450) {
        // 添加额外内容
        const understandingVariant = additionalContent.understanding[index % 3];
        const preventionVariant = additionalContent.prevention[index % 2];
        
        // 在第一个 section 末尾添加理解部分
        guide.sections[0].content += understandingVariant;
        
        // 在最后一个 section 添加预防部分
        const lastSection = guide.sections[guide.sections.length - 1];
        lastSection.content += preventionVariant;
        
        // 如果是游戏相关，添加游戏提示
        if (guide.category === 'Gaming' || guide.slug?.includes('game')) {
          lastSection.content += additionalContent.gaming[0];
        }
        
        // 添加高级故障排除
        if (totalWords < 350) {
          lastSection.content += additionalContent.advanced[0];
        }
        
        modified++;
      }
    } catch (e) {
      console.log(`  Error processing guide ${index}: ${e.message}`);
    }
  });
  
  // 保存
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  Modified: ${modified} guides`);
}

// 主程序
const dataDir = 'd:/CODEFREE/FixMissingDLL/astro-site/src/data';

console.log('=== 修复内容多样性 ===\n');

processGuides(path.join(dataDir, 'auto-generated-guides.json'));
processGuides(path.join(dataDir, 'scheduled-guides.json'));

console.log('\n✅ 完成!');
