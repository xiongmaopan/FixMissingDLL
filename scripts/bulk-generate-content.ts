/**
 * 🚀 Bulk Content Generator for FixMissingDLL.com
 * 生成足够一周以上的 SEO 优化教程内容
 * 
 * 使用: npx tsx scripts/bulk-generate-content.ts
 */

console.log('🚀 Bulk Content Generator for FixMissingDLL.com');
console.log('================================================\n');

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// 🎮 热门游戏数据库 (50+ 游戏)
// ============================================
const hotGames = [
  // 2024-2025 热门游戏
  { name: 'Black Myth Wukong', slug: 'black-myth-wukong', genre: 'Action RPG' },
  { name: 'Elden Ring', slug: 'elden-ring', genre: 'Action RPG' },
  { name: 'Baldurs Gate 3', slug: 'baldurs-gate-3', genre: 'RPG' },
  { name: 'Starfield', slug: 'starfield', genre: 'RPG' },
  { name: 'Hogwarts Legacy', slug: 'hogwarts-legacy', genre: 'Action RPG' },
  { name: 'Diablo 4', slug: 'diablo-4', genre: 'Action RPG' },
  { name: 'Armored Core VI', slug: 'armored-core-6', genre: 'Action' },
  { name: 'Lies of P', slug: 'lies-of-p', genre: 'Action RPG' },
  { name: 'Alan Wake 2', slug: 'alan-wake-2', genre: 'Action Horror' },
  { name: 'Remnant 2', slug: 'remnant-2', genre: 'Action' },
  
  // 常青经典游戏
  { name: 'GTA V', slug: 'gta-v', genre: 'Action Adventure' },
  { name: 'Cyberpunk 2077', slug: 'cyberpunk-2077', genre: 'Action RPG' },
  { name: 'Red Dead Redemption 2', slug: 'red-dead-redemption-2', genre: 'Action Adventure' },
  { name: 'Monster Hunter World', slug: 'monster-hunter-world', genre: 'Action RPG' },
  { name: 'Monster Hunter Rise', slug: 'monster-hunter-rise', genre: 'Action RPG' },
  { name: 'The Witcher 3', slug: 'the-witcher-3', genre: 'RPG' },
  { name: 'Dark Souls 3', slug: 'dark-souls-3', genre: 'Action RPG' },
  { name: 'Sekiro', slug: 'sekiro', genre: 'Action' },
  
  // 射击游戏
  { name: 'Call of Duty MW3', slug: 'call-of-duty-mw3', genre: 'FPS' },
  { name: 'Call of Duty Warzone', slug: 'call-of-duty-warzone', genre: 'FPS' },
  { name: 'Counter-Strike 2', slug: 'counter-strike-2', genre: 'FPS' },
  { name: 'Apex Legends', slug: 'apex-legends', genre: 'FPS' },
  { name: 'Valorant', slug: 'valorant', genre: 'FPS' },
  { name: 'Battlefield 2042', slug: 'battlefield-2042', genre: 'FPS' },
  { name: 'Rainbow Six Siege', slug: 'rainbow-six-siege', genre: 'FPS' },
  { name: 'PUBG', slug: 'pubg', genre: 'Battle Royale' },
  { name: 'Fortnite', slug: 'fortnite', genre: 'Battle Royale' },
  
  // 体育/竞速游戏
  { name: 'FIFA 24', slug: 'fifa-24', genre: 'Sports' },
  { name: 'EA FC 24', slug: 'ea-fc-24', genre: 'Sports' },
  { name: 'Forza Horizon 5', slug: 'forza-horizon-5', genre: 'Racing' },
  { name: 'Forza Motorsport', slug: 'forza-motorsport-2023', genre: 'Racing' },
  { name: 'Need for Speed Unbound', slug: 'need-for-speed-unbound', genre: 'Racing' },
  { name: 'Gran Turismo 7', slug: 'gran-turismo-7', genre: 'Racing' },
  
  // 策略/模拟游戏
  { name: 'Civilization 6', slug: 'civilization-6', genre: 'Strategy' },
  { name: 'Total War Warhammer 3', slug: 'total-war-warhammer-3', genre: 'Strategy' },
  { name: 'Cities Skylines 2', slug: 'cities-skylines-2', genre: 'Simulation' },
  { name: 'The Sims 4', slug: 'the-sims-4', genre: 'Simulation' },
  { name: 'Planet Coaster', slug: 'planet-coaster', genre: 'Simulation' },
  
  // 多人在线游戏
  { name: 'Lost Ark', slug: 'lost-ark', genre: 'MMORPG' },
  { name: 'Final Fantasy XIV', slug: 'final-fantasy-xiv', genre: 'MMORPG' },
  { name: 'World of Warcraft', slug: 'world-of-warcraft', genre: 'MMORPG' },
  { name: 'League of Legends', slug: 'league-of-legends', genre: 'MOBA' },
  { name: 'Dota 2', slug: 'dota-2', genre: 'MOBA' },
  
  // 恐怖/冒险游戏
  { name: 'Resident Evil 4 Remake', slug: 'resident-evil-4-remake', genre: 'Horror' },
  { name: 'Dead Space Remake', slug: 'dead-space-remake', genre: 'Horror' },
  { name: 'Sons of the Forest', slug: 'sons-of-the-forest', genre: 'Survival Horror' },
  { name: 'Phasmophobia', slug: 'phasmophobia', genre: 'Horror' },
  
  // 更多热门游戏
  { name: 'Hades 2', slug: 'hades-2', genre: 'Roguelike' },
  { name: 'Palworld', slug: 'palworld', genre: 'Survival' },
  { name: 'Lethal Company', slug: 'lethal-company', genre: 'Horror' },
  { name: 'Helldivers 2', slug: 'helldivers-2', genre: 'Action' },
  { name: 'Wuthering Waves', slug: 'wuthering-waves', genre: 'Action RPG' },
  { name: 'Genshin Impact', slug: 'genshin-impact', genre: 'Action RPG' },
  { name: 'Honkai Star Rail', slug: 'honkai-star-rail', genre: 'RPG' },
];

// ============================================
// 📦 常见 DLL 错误数据库 (20+ DLL)
// ============================================
const commonDlls = [
  // Visual C++ Runtime DLLs
  { 
    dll: 'MSVCP140.dll', 
    solution: 'Visual C++ 2015-2022 Redistributable', 
    url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    category: 'Visual C++',
    description: 'Microsoft Visual C++ runtime library'
  },
  { 
    dll: 'VCRUNTIME140.dll', 
    solution: 'Visual C++ 2015-2022 Redistributable', 
    url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    category: 'Visual C++',
    description: 'Visual C++ runtime library'
  },
  { 
    dll: 'VCRUNTIME140_1.dll', 
    solution: 'Visual C++ 2015-2022 Redistributable', 
    url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    category: 'Visual C++',
    description: 'Visual C++ additional runtime library'
  },
  { 
    dll: 'MSVCP120.dll', 
    solution: 'Visual C++ 2013 Redistributable', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
    category: 'Visual C++',
    description: 'Microsoft Visual C++ 2013 runtime library'
  },
  { 
    dll: 'MSVCR120.dll', 
    solution: 'Visual C++ 2013 Redistributable', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
    category: 'Visual C++',
    description: 'Microsoft Visual C++ 2013 runtime library'
  },
  { 
    dll: 'MSVCP110.dll', 
    solution: 'Visual C++ 2012 Redistributable', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=30679',
    category: 'Visual C++',
    description: 'Microsoft Visual C++ 2012 runtime library'
  },
  
  // DirectX DLLs
  { 
    dll: 'XINPUT1_3.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'DirectX Xbox controller input library'
  },
  { 
    dll: 'XINPUT1_4.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'DirectX Xbox controller input library'
  },
  { 
    dll: 'd3dx9_43.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'Direct3D 9 extension library'
  },
  { 
    dll: 'd3dx9_42.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'Direct3D 9 extension library'
  },
  { 
    dll: 'd3dx11_43.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'Direct3D 11 extension library'
  },
  { 
    dll: 'd3dcompiler_47.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'Direct3D HLSL shader compiler'
  },
  { 
    dll: 'X3DAudio1_7.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'DirectX 3D audio library'
  },
  { 
    dll: 'XAPOFX1_5.dll', 
    solution: 'DirectX End-User Runtime', 
    url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    category: 'DirectX',
    description: 'DirectX Audio Processing library'
  },
  
  // Windows CRT DLLs
  { 
    dll: 'api-ms-win-crt-runtime-l1-1-0.dll', 
    solution: 'Windows Universal CRT', 
    url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    category: 'Windows CRT',
    description: 'Universal C Runtime library'
  },
  { 
    dll: 'ucrtbase.dll', 
    solution: 'Windows Universal CRT', 
    url: 'https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c',
    category: 'Windows CRT',
    description: 'Universal C Runtime base library'
  },
  
  // OpenAL (Audio)
  { 
    dll: 'OpenAL32.dll', 
    solution: 'OpenAL Installer', 
    url: 'https://www.openal.org/downloads/',
    category: 'Audio',
    description: 'OpenAL 3D audio library'
  },
  
  // PhysX
  { 
    dll: 'PhysXLoader.dll', 
    solution: 'NVIDIA PhysX', 
    url: 'https://www.nvidia.com/en-us/drivers/physx/physx-9-19-0218-driver/',
    category: 'Physics',
    description: 'NVIDIA PhysX physics engine'
  },
  
  // .NET Framework
  { 
    dll: 'mscorlib.dll', 
    solution: '.NET Framework', 
    url: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework',
    category: '.NET',
    description: '.NET Framework core library'
  },
  
  // Steam
  { 
    dll: 'steam_api64.dll', 
    solution: 'Steam Client', 
    url: 'https://store.steampowered.com/about/',
    category: 'Steam',
    description: 'Steam API library'
  },
  { 
    dll: 'steamclient64.dll', 
    solution: 'Steam Client', 
    url: 'https://store.steampowered.com/about/',
    category: 'Steam',
    description: 'Steam client library'
  },
];

// ============================================
// 📝 软件类 DLL 教程模板
// ============================================
const softwareApps = [
  { name: 'Adobe Photoshop', slug: 'adobe-photoshop', type: 'Creative' },
  { name: 'Adobe Premiere Pro', slug: 'adobe-premiere-pro', type: 'Creative' },
  { name: 'Adobe After Effects', slug: 'adobe-after-effects', type: 'Creative' },
  { name: 'Microsoft Office', slug: 'microsoft-office', type: 'Productivity' },
  { name: 'Discord', slug: 'discord', type: 'Communication' },
  { name: 'OBS Studio', slug: 'obs-studio', type: 'Streaming' },
  { name: 'VLC Media Player', slug: 'vlc-media-player', type: 'Media' },
  { name: 'Blender', slug: 'blender', type: '3D Modeling' },
  { name: 'Unity', slug: 'unity-engine', type: 'Game Development' },
  { name: 'Unreal Engine', slug: 'unreal-engine', type: 'Game Development' },
  { name: 'AutoCAD', slug: 'autocad', type: 'CAD' },
  { name: 'Visual Studio', slug: 'visual-studio', type: 'Development' },
  { name: 'Python', slug: 'python', type: 'Development' },
  { name: 'Node.js', slug: 'nodejs', type: 'Development' },
];

// ============================================
// 🖥️ 系统级 DLL 修复场景 (Windows 问题)
// ============================================
const systemScenarios = [
  { name: 'Windows 11 startup', slug: 'windows-11-startup', type: 'System' },
  { name: 'Windows 10 boot', slug: 'windows-10-boot', type: 'System' },
  { name: 'Windows Update', slug: 'windows-update', type: 'System' },
  { name: 'Windows Explorer', slug: 'windows-explorer', type: 'System' },
  { name: 'Microsoft Store apps', slug: 'microsoft-store-apps', type: 'System' },
  { name: 'Windows Services', slug: 'windows-services', type: 'System' },
  { name: 'Device Manager', slug: 'device-manager', type: 'System' },
  { name: 'Control Panel', slug: 'control-panel', type: 'System' },
  { name: 'Task Manager', slug: 'task-manager', type: 'System' },
  { name: 'Windows Security', slug: 'windows-security', type: 'System' },
  { name: 'Print Spooler', slug: 'print-spooler', type: 'System' },
  { name: 'Network connections', slug: 'network-connections', type: 'System' },
  { name: 'Windows Installer', slug: 'windows-installer', type: 'System' },
  { name: 'System Restore', slug: 'system-restore', type: 'System' },
  { name: 'USB devices', slug: 'usb-devices', type: 'Hardware' },
  { name: 'Audio playback', slug: 'audio-playback', type: 'Hardware' },
  { name: 'Display driver', slug: 'display-driver', type: 'Hardware' },
  { name: 'Bluetooth devices', slug: 'bluetooth-devices', type: 'Hardware' },
  { name: 'Printer setup', slug: 'printer-setup', type: 'Hardware' },
  { name: 'Webcam access', slug: 'webcam-access', type: 'Hardware' },
];

// ============================================
// 🔧 系统级 DLL 列表
// ============================================
const systemDlls = [
  {
    dll: 'kernel32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows/repair-or-reinstall-windows',
    category: 'Windows Core',
    description: 'Windows kernel core library - handles memory, processes, and system calls'
  },
  {
    dll: 'ntdll.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Core',
    description: 'NT Layer DLL - essential for all Windows operations'
  },
  {
    dll: 'user32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Core',
    description: 'Windows User Interface library'
  },
  {
    dll: 'gdi32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Graphics',
    description: 'Graphics Device Interface library'
  },
  {
    dll: 'shell32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Shell',
    description: 'Windows Shell common DLL'
  },
  {
    dll: 'advapi32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Security',
    description: 'Advanced Windows 32 API - security and registry functions'
  },
  {
    dll: 'ole32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows COM',
    description: 'OLE 32-bit component - handles embedded objects'
  },
  {
    dll: 'comctl32.dll',
    solution: 'Windows System Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows UI',
    description: 'Common Controls library for Windows UI elements'
  },
  {
    dll: 'msvcrt.dll',
    solution: 'Visual C++ Redistributable',
    url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    category: 'C Runtime',
    description: 'Microsoft C Runtime library'
  },
  {
    dll: 'ucrtbase.dll',
    solution: 'Windows Universal CRT',
    url: 'https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c',
    category: 'Universal CRT',
    description: 'Universal C Runtime base library'
  },
  {
    dll: 'ws2_32.dll',
    solution: 'Windows Networking Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Network',
    description: 'Windows Sockets 2.0 - network communication library'
  },
  {
    dll: 'wininet.dll',
    solution: 'Internet Explorer / Windows Update',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Internet',
    description: 'Windows Internet API library'
  },
  {
    dll: 'crypt32.dll',
    solution: 'Windows Security Update',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Security',
    description: 'Cryptographic API library'
  },
  {
    dll: 'winspool.drv',
    solution: 'Print Spooler Service Repair',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Printing',
    description: 'Windows Print Spooler library'
  },
  {
    dll: 'dwmapi.dll',
    solution: 'Desktop Window Manager',
    url: 'https://support.microsoft.com/en-us/windows',
    category: 'Windows Desktop',
    description: 'Desktop Window Manager API'
  },
];

// ============================================
// 🖥️ 系统 DLL 教程生成器
// ============================================
function generateSystemGuide(dll: typeof systemDlls[0], scenario: typeof systemScenarios[0], publishDate: string): Guide {
  const id = `fix-${dll.dll.toLowerCase().replace('.dll', '').replace('.drv', '')}-${scenario.slug}`;
  
  const isHardware = scenario.type === 'Hardware';
  
  return {
    id,
    slug: id,
    title: `How to Fix ${dll.dll} Error in ${scenario.name}`,
    metaTitle: `Fix ${dll.dll} Error - ${scenario.name} [2025 Complete Guide]`,
    metaDescription: `${dll.dll} error affecting ${scenario.name}? Complete troubleshooting guide with SFC, DISM, and registry fixes. Works on Windows 10/11.`,
    excerpt: `Resolve ${dll.dll} errors that cause problems with ${scenario.name}. Step-by-step repair guide using official Windows tools.`,
    category: scenario.type,
    publishDate,
    updateDate: publishDate,
    author: 'Windows Expert',
    keywords: [
      `${dll.dll} error`,
      `${dll.dll} missing`,
      `${dll.dll} ${scenario.name}`,
      `fix ${dll.dll}`,
      `${dll.dll} Windows 11`,
      `${dll.dll} Windows 10`,
      `${scenario.name} not working`,
      `Windows ${dll.dll} repair`,
    ],
    searchVolume: 'high',
    sections: [
      {
        heading: `Understanding ${dll.dll} Errors in ${scenario.name}`,
        content: `**${dll.dll}** is a critical Windows system file (${dll.description}). When this file becomes corrupted or missing, it can cause serious issues with ${scenario.name}.\n\n**Common symptoms:**\n- "${dll.dll} is missing or not found" error\n- "${dll.dll} failed to load" message\n- ${scenario.name} crashes or freezes\n- Windows startup problems\n- Blue screen errors (BSOD)\n\n**⚠️ Important:** ${dll.dll} is a protected Windows system file. Never download it from third-party websites!`
      },
      {
        heading: 'Solution 1: Run System File Checker (SFC)',
        content: `The System File Checker is your first line of defense for repairing corrupted system DLLs:\n\n**Steps:**\n1. Press \`Win + X\` and select **Terminal (Admin)** or **Command Prompt (Admin)**\n2. Type the following command and press Enter:\n\n\`\`\`\nsfc /scannow\n\`\`\`\n\n3. Wait for the scan to complete (this may take 10-15 minutes)\n4. Look for the message:\n   - ✅ "Windows Resource Protection found corrupt files and successfully repaired them"\n   - ❌ "Windows Resource Protection found corrupt files but was unable to fix some of them"\n5. Restart your computer\n\n**If SFC finds but cannot repair files, proceed to Solution 2.**`
      },
      {
        heading: 'Solution 2: Use DISM to Repair Windows Image',
        content: `DISM (Deployment Image Servicing and Management) can repair the Windows component store:\n\n**Run these commands in order:**\n\n\`\`\`\nDISM /Online /Cleanup-Image /CheckHealth\nDISM /Online /Cleanup-Image /ScanHealth\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n**⏱️ Note:** The RestoreHealth command may take 15-30 minutes. Don't interrupt it!\n\nAfter DISM completes, run SFC again:\n\`\`\`\nsfc /scannow\n\`\`\`\n\nRestart your computer and check if ${scenario.name} works correctly.`
      },
      {
        heading: 'Solution 3: Check for Windows Updates',
        content: `Windows updates often include fixes for system DLL issues:\n\n**Steps:**\n1. Press \`Win + I\` to open Settings\n2. Go to **Windows Update** (or Update & Security on Win10)\n3. Click **Check for updates**\n4. Install all available updates\n5. Restart your computer\n\n**For stuck updates:**\n\`\`\`\nnet stop wuauserv\nnet stop bits\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nnet start wuauserv\nnet start bits\n\`\`\`\n\nThen check for updates again.`
      },
      {
        heading: 'Solution 4: Perform a Clean Boot',
        content: `A clean boot can help identify if third-party software is interfering with ${dll.dll}:\n\n**Steps:**\n1. Press \`Win + R\`, type \`msconfig\`, press Enter\n2. Go to the **Services** tab\n3. Check **Hide all Microsoft services**\n4. Click **Disable all**\n5. Go to the **Startup** tab, click **Open Task Manager**\n6. Disable all startup items\n7. Restart your computer\n\nIf ${scenario.name} works after clean boot, enable services one by one to find the culprit.`
      },
      {
        heading: isHardware ? 'Solution 5: Update/Reinstall Drivers' : 'Solution 5: Reset Windows Components',
        content: isHardware 
          ? `For hardware-related ${dll.dll} errors:\n\n**Update drivers:**\n1. Press \`Win + X\` → **Device Manager**\n2. Find the device related to ${scenario.name}\n3. Right-click → **Update driver**\n4. Select **Search automatically for drivers**\n\n**Reinstall drivers:**\n1. In Device Manager, right-click the device\n2. Select **Uninstall device**\n3. Check "Delete the driver software"\n4. Restart - Windows will reinstall drivers\n\n**Download latest drivers from manufacturer:**\n- NVIDIA: nvidia.com/drivers\n- AMD: amd.com/support\n- Intel: intel.com/download-center`
          : `If ${scenario.name} still has issues:\n\n**Re-register the DLL:**\n\`\`\`\nregsvr32 /u ${dll.dll}\nregsvr32 ${dll.dll}\n\`\`\`\n\n**Reset Windows Update components:**\n\`\`\`\nnet stop wuauserv\nnet stop cryptSvc\nnet stop bits\nnet stop msiserver\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.bak\nren C:\\Windows\\System32\\catroot2 catroot2.bak\nnet start wuauserv\nnet start cryptSvc\nnet start bits\nnet start msiserver\n\`\`\``
      },
      {
        heading: 'Solution 6: System Restore or Reset',
        content: `If nothing else works, restore Windows to a previous state:\n\n**System Restore:**\n1. Press \`Win + R\`, type \`rstrui\`, press Enter\n2. Select a restore point from before the problem started\n3. Follow the wizard to restore\n\n**Reset Windows (keeps files):**\n1. Settings → System → Recovery\n2. Click **Reset PC**\n3. Choose **Keep my files**\n4. Select **Local reinstall** or **Cloud download**\n\n**⚠️ Important:** Back up important data before any reset!`
      },
    ],
    faq: [
      {
        question: `Can I download ${dll.dll} from the internet?`,
        answer: `No! ${dll.dll} is a protected Windows system file. Downloading DLLs from third-party sites for core Windows components is extremely dangerous and may contain malware. Always use official Windows repair tools like SFC and DISM.`
      },
      {
        question: `Why is ${dll.dll} causing problems with ${scenario.name}?`,
        answer: `${dll.dll} is part of ${dll.category}. ${dll.description}. When this file is corrupted, missing, or conflicting with other software, it can cause ${scenario.name} to malfunction. This often happens after Windows updates, malware infections, or improper shutdowns.`
      },
      {
        question: `Will reinstalling Windows fix the ${dll.dll} error?`,
        answer: `Yes, but it's a last resort. Try SFC, DISM, and System Restore first. If those don't work, you can do an in-place upgrade (repair install) which reinstalls Windows while keeping your files and programs. A full reset is rarely needed.`
      },
      {
        question: `Is ${dll.dll} error a sign of malware?`,
        answer: `It can be. Some malware targets or replaces Windows system files like ${dll.dll}. Run a full scan with Windows Defender or another antivirus. If malware is found, clean it first, then repair the system files with SFC/DISM.`
      },
    ],
    relatedDlls: [dll.dll.toLowerCase().replace('.dll', '').replace('.drv', '')],
  };
}

// ============================================
// 📊 Guide 接口定义
// ============================================
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
  sections: { heading: string; content: string }[];
  faq: { question: string; answer: string }[];
  relatedDlls: string[];
  searchVolume?: string;
}

// ============================================
// 🎮 游戏 DLL 教程生成器
// ============================================
function generateGameGuide(dll: typeof commonDlls[0], game: typeof hotGames[0], publishDate: string): Guide {
  const id = `fix-${dll.dll.toLowerCase().replace('.dll', '')}-${game.slug}`;
  
  return {
    id,
    slug: id,
    title: `How to Fix ${dll.dll} Missing Error in ${game.name}`,
    metaTitle: `Fix ${dll.dll} Missing in ${game.name} [2025 Guide] | FixMissingDLL`,
    metaDescription: `${dll.dll} is missing error in ${game.name}? Complete step-by-step guide to fix this DLL error. Official download links included. Windows 10/11 compatible.`,
    excerpt: `Complete guide to fix the "${dll.dll} is missing" error when launching ${game.name}. Includes official download links, registry fixes, and troubleshooting steps.`,
    category: 'Gaming',
    publishDate,
    updateDate: publishDate,
    author: 'DLL Fix Expert',
    keywords: [
      `${dll.dll} missing ${game.name}`,
      `${game.name} ${dll.dll} error`,
      `fix ${dll.dll} ${game.name}`,
      `${game.name} won't start`,
      `${dll.dll} download`,
      `${game.name} crash on startup`,
      `${game.name} dll error`,
    ],
    searchVolume: 'medium',
    sections: [
      {
        heading: `Why Does ${game.name} Show "${dll.dll} is Missing"?`,
        content: `When you try to launch ${game.name}, Windows cannot find the **${dll.dll}** file that the game needs to run. This is a ${dll.category} component (${dll.description}).\n\nThe error typically appears as:\n\n> "The program can't start because ${dll.dll} is missing from your computer. Try reinstalling the program to fix this problem."\n\n**Common causes:**\n- ${dll.solution} is not installed or corrupted\n- Antivirus software quarantined the DLL file\n- Incomplete game installation\n- Windows system file corruption\n\n**Good news:** This is one of the most common PC gaming errors and is easy to fix!`
      },
      {
        heading: `Solution 1: Install ${dll.solution} (Recommended)`,
        content: `The safest and most effective way to fix this error is to install the official runtime from Microsoft:\n\n**Step-by-step:**\n1. Download from: [${dll.url}](${dll.url})\n2. Close ${game.name} completely\n3. Run the installer **as Administrator** (right-click → Run as administrator)\n4. Follow the installation wizard\n5. Restart your computer\n6. Try launching ${game.name} again\n\n**💡 Pro Tip:** Install BOTH x64 (64-bit) and x86 (32-bit) versions for maximum compatibility. Some games use both!`
      },
      {
        heading: 'Solution 2: Download DLL from FixMissingDLL.com',
        content: `If the runtime installation doesn't work, you can download **${dll.dll}** directly from our secure server:\n\n1. Go to our [${dll.dll} download page](/dll/${dll.dll.toLowerCase().replace('.dll', '')}/)\n2. Select the correct version:\n   - **64-bit** for most modern games\n   - **32-bit** for older games\n3. Download and extract the DLL file\n4. Copy to the appropriate folder:\n   - **64-bit:** \`C:\\Windows\\System32\\\`\n   - **32-bit:** \`C:\\Windows\\SysWOW64\\\`\n5. Alternatively, copy to: \`[${game.name} install folder]\\\`\n6. Restart ${game.name}\n\n**⚠️ Security Note:** Only download DLL files from trusted sources like FixMissingDLL.com.`
      },
      {
        heading: `Solution 3: Verify ${game.name} Game Files`,
        content: `Corrupted or incomplete game files can cause DLL errors. Here's how to verify:\n\n**Steam:**\n1. Open Steam Library\n2. Right-click **${game.name}**\n3. Select **Properties** → **Installed Files**\n4. Click **"Verify integrity of game files"**\n5. Wait for the process to complete (may take several minutes)\n\n**Epic Games:**\n1. Open Epic Games Launcher\n2. Find **${game.name}** in your Library\n3. Click the **three dots (...)** next to it\n4. Select **Manage** → **Verify**\n\n**Xbox/Microsoft Store:**\n1. Open Xbox app\n2. Go to **My Games**\n3. Right-click **${game.name}**\n4. Select **Manage** → **Files** → **Verify and repair**`
      },
      {
        heading: 'Solution 4: Run System File Checker',
        content: `Windows has built-in tools to repair corrupted system files:\n\n**Run SFC Scan:**\n1. Press \`Win + X\` and select **Terminal (Admin)** or **Command Prompt (Admin)**\n2. Type: \`sfc /scannow\`\n3. Press Enter and wait for the scan to complete\n4. Restart your computer\n\n**If SFC finds issues, run DISM:**\n\`\`\`\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\nThis may take 10-20 minutes. Be patient!`
      },
      {
        heading: 'Solution 5: Check Antivirus Settings',
        content: `Sometimes antivirus software mistakenly blocks or quarantines DLL files:\n\n1. Open your antivirus software (Windows Defender, Norton, McAfee, etc.)\n2. Check the **Quarantine** or **Virus Chest** section\n3. Look for **${dll.dll}** or ${game.name} files\n4. If found, **restore** the files\n5. Add ${game.name}'s installation folder to the **exclusion list**\n\n**Windows Defender:**\n- Settings → Privacy & security → Windows Security → Virus & threat protection\n- Click "Manage settings" → Add or remove exclusions`
      },
    ],
    faq: [
      {
        question: `Why does ${game.name} say ${dll.dll} is missing?`,
        answer: `${game.name} requires ${dll.dll} (part of ${dll.solution}) to run properly. This error occurs when the file is missing, corrupted, or blocked by security software. Installing the correct runtime package usually fixes this issue.`
      },
      {
        question: `Is it safe to download ${dll.dll} from the internet?`,
        answer: `Only download DLL files from trusted sources like FixMissingDLL.com or install the official ${dll.solution} from Microsoft. Never download DLLs from unknown websites as they may contain malware.`
      },
      {
        question: `Will reinstalling ${game.name} fix the ${dll.dll} error?`,
        answer: `Reinstalling the game might help, but it's not the most efficient solution. Since ${dll.dll} is a Windows/runtime component (not part of the game), installing ${dll.solution} first is recommended.`
      },
      {
        question: `I installed the runtime but still get the error. What now?`,
        answer: `Try these steps: 1) Install BOTH 32-bit and 64-bit versions of the runtime, 2) Verify game files through Steam/Epic, 3) Check if antivirus is blocking the file, 4) Run Windows System File Checker (sfc /scannow).`
      },
      {
        question: `Does this fix work on Windows 11?`,
        answer: `Yes! All solutions in this guide work on Windows 10, Windows 11, and even Windows 7/8. The ${dll.solution} is compatible with all modern Windows versions.`
      },
    ],
    relatedDlls: [dll.dll.toLowerCase().replace('.dll', '')],
  };
}

// ============================================
// 💼 软件 DLL 教程生成器
// ============================================
function generateSoftwareGuide(dll: typeof commonDlls[0], app: typeof softwareApps[0], publishDate: string): Guide {
  const id = `fix-${dll.dll.toLowerCase().replace('.dll', '')}-${app.slug}`;
  
  return {
    id,
    slug: id,
    title: `How to Fix ${dll.dll} Missing Error in ${app.name}`,
    metaTitle: `Fix ${dll.dll} Error in ${app.name} [2025 Solution] | FixMissingDLL`,
    metaDescription: `${app.name} showing ${dll.dll} is missing error? Follow our step-by-step guide to fix this DLL error quickly. Works on Windows 10/11.`,
    excerpt: `Resolve the "${dll.dll} is missing" error in ${app.name}. Complete troubleshooting guide with official downloads and solutions.`,
    category: app.type,
    publishDate,
    updateDate: publishDate,
    author: 'DLL Fix Expert',
    keywords: [
      `${dll.dll} ${app.name}`,
      `${app.name} ${dll.dll} missing`,
      `fix ${dll.dll} ${app.name}`,
      `${app.name} won't open`,
      `${app.name} dll error`,
    ],
    searchVolume: 'medium',
    sections: [
      {
        heading: `Understanding the ${dll.dll} Error in ${app.name}`,
        content: `When ${app.name} fails to start with a "${dll.dll} is missing" error, it means the application cannot find a required system file.\n\n**${dll.dll}** is part of ${dll.solution} and is essential for:\n- ${dll.description}\n- Running ${app.type} applications\n- Windows system functionality\n\n**This error can occur after:**\n- Windows updates\n- Installing/uninstalling other software\n- System file corruption\n- Antivirus interference`
      },
      {
        heading: `Quick Fix: Install ${dll.solution}`,
        content: `**Step 1:** Download the official installer:\n- [Download ${dll.solution}](${dll.url})\n\n**Step 2:** Close ${app.name} completely\n\n**Step 3:** Run the installer as Administrator\n\n**Step 4:** Restart your computer\n\n**Step 5:** Launch ${app.name}`
      },
      {
        heading: 'Alternative: Direct DLL Download',
        content: `If the runtime installation doesn't help:\n\n1. Download [${dll.dll}](/dll/${dll.dll.toLowerCase().replace('.dll', '')}/) from our secure server\n2. Extract the file\n3. Copy to \`C:\\Windows\\System32\\\` (64-bit) or \`C:\\Windows\\SysWOW64\\\` (32-bit)\n4. Restart ${app.name}`
      },
      {
        heading: `Repair ${app.name} Installation`,
        content: `Sometimes the application itself needs repair:\n\n**For Adobe apps:**\n- Use Adobe Creative Cloud to repair\n- Uninstall and reinstall the app\n\n**For Microsoft Office:**\n- Control Panel → Programs → ${app.name} → Change → Repair\n\n**For other apps:**\n- Uninstall via Control Panel\n- Download fresh installer from official website\n- Reinstall with administrator privileges`
      },
    ],
    faq: [
      {
        question: `Why does ${app.name} need ${dll.dll}?`,
        answer: `${dll.dll} is a ${dll.category} component that ${app.name} uses for ${dll.description}. Without this file, the application cannot start properly.`
      },
      {
        question: `Can I copy ${dll.dll} from another computer?`,
        answer: `While technically possible, it's not recommended. Different Windows versions may have different DLL versions. Installing ${dll.solution} ensures you get the correct version for your system.`
      },
    ],
    relatedDlls: [dll.dll.toLowerCase().replace('.dll', '')],
  };
}

// ============================================
// 📅 日期生成器 (用于计划发布)
// ============================================
function generatePublishDates(count: number, startDate: Date = new Date()): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < count; i++) {
    // 每天发布 2-3 篇文章
    const articlesPerDay = 2 + Math.floor(Math.random() * 2); // 2-3
    for (let j = 0; j < articlesPerDay && dates.length < count; j++) {
      dates.push(current.toISOString().split('T')[0]);
    }
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

// ============================================
// 🚀 主函数 - 3+2策略: 3篇游戏 + 2篇系统
// ============================================
function main() {
  const args = process.argv.slice(2);
  const daysToGenerate = parseInt(args[0]) || 30; // 默认生成30天的内容
  const gamePerDay = 3;   // 每天3篇游戏教程
  const systemPerDay = 2; // 每天2篇系统教程
  const articlesPerDay = gamePerDay + systemPerDay; // 每天5篇
  
  const totalGuides = daysToGenerate * articlesPerDay;
  const totalGameGuides = daysToGenerate * gamePerDay;
  const totalSystemGuides = daysToGenerate * systemPerDay;
  
  console.log(`📊 Configuration (3+2 Strategy):`);
  console.log(`   - Days to generate: ${daysToGenerate}`);
  console.log(`   - Game guides per day: ${gamePerDay}`);
  console.log(`   - System guides per day: ${systemPerDay}`);
  console.log(`   - Total articles per day: ${articlesPerDay}`);
  console.log(`   - Total game guides: ${totalGameGuides}`);
  console.log(`   - Total system guides: ${totalSystemGuides}`);
  console.log(`   - Grand total: ${totalGuides}`);
  console.log('');
  
  // 读取已存在的 guides
  const guidesPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
  let existingGuides: Guide[] = [];
  let existingIds = new Set<string>();
  
  if (fs.existsSync(guidesPath)) {
    try {
      existingGuides = JSON.parse(fs.readFileSync(guidesPath, 'utf-8'));
      existingIds = new Set(existingGuides.map(g => g.id));
      console.log(`📚 Found ${existingGuides.length} existing guides`);
    } catch (e) {
      console.log('⚠️ Could not parse existing guides, starting fresh');
    }
  }
  
  // 生成新的 guides
  const gameGuides: Guide[] = [];
  const systemGuides: Guide[] = [];
  
  // 当前日期
  const startDate = new Date();
  
  console.log(`\n🎮 Generating game guides (target: ${totalGameGuides})...`);
  
  // 生成游戏教程 - 遍历游戏和DLL组合
  let gameCount = 0;
  outer: for (const game of hotGames) {
    for (const dll of commonDlls) {
      if (gameCount >= totalGameGuides) break outer;
      
      // 计算发布日期
      const dayIndex = Math.floor(gameCount / gamePerDay);
      const pubDate = new Date(startDate);
      pubDate.setDate(pubDate.getDate() + dayIndex);
      const publishDate = pubDate.toISOString().split('T')[0];
      
      const guide = generateGameGuide(dll, game, publishDate);
      
      // 跳过已存在的
      if (existingIds.has(guide.id)) {
        continue;
      }
      
      gameGuides.push(guide);
      gameCount++;
    }
  }
  
  console.log(`   ✅ Generated ${gameGuides.length} game guides`);
  
  console.log(`\n🖥️ Generating system guides (target: ${totalSystemGuides})...`);
  
  // 生成系统教程 - 遍历场景和DLL组合
  let systemCount = 0;
  outer2: for (const scenario of systemScenarios) {
    for (const dll of systemDlls) {
      if (systemCount >= totalSystemGuides) break outer2;
      
      // 计算发布日期
      const dayIndex = Math.floor(systemCount / systemPerDay);
      const pubDate = new Date(startDate);
      pubDate.setDate(pubDate.getDate() + dayIndex);
      const publishDate = pubDate.toISOString().split('T')[0];
      
      const guide = generateSystemGuide(dll, scenario, publishDate);
      
      // 跳过已存在的
      if (existingIds.has(guide.id)) {
        continue;
      }
      
      systemGuides.push(guide);
      systemCount++;
    }
  }
  
  console.log(`   ✅ Generated ${systemGuides.length} system guides`);
  
  // 合并所有新 guides
  const newGuides = [...gameGuides, ...systemGuides];
  
  console.log(`\n✅ Total new guides: ${newGuides.length}`);
  
  if (newGuides.length === 0) {
    console.log('⚠️ No new guides to add (all combinations already exist)');
    return;
  }
  
  // 按发布日期分组
  const byDate = new Map<string, { game: Guide[], system: Guide[] }>();
  
  for (const guide of gameGuides) {
    const date = guide.publishDate;
    if (!byDate.has(date)) {
      byDate.set(date, { game: [], system: [] });
    }
    byDate.get(date)!.game.push(guide);
  }
  
  for (const guide of systemGuides) {
    const date = guide.publishDate;
    if (!byDate.has(date)) {
      byDate.set(date, { game: [], system: [] });
    }
    byDate.get(date)!.system.push(guide);
  }
  
  console.log('\n📅 Publishing Schedule (3+2 Strategy):');
  const sortedDates = Array.from(byDate.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  for (const [date, guides] of sortedDates.slice(0, 7)) {
    const total = guides.game.length + guides.system.length;
    console.log(`   ${date}: ${total} articles (🎮 ${guides.game.length} + 🖥️ ${guides.system.length})`);
    
    // 显示前2个游戏教程
    for (const g of guides.game.slice(0, 2)) {
      console.log(`      🎮 ${g.title.slice(0, 55)}...`);
    }
    if (guides.game.length > 2) {
      console.log(`         ... +${guides.game.length - 2} more game guides`);
    }
    
    // 显示前2个系统教程
    for (const g of guides.system.slice(0, 2)) {
      console.log(`      🖥️ ${g.title.slice(0, 55)}...`);
    }
    if (guides.system.length > 2) {
      console.log(`         ... +${guides.system.length - 2} more system guides`);
    }
  }
  
  if (sortedDates.length > 7) {
    console.log(`   ... and ${sortedDates.length - 7} more days`);
  }
  
  // 保存到 scheduled-guides.json (待发布队列)
  const scheduledPath = path.join(__dirname, '../src/data/scheduled-guides.json');
  const scheduledData = {
    generatedAt: new Date().toISOString(),
    strategy: '3+2 (3 game guides + 2 system guides per day)',
    totalGuides: newGuides.length,
    gameGuides: gameGuides.length,
    systemGuides: systemGuides.length,
    daysOfContent: byDate.size,
    publishSchedule: sortedDates.map(([date, guides]) => ({
      date,
      gameCount: guides.game.length,
      systemCount: guides.system.length,
      total: guides.game.length + guides.system.length,
      gameGuides: guides.game.map(g => g.id),
      systemGuides: guides.system.map(g => g.id),
    })),
    queue: newGuides,
  };
  
  fs.writeFileSync(scheduledPath, JSON.stringify(scheduledData, null, 2));
  console.log(`\n💾 Saved scheduled guides to: ${scheduledPath}`);
  
  // 合并到 auto-generated-guides.json
  const allGuides = [...existingGuides, ...newGuides];
  fs.writeFileSync(guidesPath, JSON.stringify(allGuides, null, 2));
  console.log(`📚 Total guides in database: ${allGuides.length}`);
  
  // 统计信息
  const uniqueGames = new Set(gameGuides.map(g => {
    const parts = g.slug.split('-');
    return parts.slice(2).join('-');
  })).size;
  
  const uniqueScenarios = new Set(systemGuides.map(g => {
    const parts = g.slug.split('-');
    return parts.slice(2).join('-');
  })).size;
  
  const uniqueDlls = new Set(newGuides.map(g => g.relatedDlls[0])).size;
  
  console.log('\n📊 Summary:');
  console.log(`   - New game guides: ${gameGuides.length}`);
  console.log(`   - New system guides: ${systemGuides.length}`);
  console.log(`   - Total new guides: ${newGuides.length}`);
  console.log(`   - Total guides in database: ${allGuides.length}`);
  console.log(`   - Days of content: ${byDate.size}`);
  console.log(`   - Unique games covered: ${uniqueGames}`);
  console.log(`   - Unique scenarios covered: ${uniqueScenarios}`);
  console.log(`   - Unique DLLs covered: ${uniqueDlls}`);
  
  console.log('\n🎉 Content generation complete! (3+2 Strategy)');
  console.log('   Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: git add . && git commit -m "Add 30-day content (3+2 strategy)" && git push');
}

main();
