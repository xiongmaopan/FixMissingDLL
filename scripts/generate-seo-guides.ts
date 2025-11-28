/**
 * SEO 优化教程生成器
 * 基于 "DLL 文件名 + 热门游戏" 长尾关键词策略
 * 运行: npx tsx scripts/generate-seo-guides.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SEOGuide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Gaming' | 'Error Codes' | 'Installation' | 'System';
  publishDate: string;
  updateDate: string;
  author: string;
  keywords: string[];
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedDlls: string[];
}

// 热门游戏列表 (高搜索量)
const hotGames = [
  { name: 'Elden Ring', slug: 'elden-ring', publisher: 'FromSoftware' },
  { name: 'Black Myth: Wukong', slug: 'black-myth-wukong', publisher: 'Game Science' },
  { name: 'GTA V', slug: 'gta-5', publisher: 'Rockstar Games' },
  { name: 'Red Dead Redemption 2', slug: 'red-dead-redemption-2', publisher: 'Rockstar Games' },
  { name: 'Hogwarts Legacy', slug: 'hogwarts-legacy', publisher: 'Warner Bros' },
  { name: 'Cyberpunk 2077', slug: 'cyberpunk-2077', publisher: 'CD Projekt Red' },
  { name: 'Call of Duty: Modern Warfare', slug: 'call-of-duty-mw', publisher: 'Activision' },
  { name: 'Baldurs Gate 3', slug: 'baldurs-gate-3', publisher: 'Larian Studios' },
  { name: 'Starfield', slug: 'starfield', publisher: 'Bethesda' },
  { name: 'Diablo 4', slug: 'diablo-4', publisher: 'Blizzard' },
  { name: 'Fortnite', slug: 'fortnite', publisher: 'Epic Games' },
  { name: 'Valorant', slug: 'valorant', publisher: 'Riot Games' },
  { name: 'League of Legends', slug: 'league-of-legends', publisher: 'Riot Games' },
  { name: 'Minecraft', slug: 'minecraft', publisher: 'Mojang' },
  { name: 'The Witcher 3', slug: 'witcher-3', publisher: 'CD Projekt Red' },
  { name: 'Monster Hunter World', slug: 'monster-hunter-world', publisher: 'Capcom' },
  { name: 'Resident Evil 4 Remake', slug: 'resident-evil-4', publisher: 'Capcom' },
  { name: 'FIFA 24', slug: 'fifa-24', publisher: 'EA Sports' },
  { name: 'Apex Legends', slug: 'apex-legends', publisher: 'EA' },
  { name: 'PUBG', slug: 'pubg', publisher: 'Krafton' },
];

// 高搜索量 DLL + 场景组合
const dllScenarios = [
  {
    dll: 'XINPUT1_3.dll',
    games: ['Elden Ring', 'Dark Souls 3', 'GTA V', 'The Witcher 3'],
    cause: 'DirectX runtime component for Xbox controller support',
    solution: 'DirectX End-User Runtime',
    notes: 'Required for controller input in most PC games',
  },
  {
    dll: 'MSVCP140.dll',
    games: ['Photoshop', 'PUBG', 'Valorant', 'Fortnite', 'Black Myth: Wukong'],
    cause: 'Visual C++ 2015-2022 runtime library',
    solution: 'Visual C++ Redistributable',
    notes: 'One of the most common missing DLLs',
  },
  {
    dll: 'VCRUNTIME140.dll',
    games: ['Adobe Premiere', 'Discord', 'Steam games', 'Cyberpunk 2077'],
    cause: 'Visual C++ 2015-2022 runtime library',
    solution: 'Visual C++ Redistributable',
    notes: 'Often paired with MSVCP140.dll errors',
  },
  {
    dll: 'VCRUNTIME140_1.dll',
    games: ['Modern games', 'Python applications', 'Node.js apps'],
    cause: 'Visual C++ 2019/2022 runtime library update',
    solution: 'Visual C++ 2015-2022 Redistributable (latest)',
    notes: 'Newer version required by recent applications',
  },
  {
    dll: 'steam_api64.dll',
    games: ['All Steam games', 'Elden Ring', 'Baldurs Gate 3', 'Hogwarts Legacy'],
    cause: 'Steam client integration file',
    solution: 'Verify game files in Steam / Reinstall game',
    notes: 'Often flagged by antivirus in cracked games - restore from quarantine',
    isAntivirusRelated: true,
  },
  {
    dll: 'bink2w64.dll',
    games: ['Black Myth: Wukong', 'Call of Duty', 'Borderlands 3', 'Starfield'],
    cause: 'Bink Video codec for game cutscenes',
    solution: 'Verify game integrity / Reinstall',
    notes: 'Video decoder file - verify game files usually fixes this',
  },
  {
    dll: 'd3dx9_43.dll',
    games: ['Older games', 'League of Legends', 'World of Warcraft', 'Skyrim'],
    cause: 'DirectX 9.0c runtime component',
    solution: 'DirectX End-User Runtime',
    notes: 'Legacy DirectX component still used by many games',
  },
  {
    dll: 'XINPUT1_4.dll',
    games: ['Modern games', 'Elden Ring', 'Forza Horizon 5', 'Halo Infinite'],
    cause: 'Windows built-in Xbox controller support',
    solution: 'Windows Update / DirectX',
    notes: 'Included with Windows 8+, may need Windows update',
  },
  {
    dll: 'X3DAudio1_7.dll',
    games: ['GTA V', 'Battlefield', 'Far Cry series', 'Assassins Creed'],
    cause: 'DirectX 3D audio component',
    solution: 'DirectX End-User Runtime',
    notes: 'Required for 3D positional audio in games',
  },
  {
    dll: 'emp.dll',
    games: ['Red Dead Redemption 2'],
    cause: 'Game-specific DLL often flagged by Windows Defender',
    solution: 'Add game folder to Windows Defender exclusions',
    notes: 'Windows Defender false positive - add to whitelist',
    isAntivirusRelated: true,
  },
  {
    dll: 'PhysX3_x64.dll',
    games: ['Borderlands 3', 'Batman Arkham', 'Mafia series', 'Metro Exodus'],
    cause: 'NVIDIA PhysX physics engine',
    solution: 'NVIDIA PhysX System Software',
    notes: 'Required for physics simulations in certain games',
  },
  {
    dll: 'openal32.dll',
    games: ['Minecraft', 'Doom', 'Quake', 'Indie games'],
    cause: 'OpenAL audio library',
    solution: 'OpenAL Installer',
    notes: 'Cross-platform audio library used by many games',
  },
  {
    dll: 'vulkan-1.dll',
    games: ['Doom Eternal', 'Red Dead Redemption 2', 'Rainbow Six Siege'],
    cause: 'Vulkan graphics API runtime',
    solution: 'Update GPU drivers / Vulkan Runtime',
    notes: 'Modern graphics API - update your GPU drivers',
  },
  {
    dll: 'unarc.dll',
    games: ['Game installers', 'Repacks'],
    cause: 'Archive extraction library',
    solution: 'Memory/RAM issues or corrupted download',
    notes: 'Usually indicates corrupted installer or insufficient RAM',
    errorCode: '0xc000007b',
  },
  {
    dll: 'mfc140u.dll',
    games: ['Business applications', 'CAD software', 'Development tools'],
    cause: 'Microsoft Foundation Classes library',
    solution: 'Visual C++ Redistributable',
    notes: 'Part of Visual C++ runtime for MFC applications',
  },
];

function generateDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function generateGuideForDllAndGame(dll: string, game: typeof hotGames[0], scenario: typeof dllScenarios[0]): SEOGuide {
  const dllName = dll.replace('.dll', '');
  const date = generateDate();
  
  return {
    id: `fix-${dllName.toLowerCase()}-${game.slug}`,
    slug: `fix-${dllName.toLowerCase()}-missing-${game.slug}`,
    title: `How to Fix ${dll} Missing Error in ${game.name}`,
    metaTitle: `Fix ${dll} Missing in ${game.name} - Complete Guide (2025)`,
    metaDescription: `${dll} is missing error when launching ${game.name}? Here's how to fix it quickly. Step-by-step solutions that actually work.`,
    excerpt: `Getting "${dll} was not found" when trying to play ${game.name}? **Don't panic!** This is a common error with easy fixes.`,
    category: 'Gaming',
    publishDate: date,
    updateDate: date,
    author: 'FixMissingDLL Team',
    keywords: [
      `${dll} missing ${game.name}`,
      `${game.name} ${dll} error`,
      `${game.name} won't start ${dll}`,
      `fix ${dll} ${game.slug}`,
      `${dll} not found`,
      `${game.name} dll error`,
    ],
    sections: [
      {
        heading: `Why is ${dll} Missing in ${game.name}?`,
        content: `When you see the error **"${dll} was not found"** while trying to launch ${game.name}, it means ${scenario.cause}.

**Common causes for this error:**

1. **Incomplete Installation**: ${game.name} installation was interrupted or incomplete.
2. **Antivirus Interference**: Your antivirus software may have quarantined the file.${scenario.isAntivirusRelated ? ' **This is very likely the cause!**' : ''}
3. **Corrupted Runtime Libraries**: The required runtime (${scenario.solution}) is missing or damaged.
4. **Windows Update Issues**: A recent Windows update may have affected system files.
5. **Manual DLL Deletion**: The file was accidentally deleted or moved.

${scenario.notes ? `**Important Note**: ${scenario.notes}` : ''}`
      },
      {
        heading: 'Solution 1: Install Official Runtime Libraries (Recommended)',
        content: `This is the **safest and most effective** solution. ${scenario.solution} provides the official, clean version of ${dll}.

**Step 1**: Download the official installer:
${scenario.solution.includes('Visual C++') ? `
- [Visual C++ 2015-2022 Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 Redistributable (x86)](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 2**: Install **BOTH** x64 and x86 versions (yes, even on 64-bit Windows).
` : scenario.solution.includes('DirectX') ? `
- [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)

**Step 2**: Run the installer and follow the prompts.
` : scenario.solution.includes('PhysX') ? `
- [NVIDIA PhysX System Software](https://www.nvidia.com/en-us/drivers/physx/physx-9-19-0218-driver/)

**Step 2**: Run the installer.
` : `
Follow the instructions for ${scenario.solution}.
`}
**Step 3**: Restart your computer.

**Step 4**: Try launching ${game.name} again.`
      },
      {
        heading: 'Solution 2: Download and Replace the DLL File (Quick Fix)',
        content: `If reinstalling runtime libraries doesn't work, you can download ${dll} directly.

**You can download the original, clean version of ${dll} directly from the search bar at the top of this page on FixMissingDLL.com.**

**After downloading:**

**Step 1**: Extract the downloaded file.

**Step 2**: Copy ${dll} to these locations:
- For 64-bit DLL: \`C:\\Windows\\System32\\${dll}\`
- For 32-bit DLL: \`C:\\Windows\\SysWOW64\\${dll}\`
- Also copy to: \`[${game.name} installation folder]\`

**Step 3**: Register the DLL (open CMD as Administrator):
\`\`\`
regsvr32 ${dll}
\`\`\`

**Step 4**: Restart your computer and try ${game.name} again.`
      },
      scenario.isAntivirusRelated ? {
        heading: 'Solution 3: Check Your Antivirus Quarantine',
        content: `**This is likely your issue!** Antivirus software often flags game files as false positives.

**For Windows Defender:**

**Step 1**: Open Windows Security → Virus & threat protection.

**Step 2**: Click "Protection history".

**Step 3**: Look for ${dll} in the list of quarantined items.

**Step 4**: Select it and click "Restore".

**Step 5**: Add an exclusion for your ${game.name} folder:
- Go to Virus & threat protection settings
- Scroll to Exclusions → Add or remove exclusions
- Add folder: \`C:\\Program Files\\${game.publisher}\\${game.name}\` (or wherever your game is installed)

**For other antivirus software**: Check the quarantine/vault section and restore the file, then add the game folder to exceptions.`
      } : {
        heading: 'Solution 3: Verify Game Files',
        content: `If you installed ${game.name} through a game launcher, verify the game files.

**For Steam:**
1. Open Steam Library
2. Right-click ${game.name} → Properties
3. Go to "Installed Files" tab
4. Click "Verify integrity of game files"

**For Epic Games:**
1. Open Epic Games Library
2. Click the three dots on ${game.name}
3. Select "Verify"

**For GOG Galaxy:**
1. Select ${game.name} in your library
2. Click the settings icon
3. Choose "Manage installation" → "Verify / Repair"

This will re-download any missing or corrupted files including ${dll}.`
      },
      {
        heading: 'Solution 4: Run System File Checker (Advanced)',
        content: `If the above solutions don't work, your Windows system files may be corrupted.

**Step 1**: Open Command Prompt as Administrator
- Press \`Win + X\`
- Select "Terminal (Admin)" or "Command Prompt (Admin)"

**Step 2**: Run System File Checker:
\`\`\`
sfc /scannow
\`\`\`
Wait 10-15 minutes for the scan to complete.

**Step 3**: If issues are found, run DISM:
\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

**Step 4**: Restart your computer and try ${game.name} again.`
      },
    ],
    faq: [
      {
        question: `Why does ${game.name} say ${dll} is missing?`,
        answer: `${game.name} requires ${dll} to run properly. This file is part of ${scenario.solution}. The error appears when this file is missing, corrupted, or blocked by antivirus software.`,
      },
      {
        question: `Is it safe to download ${dll} from the internet?`,
        answer: `Yes, but ONLY from trusted sources like FixMissingDLL.com. We provide original, clean DLL files. However, the safest method is always to install the official ${scenario.solution} from Microsoft.`,
      },
      {
        question: `Will reinstalling ${game.name} fix the ${dll} error?`,
        answer: `Sometimes, but not always. If the error is caused by missing runtime libraries (Visual C++, DirectX), reinstalling the game won't help. First try installing the required runtimes, then reinstall the game if needed.`,
      },
    ],
    relatedDlls: [dll.toLowerCase()],
  };
}

function generateStandaloneGuide(scenario: typeof dllScenarios[0]): SEOGuide {
  const dll = scenario.dll;
  const dllName = dll.replace('.dll', '');
  const date = generateDate();
  
  return {
    id: `fix-${dllName.toLowerCase()}-missing`,
    slug: `fix-${dllName.toLowerCase()}-missing-error`,
    title: `How to Fix ${dll} Missing Error - Complete Guide`,
    metaTitle: `Fix ${dll} Missing Error in Windows 11/10 (2025 Guide)`,
    metaDescription: `${dll} is missing or not found? Complete guide to fix this error for ${scenario.games.slice(0, 3).join(', ')} and more. Safe solutions that work.`,
    excerpt: `The "${dll} was not found" error is preventing your application from starting? **Don't worry!** This comprehensive guide will help you fix it.`,
    category: 'Error Codes',
    publishDate: date,
    updateDate: date,
    author: 'FixMissingDLL Team',
    keywords: [
      `${dll} missing`,
      `${dll} not found`,
      `${dll} download`,
      `fix ${dll}`,
      `${dllName} error`,
      ...scenario.games.map(g => `${dll} ${g}`),
    ],
    sections: [
      {
        heading: `What is ${dll}?`,
        content: `**${dll}** is ${scenario.cause}. It is commonly required by:

${scenario.games.map(g => `- ${g}`).join('\n')}

When this file is missing, you'll see errors like:
- "The program can't start because ${dll} is missing"
- "${dll} was not found"
- "The code execution cannot proceed because ${dll} was not found"

${scenario.notes ? `**Note**: ${scenario.notes}` : ''}`
      },
      {
        heading: 'Solution 1: Install Official Runtime (Recommended)',
        content: `The safest fix is to install ${scenario.solution}:

${scenario.solution.includes('Visual C++') ? `
**Download links:**
- [Visual C++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)

Install BOTH versions, then restart your computer.
` : scenario.solution.includes('DirectX') ? `
**Download:**
- [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)

Run the installer and restart your computer.
` : `
Download and install ${scenario.solution} from the official source.
`}`
      },
      {
        heading: 'Solution 2: Download the DLL File',
        content: `**You can download the original, clean version of ${dll} directly from the search bar at the top of this page on FixMissingDLL.com.**

**Installation steps:**
1. Download and extract ${dll}
2. Copy to \`C:\\Windows\\System32\\\` (64-bit) or \`C:\\Windows\\SysWOW64\\\` (32-bit)
3. Also copy to your application folder
4. Open CMD as Admin and run: \`regsvr32 ${dll}\`
5. Restart your computer`
      },
      {
        heading: 'Solution 3: System File Checker',
        content: `Run these commands in Administrator Command Prompt:

\`\`\`
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

Restart after completion.`
      },
    ],
    faq: [
      {
        question: `What causes ${dll} missing error?`,
        answer: `Common causes include: incomplete software installation, corrupted ${scenario.solution}, antivirus quarantine, or Windows update issues.`,
      },
      {
        question: `Where should I place ${dll}?`,
        answer: `Copy to C:\\Windows\\System32 for 64-bit systems, C:\\Windows\\SysWOW64 for 32-bit applications, and the application's installation folder.`,
      },
      {
        question: `Is ${dll} a virus?`,
        answer: `No, ${dll} is a legitimate ${scenario.cause}. However, always download from trusted sources to avoid malware.`,
      },
    ],
    relatedDlls: [dll.toLowerCase()],
  };
}

function generateAllGuides(): SEOGuide[] {
  const guides: SEOGuide[] = [];
  
  // 1. 为每个 DLL+游戏 组合生成教程
  for (const scenario of dllScenarios) {
    // 生成通用教程
    guides.push(generateStandaloneGuide(scenario));
    
    // 为每个关联游戏生成专门教程
    for (const gameName of scenario.games.slice(0, 3)) { // 限制每个 DLL 最多 3 个游戏教程
      const game = hotGames.find(g => g.name === gameName);
      if (game) {
        guides.push(generateGuideForDllAndGame(scenario.dll, game, scenario));
      }
    }
  }
  
  return guides;
}

function main() {
  console.log('🚀 Generating SEO-optimized guides...\n');
  
  const guides = generateAllGuides();
  
  console.log(`✅ Generated ${guides.length} guides:`);
  console.log(`   - ${dllScenarios.length} standalone DLL guides`);
  console.log(`   - ${guides.length - dllScenarios.length} game-specific guides`);
  
  // 保存到 JSON
  const outputPath = path.join(__dirname, '../src/data/seo-guides.json');
  fs.writeFileSync(outputPath, JSON.stringify(guides, null, 2));
  console.log(`\n📁 Saved to: ${outputPath}`);
  
  // 生成文章标题列表预览
  console.log('\n📝 Generated articles preview:');
  guides.slice(0, 10).forEach(g => {
    console.log(`   - ${g.title}`);
  });
  console.log(`   ... and ${guides.length - 10} more`);
}

main();
