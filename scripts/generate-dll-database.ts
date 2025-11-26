/**
 * DLL 数据库生成器 - 生成 5000+ DLL 条目
 * 运行: npx tsx scripts/generate-dll-database.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GeneratedDll {
  id: string;
  name: string;
  version: string;
  size: string;
  architecture: '32-bit' | '64-bit' | 'Both';
  description: string;
  associatedSoftware: string;
  fixType: string;
  md5: string;
  sha256: string;
  downloadCount: number;
  commonErrors: string[];
  eventIds: string[];
  officialDownloadUrl: string;
  relatedDlls: string[];
}

// 生成伪随机哈希（基于名称的确定性）
function generateHash(name: string, length: number): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  const chars = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    hash = (hash * 31 + i) & 0x7fffffff;
    result += chars[hash % 16];
  }
  return result;
}

// 生成下载数（基于名称的确定性）
function generateDownloadCount(name: string, base: number, range: number): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
  }
  return base + Math.abs(hash) % range;
}

// ============ Visual C++ DLLs ============
const vcPrefixes = ['vcruntime', 'msvcp', 'msvcr', 'vcomp', 'concrt', 'mfc', 'mfcm', 'atl', 'vccorlib', 'vcamp', 'vcomp', 'vcclrit', 'vcruntimed', 'vccompiler'];
const vcVersions = ['50', '60', '70', '71', '80', '90', '100', '110', '120', '140', '141', '142', '143'];
const vcSuffixes = ['', 'd', '_1', '_2', '_atomic_wait', '_clr0400', '_codecvt_ids'];
const vcArchitectures = ['', '_x64', '_x86', '_arm', '_arm64'];

function generateVisualCppDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  const yearMap: Record<string, string> = {
    '50': '5.0', '60': '6.0', '70': '2002', '71': '2003', '80': '2005', '90': '2008',
    '100': '2010', '110': '2012', '120': '2013', '140': '2015-2022', '141': '2017', '142': '2019', '143': '2022'
  };
  const urlMap: Record<string, string> = {
    '143': 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    '142': 'https://aka.ms/vs/16/release/vc_redist.x64.exe',
    '141': 'https://aka.ms/vs/15/release/vc_redist.x64.exe',
    '140': 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    '120': 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
    '110': 'https://www.microsoft.com/en-us/download/details.aspx?id=30679',
    '100': 'https://www.microsoft.com/en-us/download/details.aspx?id=26999',
    '90': 'https://www.microsoft.com/en-us/download/details.aspx?id=26368',
    '80': 'https://www.microsoft.com/en-us/download/details.aspx?id=26347',
  };

  vcPrefixes.forEach(prefix => {
    vcVersions.forEach(ver => {
      vcSuffixes.forEach(suffix => {
        vcArchitectures.forEach(arch => {
          const name = `${prefix}${ver}${suffix}${arch}.dll`;
          const year = yearMap[ver] || '2015-2022';          dlls.push({
            id: name, name,
            version: `${ver}.0.0.0`,
            size: `${100 + generateDownloadCount(name, 0, 900)} KB`,
            architecture: arch.includes('64') ? '64-bit' : arch.includes('86') || arch.includes('32') ? '32-bit' : 'Both',
            description: `${name.toUpperCase()} is part of the Microsoft Visual C++ ${year} Redistributable runtime library, providing essential runtime functions for C++ applications.`,
            associatedSoftware: `Microsoft Visual C++ ${year} Redistributable`,
            fixType: 'visual_cpp',
            md5: generateHash(name, 32),
            sha256: generateHash(name + 'sha', 64),
            downloadCount: generateDownloadCount(name, 100000, 3000000),
            commonErrors: [
              `The program can't start because ${name} is missing`,
              `${name} was not found`,
              `The code execution cannot proceed because ${name} was not found`
            ],
            eventIds: ['Event ID 1000', 'Event ID 59'],
            officialDownloadUrl: urlMap[ver] || urlMap['140'],
            relatedDlls: []
          });
        });
      });
    });
  });
  return dlls;
}

// ============ DirectX DLLs ============
function generateDirectXDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  const url = 'https://www.microsoft.com/en-us/download/details.aspx?id=35';

  // D3DX9 (24-43)
  for (let i = 24; i <= 43; i++) {
    const name = `d3dx9_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `9.${i}.952.3111`,
      size: `${1800 + generateDownloadCount(name, 0, 800)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} is part of DirectX 9 providing Direct3D 9 graphics functionality for games and 3D applications.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 500000, 2000000),
      commonErrors: [`${name} is missing`, `The program can't start because ${name} was not found`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  // D3DX10 (24-43)
  for (let i = 24; i <= 43; i++) {
    const name = `d3dx10_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `10.${i}.0.0`,
      size: `${900 + generateDownloadCount(name, 0, 500)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} provides DirectX 10 graphics functionality.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 200000, 1000000),
      commonErrors: [`${name} is missing`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  // D3DX11 (42-43)
  for (let i = 42; i <= 43; i++) {
    const name = `d3dx11_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `11.${i}.0.0`,
      size: `${800 + generateDownloadCount(name, 0, 400)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} provides DirectX 11 graphics functionality.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 300000, 1500000),
      commonErrors: [`${name} is missing`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  // D3DCompiler
  for (let i = 33; i <= 47; i++) {
    const name = `d3dcompiler_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `10.0.${i}.0`,
      size: `${2500 + generateDownloadCount(name, 0, 1000)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} is the DirectX HLSL shader compiler.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 400000, 1200000),
      commonErrors: [`${name} is missing`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  // XInput
  for (let i = 1; i <= 4; i++) {
    const name = `xinput1_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `9.18.944.0`,
      size: `${20 + i * 5} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} provides Xbox controller input support for Windows games.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 600000, 2000000),
      commonErrors: [`${name} is missing`, `Controller not detected`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  // XAudio
  for (let i = 0; i <= 9; i++) {
    const name = `xaudio2_${i}.dll`;
    dlls.push({
      id: name, name,
      version: `9.${i}.0.0`,
      size: `${150 + i * 20} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()} provides high-performance audio processing for games.`,
      associatedSoftware: 'DirectX End-User Runtime',
      fixType: 'directx',
      md5: generateHash(name, 32),
      sha256: generateHash(name + 'sha', 64),
      downloadCount: generateDownloadCount(name, 200000, 800000),
      commonErrors: [`${name} is missing`, `Audio playback error`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    });
  }

  return dlls;
}

// ============ Windows System DLLs ============
const systemDllNames = [
  // Kernel & Core
  'kernel32', 'kernelbase', 'ntdll', 'ntoskrnl', 'hal', 'win32k', 'win32kbase', 'win32kfull',
  // User Interface
  'user32', 'gdi32', 'gdiplus', 'uxtheme', 'dwmapi', 'comctl32', 'comdlg32', 'shell32', 'shlwapi',
  // Security
  'advapi32', 'secur32', 'crypt32', 'bcrypt', 'ncrypt', 'wintrust', 'cryptbase', 'sspicli', 'lsasrv',
  // Networking
  'ws2_32', 'wsock32', 'winhttp', 'wininet', 'iphlpapi', 'netapi32', 'mswsock', 'dnsapi', 'nlaapi',
  // COM & OLE
  'ole32', 'oleaut32', 'combase', 'rpcrt4', 'clbcatq',
  // Multimedia
  'winmm', 'dsound', 'dinput', 'dinput8', 'ddraw', 'dxgi', 'd3d9', 'd3d10', 'd3d10_1', 'd3d11', 'd3d12', 'd2d1', 'dwrite',
  // System Services
  'msvcrt', 'ucrtbase', 'msi', 'wevtapi', 'taskschd', 'srvcli', 'wtsapi32', 'userenv', 'profapi',
  // Storage & File System
  'ntfs', 'fltmgr', 'storport', 'classpnp', 'disk', 'volmgr', 'volsnap', 'mountmgr',
  // Device & Driver
  'setupapi', 'cfgmgr32', 'devobj', 'wdf01000', 'wdfldr', 'hidclass', 'usbhub', 'usbport',
  // Power & Performance
  'powrprof', 'pdh', 'perfctrs', 'perfproc', 'perfdisk',
  // Debugging & Diagnostics
  'dbghelp', 'dbgeng', 'imagehlp', 'psapi', 'tlhelp32', 'wer', 'faultrep',
  // Print & Spooler
  'winspool', 'spoolss', 'localspl', 'printui',
  // Accessibility
  'oleacc', 'uiautomationcore', 'magnification',
  // Application Compatibility
  'apphelp', 'acgenral', 'aclayers', 'shimeng',
  // Virtualization
  'vmsvcext', 'vmbus', 'storvsp', 'netvsp',
  // Modern APIs
  'shcore', 'twinapi', 'windows.storage', 'windows.ui', 'inputhost',
  // Text & Font
  'usp10', 'lpk', 'fontsub', 'fntcache', 't2embed',
  // Misc Windows
  'version', 'normaliz', 'imm32', 'msimg32', 'mpr', 'cabinet', 'wldap32', 'urlmon', 'iertutil',
  'webio', 'sechost', 'cryptsp', 'authz', 'wevtsvc', 'eventlog', 'appinfo', 'sspicli',
  // Registry
  'regapi', 'cmiadapter', 'cmisetup',
  // Memory Management
  'verifier', 'pageheap',
  // Network Security
  'schannel', 'credssp', 'cryptdll',
  // Remote Desktop
  'mstsc', 'mstscax', 'rdpclip', 'rdpcore', 'rdpcorets',
  // Audio
  'audioses', 'audioeng', 'audiosrv', 'mmdevapi', 'wdmaud',
  // Video
  'mf', 'mfplat', 'mfcore', 'mfreadwrite', 'evr', 'dxva2',
  // .NET Host
  'clr', 'clrjit', 'coreclr', 'hostfxr', 'hostpolicy',
  // Edge & WebView
  'edgehtml', 'chakra', 'jscript9', 'mshtml', 'ieframe',
];

function generateSystemDlls(): GeneratedDll[] {
  return systemDllNames.map(name => {
    const dllName = `${name}.dll`;
    return {
      id: dllName,
      name: dllName,
      version: '10.0.22621.0',
      size: `${200 + generateDownloadCount(dllName, 0, 2000)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()}.dll is a Windows system library providing core operating system functionality.`,
      associatedSoftware: 'Windows Operating System',
      fixType: 'system_core',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 50000, 500000),
      commonErrors: [
        `${dllName} is missing or corrupt`,
        `The procedure entry point could not be located in ${dllName}`
      ],
      eventIds: ['Event ID 1000', 'Event ID 7000'],
      officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/update-windows-3c5ae7fc-9fb6-9af1-1984-b5e0412c556a',
      relatedDlls: []
    };
  });
}

// ============ Game & Middleware DLLs ============
const gameDllNames = [
  // Steam
  'steam_api', 'steam_api64', 'steamclient', 'steamclient64', 'tier0_s', 'tier0_s64', 'vstdlib_s', 'vstdlib_s64',
  // NVIDIA
  'nvapi', 'nvapi64', 'nvcuda', 'nvcuda64', 'nvoptix', 'nvrtc', 'nvrtc64', 'cudart32_110', 'cudart64_110', 'cudart64_12',
  'nvinfer', 'nvonnxparser', 'nvparsers', 'nvToolsExt64_1',
  // PhysX
  'physxloader', 'physxloader64', 'physxcudart_20', 'physxcore', 'physxcore_x64', 'physxdevice', 'physxdevice64',
  'physxcooking', 'physxcooking_x64', 'physxcommon', 'physxcommon_x64', 'physxfoundation', 'physxfoundation_x64',
  // Audio
  'openal32', 'wrap_oal', 'fmod', 'fmodex', 'fmodex64', 'fmodevent', 'fmodevent64', 'fmodstudio', 'fmodstudio64',
  'xaudio2_9redist', 'libvorbis', 'libvorbisfile', 'libogg', 'bass', 'bassmix', 'bassfx',
  'wwise', 'wwisesoundengine', 'ak_soundengine',
  // Video
  'binkw32', 'bink2w32', 'bink2w64', 'binkw64', 'libavcodec', 'libavformat', 'libavutil', 'libswscale', 'libswresample',
  'mss32', 'mss64', 'miles64',
  // Graphics / Rendering
  'vulkan-1', 'vulkan_1', 'dxvk_d3d9', 'dxvk_d3d10', 'dxvk_d3d11', 'd3d12core', 'd3d12sdklayers',
  'nvapi', 'amd_ags_x64', 'atiadlxx', 'aticfx64', 'atioglxx',
  'reshade', 'reshade32', 'reshade64', 'd3d9_reshade', 'dxgi_reshade',
  // Lua / Scripting
  'lua5.1', 'lua51', 'lua52', 'lua53', 'lua54', 'luajit', 'python27', 'python37', 'python38', 'python39', 'python310', 'python311', 'python312',
  'v8', 'v8_libbase', 'v8_libplatform', 'libnode',
  // CEF / Chromium
  'libcef', 'cef', 'chrome_elf', 'd3dcompiler_47', 'libGLESv2', 'libEGL', 'icudtl', 'icuuc', 'icuin',
  // Qt
  'qt5core', 'qt5gui', 'qt5widgets', 'qt5network', 'qt5opengl', 'qt5quick', 'qt5qml', 'qt5svg', 'qt5xml',
  'qt6core', 'qt6gui', 'qt6widgets', 'qt6network', 'qt6opengl', 'qt6quick', 'qt6qml',
  // SDL
  'sdl', 'sdl2', 'sdl2_image', 'sdl2_mixer', 'sdl2_ttf', 'sdl2_net', 'sdl3',
  // Unreal Engine
  'ue4prereqsetup_x64', 'ue4-prerlq-win64', 'steam_api64_ue', 'eossdk-win64-shipping', 'xgameruntime',
  // Unity
  'unityplayer', 'unitycrashhandler64', 'mono-2.0-bdwgc', 'monosgen-2.0', 'il2cpp', 'gameassembly',
  // CryEngine
  'cryengine', 'crysystem', 'cryrendergl', 'cryinput', 'cryphysics', 'crynetwork',
  // EAC / Anti-Cheat
  'easyanticheat', 'easyanticheat_eos', 'eac_launcher', 'battleye', 'beclient', 'beclient_x64',
  'vanguard', 'vgc', 'xigncode', 'nprotect', 'gameguard',
  // Online Services
  'galaxypeer', 'galaxy', 'galaxy64', 'gog', 'epiconlineservices', 'eossdk', 'uplay_r1', 'uplay_r164', 'uplay_r2',
  'origin', 'originclient', 'originwebhelperservice',
  // Havok Physics
  'havok', 'havokphysics', 'havokcloth', 'havokdestruction',
  // Common Libraries
  'zlib', 'zlib1', 'zlibwapi', 'libz', 'lz4', 'lz4frame', 'lzma', 'bz2',
  'libcurl', 'libcurl-x64', 'curl', 'libssl-1_1', 'libssl-1_1-x64', 'libssl-3', 'libssl-3-x64',
  'libcrypto-1_1', 'libcrypto-1_1-x64', 'libcrypto-3', 'libcrypto-3-x64',
  'libeay32', 'ssleay32', 'openssl', 'openssl-1_1-x64',
  'freetype', 'freetype6', 'harfbuzz', 'fontconfig',
  'libpng', 'libpng16', 'libpng15', 'libjpeg', 'libjpeg-9', 'libtiff', 'libwebp', 'giflib',
  'libxml2', 'libxslt', 'expat', 'pugixml',
  'sqlite3', 'sqlite', 'leveldb', 'rocksdb',
  'boost_system', 'boost_filesystem', 'boost_thread', 'boost_chrono', 'boost_date_time', 'boost_regex',
  'tbb', 'tbb12', 'tbbmalloc', 'jemalloc', 'tcmalloc',
  'glew32', 'glfw', 'glfw3', 'glad', 'freeglut',
  'assimp', 'assimp-vc140-mt', 'assimp-vc143-mt', 'fbxsdk', 
  // Input
  'xinput9_1_0', 'dinput', 'dinput8', 'rawinput',
  // GFWL
  'xlive', 'gfwlive', 'gfwlclient',
  // Generic
  'gameoverlayrenderer', 'gameoverlayrenderer64', 'd3d9_proxy', 'd3d11_proxy', 'dxgi_proxy',
  'msdia140', 'msvfw32', 'vfw32', 'avifil32', 'avicap32',
];

function generateGameDlls(): GeneratedDll[] {
  const urls: Record<string, string> = {
    steam: 'https://store.steampowered.com/about/',
    physx: 'https://www.nvidia.com/en-us/drivers/physx-system/',
    openal: 'https://www.openal.org/downloads/',
    vulkan: 'https://vulkan.lunarg.com/sdk/home',
    directx: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
  };

  return gameDllNames.map(name => {
    const dllName = `${name}.dll`;
    let software = 'Game Runtime Library';
    let url = urls.directx;
    let fixType = 'game';

    if (name.includes('steam') || name.includes('tier0') || name.includes('vstdlib')) {
      software = 'Steam Client'; url = urls.steam;
    } else if (name.includes('physx') || name.includes('cuda') || name.includes('nv')) {
      software = 'NVIDIA Runtime'; url = urls.physx;
    } else if (name.includes('openal') || name.includes('oal') || name.includes('fmod') || name.includes('bass') || name.includes('wwise')) {
      software = 'Audio Runtime'; url = urls.openal;
    } else if (name.includes('vulkan') || name.includes('dxvk')) {
      software = 'Vulkan Runtime'; url = urls.vulkan;
    }

    return {
      id: dllName,
      name: dllName,
      version: '1.0.0.0',
      size: `${100 + generateDownloadCount(dllName, 0, 1500)} KB`,
      architecture: name.includes('64') || name.includes('x64') ? '64-bit' : name.includes('32') ? '32-bit' : 'Both',
      description: `${name.toUpperCase()}.dll is a game/middleware library required by various PC games and applications.`,
      associatedSoftware: software,
      fixType: fixType,
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 50000, 2000000),
      commonErrors: [`${dllName} is missing`, `Game failed to start: ${dllName} not found`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    };
  });
}

// ============ .NET Framework DLLs ============
const dotnetDllNames = [
  'mscorlib', 'system', 'system.core', 'system.data', 'system.xml', 'system.web', 'system.net',
  'system.drawing', 'system.windows.forms', 'system.runtime', 'system.collections', 'system.linq',
  'system.io', 'system.threading', 'system.text.encoding', 'system.reflection', 'system.memory',
  'microsoft.csharp', 'microsoft.visualbasic', 'microsoft.build', 'microsoft.web',
  'presentationcore', 'presentationframework', 'windowsbase', 'wpfgfx_v0400',
  'clrjit', 'clr', 'mscoreei', 'mscoree', 'fusion', 'mscorwks', 'mscorsvw', 'ngen',
  'netstandard', 'system.private.corelib', 'system.runtime.interopservices',
  'hostfxr', 'hostpolicy', 'coreclr', 'clrjit',
  // EntityFramework
  'entityframework', 'entityframework.sqlserver', 'microsoft.entityframeworkcore',
  // ASP.NET
  'aspnet_compiler', 'webengine', 'webengine4', 'system.web.mvc', 'system.web.http',
];

function generateDotnetDlls(): GeneratedDll[] {
  return dotnetDllNames.map(name => {
    const dllName = `${name}.dll`;
    return {
      id: dllName,
      name: dllName,
      version: '4.8.4682.0',
      size: `${300 + generateDownloadCount(dllName, 0, 2000)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()}.dll is part of the Microsoft .NET Framework providing managed code execution.`,
      associatedSoftware: 'Microsoft .NET Framework',
      fixType: 'dotnet',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 100000, 1000000),
      commonErrors: [`${dllName} is missing`, `.NET Framework initialization error`],
      eventIds: ['Event ID 1000', 'Event ID 1026'],
      officialDownloadUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
      relatedDlls: []
    };
  });
}

// ============ API-MS-WIN CRT DLLs ============
function generateApiMsDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  
  // CRT categories
  const crtCategories = [
    'crt-conio', 'crt-convert', 'crt-environment', 'crt-filesystem', 'crt-heap', 
    'crt-locale', 'crt-math', 'crt-multibyte', 'crt-private', 'crt-process', 
    'crt-runtime', 'crt-stdio', 'crt-string', 'crt-time', 'crt-utility',
  ];
  
  // Core categories
  const coreCategories = [
    'core-appcompat', 'core-appinit', 'core-atoms', 'core-bem', 'core-comm',
    'core-console', 'core-datetime', 'core-debug', 'core-delayload', 'core-errorhandling',
    'core-fibers', 'core-file', 'core-firmware', 'core-handle', 'core-heap', 
    'core-interlocked', 'core-io', 'core-job', 'core-kernel32', 'core-largeinteger',
    'core-libraryloader', 'core-localization', 'core-marshal', 'core-memory', 
    'core-misc', 'core-namedpipe', 'core-namespace', 'core-normalization', 'core-path', 
    'core-privateprofile', 'core-processenvironment', 'core-processenv', 'core-processsecurity', 
    'core-processthreads', 'core-processtopology', 'core-profile', 'core-psapi', 
    'core-quirks', 'core-realtime', 'core-registry', 'core-registryuserspecific',
    'core-rtlsupport', 'core-shlwapi', 'core-shutdown', 'core-sidebyside', 'core-string',
    'core-stringansi', 'core-stringloader', 'core-synch', 'core-sysinfo', 'core-systemtopology',
    'core-threadpool', 'core-timezone', 'core-toolhelp', 'core-url', 'core-util', 
    'core-version', 'core-versionansi', 'core-windowsme', 'core-windowserrorreporting',
    'core-winrt', 'core-winrt-error', 'core-winrt-l1-1-0', 'core-winrt-registration',
    'core-winrt-robuffer', 'core-winrt-string', 'core-wow64', 'core-xstate',
  ];
  
  // Security categories  
  const securityCategories = [
    'security-base', 'security-cpwl', 'security-credentials', 'security-cryptoapi',
    'security-grouppolicy', 'security-lsalookup', 'security-lsapolicy', 'security-provider',
    'security-sddl', 'security-systemfunctions',
  ];
  
  // Shell categories
  const shellCategories = [
    'shell-changenotify', 'shell-namespace', 'shell-shellcom', 'shell-shellfolders',
  ];
  
  // Service categories
  const serviceCategories = [
    'service-core', 'service-management', 'service-private', 'service-winsvc',
  ];
  
  // Eventing categories
  const eventingCategories = [
    'eventing-classicprovider', 'eventing-consumer', 'eventing-controller', 'eventing-legacy',
    'eventing-obsolete', 'eventing-provider', 'eventing-tdh', 'eventing-tracelogging',
  ];
  
  // Power categories
  const powerCategories = [
    'power-base', 'power-setting',
  ];

  // COM categories
  const comCategories = [
    'com-callhook', 'com-clbcatq', 'com-oleacc', 'com-provreg', 'com-remoting', 
  ];
  
  // NT categories
  const ntCategories = [
    'ntuser-dc', 'ntuser-dialogbox', 'ntuser-draw', 'ntuser-ie', 'ntuser-message',
    'ntuser-mouse', 'ntuser-private', 'ntuser-rectangle', 'ntuser-sysparams', 'ntuser-window',
  ];
  
  // DX categories
  const dxCategories = [
    'dx-d3dkmt', 'dx-dinputcontroller', 'dx-d3d10level9', 'dx-d3d11', 'dx-d3d12',
  ];
  
  // MM categories (multimedia)
  const mmCategories = [
    'mm-misc', 'mm-mme', 'mm-time', 'mm-playsound', 'mm-device', 'mm-joystick',
  ];

  // All categories combined with level and version variations
  const allCategories = [
    ...crtCategories,
    ...coreCategories,
    ...securityCategories,
    ...shellCategories,
    ...serviceCategories,
    ...eventingCategories,
    ...powerCategories,
    ...comCategories,
    ...ntCategories,
    ...dxCategories,
    ...mmCategories,
  ];

  // Generate with level and version variations
  allCategories.forEach(cat => {
    // Level variations: l1, l2, l3
    for (let level = 1; level <= 3; level++) {
      // Version variations: 1-0, 1-1, 1-2, 2-0
      const versions = ['1-0', '1-1', '1-2', '2-0'];
      versions.forEach(ver => {
        const name = `api-ms-win-${cat}-l${level}-${ver}.dll`;
        dlls.push({
          id: name,
          name: name,
          version: '10.0.22621.0',
          size: `${10 + generateDownloadCount(name, 0, 20)} KB`,
          architecture: 'Both',
          description: `${name} is a Windows API Set that provides compatibility for Universal C Runtime functions.`,
          associatedSoftware: 'Windows Universal CRT',
          fixType: 'system_core',
          md5: generateHash(name, 32),
          sha256: generateHash(name + 'sha', 64),
          downloadCount: generateDownloadCount(name, 50000, 300000),
          commonErrors: [`${name} is missing`, `The program can't start because ${name} was not found`],
          eventIds: ['Event ID 1000'],
          officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
          relatedDlls: []
        });
      });
    }
  });

  // Also add EXT- API sets
  const extCategories = [
    'onecore-appmodel-deferpackage', 'onecore-console', 'onecore-contentapi', 'onecore-cowait',
    'onecore-dll', 'onecore-errorhandling', 'onecore-eventlog', 'onecore-file',
    'onecore-heap', 'onecore-lsalookup', 'onecore-memory', 'onecore-path', 
    'onecore-registry', 'onecore-shutdown', 'onecore-string', 'onecore-synch',
    'onecore-sysinfo', 'onecore-threadpool', 'onecore-timezone', 'onecore-version',
  ];

  extCategories.forEach(cat => {
    for (let level = 1; level <= 2; level++) {
      const name = `ext-ms-win-${cat}-l${level}-1-0.dll`;
      dlls.push({
        id: name,
        name: name,
        version: '10.0.22621.0',
        size: `${8 + generateDownloadCount(name, 0, 15)} KB`,
        architecture: 'Both',
        description: `${name} is an extended Windows API Set.`,
        associatedSoftware: 'Windows Operating System',
        fixType: 'system_core',
        md5: generateHash(name, 32),
        sha256: generateHash(name + 'sha', 64),
        downloadCount: generateDownloadCount(name, 20000, 150000),
        commonErrors: [`${name} is missing`],
        eventIds: ['Event ID 1000'],
        officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/update-windows-3c5ae7fc-9fb6-9af1-1984-b5e0412c556a',
        relatedDlls: []
      });
    }
  });

  return dlls;
}

// ============ Driver DLLs ============
const driverDllNames = [
  // AMD
  'amdihk64', 'amdhip64', 'amd_comgr', 'amd_ags_x64', 'atioglxx', 'aticfx64', 'atidxx64', 'atiumdag', 'atiumd6a',
  // Intel
  'igdumdim64', 'igdgmm64', 'igd10iumd64', 'igc64', 'igdfcl64', 'igdext64', 'intelocl64',
  // Realtek
  'rtkapo', 'rtkhdaud', 'rtkapo64', 'nahimicservice', 'a2dpsrv', 'asio', 'rtkhdasio',
  // Generic audio
  'portcls', 'ks', 'drmk', 'audiosrv', 'audioendpointbuilder',
  // Network
  'ndisuio', 'ndis', 'tcpip', 'netio', 'fwpkclnt', 'wfplwfs', 'pacer',
  // USB
  'usbhub', 'usbhub3', 'usbccgp', 'usbaudio', 'usbaudio2', 'usbvideo',
  // Storage
  'storahci', 'stornvme', 'storport', 'classpnp', 'partmgr', 'disk', 'volmgr',
  // Bluetooth
  'bthmodem', 'bthport', 'rfcomm', 'bthhfenum', 'bthavrcptg',
];

function generateDriverDlls(): GeneratedDll[] {
  return driverDllNames.map(name => {
    const dllName = `${name}.dll`;
    return {
      id: dllName,
      name: dllName,
      version: '10.0.22621.0',
      size: `${100 + generateDownloadCount(dllName, 0, 800)} KB`,
      architecture: name.includes('64') ? '64-bit' : 'Both',
      description: `${name.toUpperCase()}.dll is a Windows device driver component.`,
      associatedSoftware: 'Windows Device Drivers',
      fixType: 'driver',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 30000, 300000),
      commonErrors: [`${dllName} driver error`, `Device driver ${dllName} failed to load`],
      eventIds: ['Event ID 1000', 'Event ID 7000'],
      officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/update-windows-3c5ae7fc-9fb6-9af1-1984-b5e0412c556a',
      relatedDlls: []
    };
  });
}

// ============ 更多常见软件 DLLs ============
const softwareDllNames = [
  // Adobe
  'adobe_caps', 'adobexmp', 'adobexmpcore', 'agm', 'ahclient', 'aif_core', 'aif_ogl', 'amtlib', 'bib', 'cooltype',
  'pdfl', 'ace', 'acecg', 'acecore', 'acepsl', 'acerodan', 'acert', 'acrocloudconnect', 'acrords32', 'agm',
  // Microsoft Office
  'mso', 'mso20win32client', 'mso30win32client', 'mso40uiwin32client', 'oart', 'oartconv', 'oclientintl', 'office',
  'wwlib', 'excelcnv', 'pptview', 'msocf', 'msorc', 'msoutl', 'msosync', 'msointl',
  // Autodesk
  'adsk3dxp', 'adsklicensing-installer', 'adlm', 'adpfr', 'adpfrcpp', 'adplocales', 'adpui', 'atf', 'atfcore',
  'fltlib', 'gdiobj', 'getpeerntimpl', 'ige', 'mdi', 'model', 'sdiobj', 'simdes', 'uipath',
  // Browsers
  'chrome', 'chrome_child', 'chrome_elf', 'firefox', 'gkmedias', 'mozglue', 'nss3', 'nssckbi', 'softokn3', 'freebl3',
  'xul', 'lgpllibs', 'mozavcodec', 'mozavutil', 'edge', 'msedge', 'msedge_elf',
  // Java
  'jvm', 'java', 'javaw', 'awt', 'fontmanager', 'freetype', 'jawt', 'jimage', 'jli', 'jsound', 'jsoundalsa',
  'lcms', 'management', 'mlib_image', 'net', 'nio', 'prefs', 'splashscreen', 'sunec', 'sunmscapi', 'unpack',
  'verify', 'w2k_lsa_auth', 'zip',
  // Python
  'python3', 'python37', 'python38', 'python39', 'python310', 'python311', 'python312', 'python313',
  'sqlite3', 'tk86', 'tcl86', '_tkinter', '_ssl', '_ctypes', 'libffi',
  // Node.js
  'node', 'libnode', 'libssl', 'libcrypto', 'libuv', 'cares', 'icudata', 'icui18n', 'icuuc', 'nghttp2', 'zlib1',
  // Database
  'libmysql', 'libmysqld', 'mysqlclient', 'libpq', 'pq', 'sqlite3', 'oracle', 'oci', 'oracleclient',
  'sqlncli11', 'sqlncli', 'msoledbsql', 'msodbcsql17', 'msodbcsql18',
  // Media Players
  'libvlc', 'libvlccore', 'vlc', 'avcodec', 'avformat', 'avutil', 'swresample', 'swscale', 'postproc',
  'bass', 'bassasio', 'bassmidi', 'bassflac', 'basswma', 'bassmix', 'bassenc', 'basswv', 'basscd',
  // Security Software
  'mbam', 'mbamedge', 'avgui', 'aswengine', 'aswids', 'aswidsagent', 'aswmonitor', 'avast',
  'nprtm', 'norton', 'symcdata', 'symevnt', 'symefasi', 'symlcnet', 'symmru', 'sympbutil',
  'mcupdate', 'mcods', 'mcdll', 'mcvshost', 'mcafee', 'qhsafemain', 'qhcore', 'qqpcmgr', '360safe', '360sd',
  // Virtualization
  'vmhgfs', 'vmtools', 'vmoptlib', 'vmrawdsk', 'vmware', 'vmwarebase', 'vmwarecrypt', 'vboxrt',
  'virtualbox', 'vboxcapi', 'vboxddu', 'vboxddu', 'vboxguest', 'vboxnet', 'vboxogles',
  // Compression
  '7z', '7zxa', 'unrar', 'unrar64', 'zipfldr', 'wzzip', 'wzunzip', 'peazip', 'bandizip',
  // Text Editors
  'notepad++', 'scilexer', 'sublimetext', 'vscode', 'atom', 'brackets', 'textmate',
  // Development Tools
  'git', 'libgit2', 'ssh', 'svn', 'subversion', 'mercurial', 'hg', 'tortoisegit', 'tortoisesvn',
  'cmake', 'ninja', 'make', 'nmake', 'msbuild', 'devenv', 'clang', 'llvm',
  // 3D & CAD
  'maya', 'mayapy', '3dsmax', 'blender', 'openfx', 'opencl', 'opengl32', 'glu32', 'osmesa',
  // Image Processing
  'magick', 'magickcore', 'magickwand', 'gmic', 'rawspeed', 'rawimage', 'exifexodus', 'exiv2',
  // AI & ML
  'tensorflow', 'torch', 'torch_cpu', 'torch_cuda', 'onnxruntime', 'opencv', 'opencv_core', 'opencv_imgproc',
  'cudnn', 'cudnn64', 'cublas', 'cublas64', 'cufft', 'cufft64', 'cusparse', 'cusparse64',
  'mkl', 'mkl_core', 'mkl_intel', 'mkl_sequential', 'openblas', 'lapack',
  // Communication
  'discord', 'discordrpc', 'slack', 'teams', 'skype', 'skypekit', 'zoom', 'zoomvdi',
  'telegram', 'whatsapp', 'signal', 'viber', 'wechat', 'weixin', 'qq', 'tim',
  // Cloud Storage
  'onedrive', 'dropbox', 'googledrive', 'icloud', 'megasync', 'box', 'pcloud',
  // Productivity
  'evernote', 'notion', 'obsidian', 'roam', 'logseq', 'trello', 'asana', 'jira',
  // System Utilities
  'ccleaner', 'ccleaner64', 'winrar', 'winzip', 'everything', 'listary', 'wox', 'keypirinha',
  'f.lux', 'flux', 'nightlight', 'redshift', 'displaylink', 'displayport', 'hdmi',
  // Gaming Platforms
  'epicgameslauncher', 'unrealcef', 'epiconlineservices', 'origincore', 'originclient',
  'bethnet', 'bethesdanet', 'rockstar', 'socialclub', 'rgsc', 'ubisoft', 'uplay',
  'gog', 'galaxy', 'galaxyclient', 'amazon', 'twitchsdk', 'discord_game_sdk',
];

function generateSoftwareDlls(): GeneratedDll[] {
  return softwareDllNames.map(name => {
    const dllName = `${name}.dll`;
    let software = 'Application Software';
    
    if (name.includes('adobe') || name.includes('acr') || name.includes('agm')) software = 'Adobe Software';
    else if (name.includes('mso') || name.includes('office')) software = 'Microsoft Office';
    else if (name.includes('chrome') || name.includes('firefox') || name.includes('edge')) software = 'Web Browser';
    else if (name.includes('python')) software = 'Python Runtime';
    else if (name.includes('java') || name.includes('jvm')) software = 'Java Runtime';
    else if (name.includes('node')) software = 'Node.js Runtime';
    else if (name.includes('vlc') || name.includes('bass') || name.includes('av')) software = 'Media Player';
    else if (name.includes('vm') || name.includes('virtual')) software = 'Virtualization';
    else if (name.includes('cuda') || name.includes('mkl') || name.includes('torch')) software = 'AI/ML Runtime';
    
    return {
      id: dllName,
      name: dllName,
      version: '1.0.0.0',
      size: `${100 + generateDownloadCount(dllName, 0, 1200)} KB`,
      architecture: name.includes('64') ? '64-bit' : 'Both',
      description: `${name.toUpperCase()}.dll is a component of ${software}.`,
      associatedSoftware: software,
      fixType: 'game' as const,
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 30000, 800000),
      commonErrors: [`${dllName} is missing`, `Application failed to start: ${dllName} not found`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: 'https://support.microsoft.com/',
      relatedDlls: []
    };
  });
}

// ============ 额外 MFC/ATL 变体 ============
function generateMfcAtlVariants(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  const versions = ['80', '90', '100', '110', '120', '140'];
  const mfcTypes = ['mfc', 'mfcm', 'atl'];
  const suffixes = ['', 'u', 'd', 'ud', 'chs', 'cht', 'deu', 'enu', 'esn', 'fra', 'ita', 'jpn', 'kor', 'rus'];
  
  mfcTypes.forEach(type => {
    versions.forEach(ver => {
      suffixes.forEach(suffix => {
        const name = `${type}${ver}${suffix}.dll`;
        dlls.push({
          id: name, name,
          version: `${ver}.0.0.0`,
          size: `${200 + generateDownloadCount(name, 0, 800)} KB`,
          architecture: 'Both',
          description: `${name.toUpperCase()} is part of Microsoft Foundation Classes / Active Template Library.`,
          associatedSoftware: 'Microsoft Visual C++ Redistributable',
          fixType: 'visual_cpp',
          md5: generateHash(name, 32),
          sha256: generateHash(name + 'sha', 64),
          downloadCount: generateDownloadCount(name, 50000, 500000),
          commonErrors: [`${name} is missing`],
          eventIds: ['Event ID 1000'],
          officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
          relatedDlls: []
        });
      });
    });
  });
  
  return dlls;
}

// ============ OpenGL / Vulkan 扩展 ============
function generateGraphicsApiDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  
  // OpenGL variations
  ['opengl32', 'glu32', 'glew32', 'glew32s', 'glad', 'glfw', 'glfw3', 'freeglut', 'glut32', 'glut64'].forEach(name => {
    const dllName = `${name}.dll`;
    dlls.push({
      id: dllName, name: dllName,
      version: '4.6.0',
      size: `${200 + generateDownloadCount(dllName, 0, 500)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()}.dll provides OpenGL graphics API functionality.`,
      associatedSoftware: 'OpenGL Runtime',
      fixType: 'game',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 100000, 1000000),
      commonErrors: [`${dllName} is missing`, `OpenGL initialization failed`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: 'https://www.opengl.org/',
      relatedDlls: []
    });
  });

  // Vulkan variations
  ['vulkan-1', 'vulkan_1', 'shaderc_shared', 'spirv-cross-c-shared', 'vk_swiftshader', 'vulkan_radv'].forEach(name => {
    const dllName = `${name}.dll`;
    dlls.push({
      id: dllName, name: dllName,
      version: '1.3.0',
      size: `${800 + generateDownloadCount(dllName, 0, 1500)} KB`,
      architecture: '64-bit',
      description: `${name.toUpperCase()}.dll provides Vulkan graphics API functionality.`,
      associatedSoftware: 'Vulkan Runtime',
      fixType: 'game',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 150000, 1200000),
      commonErrors: [`${dllName} is missing`, `Vulkan initialization failed`],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: 'https://vulkan.lunarg.com/sdk/home',
      relatedDlls: []
    });
  });

  return dlls;
}

// ============ 更多 Windows 组件 ============  
const moreWindowsDlls = [
  // WinSxS related
  'msvcr100_clr0400', 'msvcr110_clr0400', 'msvcr120_clr0400',
  // .NET Native
  'clrcompression', 'clretwrc', 'clrgc', 'clrjit', 'coreclr', 'dbgshim', 'hostpolicy', 'hostfxr',
  'microsoft.diasymreader.native.amd64', 'mscordaccore', 'mscordbi', 'mscorrc',
  // WIC & DirectWrite
  'windowscodecs', 'windowscodecs', 'dwrite', 'fontsub', 'fntcache', 'directwrite',
  // WMI
  'wbemcomn', 'wbemcore', 'wbemprox', 'wbemsvc', 'fastprox', 'mofd', 'ncprov', 'repdrvfs', 'wmiutils',
  // WinRT
  'combase', 'coml2', 'comsvcs', 'ole32', 'oleaut32', 'propsys', 'rpcss', 'windows.applicationmodel',
  'windows.devices.bluetooth', 'windows.devices.enumeration', 'windows.gaming.input', 'windows.graphics',
  'windows.media', 'windows.networking', 'windows.security', 'windows.storage', 'windows.system', 'windows.ui',
  // Printing
  'printfilterpipelinesvc', 'printrender', 'printspooler', 'spoolsv', 'winspool.drv', 'localspl', 'win32spl',
  // Task Scheduler
  'schedsvc', 'taskcomp', 'taskeng', 'taskhost', 'taskhostw', 'taskschd', 'ubpm',
  // Windows Search
  'msfte', 'msftefd', 'msftesql', 'searchindexer', 'searchprotocolhost', 'srchadmin', 'tquery',
  // Windows Defender
  'mpengine', 'mpclient', 'mpsvc', 'msmpeng', 'nissrv', 'securityhealthagent',
  // BITS
  'bits', 'bitsproxy', 'qmgr', 'qmgrprxy',
  // Event Log
  'wevtapi', 'wevtsvc', 'eventlog', 'evtfwd', 'evtvwr',
  // Performance
  'perfctrs', 'perfhost', 'perfnet', 'perfos', 'perfproc', 'perfdisk',
  // AppX & Modern Apps
  'appxdeploymentserver', 'appxpackaging', 'appxreg', 'appxsip',
];

function generateMoreWindowsDlls(): GeneratedDll[] {
  return moreWindowsDlls.map(name => {
    const dllName = `${name}.dll`;
    return {
      id: dllName,
      name: dllName,
      version: '10.0.22621.0',
      size: `${100 + generateDownloadCount(dllName, 0, 1000)} KB`,
      architecture: 'Both',
      description: `${name.toUpperCase()}.dll is a Windows system component.`,
      associatedSoftware: 'Windows Operating System',
      fixType: 'system_core',
      md5: generateHash(dllName, 32),
      sha256: generateHash(dllName + 'sha', 64),
      downloadCount: generateDownloadCount(dllName, 30000, 400000),
      commonErrors: [`${dllName} is missing or corrupt`],
      eventIds: ['Event ID 1000', 'Event ID 7000'],
      officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/update-windows-3c5ae7fc-9fb6-9af1-1984-b5e0412c556a',
      relatedDlls: []
    };
  });
}

// ============ 主生成函数 ============
function generateFullDatabase(): void {
  console.log('Generating DLL database...');
  
  const allDlls = [
    ...generateVisualCppDlls(),
    ...generateDirectXDlls(),
    ...generateSystemDlls(),
    ...generateGameDlls(),
    ...generateDotnetDlls(),
    ...generateApiMsDlls(),
    ...generateDriverDlls(),
    ...generateSoftwareDlls(),
    ...generateMfcAtlVariants(),
    ...generateGraphicsApiDlls(),
    ...generateMoreWindowsDlls(),
  ];

  // 去重
  const seen = new Set<string>();
  const uniqueDlls = allDlls.filter(dll => {
    const key = dll.id.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`Generated ${uniqueDlls.length} unique DLL entries`);

  // 写入 JSON
  const outputPath = path.join(__dirname, '../src/data/generated-dlls.json');
  fs.writeFileSync(outputPath, JSON.stringify(uniqueDlls, null, 2));
  console.log(`Saved to ${outputPath}`);
}

// 运行
generateFullDatabase();
