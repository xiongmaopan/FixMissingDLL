/**
 * 定时发布内容脚本 - Google SEO 最佳实践
 * 
 * 策略来自 wenzhang.txt:
 * - 每天发布 1-2 篇高质量教程
 * - 使用 "DLL + 热门游戏" 长尾关键词
 * - 遵循 E-E-A-T 原则 (专业性、经验、权威性、可信度)
 * 
 * 运行: npx tsx scripts/publish-scheduled-content.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ScheduledGuide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Gaming' | 'Error Codes' | 'Software' | 'System';
  publishDate: string;
  updateDate: string;
  author: string;
  keywords: string[];
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedDlls: string[];
  published: boolean;
}

interface ContentQueue {
  lastPublishDate: string;
  publishedCount: number;
  queue: ScheduledGuide[];
}

// ============ 2025 最新热门游戏 + DLL 组合 ============
const hotGames2025 = [
  // 2025 新游戏
  { name: 'GTA 6', slug: 'gta-6', publisher: 'Rockstar Games' },
  { name: 'Monster Hunter Wilds', slug: 'monster-hunter-wilds', publisher: 'Capcom' },
  { name: 'Assassins Creed Shadows', slug: 'assassins-creed-shadows', publisher: 'Ubisoft' },
  { name: 'Death Stranding 2', slug: 'death-stranding-2', publisher: 'Kojima Productions' },
  { name: 'Ghost of Yotei', slug: 'ghost-of-yotei', publisher: 'Sucker Punch' },
  { name: 'Fable', slug: 'fable-2025', publisher: 'Xbox Game Studios' },
  { name: 'Avowed', slug: 'avowed', publisher: 'Xbox Game Studios' },
  { name: 'Indiana Jones Great Circle', slug: 'indiana-jones-great-circle', publisher: 'Bethesda' },
  { name: 'Civilization 7', slug: 'civilization-7', publisher: '2K Games' },
  
  // 2024 热门 (持续高搜索量)
  { name: 'Black Myth: Wukong', slug: 'black-myth-wukong', publisher: 'Game Science' },
  { name: 'Elden Ring Shadow of the Erdtree', slug: 'elden-ring-dlc', publisher: 'FromSoftware' },
  { name: 'Stalker 2', slug: 'stalker-2', publisher: 'GSC Game World' },
  { name: 'Dragon Age The Veilguard', slug: 'dragon-age-veilguard', publisher: 'EA' },
  { name: 'Silent Hill 2 Remake', slug: 'silent-hill-2-remake', publisher: 'Konami' },
  { name: 'Space Marine 2', slug: 'space-marine-2', publisher: 'Focus Entertainment' },
  { name: 'Helldivers 2', slug: 'helldivers-2', publisher: 'PlayStation' },
  { name: 'Palworld', slug: 'palworld', publisher: 'Pocketpair' },
  { name: 'Manor Lords', slug: 'manor-lords', publisher: 'Hooded Horse' },
  
  // 常青热门游戏
  { name: 'Elden Ring', slug: 'elden-ring', publisher: 'FromSoftware' },
  { name: 'Baldurs Gate 3', slug: 'baldurs-gate-3', publisher: 'Larian Studios' },
  { name: 'GTA V', slug: 'gta-5', publisher: 'Rockstar Games' },
  { name: 'Hogwarts Legacy', slug: 'hogwarts-legacy', publisher: 'Warner Bros' },
  { name: 'Cyberpunk 2077', slug: 'cyberpunk-2077', publisher: 'CD Projekt Red' },
  { name: 'Red Dead Redemption 2', slug: 'red-dead-redemption-2', publisher: 'Rockstar Games' },
  { name: 'Valorant', slug: 'valorant', publisher: 'Riot Games' },
  { name: 'Fortnite', slug: 'fortnite', publisher: 'Epic Games' },
  { name: 'League of Legends', slug: 'league-of-legends', publisher: 'Riot Games' },
  { name: 'Call of Duty Modern Warfare 3', slug: 'cod-mw3', publisher: 'Activision' },
];

// 高搜索量 DLL 问题场景
const dllScenarios = [
  {
    dll: 'MSVCP140.dll',
    cause: 'Visual C++ 2015-2022 runtime library',
    solution: 'Visual C++ Redistributable',
    notes: 'Most common missing DLL error - affects almost all modern games',
  },
  {
    dll: 'VCRUNTIME140.dll',
    cause: 'Visual C++ 2015-2022 runtime library',
    solution: 'Visual C++ Redistributable',
    notes: 'Often paired with MSVCP140.dll errors',
  },
  {
    dll: 'VCRUNTIME140_1.dll',
    cause: 'Visual C++ 2019/2022 runtime update',
    solution: 'Latest Visual C++ 2015-2022 Redistributable',
    notes: 'Required by newer applications built with Visual Studio 2019+',
  },
  {
    dll: 'XINPUT1_3.dll',
    cause: 'DirectX runtime component for Xbox controller support',
    solution: 'DirectX End-User Runtime',
    notes: 'Required for controller input in most PC games',
  },
  {
    dll: 'XINPUT1_4.dll',
    cause: 'Windows built-in Xbox controller support',
    solution: 'Windows Update / DirectX',
    notes: 'Included with Windows 8+, may need Windows update',
  },
  {
    dll: 'd3dx9_43.dll',
    cause: 'DirectX 9.0c runtime component',
    solution: 'DirectX End-User Runtime',
    notes: 'Legacy DirectX component still used by many games',
  },
  {
    dll: 'steam_api64.dll',
    cause: 'Steam client integration file',
    solution: 'Verify game files in Steam / Reinstall game',
    notes: 'Often flagged by antivirus in cracked games - restore from quarantine',
    isAntivirusRelated: true,
  },
  {
    dll: 'bink2w64.dll',
    cause: 'Bink Video codec for game cutscenes',
    solution: 'Verify game integrity / Reinstall',
    notes: 'Video decoder file - verify game files usually fixes this',
  },
  {
    dll: 'vulkan-1.dll',
    cause: 'Vulkan graphics API runtime',
    solution: 'Update GPU drivers / Vulkan Runtime',
    notes: 'Modern graphics API - update your GPU drivers',
  },
  {
    dll: 'X3DAudio1_7.dll',
    cause: 'DirectX 3D audio component',
    solution: 'DirectX End-User Runtime',
    notes: 'Required for 3D positional audio in games',
  },
  {
    dll: 'dxgi.dll',
    cause: 'DirectX Graphics Infrastructure',
    solution: 'Windows Update / Reinstall DirectX',
    notes: 'Core DirectX component - usually requires Windows repair',
  },
  {
    dll: 'd3d11.dll',
    cause: 'DirectX 11 runtime',
    solution: 'Windows Update / Graphics driver update',
    notes: 'Part of Windows - reinstalling graphics drivers usually helps',
  },
  {
    dll: 'd3d12.dll',
    cause: 'DirectX 12 runtime',
    solution: 'Windows Update (Windows 10/11 only)',
    notes: 'DirectX 12 is only available on Windows 10+',
  },
  {
    dll: 'PhysX3_x64.dll',
    cause: 'NVIDIA PhysX physics engine',
    solution: 'NVIDIA PhysX System Software',
    notes: 'Required for physics simulations in certain games',
  },
  {
    dll: 'openal32.dll',
    cause: 'OpenAL audio library',
    solution: 'OpenAL Installer',
    notes: 'Cross-platform audio library used by many games',
  },
];

function generateGuide(dll: typeof dllScenarios[0], game: typeof hotGames2025[0]): ScheduledGuide {
  const dllName = dll.dll.replace('.dll', '');
  const today = new Date().toISOString().split('T')[0];
  
  const vcRedistLinks = dll.solution.includes('Visual C++') ? `
- [Visual C++ 2015-2022 Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 Redistributable (x86)](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 2**: Install **BOTH** x64 and x86 versions (yes, even on 64-bit Windows).` : dll.solution.includes('DirectX') ? `
- [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)

**Step 2**: Run the installer and follow the prompts.` : `
Visit the official download page for ${dll.solution}.

**Step 2**: Install the runtime package.`;

  return {
    id: `fix-${dllName.toLowerCase()}-${game.slug}`,
    slug: `fix-${dllName.toLowerCase()}-missing-${game.slug}`,
    title: `How to Fix ${dll.dll} Missing Error in ${game.name}`,
    metaTitle: `Fix ${dll.dll} Missing in ${game.name} - Complete Guide (2025)`,
    metaDescription: `Getting "${dll.dll} was not found" when launching ${game.name}? Here's how to fix it quickly. Safe, tested solutions that actually work.`,
    excerpt: `Getting **"${dll.dll} was not found"** when trying to play ${game.name}? **Don't Panic!** This is one of the most common PC gaming errors and it's easy to fix.`,
    category: 'Gaming',
    publishDate: today,
    updateDate: today,
    author: 'FixMissingDLL Team',
    keywords: [
      `${dll.dll} missing ${game.name}`,
      `${game.name} ${dll.dll} error`,
      `${game.name} won't start`,
      `fix ${dll.dll} ${game.slug}`,
      `${dll.dll} not found`,
      `${game.name} dll error`,
      `${game.name} crash fix`,
    ],
    sections: [
      {
        heading: `Why is ${dll.dll} Missing in ${game.name}?`,
        content: `When you see the error **"The code execution cannot proceed because ${dll.dll} was not found"** while trying to launch ${game.name}, it typically means ${dll.cause}.

**Don't panic!** This is an extremely common error that affects thousands of ${game.name} players. The good news is that it's usually very easy to fix.

**Common causes for this error in ${game.name}:**

1. **Incomplete Installation**: ${game.name} installation was interrupted or incomplete.
2. **Antivirus Interference**: Your antivirus software may have quarantined the file.${dll.isAntivirusRelated ? ' **This is very likely the cause!**' : ''}
3. **Missing Runtime Libraries**: The required runtime (${dll.solution}) is not installed on your system.
4. **Windows Update Issues**: A recent Windows update may have affected system files.
5. **Corrupted Game Files**: The game files were corrupted during download or update.

${dll.notes ? `**Important Note for ${game.name}**: ${dll.notes}` : ''}`
      },
      {
        heading: 'Solution 1: Install Official Runtime Libraries (Recommended)',
        content: `This is the **safest and most effective** solution recommended by Microsoft and ${game.publisher}. Installing ${dll.solution} provides the official, digitally-signed version of ${dll.dll}.

**Step 1**: Download the official installer:
${vcRedistLinks}

**Step 3**: Restart your computer.

**Step 4**: Try launching ${game.name} again.

**Why this works**: ${game.name}, like most modern PC games, is built using Microsoft's development tools which require these runtime libraries. Installing them provides all the necessary DLL files in one package.`
      },
      {
        heading: 'Solution 2: Download and Replace the DLL File (Quick Fix)',
        content: `If installing runtime libraries doesn't work, or if you need a quick fix, you can download ${dll.dll} directly.

**You can download the original, clean version of ${dll.dll} directly from the search bar at the top of this page on FixMissingDLL.com.**

We provide safe, verified DLL files that are scanned for malware.

**After downloading:**

**Step 1**: Extract the downloaded ${dll.dll} file.

**Step 2**: Copy ${dll.dll} to these locations:
- For 64-bit games: \`C:\\Windows\\System32\\${dll.dll}\`
- For 32-bit games: \`C:\\Windows\\SysWOW64\\${dll.dll}\`
- Also copy to: \`[${game.name} installation folder]\`

**Step 3**: Register the DLL (open CMD as Administrator):
\`\`\`
regsvr32 ${dll.dll}
\`\`\`

**Step 4**: Restart your computer and try ${game.name} again.

**Pro Tip**: If you're not sure where ${game.name} is installed, right-click on the game in Steam/Epic and select "Browse Local Files".`
      },
      dll.isAntivirusRelated ? {
        heading: 'Solution 3: Check Your Antivirus Quarantine',
        content: `**This is very likely your issue with ${game.name}!** Antivirus software often incorrectly flags game files as threats.

**For Windows Defender:**

**Step 1**: Open Windows Security → Virus & threat protection.

**Step 2**: Click "Protection history".

**Step 3**: Look for ${dll.dll} or any ${game.name} files in the quarantine list.

**Step 4**: Select the file and click "Restore".

**Step 5**: Add an exclusion for your ${game.name} folder:
- Go to Virus & threat protection settings
- Scroll to "Exclusions" → Add or remove exclusions
- Click "Add an exclusion" → Folder
- Select your ${game.name} installation directory

**For other antivirus software**: Check the quarantine/vault section and restore any ${game.name} files, then add the game folder to exceptions.

**Note**: This is a false positive. ${dll.dll} is a legitimate file used by ${game.name} for ${dll.cause}.`
      } : {
        heading: 'Solution 3: Verify Game Files',
        content: `If you installed ${game.name} through a game launcher like Steam, Epic Games, or GOG, you can verify the game files to automatically fix missing or corrupted files.

**For Steam:**
1. Open your Steam Library
2. Right-click **${game.name}** → Properties
3. Go to the "Installed Files" tab
4. Click "Verify integrity of game files"
5. Wait for the process to complete (may take 5-30 minutes)

**For Epic Games:**
1. Open Epic Games Library
2. Click the three dots (⋯) on ${game.name}
3. Select "Manage"
4. Click "Verify"

**For GOG Galaxy:**
1. Select ${game.name} in your library
2. Click the settings icon (⚙️)
3. Choose "Manage installation" → "Verify / Repair"

This process will scan all game files and re-download any missing or corrupted files, including ${dll.dll}.`
      },
      {
        heading: 'Solution 4: Run System File Checker (Advanced)',
        content: `If none of the above solutions work, your Windows system files may be corrupted. This is an advanced solution but can fix stubborn ${dll.dll} errors.

**Step 1**: Open Command Prompt as Administrator
- Press \`Win + X\`
- Select "Terminal (Admin)" or "Command Prompt (Admin)"
- Click "Yes" when prompted

**Step 2**: Run System File Checker:
\`\`\`
sfc /scannow
\`\`\`
Wait 10-15 minutes for the scan to complete. Do not interrupt this process.

**Step 3**: If SFC finds issues, run DISM:
\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`
This may take 20-30 minutes.

**Step 4**: Restart your computer.

**Step 5**: Try launching ${game.name} again.

If issues were found and repaired, this should resolve the ${dll.dll} error.`
      },
    ],
    faq: [
      {
        question: `Why does ${game.name} say ${dll.dll} is missing?`,
        answer: `${game.name} requires ${dll.dll} to run properly. This file is part of ${dll.solution}. The error appears when this file is missing, corrupted, or blocked by antivirus software. It's one of the most common PC gaming errors.`,
      },
      {
        question: `Is it safe to download ${dll.dll} from the internet?`,
        answer: `Only download DLL files from trusted sources like FixMissingDLL.com. We provide original, verified DLL files that are scanned for malware. However, the safest method is always to install the official ${dll.solution} from Microsoft.`,
      },
      {
        question: `Will reinstalling ${game.name} fix the ${dll.dll} error?`,
        answer: `Sometimes, but not always. If the error is caused by missing runtime libraries (Visual C++, DirectX), reinstalling the game won't help because the runtime is a separate Windows component. Try installing the runtimes first (Solution 1), then reinstall the game only if needed.`,
      },
      {
        question: `I installed the runtime but ${game.name} still shows the ${dll.dll} error?`,
        answer: `Make sure you installed BOTH x64 and x86 versions of the runtime. Also try restarting your computer after installation. If the error persists, try Solution 2 (manual DLL download) or Solution 3 (verify game files).`,
      },
    ],
    relatedDlls: [dll.dll.toLowerCase()],
    published: false,
  };
}

function loadContentQueue(): ContentQueue {
  const queuePath = path.join(__dirname, '../src/data/scheduled-guides.json');
  
  if (fs.existsSync(queuePath)) {
    const data = fs.readFileSync(queuePath, 'utf-8');
    return JSON.parse(data);
  }
  
  // 如果不存在，创建新的队列
  return {
    lastPublishDate: '',
    publishedCount: 0,
    queue: [],
  };
}

function saveContentQueue(queue: ContentQueue): void {
  const queuePath = path.join(__dirname, '../src/data/scheduled-guides.json');
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

function generateContentQueue(): ScheduledGuide[] {
  const guides: ScheduledGuide[] = [];
  
  // 为每个游戏生成 2-3 个 DLL 教程
  for (const game of hotGames2025) {
    // 随机选择 2-3 个 DLL 问题
    const shuffledDlls = [...dllScenarios].sort(() => Math.random() - 0.5);
    const selectedDlls = shuffledDlls.slice(0, Math.floor(Math.random() * 2) + 2);
    
    for (const dll of selectedDlls) {
      guides.push(generateGuide(dll, game));
    }
  }
  
  return guides;
}

function publishDailyContent(count: number = 2): void {
  const queue = loadContentQueue();
  const today = new Date().toISOString().split('T')[0];
  
  // 如果队列为空或需要补充，生成新内容
  const unpublished = queue.queue.filter(g => !g.published);
  if (unpublished.length < 10) {
    console.log('📦 Generating new content queue...');
    const newGuides = generateContentQueue();
    
    // 避免重复
    const existingIds = new Set(queue.queue.map(g => g.id));
    const uniqueNewGuides = newGuides.filter(g => !existingIds.has(g.id));
    
    queue.queue.push(...uniqueNewGuides);
    console.log(`✅ Added ${uniqueNewGuides.length} new guides to queue`);
  }
  
  // 发布今天的内容
  let publishedToday = 0;
  const toPublish: ScheduledGuide[] = [];
  
  for (const guide of queue.queue) {
    if (!guide.published && publishedToday < count) {
      guide.published = true;
      guide.publishDate = today;
      guide.updateDate = today;
      toPublish.push(guide);
      publishedToday++;
    }
  }
  
  if (publishedToday > 0) {
    queue.lastPublishDate = today;
    queue.publishedCount += publishedToday;
    saveContentQueue(queue);
    
    // 更新 auto-generated-guides.json
    const guidesPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
    let existingGuides: any[] = [];
    if (fs.existsSync(guidesPath)) {
      existingGuides = JSON.parse(fs.readFileSync(guidesPath, 'utf-8'));
    }
    
    // 添加新发布的指南 (移除 published 字段)
    const cleanGuides = toPublish.map(({ published, ...rest }) => rest);
    existingGuides.push(...cleanGuides);
    
    fs.writeFileSync(guidesPath, JSON.stringify(existingGuides, null, 2));
    
    console.log(`\n🎉 Published ${publishedToday} guides today (${today}):`);
    toPublish.forEach(g => {
      console.log(`   - ${g.title}`);
    });
    console.log(`\n📊 Total published: ${queue.publishedCount}`);
    console.log(`📚 Remaining in queue: ${queue.queue.filter(g => !g.published).length}`);
  } else {
    console.log('ℹ️ No new content to publish');
  }
}

// 运行
console.log('🚀 Daily Content Publishing Script');
console.log('===================================\n');

publishDailyContent(2); // 每天发布 2 篇
