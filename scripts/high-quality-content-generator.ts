/**
 * 🌟 高质量内容生成器 v2.0
 * 
 * 解决问题：
 * 1. 每篇文章都有独特的内容
 * 2. 针对不同游戏/软件提供专属解决方案
 * 3. 包含真实的技术细节
 * 4. 不同的写作风格和结构
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ DLL 专属知识库 ============
const dllKnowledge: Record<string, {
  fullName: string;
  purpose: string;
  commonCauses: string[];
  runtimePackage: string;
  downloadUrl: string;
  registrationCmd?: string;
  additionalNotes: string;
}> = {
  'vcruntime140.dll': {
    fullName: 'Visual C++ Runtime Library 140',
    purpose: 'provides C++ runtime functions like memory allocation, string manipulation, and exception handling',
    commonCauses: [
      'Visual C++ 2015-2022 Redistributable not installed',
      'Corrupted Visual C++ installation',
      'Antivirus quarantined the file',
      'Windows Update removed the file'
    ],
    runtimePackage: 'Microsoft Visual C++ 2015-2022 Redistributable',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    registrationCmd: 'regsvr32 vcruntime140.dll',
    additionalNotes: 'This DLL is required by most modern games and applications built with Visual Studio 2015 or later.'
  },
  'msvcp140.dll': {
    fullName: 'Microsoft Visual C++ Standard Library',
    purpose: 'provides C++ Standard Library functions like containers, algorithms, and I/O operations',
    commonCauses: [
      'Missing Visual C++ Redistributable',
      'Incomplete software installation',
      'System file corruption',
      'Conflicting DLL versions'
    ],
    runtimePackage: 'Microsoft Visual C++ 2015-2022 Redistributable',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    additionalNotes: 'Always install both x64 and x86 versions for maximum compatibility.'
  },
  'mss32.dll': {
    fullName: 'Miles Sound System Library',
    purpose: 'handles audio playback, 3D sound, and music streaming in games',
    commonCauses: [
      'Game installation is incomplete',
      'File deleted by antivirus',
      'Disc-based installation error',
      'Missing Miles Sound System runtime'
    ],
    runtimePackage: 'Miles Sound System (bundled with game)',
    downloadUrl: 'http://www.radgametools.com/miles.htm',
    additionalNotes: 'This audio library was extremely popular in games from 1995-2010. Over 5,000 games use Miles Sound System.'
  },
  'binkw32.dll': {
    fullName: 'Bink Video Codec Library',
    purpose: 'decodes and plays Bink video format (.bik) used in game cutscenes',
    commonCauses: [
      'Game installation corrupted',
      'Antivirus false positive',
      'Missing game files',
      'Copy protection issue'
    ],
    runtimePackage: 'RAD Game Tools Bink Video',
    downloadUrl: 'http://www.radgametools.com/bnkdown.htm',
    additionalNotes: 'Bink is used by over 14,000 games for video playback. The codec is extremely efficient for game cutscenes.'
  },
  'd3dx9_43.dll': {
    fullName: 'DirectX 9 Extension Library',
    purpose: 'provides helper functions for Direct3D 9 graphics rendering',
    commonCauses: [
      'DirectX End-User Runtime not installed',
      'Outdated DirectX installation',
      'Windows Update removed legacy components',
      'Game requires specific DirectX version'
    ],
    runtimePackage: 'DirectX End-User Runtime (June 2010)',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    additionalNotes: 'd3dx9_43.dll is from DirectX SDK June 2010, required by thousands of games released 2006-2015.'
  },
  'steam_api.dll': {
    fullName: 'Steam API Interface Library',
    purpose: 'handles Steam integration including achievements, cloud saves, and DRM',
    commonCauses: [
      'Steam client not running',
      'Game files corrupted',
      'Pirated game copy',
      'Antivirus blocking Steam'
    ],
    runtimePackage: 'Steam Client',
    downloadUrl: 'https://store.steampowered.com/about/',
    additionalNotes: 'This file must match the game version. Verify game files through Steam to fix most issues.'
  },
  'xlive.dll': {
    fullName: 'Games for Windows LIVE Runtime',
    purpose: 'provides Xbox LIVE integration for PC games (achievements, multiplayer)',
    commonCauses: [
      'GFWL service discontinued',
      'Missing GFWL Redistributable',
      'Windows 10/11 compatibility issue',
      'Game not updated for modern Windows'
    ],
    runtimePackage: 'Games for Windows LIVE Redistributable',
    downloadUrl: 'https://www.xbox.com/en-US/games/store/games-for-windows-live/9NBLGGH2JHXJ',
    additionalNotes: 'GFWL was discontinued in 2014. Many games have been patched to remove this requirement. Check for game updates.'
  },
  'physxloader.dll': {
    fullName: 'NVIDIA PhysX System Software',
    purpose: 'loads NVIDIA PhysX physics simulation engine for realistic physics',
    commonCauses: [
      'PhysX System Software not installed',
      'Outdated PhysX version',
      'GPU driver issue',
      'NVIDIA driver not installed'
    ],
    runtimePackage: 'NVIDIA PhysX System Software',
    downloadUrl: 'https://www.nvidia.com/en-us/drivers/physx/physx-9-21-0713-driver/',
    additionalNotes: 'PhysX is often bundled with NVIDIA drivers. Installing the latest GeForce driver usually fixes this.'
  },
  'openal32.dll': {
    fullName: 'OpenAL Audio Library',
    purpose: 'provides cross-platform 3D audio rendering for games',
    commonCauses: [
      'OpenAL runtime not installed',
      'Corrupted audio drivers',
      'Game requires specific OpenAL version',
      'Audio device conflict'
    ],
    runtimePackage: 'OpenAL Soft',
    downloadUrl: 'https://openal-soft.org/',
    additionalNotes: 'OpenAL is an open-source audio API similar to OpenGL but for audio. Many indie games use it.'
  },
  'd3d12.dll': {
    fullName: 'Direct3D 12 Runtime',
    purpose: 'provides low-level access to GPU for modern high-performance graphics',
    commonCauses: [
      'Windows version too old',
      'GPU does not support DirectX 12',
      'Outdated graphics driver',
      'Windows system file corruption'
    ],
    runtimePackage: 'Windows Update',
    downloadUrl: 'Built into Windows 10/11',
    additionalNotes: 'DirectX 12 requires Windows 10 or later and a compatible GPU. No separate installer is available.'
  }
};

// ============ 游戏专属知识库 ============
const gameKnowledge: Record<string, {
  developer: string;
  publisher: string;
  releaseYear: number;
  engine: string;
  platform: string[];
  knownIssues: string[];
  communityFixes: string[];
  officialSupport: string;
}> = {
  'Black Myth Wukong': {
    developer: 'Game Science',
    publisher: 'Game Science',
    releaseYear: 2024,
    engine: 'Unreal Engine 5',
    platform: ['Steam', 'Epic Games', 'PlayStation 5'],
    knownIssues: [
      'High VRAM requirements (8GB+ recommended)',
      'Ray tracing causes crashes on older GPUs',
      'Intel Arc GPU compatibility issues'
    ],
    communityFixes: [
      'Disable ray tracing in graphics settings',
      'Update to latest GPU drivers',
      'Set power plan to High Performance'
    ],
    officialSupport: 'https://heishenhua.com/support'
  },
  'Elden Ring': {
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    releaseYear: 2022,
    engine: 'FromSoftware Engine',
    platform: ['Steam', 'PlayStation', 'Xbox'],
    knownIssues: [
      'EasyAntiCheat conflicts',
      'White screen on startup',
      'Frame rate stuttering'
    ],
    communityFixes: [
      'Run as administrator',
      'Disable Steam overlay',
      'Update EasyAntiCheat manually'
    ],
    officialSupport: 'https://www.bandainamcoent.com/support'
  },
  'Diablo 2': {
    developer: 'Blizzard North',
    publisher: 'Blizzard Entertainment',
    releaseYear: 2000,
    engine: 'Blizzard Proprietary',
    platform: ['PC', 'Mac'],
    knownIssues: [
      'Glide wrapper needed for modern Windows',
      'Resolution limited to 800x600',
      'CD check on original version'
    ],
    communityFixes: [
      'Use D2DX or cnc-ddraw for better compatibility',
      'Apply PlugY mod for extended stash',
      'Consider buying Diablo 2 Resurrected instead'
    ],
    officialSupport: 'https://us.battle.net/support/'
  },
  'Red Alert 2': {
    developer: 'Westwood Studios',
    publisher: 'EA',
    releaseYear: 2000,
    engine: 'Westwood 2.5D Engine',
    platform: ['PC'],
    knownIssues: [
      'Speed too fast on modern PCs',
      'Black screen on Windows 10/11',
      'Origin version has additional issues'
    ],
    communityFixes: [
      'Use CnCNet client for online play',
      'Apply ts-ddraw or cnc-ddraw wrapper',
      'Run in Windows XP SP3 compatibility mode'
    ],
    officialSupport: 'https://www.ea.com/games/command-and-conquer'
  },
  'GTA San Andreas': {
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    releaseYear: 2004,
    engine: 'RenderWare',
    platform: ['PC', 'PlayStation', 'Xbox', 'Mobile'],
    knownIssues: [
      'Mouse not working properly',
      'Frame limiter issues',
      'Missing songs in newer versions'
    ],
    communityFixes: [
      'Apply SilentPatch for bug fixes',
      'Use Widescreen Fix for modern monitors',
      'Downgrade to version 1.0 for mods'
    ],
    officialSupport: 'https://support.rockstargames.com/'
  }
};

// ============ 内容生成模板 (多样化) ============
const introTemplates = [
  (game: string, dll: string, year: number) => 
    `If you're trying to launch **${game}** and getting the "${dll} is missing" error, you're not alone. This is one of the most common issues players face, especially on Windows 10 and 11. The good news? It's usually easy to fix.`,
  
  (game: string, dll: string, year: number) => 
    `The "${dll} was not found" error has been frustrating **${game}** players since its release in ${year}. This guide will walk you through every known solution, from the simplest fixes to advanced troubleshooting.`,
  
  (game: string, dll: string, year: number) => 
    `Can't play **${game}** because Windows says ${dll} is missing? Don't worry – this error looks scary but it's actually one of the easiest PC gaming problems to solve. Let me show you how.`,
  
  (game: string, dll: string, year: number) => 
    `Getting the "${dll} not found" error when launching **${game}**? This typically happens when Windows is missing a required runtime library. Here's exactly how to fix it in under 5 minutes.`,
  
  (game: string, dll: string, year: number) => 
    year < 2010 
      ? `**${game}** is a classic from ${year} that many players still enjoy today. Unfortunately, running older games on modern Windows can cause DLL errors like the "${dll} is missing" message. Here's how to get your favorite game working again.`
      : `**${game}** (${year}) requires certain Windows components to run properly. The "${dll} is missing" error means one of these components needs to be installed or repaired.`
];

const solutionVariants = {
  vcruntime: [
    {
      title: 'Install the Visual C++ Redistributable Package',
      steps: [
        'Download the official Microsoft Visual C++ 2015-2022 Redistributable from the link below',
        'Run vc_redist.x64.exe first, then run vc_redist.x86.exe',
        'Restart your computer after both installations complete',
        'Try launching the game again'
      ],
      note: 'You need BOTH the 64-bit and 32-bit versions, even on a 64-bit system. Many games include 32-bit components.'
    },
    {
      title: 'Repair Existing Visual C++ Installation',
      steps: [
        'Press Windows + R, type appwiz.cpl, press Enter',
        'Find "Microsoft Visual C++ 2015-2022 Redistributable" in the list',
        'Right-click it and select "Change" or "Repair"',
        'Follow the repair wizard and restart when done'
      ],
      note: 'If the repair option isn\'t available, uninstall it completely, restart, then reinstall fresh.'
    }
  ],
  directx: [
    {
      title: 'Install DirectX End-User Runtime',
      steps: [
        'Download the DirectX End-User Runtime Web Installer from Microsoft',
        'Run dxwebsetup.exe and follow the installation wizard',
        'The installer will download only the components you need',
        'Restart your computer and test the game'
      ],
      note: 'This package includes legacy DirectX 9 components that aren\'t in Windows 10/11 by default.'
    }
  ],
  steam: [
    {
      title: 'Verify Game Files Through Steam',
      steps: [
        'Open Steam and go to your Library',
        'Right-click the game and select "Properties"',
        'Go to "Local Files" tab',
        'Click "Verify integrity of game files"',
        'Wait for the process to complete (may take 10-30 minutes)',
        'Steam will automatically download any missing files'
      ],
      note: 'This is the safest way to fix missing game files without risking malware from third-party DLL download sites.'
    }
  ]
};

// ============ 高质量内容生成函数 ============
function generateHighQualityGuide(
  type: 'classic' | 'hot' | 'office' | 'system',
  itemName: string,
  dll: string,
  publishDate: string,
  itemData: any
): any {
  const slug = `fix-${dll.replace('.dll', '').replace('.exe', '').replace('.sys', '')}-${itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;
  
  const dllInfo = dllKnowledge[dll] || {
    fullName: dll.toUpperCase(),
    purpose: 'provides essential functionality for the application',
    commonCauses: ['Missing runtime package', 'Corrupted installation', 'Antivirus interference'],
    runtimePackage: 'Visual C++ Redistributable',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    additionalNotes: ''
  };
  
  const gameInfo = gameKnowledge[itemName];
  const year = itemData.year || 2020;
  
  // 随机选择介绍模板
  const introTemplate = introTemplates[Math.floor(Math.random() * introTemplates.length)];
  const intro = introTemplate(itemName, dll, year);
  
  // 构建独特的内容
  const sections = [];
  
  // 第1节：独特的错误解释
  sections.push({
    heading: `Understanding the ${dll} Error in ${itemName}`,
    content: `${intro}

### What is ${dll}?

**${dllInfo.fullName}** ${dllInfo.purpose}. ${itemName} needs this file to:

${type === 'classic' || type === 'hot' ? `
- Initialize the game engine properly
- Load textures, models, and audio files
- Handle memory management during gameplay
- Process graphics rendering commands
` : type === 'office' ? `
- Load application modules
- Handle document processing
- Manage memory for large files
- Enable add-ins and extensions
` : `
- Manage system services
- Handle hardware communication
- Process system events
- Maintain Windows stability
`}

### Why This Error Occurs

The "${dll} is missing" error in ${itemName} typically happens due to:

${dllInfo.commonCauses.map((cause, i) => `${i + 1}. **${cause}**`).join('\n')}

${dllInfo.additionalNotes}`
  });
  
  // 第2节：主要解决方案（根据 DLL 类型定制）
  const primarySolution = dll.includes('vcruntime') || dll.includes('msvcp') 
    ? solutionVariants.vcruntime[0]
    : dll.includes('d3dx') || dll.includes('d3d9') || dll.includes('d3d11')
    ? solutionVariants.directx[0]
    : solutionVariants.vcruntime[0];
  
  sections.push({
    heading: `Solution 1: ${primarySolution.title} (Recommended)`,
    content: `This method fixes the ${dll} error in ${itemName} for 90% of users:

${primarySolution.steps.map((step, i) => `**Step ${i + 1}**: ${step}`).join('\n\n')}

**Download Links:**
- [64-bit (x64) Version](${dllInfo.downloadUrl})
- [32-bit (x86) Version](${dllInfo.downloadUrl.replace('x64', 'x86')})

💡 **Important**: ${primarySolution.note}`
  });
  
  // 第3节：验证游戏文件（针对游戏）
  if (type === 'classic' || type === 'hot') {
    sections.push({
      heading: 'Solution 2: Verify and Repair Game Files',
      content: `Sometimes the ${dll} file exists but is corrupted. Here's how to verify your ${itemName} installation:

**For Steam Users:**
1. Open Steam → Library → Right-click ${itemName}
2. Select Properties → Local Files → Verify integrity of game files
3. Wait for verification to complete
4. Restart Steam and launch the game

**For Epic Games:**
1. Open Epic Games Launcher → Library
2. Click the three dots (...) next to ${itemName}
3. Select "Verify"

**For GOG Galaxy:**
1. Open GOG Galaxy → ${itemName}
2. Click Settings (gear icon) → Manage Installation
3. Select "Verify / Repair"

**For Physical/Other Copies:**
Consider reinstalling the game or checking the installation folder for corrupted files.`
    });
  }
  
  // 第4节：系统级修复
  sections.push({
    heading: type === 'classic' || type === 'hot' 
      ? 'Solution 3: Windows System Repair'
      : 'Solution 2: Windows System File Repair',
    content: `If the runtime installation doesn't work, Windows system files may be corrupted:

### Run System File Checker (SFC)
1. Press Windows + X → Select "Terminal (Admin)" or "Command Prompt (Admin)"
2. Type: \`sfc /scannow\`
3. Wait for the scan to complete (15-30 minutes)
4. Restart your computer

### Run DISM (if SFC finds issues)
If SFC reports issues it couldn't fix, run these commands:

\`\`\`
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

Then run \`sfc /scannow\` again.

### Check Windows Update
1. Press Windows + I → Update & Security → Windows Update
2. Click "Check for updates"
3. Install any pending updates
4. Restart and try ${itemName} again`
  });
  
  // 第5节：游戏特定修复（如果有专门知识）
  if (gameInfo && (type === 'classic' || type === 'hot')) {
    sections.push({
      heading: `${itemName}-Specific Fixes`,
      content: `${itemName} (${gameInfo.releaseYear}) by ${gameInfo.developer} has some known issues and community solutions:

### Known Issues
${gameInfo.knownIssues.map(issue => `- ${issue}`).join('\n')}

### Community-Recommended Fixes
${gameInfo.communityFixes.map((fix, i) => `${i + 1}. ${fix}`).join('\n')}

### Official Support
For additional help, visit: [${gameInfo.developer} Support](${gameInfo.officialSupport})`
    });
  }
  
  // 第6节：预防措施
  sections.push({
    heading: 'Preventing Future DLL Errors',
    content: `Once you've fixed the ${dll} error, here's how to prevent similar issues:

### Keep Runtimes Updated
- Install all Visual C++ Redistributable versions (2008, 2010, 2012, 2013, 2015-2022)
- Keep DirectX updated through Windows Update
- Install .NET Framework versions that games commonly need

### Maintain Your System
- Run Windows Update regularly
- Don't use "DLL fixer" or "Registry cleaner" software – they often cause more problems
- Keep your antivirus up to date but add game folders to exclusions if needed

### Before Installing New Games
- Check the game's system requirements
- Install required runtimes BEFORE installing the game
- Run the game's redistributable installers from the game folder (usually in a "_CommonRedist" or "Redist" subfolder)

### Create System Restore Points
Before installing major software or games:
1. Search "Create a restore point" in Windows
2. Click "Create" to make a restore point
3. If something goes wrong, you can easily roll back`
  });
  
  return {
    id: slug,
    slug,
    title: `Fix ${dll} Missing Error in ${itemName}`,
    metaTitle: `Fix ${dll} Missing Error in ${itemName} (${year}) - Complete Solution Guide`,
    metaDescription: `Solve the "${dll} is missing" error preventing ${itemName} from launching. Step-by-step fix guide with multiple solutions for Windows 10/11.`,
    excerpt: intro.substring(0, 200),
    category: type === 'classic' || type === 'hot' ? 'Gaming' : type === 'office' ? 'Software' : 'System',
    publishDate,
    updateDate: publishDate,
    author: 'DLL Fix Team',
    keywords: [
      `${dll} missing ${itemName.toLowerCase()}`,
      `${itemName} ${dll} error`,
      `${itemName} won't launch`,
      `fix ${itemName} dll error`,
      `${itemName} ${year} error fix`
    ],
    searchVolume: 'high',
    sections,
    relatedDlls: [dll],
    game: type === 'classic' || type === 'hot' ? itemName : undefined,
    software: type === 'office' ? itemName : undefined,
    year,
    contentType: type,
    wordCount: sections.reduce((acc, s) => acc + s.content.split(' ').length, 0)
  };
}

// ============ 测试生成 ============
function testGeneration() {
  const testGuide = generateHighQualityGuide(
    'hot',
    'Black Myth Wukong',
    'vcruntime140.dll',
    '2025-12-06',
    { year: 2024 }
  );
  
  console.log('=== 测试生成的高质量内容 ===');
  console.log('标题:', testGuide.title);
  console.log('字数:', testGuide.wordCount);
  console.log('\n各节标题:');
  testGuide.sections.forEach((s: any, i: number) => {
    console.log(`  ${i + 1}. ${s.heading}`);
  });
  console.log('\n第一节内容预览:');
  console.log(testGuide.sections[0].content.substring(0, 500) + '...');
}

// 导出函数
export { generateHighQualityGuide, dllKnowledge, gameKnowledge };

// 如果直接运行则测试
testGeneration();
