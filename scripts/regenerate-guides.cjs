/**
 * 重新生成所有指南 - 高质量版本 (JavaScript)
 */

const fs = require('fs');
const path = require('path');

// 错误码专业知识库
const errorCodeKnowledge = {
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
    registryPath: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows - LoadAppInit_DLLs should be 0'
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
      why: 'DEP is a security feature that can conflict with older applications.',
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
      why: 'Faulty RAM causes random memory access violations.',
      steps: [
        'Press Win + R, type mdsched.exe, press Enter',
        'Click "Restart now and check for problems"',
        'Wait for the test to complete (10-20 minutes)',
        'Check results in Event Viewer → Windows Logs → System'
      ]
    },
    advancedFix: {
      title: 'Update or Roll Back Graphics Drivers',
      why: 'GPU drivers interact heavily with system memory.',
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
      why: 'Many applications bundle both 32-bit and 64-bit components.',
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
      why: 'DirectX components can become mixed between 32-bit and 64-bit versions.',
      steps: [
        'Download DirectX End-User Runtime from Microsoft',
        'Extract to a folder',
        'Open Command Prompt as Admin in that folder',
        'Run: DXSETUP.exe /silent',
        'Restart your computer'
      ]
    },
    advancedFix: {
      title: 'Replace Corrupted System DLLs',
      why: 'This error often points to specific corrupted DLLs.',
      steps: [
        'Download the DirectX Repair Tool',
        'Or: Copy known-good DLLs from another Windows installation',
        'Target files: msvcr100.dll, msvcr110.dll, msvcr120.dll, msvcp140.dll',
        'Place them in both System32 (64-bit) and SysWOW64 (32-bit) folders'
      ]
    },
    command: 'sfc /scannow'
  }
};

// 游戏 DLL 知识库
const gameDllKnowledge = {
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
    downloadUrl: 'https://www.nvidia.com/en-us/drivers/physx/'
  },
  'steam_api64.dll': {
    description: 'Steam Platform Integration Library',
    games: ['All Steam games', 'Counter-Strike 2', 'Dota 2', 'Team Fortress 2'],
    solution: 'Verify game integrity through Steam or reinstall the game',
    downloadUrl: 'steam://validate'
  },
  'openal32.dll': {
    description: 'OpenAL Audio Library',
    games: ['Minecraft', 'Doom', 'Prey', 'Quake'],
    solution: 'Install OpenAL SDK',
    downloadUrl: 'https://www.openal.org/downloads/'
  }
};

function generateHighQualityErrorGuide(originalGuide) {
  const errorCode = originalGuide.id.match(/0x[a-f0-9]+/i)?.[0]?.toLowerCase() || '';
  const knowledge = errorCodeKnowledge[errorCode];
  
  if (!knowledge) {
    return generateGenericErrorGuide(originalGuide);
  }

  const sections = [
    {
      heading: 'What Does This Error Actually Mean?',
      content: `Seeing the **${errorCode.toUpperCase()}** error on your Windows PC? You're not alone—this is one of the most common system errors. The good news is that it's almost always fixable.

### Technical Explanation

**Error Code**: \`${errorCode}\`
**Translation**: ${knowledge.technicalName} - ${knowledge.meaning}

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
    },
    {
      heading: 'Command Line Repair',
      content: `For advanced users, these commands can repair the underlying system issues:

\`\`\`batch
${knowledge.command}
\`\`\`

**How to run**: Press \`Win + X\`, select "Terminal (Admin)", paste the command, and press Enter.`
    },
    {
      heading: 'Preventing Future Occurrences',
      content: `Once you've fixed the ${errorCode.toUpperCase()} error, here's how to prevent it from returning:

### System Maintenance
- **Keep Windows Updated**: Enable automatic updates
- **Regular SFC Scans**: Run \`sfc /scannow\` monthly
- **Monitor Disk Health**: Use CrystalDiskInfo

### Software Practices
- **Install Runtimes First**: Ensure Visual C++ and DirectX are current
- **Use Official Sources**: Only download from trusted sources
- **Create Restore Points**: Before major software installations`
    }
  ];

  return {
    ...originalGuide,
    metaDescription: `${knowledge.meaning} causing ${errorCode}? Complete guide with 3 proven solutions. Works on Windows 11 and 10.`,
    excerpt: `${knowledge.technicalName} - ${knowledge.meaning}. This guide provides specific solutions for the ${errorCode} error.`,
    sections,
    updateDate: new Date().toISOString().split('T')[0]
  };
}

function generateGenericErrorGuide(originalGuide) {
  const errorName = originalGuide.title.replace(/^(How to |Fix |Solve )?(the )?/i, '').replace(/ (Error|in Windows.*)$/i, '');
  
  const sections = [
    {
      heading: `Understanding the ${errorName}`,
      content: `The **${errorName}** is a Windows system error that typically indicates a problem with DLL files or system components.

### What Causes This Error?

1. **Missing or Corrupted DLL Files**: Required system files may be damaged
2. **Outdated Runtime Libraries**: Visual C++ or .NET Framework may need updating
3. **Software Conflicts**: Other programs may be interfering
4. **Windows Update Issues**: Recent updates may have caused compatibility problems
5. **Registry Corruption**: System registry entries may be damaged`
    },
    {
      heading: 'Solution 1: Install/Repair Visual C++ Redistributables',
      content: `**Why this works**: Most Windows applications depend on Visual C++ runtime libraries.

### Steps:

**Step 1**: Download both versions:
- [Visual C++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Visual C++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 2**: Run the x64 installer first, click "Repair" if already installed

**Step 3**: Run the x86 installer, click "Repair" if already installed

**Step 4**: Restart your computer`
    },
    {
      heading: 'Solution 2: Run System File Checker',
      content: `**Why this works**: SFC scans all protected Windows system files and replaces corrupted ones.

### Steps:

**Step 1**: Press \`Win + X\` and select "Terminal (Admin)"

**Step 2**: Type the following command:
\`\`\`
sfc /scannow
\`\`\`

**Step 3**: Wait for the scan to complete (10-15 minutes)

**Step 4**: If issues were found, run:
\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

**Step 5**: Restart your computer`
    },
    {
      heading: 'Solution 3: Reinstall the Affected Application',
      content: `**Why this works**: A clean reinstall replaces all application files.

**Step 1**: Open Settings → Apps → Installed apps

**Step 2**: Find and uninstall the affected application

**Step 3**: Restart your computer

**Step 4**: Download a fresh installer from the official website

**Step 5**: Install the application again`
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
    sections,
    updateDate: new Date().toISOString().split('T')[0]
  };
}

function generateHighQualityDllGuide(originalGuide) {
  const dllMatch = originalGuide.title.match(/([a-z0-9_]+\.dll)/i);
  const dllName = dllMatch ? dllMatch[1].toLowerCase() : '';
  const knowledge = gameDllKnowledge[dllName];
  
  if (knowledge) {
    return generateSpecificDllGuide(originalGuide, dllName, knowledge);
  }
  return generateGenericDllGuide(originalGuide, dllName);
}

function generateSpecificDllGuide(originalGuide, dllName, knowledge) {
  const sections = [
    {
      heading: `What is ${dllName}?`,
      content: `**${dllName}** is ${knowledge.description}. This file is essential for many popular applications and games.

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

**Step 3**: Run the installer as Administrator

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
    sections,
    updateDate: new Date().toISOString().split('T')[0]
  };
}

function generateGenericDllGuide(originalGuide, dllName) {
  const displayName = dllName || 'this DLL';
  
  const sections = [
    {
      heading: `About ${displayName}`,
      content: `This DLL file is required by various Windows applications to function properly.

### Common Error Messages

- "The program can't start because ${displayName} is missing"
- "${displayName} was not found"
- "The code execution cannot proceed because ${displayName} was not found"

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

Restart your computer after both commands complete.`
    },
    {
      heading: 'Solution 4: Reinstall the Application',
      content: `A clean reinstall often resolves DLL issues:

**Step 1**: Open Settings → Apps → Installed apps

**Step 2**: Find and uninstall the affected application

**Step 3**: Restart your computer

**Step 4**: Download a fresh installer from the official website

**Step 5**: Install the application`
    }
  ];

  return {
    ...originalGuide,
    sections,
    updateDate: new Date().toISOString().split('T')[0]
  };
}

// 主函数
function main() {
  const backupPath = 'd:/CODEFREE/FixMissingDLL/astro-site/backups/auto-generated-guides-2025-12-05T12-16-58-244Z.json';
  const outputPath = 'd:/CODEFREE/FixMissingDLL/astro-site/src/data/auto-generated-guides.json';
  
  // 读取原始备份
  let originalContent = fs.readFileSync(backupPath, 'utf-8');
  // 移除可能的注释行
  if (originalContent.startsWith('//')) {
    originalContent = originalContent.substring(originalContent.indexOf('\n') + 1);
  }
  
  const originalGuides = JSON.parse(originalContent);
  
  const improvedGuides = [];
  
  for (const guide of originalGuides) {
    let improvedGuide;
    
    if (guide.category === 'Error Codes') {
      improvedGuide = generateHighQualityErrorGuide(guide);
    } else {
      improvedGuide = generateHighQualityDllGuide(guide);
    }
    
    improvedGuides.push(improvedGuide);
  }
  
  // 保存
  fs.writeFileSync(outputPath, JSON.stringify(improvedGuides, null, 2));
  
  // 写入日志
  fs.writeFileSync('d:/CODEFREE/FixMissingDLL/astro-site/regenerate-log.txt', 
    'Regenerated ' + improvedGuides.length + ' guides at ' + new Date().toISOString());
}

main();
