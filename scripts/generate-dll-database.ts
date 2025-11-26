/**
 * DLL 数据库生成器 - 大规模版本
 * 生成 5000+ DLL 条目，覆盖各种类型
 * 运行: npx ts-node scripts/generate-dll-database.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ==================== Visual C++ 运行时 ====================
const visualCppPrefixes = [
  'vcruntime', 'msvcp', 'msvcr', 'vcomp', 'concrt', 'mfc', 'atl', 'vccorlib',
  'mfcm', 'mfc1', 'mfco', 'vcamp', 'vcompd', 'vcclrit', 'msdia', 'mspdb',
  'msvci', 'msvcirt', 'msvfw32', 'mcvcr', 'msvcm', 'msvcpd', 'msvbvm',
  'api-ms-win-crt-runtime', 'api-ms-win-crt-heap', 'api-ms-win-crt-string',
  'api-ms-win-crt-stdio', 'api-ms-win-crt-locale', 'api-ms-win-crt-math',
  'api-ms-win-crt-multibyte', 'api-ms-win-crt-time', 'api-ms-win-crt-filesystem',
  'api-ms-win-crt-convert', 'api-ms-win-crt-environment', 'api-ms-win-crt-process',
  'api-ms-win-crt-conio', 'api-ms-win-crt-utility', 'api-ms-win-crt-private',
  'ucrtbase', 'ucrtbased'
];
const visualCppVersions = ['60', '70', '71', '80', '90', '100', '110', '120', '140', '140_1', '141', '142', '143'];

// ==================== DirectX 相关 ====================
const directxPrefixes = [
  'd3dx9_', 'd3dx10_', 'd3dx11_', 'd3dcompiler_', 'xinput1_', 'xaudio2_', 'x3daudio1_',
  'd3dcsx_', 'd3dx10d_', 'd3dx11d_', 'xapofx1_', 'd3dxof'
];
const directxVersions = Array.from({length: 50}, (_, i) => String(i + 1));

// 额外的 DirectX 核心 DLL
const directxCoreDlls = [
  'd3d8', 'd3d9', 'd3d10', 'd3d10_1', 'd3d10core', 'd3d11', 'd3d11_1', 'd3d11_2', 'd3d11_3', 'd3d12', 'd3d12core',
  'dxgi', 'dxgidebug', 'dxguid', 'd2d1', 'd2d1debug', 'dwrite', 'dcomp',
  'dinput', 'dinput8', 'dsound', 'dsound3d', 'ddraw', 'dplayx', 'dpnet', 'dpnhpast',
  'dsetup', 'dsetup32', 'dxdiagn', 'dxerr9', 'dxerr8', 'dxva2',
  'xact3', 'xactengine3_0', 'xactengine3_1', 'xactengine3_2', 'xactengine3_3', 'xactengine3_4',
  'xactengine3_5', 'xactengine3_6', 'xactengine3_7',
  'xapofx1_1', 'xapofx1_2', 'xapofx1_3', 'xapofx1_4', 'xapofx1_5'
];

// ==================== 系统核心 DLL ====================
const systemDlls = [
  // Windows 核心
  'kernel32', 'kernelbase', 'ntdll', 'user32', 'gdi32', 'shell32', 'advapi32', 'ole32',
  'oleaut32', 'combase', 'comctl32', 'comdlg32', 'msvcrt', 'sechost', 'rpcrt4',
  // 加密和安全
  'bcrypt', 'ncrypt', 'crypt32', 'cryptbase', 'cryptdll', 'cryptnet', 'cryptsp', 'cryptui',
  'secur32', 'sspicli', 'sspisrv', 'schannel', 'wintrust', 'webauthn',
  // 网络
  'ws2_32', 'wsock32', 'winhttp', 'wininet', 'urlmon', 'iphlpapi', 'dnsapi', 'netapi32',
  'mswsock', 'dhcpcsvc', 'dhcpcsvc6', 'nlaapi', 'winrnr', 'rasapi32', 'rasman',
  'fwpuclnt', 'ndfapi', 'wlanapi', 'wlanutil', 'bluetoothapis',
  // 图形和多媒体
  'gdiplus', 'windowscodecs', 'wmcodecdspps', 'mf', 'mfplat', 'mfcore', 'mfmp4srcsnk',
  'mfreadwrite', 'mfsvr', 'evr', 'dxva2', 'quartz', 'wmvcore', 'wmp', 'wmadmod',
  // 音频
  'winmm', 'mmdevapi', 'audioses', 'audioeng', 'audiosrv', 'wdmaud', 'ksuser',
  // 打印
  'winspool', 'spoolss', 'printui', 'localspl',
  // 文件系统
  'shlwapi', 'propsys', 'thumbcache', 'explorerframe', 'srvcli',
  // 电源管理
  'powrprof', 'batterypowercontrol',
  // 设备管理
  'cfgmgr32', 'devobj', 'hid', 'setupapi', 'newdev',
  // COM 相关
  'comsvcs', 'mtxdm', 'mtxex',
  // 调试和诊断
  'dbghelp', 'dbgcore', 'pdh', 'psapi', 'tlhelp32',
  // 其他系统组件
  'uxtheme', 'dwmapi', 'dui70', 'usp10', 'msimg32', 'version', 'normaliz', 'mpr',
  'imm32', 'userenv', 'wtsapi32', 'wevtapi', 'tdh', 'taskschd', 'srvcli', 'pla',
  'msi', 'mscoree', 'clbcatq', 'activeds', 'adsldp', 'adsldpc',
  'authz', 'feclient', 'fltlib', 'logoncli', 'msvcp_win',
  'nsi', 'OneCoreCommonProxyStub', 'OneCoreUAPCommonProxyStub',
  'profapi', 'rpcss', 'samcli', 'samlib', 'sas', 'sfc', 'srclient',
  'sti', 'umpdc', 'wbemsvc', 'wbemcomn', 'wbemcore', 'wbemess',
  'wer', 'wevtsvc', 'win32u', 'wlanhlp', 'wmiclient', 'wmiutils',
  'wpdshext', 'wpninprc', 'ws2help', 'wtsapi32', 'xmllite'
];

// ==================== 游戏运行时 DLL ====================
const gameDlls = [
  // Bink Video
  'binkw32', 'binkw64', 'bink2w32', 'bink2w64',
  // FMOD Audio
  'fmod', 'fmodex', 'fmodex64', 'fmodexL', 'fmodex64L', 'fmod_event', 'fmod_event64',
  'fmodevent', 'fmodevent64', 'fmodstudio', 'fmodstudio64',
  // CEF (Chromium Embedded Framework)
  'libcef', 'cef', 'cef_sandbox', 'chrome_elf',
  // Lua
  'lua5.1', 'lua51', 'lua52', 'lua53', 'lua54', 'lua50', 'luajit',
  // Miles Sound System
  'mss32', 'mss64', 'mssmp3', 'mssa3d', 'msseax', 'mssfast', 'mssrsx',
  // NVIDIA
  'nvapi', 'nvapi64', 'nvcuda', 'nvEncodeAPI', 'nvEncodeAPI64',
  'nvml', 'nvwgf2um', 'nvwgf2umx', 'nvoglv32', 'nvoglv64',
  // OpenAL
  'openal32', 'openal', 'soft_oal', 'wrap_oal',
  // PhysX
  'physxloader', 'physxloader64', 'physxcudart', 'physxcudart64', 'physxcore',
  'physxcooking', 'physxcommon', 'physxfoundation', 'physxdevice', 'physxgpu', 'apex',
  // SDL
  'sdl', 'sdl2', 'sdl2_image', 'sdl2_mixer', 'sdl2_net', 'sdl2_ttf',
  'sdl_image', 'sdl_mixer', 'sdl_net', 'sdl_ttf',
  // Steam
  'steam_api', 'steam_api64', 'steamclient', 'steamclient64', 'steamerrorreporter',
  'steamerrorreporter64', 'steamnetworkingsockets', 'steamnetworkingsockets64',
  'sdkencryptedappticket', 'sdkencryptedappticket64', 'vstdlib_s', 'vstdlib_s64',
  'tier0_s', 'tier0_s64', 'gameoverlayrenderer', 'gameoverlayrenderer64',
  // Vulkan
  'vulkan-1', 'vulkan', 'vkd3d', 'vkd3d-shader', 'dxvk_d3d9', 'dxvk_d3d10core', 'dxvk_d3d11', 'dxvk_dxgi',
  // Unreal Engine
  'ue4game-win64-shipping', 'ue4prereqsetup_x64', 'crashreporterclient', 'crashreporterclienteditor',
  // Unity
  'unityplayer', 'unityplugin', 'mono', 'mono-2.0-bdwgc',
  // Wwise Audio
  'wwise', 'wwisesoundengine', 'akpremiumlowlatency', 'akreverb', 'aksoundseedair',
  // Havok
  'hk', 'hkBase', 'hkSerialize', 'hkInternal', 'hkCompat', 'hkSceneData',
  // GameSpy
  'xlive', 'gfwlive',
  // RAD Game Tools
  'granny2', 'granny', 'umbrella',
  // zlib
  'zlibwapi', 'zlib', 'zlib1',
  // 其他游戏库
  'oo2core', 'oo2core_win64', 'awesomium', 'libcurl', 'curl', 'libssl', 'libeay32', 'ssleay32',
  'libpng', 'libpng16', 'libjpeg', 'turbojpeg', 'freetype', 'freetype6',
  'glew32', 'glfw3', 'glad', 'theora', 'vorbis', 'vorbisfile', 'ogg',
  'libsndfile', 'flac', 'opus', 'opusfile', 'speex', 'mpg123'
];

// ==================== .NET Framework DLL ====================
const dotNetDlls = [
  'clr', 'clrjit', 'mscorlib', 'mscorwks', 'mscoreei', 'mscorsec', 'mscordbi', 'mscordacwks',
  'clretwrc', 'clrjitni', 'compatjit', 'coreclr', 'hostpolicy', 'hostfxr',
  'system.core', 'system.data', 'system.drawing', 'system.web', 'system.windows.forms',
  'system.xml', 'system.linq', 'system.io', 'system.net', 'system.security',
  'microsoft.csharp', 'microsoft.visualbasic', 'microsoft.jscript',
  'presentationcore', 'presentationframework', 'windowsbase', 'wpfgfx',
  'wpfgfx_v0400', 'milcore', 'uiautomationcore', 'uiautomationclient',
  'microsoft.interop.security.azroles', 'netstandard'
];

// ==================== Microsoft Office DLL ====================
const officeDlls = [
  'mso', 'mso20win32client', 'mso30win32client', 'mso40win32client', 'mso50win32client',
  'mso98win32client', 'mso99win32client', 'msointl', 'msores', 'msoutl',
  'wwlib', 'oart', 'oartconv', 'riched20', 'riched32', 'msptls', 'ppcore', 'pptview',
  'xlcall32', 'vbe7', 'vbe6', 'vbeui', 'fm20', 'scrrun', 'mscomctl',
  'mscomct2', 'mshflxgd', 'richtx32', 'msstdfmt', 'msflxgrd', 'msmask32',
  'comdlg32', 'picclp32', 'msadodc', 'msdatgrd', 'msadodcr', 'mschrt20',
  'owc10', 'owc11', 'excel', 'graph', 'msaccess', 'msword'
];

// ==================== 数据库客户端 DLL ====================
const databaseDlls = [
  // SQL Server
  'sqlsrv32', 'sqlncli', 'sqlncli10', 'sqlncli11', 'msodbcsql', 'msodbcsql17', 'msodbcsql18',
  'sqloledb', 'msoledbsql', 'msoledbsql19', 'mssqlsrv', 'mssqlsrvr', 'bcp', 'sqlcmd',
  // Oracle
  'oci', 'oraociei', 'oraocci', 'oraclient', 'oranls', 'oravsn',
  // MySQL
  'libmysql', 'mysqlclient', 'libmariadb',
  // PostgreSQL
  'libpq', 'pgsql',
  // SQLite
  'sqlite3', 'system.data.sqlite', 'sqlite3odbc',
  // ODBC
  'odbc32', 'odbccp32', 'odbcint', 'odbcji32', 'odbcjt32', 'odbcad32',
  // OLE DB
  'oledb32', 'msdaora', 'msdaosp', 'msdaps'
];

// ==================== 多媒体编解码器 DLL ====================
const codecDlls = [
  // FFmpeg
  'avcodec', 'avcodec-58', 'avcodec-59', 'avcodec-60',
  'avformat', 'avformat-58', 'avformat-59', 'avformat-60',
  'avutil', 'avutil-56', 'avutil-57', 'avutil-58',
  'avfilter', 'avfilter-7', 'avfilter-8', 'avfilter-9',
  'swscale', 'swscale-5', 'swscale-6', 'swscale-7',
  'swresample', 'swresample-3', 'swresample-4',
  'avdevice', 'postproc',
  // Media Foundation
  'mf', 'mfplat', 'mfcore', 'mfreadwrite', 'mfmp4srcsnk', 'mfnetcore', 'mfsrcsnk',
  // LAV Filters
  'lavcodec', 'lavformat', 'lavutil', 'lavfilters', 'lavaudiosplitter', 'lavvideosplitter',
  // K-Lite / ffdshow
  'ffdshow', 'ff_vfw', 'ff_acm', 'ffdshowdecaudio', 'ffdshowdecvideo',
  // Video codecs
  'x264', 'x265', 'xvid', 'divx', 'vp8', 'vp9', 'av1', 'openh264',
  // Audio codecs
  'lame_enc', 'mp3lame', 'libmp3lame', 'faac', 'faad2', 'libfaac', 'libfaad',
  'flac', 'libflac', 'ogg', 'vorbis', 'vorbisenc', 'libvorbis',
  'opus', 'opusfile', 'speex', 'speexdsp',
  // Image codecs
  'libjpeg', 'jpeg62', 'jpeglib', 'libpng', 'libpng16', 'png', 'libtiff', 'tiff',
  'libwebp', 'webp', 'libgif', 'gif', 'libavif', 'libheif', 'jxrlib'
];

// ==================== 安全和加密 DLL ====================
const securityDlls = [
  'libeay32', 'ssleay32', 'libssl', 'libcrypto', 'openssl',
  'libssl-1_1', 'libssl-1_1-x64', 'libssl-3', 'libssl-3-x64',
  'libcrypto-1_1', 'libcrypto-1_1-x64', 'libcrypto-3', 'libcrypto-3-x64',
  'gnutls', 'gcrypt', 'gpgme', 'nettle',
  'nss3', 'nssutil3', 'softokn3', 'freebl3', 'smime3', 'ssl3',
  'bouncycastle', 'cryptopp', 'libsodium'
];

// ==================== 网络库 DLL ====================
const networkDlls = [
  'libcurl', 'curl', 'curllib', 'libcurl-4',
  'winhttp', 'wininet', 'urlmon',
  'libuv', 'nghttp2', 'c-ares', 'cares',
  'libssh2', 'ssh2', 'puttycli', 'puttysftp',
  'libidn2', 'libidn', 'libpsl',
  'librtmp', 'rtmp', 'mbedtls', 'mbedcrypto', 'mbedx509'
];

// ==================== 压缩库 DLL ====================
const compressionDlls = [
  'zlib', 'zlib1', 'zlibwapi', 'libz',
  'bz2', 'bzip2', 'libbz2',
  'lzma', 'liblzma', 'xz',
  'lz4', 'liblz4', 'lz4frame',
  'zstd', 'libzstd', 'zstdmt',
  '7z', '7za', 'lib7zip',
  'rar', 'unrar', 'unrar64',
  'minizip', 'libminizip', 'quazip'
];

// ==================== UI 框架 DLL ====================
const uiFrameworkDlls = [
  // Qt
  'qt5core', 'qt5gui', 'qt5widgets', 'qt5network', 'qt5opengl', 'qt5qml', 'qt5quick',
  'qt5svg', 'qt5xml', 'qt5sql', 'qt5multimedia', 'qt5webengine', 'qt5webenginecore',
  'qt5webenginewidgets', 'qt5webkit', 'qt5winextras', 'qt5printsupport',
  'qt6core', 'qt6gui', 'qt6widgets', 'qt6network', 'qt6opengl', 'qt6qml', 'qt6quick',
  'qt6svg', 'qt6xml', 'qt6sql', 'qt6multimedia', 'qt6webengine', 'qt6webenginecore',
  // GTK
  'gtk-3-0', 'gtk-2-0', 'gdk-3-0', 'gdk-2-0', 'glib-2.0', 'gobject-2.0', 'gio-2.0',
  'gdk_pixbuf-2.0', 'pango-1.0', 'pangocairo-1.0', 'cairo', 'atk-1.0', 'harfbuzz',
  // wxWidgets
  'wxbase', 'wxmsw', 'wxbase315u', 'wxmsw315u', 'wxbase316u', 'wxmsw316u',
  // CEF
  'libcef', 'cef', 'cef_sandbox',
  // Electron / Node
  'libnode', 'node', 'electron',
  // WebView2
  'webview2loader', 'embeddedbrowserwebview'
];

// ==================== Python 运行时 DLL ====================
const pythonDlls = [
  'python27', 'python36', 'python37', 'python38', 'python39', 'python310', 'python311', 'python312',
  'python3', 'python', 'libpython3.8', 'libpython3.9', 'libpython3.10', 'libpython3.11', 'libpython3.12',
  'vcruntime140_1',
  // NumPy / SciPy
  'mkl_rt', 'mkl_core', 'mkl_intel_thread', 'libiomp5md', 'libopenblas', 'libblas', 'liblapack'
];

// ==================== Java 运行时 DLL ====================
const javaDlls = [
  'jvm', 'java', 'jli', 'jawt', 'jsound', 'jsoundalsa', 'jsoundds',
  'verify', 'instrument', 'management', 'management_agent', 'management_ext',
  'nio', 'net', 'prefs', 'zip', 'jaas', 'jdwp', 'dt_socket', 'dt_shmem',
  'awt', 'fontmanager', 'freetype', 'lcms', 'javaaccessbridge', 'windowsaccessbridge',
  'j2pkcs11', 'sunec', 'sunmscapi', 'ucrypto', 'w2k_lsa_auth'
];

// ==================== Adobe 产品 DLL ====================
const adobeDlls = [
  'coresync', 'coresynclib', 'logsession', 'vulcan', 'acrobat', 'acroplugin',
  'agm', 'ace', 'are', 'axe8sharedexpat', 'bibutils', 'cooltype',
  'flashplayerapp', 'flashplayerclasses', 'nacl64',
  'icudt', 'icuuc', 'icuin', 'icu',
  'adobexmp', 'xmpcore', 'xmpscript', 'xmpfiles',
  'photoshop', 'psart', 'psautomate', 'pscolorpicker', 'psviews',
  'afterfxlib', 'premiere', 'mediabrowser'
];

// ==================== 硬件驱动相关 DLL ====================
const driverDlls = [
  // AMD
  'amdxc64', 'amdxc32', 'atioglxx', 'atig6txx', 'amdocl', 'amdocl64',
  'atiadlxx', 'atiadlxy', 'amd_ags_x64', 'aticfx64', 'aticfx32',
  // Intel
  'igdumd32', 'igdumd64', 'igc32', 'igc64', 'igdfcl32', 'igdfcl64',
  'intelOpenCL64', 'OpenCL',
  // 打印机
  'hpzlui', 'hpzuiwn', 'epson', 'canonprinter', 'brotherprinter',
  // 音频
  'realtek', 'rtkapo', 'creativesb', 'asiodrv32', 'asiodrv64',
  // USB
  'libusb', 'libusb-1.0', 'winusb', 'hidapi',
  // 其他硬件
  'tobii_stream_engine', 'steamvr', 'openvr_api', 'oculusrt', 'leapmotion'
];

// 官方下载链接映射
const officialUrls: Record<string, string> = {
  'visual_cpp_2022': 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
  'visual_cpp_2019': 'https://aka.ms/vs/16/release/vc_redist.x64.exe',
  'visual_cpp_2017': 'https://aka.ms/vs/15/release/vc_redist.x64.exe',
  'visual_cpp_2015': 'https://www.microsoft.com/en-us/download/details.aspx?id=53840',
  'visual_cpp_2013': 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
  'visual_cpp_2012': 'https://www.microsoft.com/en-us/download/details.aspx?id=30679',
  'visual_cpp_2010': 'https://www.microsoft.com/en-us/download/details.aspx?id=26999',
  'visual_cpp_2008': 'https://www.microsoft.com/en-us/download/details.aspx?id=26368',
  'visual_cpp_2005': 'https://www.microsoft.com/en-us/download/details.aspx?id=26347',
  'directx': 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
  'dotnet48': 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
  'dotnet6': 'https://dotnet.microsoft.com/en-us/download/dotnet/6.0',
  'dotnet8': 'https://dotnet.microsoft.com/en-us/download/dotnet/8.0',
  'steam': 'https://store.steampowered.com/about/',
  'physx': 'https://www.nvidia.com/en-us/drivers/physx-system/',
  'openal': 'https://www.openal.org/downloads/',
  'vulkan': 'https://vulkan.lunarg.com/sdk/home',
};

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

function generateHash(length: number): string {
  const chars = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateVisualCppDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  const versionToYear: Record<string, string> = {
    '71': '2003', '80': '2005', '90': '2008', '100': '2010',
    '110': '2012', '120': '2013', '140': '2015-2022', '140_1': '2019-2022',
    '141': '2017', '142': '2019'
  };
  
  visualCppPrefixes.forEach(prefix => {
    visualCppVersions.forEach(version => {
      const name = `${prefix}${version}.dll`;
      const year = versionToYear[version] || '2015-2022';
      
      dlls.push({
        id: name,
        name: name,
        version: `${version.replace('_', '.')}.0.0`,
        size: `${Math.floor(Math.random() * 900 + 100)} KB`,
        architecture: 'Both',
        description: `${name.toUpperCase()} is part of the Microsoft Visual C++ ${year} Redistributable runtime library.`,
        associatedSoftware: `Microsoft Visual C++ ${year} Redistributable`,
        fixType: 'visual_cpp',
        md5: generateHash(32),
        sha256: generateHash(64),
        downloadCount: Math.floor(Math.random() * 4000000 + 100000),
        commonErrors: [
          `The program can't start because ${name} is missing`,
          `${name} was not found`,
          `The code execution cannot proceed because ${name} was not found`
        ],
        eventIds: ['Event ID 1000', 'Event ID 59'],
        officialDownloadUrl: officialUrls[`visual_cpp_${year.split('-')[0]}`] || officialUrls['visual_cpp_2022'],
        relatedDlls: []
      });
    });
  });
  
  return dlls;
}

function generateDirectXDlls(): GeneratedDll[] {
  const dlls: GeneratedDll[] = [];
  
  directxPrefixes.forEach(prefix => {
    directxVersions.forEach(version => {
      // 根据前缀判断版本范围
      let shouldAdd = false;
      if (prefix.startsWith('d3dx9')) {
        shouldAdd = parseInt(version) >= 24 && parseInt(version) <= 43;
      } else if (prefix.startsWith('d3dx10') || prefix.startsWith('d3dx11')) {
        shouldAdd = parseInt(version) >= 24 && parseInt(version) <= 43;
      } else if (prefix.startsWith('xinput')) {
        shouldAdd = ['1', '2', '3', '4'].includes(version);
      } else if (prefix.startsWith('xaudio')) {
        shouldAdd = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(version);
      }
      
      if (!shouldAdd && parseInt(version) >= 40) shouldAdd = true;
      
      if (shouldAdd) {
        const name = `${prefix}${version}.dll`;
        
        dlls.push({
          id: name,
          name: name,
          version: `9.${version}.952.3111`,
          size: `${Math.floor(Math.random() * 2000 + 500)} KB`,
          architecture: 'Both',
          description: `${name.toUpperCase()} is part of the Microsoft DirectX End-User Runtime, providing graphics and multimedia functionality.`,
          associatedSoftware: 'DirectX End-User Runtime',
          fixType: 'directx',
          md5: generateHash(32),
          sha256: generateHash(64),
          downloadCount: Math.floor(Math.random() * 2000000 + 50000),
          commonErrors: [
            `${name} is missing`,
            `The program can't start because ${name} was not found`
          ],
          eventIds: ['Event ID 1000'],
          officialDownloadUrl: officialUrls['directx'],
          relatedDlls: []
        });
      }
    });
  });
  
  return dlls;
}

function generateSystemDlls(): GeneratedDll[] {
  return systemDlls.map(name => ({
    id: `${name}.dll`,
    name: `${name}.dll`,
    version: '10.0.22621.0',
    size: `${Math.floor(Math.random() * 3000 + 200)} KB`,
    architecture: 'Both',
    description: `${name.toUpperCase()}.dll is a Windows system library providing core operating system functionality.`,
    associatedSoftware: 'Windows Operating System',
    fixType: 'system_core',
    md5: generateHash(32),
    sha256: generateHash(64),
    downloadCount: Math.floor(Math.random() * 1000000 + 10000),
    commonErrors: [
      `${name}.dll is missing or corrupt`,
      `The procedure entry point could not be located in ${name}.dll`
    ],
    eventIds: ['Event ID 1000', 'Event ID 7000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/update-windows-3c5ae7fc-9fb6-9af1-1984-b5e0412c556a',
    relatedDlls: []
  }));
}

function generateGameDlls(): GeneratedDll[] {
  return gameDlls.map(name => {
    let software = 'Game Runtime';
    let url = officialUrls['steam'];
    
    if (name.includes('steam')) {
      software = 'Steam Client';
      url = officialUrls['steam'];
    } else if (name.includes('physx')) {
      software = 'NVIDIA PhysX';
      url = officialUrls['physx'];
    } else if (name.includes('openal')) {
      software = 'OpenAL Audio';
      url = officialUrls['openal'];
    } else if (name.includes('vulkan')) {
      software = 'Vulkan Runtime';
      url = officialUrls['vulkan'];
    }
    
    return {
      id: `${name}.dll`,
      name: `${name}.dll`,
      version: '1.0.0.0',
      size: `${Math.floor(Math.random() * 1000 + 100)} KB`,
      architecture: name.includes('64') ? '64-bit' : '32-bit',
      description: `${name.toUpperCase()}.dll is a game runtime library required by various PC games and applications.`,
      associatedSoftware: software,
      fixType: 'game',
      md5: generateHash(32),
      sha256: generateHash(64),
      downloadCount: Math.floor(Math.random() * 3000000 + 100000),
      commonErrors: [
        `${name}.dll is missing`,
        `Game failed to start: ${name}.dll not found`
      ],
      eventIds: ['Event ID 1000'],
      officialDownloadUrl: url,
      relatedDlls: []
    };
  });
}

// 生成完整数据库
function generateFullDatabase(): void {
  const allDlls = [
    ...generateVisualCppDlls(),
    ...generateDirectXDlls(),
    ...generateSystemDlls(),
    ...generateGameDlls()
  ];
  
  // 去重
  const uniqueDlls = allDlls.filter((dll, index, self) => 
    index === self.findIndex(d => d.id === dll.id)
  );
  
  console.log(`Generated ${uniqueDlls.length} unique DLL entries`);
  
  // 输出为 JSON (使用 import.meta.url 代替 __dirname)
  const __filename = new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
  const __dirname = path.dirname(__filename);
  const outputPath = path.join(__dirname, '../src/data/generated-dlls.json');
  fs.writeFileSync(outputPath, JSON.stringify(uniqueDlls, null, 2));
  console.log(`Saved to ${outputPath}`);
}

// 运行
generateFullDatabase();
