/**
 * 修复缺失日期的文章
 * 为 2025-12-10 和 2025-12-12 添加文章
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/scheduled-guides.json');

// 读取现有数据
let content = fs.readFileSync(filePath, 'utf-8');
const hasComment = content.startsWith('//');
let commentLine = '';
if (hasComment) {
  const lines = content.split('\n');
  commentLine = lines[0];
  content = lines.slice(1).join('\n');
}

const data = JSON.parse(content);

// 为 12月10日 添加文章
const dec10Articles = [
  {
    "id": "fix-vcruntime140-hogwarts-legacy",
    "slug": "fix-vcruntime140-hogwarts-legacy",
    "title": "Fix vcruntime140.dll Missing Error in Hogwarts Legacy",
    "metaTitle": "Fix vcruntime140.dll in Hogwarts Legacy (2023) - Quick Solution",
    "metaDescription": "Solve vcruntime140.dll is missing error preventing Hogwarts Legacy from launching. Step-by-step fix guide with game-specific solutions.",
    "excerpt": "Can't play Hogwarts Legacy due to vcruntime140.dll error? This guide provides specific solutions for Avalanche Software's 2023 release.",
    "category": "Gaming",
    "publishDate": "2025-12-10",
    "updateDate": "2025-12-10",
    "author": "System Admin Team",
    "keywords": ["vcruntime140.dll hogwarts legacy", "Hogwarts Legacy dll error", "Hogwarts Legacy won't launch"],
    "searchVolume": "high",
    "sections": [
      {
        "heading": "Why Hogwarts Legacy Needs vcruntime140.dll",
        "content": "vcruntime140.dll is a core Visual C++ runtime component. Hogwarts Legacy requires this file to handle memory management and execute compiled code properly."
      },
      {
        "heading": "Solution 1: Install the Official Runtime Package (Recommended)",
        "content": "**This solution fixes vcruntime140.dll errors for 90%+ of Hogwarts Legacy players.**\n\n### Download Links (Official Microsoft)\n\n- **64-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n- **32-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)\n\n### Installation Steps\n\n**Step 1**: Download BOTH the x64 and x86 versions\n\n**Step 2**: Close Hogwarts Legacy and Steam completely\n\n**Step 3**: Run the x64 installer first, then the x86 installer\n\n**Step 4**: Restart your computer\n\n**Step 5**: Launch Hogwarts Legacy"
      },
      {
        "heading": "Solution 2: Verify Game Files",
        "content": "If the runtime installation didn't help, your game files may be corrupted.\n\n### For Steam:\n1. Open Steam → Library\n2. Right-click **Hogwarts Legacy** → **Properties**\n3. Go to **Installed Files** tab\n4. Click **Verify integrity of game files**\n5. Wait for verification to complete\n6. Restart Steam and try launching"
      },
      {
        "heading": "Hogwarts Legacy-Specific Fixes",
        "content": "### Known Issues\n1. Shader compilation stuttering on first launch (wait 10-15 minutes)\n2. VRAM spikes in certain areas (lower texture quality if needed)\n3. Ray tracing causes crashes on some GPUs (disable RT if unstable)\n\n### Performance Tips\n1. Enable DLSS or FSR for significant FPS gains\n2. Set draw distance to Medium for better performance\n3. Disable ray tracing on GPUs with less than 8GB VRAM"
      }
    ],
    "relatedDlls": ["vcruntime140.dll", "vcruntime140_1.dll", "msvcp140.dll"],
    "game": "Hogwarts Legacy",
    "gameYear": 2023,
    "engine": "Unreal Engine 5"
  },
  {
    "id": "fix-d3d12-hogwarts-legacy",
    "slug": "fix-d3d12-hogwarts-legacy",
    "title": "Fix d3d12.dll Missing Error in Hogwarts Legacy",
    "metaTitle": "Fix d3d12.dll in Hogwarts Legacy (2023) - DirectX 12 Fix",
    "metaDescription": "Solve d3d12.dll is missing error in Hogwarts Legacy. DirectX 12 troubleshooting guide with verified solutions.",
    "excerpt": "Hogwarts Legacy showing d3d12.dll error? This guide covers DirectX 12 fixes for the 2023 release.",
    "category": "Gaming",
    "publishDate": "2025-12-10",
    "updateDate": "2025-12-10",
    "author": "System Admin Team",
    "keywords": ["d3d12.dll hogwarts legacy", "Hogwarts Legacy DirectX 12 error", "Hogwarts Legacy dx12"],
    "searchVolume": "medium",
    "sections": [
      {
        "heading": "Why Hogwarts Legacy Needs d3d12.dll",
        "content": "d3d12.dll is the DirectX 12 runtime library. Hogwarts Legacy uses DirectX 12 for rendering, requiring Windows 10 (version 1909+) or Windows 11."
      },
      {
        "heading": "Solution 1: Update Windows",
        "content": "d3d12.dll comes built into Windows 10/11. Missing or corrupted files usually indicate Windows needs updating.\n\n### Steps:\n1. Press **Win + I** to open Settings\n2. Go to **Windows Update**\n3. Click **Check for updates**\n4. Install all available updates\n5. Restart your computer"
      },
      {
        "heading": "Solution 2: Update Graphics Drivers",
        "content": "Outdated GPU drivers can cause DirectX 12 issues.\n\n### NVIDIA:\nDownload from: [nvidia.com/drivers](https://www.nvidia.com/Download/index.aspx)\n\n### AMD:\nDownload from: [amd.com/support](https://www.amd.com/en/support)\n\n### Intel:\nDownload from: [intel.com/download-center](https://www.intel.com/content/www/us/en/download-center/home.html)"
      },
      {
        "heading": "Solution 3: Run DirectX Diagnostic",
        "content": "Check your DirectX version:\n\n1. Press **Win + R**\n2. Type **dxdiag** and press Enter\n3. Check **DirectX Version** - should be 12\n4. If lower, update Windows"
      }
    ],
    "relatedDlls": ["d3d12.dll", "d3d11.dll", "dxgi.dll"],
    "game": "Hogwarts Legacy",
    "gameYear": 2023,
    "engine": "Unreal Engine 5"
  },
  {
    "id": "fix-msvcp140-hogwarts-legacy",
    "slug": "fix-msvcp140-hogwarts-legacy",
    "title": "Fix msvcp140.dll Missing Error in Hogwarts Legacy",
    "metaTitle": "Fix msvcp140.dll in Hogwarts Legacy (2023) - Quick Solution",
    "metaDescription": "Solve msvcp140.dll is missing error preventing Hogwarts Legacy from launching. Official Microsoft fix included.",
    "excerpt": "msvcp140.dll error blocking Hogwarts Legacy? Get the official fix from Microsoft Visual C++ Redistributable.",
    "category": "Gaming",
    "publishDate": "2025-12-10",
    "updateDate": "2025-12-10",
    "author": "System Admin Team",
    "keywords": ["msvcp140.dll hogwarts legacy", "Hogwarts Legacy msvcp error"],
    "searchVolume": "medium",
    "sections": [
      {
        "heading": "Why Hogwarts Legacy Needs msvcp140.dll",
        "content": "msvcp140.dll provides C++ Standard Library functions. It ships with the Visual C++ 2015-2022 Redistributable package."
      },
      {
        "heading": "Solution: Install Visual C++ Redistributable",
        "content": "**Download Links (Official Microsoft)**\n\n- **64-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n- **32-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)\n\nInstall both versions, restart your PC, then launch the game."
      }
    ],
    "relatedDlls": ["msvcp140.dll", "vcruntime140.dll"],
    "game": "Hogwarts Legacy",
    "gameYear": 2023,
    "engine": "Unreal Engine 5"
  }
];

// 为 12月12日 添加文章
const dec12Articles = [
  {
    "id": "fix-vcruntime140-1-valorant",
    "slug": "fix-vcruntime140-1-valorant",
    "title": "Fix vcruntime140_1.dll Missing Error in VALORANT",
    "metaTitle": "Fix vcruntime140_1.dll in VALORANT (2024) - Quick Solution",
    "metaDescription": "Solve vcruntime140_1.dll is missing error preventing VALORANT from launching. Step-by-step fix guide.",
    "excerpt": "VALORANT won't launch due to vcruntime140_1.dll error? Install the Visual C++ Redistributable to fix it.",
    "category": "Gaming",
    "publishDate": "2025-12-12",
    "updateDate": "2025-12-12",
    "author": "System Admin Team",
    "keywords": ["vcruntime140_1.dll valorant", "VALORANT dll error", "VALORANT won't start"],
    "searchVolume": "high",
    "sections": [
      {
        "heading": "Why VALORANT Needs vcruntime140_1.dll",
        "content": "vcruntime140_1.dll is part of the Visual C++ 2019/2022 runtime. VALORANT requires this component for its anti-cheat system (Vanguard) and game client."
      },
      {
        "heading": "Solution 1: Install the Official Runtime Package",
        "content": "**This fixes vcruntime140_1.dll errors for most VALORANT players.**\n\n### Download Links (Official Microsoft)\n\n- **64-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)\n- **32-bit**: [Microsoft Visual C++ 2015-2022 Redistributable x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)\n\n### Steps:\n1. Download both versions\n2. Close VALORANT and Riot Client completely\n3. Run installers\n4. Restart your PC\n5. Launch VALORANT"
      },
      {
        "heading": "Solution 2: Repair Riot Vanguard",
        "content": "Vanguard issues can cause DLL errors.\n\n### Steps:\n1. Open **Add or Remove Programs**\n2. Find **Riot Vanguard**\n3. Click **Uninstall**\n4. Restart your PC\n5. Launch VALORANT - Vanguard will reinstall automatically"
      },
      {
        "heading": "VALORANT-Specific Fixes",
        "content": "### Common Issues\n1. Vanguard requires Secure Boot enabled in BIOS\n2. TPM 2.0 required for Windows 11 users\n3. Some RGB software conflicts with Vanguard\n\n### Performance Tips\n1. Close unnecessary background apps\n2. Disable Game Bar and Game DVR\n3. Run VALORANT as administrator if issues persist"
      }
    ],
    "relatedDlls": ["vcruntime140_1.dll", "vcruntime140.dll", "msvcp140.dll"],
    "game": "VALORANT",
    "gameYear": 2020,
    "engine": "Unreal Engine 4"
  },
  {
    "id": "fix-d3dx9-43-resident-evil-4",
    "slug": "fix-d3dx9-43-resident-evil-4",
    "title": "Fix d3dx9_43.dll Missing Error in Resident Evil 4 Remake",
    "metaTitle": "Fix d3dx9_43.dll in RE4 Remake (2023) - DirectX Fix",
    "metaDescription": "Solve d3dx9_43.dll is missing error in Resident Evil 4 Remake. DirectX 9 fix guide with official download.",
    "excerpt": "RE4 Remake showing d3dx9_43.dll error? Install the DirectX End-User Runtime to fix it.",
    "category": "Gaming",
    "publishDate": "2025-12-12",
    "updateDate": "2025-12-12",
    "author": "System Admin Team",
    "keywords": ["d3dx9_43.dll resident evil 4", "RE4 Remake DirectX error", "RE4 dll missing"],
    "searchVolume": "medium",
    "sections": [
      {
        "heading": "Why RE4 Remake Needs d3dx9_43.dll",
        "content": "d3dx9_43.dll is a DirectX 9 helper library. Some game components or overlays still require legacy DirectX 9 files even in modern games."
      },
      {
        "heading": "Solution: Install DirectX End-User Runtime",
        "content": "**Download (Official Microsoft)**\n\n[DirectX End-User Runtime Web Installer](https://www.microsoft.com/en-us/download/details.aspx?id=35)\n\n### Steps:\n1. Download the installer\n2. Run dxwebsetup.exe\n3. Follow the installation wizard\n4. Restart your PC\n5. Launch RE4 Remake"
      },
      {
        "heading": "RE4 Remake-Specific Fixes",
        "content": "### Known Issues\n1. Ray tracing causes instability on some GPUs\n2. Hair Strands setting is very demanding\n3. Frame generation requires compatible GPU\n\n### Performance Tips\n1. Set Mesh Quality to Low for big FPS gains\n2. Disable Motion Blur to reduce GPU load\n3. Use DLSS Quality mode for best balance"
      }
    ],
    "relatedDlls": ["d3dx9_43.dll", "d3dx9_42.dll", "d3dx9_41.dll"],
    "game": "Resident Evil 4 Remake",
    "gameYear": 2023,
    "engine": "RE Engine"
  },
  {
    "id": "fix-mss32-age-of-mythology",
    "slug": "fix-mss32-age-of-mythology",
    "title": "Fix mss32.dll Missing Error in Age of Mythology",
    "metaTitle": "Fix mss32.dll in Age of Mythology - Classic Game Fix",
    "metaDescription": "Solve mss32.dll is missing error in Age of Mythology. Miles Sound System fix for the classic 2002 RTS.",
    "excerpt": "Age of Mythology showing mss32.dll error? This classic game requires the Miles Sound System library.",
    "category": "Gaming",
    "publishDate": "2025-12-12",
    "updateDate": "2025-12-12",
    "author": "System Admin Team",
    "keywords": ["mss32.dll age of mythology", "AoM dll error", "Age of Mythology won't start"],
    "searchVolume": "medium",
    "sections": [
      {
        "heading": "Why Age of Mythology Needs mss32.dll",
        "content": "mss32.dll is the Miles Sound System library, commonly used in games from the early 2000s for audio processing."
      },
      {
        "heading": "Solution 1: Verify Game Files (Steam)",
        "content": "If you have Age of Mythology on Steam:\n\n1. Open Steam → Library\n2. Right-click **Age of Mythology** → **Properties**\n3. Go to **Installed Files** tab\n4. Click **Verify integrity of game files**\n5. Steam will restore any missing files"
      },
      {
        "heading": "Solution 2: Run in Compatibility Mode",
        "content": "For classic Age of Mythology (non-Retold):\n\n1. Right-click the game executable\n2. Select **Properties**\n3. Go to **Compatibility** tab\n4. Check **Run this program in compatibility mode for:**\n5. Select **Windows XP (Service Pack 3)**\n6. Click **Apply** and **OK**"
      },
      {
        "heading": "Age of Mythology Retold vs Classic",
        "content": "**Age of Mythology: Retold (2024)** is a modern remake that doesn't use mss32.dll. If you're playing Retold and seeing this error, verify your game files through Steam.\n\n**Classic Age of Mythology** may need compatibility mode and legacy DirectX components."
      }
    ],
    "relatedDlls": ["mss32.dll", "binkw32.dll"],
    "game": "Age of Mythology",
    "gameYear": 2002,
    "engine": "Ensemble Studios Engine"
  }
];

// 添加新文章到 guides 数组
data.guides = [...data.guides, ...dec10Articles, ...dec12Articles];

// 按日期排序
data.guides.sort((a, b) => a.publishDate.localeCompare(b.publishDate));

// 更新元数据
data.totalGuides = data.guides.length;

// 保存文件
let output = JSON.stringify(data, null, 2);
if (hasComment) {
  output = commentLine + '\n' + output;
}
fs.writeFileSync(filePath, output, 'utf-8');

console.log('✅ Added 3 articles for 2025-12-10');
console.log('✅ Added 3 articles for 2025-12-12');
console.log('📊 Total guides: ' + data.guides.length);
