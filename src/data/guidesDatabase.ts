// SEO 长尾词指南/博客数据库
// 用于捕获 0xc000007b, Event ID 1000 等高价值搜索流量

export interface GuideSection {
  heading: string;
  content: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Error Codes' | 'Installation' | 'Gaming' | 'System' | 'Event Logs';
  publishDate: string;
  updateDate: string;
  author: string;
  sections: GuideSection[];
  relatedDlls: string[];
  keywords: string[];
}

export const guidesDatabase: Guide[] = [
  {
    id: 'fix-0xc000007b',
    slug: 'how-to-fix-0xc000007b-error',
    title: 'How to Fix "The application was unable to start correctly (0xc000007b)" Error',
    metaTitle: 'Fix 0xc000007b Error in Windows 11/10 (2025 Guide) | FixMissingDLL',
    metaDescription: 'Complete guide to fix the 0xc000007b application error in Windows 11 and Windows 10. Solutions for GTA V, Elden Ring, Adobe, and other applications.',
    excerpt: 'The 0xc000007b error typically indicates a 32-bit/64-bit DLL mismatch. This guide shows you exactly how to fix it.',
    category: 'Error Codes',
    publishDate: '2025-01-15',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What Causes the 0xc000007b Error?',
        content: `The error code 0xc000007b appears when Windows cannot properly initialize an application. The most common causes are:

**1. Architecture Mismatch**: A 64-bit application is trying to load a 32-bit DLL (or vice versa). This often happens when you manually download DLL files and place them in the wrong folder.

**2. Corrupted Visual C++ Runtime**: The Microsoft Visual C++ Redistributable packages are damaged or incomplete.

**3. Corrupted DirectX Files**: Missing or corrupted DirectX runtime components.

**4. .NET Framework Issues**: Damaged .NET Framework installation.

**5. Corrupted System Files**: Windows system files have become corrupted.`
      },
      {
        heading: 'Solution 1: Reinstall Visual C++ Redistributables (Most Effective)',
        content: `This is the most effective solution for 90% of 0xc000007b errors.

**Step 1**: Press \`Win + R\`, type \`appwiz.cpl\`, press Enter.

**Step 2**: Uninstall ALL "Microsoft Visual C++ Redistributable" entries (there may be several).

**Step 3**: Download the All-in-One Visual C++ Redistributable installer:
- [Official Microsoft VC++ 2015-2022 (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [Official Microsoft VC++ 2015-2022 (x86)](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 4**: Install BOTH x64 and x86 versions (even on 64-bit Windows).

**Step 5**: Restart your computer.`
      },
      {
        heading: 'Solution 2: Reinstall DirectX End-User Runtime',
        content: `Many games require legacy DirectX 9.0c components that aren't included with Windows 10/11.

**Step 1**: Download the [DirectX End-User Runtime Web Installer](https://www.microsoft.com/en-us/download/details.aspx?id=35).

**Step 2**: Run the installer and follow the prompts.

**Step 3**: Restart your computer.

**Note**: This does NOT replace DirectX 12 - it installs legacy DirectX 9/10/11 components alongside it.`
      },
      {
        heading: 'Solution 3: Run System File Checker',
        content: `Corrupted Windows system files can cause 0xc000007b errors.

**Step 1**: Open Command Prompt as Administrator (search "cmd", right-click, "Run as administrator").

**Step 2**: Run the following commands:

\`\`\`
sfc /scannow
\`\`\`

Wait for the scan to complete (10-15 minutes).

**Step 3**: If issues are found, run DISM:

\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

**Step 4**: Restart your computer.`
      },
      {
        heading: 'Solution 4: Check for 32-bit/64-bit Confusion',
        content: `If you've manually downloaded DLL files, you may have placed them in the wrong folder.

**For 64-bit applications**:
- DLLs should be in: \`C:\\Windows\\System32\`

**For 32-bit applications on 64-bit Windows**:
- DLLs should be in: \`C:\\Windows\\SysWOW64\`

Yes, this is confusing! The folder names are backwards for legacy compatibility reasons.

**Tip**: Delete any manually downloaded DLL files and use the official runtime installers instead.`
      },
      {
        heading: 'Solution 5: Reinstall .NET Framework',
        content: `For applications that use .NET:

**Step 1**: Open Windows Settings > Apps > Optional Features.

**Step 2**: Look for ".NET Framework 3.5" and ".NET Framework 4.8" - ensure both are installed.

**Step 3**: If issues persist, download the [.NET Framework Repair Tool](https://www.microsoft.com/en-us/download/details.aspx?id=30135).`
      }
    ],
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3dx9_43.dll', 'xinput1_3.dll'],
    keywords: ['0xc000007b', '0xc000007b fix', 'application unable to start', 'windows 11 0xc000007b', 'gta v 0xc000007b', 'elden ring 0xc000007b']
  },
  {
    id: 'install-directx',
    slug: 'install-directx-windows-11',
    title: 'How to Install DirectX 12, 11, and 9 on Windows 11/10 (Complete Guide)',
    metaTitle: 'Install DirectX 12/11/9 on Windows 11/10 (2025) | Fix d3dx9_43.dll Missing',
    metaDescription: 'Step-by-step guide to install or reinstall DirectX on Windows 11 and Windows 10. Fix missing d3dx9_43.dll, d3dx9_42.dll, and other DirectX errors.',
    excerpt: 'Windows 11 comes with DirectX 12, but many games need legacy DirectX 9/10/11 files. Here\'s how to install them all.',
    category: 'Installation',
    publishDate: '2025-01-10',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'Gaming Support Team',
    sections: [
      {
        heading: 'Understanding DirectX Versions',
        content: `**DirectX 12**: Pre-installed on Windows 10/11. Cannot be separately downloaded.

**DirectX 11/10**: Also pre-installed, but some components may be missing.

**DirectX 9.0c**: Legacy version required by many older games. NOT included with Windows 10/11 by default.

When you see errors like "d3dx9_43.dll is missing", you need to install the **DirectX End-User Runtime**, which provides the legacy DirectX 9/10/11 support libraries.`
      },
      {
        heading: 'Method 1: Install DirectX End-User Runtime (Recommended)',
        content: `This installs all legacy DirectX components (d3dx9_xx.dll, xinput1_x.dll, xaudio2_x.dll, etc.).

**Step 1**: Download the [DirectX End-User Runtime Web Installer](https://www.microsoft.com/en-us/download/details.aspx?id=35) from Microsoft.

**Step 2**: Run \`dxwebsetup.exe\`.

**Step 3**: Follow the installation wizard.

**Step 4**: Restart your computer.

This will install approximately 100 MB of DirectX runtime files.`
      },
      {
        heading: 'Method 2: Offline Installation',
        content: `If you have multiple computers or a slow internet connection:

**Step 1**: Download the [DirectX End-User Runtimes (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=8109) - this is a 96 MB standalone package.

**Step 2**: Extract the files to a folder.

**Step 3**: Run \`DXSETUP.exe\` from the extracted folder.

This package contains all DirectX 9/10/11 runtime components released through June 2010.`
      },
      {
        heading: 'Method 3: Check DirectX Version',
        content: `To verify your DirectX installation:

**Step 1**: Press \`Win + R\`.

**Step 2**: Type \`dxdiag\` and press Enter.

**Step 3**: The DirectX Diagnostic Tool will show your DirectX version.

On the "Display" tab, you can see the Feature Level your GPU supports.`
      },
      {
        heading: 'Troubleshooting: DirectX Still Not Working',
        content: `If games still report DirectX errors after installation:

**1. Run as Administrator**: Right-click the game executable, select "Run as administrator".

**2. Install to Game Folder**: Some games include their own DirectX installer in the game folder (usually in a "redist" or "_CommonRedist" subfolder). Run it.

**3. Update GPU Drivers**: Outdated graphics drivers can cause DirectX issues.
   - NVIDIA: [nvidia.com/drivers](https://www.nvidia.com/drivers)
   - AMD: [amd.com/support](https://www.amd.com/support)
   - Intel: [intel.com/support](https://www.intel.com/support)

**4. Verify Game Files**: On Steam, right-click the game > Properties > Local Files > Verify integrity.`
      }
    ],
    relatedDlls: ['d3dx9_43.dll', 'd3dx9_42.dll', 'd3dx9_41.dll', 'xinput1_3.dll', 'xinput1_4.dll', 'xaudio2_7.dll', 'd3dcompiler_47.dll'],
    keywords: ['install directx', 'directx 12 download', 'directx 9 windows 11', 'd3dx9_43.dll missing', 'directx end user runtime']
  },
  {
    id: 'visual-cpp-guide',
    slug: 'install-visual-cpp-redistributable-all-versions',
    title: 'Install All Visual C++ Redistributable Versions (2005-2022)',
    metaTitle: 'Download All Visual C++ Redistributables (2005-2022) | Complete Guide',
    metaDescription: 'Complete guide to install all Microsoft Visual C++ Redistributable packages from 2005 to 2022. Fix vcruntime140.dll, msvcp140.dll, and msvcr errors.',
    excerpt: 'Many Windows applications require Visual C++ Runtime. Here\'s how to install all versions and fix missing DLL errors.',
    category: 'Installation',
    publishDate: '2025-01-08',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What is Visual C++ Redistributable?',
        content: `The Visual C++ Redistributable is a runtime library required by programs built with Microsoft Visual Studio.

Each version of Visual Studio (2005, 2008, 2010, 2012, 2013, 2015, 2017, 2019, 2022) has its own runtime, and programs require the specific version they were compiled with.

**Good news**: Visual C++ 2015, 2017, 2019, and 2022 share the same runtime package. Installing the latest (2022) version covers all of them.`
      },
      {
        heading: 'Download Links (Official Microsoft)',
        content: `**Visual C++ 2015-2022 (Covers 2015, 2017, 2019, 2022)**:
- [x64 (64-bit)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [x86 (32-bit)](https://aka.ms/vs/17/release/vc_redist.x86.exe)
- [ARM64](https://aka.ms/vs/17/release/vc_redist.arm64.exe)

**Visual C++ 2013**:
- [x64](https://aka.ms/highdpimfc2013x64enu)
- [x86](https://aka.ms/highdpimfc2013x86enu)

**Visual C++ 2012**:
- [x64](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe)
- [x86](https://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe)

**Visual C++ 2010**:
- [x64](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x64.exe)
- [x86](https://download.microsoft.com/download/1/6/5/165255E7-1014-4D0A-B094-B6A430A6BFFC/vcredist_x86.exe)

**Visual C++ 2008**:
- [x64](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x64.exe)
- [x86](https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x86.exe)

**Visual C++ 2005**:
- [x64](https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x64.exe)
- [x86](https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.exe)`
      },
      {
        heading: 'Installation Instructions',
        content: `**Important**: On 64-bit Windows, install BOTH x64 and x86 versions of each package. Many 32-bit programs still require the x86 runtime.

**Step 1**: Download all the packages you need.

**Step 2**: Install them in order from oldest to newest (2005 → 2022).

**Step 3**: Restart your computer after all installations.

**Pro Tip**: You can use the "VisualCppRedist AIO" installer from TechPowerUp which bundles all versions in a single installer.`
      },
      {
        heading: 'Repair Existing Installation',
        content: `If you already have Visual C++ installed but it's corrupted:

**Step 1**: Open Control Panel > Programs > Programs and Features.

**Step 2**: Find "Microsoft Visual C++ 20XX Redistributable".

**Step 3**: Right-click > Change > Repair.

Alternatively, uninstall all Visual C++ packages and reinstall them fresh.`
      },
      {
        heading: 'Which DLLs Does Each Version Provide?',
        content: `**2015-2022** (vcruntime140.dll, msvcp140.dll, vcruntime140_1.dll, concrt140.dll, vcomp140.dll)

**2013** (msvcr120.dll, msvcp120.dll)

**2012** (msvcr110.dll, msvcp110.dll)

**2010** (msvcr100.dll, msvcp100.dll)

**2008** (msvcr90.dll, msvcp90.dll)

**2005** (msvcr80.dll, msvcp80.dll)`
      }
    ],
    relatedDlls: ['vcruntime140.dll', 'vcruntime140_1.dll', 'msvcp140.dll', 'msvcp140_1.dll', 'concrt140.dll', 'vcomp140.dll', 'mfc140u.dll'],
    keywords: ['visual c++ redistributable', 'vcruntime140.dll download', 'msvcp140.dll missing', 'microsoft visual c++ 2015', 'all in one visual c++']
  },
  {
    id: 'event-id-1000',
    slug: 'fix-event-id-1000-application-error',
    title: 'Fix Event ID 1000 Application Error in Windows Event Viewer',
    metaTitle: 'Fix Event ID 1000 Application Error (2025) | Windows Event Viewer Guide',
    metaDescription: 'Complete guide to diagnose and fix Event ID 1000 Application Error in Windows Event Viewer. Troubleshoot ntdll.dll, kernelbase.dll, and other faulting module errors.',
    excerpt: 'Event ID 1000 indicates an application crash. Learn how to read the error details and fix the underlying cause.',
    category: 'Event Logs',
    publishDate: '2025-01-20',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'Windows Support Team',
    sections: [
      {
        heading: 'Understanding Event ID 1000',
        content: `Event ID 1000 is logged in Windows Event Viewer when an application crashes due to an unhandled exception.

**To view the error**:
1. Press \`Win + R\`, type \`eventvwr.msc\`, press Enter.
2. Navigate to: Windows Logs > Application.
3. Look for entries with Source: "Application Error" and Event ID: 1000.

The error contains these key fields:
- **Faulting application name**: The program that crashed.
- **Faulting module name**: The DLL that caused the crash (e.g., ntdll.dll, vcruntime140.dll).
- **Exception code**: The type of error (e.g., 0xc0000005 = Access Violation).`
      },
      {
        heading: 'Common Faulting Modules and Fixes',
        content: `**ntdll.dll** - Core Windows system file. Usually indicates:
- Corrupted system files → Run \`sfc /scannow\`
- Incompatible software → Update or uninstall recently installed apps
- Memory issues → Run Windows Memory Diagnostic

**kernelbase.dll** - Windows kernel library:
- Often caused by .NET issues → Repair .NET Framework
- Third-party DLL conflicts → Boot in Safe Mode to test

**vcruntime140.dll / msvcp140.dll** - Visual C++ Runtime:
- Reinstall Visual C++ Redistributable 2015-2022

**ucrtbase.dll** - Universal C Runtime:
- Install latest Windows Updates
- Reinstall Visual C++ Redistributable

**d3d11.dll / d3dx9_43.dll** - DirectX:
- Reinstall DirectX End-User Runtime`
      },
      {
        heading: 'Step-by-Step Troubleshooting',
        content: `**Step 1**: Identify the faulting module from Event Viewer.

**Step 2**: Search for the DLL name on this site to find the appropriate fix.

**Step 3**: If the faulting module is part of the application itself (not a Windows DLL), try:
- Reinstalling the application
- Updating the application to the latest version
- Running the application as Administrator
- Checking for application-specific fixes on the developer's support site

**Step 4**: If crashes persist, collect a crash dump:
\`\`\`
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting\\LocalDumps" /v DumpFolder /t REG_EXPAND_SZ /d "C:\\CrashDumps" /f
\`\`\`
Then analyze the dump with WinDbg.`
      },
      {
        heading: 'Common Exception Codes',
        content: `**0xc0000005** - Access Violation
The application tried to read/write protected memory. Often caused by corrupted DLLs or incompatible drivers.

**0xc000007b** - Bad Image Format
32-bit/64-bit mismatch. See our 0xc000007b guide.

**0xc0000142** - DLL Initialization Failed
A DLL failed to initialize. Usually a runtime library issue.

**0xc0000409** - Stack Buffer Overrun
Security check detected buffer overflow. Update the application.

**0x80000003** - Breakpoint
Debug breakpoint hit. May indicate corrupted executable.`
      }
    ],
    relatedDlls: ['ntdll.dll', 'kernel32.dll', 'vcruntime140.dll', 'msvcp140.dll', 'ucrtbase.dll'],
    keywords: ['event id 1000', 'application error', 'faulting module ntdll.dll', 'windows event viewer', 'kernelbase.dll crash']
  },
  {
    id: 'dll-safety',
    slug: 'are-dll-download-sites-safe',
    title: 'Are DLL Download Sites Safe? How to Verify DLL Files',
    metaTitle: 'Are DLL Downloads Safe? How to Verify DLL Files (Security Guide)',
    metaDescription: 'Learn how to verify DLL files are safe using digital signatures, MD5/SHA256 hashes, and VirusTotal. Protect yourself from malware-infected DLLs.',
    excerpt: 'Downloading DLLs from random websites is risky. Learn how to verify files are legitimate and safe.',
    category: 'System',
    publishDate: '2025-01-05',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'Security Team',
    sections: [
      {
        heading: 'The Danger of Random DLL Downloads',
        content: `Many websites offer "free DLL downloads" but these can be:

**1. Malware**: The DLL is actually a virus, trojan, or ransomware.

**2. Outdated**: Old versions that may not fix your problem.

**3. Wrong Architecture**: 32-bit DLL for a 64-bit application.

**4. Wrong Version**: DLL from a different software version.

**The safest approach**: Install the official runtime package (Visual C++, DirectX, .NET) rather than downloading individual DLLs.`
      },
      {
        heading: 'How to Check Digital Signatures',
        content: `Legitimate Microsoft DLLs have digital signatures.

**Step 1**: Right-click the DLL file > Properties.

**Step 2**: Click the "Digital Signatures" tab.

**Step 3**: Select the signature and click "Details".

**Step 4**: Verify the signer is "Microsoft Corporation" or the expected software vendor.

**Warning**: If there's no Digital Signatures tab, the file is NOT signed and may be unsafe.`
      },
      {
        heading: 'Verify with Hash Values',
        content: `Compare the file's hash against known-good values.

**Using PowerShell**:
\`\`\`powershell
Get-FileHash -Path "C:\\path\\to\\file.dll" -Algorithm SHA256
\`\`\`

**Using Command Prompt**:
\`\`\`cmd
certutil -hashfile "C:\\path\\to\\file.dll" SHA256
\`\`\`

Compare the output against the hash values provided on trusted sites (like this one) or Microsoft's documentation.`
      },
      {
        heading: 'Scan with VirusTotal',
        content: `Before using any downloaded DLL:

**Step 1**: Go to [VirusTotal.com](https://www.virustotal.com/).

**Step 2**: Upload the DLL file (or paste its URL).

**Step 3**: Review the scan results from 70+ antivirus engines.

**What to look for**:
- 0 detections = likely safe
- 1-2 detections = possibly false positive, investigate further
- 3+ detections = likely malicious, do not use`
      },
      {
        heading: 'Best Practices for DLL Management',
        content: `**DO**:
✓ Install official runtime packages (Visual C++, DirectX, .NET)
✓ Keep Windows updated
✓ Verify digital signatures before using DLLs
✓ Scan downloaded files with VirusTotal
✓ Create a System Restore point before modifying system files

**DON'T**:
✗ Download DLLs from random "free DLL" sites
✗ Run executables that claim to "fix all DLL errors"
✗ Disable antivirus to run a suspicious DLL
✗ Copy DLLs from one computer to another
✗ Trust DLLs sent via email or messaging apps`
      }
    ],
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll', 'kernel32.dll', 'ntdll.dll'],
    keywords: ['dll download safe', 'verify dll file', 'dll virus', 'digital signature dll', 'virustotal dll']
  },
  {
    id: 'steam-api-errors',
    slug: 'fix-steam-api64-dll-missing',
    title: 'Fix steam_api64.dll and steam_api.dll Missing Errors',
    metaTitle: 'Fix steam_api64.dll Missing (2025) | Steam API DLL Error Solutions',
    metaDescription: 'Complete guide to fix steam_api64.dll and steam_api.dll missing errors in Steam games. Safe solutions that don\'t involve downloading DLLs.',
    excerpt: 'Steam API DLL errors are common in pirated games, but can also occur in legitimate copies. Here\'s how to fix them properly.',
    category: 'Gaming',
    publishDate: '2025-01-18',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'Gaming Support Team',
    sections: [
      {
        heading: 'Why This Error Occurs',
        content: `The steam_api64.dll (64-bit) and steam_api.dll (32-bit) files are Steam's integration libraries.

**Common causes**:
1. **Pirated games**: Cracks often replace or remove Steam DLLs, which antiviruses quarantine.
2. **Antivirus quarantine**: Even legitimate DLLs get flagged as "HackTool".
3. **Corrupted game files**: Steam download was interrupted or corrupted.
4. **Missing Steam client**: Game requires Steam running in background.`
      },
      {
        heading: 'Solution 1: Verify Game Files (For Legitimate Steam Games)',
        content: `**Step 1**: Open Steam.

**Step 2**: Go to Library > Right-click the game > Properties.

**Step 3**: Click "Local Files" > "Verify integrity of game files".

**Step 4**: Wait for verification (may take several minutes).

Steam will re-download any missing or corrupted files, including steam_api.dll.`
      },
      {
        heading: 'Solution 2: Add Antivirus Exception',
        content: `Many antiviruses (especially Windows Defender) flag steam_api.dll as a "HackTool".

**For Windows Defender**:
1. Open Windows Security > Virus & threat protection.
2. Click "Protection history".
3. Find the quarantined steam_api.dll, click "Restore".
4. Add the game folder to exclusions: Virus & threat protection settings > Manage exclusions > Add an exclusion.

**For other antiviruses**: Check your quarantine/vault and restore the file, then whitelist the game folder.`
      },
      {
        heading: 'Solution 3: Reinstall Steam',
        content: `If multiple games have Steam API errors:

**Step 1**: Uninstall Steam via Control Panel (your games will be preserved).

**Step 2**: Download fresh Steam installer from [store.steampowered.com](https://store.steampowered.com/about/).

**Step 3**: Install Steam to the same location.

**Step 4**: Your games should be detected automatically.`
      },
      {
        heading: 'For Non-Steam Games',
        content: `Some games sold on other platforms (GOG, Epic) may include Steam API for achievements or multiplayer.

**Options**:
1. Check if the game has a non-Steam version (DRM-free from GOG).
2. Copy steam_api.dll from another game that works.
3. Install the Steam client even if you don't own the game there.

**Warning**: Do NOT download steam_api.dll from random websites - it's a prime target for malware injection.`
      }
    ],
    relatedDlls: ['steam_api64.dll', 'steam_api.dll'],
    keywords: ['steam_api64.dll missing', 'steam_api.dll not found', 'steam dll error', 'verify game files steam']
  },
  // New Long-tail Guides
  {
    id: 'fix-vcruntime140-1-dll',
    slug: 'vcruntime140-1-dll-missing-fix',
    title: 'How to Fix VCRUNTIME140_1.dll Missing Error',
    metaTitle: 'Fix VCRUNTIME140_1.dll Missing Error Windows 11/10 (2025) | FixMissingDLL',
    metaDescription: 'Complete solution for VCRUNTIME140_1.dll was not found error. Fix Microsoft Visual C++ Runtime errors in Discord, Adobe, games, and other apps.',
    excerpt: 'VCRUNTIME140_1.dll is part of the Visual C++ 2019/2022 runtime. Learn how to fix this common error quickly.',
    category: 'Error Codes',
    publishDate: '2025-01-20',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What is VCRUNTIME140_1.dll?',
        content: `VCRUNTIME140_1.dll is an extended Visual C++ Runtime component introduced in Visual Studio 2019. It works alongside vcruntime140.dll to provide additional runtime functionality.

**Why This Error Occurs**:
- Visual C++ 2015-2022 Redistributable is not installed
- The redistributable is corrupted
- Windows Update removed or damaged the file
- Antivirus software quarantined the file

**Affected Applications**:
- Discord
- Adobe Creative Cloud (Photoshop, Premiere, etc.)
- Modern PC games (Cyberpunk 2077, Elden Ring)
- Python applications
- Node.js applications`
      },
      {
        heading: 'Solution: Install Visual C++ Redistributable',
        content: `**Step 1**: Download both versions from Microsoft:
- [VC++ 2015-2022 x64](https://aka.ms/vs/17/release/vc_redist.x64.exe)
- [VC++ 2015-2022 x86](https://aka.ms/vs/17/release/vc_redist.x86.exe)

**Step 2**: Close all running applications.

**Step 3**: Install the x64 version first, then the x86 version.

**Step 4**: Restart your computer.

**Important**: You need BOTH versions even on 64-bit Windows because some 32-bit components still require the x86 runtime.`
      },
      {
        heading: 'Alternative: Repair Existing Installation',
        content: `If you already have VC++ installed but still see the error:

**Step 1**: Open Settings > Apps > Installed apps

**Step 2**: Find "Microsoft Visual C++ 2015-2022 Redistributable"

**Step 3**: Click the three dots > Modify > Repair

**Step 4**: Repeat for both x64 and x86 versions

**Step 5**: Restart your computer`
      }
    ],
    relatedDlls: ['vcruntime140.dll', 'vcruntime140_1.dll', 'msvcp140.dll'],
    keywords: ['vcruntime140_1.dll missing', 'vcruntime140_1.dll download', 'discord vcruntime error', 'adobe vcruntime error']
  },
  {
    id: 'fix-msvcp140-dll',
    slug: 'msvcp140-dll-missing-fix',
    title: 'How to Fix MSVCP140.dll Missing Error',
    metaTitle: 'Fix MSVCP140.dll Is Missing Error Windows 11/10 (2025) | FixMissingDLL',
    metaDescription: 'Complete guide to fix MSVCP140.dll is missing from your computer error. Solutions for games, Adobe apps, and other software.',
    excerpt: 'MSVCP140.dll is the C++ Standard Library. This guide explains how to fix missing MSVCP140.dll errors.',
    category: 'Error Codes',
    publishDate: '2025-01-22',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'Understanding MSVCP140.dll',
        content: `MSVCP140.dll is the Microsoft Visual C++ Standard Library DLL. It provides the Standard Template Library (STL) implementation including:

- **Containers**: vector, map, set, string
- **Algorithms**: sort, find, transform
- **I/O streams**: iostream, fstream
- **Smart pointers**: unique_ptr, shared_ptr

Almost every modern Windows application compiled with Visual Studio requires this file.`
      },
      {
        heading: 'Quick Fix: Install VC++ Redistributable',
        content: `**Download Links**:
- [x64 Version](https://aka.ms/vs/17/release/vc_redist.x64.exe) (for 64-bit apps)
- [x86 Version](https://aka.ms/vs/17/release/vc_redist.x86.exe) (for 32-bit apps)

**Installation Steps**:
1. Download both installers
2. Run vc_redist.x64.exe and complete installation
3. Run vc_redist.x86.exe and complete installation
4. Restart your computer
5. Try running your application again`
      },
      {
        heading: 'If The Error Persists',
        content: `Sometimes a clean reinstall is needed:

**Step 1**: Uninstall existing VC++ Redistributables
- Open Control Panel > Programs > Uninstall a program
- Find all "Microsoft Visual C++ 20XX Redistributable" entries
- Uninstall each one

**Step 2**: Run Windows Update
- Settings > Windows Update > Check for updates

**Step 3**: Reinstall VC++ Redistributables
- Download and install both x64 and x86 versions

**Step 4**: If still failing, run System File Checker:
\`\`\`
sfc /scannow
\`\`\``
      }
    ],
    relatedDlls: ['msvcp140.dll', 'vcruntime140.dll', 'msvcp140_1.dll'],
    keywords: ['msvcp140.dll missing', 'msvcp140.dll download', 'msvcp140.dll is missing from your computer', 'visual c++ runtime error']
  },
  {
    id: 'fix-xinput1-3-dll',
    slug: 'xinput1-3-dll-missing-fix',
    title: 'How to Fix XINPUT1_3.dll Missing Error',
    metaTitle: 'Fix XINPUT1_3.dll Missing Error for Games (2025) | FixMissingDLL',
    metaDescription: 'Complete solution for XINPUT1_3.dll was not found error when launching games. Fix controller and gamepad issues.',
    excerpt: 'XINPUT1_3.dll handles Xbox controller input. Learn how to fix this error to get your gamepad working.',
    category: 'Gaming',
    publishDate: '2025-01-25',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What is XINPUT1_3.dll?',
        content: `XINPUT1_3.dll is the XInput API library that enables games to receive input from Xbox controllers and compatible gamepads.

**Common Games Affected**:
- Grand Theft Auto V
- Dark Souls series
- The Witcher 3
- Many Unity and Unreal Engine games
- Older Steam games

**Symptoms**:
- Game won't start with "XINPUT1_3.dll is missing" error
- Controller not detected in games
- Game crashes when using gamepad`
      },
      {
        heading: 'Solution: Install DirectX End-User Runtime',
        content: `XINPUT1_3.dll is part of the legacy DirectX package.

**Step 1**: Download [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35)

**Step 2**: Run the installer (it will extract to a folder)

**Step 3**: Navigate to the extracted folder and run DXSETUP.exe

**Step 4**: Accept the license and complete installation

**Step 5**: Restart your computer

**Note**: This won't downgrade DirectX 12 - it adds legacy DirectX 9/10 components alongside your existing DirectX version.`
      },
      {
        heading: 'Alternative: Verify Game Files',
        content: `If the error only affects one game, the game's DLL copy may be corrupted:

**Steam**:
1. Right-click game in Library
2. Properties > Installed Files
3. "Verify integrity of game files"

**Epic Games**:
1. Click the three dots on the game
2. Manage > Verify

**GOG Galaxy**:
1. Select game > More (...)
2. Manage Installation > Verify/Repair`
      }
    ],
    relatedDlls: ['xinput1_3.dll', 'xinput1_4.dll', 'd3dx9_43.dll'],
    keywords: ['xinput1_3.dll missing', 'xinput1_3.dll download', 'controller not working game', 'directx xinput error']
  },
  {
    id: 'fix-d3dx9-43-dll',
    slug: 'd3dx9-43-dll-missing-fix',
    title: 'How to Fix D3DX9_43.dll Missing Error',
    metaTitle: 'Fix D3DX9_43.dll Missing Error Windows 11/10 (2025) | FixMissingDLL',
    metaDescription: 'Complete guide to fix D3DX9_43.dll is missing error for games. Install DirectX End-User Runtime to resolve DirectX 9 errors.',
    excerpt: 'D3DX9_43.dll is required by many games for DirectX 9 support. Here is how to fix the missing error.',
    category: 'Gaming',
    publishDate: '2025-01-28',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'Understanding D3DX9_43.dll',
        content: `D3DX9_43.dll is part of the DirectX 9 D3DX utility library. It provides helper functions for:

- 3D graphics rendering
- Texture loading and manipulation  
- Shader compilation
- Math operations for 3D graphics

**Why Windows 11/10 Doesn't Include It**:
Modern Windows only includes DirectX 11/12 by default. Legacy DirectX 9 components must be installed separately.

**Games That Need This**:
- League of Legends
- World of Warcraft (classic)
- Counter-Strike: Source
- Left 4 Dead 2
- Many older AAA games`
      },
      {
        heading: 'Install DirectX End-User Runtime',
        content: `**Step 1**: Download the official installer:
[DirectX End-User Runtime Web Installer](https://www.microsoft.com/en-us/download/details.aspx?id=35)

**Step 2**: Run dxwebsetup.exe

**Step 3**: Accept the license agreement

**Step 4**: Wait for download and installation (may take several minutes)

**Step 5**: Click Finish and restart your computer

**Important**: This installs ALL legacy DirectX files (d3dx9_24 through d3dx9_43, d3dx10, d3dx11, XInput, XAudio, etc.)`
      },
      {
        heading: 'Game-Specific Fixes',
        content: `Some games include their own DirectX installers:

**Check Game Folder**:
1. Navigate to the game's installation folder
2. Look for a folder named "DirectX", "Redist", or "_CommonRedist"
3. Run DXSETUP.exe or DirectX installer if present

**Steam Games**:
Right-click game > Properties > Local Files > Browse > Look for redist folder

**GOG Games**:
Check the game folder for "_Redist" or "CommonRedist" folder`
      }
    ],
    relatedDlls: ['d3dx9_43.dll', 'd3dx9_42.dll', 'd3dx9_41.dll', 'xinput1_3.dll'],
    keywords: ['d3dx9_43.dll missing', 'd3dx9_43.dll download', 'directx 9 error', 'legacy directx install']
  },
  {
    id: 'fix-api-ms-win-crt-runtime',
    slug: 'api-ms-win-crt-runtime-l1-1-0-dll-missing',
    title: 'How to Fix api-ms-win-crt-runtime-l1-1-0.dll Missing Error',
    metaTitle: 'Fix api-ms-win-crt-runtime-l1-1-0.dll Missing (2025) | FixMissingDLL',
    metaDescription: 'Complete solution for api-ms-win-crt-runtime-l1-1-0.dll is missing error. Install Universal C Runtime (UCRT) to fix this issue.',
    excerpt: 'This DLL is part of Windows Universal CRT. Learn how to fix this error with the proper Windows Update.',
    category: 'System',
    publishDate: '2025-02-01',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What is api-ms-win-crt-runtime-l1-1-0.dll?',
        content: `This DLL is part of the Universal C Runtime (UCRT), which is the modern C runtime library for Windows.

**Background**:
- UCRT was introduced with Windows 10
- For Windows 7/8.1, it's delivered through Windows Update
- Required by Visual C++ 2015 and later
- Used by Python, Node.js, and many modern applications

**Common Causes**:
- Windows 7/8.1 without the UCRT update
- Corrupted Windows installation
- Failed Windows Update`
      },
      {
        heading: 'Solution for Windows 10/11',
        content: `On Windows 10/11, the UCRT is built into the operating system. If you see this error:

**Step 1**: Run Windows Update
- Settings > Windows Update > Check for updates
- Install all available updates
- Restart your computer

**Step 2**: Run System File Checker
\`\`\`
sfc /scannow
\`\`\`

**Step 3**: If still failing, run DISM:
\`\`\`
DISM /Online /Cleanup-Image /RestoreHealth
\`\`\`

**Step 4**: Reinstall Visual C++ Redistributables`
      },
      {
        heading: 'Solution for Windows 7/8.1',
        content: `On older Windows versions, you need to install the UCRT update manually:

**Windows 7**:
Install [KB2999226](https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c)

**Windows 8.1**:
Install the same KB2999226 update for your system.

**Prerequisites**:
- Windows 7 SP1 or Windows 8.1 Update must be installed first
- Run Windows Update to install any pending updates before installing the UCRT

**After Installation**:
1. Restart your computer
2. Install/reinstall Visual C++ 2015-2022 Redistributable
3. Try running your application again`
      }
    ],
    relatedDlls: ['api-ms-win-crt-runtime-l1-1-0.dll', 'ucrtbase.dll', 'vcruntime140.dll'],
    keywords: ['api-ms-win-crt-runtime-l1-1-0.dll missing', 'ucrt missing', 'universal crt error', 'windows runtime error']
  },
  {
    id: 'fix-msvcr120-dll',
    slug: 'msvcr120-dll-missing-fix',
    title: 'How to Fix MSVCR120.dll Missing Error',
    metaTitle: 'Fix MSVCR120.dll Is Missing Error Windows 11/10 (2025) | FixMissingDLL',
    metaDescription: 'Complete guide to fix MSVCR120.dll is missing from your computer. Download official Visual C++ 2013 Redistributable.',
    excerpt: 'MSVCR120.dll is from Visual C++ 2013. This guide shows how to fix the missing DLL error.',
    category: 'Error Codes',
    publishDate: '2025-02-05',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'About MSVCR120.dll',
        content: `MSVCR120.dll is the Microsoft Visual C++ 2013 Runtime Library.

**Still Widely Used By**:
- Older Adobe applications (CS6, early CC versions)
- Many Steam games from 2013-2016
- Skype classic versions
- Some professional software (AutoCAD, SolidWorks versions)
- Various business applications

**The "120" in the name indicates Visual Studio 2013 (version 12.0).**`
      },
      {
        heading: 'Download and Install VC++ 2013 Redistributable',
        content: `**Official Download Links**:
- [Visual C++ 2013 x64](https://aka.ms/highdpimfc2013x64enu)
- [Visual C++ 2013 x86](https://aka.ms/highdpimfc2013x86enu)

**Alternative (Microsoft Download Center)**:
[Visual C++ Redistributable for VS 2013](https://www.microsoft.com/en-us/download/details.aspx?id=40784)

**Installation**:
1. Download both x64 and x86 versions
2. Close all applications
3. Install x64 version first
4. Install x86 version
5. Restart your computer`
      },
      {
        heading: 'Troubleshooting',
        content: `If installation fails:

**Error: Already Installed**
- Go to Control Panel > Programs
- Find "Microsoft Visual C++ 2013 Redistributable"
- Click Repair (or Uninstall and reinstall)

**Error: Installation Failed**
1. Run installer as Administrator
2. Temporarily disable antivirus
3. Clear temp folder: \`%temp%\`
4. Try again

**Still Not Working?**
The application may need a specific version. Check the application's system requirements or support documentation.`
      }
    ],
    relatedDlls: ['msvcr120.dll', 'msvcp120.dll', 'vccorlib120.dll'],
    keywords: ['msvcr120.dll missing', 'msvcr120.dll download', 'visual c++ 2013 redistributable', 'vc++ 2013 runtime']
  },
  {
    id: 'fix-vulkan-dll',
    slug: 'vulkan-1-dll-missing-fix',
    title: 'How to Fix vulkan-1.dll Missing Error',
    metaTitle: 'Fix vulkan-1.dll Missing Error for Games (2025) | FixMissingDLL',
    metaDescription: 'Complete guide to fix vulkan-1.dll is missing error. Update graphics drivers to install Vulkan runtime for modern games.',
    excerpt: 'Vulkan-1.dll is the Vulkan graphics API runtime. Learn how to fix missing Vulkan DLL errors.',
    category: 'Gaming',
    publishDate: '2025-02-10',
    updateDate: new Date().toISOString().split('T')[0],
    author: 'System Admin Team',
    sections: [
      {
        heading: 'What is Vulkan?',
        content: `Vulkan is a modern, low-overhead graphics API developed by the Khronos Group. It provides:

- High-performance 3D graphics
- Better multi-threading than DirectX 11
- Cross-platform support (Windows, Linux, Android)
- Used by many modern games and emulators

**Games Using Vulkan**:
- Doom Eternal
- Red Dead Redemption 2
- Rainbow Six Siege
- Baldur's Gate 3
- Many emulators (RPCS3, Yuzu, PCSX2)`
      },
      {
        heading: 'Solution 1: Update Graphics Drivers',
        content: `The Vulkan runtime is installed with your graphics drivers.

**NVIDIA**:
1. Visit [nvidia.com/drivers](https://www.nvidia.com/Download/index.aspx)
2. Select your GPU model
3. Download and install the latest driver
4. Choose "Clean Installation" option

**AMD**:
1. Visit [amd.com/support](https://www.amd.com/en/support)
2. Download AMD Software: Adrenalin Edition
3. Install with "Factory Reset" option

**Intel**:
1. Visit [intel.com/content/www/us/en/download-center](https://www.intel.com/content/www/us/en/download-center/home.html)
2. Download Intel Graphics Driver
3. Install and restart`
      },
      {
        heading: 'Solution 2: Install Vulkan SDK (Developers)',
        content: `If you're a developer or the driver doesn't help:

**Vulkan SDK**:
Download from [vulkan.lunarg.com/sdk/home](https://vulkan.lunarg.com/sdk/home)

**Vulkan Runtime Only**:
The runtime is included in the SDK installation.

**Note**: Regular users should NOT need to manually install Vulkan. If updating drivers doesn't work, your GPU may not support Vulkan.

**Check Vulkan Support**:
Run \`vulkaninfo\` from command line after installing SDK to verify Vulkan is working.`
      }
    ],
    relatedDlls: ['vulkan-1.dll'],
    keywords: ['vulkan-1.dll missing', 'vulkan error', 'vulkan not found', 'update vulkan', 'vulkan runtime']
  }
];

// 获取所有指南
export const getAllGuides = (): Guide[] => {
  return guidesDatabase;
};

// 根据 slug 获取指南
export const getGuideBySlug = (slug: string): Guide | undefined => {
  return guidesDatabase.find(g => g.slug === slug);
};

// 获取所有 slugs (用于静态生成)
export const getAllGuideSlugs = (): string[] => {
  return guidesDatabase.map(g => g.slug);
};

// 根据分类获取指南
export const getGuidesByCategory = (category: Guide['category']): Guide[] => {
  return guidesDatabase.filter(g => g.category === category);
};

// 获取相关指南
export const getRelatedGuides = (currentSlug: string, limit: number = 3): Guide[] => {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];
  
  return guidesDatabase
    .filter(g => g.slug !== currentSlug && g.category === current.category)
    .slice(0, limit);
};
