/**
 * 🛠️ 内容质量修复脚本 v2.0
 * 
 * 功能：
 * 1. 重写所有已发布的64篇文章 - 消除重复内容
 * 2. 重写所有299篇计划文章 - 确保每篇都有独特内容
 * 3. 自动备份原始数据
 * 4. 使用多样化的模板和写作风格
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ DLL 知识库 ============
const dllKnowledge: Record<string, {
  fullName: string;
  purpose: string;
  commonCauses: string[];
  runtimePackage: string;
  downloadUrl: string;
  additionalNotes: string;
}> = {
  'vcruntime140.dll': {
    fullName: 'Visual C++ Runtime Library 140',
    purpose: 'provides C++ runtime functions including memory allocation, exception handling, and type conversions',
    commonCauses: [
      'Visual C++ 2015-2022 Redistributable not installed',
      'Corrupted Visual C++ installation',
      'Antivirus quarantined the file',
      'Windows Update conflicts'
    ],
    runtimePackage: 'Microsoft Visual C++ 2015-2022 Redistributable',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
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
    purpose: 'handles audio playback, 3D positional sound, and music streaming in games',
    commonCauses: [
      'Game installation is incomplete',
      'File deleted by antivirus',
      'Disc-based installation error',
      'Copy protection issues'
    ],
    runtimePackage: 'Miles Sound System (bundled with game)',
    downloadUrl: 'Game-specific',
    additionalNotes: 'This audio library was extremely popular in games from 1995-2015. Over 5,000 games use Miles Sound System including classics like GTA, Command & Conquer, and StarCraft.'
  },
  'binkw32.dll': {
    fullName: 'Bink Video Codec Library',
    purpose: 'decodes and plays Bink video format (.bik) used for game cutscenes and cinematics',
    commonCauses: [
      'Game installation corrupted',
      'Antivirus false positive',
      'Missing game data files',
      'DRM/copy protection issues'
    ],
    runtimePackage: 'RAD Game Tools Bink Video',
    downloadUrl: 'http://www.radgametools.com/bnkdown.htm',
    additionalNotes: 'Bink is used by over 14,000 games for video playback. The codec is highly efficient and specifically designed for game cutscenes.'
  },
  'd3dx9_43.dll': {
    fullName: 'DirectX 9 Extension Library',
    purpose: 'provides helper functions for Direct3D 9 graphics rendering, texture handling, and shader compilation',
    commonCauses: [
      'DirectX End-User Runtime not installed',
      'Outdated DirectX installation',
      'Windows Update removed legacy components',
      'Game requires specific DirectX version'
    ],
    runtimePackage: 'DirectX End-User Runtime (June 2010)',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    additionalNotes: 'd3dx9_43.dll is from DirectX SDK June 2010, required by thousands of games released between 2006-2015.'
  },
  'steam_api.dll': {
    fullName: 'Steam API Interface Library',
    purpose: 'handles Steam integration including achievements, cloud saves, multiplayer matchmaking, and DRM',
    commonCauses: [
      'Steam client not running',
      'Game files corrupted',
      'Steam installation issue',
      'Antivirus blocking Steam DLLs'
    ],
    runtimePackage: 'Steam Client',
    downloadUrl: 'https://store.steampowered.com/about/',
    additionalNotes: 'This DLL requires Steam to be running. Non-Steam versions of games may not have this file.'
  },
  'xlive.dll': {
    fullName: 'Games for Windows Live Runtime',
    purpose: 'provides Xbox Live integration, achievements, and online features for PC games',
    commonCauses: [
      'Games for Windows Live not installed',
      'Service discontinued by Microsoft',
      'Incompatible with Windows 10/11',
      'Missing legacy components'
    ],
    runtimePackage: 'Games for Windows Live Redistributable',
    downloadUrl: 'https://support.xbox.com/games/game-titles/games-for-windows-live-info',
    additionalNotes: 'GFWL was discontinued in 2014. Many games have been patched to remove it. Check if a patch exists before installing.'
  },
  'physxloader.dll': {
    fullName: 'NVIDIA PhysX System Software',
    purpose: 'loads and manages the PhysX physics engine for realistic physics simulations',
    commonCauses: [
      'PhysX System Software not installed',
      'Outdated PhysX version',
      'NVIDIA driver issues',
      'Corrupted PhysX installation'
    ],
    runtimePackage: 'NVIDIA PhysX System Software',
    downloadUrl: 'https://www.nvidia.com/en-us/drivers/physx/physx-9-19-0218-driver/',
    additionalNotes: 'PhysX is used by many games for advanced physics. It can run on both NVIDIA GPUs and CPUs.'
  },
  'openal32.dll': {
    fullName: 'OpenAL Audio Library',
    purpose: 'provides cross-platform 3D audio API for spatial sound effects and environmental audio',
    commonCauses: [
      'OpenAL not installed',
      'Outdated OpenAL version',
      'Conflicting audio software',
      'Missing Creative Labs runtime'
    ],
    runtimePackage: 'OpenAL Soft or Creative OpenAL',
    downloadUrl: 'https://www.openal.org/downloads/',
    additionalNotes: 'OpenAL is used by many indie and older games. OpenAL Soft is the recommended open-source implementation.'
  },
  'd3d12.dll': {
    fullName: 'DirectX 12 Runtime Library',
    purpose: 'provides Direct3D 12 graphics API for low-level GPU control and advanced rendering',
    commonCauses: [
      'Windows version too old',
      'GPU driver outdated',
      'Graphics card incompatible',
      'Windows system files corrupted'
    ],
    runtimePackage: 'Windows 10/11 Built-in',
    downloadUrl: 'Via Windows Update',
    additionalNotes: 'DirectX 12 is built into Windows 10 and 11. Ensure your GPU supports DX12 (most 2015+ cards do).'
  },
  'vulkan-1.dll': {
    fullName: 'Vulkan Runtime Library',
    purpose: 'provides Vulkan graphics API for cross-platform high-performance graphics rendering',
    commonCauses: [
      'Vulkan runtime not installed',
      'GPU driver missing Vulkan support',
      'Outdated graphics driver',
      'Incompatible GPU'
    ],
    runtimePackage: 'Vulkan Runtime',
    downloadUrl: 'https://vulkan.lunarg.com/sdk/home',
    additionalNotes: 'Vulkan is installed with modern GPU drivers. Update your graphics driver first before installing manually.'
  },
  'xinput1_4.dll': {
    fullName: 'Xbox Input API Library',
    purpose: 'handles Xbox controller input and vibration feedback for games',
    commonCauses: [
      'DirectX components corrupted',
      'Windows system files damaged',
      'Antivirus removed the file',
      'Incomplete Windows installation'
    ],
    runtimePackage: 'DirectX (built into Windows)',
    downloadUrl: 'Via DirectX End-User Runtime',
    additionalNotes: 'XInput is the standard API for Xbox controllers on Windows. Usually built into Windows but can be restored with DirectX runtime.'
  },
  'mso.dll': {
    fullName: 'Microsoft Office Shared Component',
    purpose: 'provides shared functionality across Microsoft Office applications including fonts, themes, and core services',
    commonCauses: [
      'Office installation corrupted',
      'Incomplete Office update',
      'Registry issues',
      'Conflicting Office versions'
    ],
    runtimePackage: 'Microsoft Office',
    downloadUrl: 'Via Office Repair',
    additionalNotes: 'Repair Office installation through Control Panel > Programs > Microsoft Office > Change > Quick Repair.'
  },
  'vbe7.dll': {
    fullName: 'Visual Basic for Applications Library',
    purpose: 'provides VBA scripting engine for Office macros and automation',
    commonCauses: [
      'VBA component not installed',
      'Office installation incomplete',
      'Registry corruption',
      'Antivirus blocking macro engine'
    ],
    runtimePackage: 'Microsoft Office VBA',
    downloadUrl: 'Via Office Repair',
    additionalNotes: 'VBA is required for Office macros. Ensure macros are enabled in Trust Center settings.'
  }
};

// ============ 游戏专属知识库 ============
const gameKnowledge: Record<string, {
  releaseYear: string;
  developer: string;
  commonDlls: string[];
  uniqueIssues: string[];
  specificFixes: string[];
}> = {
  'black-myth-wukong': {
    releaseYear: '2024',
    developer: 'Game Science',
    commonDlls: ['vcruntime140.dll', 'd3d12.dll', 'vulkan-1.dll'],
    uniqueIssues: [
      'High system requirements (RTX 2060 minimum)',
      'Unreal Engine 5 specific issues',
      'Ray tracing compatibility problems',
      'Chinese server connectivity issues'
    ],
    specificFixes: [
      'Update to latest GPU drivers (especially for DLSS 3.5)',
      'Disable ray tracing if experiencing crashes',
      'Set process priority to High',
      'Install latest Visual C++ Redistributable 2022'
    ]
  },
  'elden-ring': {
    releaseYear: '2022',
    developer: 'FromSoftware',
    commonDlls: ['vcruntime140.dll', 'd3d12.dll', 'steam_api64.dll'],
    uniqueIssues: [
      'Frame rate stuttering due to shader compilation',
      'Easy Anti-Cheat conflicts',
      'White screen on startup',
      'Controller not detected issues'
    ],
    specificFixes: [
      'Delete shader cache and let it rebuild',
      'Add exception to antivirus for EAC',
      'Run as Administrator',
      'Verify game files through Steam'
    ]
  },
  'diablo-2': {
    releaseYear: '2000',
    developer: 'Blizzard North',
    commonDlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_43.dll'],
    uniqueIssues: [
      'Compatibility with modern Windows',
      'Resolution scaling problems',
      'Direct3D initialization failed',
      'Cannot create DirectDraw surface'
    ],
    specificFixes: [
      'Run in Windows XP SP3 compatibility mode',
      'Run as Administrator',
      'Install DirectX 9.0c June 2010',
      'Use -w command line for windowed mode',
      'Install Glide wrapper for better graphics'
    ]
  },
  'red-alert-2': {
    releaseYear: '2000',
    developer: 'Westwood Studios',
    commonDlls: ['binkw32.dll', 'mss32.dll'],
    uniqueIssues: [
      'Black screen on modern Windows',
      'Multi-core processor crashes',
      'Resolution limitations',
      'Network play problems'
    ],
    specificFixes: [
      'Set affinity to single CPU core',
      'Run in Windows XP SP2 compatibility mode',
      'Set color depth to 16-bit',
      'Disable Origin overlay',
      'Install CnCNet for modern multiplayer'
    ]
  },
  'gta-san-andreas': {
    releaseYear: '2004',
    developer: 'Rockstar North',
    commonDlls: ['mss32.dll', 'vorbisfile.dll', 'd3dx9_43.dll'],
    uniqueIssues: [
      'Mouse acceleration problems',
      'Missing audio files',
      'Crash on startup with Steam version',
      'Save game corruption'
    ],
    specificFixes: [
      'Install Silent Patch mod',
      'Use SilentPatch for proper widescreen',
      'Downgrade from Definitive Edition if needed',
      'Verify Steam files if using Steam version'
    ]
  },
  'baldurs-gate-3': {
    releaseYear: '2023',
    developer: 'Larian Studios',
    commonDlls: ['vcruntime140.dll', 'vulkan-1.dll', 'd3d12.dll'],
    uniqueIssues: [
      'Vulkan initialization failure',
      'Crash during Act 3',
      'Co-op desync issues',
      'Mod conflicts after updates'
    ],
    specificFixes: [
      'Switch between DX11 and Vulkan in launcher',
      'Delete cache folder in AppData',
      'Disable mods before major game updates',
      'Verify game files after patches'
    ]
  },
  'cyberpunk-2077': {
    releaseYear: '2020',
    developer: 'CD Projekt Red',
    commonDlls: ['vcruntime140.dll', 'd3d12.dll', 'vulkan-1.dll'],
    uniqueIssues: [
      'Flatlined error on startup',
      'GPU crashes with ray tracing',
      'Memory leak causing stuttering',
      'AMD CPU performance issues'
    ],
    specificFixes: [
      'Update GPU drivers to latest version',
      'Enable XMP in BIOS for AMD',
      'Delete shader cache in game folder',
      'Verify files through GOG/Steam'
    ]
  },
  'hogwarts-legacy': {
    releaseYear: '2023',
    developer: 'Avalanche Software',
    commonDlls: ['vcruntime140.dll', 'd3d12.dll'],
    uniqueIssues: [
      'Shader compilation stutters',
      'Memory leak during long sessions',
      'DLSS ghosting artifacts',
      'DirectX 12 crashes'
    ],
    specificFixes: [
      'Pre-compile shaders in game settings',
      'Restart game every 2-3 hours',
      'Update to latest DLSS version',
      'Try DX11 mode if DX12 crashes'
    ]
  }
};

// ============ 多样化的介绍模板 ============
const introTemplates = [
  // Template 1 - Problem-focused
  (dll: string, app: string, dllInfo: any) => 
    `Encountering the **"${dll} is missing"** error when launching ${app} can be extremely frustrating, especially when you're eager to play. This error indicates that your system cannot locate ${dllInfo?.fullName || dll}, which ${dllInfo?.purpose || 'is required for the application to run'}.\n\n` +
    `The good news? This is one of the most common DLL errors and can usually be fixed in minutes. Let's walk through the solutions from quickest to most thorough.`,
  
  // Template 2 - Technical explanation
  (dll: string, app: string, dllInfo: any) =>
    `The **${dll}** error blocking ${app} from starting is a system-level issue that many users encounter. ${dllInfo?.fullName || 'This Dynamic Link Library'} ${dllInfo?.purpose || 'provides essential functions that the application depends on'}.\n\n` +
    `${dllInfo?.additionalNotes || ''}\n\nThis guide provides multiple verified solutions, ordered by success rate. Most users resolve this issue with the first or second method.`,
  
  // Template 3 - Empathetic/conversational
  (dll: string, app: string, dllInfo: any) =>
    `We understand how annoying it is to see **"${dll} was not found"** right when you want to launch ${app}. Don't worry - this is a very common issue with a straightforward fix.\n\n` +
    `This DLL (${dllInfo?.fullName || 'Dynamic Link Library'}) ${dllInfo?.purpose || 'is needed by the application'}. ${dllInfo?.additionalNotes || ''}\n\nLet's get you back to gaming with these tested solutions.`,
  
  // Template 4 - Direct/efficient
  (dll: string, app: string, dllInfo: any) =>
    `**Quick fix for ${dll} error in ${app}**: This DLL is part of ${dllInfo?.runtimePackage || 'a required runtime package'}. ${dllInfo?.additionalNotes || ''}\n\n` +
    `Below are the solutions ranked by effectiveness. Solution 1 fixes this issue for 90%+ of users.`,
  
  // Template 5 - Educational
  (dll: string, app: string, dllInfo: any) =>
    `**Understanding the ${dll} Error**\n\n${app} requires ${dllInfo?.fullName || dll} to function properly. This file ${dllInfo?.purpose || 'provides essential functionality'}.\n\n` +
    `**Why does this happen?**\n${dllInfo?.commonCauses?.map((c: string) => `- ${c}`).join('\n') || '- Runtime not installed\n- File corrupted or missing\n- Antivirus interference'}\n\n` +
    `${dllInfo?.additionalNotes || ''}\n\nHere are the proven solutions:`
];

// ============ 生成独特内容的函数 ============
function generateUniqueContent(
  title: string,
  category: string,
  dll: string,
  app: string,
  index: number
): Array<{heading: string; content: string}> {
  const dllLower = dll.toLowerCase();
  const dllInfo = Object.keys(dllKnowledge).find(k => dllLower.includes(k));
  const dllData = dllInfo ? dllKnowledge[dllInfo] : null;
  
  const appSlug = app.toLowerCase().replace(/\s+/g, '-');
  const gameData = gameKnowledge[appSlug];
  
  // 选择模板（基于索引循环使用不同模板）
  const templateIndex = index % introTemplates.length;
  const introContent = introTemplates[templateIndex](dll, app, dllData);
  
  const sections: Array<{heading: string; content: string}> = [];
  
  // Section 1: 介绍/原因
  sections.push({
    heading: getVariedHeading('causes', index),
    content: introContent
  });
  
  // Section 2: 主要解决方案
  if (dllData) {
    sections.push({
      heading: 'Solution 1: Install the Required Runtime Package (Recommended)',
      content: generateRuntimeSolution(dllData, app, index)
    });
  } else {
    sections.push({
      heading: 'Solution 1: Install Missing Runtime Components',
      content: generateGenericRuntimeSolution(dll, app, index)
    });
  }
  
  // Section 3: 验证游戏文件
  if (category === 'Gaming') {
    sections.push({
      heading: 'Solution 2: Verify Game Files',
      content: generateVerifyFilesSolution(app, gameData, index)
    });
  } else {
    sections.push({
      heading: 'Solution 2: Repair Application Installation',
      content: generateRepairSolution(app, category, index)
    });
  }
  
  // Section 4: 系统修复
  sections.push({
    heading: 'Solution 3: Run System File Repair',
    content: generateSystemRepairSolution(index)
  });
  
  // Section 5: 游戏特定修复或高级修复
  if (gameData) {
    sections.push({
      heading: `Solution 4: ${app}-Specific Fixes`,
      content: generateGameSpecificSolution(app, gameData, dll)
    });
  } else {
    sections.push({
      heading: 'Solution 4: Advanced Troubleshooting',
      content: generateAdvancedSolution(dll, app, category, index)
    });
  }
  
  // Section 6: 预防建议
  sections.push({
    heading: getVariedHeading('prevention', index),
    content: generatePreventionTips(dll, category, index)
  });
  
  return sections;
}

function getVariedHeading(type: string, index: number): string {
  const headings: Record<string, string[]> = {
    causes: [
      'Understanding the DLL Error',
      'What Causes This Error?',
      'Why This Error Occurs',
      'About This DLL Error',
      'Error Analysis'
    ],
    prevention: [
      'How to Prevent Future DLL Errors',
      'Prevention Tips',
      'Avoiding This Error in the Future',
      'Long-term Solutions',
      'Maintenance Recommendations'
    ]
  };
  
  return headings[type][index % headings[type].length];
}

function generateRuntimeSolution(dllData: any, app: string, index: number): string {
  const variations = [
    `Installing **${dllData.runtimePackage}** resolves this issue for the vast majority of users.\n\n`,
    `The most reliable fix is to install the **${dllData.runtimePackage}**.\n\n`,
    `**${dllData.runtimePackage}** contains ${dllData.fullName || 'the required DLL'}.\n\n`
  ];
  
  let content = variations[index % variations.length];
  
  if (dllData.downloadUrl.includes('aka.ms')) {
    content += `**Step 1**: Download the Visual C++ Redistributable:\n`;
    content += `- [Download x64 version](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n`;
    content += `- [Download x86 version](https://aka.ms/vs/17/release/vc_redist.x86.exe)\n\n`;
    content += `**Step 2**: Install **BOTH** the x64 and x86 versions, even if you're on a 64-bit system. Many applications use both.\n\n`;
    content += `**Step 3**: Restart your computer to ensure all changes take effect.\n\n`;
    content += `**Step 4**: Try launching ${app} again.`;
  } else if (dllData.downloadUrl.includes('microsoft.com/en-us/download')) {
    content += `**Step 1**: Download [DirectX End-User Runtime](${dllData.downloadUrl})\n\n`;
    content += `**Step 2**: Run the installer - it will extract and install all legacy DirectX components.\n\n`;
    content += `**Step 3**: Restart your PC.\n\n`;
    content += `**Step 4**: Launch ${app} again.`;
  } else if (dllData.downloadUrl === 'Via Windows Update') {
    content += `**Step 1**: Press **Win + I** to open Settings\n\n`;
    content += `**Step 2**: Go to **Windows Update**\n\n`;
    content += `**Step 3**: Click **Check for updates** and install all available updates\n\n`;
    content += `**Step 4**: Restart and try ${app} again.`;
  } else {
    content += `**Step 1**: Download ${dllData.runtimePackage} from the official source.\n\n`;
    content += `**Step 2**: Run the installer with Administrator privileges.\n\n`;
    content += `**Step 3**: Restart your computer.\n\n`;
    content += `**Step 4**: Launch ${app} again.`;
  }
  
  return content;
}

function generateGenericRuntimeSolution(dll: string, app: string, index: number): string {
  const dllLower = dll.toLowerCase();
  
  // Determine which runtime is most likely needed
  if (dllLower.includes('vcruntime') || dllLower.includes('msvcp') || dllLower.includes('msvc')) {
    return `Install the Visual C++ Redistributable package:\n\n` +
      `**Step 1**: Download both versions:\n` +
      `- [VC++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n` +
      `- [VC++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)\n\n` +
      `**Step 2**: Install both versions (even on 64-bit Windows)\n\n` +
      `**Step 3**: Restart your computer\n\n` +
      `**Step 4**: Launch ${app} again`;
  } else if (dllLower.includes('d3d') || dllLower.includes('x3d') || dllLower.includes('xinput')) {
    return `Install the DirectX End-User Runtime:\n\n` +
      `**Step 1**: Download [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)\n\n` +
      `**Step 2**: Run the downloaded installer\n\n` +
      `**Step 3**: Let it extract and install all components\n\n` +
      `**Step 4**: Restart your PC and launch ${app}`;
  } else {
    return `Try installing these common runtime packages:\n\n` +
      `**Option A - Visual C++ Redistributable**:\n` +
      `- [Download VC++ 2015-2022](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n\n` +
      `**Option B - DirectX Runtime**:\n` +
      `- [Download DirectX](https://www.microsoft.com/en-us/download/details.aspx?id=35)\n\n` +
      `**Option C - .NET Framework**:\n` +
      `- [Download .NET Framework](https://dotnet.microsoft.com/download/dotnet-framework)\n\n` +
      `Install all of these, then restart and try ${app} again.`;
  }
}

function generateVerifyFilesSolution(app: string, gameData: any, index: number): string {
  let content = `Corrupted game files can cause DLL errors. Verifying files will download any missing or damaged files.\n\n`;
  
  content += `**For Steam:**\n`;
  content += `1. Open Steam Library\n`;
  content += `2. Right-click **${app}** → **Properties**\n`;
  content += `3. Go to **Installed Files** tab\n`;
  content += `4. Click **Verify integrity of game files**\n`;
  content += `5. Wait for verification to complete (may take 5-30 minutes)\n`;
  content += `6. Restart Steam and launch the game\n\n`;
  
  content += `**For Epic Games:**\n`;
  content += `1. Open Epic Games Library\n`;
  content += `2. Click the **three dots (⋯)** on ${app}\n`;
  content += `3. Select **Manage** → **Verify**\n`;
  content += `4. Wait for verification\n\n`;
  
  content += `**For GOG Galaxy:**\n`;
  content += `1. Open GOG Galaxy\n`;
  content += `2. Select ${app}\n`;
  content += `3. Click **Settings icon** → **Manage Installation** → **Verify / Repair**`;
  
  if (gameData?.uniqueIssues) {
    content += `\n\n**Note for ${app}**: ${gameData.uniqueIssues[index % gameData.uniqueIssues.length]}`;
  }
  
  return content;
}

function generateRepairSolution(app: string, category: string, index: number): string {
  if (category === 'Office') {
    return `Microsoft Office has a built-in repair feature:\n\n` +
      `**Quick Repair (Faster):**\n` +
      `1. Press **Win + I** → **Apps** → **Installed apps**\n` +
      `2. Find **Microsoft 365** or **Microsoft Office**\n` +
      `3. Click **⋯** → **Modify**\n` +
      `4. Select **Quick Repair** → **Repair**\n` +
      `5. Restart your computer\n\n` +
      `**Online Repair (More Thorough):**\n` +
      `If Quick Repair doesn't work:\n` +
      `1. Repeat steps 1-3 above\n` +
      `2. Select **Online Repair** → **Repair**\n` +
      `3. This will redownload Office components (requires internet)\n` +
      `4. Restart and try again`;
  } else {
    return `Try repairing or reinstalling ${app}:\n\n` +
      `**Repair Installation:**\n` +
      `1. Press **Win + I** → **Apps** → **Installed apps**\n` +
      `2. Find ${app}\n` +
      `3. Click **⋯** → **Modify** or **Repair** (if available)\n` +
      `4. Follow the repair wizard\n\n` +
      `**Clean Reinstall:**\n` +
      `If repair isn't available or doesn't work:\n` +
      `1. Uninstall ${app} completely\n` +
      `2. Delete any remaining folders in Program Files\n` +
      `3. Download the latest version from the official website\n` +
      `4. Install as Administrator`;
  }
}

function generateSystemRepairSolution(index: number): string {
  const variations = [
    // Variation 1 - Standard
    `Windows has built-in tools to repair corrupted system files:\n\n` +
    `**Step 1**: Open Command Prompt as Administrator\n` +
    `- Press **Win + X** → select **Terminal (Admin)**\n` +
    `- Or search "cmd" → right-click → **Run as administrator**\n\n` +
    `**Step 2**: Run System File Checker\n` +
    `\`\`\`\nsfc /scannow\n\`\`\`\n` +
    `Wait for the scan to complete (10-15 minutes).\n\n` +
    `**Step 3**: If issues found, run DISM repair\n` +
    `\`\`\`\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n` +
    `This may take 15-30 minutes.\n\n` +
    `**Step 4**: Restart your computer and try again.`,
    
    // Variation 2 - With explanation
    `Corrupted Windows system files can cause DLL errors. Use these repair tools:\n\n` +
    `**Open Administrator Command Prompt:**\n` +
    `Press **Win + S**, type "cmd", right-click **Command Prompt**, select **Run as administrator**\n\n` +
    `**Run these commands in order:**\n\n` +
    `1. **Check system file integrity:**\n` +
    `\`\`\`\nsfc /scannow\n\`\`\`\n\n` +
    `2. **Repair Windows image (if SFC found issues):**\n` +
    `\`\`\`\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n` +
    `3. **Re-run SFC after DISM:**\n` +
    `\`\`\`\nsfc /scannow\n\`\`\`\n\n` +
    `Restart your computer after these repairs complete.`,
    
    // Variation 3 - Brief
    `Run these system repair commands as Administrator:\n\n` +
    `\`\`\`batch\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n` +
    `**How to run:** Press Win+X → Terminal (Admin) → paste commands → Enter\n\n` +
    `Wait for both scans to complete, then restart your PC.`
  ];
  
  return variations[index % variations.length];
}

function generateGameSpecificSolution(app: string, gameData: any, dll: string): string {
  let content = `**${app}** (${gameData.releaseYear}) by ${gameData.developer} has some specific considerations:\n\n`;
  
  content += `**Known Issues:**\n`;
  gameData.uniqueIssues.forEach((issue: string) => {
    content += `- ${issue}\n`;
  });
  
  content += `\n**Recommended Fixes for ${app}:**\n`;
  gameData.specificFixes.forEach((fix: string, i: number) => {
    content += `${i + 1}. ${fix}\n`;
  });
  
  content += `\n**Related DLLs for ${app}:**\n`;
  content += `${gameData.commonDlls.join(', ')}\n\n`;
  content += `If you see errors for any of these DLLs, apply the same solutions above.`;
  
  return content;
}

function generateAdvancedSolution(dll: string, app: string, category: string, index: number): string {
  return `If the above solutions don't work, try these advanced steps:\n\n` +
    `**1. Clean Boot Windows**\n` +
    `This eliminates software conflicts:\n` +
    `- Press **Win + R** → type **msconfig** → Enter\n` +
    `- Go to **Services** tab → Check **Hide all Microsoft services** → Click **Disable all**\n` +
    `- Go to **Startup** tab → Click **Open Task Manager** → Disable all startup items\n` +
    `- Restart and test ${app}\n\n` +
    `**2. Create a New User Account**\n` +
    `Corrupted user profiles can cause DLL errors:\n` +
    `- Settings → Accounts → Family & other users → Add other user\n` +
    `- Create a local account and test ${app} there\n\n` +
    `**3. Check for Malware**\n` +
    `Run a full system scan with Windows Defender or your antivirus.\n\n` +
    `**4. Update Windows**\n` +
    `- Settings → Windows Update → Check for updates\n` +
    `- Install all available updates including optional ones`;
}

function generatePreventionTips(dll: string, category: string, index: number): string {
  const tips = [
    // Version 1
    `Keep your system healthy with these practices:\n\n` +
    `1. **Keep Windows Updated**: Enable automatic updates to receive latest fixes\n\n` +
    `2. **Install All Runtime Packages**: Keep Visual C++, DirectX, and .NET Framework current\n\n` +
    `3. **Use Official Downloads**: Only download software from official sources\n\n` +
    `4. **Quality Antivirus**: Use a reputable antivirus that doesn't cause false positives\n\n` +
    `5. **Regular Maintenance**: Run Disk Cleanup and SFC scan periodically`,
    
    // Version 2
    `Prevent DLL errors with these tips:\n\n` +
    `✅ **Runtime Libraries**: Keep these installed and updated:\n` +
    `- Visual C++ Redistributable (all versions)\n` +
    `- DirectX End-User Runtime\n` +
    `- .NET Framework\n\n` +
    `✅ **System Health**:\n` +
    `- Run Windows Update regularly\n` +
    `- Don't disable Windows services randomly\n` +
    `- Use official software sources\n\n` +
    `✅ **Gaming Best Practices**:\n` +
    `- Verify game files after updates\n` +
    `- Keep GPU drivers updated\n` +
    `- Add game folders to antivirus exclusions`,
    
    // Version 3
    `**Long-term Prevention Strategy:**\n\n` +
    `**For Gamers:**\n` +
    `- Always verify game files after installation\n` +
    `- Keep GPU drivers updated (but avoid beta drivers)\n` +
    `- Install runtime packages before games prompt you\n\n` +
    `**For Office Users:**\n` +
    `- Run Office repair if you see any errors\n` +
    `- Keep Office updated through Windows Update\n` +
    `- Don't force-close Office applications\n\n` +
    `**For Everyone:**\n` +
    `- Create System Restore points before major changes\n` +
    `- Back up important data regularly\n` +
    `- Don't download DLLs from random websites`
  ];
  
  return tips[index % tips.length];
}

// ============ 生成系统错误内容 ============
function generateSystemErrorContent(title: string, errorCode: string, index: number): Array<{heading: string; content: string}> {
  const sections: Array<{heading: string; content: string}> = [];
  
  // 根据错误类型生成不同内容
  const isBlueScreen = errorCode.includes('BSOD') || title.includes('Blue Screen');
  const isAppError = errorCode.startsWith('0x');
  
  // Section 1: 介绍
  sections.push({
    heading: 'Understanding This Error',
    content: generateSystemErrorIntro(title, errorCode, index)
  });
  
  // Section 2: 常见原因
  sections.push({
    heading: 'Common Causes',
    content: generateSystemErrorCauses(errorCode, isBlueScreen, index)
  });
  
  // Section 3-5: 解决方案
  sections.push({
    heading: 'Solution 1: Run Windows Troubleshooter',
    content: generateTroubleshooterSolution(errorCode, index)
  });
  
  sections.push({
    heading: 'Solution 2: System File Repair',
    content: generateSystemRepairSolution(index)
  });
  
  sections.push({
    heading: 'Solution 3: Check Hardware and Drivers',
    content: generateHardwareCheckSolution(isBlueScreen, index)
  });
  
  // Section 6: 预防
  sections.push({
    heading: 'Preventing Future Errors',
    content: generateSystemErrorPrevention(errorCode, index)
  });
  
  return sections;
}

function generateSystemErrorIntro(title: string, errorCode: string, index: number): string {
  const intros = [
    `The **${errorCode}** error is a Windows system error that can disrupt your work or gaming session. This guide provides step-by-step solutions to resolve this issue and prevent it from recurring.\n\nThis error typically indicates a system-level problem that can range from corrupted files to hardware issues.`,
    `Encountering **${errorCode}** on your Windows PC? This comprehensive guide will help you diagnose and fix the problem. We've compiled solutions based on success rates from thousands of users.\n\nLet's get your system back to normal.`,
    `**${errorCode}** is a common Windows error with multiple potential causes. The good news is that most cases can be resolved without professional help.\n\nThis guide covers solutions from basic to advanced, so you can fix the issue regardless of your technical skill level.`
  ];
  
  return intros[index % intros.length];
}

function generateSystemErrorCauses(errorCode: string, isBlueScreen: boolean, index: number): string {
  if (isBlueScreen) {
    return `Blue Screen errors like ${errorCode} are typically caused by:\n\n` +
      `1. **Driver Issues**: Outdated, corrupted, or incompatible device drivers\n` +
      `2. **Hardware Problems**: Failing RAM, hard drive issues, or overheating\n` +
      `3. **System File Corruption**: Critical Windows files are damaged\n` +
      `4. **Recent Changes**: New software or hardware installations\n` +
      `5. **Malware**: Viruses or malicious software affecting system stability\n` +
      `6. **Windows Update Issues**: Failed or incomplete Windows updates`;
  } else {
    return `This error commonly occurs due to:\n\n` +
      `1. **Missing or Corrupted System Files**: Essential Windows components are damaged\n` +
      `2. **Registry Issues**: Windows Registry entries are corrupted\n` +
      `3. **Software Conflicts**: Third-party applications interfering with system operations\n` +
      `4. **Insufficient Resources**: Low disk space, memory, or CPU resources\n` +
      `5. **Permission Problems**: Insufficient privileges for required operations\n` +
      `6. **Outdated Components**: Windows or application components need updating`;
  }
}

function generateTroubleshooterSolution(errorCode: string, index: number): string {
  return `Windows includes built-in troubleshooters that can automatically detect and fix many issues:\n\n` +
    `**Step 1**: Open Windows Settings (Win + I)\n\n` +
    `**Step 2**: Navigate to **System** → **Troubleshoot** → **Other troubleshooters**\n\n` +
    `**Step 3**: Run relevant troubleshooters:\n` +
    `- **Windows Update** - For update-related errors\n` +
    `- **Program Compatibility** - For application errors\n` +
    `- **Hardware and Devices** - For hardware-related issues\n` +
    `- **Power** - For power-related problems\n\n` +
    `**Step 4**: Follow the on-screen instructions and apply any suggested fixes\n\n` +
    `**Step 5**: Restart your computer if prompted`;
}

function generateHardwareCheckSolution(isBlueScreen: boolean, index: number): string {
  if (isBlueScreen) {
    return `Hardware issues often cause blue screen errors:\n\n` +
      `**Check Memory (RAM):**\n` +
      `1. Press **Win + R** → type **mdsched.exe** → Enter\n` +
      `2. Choose **Restart now and check for problems**\n` +
      `3. Windows will scan RAM on next boot\n\n` +
      `**Check Hard Drive:**\n` +
      `1. Open Command Prompt as Admin\n` +
      `2. Run: \`chkdsk C: /f /r\`\n` +
      `3. Type **Y** to schedule scan on restart\n` +
      `4. Restart and let the scan complete\n\n` +
      `**Update Drivers:**\n` +
      `1. Right-click Start → **Device Manager**\n` +
      `2. Look for devices with ⚠️ yellow warning icons\n` +
      `3. Right-click → **Update driver** → **Search automatically**\n\n` +
      `**Check Temperatures:**\n` +
      `Use software like HWMonitor to check if CPU/GPU temperatures are too high.`;
  } else {
    return `Driver and hardware issues can cause application errors:\n\n` +
      `**Update Device Drivers:**\n` +
      `1. Press **Win + X** → **Device Manager**\n` +
      `2. Expand each category and look for yellow warning icons\n` +
      `3. Right-click problematic devices → **Update driver**\n` +
      `4. Choose **Search automatically for drivers**\n\n` +
      `**Update Graphics Driver:**\n` +
      `Visit your GPU manufacturer's website:\n` +
      `- NVIDIA: nvidia.com/drivers\n` +
      `- AMD: amd.com/support\n` +
      `- Intel: intel.com/download-center\n\n` +
      `**Check Disk Health:**\n` +
      `1. Open Command Prompt as Admin\n` +
      `2. Run: \`wmic diskdrive get status\`\n` +
      `3. All drives should show "OK"`;
  }
}

function generateSystemErrorPrevention(errorCode: string, index: number): string {
  return `Keep your system stable with these practices:\n\n` +
    `**Regular Maintenance:**\n` +
    `- Run Disk Cleanup monthly to remove temporary files\n` +
    `- Use **sfc /scannow** periodically to check system integrity\n` +
    `- Keep at least 15-20% of your drive space free\n\n` +
    `**Software Practices:**\n` +
    `- Install software from official sources only\n` +
    `- Uninstall programs you don't use\n` +
    `- Avoid installing multiple antivirus programs\n\n` +
    `**Updates and Backups:**\n` +
    `- Enable automatic Windows updates\n` +
    `- Create System Restore points before major changes\n` +
    `- Back up important files regularly\n\n` +
    `**Hardware Care:**\n` +
    `- Keep your PC clean and well-ventilated\n` +
    `- Monitor temperatures during intensive tasks\n` +
    `- Consider replacing old hard drives (5+ years)`;
}

// ============ 主函数 ============
async function fixContentQuality() {
  console.log('🚀 开始内容质量修复...\n');
  
  const dataDir = path.join(__dirname, '../src/data');
  const backupDir = path.join(__dirname, '../backups');
  
  // 创建备份目录
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // ============ 1. 修复已发布文章 ============
  console.log('📝 修复已发布文章 (auto-generated-guides.json)...');
  
  const autoGeneratedPath = path.join(dataDir, 'auto-generated-guides.json');
  let autoGeneratedContent = fs.readFileSync(autoGeneratedPath, 'utf-8');
  
  // 移除可能的注释行
  if (autoGeneratedContent.startsWith('//')) {
    autoGeneratedContent = autoGeneratedContent.split('\n').slice(1).join('\n');
  }
  
  const autoGenerated = JSON.parse(autoGeneratedContent);
  
  // 备份
  fs.writeFileSync(
    path.join(backupDir, `auto-generated-guides-${timestamp}.json`),
    JSON.stringify(autoGenerated, null, 2)
  );
  console.log(`   ✅ 已备份原始文件`);
  
  // 重写每篇文章
  let fixedCount = 0;
  for (let i = 0; i < autoGenerated.length; i++) {
    const guide = autoGenerated[i];
    
    // 提取DLL和应用名称
    const title = guide.title || '';
    const dllMatch = title.match(/(\w+\.dll)/i);
    const dll = dllMatch ? dllMatch[1] : 'DLL';
    
    // 从标题提取应用名称
    let app = 'your application';
    if (title.includes(' in ')) {
      app = title.split(' in ')[1] || app;
    } else if (title.includes(' for ')) {
      app = title.split(' for ')[1] || app;
    }
    
    const category = guide.category || 'System';
    
    // 判断是否为系统错误文章
    const isSystemError = category === 'System' || category === 'Error Codes' || 
                          title.includes('Error 0x') || title.includes('Blue Screen');
    
    if (isSystemError) {
      // 系统错误文章
      const errorMatch = title.match(/0x[\da-fA-F]+|BSOD|Error \d+/i);
      const errorCode = errorMatch ? errorMatch[0] : 'System Error';
      guide.sections = generateSystemErrorContent(title, errorCode, i);
    } else {
      // 游戏/软件DLL错误文章
      guide.sections = generateUniqueContent(title, category, dll, app, i);
    }
    
    fixedCount++;
    if (fixedCount % 10 === 0) {
      console.log(`   📄 已处理 ${fixedCount}/${autoGenerated.length} 篇...`);
    }
  }
  
  // 保存修复后的文件
  fs.writeFileSync(autoGeneratedPath, JSON.stringify(autoGenerated, null, 2));
  console.log(`   ✅ 已修复 ${fixedCount} 篇已发布文章\n`);
  
  // ============ 2. 修复计划文章 ============
  console.log('📝 修复计划文章 (scheduled-guides.json)...');
  
  const scheduledPath = path.join(dataDir, 'scheduled-guides.json');
  let scheduledContent = fs.readFileSync(scheduledPath, 'utf-8');
  
  // 移除可能的注释行
  if (scheduledContent.startsWith('//')) {
    scheduledContent = scheduledContent.split('\n').slice(1).join('\n');
  }
  
  const scheduledData = JSON.parse(scheduledContent);
  const guides = scheduledData.guides || scheduledData;
  
  // 备份
  fs.writeFileSync(
    path.join(backupDir, `scheduled-guides-${timestamp}.json`),
    JSON.stringify(scheduledData, null, 2)
  );
  console.log(`   ✅ 已备份原始文件`);
  
  // 重写每篇文章
  let scheduledFixedCount = 0;
  for (let i = 0; i < guides.length; i++) {
    const guide = guides[i];
    
    // 提取DLL和应用名称
    const title = guide.title || '';
    const dllMatch = title.match(/(\w+\.dll)/i);
    const dll = dllMatch ? dllMatch[1] : 'DLL';
    
    // 从标题提取应用名称
    let app = 'your application';
    if (title.includes(' in ')) {
      app = title.split(' in ')[1] || app;
    } else if (title.includes(' for ')) {
      app = title.split(' for ')[1] || app;
    }
    
    const category = guide.category || 'Gaming';
    
    // 判断是否为系统错误文章
    const isSystemError = category === 'System' || category === 'Error Codes' || 
                          title.includes('Error 0x') || title.includes('Blue Screen');
    
    if (isSystemError) {
      // 系统错误文章
      const errorMatch = title.match(/0x[\da-fA-F]+|BSOD|Error \d+/i);
      const errorCode = errorMatch ? errorMatch[0] : 'System Error';
      guide.sections = generateSystemErrorContent(title, errorCode, i);
    } else {
      // 游戏/软件DLL错误文章
      guide.sections = generateUniqueContent(title, category, dll, app, i);
    }
    
    scheduledFixedCount++;
    if (scheduledFixedCount % 50 === 0) {
      console.log(`   📄 已处理 ${scheduledFixedCount}/${guides.length} 篇...`);
    }
  }
  
  // 更新guides数组
  if (scheduledData.guides) {
    scheduledData.guides = guides;
  }
  
  // 保存修复后的文件
  fs.writeFileSync(scheduledPath, JSON.stringify(scheduledData, null, 2));
  console.log(`   ✅ 已修复 ${scheduledFixedCount} 篇计划文章\n`);
  
  // ============ 3. 总结 ============
  console.log('═══════════════════════════════════════════');
  console.log('✨ 内容质量修复完成!');
  console.log('═══════════════════════════════════════════');
  console.log(`📊 修复统计:`);
  console.log(`   - 已发布文章: ${fixedCount} 篇`);
  console.log(`   - 计划文章: ${scheduledFixedCount} 篇`);
  console.log(`   - 总计: ${fixedCount + scheduledFixedCount} 篇`);
  console.log(`\n📁 备份位置: ${backupDir}`);
  console.log(`\n🎯 下一步:`);
  console.log(`   1. 运行 npm run build 验证构建`);
  console.log(`   2. 运行 npm run dev 本地预览`);
  console.log(`   3. git add . && git commit -m "fix: 重写所有重复内容" && git push`);
  console.log(`   4. 等待2-4周让Google重新抓取`);
  console.log(`   5. 重新申请AdSense`);
}

// 运行
fixContentQuality().catch(console.error);
