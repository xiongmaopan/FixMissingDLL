/**
 * 重新生成所有指南 - 高质量版本
 * 保持原有的 64 条指南，但用高质量内容模板替换
 */

import * as fs from 'fs';
import * as path from 'path';

// 错误码专业知识库
const errorCodeKnowledge: Record<string, {
  technicalName: string;
  meaning: string;
  commonTriggers: string[];
  affectedApps: string[];
  primaryFix: { title: string; why: string; steps: string[] };
  secondaryFix: { title: string; why: string; steps: string[] };
  advancedFix: { title: string; why: string; steps: string[] };
  command?: string;
  registryPath?: string;
  microsoftKB?: string;
}> = {
  '0xc0000142': {
    technicalName: 'STATUS_DLL_INIT_FAILED',
    meaning: 'A DLL initialization routine failed',
    commonTriggers: [
      'Windows Update KB5000802',
      'Antivirus false positives',
      'Corrupted user profile',
      'AppInit_DLLs registry entry'
    ],
    affectedApps: ['Microsoft Office', 'Adobe Creative Cloud', 'Games (especially older ones)', 'AutoCAD', 'Visual Studio'],
    primaryFix: {
      title: 'Restart Software Protection Service',
      why: 'The Software Protection service manages software licensing. When corrupted, it can prevent applications from starting.',
      steps: [
        'Press Win + R, type services.msc, press Enter',
        'Find "Software Protection" service',
        'Right-click → Properties → Set Startup type to "Automatic"',
        'Click Start if the service is stopped',
        'Restart your computer'
      ]
    },
    secondaryFix: {
      title: 'Repair Windows Runtime Libraries',
      why: 'Runtime libraries can become corrupted after Windows updates or improper shutdowns.',
      steps: [
        'Open Settings → Apps → Installed apps',
        'Search for "Microsoft Visual C++"',
        'Click each version → Modify → Repair',
        'Repeat for all Visual C++ versions',
        'Restart your computer'
      ]
    },
    advancedFix: {
      title: 'Re-register Core Windows DLLs',
      why: 'This re-registers all system DLLs, fixing registration corruption issues.',
      steps: [
        'Open Command Prompt as Administrator',
        'Run: for %i in (%windir%\\system32\\*.dll) do regsvr32.exe /s %i',
        'Wait for the process to complete (may take 5-10 minutes)',
        'Restart your computer'
      ]
    },
    command: 'sfc /scannow && DISM /Online /Cleanup-Image /RestoreHealth',
    registryPath: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows - LoadAppInit_DLLs should be 0',
    microsoftKB: 'KB5005033'
  },
  '0xc0000005': {
    technicalName: 'STATUS_ACCESS_VIOLATION',
    meaning: 'The application tried to access memory it shouldn\'t',
    commonTriggers: [
      'Faulty RAM',
      'Overclocking',
      'Outdated GPU drivers',
      'Anti-cheat software conflicts',
      'Virtualization software'
    ],
    affectedApps: ['Games with anti-cheat', 'Video editing software', 'CAD applications', '3D rendering software', 'Database applications'],
    primaryFix: {
      title: 'Add DEP Exception for the Application',
      why: 'DEP is a security feature that can conflict with older applications. Adding an exception allows the app to run while keeping other apps protected.',
      steps: [
        'Press Win + R, type sysdm.cpl, press Enter',
        'Go to Advanced tab → Performance Settings',
        'Click Data Execution Prevention tab',
        'Select "Turn on DEP for all programs except those I select"',
        'Click Add and browse to the problematic application',
        'Click OK and restart'
      ]
    },
    secondaryFix: {
      title: 'Test RAM for Errors',
      why: 'Faulty RAM causes random memory access violations. Windows Memory Diagnostic can detect failing RAM modules.',
      steps: [
        'Press Win + R, type mdsched.exe, press Enter',
        'Click "Restart now and check for problems"',
        'Wait for the test to complete (10-20 minutes)',
        'Check results in Event Viewer → Windows Logs → System'
      ]
    },
    advancedFix: {
      title: 'Update or Roll Back Graphics Drivers',
      why: 'GPU drivers interact heavily with system memory. Buggy drivers are a leading cause of 0xc0000005 errors in games.',
      steps: [
        'Press Win + X → Device Manager',
        'Expand Display adapters',
        'Right-click your GPU → Update driver',
        'Or: Properties → Driver tab → Roll Back Driver',
        'Restart your computer'
      ]
    },
    command: 'bcdedit /set nx OptIn'
  },
  '0xc000007b': {
    technicalName: 'STATUS_INVALID_IMAGE_FORMAT',
    meaning: '32-bit/64-bit architecture mismatch',
    commonTriggers: [
      'Mixed DLL versions',
      'Incomplete software installation',
      'Running 32-bit app on 64-bit Windows incorrectly'
    ],
    affectedApps: ['Games', 'Adobe software', 'Development tools', 'Multimedia applications'],
    primaryFix: {
      title: 'Install All Visual C++ Redistributable Versions',
      why: 'Many applications bundle both 32-bit and 64-bit components. Installing all runtime versions ensures compatibility.',
      steps: [
        'Download Visual C++ 2015-2022 x64: aka.ms/vs/17/release/vc_redist.x64.exe',
        'Download Visual C++ 2015-2022 x86: aka.ms/vs/17/release/vc_redist.x86.exe',
        'Install x64 version first, then x86 version',
        'Also install older versions: 2013, 2012, 2010, 2008',
        'Restart your computer'
      ]
    },
    secondaryFix: {
      title: 'Repair DirectX Installation',
      why: 'DirectX components can become mixed between 32-bit and 64-bit versions, causing this error.',
      steps: [
        'Download DirectX End-User Runtime from Microsoft',
        'Extract to a folder (don\'t run yet)',
        'Open Command Prompt as Admin in that folder',
        'Run: DXSETUP.exe /silent',
        'Restart your computer'
      ]
    },
    advancedFix: {
      title: 'Replace Corrupted System DLLs',
      why: 'This error often points to specific corrupted DLLs. Replacing them with verified copies usually resolves the issue.',
      steps: [
        'Download the DirectX Repair Tool (third-party but trusted)',
        'Or: Copy known-good DLLs from another Windows installation',
        'Target files: msvcr100.dll, msvcr110.dll, msvcr120.dll, msvcp140.dll',
        'Place them in both System32 (64-bit) and SysWOW64 (32-bit) folders'
      ]
    },
    command: 'sfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows'
  },
  'side-by-side': {
    technicalName: 'SxS Configuration Error',
    meaning: 'Windows Side-by-Side assembly system cannot find required dependencies',
    commonTriggers: [
      'Corrupted Visual C++ installation',
      'Missing manifest files',
      'Registry corruption in SxS store',
      'Incomplete Windows update'
    ],
    affectedApps: ['Legacy applications', 'Custom enterprise software', 'Older games', 'Applications built with older Visual Studio'],
    primaryFix: {
      title: 'Reinstall All Visual C++ Redistributables',
      why: 'The SxS system relies on Visual C++ runtime libraries. Corrupted installations cause this error.',
      steps: [
        'Open Settings → Apps → Installed apps',
        'Uninstall ALL Microsoft Visual C++ Redistributable entries',
        'Restart your computer',
        'Download and install VC++ 2008, 2010, 2012, 2013, 2015-2022 (both x86 and x64)',
        'Restart again'
      ]
    },
    secondaryFix: {
      title: 'Use Event Viewer to Identify the Exact Missing Component',
      why: 'Event Viewer logs specify exactly which assembly is missing, enabling targeted repairs.',
      steps: [
        'Press Win + X → Event Viewer',
        'Navigate to Windows Logs → Application',
        'Look for "SideBySide" errors',
        'Note the assembly name and version',
        'Search for and install that specific runtime'
      ]
    },
    advancedFix: {
      title: 'Repair the WinSxS Component Store',
      why: 'The SxS component store can become corrupted. DISM can repair it using Windows Update as a source.',
      steps: [
        'Open Command Prompt as Administrator',
        'Run: DISM /Online /Cleanup-Image /RestoreHealth',
        'Wait for completion (can take 15-30 minutes)',
        'Run: sfc /scannow',
        'Restart your computer'
      ]
    },
    command: 'DISM /Online /Cleanup-Image /RestoreHealth && sfc /scannow'
  },
  'bad-image': {
    technicalName: 'STATUS_INVALID_IMAGE_FORMAT (0xc000012f / 0xc0000020)',
    meaning: 'The DLL file is corrupted, incompatible, or malformed',
    commonTriggers: [
      'Incomplete file download',
      'Disk corruption',
      'Malware infection',
      'Failed Windows update',
      'Wrong DLL version copied manually'
    ],
    affectedApps: ['Web browsers', 'Office applications', 'Games', 'System utilities'],
    primaryFix: {
      title: 'Run System File Checker to Replace Corrupted DLLs',
      why: 'SFC scans all protected system files and replaces corrupted ones with cached copies.',
      steps: [
        'Open Command Prompt as Administrator',
        'Run: sfc /scannow',
        'Wait for the scan to complete (10-15 minutes)',
        'If corruption found, restart and run again',
        'Check if the error is resolved'
      ]
    },
    secondaryFix: {
      title: 'Reinstall the Affected Application',
      why: 'If a specific application\'s DLL is corrupted, reinstalling replaces all its files with fresh copies.',
      steps: [
        'Note which application triggers the error',
        'Open Settings → Apps → Installed apps',
        'Find and uninstall the affected application',
        'Delete any remaining files in Program Files',
        'Download a fresh installer and reinstall'
      ]
    },
    advancedFix: {
      title: 'Use DISM with Windows ISO as Source',
      why: 'If the Windows component store itself is corrupted, DISM can use a Windows ISO to repair it.',
      steps: [
        'Download Windows 11/10 ISO from Microsoft',
        'Mount the ISO (double-click it)',
        'Note the drive letter (e.g., D:)',
        'Run as Admin: DISM /Online /Cleanup-Image /RestoreHealth /Source:D:\\sources\\install.wim',
        'After completion, run sfc /scannow'
      ]
    },
    command: 'DISM /Online /Cleanup-Image /RestoreHealth'
  },
  'entry-point': {
    technicalName: 'Entry Point Not Found',
    meaning: 'A required function doesn\'t exist in the DLL the application is trying to use',
    commonTriggers: [
      'DLL version mismatch',
      'Old DLL replacing newer version',
      'Application compiled against different DLL version',
      'Portable apps overwriting system DLLs'
    ],
    affectedApps: ['Node.js applications', 'Python with native extensions', 'Games with mods', 'Applications using plugins'],
    primaryFix: {
      title: 'Update the Conflicting DLL',
      why: 'The application expects a newer version of the DLL with functions that don\'t exist in the current version.',
      steps: [
        'Note which DLL and function are mentioned in the error',
        'Check if the application has an update available',
        'Update Visual C++ Redistributables to get latest DLLs',
        'If it\'s a third-party DLL, reinstall the software that provides it',
        'Restart your computer'
      ]
    },
    secondaryFix: {
      title: 'Restore Original System DLLs',
      why: 'Third-party software sometimes replaces system DLLs with incompatible versions.',
      steps: [
        'Open Command Prompt as Administrator',
        'Run: sfc /scannow',
        'If the DLL is in System32, this should restore the original',
        'For application-specific DLLs, reinstall the application',
        'Restart and test'
      ]
    },
    advancedFix: {
      title: 'Use Dependency Walker to Analyze',
      why: 'Dependency Walker shows exactly which DLLs an application loads and can identify version conflicts.',
      steps: [
        'Download Dependency Walker (depends.exe) from dependencywalker.com',
        'Open the problematic .exe file with it',
        'Look for DLLs marked with red or yellow icons',
        'Note which DLL has the missing entry point',
        'Find the correct version of that DLL'
      ]
    }
  }
};

// 游戏 DLL 知识库
const gameDllKnowledge: Record<string, {
  description: string;
  games: string[];
  solution: string;
  downloadUrl: string;
}> = {
  'msvcp140.dll': {
    description: 'Microsoft Visual C++ 2015-2022 Runtime Library',
    games: ['GTA V', 'Cyberpunk 2077', 'Red Dead Redemption 2', 'Call of Duty', 'Fortnite'],
    solution: 'Install Visual C++ Redistributable 2015-2022',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe'
  },
  'vcruntime140.dll': {
    description: 'Visual C++ Runtime Library (core component)',
    games: ['The Witcher 3', 'Elden Ring', 'Hogwarts Legacy', 'Baldur\'s Gate 3'],
    solution: 'Install Visual C++ Redistributable 2015-2022',
    downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe'
  },
  'd3dx9_43.dll': {
    description: 'DirectX 9 Direct3D Extension Library',
    games: ['League of Legends', 'Counter-Strike', 'Dota 2', 'World of Warcraft'],
    solution: 'Install DirectX End-User Runtime',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35'
  },
  'xinput1_3.dll': {
    description: 'Xbox Controller Input Library',
    games: ['Dark Souls', 'Sekiro', 'Resident Evil', 'Devil May Cry'],
    solution: 'Install DirectX End-User Runtime',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35'
  },
  'physxloader.dll': {
    description: 'NVIDIA PhysX Physics Engine Library',
    games: ['Borderlands 3', 'Batman Arkham series', 'Metro Exodus', 'Mafia'],
    solution: 'Install NVIDIA PhysX System Software',
    downloadUrl: 'https://www.nvidia.com/en-us/drivers/physx/physx-9-19-0218-driver/'
  },
  'steam_api64.dll': {
    description: 'Steam Platform Integration Library',
    games: ['All Steam games', 'Counter-Strike 2', 'Dota 2', 'Team Fortress 2'],
    solution: 'Verify game integrity through Steam or reinstall the game',
    downloadUrl: 'steam://validate'
  },
  'openal32.dll': {
    description: 'OpenAL Audio Library',
    games: ['Minecraft', 'Unreal Tournament', 'Doom', 'Prey'],
    solution: 'Install OpenAL SDK',
    downloadUrl: 'https://www.openal.org/downloads/'
  },
  'xaudio2_7.dll': {
    description: 'DirectX Audio Processing Library',
    games: ['Call of Duty Modern Warfare', 'Battlefield', 'FIFA', 'Madden NFL'],
    solution: 'Install DirectX End-User Runtime',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35'
  }
};

// 通用 DLL 知识
const genericDllKnowledge: Record<string, {
  category: string;
  description: string;
  solution: string;
  downloadUrl: string;
}> = {
  'msvcr': {
    category: 'Visual C++ Runtime',
    description: 'Microsoft Visual C++ Runtime Library',
    solution: 'Install the appropriate Visual C++ Redistributable version',
    downloadUrl: 'https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist'
  },
  'msvcp': {
    category: 'Visual C++ Runtime',
    description: 'Microsoft Visual C++ Standard Library',
    solution: 'Install the appropriate Visual C++ Redistributable version',
    downloadUrl: 'https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist'
  },
  'd3d': {
    category: 'DirectX',
    description: 'Direct3D Graphics Library',
    solution: 'Install DirectX End-User Runtime or update graphics drivers',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35'
  },
  'xinput': {
    category: 'DirectX Input',
    description: 'Xbox Input Library for Controllers',
    solution: 'Install DirectX End-User Runtime',
    downloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35'
  }
};

interface GuideSection {
  heading: string;
  content: string;
}

interface Guide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishDate: string;
  updateDate: string;
  author: string;
  keywords: string[];
  searchVolume: string;
  sections: GuideSection[];
  relatedDlls: string[];
  microsoftKB?: string;
}

function generateHighQualityErrorGuide(originalGuide: Guide): Guide {
  const errorCode = originalGuide.id.match(/0x[a-f0-9]+|side-by-side|bad-image|entry-point/i)?.[0]?.toLowerCase() || '';
  
  // 尝试匹配知识库
  let knowledge = errorCodeKnowledge[errorCode];
  if (!knowledge && originalGuide.id.includes('side')) knowledge = errorCodeKnowledge['side-by-side'];
  if (!knowledge && originalGuide.id.includes('bad')) knowledge = errorCodeKnowledge['bad-image'];
  if (!knowledge && originalGuide.id.includes('entry')) knowledge = errorCodeKnowledge['entry-point'];
  
  if (!knowledge) {
    // 使用通用但有意义的内容
    return generateGenericErrorGuide(originalGuide);
  }

  const sections: GuideSection[] = [
    {
      heading: 'What Does This Error Actually Mean?',
      content: `Seeing the **${errorCode.toUpperCase()}** error on your Windows PC? You're not alone—this is one of the most common system errors that affects launch applications. The good news is that it's almost always fixable, and this guide will walk you through every proven solution.

### Technical Explanation

**Error Code**: \`${errorCode}\`
**Translation**: ${knowledge.technicalName} - ${knowledge.meaning}

${getErrorMechanismExplanation(errorCode)}

### Common Triggers for This Error

${knowledge.commonTriggers.map((t, i) => `${i + 1}. **${t}**`).join('\n')}

### Applications Commonly Affected

${knowledge.affectedApps.map(a => `- ${a}`).join('\n')}`
    },
    {
      heading: `Quick Fix (Works for 80% of Users)`,
      content: `**Why this works**: ${knowledge.primaryFix.why}

### Steps:

${knowledge.primaryFix.steps.map((s, i) => `**Step ${i + 1}**: ${s}`).join('\n\n')}`
    },
    {
      heading: `Solution 2: ${knowledge.secondaryFix.title}`,
      content: `**Why this works**: ${knowledge.secondaryFix.why}

### Steps:

${knowledge.secondaryFix.steps.map((s, i) => `**Step ${i + 1}**: ${s}`).join('\n\n')}`
    },
    {
      heading: `Solution 3: ${knowledge.advancedFix.title}`,
      content: `**Why this works**: ${knowledge.advancedFix.why}

### Steps:

${knowledge.advancedFix.steps.map((s, i) => `**Step ${i + 1}**: ${s}`).join('\n\n')}`
    }
  ];

  // 添加命令行修复部分
  if (knowledge.command) {
    sections.push({
      heading: 'Command Line Repair',
      content: `For advanced users, these commands can repair the underlying system issues:

\`\`\`batch
${knowledge.command}
\`\`\`

**How to run**: Press \`Win + X\`, select "Terminal (Admin)" or "Command Prompt (Admin)", paste the command, and press Enter.

**Expected duration**: 15-30 minutes depending on system state.`
    });
  }

  // 添加注册表检查部分
  if (knowledge.registryPath) {
    sections.push({
      heading: 'Registry Check (Advanced)',
      content: `⚠️ **Warning**: Only modify the registry if you're comfortable with advanced Windows settings. Always back up your registry first.

**Registry path to check**:
\`${knowledge.registryPath}\`

**How to access**:
1. Press \`Win + R\`, type \`regedit\`, press Enter
2. Navigate to the path above
3. Verify the value matches what's expected
4. If not, right-click → Modify → Set the correct value`
    });
  }

  // 添加预防措施
  sections.push({
    heading: 'Preventing Future Occurrences',
    content: `Once you've fixed the ${errorCode.toUpperCase()} error, here's how to prevent it from returning:

### System Maintenance
- **Keep Windows Updated**: Enable automatic updates to receive the latest fixes
- **Regular SFC Scans**: Run \`sfc /scannow\` monthly to catch corruption early
- **Monitor Disk Health**: Use CrystalDiskInfo to check your storage drives

### Software Practices
- **Install Runtimes First**: Before installing new software, ensure Visual C++ and DirectX are current
- **Use Official Sources**: Only download software from official websites or trusted stores
- **Careful with Updates**: Major Windows updates can sometimes cause DLL issues—wait a week before updating

### Backup Strategy
- **Create Restore Points**: Before installing major software, create a System Restore point
- **Backup Critical Data**: Use Windows Backup or a third-party solution
- **Document Fixes**: If you find a solution that works, note it down for future reference`
  });

  return {
    ...originalGuide,
    metaDescription: `${knowledge.meaning} causing ${errorCode}? Complete guide with 3 proven solutions. Works on Windows 11 and 10.`,
    excerpt: `${knowledge.technicalName} - ${knowledge.meaning}. This guide provides specific solutions for the ${errorCode} error, not generic troubleshooting steps.`,
    sections,
    microsoftKB: knowledge.microsoftKB
  };
}

function getErrorMechanismExplanation(errorCode: string): string {
  const explanations: Record<string, string> = {
    '0xc0000142': 'Windows cannot initialize a DLL required by the application. This occurs during the DLL\'s DllMain() function execution.',
    '0xc0000005': 'A program attempted to read from or write to a memory address it doesn\'t have permission to access. This is often caused by buggy software, driver issues, or hardware problems.',
    '0xc000007b': 'The application tried to load a DLL with incompatible architecture. A 64-bit app tried to load a 32-bit DLL or vice versa.',
    'side-by-side': 'Windows Side-by-Side (SxS) assembly system manages multiple versions of DLLs. This error means it can\'t find a required version.',
    'bad-image': 'Windows detected that the DLL file structure is corrupted or doesn\'t match what\'s expected. The file may have been damaged during download or by malware.',
    'entry-point': 'The application is calling a function that doesn\'t exist in the loaded DLL. This usually means the DLL version is older than what the application expects.'
  };
  return explanations[errorCode] || 'This error indicates a problem with DLL loading or initialization.';
}

function generateGenericErrorGuide(originalGuide: Guide): Guide {
  // 为没有特定知识的错误生成通用但有意义的内容
  const errorName = originalGuide.title.replace(/^(How to |Fix |Solve )?(the )?/i, '').replace(/ (Error|in Windows.*)$/i, '');
  
  const sections: GuideSection[] = [
    {
      heading: `Understanding the ${errorName}`,
      content: `The **${errorName}** is a Windows system error that typically indicates a problem with DLL files or system components. This guide will help you resolve it with proven solutions.

### What Causes This Error?

1. **Missing or Corrupted DLL Files**: Required system files may be damaged
2. **Outdated Runtime Libraries**: Visual C++ or .NET Framework may need updating
3. **Software Conflicts**: Other programs may be interfering
4. **Windows Update Issues**: Recent updates may have caused compatibility problems
5. **Registry Corruption**: System registry entries may be damaged`
    },
    {
      heading: 'Solution 1: Install/Repair Visual C++ Redistributables',
      content: `**Why this works**: Most Windows applications depend on Visual C++ runtime libraries. Reinstalling them replaces any corrupted files.

### Steps:

**Step 1**: Download both versions:
- [Visual C++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 2**: Run the x64 installer first, click "Repair" if already installed

**Step 3**: Run the x86 installer, click "Repair" if already installed

**Step 4**: Restart your computer and test the application`
    },
    {
      heading: 'Solution 2: Run System File Checker',
      content: `**Why this works**: SFC scans all protected Windows system files and replaces corrupted ones from a cached copy.

### Steps:

**Step 1**: Press \`Win + X\` and select "Terminal (Admin)" or "Command Prompt (Admin)"

**Step 2**: Type the following command and press Enter:
\`\`\`
sfc /scannow
\`\`\`

**Step 3**: Wait for the scan to complete (10-15 minutes)

**Step 4**: If issues were found, run this additional command:
\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

**Step 5**: Restart your computer`
    },
    {
      heading: 'Solution 3: Reinstall the Affected Application',
      content: `**Why this works**: A clean reinstall replaces all application files and re-registers its DLLs.

### Steps:

**Step 1**: Open Settings → Apps → Installed apps

**Step 2**: Find the application that's showing the error

**Step 3**: Click the three dots (⋯) → Uninstall

**Step 4**: Restart your computer

**Step 5**: Download a fresh installer from the official website

**Step 6**: Install the application again`
    },
    {
      heading: 'Additional Solutions',
      content: `If the above solutions didn't work, try these additional fixes:

### Update Windows
- Open Settings → Windows Update → Check for updates
- Install all available updates and restart

### Update Drivers
- Press \`Win + X\` → Device Manager
- Expand each category and look for yellow warning icons
- Right-click any device with warnings → Update driver

### Clean Boot
- Press \`Win + R\`, type \`msconfig\`, press Enter
- Go to Services tab → Check "Hide all Microsoft services" → Click "Disable all"
- Go to Startup tab → Click "Open Task Manager"
- Disable all startup items
- Restart and test if the error persists`
    },
    {
      heading: 'Prevention Tips',
      content: `To avoid this error in the future:

1. **Keep Windows Updated**: Enable automatic updates
2. **Install Runtime Libraries**: Keep Visual C++, DirectX, and .NET updated
3. **Use Official Sources**: Only download software from trusted sources
4. **Regular Maintenance**: Run SFC scans monthly
5. **Create Restore Points**: Before major software installations`
    }
  ];

  return {
    ...originalGuide,
    sections
  };
}

function generateHighQualityDllGuide(originalGuide: Guide): Guide {
  // 从标题提取 DLL 名称
  const dllMatch = originalGuide.title.match(/([a-z0-9_]+\.dll)/i);
  const dllName = dllMatch ? dllMatch[1].toLowerCase() : '';
  
  // 检查是否有特定知识
  const specificKnowledge = gameDllKnowledge[dllName];
  
  // 检查通用类别
  let genericCategory = '';
  for (const [prefix, knowledge] of Object.entries(genericDllKnowledge)) {
    if (dllName.startsWith(prefix)) {
      genericCategory = prefix;
      break;
    }
  }

  if (specificKnowledge) {
    return generateSpecificDllGuide(originalGuide, dllName, specificKnowledge);
  } else if (genericCategory) {
    return generateCategoryDllGuide(originalGuide, dllName, genericDllKnowledge[genericCategory]);
  } else {
    return generateGenericDllGuide(originalGuide, dllName);
  }
}

function generateSpecificDllGuide(originalGuide: Guide, dllName: string, knowledge: typeof gameDllKnowledge[string]): Guide {
  const sections: GuideSection[] = [
    {
      heading: `What is ${dllName}?`,
      content: `**${dllName}** is ${knowledge.description}. This file is essential for many popular applications and games to function properly.

### Games and Applications That Need This File

${knowledge.games.map(g => `- ${g}`).join('\n')}

### Why This Error Occurs

The "${dllName} is missing" error appears when:
1. The required runtime package isn't installed
2. The DLL file has become corrupted
3. Antivirus software quarantined the file
4. A recent Windows update affected the file`
    },
    {
      heading: 'Recommended Solution',
      content: `**${knowledge.solution}**

### Download Link
${knowledge.downloadUrl.startsWith('http') ? `[Official Download](${knowledge.downloadUrl})` : knowledge.downloadUrl}

### Installation Steps:

**Step 1**: Download the installer from the link above

**Step 2**: Close all running applications

**Step 3**: Run the installer as Administrator (right-click → Run as administrator)

**Step 4**: Follow the installation prompts

**Step 5**: Restart your computer

**Step 6**: Try running the game or application again`
    },
    {
      heading: 'Alternative Solutions',
      content: `If the recommended solution didn't work:

### Verify Game Files (Steam)
1. Open Steam and go to your Library
2. Right-click the game → Properties
3. Go to "Installed Files" tab
4. Click "Verify integrity of game files"
5. Wait for the process to complete

### Verify Game Files (Epic Games)
1. Open Epic Games Launcher
2. Go to your Library
3. Click the three dots on the game
4. Select "Verify"

### Reinstall the Game
1. Uninstall the game completely
2. Delete any remaining files in the game folder
3. Reinstall the game from your platform`
    },
    {
      heading: 'System File Repair',
      content: `For persistent issues, repair Windows system files:

### Run System File Checker

Open Command Prompt as Administrator and run:

\`\`\`batch
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

### Check for Windows Updates

1. Open Settings → Windows Update
2. Click "Check for updates"
3. Install all available updates
4. Restart your computer`
    }
  ];

  return {
    ...originalGuide,
    metaDescription: `Fix ${dllName} is missing error. ${knowledge.solution}. Works for ${knowledge.games.slice(0, 3).join(', ')} and more.`,
    excerpt: `${dllName} - ${knowledge.description}. This guide shows you how to fix the missing DLL error quickly.`,
    sections
  };
}

function generateCategoryDllGuide(originalGuide: Guide, dllName: string, knowledge: typeof genericDllKnowledge[string]): Guide {
  const sections: GuideSection[] = [
    {
      heading: `What is ${dllName}?`,
      content: `**${dllName}** is part of the ${knowledge.category}. ${knowledge.description}.

### Why This File is Important

This DLL file is required by many Windows applications for:
- Core functionality and features
- Graphics rendering (for D3D files)
- Input handling (for XInput files)
- Standard library functions (for MSVC files)

### Common Error Messages

- "${dllName} is missing from your computer"
- "The program can't start because ${dllName} is missing"
- "The code execution cannot proceed because ${dllName} was not found"
- "${dllName} not found"`
    },
    {
      heading: 'Quick Fix',
      content: `**${knowledge.solution}**

### Download
[Official Microsoft Download](${knowledge.downloadUrl})

### Steps:

**Step 1**: Visit the download page above

**Step 2**: Download the appropriate version for your system:
- **x64 (64-bit)**: For 64-bit Windows (most common)
- **x86 (32-bit)**: For 32-bit Windows or 32-bit applications on 64-bit Windows

**Step 3**: Install BOTH versions if unsure

**Step 4**: Restart your computer

**Step 5**: Run the application again`
    },
    {
      heading: 'Install All Runtime Versions',
      content: `For comprehensive coverage, install all Visual C++ versions:

### Download Links

| Version | x64 | x86 |
|---------|-----|-----|
| 2015-2022 | [Download](https://aka.ms/vs/17/release/vc_redist.x64.exe) | [Download](https://aka.ms/vs/17/release/vc_redist.x86.exe) |
| 2013 | [Download](https://aka.ms/highdpimfc2013x64enu) | [Download](https://aka.ms/highdpimfc2013x86enu) |
| 2012 | [Download](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe) | [Download](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe) |
| 2010 | [Download](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe) | [Download](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe) |

### Installation Order

Install from oldest to newest: 2010 → 2012 → 2013 → 2015-2022`
    },
    {
      heading: 'Additional Solutions',
      content: `### Run System File Checker

\`\`\`batch
sfc /scannow
\`\`\`

### Repair Windows Image

\`\`\`batch
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

### Check Application Requirements

1. Visit the application's official website
2. Look for system requirements
3. Download any required runtime packages mentioned

### Reinstall the Application

1. Uninstall the application
2. Delete leftover files in Program Files
3. Reinstall from official source`
    }
  ];

  return {
    ...originalGuide,
    metaDescription: `Fix ${dllName} is missing error. ${knowledge.solution}. Step-by-step guide for Windows 11/10.`,
    excerpt: `${dllName} - ${knowledge.description}. Learn how to fix this common DLL error.`,
    sections
  };
}

function generateGenericDllGuide(originalGuide: Guide, dllName: string): Guide {
  const sections: GuideSection[] = [
    {
      heading: `About ${dllName || 'This DLL'}`,
      content: `This DLL file is required by various Windows applications to function properly. When it's missing or corrupted, you'll see an error message preventing the application from starting.

### Common Error Messages

- "The program can't start because ${dllName || 'this DLL'} is missing"
- "${dllName || 'DLL'} was not found"
- "The code execution cannot proceed because ${dllName || 'the DLL'} was not found"

### Why This Happens

1. **Runtime not installed**: The required runtime package isn't on your system
2. **File corruption**: The DLL file has become damaged
3. **Antivirus interference**: Security software may have quarantined the file
4. **Incomplete installation**: The application didn't install properly`
    },
    {
      heading: 'Solution 1: Install Visual C++ Redistributables',
      content: `Most DLL errors are caused by missing Visual C++ runtime files.

### Downloads

- [Visual C++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)

### Steps

**Step 1**: Download both x64 and x86 versions

**Step 2**: Run the x64 installer first

**Step 3**: Run the x86 installer

**Step 4**: Restart your computer

**Step 5**: Try the application again`
    },
    {
      heading: 'Solution 2: Install DirectX Runtime',
      content: `For games and multimedia applications, DirectX is often required.

### Download

[DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)

### Steps

**Step 1**: Download the DirectX installer

**Step 2**: Run the installer as Administrator

**Step 3**: Follow the installation wizard

**Step 4**: Restart your computer`
    },
    {
      heading: 'Solution 3: Repair System Files',
      content: `Use Windows built-in tools to repair corrupted system files.

### Run System File Checker

Open Command Prompt as Administrator:

\`\`\`batch
sfc /scannow
\`\`\`

Wait for the scan to complete.

### Run DISM Repair

If SFC found issues:

\`\`\`batch
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

### Restart

Restart your computer after both commands complete.`
    },
    {
      heading: 'Solution 4: Reinstall the Application',
      content: `A clean reinstall often resolves DLL issues:

**Step 1**: Open Settings → Apps → Installed apps

**Step 2**: Find and uninstall the affected application

**Step 3**: Restart your computer

**Step 4**: Delete any remaining files in:
- \`C:\\Program Files\\[Application]\`
- \`C:\\Program Files (x86)\\[Application]\`

**Step 5**: Download a fresh installer from the official website

**Step 6**: Install the application`
    }
  ];

  return {
    ...originalGuide,
    sections
  };
}

async function main() {
  console.log('🔄 开始重新生成高质量指南...\n');
  
  // 读取原始备份
  const backupPath = path.join(__dirname, '../backups/auto-generated-guides-2025-12-05T12-16-58-244Z.json');
  const outputPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
  
  const originalContent = fs.readFileSync(backupPath, 'utf-8').replace(/^\/\/.*\n/, '');
  const originalGuides: Guide[] = JSON.parse(originalContent);
  
  console.log(`📚 找到 ${originalGuides.length} 条原始指南\n`);
  
  const improvedGuides: Guide[] = [];
  
  for (const guide of originalGuides) {
    let improvedGuide: Guide;
    
    if (guide.category === 'Error Codes') {
      improvedGuide = generateHighQualityErrorGuide(guide);
      console.log(`✅ 错误码指南: ${guide.id}`);
    } else {
      improvedGuide = generateHighQualityDllGuide(guide);
      console.log(`✅ DLL 指南: ${guide.id}`);
    }
    
    // 更新日期
    improvedGuide.updateDate = new Date().toISOString().split('T')[0];
    
    improvedGuides.push(improvedGuide);
  }
  
  // 保存
  fs.writeFileSync(outputPath, JSON.stringify(improvedGuides, null, 2));
  
  console.log(`\n✅ 完成！共生成 ${improvedGuides.length} 条高质量指南`);
  console.log(`📁 已保存到: ${outputPath}`);
}

main().catch(console.error);
