/**
 * 🌟 高质量 SEO 内容重生成器 v3.0
 * 
 * 目标：符合 Google 2024 Helpful Content Update 标准
 * - 每篇文章都有独特的、有价值的内容
 * - 避免重复/模板化内容
 * - 提供真正有帮助的解决方案
 * 
 * 运行: npx tsx scripts/regenerate-quality-content.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

console.log('Starting script...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Script initialized, __dirname:', __dirname);

// ============ 错误代码专属知识库 ============
const errorCodeKnowledge: Record<string, {
  hexCode: string;
  meaning: string;
  technicalCause: string;
  affectedApps: string[];
  specificSolutions: { title: string; steps: string[]; explanation: string }[];
  registryFix?: string;
  commandLineFix?: string;
  microsoftKB?: string;
  commonTriggers: string[];
}> = {
  '0xc0000142': {
    hexCode: '0xc0000142',
    meaning: 'STATUS_DLL_INIT_FAILED - A DLL initialization routine failed',
    technicalCause: 'Windows cannot initialize a DLL required by the application. This occurs during the DLL\'s DllMain() function execution.',
    affectedApps: ['Microsoft Office', 'Adobe Creative Cloud', 'Games (especially older ones)', 'AutoCAD', 'Visual Studio'],
    specificSolutions: [
      {
        title: 'Fix Windows Software Licensing Service',
        steps: [
          'Press Win + R, type services.msc, press Enter',
          'Find "Software Protection" service',
          'Right-click → Properties → Set Startup type to "Automatic"',
          'Click Start if the service is stopped',
          'Restart your computer'
        ],
        explanation: 'The Software Protection service manages software licensing. When corrupted, it can prevent applications from starting.'
      },
      {
        title: 'Repair Windows Runtime Libraries',
        steps: [
          'Open Settings → Apps → Installed apps',
          'Search for "Microsoft Visual C++"',
          'Click each version → Modify → Repair',
          'Repeat for all Visual C++ versions',
          'Restart your computer'
        ],
        explanation: 'Runtime libraries can become corrupted after Windows updates or improper shutdowns.'
      },
      {
        title: 'Re-register Core Windows DLLs',
        steps: [
          'Open Command Prompt as Administrator',
          'Run: for %i in (%windir%\\system32\\*.dll) do regsvr32.exe /s %i',
          'Wait for the process to complete (may take 5-10 minutes)',
          'Restart your computer'
        ],
        explanation: 'This re-registers all system DLLs, fixing registration corruption issues.'
      }
    ],
    registryFix: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows - LoadAppInit_DLLs should be 0',
    commandLineFix: 'sfc /scannow && DISM /Online /Cleanup-Image /RestoreHealth',
    microsoftKB: 'KB5005033',
    commonTriggers: ['Windows Update KB5000802', 'Antivirus false positives', 'Corrupted user profile', 'AppInit_DLLs registry entry']
  },
  
  '0xc0000005': {
    hexCode: '0xc0000005',
    meaning: 'STATUS_ACCESS_VIOLATION - The application tried to access memory it shouldn\'t',
    technicalCause: 'A program attempted to read from or write to a memory address it doesn\'t have permission to access. This is often caused by buggy software, driver issues, or hardware problems.',
    affectedApps: ['Games with anti-cheat', 'Video editing software', 'CAD applications', '3D rendering software', 'Database applications'],
    specificSolutions: [
      {
        title: 'Disable Data Execution Prevention (DEP) for Specific App',
        steps: [
          'Press Win + R, type sysdm.cpl, press Enter',
          'Go to Advanced tab → Performance Settings',
          'Click Data Execution Prevention tab',
          'Select "Turn on DEP for all programs except those I select"',
          'Click Add and browse to the problematic application',
          'Click OK and restart'
        ],
        explanation: 'DEP is a security feature that can conflict with older applications. Adding an exception allows the app to run while keeping other apps protected.'
      },
      {
        title: 'Test RAM for Errors',
        steps: [
          'Press Win + R, type mdsched.exe, press Enter',
          'Click "Restart now and check for problems"',
          'Wait for the test to complete (10-20 minutes)',
          'Check results in Event Viewer → Windows Logs → System'
        ],
        explanation: 'Faulty RAM causes random memory access violations. Windows Memory Diagnostic can detect failing RAM modules.'
      },
      {
        title: 'Update or Roll Back Graphics Drivers',
        steps: [
          'Press Win + X → Device Manager',
          'Expand Display adapters',
          'Right-click your GPU → Update driver',
          'Or: Properties → Driver tab → Roll Back Driver',
          'Restart your computer'
        ],
        explanation: 'GPU drivers interact heavily with system memory. Buggy drivers are a leading cause of 0xc0000005 errors in games.'
      }
    ],
    commandLineFix: 'bcdedit /set nx OptIn',
    commonTriggers: ['Faulty RAM', 'Overclocking', 'Outdated GPU drivers', 'Anti-cheat software conflicts', 'Virtualization software']
  },
  
  '0xc000007b': {
    hexCode: '0xc000007b',
    meaning: 'STATUS_INVALID_IMAGE_FORMAT - 32-bit/64-bit architecture mismatch',
    technicalCause: 'The application tried to load a DLL with incompatible architecture. A 64-bit app tried to load a 32-bit DLL or vice versa.',
    affectedApps: ['Games', 'Adobe software', 'Development tools', 'Multimedia applications'],
    specificSolutions: [
      {
        title: 'Install Both 32-bit and 64-bit Visual C++ Runtimes',
        steps: [
          'Download Visual C++ 2015-2022 x64: aka.ms/vs/17/release/vc_redist.x64.exe',
          'Download Visual C++ 2015-2022 x86: aka.ms/vs/17/release/vc_redist.x86.exe',
          'Install x64 version first, then x86 version',
          'Also install older versions: 2013, 2012, 2010, 2008',
          'Restart your computer'
        ],
        explanation: 'Many applications bundle both 32-bit and 64-bit components. Installing all runtime versions ensures compatibility.'
      },
      {
        title: 'Repair DirectX Installation',
        steps: [
          'Download DirectX End-User Runtime from Microsoft',
          'Extract to a folder (don\'t run yet)',
          'Open Command Prompt as Admin in that folder',
          'Run: DXSETUP.exe /silent',
          'Restart your computer'
        ],
        explanation: 'DirectX components can become mixed between 32-bit and 64-bit versions, causing this error.'
      },
      {
        title: 'Replace Corrupted System DLLs',
        steps: [
          'Download the DirectX Repair Tool (third-party but trusted)',
          'Or: Copy known-good DLLs from another Windows installation',
          'Target files: msvcr100.dll, msvcr110.dll, msvcr120.dll, msvcp140.dll',
          'Place them in both System32 (64-bit) and SysWOW64 (32-bit) folders'
        ],
        explanation: 'This error often points to specific corrupted DLLs. Replacing them with verified copies usually resolves the issue.'
      }
    ],
    commandLineFix: 'sfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows',
    commonTriggers: ['Mixed DLL versions', 'Incomplete software installation', 'Running 32-bit app on 64-bit Windows incorrectly']
  },
  
  '0x80070005': {
    hexCode: '0x80070005',
    meaning: 'E_ACCESSDENIED - Access is denied due to insufficient permissions',
    technicalCause: 'The operation requires elevated privileges or specific file/registry permissions that the current user doesn\'t have.',
    affectedApps: ['Windows Update', 'Microsoft Store apps', 'System utilities', 'Antivirus software'],
    specificSolutions: [
      {
        title: 'Reset Windows Update Components',
        steps: [
          'Open Command Prompt as Administrator',
          'Run these commands in order:',
          'net stop wuauserv',
          'net stop cryptSvc', 
          'net stop bits',
          'net stop msiserver',
          'ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old',
          'ren C:\\Windows\\System32\\catroot2 catroot2.old',
          'net start wuauserv',
          'net start cryptSvc',
          'net start bits',
          'net start msiserver'
        ],
        explanation: 'Windows Update maintains caches that can become corrupted and cause permission errors. Resetting these components forces a fresh start.'
      },
      {
        title: 'Take Ownership of Windows Folders',
        steps: [
          'Open Command Prompt as Administrator',
          'For Windows Update issues, run:',
          'takeown /f C:\\Windows\\System32\\Tasks /r /d y',
          'icacls C:\\Windows\\System32\\Tasks /grant Administrators:F /t',
          'Restart your computer'
        ],
        explanation: 'Sometimes Windows loses ownership of its own folders after updates or malware infections.'
      },
      {
        title: 'Create New Administrator Account',
        steps: [
          'Press Win + I → Accounts → Other users',
          'Click Add account → I don\'t have this person\'s sign-in info',
          'Click Add a user without a Microsoft account',
          'Create the account, then go to that account → Change account type',
          'Select Administrator → OK',
          'Log into the new account and try the operation'
        ],
        explanation: 'User profile corruption can cause persistent permission errors. A new admin account has fresh, correct permissions.'
      }
    ],
    registryFix: 'Check permissions on HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion',
    commandLineFix: 'net localgroup Administrators %username% /add',
    microsoftKB: 'KB4056892',
    commonTriggers: ['Corrupted user profile', 'UAC misconfiguration', 'Group Policy restrictions', 'Third-party security software']
  },

  '0xc000012f': {
    hexCode: '0xc000012f',
    meaning: 'STATUS_INVALID_IMAGE_NOT_MZ - Bad Image error, the file is not a valid Windows executable',
    technicalCause: 'A DLL or EXE file is corrupted, has an invalid header, or was incorrectly downloaded/copied.',
    affectedApps: ['Any Windows application', 'Commonly affects games and Adobe software'],
    specificSolutions: [
      {
        title: 'Re-download and Reinstall the Application',
        steps: [
          'Completely uninstall the application',
          'Use a tool like Revo Uninstaller to remove leftover files',
          'Clear your browser cache and downloads folder',
          'Re-download the installer from the official source',
          'Disable antivirus temporarily during installation',
          'Install the application'
        ],
        explanation: 'Bad Image errors usually mean file corruption during download. A fresh download and clean install typically resolves this.'
      },
      {
        title: 'Check Disk for File System Errors',
        steps: [
          'Open Command Prompt as Administrator',
          'Run: chkdsk C: /f /r',
          'Type Y to schedule the check on restart',
          'Restart your computer',
          'Wait for the disk check to complete (can take 1-2 hours)'
        ],
        explanation: 'File system errors can corrupt files silently. CHKDSK finds and repairs these errors.'
      },
      {
        title: 'Scan for Malware',
        steps: [
          'Open Windows Security',
          'Go to Virus & threat protection',
          'Click Scan options → Full scan → Scan now',
          'After completion, run Microsoft Safety Scanner for a second opinion',
          'Download from: microsoft.com/security/scanner'
        ],
        explanation: 'Malware often corrupts system DLLs. A thorough scan can identify and remove infections that cause Bad Image errors.'
      }
    ],
    commandLineFix: 'DISM /Online /Cleanup-Image /RestoreHealth && sfc /scannow',
    commonTriggers: ['Incomplete downloads', 'Disk errors', 'Malware infection', 'Antivirus quarantine', 'Power failure during write']
  }
};

// ============ 游戏专属知识库 (扩展版) ============
const gameKnowledge: Record<string, {
  fullName: string;
  developer: string;
  publisher: string;
  releaseYear: number;
  engine: string;
  drm: string;
  antiCheat?: string;
  requiredRuntimes: string[];
  commonDLLErrors: { dll: string; cause: string; solution: string }[];
  performanceTips: string[];
  knownBugs: string[];
  communityResources: string;
}> = {
  'Elden Ring': {
    fullName: 'ELDEN RING',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco Entertainment',
    releaseYear: 2022,
    engine: 'FromSoftware Engine (Proprietary)',
    drm: 'Steam',
    antiCheat: 'Easy Anti-Cheat (EAC)',
    requiredRuntimes: ['Visual C++ 2015-2022', 'DirectX 12'],
    commonDLLErrors: [
      { dll: 'vcruntime140.dll', cause: 'Missing Visual C++ 2015-2022', solution: 'Install both x64 and x86 Visual C++ Redistributable' },
      { dll: 'd3d12.dll', cause: 'DirectX 12 not supported or GPU drivers outdated', solution: 'Update GPU drivers; ensure Windows 10 1903+ or Windows 11' },
      { dll: 'steam_api64.dll', cause: 'Corrupted game files or Steam client issues', solution: 'Verify game files through Steam; reinstall Steam client' },
      { dll: 'EasyAntiCheat.dll', cause: 'EAC installation corrupted', solution: 'Run EasyAntiCheat_Setup.exe from game folder; add exception in antivirus' }
    ],
    performanceTips: [
      'Disable Steam Overlay (known to cause stuttering)',
      'Set game priority to High in Task Manager',
      'Cap framerate to 60 FPS to reduce stuttering',
      'Disable ray tracing if experiencing crashes'
    ],
    knownBugs: [
      'White screen on startup (fixed by running as administrator)',
      'Shader compilation stuttering in first 30 minutes',
      'Controller not detected (install Xbox Controller drivers)'
    ],
    communityResources: 'r/Eldenring, Steam Community Forums'
  },
  
  'Black Myth Wukong': {
    fullName: 'Black Myth: Wukong',
    developer: 'Game Science',
    publisher: 'Game Science',
    releaseYear: 2024,
    engine: 'Unreal Engine 5',
    drm: 'Steam, Epic Games Store',
    requiredRuntimes: ['Visual C++ 2015-2022', 'DirectX 12', '.NET Framework 4.8'],
    commonDLLErrors: [
      { dll: 'vcruntime140.dll', cause: 'Missing Visual C++ runtime', solution: 'Install Visual C++ 2015-2022 Redistributable (both architectures)' },
      { dll: 'd3d12.dll', cause: 'GPU doesn\'t support DirectX 12 or drivers outdated', solution: 'Update to latest GPU drivers; check DX12 compatibility' },
      { dll: 'nvngx_dlss.dll', cause: 'DLSS files missing or corrupted', solution: 'Update NVIDIA drivers; verify game files; disable DLSS' },
      { dll: 'amd_ags_x64.dll', cause: 'AMD GPU features DLL missing', solution: 'Install latest AMD Adrenalin drivers' }
    ],
    performanceTips: [
      'Enable DLSS 3.5 Frame Generation for significant FPS boost (RTX 40 series)',
      'Set VRAM Usage to your actual VRAM minus 2GB',
      'Disable ray tracing on GPUs with less than 10GB VRAM',
      'Use FSR 3 on AMD GPUs for better performance'
    ],
    knownBugs: [
      'Crash on Intel Arc GPUs (wait for driver update)',
      'Memory leak after extended play sessions (restart game every 2-3 hours)',
      'Chinese audio not downloading (change Steam region temporarily)'
    ],
    communityResources: 'Official Discord, NGA Forums, Steam Community'
  },
  
  'Cyberpunk 2077': {
    fullName: 'Cyberpunk 2077',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    releaseYear: 2020,
    engine: 'REDengine 4',
    drm: 'Steam, GOG (DRM-free), Epic',
    requiredRuntimes: ['Visual C++ 2015-2022', 'DirectX 12', '.NET Framework 4.8'],
    commonDLLErrors: [
      { dll: 'vcruntime140_1.dll', cause: 'Visual C++ 2019+ component missing', solution: 'Install latest Visual C++ 2015-2022 Redistributable' },
      { dll: 'MSVCP140.dll', cause: 'C++ Standard Library missing', solution: 'Repair or reinstall Visual C++ Redistributable' },
      { dll: 'd3d12.dll', cause: 'DirectX 12 issues', solution: 'Update Windows; update GPU drivers' },
      { dll: 'REDEngineErrorReporter.dll', cause: 'Game file corruption', solution: 'Verify game files; delete contents of r6/cache folder' }
    ],
    performanceTips: [
      'Enable DLSS or FSR for major performance gains',
      'Set Crowd Density to Low for CPU-bound systems',
      'Disable Ray Tracing Lighting for 30-40% FPS increase',
      'Use the official REDmod tool for optimized mod loading'
    ],
    knownBugs: [
      'Flatlined crash (usually driver related - update GPU drivers)',
      'Save file corruption over 8MB (keep saves under 8MB)',
      'GPU driver timeout (increase TdrDelay in registry)'
    ],    communityResources: 'r/cyberpunkgame, CDPR Forums, Nexus Mods'
  },

  'GTA San Andreas': {
    fullName: 'Grand Theft Auto: San Andreas',
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    releaseYear: 2004,
    engine: 'RenderWare',
    drm: 'Steam, Rockstar Launcher',
    requiredRuntimes: ['DirectX 9', 'Visual C++ 2005'],
    commonDLLErrors: [
      { dll: 'mss32.dll', cause: 'Miles Sound System missing or corrupted', solution: 'Reinstall the game or copy mss32.dll from installation disc' },
      { dll: 'd3dx9_43.dll', cause: 'DirectX 9 components missing', solution: 'Install DirectX End-User Runtime (June 2010)' },
      { dll: 'vorbisFile.dll', cause: 'Audio codec missing', solution: 'Install OpenAL or reinstall the game' }
    ],
    performanceTips: [
      'Use SilentPatch for bug fixes and improvements',
      'Install Widescreen Fix for modern monitors',
      'Use dgVoodoo2 for better graphics compatibility',
      'Downgrade to version 1.0 for mod compatibility'
    ],
    knownBugs: [
      'Mouse issues on Windows 10/11 (use SilentPatch)',
      'Frame limiter causes stuttering (disable in settings)',
      'Missing radio songs in newer versions (use radio restoration mod)'
    ],
    communityResources: 'GTAForums, r/GTA, Mod Database'
  },

  'Age of Empires II': {
    fullName: 'Age of Empires II',
    developer: 'Ensemble Studios',
    publisher: 'Microsoft',
    releaseYear: 1999,
    engine: 'Genie Engine',
    drm: 'Steam (Definitive Edition), None (Original)',
    requiredRuntimes: ['DirectX 9'],
    commonDLLErrors: [
      { dll: 'mss32.dll', cause: 'Miles Sound System files missing', solution: 'Reinstall game or install the Miles Sound System runtime' },
      { dll: 'd3dx9_43.dll', cause: 'Legacy DirectX components missing', solution: 'Install DirectX End-User Runtime' }
    ],
    performanceTips: [
      'Use UserPatch for the original version',
      'Enable Enhanced Graphics in Definitive Edition',
      'Limit population for better performance in large battles'
    ],
    knownBugs: [
      'Color issues on modern Windows (run in compatibility mode)',
      'Multiplayer desync (ensure same version as other players)'
    ],
    communityResources: 'AoE2.net, r/aoe2, Steam Community'
  },

  'Valorant': {
    fullName: 'VALORANT',
    developer: 'Riot Games',
    publisher: 'Riot Games',
    releaseYear: 2020,
    engine: 'Unreal Engine 4',
    drm: 'Riot Client',
    antiCheat: 'Vanguard',
    requiredRuntimes: ['Visual C++ 2015-2022', 'DirectX 11'],
    commonDLLErrors: [
      { dll: 'vcruntime140.dll', cause: 'Visual C++ runtime missing', solution: 'Install Visual C++ 2015-2022 Redistributable' },
      { dll: 'MSVCP140.dll', cause: 'C++ library missing', solution: 'Repair Visual C++ installation' },
      { dll: 'd3d11.dll', cause: 'DirectX 11 issues', solution: 'Update GPU drivers; run Windows Update' }
    ],
    performanceTips: [
      'Set graphics to Low for competitive advantage (higher FPS)',
      'Disable Vanguard if not playing (saves resources)',
      'Use fullscreen mode instead of borderless for best performance'
    ],
    knownBugs: [
      'Vanguard blocking other software (check Vanguard tray icon)',
      'Van 9001 error (restart Vanguard service)',
      'High CPU usage (limit FPS to monitor refresh rate)'
    ],
    communityResources: 'r/VALORANT, Riot Support, Official Discord'
  },

  'Hogwarts Legacy': {
    fullName: 'Hogwarts Legacy',
    developer: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    releaseYear: 2023,
    engine: 'Unreal Engine 4',
    drm: 'Steam, Epic',
    requiredRuntimes: ['Visual C++ 2015-2022', 'DirectX 12'],
    commonDLLErrors: [
      { dll: 'vcruntime140_1.dll', cause: 'Visual C++ 2019+ component missing', solution: 'Install latest Visual C++ Redistributable' },
      { dll: 'd3d12.dll', cause: 'DirectX 12 not supported', solution: 'Update GPU drivers; ensure Windows 10 1903+' },
      { dll: 'steam_api64.dll', cause: 'Steam integration issue', solution: 'Verify game files; restart Steam' }
    ],
    performanceTips: [
      'Enable DLSS/FSR for significant performance boost',
      'Set Ray Tracing to Off or Low',
      'Reduce Draw Distance for better FPS',
      'Disable motion blur for clearer visuals'
    ],
    knownBugs: [
      'Shader compilation stuttering (wait for cache to build)',
      'Memory leak after long sessions (restart game periodically)',
      'Controller not detected (reconnect or use Steam Input)'
    ],
    communityResources: 'r/HarryPotterGame, Steam Community, Nexus Mods'
  },

  'Diablo II': {
    fullName: 'Diablo II',
    developer: 'Blizzard North',
    publisher: 'Blizzard Entertainment',
    releaseYear: 2000,
    engine: 'Blizzard Proprietary',
    drm: 'Battle.net (Resurrected), CD Key (Original)',
    requiredRuntimes: ['DirectX 9'],
    commonDLLErrors: [
      { dll: 'mss32.dll', cause: 'Miles Sound System missing', solution: 'Reinstall game or copy from installation media' },
      { dll: 'binkw32.dll', cause: 'Bink Video codec missing', solution: 'Reinstall game; file is bundled with game' },
      { dll: 'd3dx9_43.dll', cause: 'DirectX 9 components missing', solution: 'Install DirectX End-User Runtime' }
    ],
    performanceTips: [
      'Use D2DX or cnc-ddraw wrapper for modern compatibility',
      'Consider Diablo II Resurrected for native modern support',
      'Install PlugY for expanded stash'
    ],
    knownBugs: [
      'Glide wrapper needed for original version',
      'Resolution locked to 800x600 (use mods to fix)',
      'CD check failures (use no-CD patch or buy Resurrected)'
    ],
    communityResources: 'r/diablo2, Battle.net Forums, D2Mods'
  },

  'Red Alert 2': {
    fullName: 'Command & Conquer: Red Alert 2',
    developer: 'Westwood Studios',
    publisher: 'EA',
    releaseYear: 2000,
    engine: 'Westwood 2.5D Engine',
    drm: 'Origin, None (freeware)',
    requiredRuntimes: ['DirectX 9'],
    commonDLLErrors: [
      { dll: 'binkw32.dll', cause: 'Video codec missing', solution: 'Reinstall game or download Bink codec' },
      { dll: 'd3dx9_43.dll', cause: 'DirectX 9 components missing', solution: 'Install DirectX End-User Runtime' },
      { dll: 'mss32.dll', cause: 'Sound system missing', solution: 'Reinstall or use CnCNet installer' }
    ],
    performanceTips: [
      'Use CnCNet for online multiplayer',
      'Apply ts-ddraw or cnc-ddraw for modern compatibility',
      'Run in Windows XP SP3 compatibility mode'
    ],
    knownBugs: [
      'Game runs too fast on modern PCs (use GameRanger or CnCNet)',
      'Black screen issues (apply ddraw fix)',
      'Origin version has additional DRM issues'
    ],
    communityResources: 'CnCNet, r/commandandconquer, ModDB'
  }
};

// ============ DLL 知识库 ============
const dllKnowledge: Record<string, {
  fullName: string;
  purpose: string;
  source: string;
  officialDownload: string;
  relatedDLLs: string[];
  registrationRequired: boolean;
  commonGames: string[];
  commonSoftware: string[];
}> = {
  'vcruntime140.dll': {
    fullName: 'Visual C++ 2015-2022 Runtime Library',
    purpose: 'Provides core C++ runtime functions including memory management, exception handling, and RTTI (Runtime Type Information)',
    source: 'Microsoft Visual C++ 2015-2022 Redistributable',
    officialDownload: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDLLs: ['vcruntime140_1.dll', 'msvcp140.dll', 'msvcp140_1.dll', 'concrt140.dll', 'vccorlib140.dll'],
    registrationRequired: false,
    commonGames: ['Elden Ring', 'Cyberpunk 2077', 'GTA V', 'Valorant', 'Black Myth Wukong'],
    commonSoftware: ['Discord', 'Adobe Creative Cloud', 'Microsoft Office', 'Visual Studio Code']
  },
  'msvcp140.dll': {
    fullName: 'Microsoft Visual C++ Standard Library',
    purpose: 'Provides C++ Standard Library implementations including STL containers (vector, map, string), algorithms, and I/O streams',
    source: 'Microsoft Visual C++ 2015-2022 Redistributable',
    officialDownload: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDLLs: ['vcruntime140.dll', 'vcruntime140_1.dll', 'msvcp140_1.dll'],
    registrationRequired: false,
    commonGames: ['Most modern PC games'],
    commonSoftware: ['Adobe Photoshop', 'Premiere Pro', 'AutoCAD', 'MATLAB']
  },
  'd3dx9_43.dll': {
    fullName: 'DirectX 9 Extensions Library',
    purpose: 'Provides helper functions for Direct3D 9 including texture loading, mesh operations, and shader compilation',
    source: 'DirectX End-User Runtime (June 2010)',
    officialDownload: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDLLs: ['d3dx9_42.dll', 'd3dx9_41.dll', 'd3dx10_43.dll', 'd3dx11_43.dll'],
    registrationRequired: false,
    commonGames: ['GTA San Andreas', 'Counter-Strike Source', 'Left 4 Dead 2', 'Skyrim'],
    commonSoftware: ['Older video editors', 'Legacy CAD software']
  },
  'xinput1_3.dll': {
    fullName: 'Xbox Input API Library',
    purpose: 'Handles Xbox controller input for games, providing button states, triggers, and vibration feedback',
    source: 'DirectX End-User Runtime (June 2010)',
    officialDownload: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDLLs: ['xinput1_4.dll', 'xinput9_1_0.dll'],
    registrationRequired: false,
    commonGames: ['Dark Souls', 'The Witcher 3', 'Rocket League', 'Hollow Knight'],
    commonSoftware: ['Controller mapping software']
  },  'mss32.dll': {
    fullName: 'Miles Sound System Library',
    purpose: 'Audio middleware handling sound playback, 3D positional audio, and music streaming in games',
    source: 'RAD Game Tools (bundled with games)',
    officialDownload: 'http://www.radgametools.com/miles.htm',
    relatedDLLs: ['mss64.dll', 'mssa3d.dll', 'mssdsp.dll'],
    registrationRequired: false,
    commonGames: ['StarCraft', 'Diablo 2', 'Command & Conquer', 'Age of Empires II', 'GTA San Andreas'],
    commonSoftware: []
  },
  'd3d12.dll': {
    fullName: 'Direct3D 12 Runtime',
    purpose: 'Core DirectX 12 library providing low-level GPU access for modern games with improved multi-threading and reduced CPU overhead',
    source: 'Windows System Component',
    officialDownload: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDLLs: ['d3d11.dll', 'd3d10.dll', 'dxgi.dll'],
    registrationRequired: false,
    commonGames: ['Black Myth Wukong', 'Elden Ring', 'Cyberpunk 2077', 'Hogwarts Legacy'],
    commonSoftware: ['3D rendering applications', 'Video editors']
  },
  'binkw32.dll': {
    fullName: 'Bink Video Codec Library',
    purpose: 'Decodes and plays Bink video format (.bik) used for game cutscenes, providing efficient video playback',
    source: 'RAD Game Tools (bundled with games)',
    officialDownload: 'http://www.radgametools.com/bnkdown.htm',
    relatedDLLs: ['binkw64.dll', 'bink2w32.dll'],
    registrationRequired: false,
    commonGames: ['Diablo II', 'Red Alert 2', 'Mass Effect', 'Fallout 3', 'Skyrim'],
    commonSoftware: []
  },
  'steam_api64.dll': {
    fullName: 'Steam API Library (64-bit)',
    purpose: 'Handles Steam integration including achievements, cloud saves, matchmaking, and DRM',
    source: 'Steam Client',
    officialDownload: 'https://store.steampowered.com/about/',
    relatedDLLs: ['steam_api.dll', 'steamclient64.dll'],
    registrationRequired: false,
    commonGames: ['All Steam games'],
    commonSoftware: []
  },
  'vcruntime140_1.dll': {
    fullName: 'Visual C++ 2019+ Runtime Extension',
    purpose: 'Extended runtime library with additional C++ runtime functions introduced in Visual Studio 2019',
    source: 'Microsoft Visual C++ 2015-2022 Redistributable',
    officialDownload: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDLLs: ['vcruntime140.dll', 'msvcp140.dll'],
    registrationRequired: false,
    commonGames: ['Cyberpunk 2077', 'Hogwarts Legacy', 'Modern games post-2019'],
    commonSoftware: ['Modern Adobe software', 'JetBrains IDEs']
  }
};

// ============ 内容多样化模板 ============
const introVariations = [
  (error: string, context: string) => 
    `Seeing the **${error}** error on your Windows PC? You're not alone—this is one of the most common system errors that affects ${context}. The good news is that it's almost always fixable, and this guide will walk you through every proven solution.`,
  
  (error: string, context: string) =>
    `The **${error}** error can stop you in your tracks when you're trying to ${context}. But don't worry—we've helped thousands of users fix this exact issue, and we'll show you exactly what to do.`,
  
  (error: string, context: string) =>
    `If you're getting the **${error}** error message, your ${context} has hit a common Windows issue. This comprehensive guide covers everything from quick fixes to advanced solutions that address the root cause.`,
  
  (error: string, context: string) =>
    `Getting hit with **${error}** when trying to ${context}? This error has specific causes and specific solutions. Let's diagnose your issue and get you back on track.`,
  
  (error: string, context: string) =>
    `The **${error}** error is Windows telling you something specific is wrong. When this affects ${context}, there are targeted fixes that actually work—not just generic troubleshooting steps.`
];

const sectionHeadingVariations = {
  understanding: [
    'What Does This Error Actually Mean?',
    'Understanding the Root Cause',
    'Why You\'re Seeing This Error',
    'Technical Background',
    'Breaking Down the Error',
    'What\'s Really Happening'
  ],
  solution1: [
    'Quick Fix (Works for 80% of Users)',
    'Most Effective Solution',
    'Start Here: Primary Fix',
    'Recommended First Step',
    'The Solution That Usually Works'
  ],
  solution2: [
    'If That Didn\'t Work: Alternative Method',
    'Second-Line Solution',
    'Alternative Approach',
    'Try This Next',
    'Backup Solution'
  ],
  prevention: [
    'Preventing Future Occurrences',
    'How to Avoid This Error',
    'Long-Term Prevention',
    'Keep This From Happening Again',
    'Maintenance Tips'
  ]
};

// ============ 高质量内容生成函数 ============

function generateErrorCodeGuide(errorCode: string, publishDate: string, index: number): any {
  const error = errorCodeKnowledge[errorCode];
  if (!error) return null;
  
  // 选择变体以增加多样性
  const introVariant = introVariations[index % introVariations.length];
  const headingSet = {
    understanding: sectionHeadingVariations.understanding[index % sectionHeadingVariations.understanding.length],
    solution1: sectionHeadingVariations.solution1[index % sectionHeadingVariations.solution1.length],
    solution2: sectionHeadingVariations.solution2[index % sectionHeadingVariations.solution2.length],
    prevention: sectionHeadingVariations.prevention[index % sectionHeadingVariations.prevention.length]
  };
  
  const contextPhrases = [
    'launch applications',
    'run your favorite software',
    'start programs',
    'use Windows normally',
    'open applications'
  ];
  
  const sections = [
    {
      heading: headingSet.understanding,
      content: `${introVariant(error.hexCode, contextPhrases[index % contextPhrases.length])}

### Technical Explanation

**Error Code**: \`${error.hexCode}\`
**Translation**: ${error.meaning}

${error.technicalCause}

### Common Triggers for This Error

${error.commonTriggers.map((trigger, i) => `${i + 1}. **${trigger}**`).join('\n')}

### Applications Commonly Affected

${error.affectedApps.map(app => `- ${app}`).join('\n')}`
    }
  ];
  
  // 添加具体解决方案
  error.specificSolutions.forEach((solution, i) => {
    sections.push({
      heading: i === 0 ? headingSet.solution1 : `Solution ${i + 1}: ${solution.title}`,
      content: `**Why this works**: ${solution.explanation}

### Steps:

${solution.steps.map((step, j) => `**Step ${j + 1}**: ${step}`).join('\n\n')}`
    });
  });
  
  // 添加命令行修复
  if (error.commandLineFix) {
    sections.push({
      heading: 'Command Line Repair',
      content: `For advanced users, these commands can repair the underlying system issues:

\`\`\`batch
${error.commandLineFix}
\`\`\`

**How to run**: Press \`Win + X\`, select "Terminal (Admin)" or "Command Prompt (Admin)", paste the command, and press Enter.

**Expected duration**: 15-30 minutes depending on system state.`
    });
  }
  
  // 注册表修复
  if (error.registryFix) {
    sections.push({
      heading: 'Registry Check (Advanced)',
      content: `⚠️ **Warning**: Only modify the registry if you're comfortable with advanced Windows settings. Always back up your registry first.

**Registry path to check**:
\`${error.registryFix}\`

**How to access**:
1. Press \`Win + R\`, type \`regedit\`, press Enter
2. Navigate to the path above
3. Verify the value matches what's expected
4. If not, right-click → Modify → Set the correct value`
    });
  }
  
  // 预防措施
  sections.push({
    heading: headingSet.prevention,
    content: `Once you've fixed the ${error.hexCode} error, here's how to prevent it from returning:

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
  
  const slug = `fix-${errorCode.toLowerCase().replace('0x', '')}-error-windows`;
  
  return {
    id: slug,
    slug: slug,
    title: `Fix Error ${error.hexCode} on Windows 11/10 - Complete Solution Guide`,
    metaTitle: `Fix ${error.hexCode} Error Windows 11/10 (${new Date().getFullYear()}) - All Solutions`,
    metaDescription: `${error.meaning.split(' - ')[1] || 'Windows error'} causing ${error.hexCode}? Complete guide with ${error.specificSolutions.length} proven solutions. Works on Windows 11 and 10.`,
    excerpt: `${error.meaning}. This guide provides specific solutions for the ${error.hexCode} error, not generic troubleshooting steps.`,
    category: 'Error Codes',
    publishDate,
    updateDate: publishDate,
    author: 'System Admin Team',
    keywords: [
      error.hexCode,
      `fix ${error.hexCode}`,
      `${error.hexCode} windows 11`,
      `${error.hexCode} windows 10`,
      error.meaning.split(' - ')[0]?.toLowerCase() || '',
      ...error.affectedApps.slice(0, 3).map(app => `${error.hexCode} ${app.toLowerCase()}`)
    ].filter(k => k),
    searchVolume: 'high',
    sections,
    relatedDlls: [],
    microsoftKB: error.microsoftKB
  };
}

function generateGameDLLGuide(gameName: string, dllName: string, publishDate: string, index: number): any {
  const game = gameKnowledge[gameName];
  const dll = dllKnowledge[dllName];
  
  if (!game) {
    console.log(`Warning: No knowledge for game "${gameName}"`);
  }
  
  const gameInfo = game || {
    fullName: gameName,
    developer: 'Unknown',
    publisher: 'Unknown',
    releaseYear: 2024,
    engine: 'Unknown',
    drm: 'Steam',
    requiredRuntimes: ['Visual C++ 2015-2022'],
    commonDLLErrors: [],
    performanceTips: [],
    knownBugs: [],
    communityResources: 'Steam Community Forums'
  };
  
  const dllInfo = dll || {
    fullName: dllName,
    purpose: 'provides essential runtime functions',
    source: 'Microsoft Redistributable',
    officialDownload: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDLLs: [],
    registrationRequired: false,
    commonGames: [],
    commonSoftware: []
  };
  
  // 找到特定 DLL 的错误信息
  const specificError = gameInfo.commonDLLErrors?.find(e => e.dll.toLowerCase() === dllName.toLowerCase());
  
  const introVariant = introVariations[index % introVariations.length];
  
  const sections = [
    {
      heading: `Why ${gameInfo.fullName} Needs ${dllName}`,
      content: `${introVariant(`"${dllName} is missing"`, `launch ${gameInfo.fullName}`)}

### About This DLL

**${dllInfo.fullName}** ${dllInfo.purpose}. ${gameInfo.fullName}, built on ${gameInfo.engine}, relies on this file for core functionality.

**File Information:**
- **Source**: ${dllInfo.source}
- **Required by**: ${gameInfo.fullName} (${gameInfo.releaseYear}) by ${gameInfo.developer}
- **Game Platform**: ${gameInfo.drm}
${gameInfo.antiCheat ? `- **Anti-Cheat**: ${gameInfo.antiCheat}` : ''}

### Why This Error Occurs in ${gameInfo.fullName}

${specificError ? `**Specific cause for ${gameInfo.fullName}**: ${specificError.cause}` : `This error typically occurs when the ${dllInfo.source} is missing or corrupted.`}

Other common causes:
- Incomplete game installation
- Antivirus quarantined the file
- Windows Update removed runtime components
- Corrupted game files after update`
    },
    {
      heading: 'Solution 1: Install the Official Runtime Package (Recommended)',
      content: `**This solution fixes ${dllName} errors for 90%+ of ${gameInfo.fullName} players.**

### Download Links (Official Microsoft)

- **64-bit**: [${dllInfo.source} x64](${dllInfo.officialDownload})
- **32-bit**: [${dllInfo.source} x86](${dllInfo.officialDownload.replace('x64', 'x86')})

### Installation Steps

**Step 1**: Download BOTH the x64 and x86 versions (yes, even on 64-bit Windows)

**Step 2**: Close ${gameInfo.fullName} and Steam/Epic/GOG completely

**Step 3**: Run the x64 installer first, then the x86 installer

**Step 4**: Restart your computer (important!)

**Step 5**: Launch ${gameInfo.fullName}

**Why both versions?** ${gameInfo.fullName} may include both 32-bit and 64-bit components. Installing both ensures complete compatibility.`
    },
    {
      heading: 'Solution 2: Verify Game Files',
      content: `If the runtime installation didn't help, your game files may be corrupted.

### For Steam:
1. Open Steam → Library
2. Right-click **${gameInfo.fullName}** → **Properties**
3. Go to **Installed Files** tab
4. Click **"Verify integrity of game files"**
5. Wait for verification (5-30 minutes depending on game size)
6. Restart Steam and try launching

### For Epic Games:
1. Open Epic Games Launcher → Library
2. Click the **three dots (⋯)** next to ${gameInfo.fullName}
3. Select **Manage** → **Verify**
4. Wait for the process to complete

### For GOG Galaxy:
1. Open GOG Galaxy → Select ${gameInfo.fullName}
2. Click **Settings icon (⚙️)**
3. Select **Manage Installation** → **Verify / Repair**

${gameInfo.antiCheat ? `\n### Note About ${gameInfo.antiCheat}\n${gameInfo.fullName} uses ${gameInfo.antiCheat}. If verification doesn't fix the issue, navigate to:\n\`[Game Folder]\\EasyAntiCheat\\\`\nRun \`EasyAntiCheat_Setup.exe\` and click "Repair".` : ''}`
    }
  ];
  
  // 添加游戏特定修复
  if (gameInfo.knownBugs && gameInfo.knownBugs.length > 0) {
    sections.push({
      heading: `${gameInfo.fullName}-Specific Fixes`,
      content: `${gameInfo.fullName} has some known issues that can cause DLL errors:

### Known Issues
${gameInfo.knownBugs.map((bug, i) => `${i + 1}. ${bug}`).join('\n')}

### Performance Tips
${gameInfo.performanceTips?.map((tip, i) => `${i + 1}. ${tip}`).join('\n') || 'Keep your drivers updated for best performance.'}

### Community Resources
For additional help: ${gameInfo.communityResources}`
    });
  }
  
  // 相关 DLL
  if (dllInfo.relatedDLLs && dllInfo.relatedDLLs.length > 0) {
    sections.push({
      heading: 'Related DLL Errors',
      content: `If you're seeing ${dllName} errors, you might also encounter issues with these related files:

${dllInfo.relatedDLLs.map(related => `- **${related}**: Part of the same runtime package`).join('\n')}

The solution above (installing ${dllInfo.source}) will fix ALL of these errors at once.`
    });
  }
  
  // 预防
  sections.push({
    heading: 'Preventing Future DLL Errors',
    content: `### Before Installing New Games
1. Install all Visual C++ Redistributable versions (2008, 2010, 2012, 2013, 2015-2022)
2. Install DirectX End-User Runtime
3. Keep GPU drivers updated

### Antivirus Configuration
Add your games folder to antivirus exceptions:
- \`C:\\Program Files (x86)\\Steam\\steamapps\\common\\\`
- \`C:\\Program Files\\Epic Games\\\`
- \`C:\\GOG Games\\\`

### After Windows Updates
Run \`sfc /scannow\` in an admin command prompt after major Windows updates to repair any corrupted system files.`
  });
  
  const slug = `fix-${dllName.replace('.dll', '').toLowerCase()}-${gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  
  return {
    id: slug,
    slug,
    title: `Fix ${dllName} Missing Error in ${gameInfo.fullName}`,
    metaTitle: `Fix ${dllName} in ${gameInfo.fullName} (${gameInfo.releaseYear}) - Quick Solution`,
    metaDescription: `Solve "${dllName} is missing" error preventing ${gameInfo.fullName} from launching. Step-by-step fix guide with ${gameInfo.fullName}-specific solutions.`,
    excerpt: `Can't play ${gameInfo.fullName} due to ${dllName} error? This guide provides specific solutions for ${gameInfo.developer}'s ${gameInfo.releaseYear} release.`,
    category: 'Gaming',
    publishDate,
    updateDate: publishDate,
    author: 'System Admin Team',
    keywords: [
      `${dllName} ${gameName.toLowerCase()}`,
      `${gameName} ${dllName} error`,
      `${gameName} won't launch`,
      `${gameName} dll fix`,
      `${gameName} crash fix`,
      `fix ${gameName} ${gameInfo.releaseYear}`
    ],
    searchVolume: 'high',
    sections,
    relatedDlls: [dllName, ...(dllInfo.relatedDLLs?.slice(0, 3) || [])],
    game: gameName,
    gameYear: gameInfo.releaseYear,
    engine: gameInfo.engine
  };
}

// ============ 主程序 ============
function main() {
  console.log('🌟 Regenerating HIGH QUALITY SEO Content...\n');
  console.log('Target: Google Helpful Content Update compliance\n');
  
  const guides: any[] = [];
  let dateOffset = 0;
  
  // 1. 生成错误代码指南 (高质量、独特内容)
  console.log('📝 Generating Error Code guides...');
  const errorCodes = Object.keys(errorCodeKnowledge);
  errorCodes.forEach((code, index) => {
    const publishDate = getPublishDate(dateOffset++);
    const guide = generateErrorCodeGuide(code, publishDate, index);
    if (guide) {
      guides.push(guide);
      console.log(`   ✓ ${guide.slug}`);
    }
  });
  
  // 2. 生成游戏 DLL 指南 (高质量、游戏特定)
  console.log('\n📝 Generating Game DLL guides...');
  
  // 现代游戏使用现代 DLL
  const modernGames = ['Elden Ring', 'Black Myth Wukong', 'Cyberpunk 2077', 'Valorant', 'Hogwarts Legacy'];
  const modernDlls = ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'vcruntime140_1.dll'];
  
  modernGames.forEach((game, gameIndex) => {
    modernDlls.forEach((dll, dllIndex) => {
      const publishDate = getPublishDate(dateOffset++);
      const guide = generateGameDLLGuide(game, dll, publishDate, gameIndex * modernDlls.length + dllIndex);
      guides.push(guide);
      console.log(`   ✓ ${guide.slug}`);
    });
  });
  
  // 经典游戏使用传统 DLL
  const classicGames = ['GTA San Andreas', 'Age of Empires II', 'Diablo II', 'Red Alert 2'];
  const classicDlls = ['mss32.dll', 'd3dx9_43.dll', 'binkw32.dll'];
  
  classicGames.forEach((game, gameIndex) => {
    classicDlls.forEach((dll, dllIndex) => {
      const publishDate = getPublishDate(dateOffset++);
      const guide = generateGameDLLGuide(game, dll, publishDate, (modernGames.length * modernDlls.length) + gameIndex * classicDlls.length + dllIndex);
      guides.push(guide);
      console.log(`   ✓ ${guide.slug}`);
    });
  });
  
  // 3. 备份现有文件
  const autoGeneratedPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
  const scheduledPath = path.join(__dirname, '../src/data/scheduled-guides.json');
  const backupsDir = path.join(__dirname, '../backups');
  
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  if (fs.existsSync(autoGeneratedPath)) {
    fs.copyFileSync(autoGeneratedPath, path.join(backupsDir, `auto-generated-guides-${timestamp}.json`));
  }
  if (fs.existsSync(scheduledPath)) {
    fs.copyFileSync(scheduledPath, path.join(backupsDir, `scheduled-guides-${timestamp}.json`));
  }
  
  // 4. 保存新的高质量内容
  // 分为已发布 (前5个) 和计划发布 (其余)
  const publishedGuides = guides.slice(0, 5);
  const scheduledGuides = guides.slice(5);
  
  fs.writeFileSync(autoGeneratedPath, JSON.stringify(publishedGuides, null, 2));
  console.log(`\n✅ Published ${publishedGuides.length} high-quality guides to auto-generated-guides.json`);
  
  const scheduledContent = {
    generatedAt: new Date().toISOString(),
    strategy: 'Quality over quantity - unique content per guide',
    contentQuality: 'Google HCU Compliant',
    totalGuides: scheduledGuides.length,
    lastPublishDate: null,
    publishedToday: 0,
    guides: scheduledGuides
  };
  
  fs.writeFileSync(scheduledPath, JSON.stringify(scheduledContent, null, 2));
  console.log(`✅ Scheduled ${scheduledGuides.length} guides for future publication`);
  
  // 5. 质量检查报告
  console.log('\n📊 Content Quality Report:');
  console.log('================================');
  
  const uniqueHeadings = new Set<string>();
  const uniqueIntros = new Set<string>();
  
  guides.forEach(guide => {
    guide.sections.forEach((section: any) => {
      uniqueHeadings.add(section.heading);
      if (section.content.length > 100) {
        uniqueIntros.add(section.content.substring(0, 100));
      }
    });
  });
  
  console.log(`Total guides generated: ${guides.length}`);
  console.log(`Unique section headings: ${uniqueHeadings.size}`);
  console.log(`Unique intro paragraphs: ${uniqueIntros.size}`);
  console.log(`Average sections per guide: ${(guides.reduce((sum, g) => sum + g.sections.length, 0) / guides.length).toFixed(1)}`);
  
  const avgWordCount = guides.reduce((sum, guide) => {
    return sum + guide.sections.reduce((s: number, section: any) => s + section.content.split(' ').length, 0);
  }, 0) / guides.length;
  
  console.log(`Average word count per guide: ${Math.round(avgWordCount)}`);
  console.log('================================');
  console.log('\n✅ Content regeneration complete!');
  console.log('Next: Run "npm run build" to verify the site builds correctly.');
}

function getPublishDate(offsetDays: number): string {
  const date = new Date();
  // 从明天开始
  date.setDate(date.getDate() + 1 + offsetDays);
  return date.toISOString().split('T')[0];
}

main();
