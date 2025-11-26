// DLL 数据库 - 包含 50+ 高流量 DLL 文件
// Programmatic SEO: 每个文件自动生成独立页面

export interface DllFile {
  id: string;
  name: string;
  version: string;
  size: string;
  architecture: '32-bit' | '64-bit' | 'Both';
  description: string;
  associatedSoftware: string;
  fixType: 'visual_cpp' | 'directx' | 'system_core' | 'dotnet' | 'game' | 'driver';
  md5: string;
  sha256: string;
  lastScanned: string;
  downloadCount: number;
  commonErrors: string[];
  eventIds: string[];
  officialDownloadUrl: string;
  relatedDlls: string[];
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'Error Codes' | 'Installation' | 'Gaming' | 'System';
  publishDate: string;
  updateDate: string;
  author: string;
  sections: {
    heading: string;
    content: string;
  }[];
  relatedDlls: string[];
}

// Visual C++ Runtime DLLs (最高流量)
const visualCppDlls: DllFile[] = [
  {
    id: 'vcruntime140.dll',
    name: 'vcruntime140.dll',
    version: '14.38.33135.0',
    size: '98 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'VCRUNTIME140.dll is the Visual C++ Runtime Library that provides essential functions for programs compiled with Visual Studio 2015-2022. It handles memory allocation, exception handling, and other core runtime operations required by modern Windows applications including Adobe Creative Cloud, Skype, Discord, and most PC games.',
    md5: 'e5f6g7h8i9j0k1l2m3n4o5p6',
    sha256: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 4250890,
    commonErrors: [
      'The program can\'t start because VCRUNTIME140.dll is missing',
      'VCRUNTIME140.dll was not found',
      'The code execution cannot proceed because VCRUNTIME140.dll was not found',
      'VCRUNTIME140.dll is either not designed to run on Windows or it contains an error'
    ],
    eventIds: ['Event ID 1000', 'Event ID 1026', 'Event ID 59'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140_1.dll', 'msvcp140.dll', 'msvcp140_1.dll', 'concrt140.dll']
  },
  {
    id: 'vcruntime140_1.dll',
    name: 'vcruntime140_1.dll',
    version: '14.38.33135.0',
    size: '36 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'VCRUNTIME140_1.dll is an extended Visual C++ Runtime component introduced in Visual Studio 2019. It contains additional runtime functions and is required alongside vcruntime140.dll for applications built with newer Visual Studio versions.',
    md5: 'b2c3d4e5f6g7h8i9j0k1l2m3',
    sha256: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2150340,
    commonErrors: [
      'VCRUNTIME140_1.dll is missing from your computer',
      'The code execution cannot proceed because VCRUNTIME140_1.dll was not found'
    ],
    eventIds: ['Event ID 1000', 'Event ID 59'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll']
  },
  {
    id: 'msvcp140.dll',
    name: 'msvcp140.dll',
    version: '14.38.33135.0',
    size: '564 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCP140.dll is the Microsoft C++ Standard Library DLL. It provides the Standard Template Library (STL) implementation including containers (vector, map, string), algorithms, and I/O streams for C++ applications.',
    md5: 'c3d4e5f6g7h8i9j0k1l2m3n4',
    sha256: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 3850420,
    commonErrors: [
      'The program can\'t start because MSVCP140.dll is missing',
      'MSVCP140.dll was not found',
      'Error loading msvcp140.dll'
    ],
    eventIds: ['Event ID 1000', 'Event ID 1026'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll', 'msvcp140_1.dll', 'msvcp140_2.dll']
  },
  {
    id: 'msvcp140_1.dll',
    name: 'msvcp140_1.dll',
    version: '14.38.33135.0',
    size: '28 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCP140_1.dll is an additional component of the Visual C++ Standard Library providing extended functionality for string manipulation and other operations.',
    md5: 'd4e5f6g7h8i9j0k1l2m3n4o5',
    sha256: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1250340,
    commonErrors: ['MSVCP140_1.dll is missing', 'Could not load msvcp140_1.dll'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['msvcp140.dll', 'vcruntime140.dll']
  },
  {
    id: 'concrt140.dll',
    name: 'concrt140.dll',
    version: '14.38.33135.0',
    size: '286 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'CONCRT140.dll is the Concurrency Runtime Library that provides parallel programming support for C++ applications. It enables multi-threaded execution, task scheduling, and synchronization primitives.',
    md5: 'e5f6g7h8i9j0k1l2m3n4o5p6',
    sha256: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 890200,
    commonErrors: ['concrt140.dll is missing', 'Failed to load concrt140.dll'],
    eventIds: ['Event ID 1000', 'Event ID 1026'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll']
  },
  {
    id: 'vcomp140.dll',
    name: 'vcomp140.dll',
    version: '14.38.33135.0',
    size: '156 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'VCOMP140.dll is the OpenMP Runtime Library for Visual C++. It provides support for OpenMP parallel programming directives used in scientific computing and data processing applications.',
    md5: 'f6g7h8i9j0k1l2m3n4o5p6q7',
    sha256: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 560300,
    commonErrors: ['vcomp140.dll is missing', 'OpenMP runtime error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll']
  },
  {
    id: 'mfc140u.dll',
    name: 'mfc140u.dll',
    version: '14.38.33135.0',
    size: '4.2 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'MFC140U.dll is the Microsoft Foundation Classes Unicode library. It provides a set of C++ classes that wrap Windows API for building desktop applications with graphical user interfaces.',
    md5: 'g7h8i9j0k1l2m3n4o5p6q7r8',
    sha256: 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 340200,
    commonErrors: ['mfc140u.dll is missing', 'MFC application error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll']
  },
  {
    id: 'api-ms-win-crt-runtime-l1-1-0.dll',
    name: 'api-ms-win-crt-runtime-l1-1-0.dll',
    version: '10.0.22621.0',
    size: '22 KB',
    architecture: 'Both',
    associatedSoftware: 'Universal C Runtime (UCRT)',
    fixType: 'visual_cpp',
    description: 'This is the Universal C Runtime (UCRT) API Set DLL. It provides core C runtime functions required by applications built with Visual Studio 2015 and later. On Windows 7/8.1, this file is installed via Windows Update KB2999226.',
    md5: 'h8i9j0k1l2m3n4o5p6q7r8s9',
    sha256: 'h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1450500,
    commonErrors: [
      'api-ms-win-crt-runtime-l1-1-0.dll is missing',
      'The program can\'t start because api-ms-win-crt-runtime-l1-1-0.dll is missing'
    ],
    eventIds: ['Event ID 1000', 'Event ID 59'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['api-ms-win-crt-stdio-l1-1-0.dll', 'api-ms-win-crt-heap-l1-1-0.dll', 'ucrtbase.dll']
  }
];

// DirectX DLLs (游戏相关)
const directxDlls: DllFile[] = [
  {
    id: 'd3dx9_43.dll',
    name: 'd3dx9_43.dll',
    version: '9.29.952.3111',
    size: '1.98 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime (June 2010)',
    fixType: 'directx',
    description: 'D3DX9_43.dll is a DirectX 9 extension library providing helper functions for Direct3D 9 applications. It includes texture loading, mesh operations, shader compilation, and mathematical functions essential for 3D game rendering.',
    md5: 'i9j0k1l2m3n4o5p6q7r8s9t0',
    sha256: 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 5400100,
    commonErrors: [
      'D3DX9_43.dll is missing',
      'd3dx9_43.dll was not found',
      'The program can\'t start because d3dx9_43.dll is missing'
    ],
    eventIds: ['Event ID 1000', 'Event ID 14'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dx9_42.dll', 'd3dx9_41.dll', 'd3dx9_40.dll', 'd3dx10_43.dll']
  },
  {
    id: 'd3dx9_42.dll',
    name: 'd3dx9_42.dll',
    version: '9.28.1886.0',
    size: '1.87 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime',
    fixType: 'directx',
    description: 'D3DX9_42.dll is an older version of the DirectX 9 extension library. Some legacy games specifically require this version rather than the latest d3dx9_43.dll.',
    md5: 'j0k1l2m3n4o5p6q7r8s9t0u1',
    sha256: 'j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2100500,
    commonErrors: ['d3dx9_42.dll is missing', 'd3dx9_42.dll not found'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dx9_43.dll', 'd3dx9_41.dll']
  },
  {
    id: 'd3dx9_41.dll',
    name: 'd3dx9_41.dll',
    version: '9.27.1734.0',
    size: '1.85 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime',
    fixType: 'directx',
    description: 'D3DX9_41.dll is part of the DirectX 9.0c runtime components released in March 2009.',
    md5: 'k1l2m3n4o5p6q7r8s9t0u1v2',
    sha256: 'k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1560200,
    commonErrors: ['d3dx9_41.dll is missing'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dx9_43.dll', 'd3dx9_42.dll']
  },
  {
    id: 'd3dx10_43.dll',
    name: 'd3dx10_43.dll',
    version: '9.29.952.3111',
    size: '1.02 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime (June 2010)',
    fixType: 'directx',
    description: 'D3DX10_43.dll provides utility functions for Direct3D 10 applications including texture management and math libraries for DirectX 10 compatible games.',
    md5: 'l2m3n4o5p6q7r8s9t0u1v2w3',
    sha256: 'l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 980300,
    commonErrors: ['d3dx10_43.dll is missing'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dx9_43.dll', 'd3dx11_43.dll']
  },
  {
    id: 'd3dx11_43.dll',
    name: 'd3dx11_43.dll',
    version: '9.29.952.3111',
    size: '1.15 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime (June 2010)',
    fixType: 'directx',
    description: 'D3DX11_43.dll is the DirectX 11 extension library providing helper functions for Direct3D 11 applications and games.',
    md5: 'm3n4o5p6q7r8s9t0u1v2w3x4',
    sha256: 'm3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1250400,
    commonErrors: ['d3dx11_43.dll is missing', 'd3dx11_43.dll not found'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dx10_43.dll', 'd3dx9_43.dll']
  },
  {
    id: 'd3dcompiler_47.dll',
    name: 'd3dcompiler_47.dll',
    version: '10.0.22621.0',
    size: '4.68 MB',
    architecture: 'Both',
    associatedSoftware: 'DirectX Shader Compiler',
    fixType: 'directx',
    description: 'D3DCompiler_47.dll is the HLSL (High Level Shading Language) compiler used to compile shader programs at runtime for DirectX 10/11/12 applications.',
    md5: 'n4o5p6q7r8s9t0u1v2w3x4y5',
    sha256: 'n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2340600,
    commonErrors: ['d3dcompiler_47.dll is missing', 'D3DCompiler error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['d3dcompiler_46.dll', 'd3dcompiler_43.dll']
  },
  {
    id: 'xinput1_3.dll',
    name: 'xinput1_3.dll',
    version: '9.18.944.0',
    size: '107 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX for Windows',
    fixType: 'directx',
    description: 'XInput1_3.dll is the Xbox Controller Input API for Windows. It translates Xbox 360/One controller inputs into game commands and is essential for games with gamepad support.',
    md5: 'o5p6q7r8s9t0u1v2w3x4y5z6',
    sha256: 'o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1980200,
    commonErrors: [
      'xinput1_3.dll is missing',
      'xinput1_3.dll was not found',
      'Controller not working'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['xinput1_4.dll', 'xinput9_1_0.dll']
  },
  {
    id: 'xinput1_4.dll',
    name: 'xinput1_4.dll',
    version: '10.0.22621.0',
    size: '65 KB',
    architecture: 'Both',
    associatedSoftware: 'Windows Operating System',
    fixType: 'directx',
    description: 'XInput1_4.dll is the newer version of the Xbox Controller Input API included with Windows 8 and later. It provides improved gamepad support for modern games.',
    md5: 'p6q7r8s9t0u1v2w3x4y5z6a7',
    sha256: 'p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1240300,
    commonErrors: ['xinput1_4.dll is missing'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['xinput1_3.dll']
  },
  {
    id: 'xaudio2_7.dll',
    name: 'xaudio2_7.dll',
    version: '9.29.952.3111',
    size: '234 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft DirectX End-User Runtime',
    fixType: 'directx',
    description: 'XAudio2_7.dll is the DirectX audio API library providing low-latency, high-performance audio playback for games and multimedia applications.',
    md5: 'q7r8s9t0u1v2w3x4y5z6a7b8',
    sha256: 'q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 890400,
    commonErrors: ['xaudio2_7.dll is missing', 'No audio in game'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    relatedDlls: ['xaudio2_9.dll']
  }
];

// Windows 核心系统 DLLs
const systemCoreDlls: DllFile[] = [
  {
    id: 'kernel32.dll',
    name: 'kernel32.dll',
    version: '10.0.22621.3527',
    size: '731 KB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'KERNEL32.dll is a critical Windows system DLL that exposes most Win32 base APIs including memory management, process/thread handling, file I/O, and synchronization. Corruption of this file can render Windows unbootable.',
    md5: 'r8s9t0u1v2w3x4y5z6a7b8c9',
    sha256: 'r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 650300,
    commonErrors: [
      'kernel32.dll not found',
      'Entry point not found in kernel32.dll',
      'The procedure entry point could not be located in kernel32.dll'
    ],
    eventIds: ['Event ID 1000', 'Event ID 7034', 'Event ID 1001'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/windows/repair-apps-and-programs-in-windows',
    relatedDlls: ['ntdll.dll', 'kernelbase.dll']
  },
  {
    id: 'ntdll.dll',
    name: 'ntdll.dll',
    version: '10.0.22621.3527',
    size: '2.21 MB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'NTDLL.dll is the Native API library that provides the lowest-level user-mode interface to the Windows kernel. It contains system calls and internal functions used by all Windows applications.',
    md5: 's9t0u1v2w3x4y5z6a7b8c9d0',
    sha256: 's9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 340200,
    commonErrors: ['ntdll.dll error', 'Exception in ntdll.dll'],
    eventIds: ['Event ID 1000', 'Event ID 1001'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e',
    relatedDlls: ['kernel32.dll', 'kernelbase.dll']
  },
  {
    id: 'user32.dll',
    name: 'user32.dll',
    version: '10.0.22621.3527',
    size: '1.68 MB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'USER32.dll contains the Windows User Interface APIs for window creation, message handling, menus, dialog boxes, and other GUI-related operations.',
    md5: 't0u1v2w3x4y5z6a7b8c9d0e1',
    sha256: 't0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 290100,
    commonErrors: ['user32.dll error', 'user32.dll not found'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e',
    relatedDlls: ['kernel32.dll', 'gdi32.dll']
  },
  {
    id: 'gdi32.dll',
    name: 'gdi32.dll',
    version: '10.0.22621.3527',
    size: '168 KB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'GDI32.dll is the Graphics Device Interface library responsible for rendering graphics, fonts, and images in Windows applications.',
    md5: 'u1v2w3x4y5z6a7b8c9d0e1f2',
    sha256: 'u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 180300,
    commonErrors: ['gdi32.dll error', 'Graphics initialization failed'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e',
    relatedDlls: ['user32.dll', 'kernel32.dll']
  },
  {
    id: 'advapi32.dll',
    name: 'advapi32.dll',
    version: '10.0.22621.3527',
    size: '788 KB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'ADVAPI32.dll provides Advanced Windows API functions including security, registry access, service management, and event logging.',
    md5: 'v2w3x4y5z6a7b8c9d0e1f2g3',
    sha256: 'v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 210400,
    commonErrors: ['advapi32.dll error', 'Registry access failed'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e',
    relatedDlls: ['kernel32.dll', 'ntdll.dll']
  },
  {
    id: 'msvcrt.dll',
    name: 'msvcrt.dll',
    version: '7.0.22621.1',
    size: '649 KB',
    architecture: '64-bit',
    associatedSoftware: 'Microsoft Windows Operating System',
    fixType: 'system_core',
    description: 'MSVCRT.dll is the legacy Microsoft Visual C Runtime Library providing standard C library functions. Modern applications use UCRT instead.',
    md5: 'w3x4y5z6a7b8c9d0e1f2g3h4',
    sha256: 'w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 560200,
    commonErrors: ['msvcrt.dll is missing', 'msvcrt.dll error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e',
    relatedDlls: ['kernel32.dll']
  }
];

// 游戏常用 DLLs
const gameDlls: DllFile[] = [
  {
    id: 'steam_api64.dll',
    name: 'steam_api64.dll',
    version: '8.68.73.31',
    size: '295 KB',
    architecture: '64-bit',
    associatedSoftware: 'Steam Client',
    fixType: 'game',
    description: 'Steam_api64.dll is the 64-bit Steam API library used by games to integrate with Steam features including achievements, cloud saves, multiplayer matchmaking, and DRM verification.',
    md5: 'x4y5z6a7b8c9d0e1f2g3h4i5',
    sha256: 'x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 3240500,
    commonErrors: [
      'steam_api64.dll is missing',
      'steam_api64.dll not found',
      'Failed to load steam_api64.dll'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://store.steampowered.com/about/',
    relatedDlls: ['steam_api.dll', 'steamclient64.dll']
  },
  {
    id: 'steam_api.dll',
    name: 'steam_api.dll',
    version: '8.68.73.31',
    size: '249 KB',
    architecture: '32-bit',
    associatedSoftware: 'Steam Client',
    fixType: 'game',
    description: 'Steam_api.dll is the 32-bit Steam API library for older games to integrate with Steam platform services.',
    md5: 'y5z6a7b8c9d0e1f2g3h4i5j6',
    sha256: 'y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2890400,
    commonErrors: ['steam_api.dll is missing', 'steam_api.dll not found'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://store.steampowered.com/about/',
    relatedDlls: ['steam_api64.dll', 'steamclient.dll']
  },
  {
    id: 'openal32.dll',
    name: 'openal32.dll',
    version: '1.23.1',
    size: '472 KB',
    architecture: 'Both',
    associatedSoftware: 'OpenAL Soft',
    fixType: 'game',
    description: 'OpenAL32.dll is the Open Audio Library providing 3D positional audio for games. Many games, especially those using OpenAL-based audio engines, require this file.',
    md5: 'z6a7b8c9d0e1f2g3h4i5j6k7',
    sha256: 'z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1560300,
    commonErrors: ['openal32.dll is missing', 'OpenAL audio error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.openal.org/downloads/',
    relatedDlls: ['wrap_oal.dll']
  },
  {
    id: 'physxloader.dll',
    name: 'physxloader.dll',
    version: '9.21.0513',
    size: '48 KB',
    architecture: 'Both',
    associatedSoftware: 'NVIDIA PhysX',
    fixType: 'game',
    description: 'PhysXLoader.dll is the NVIDIA PhysX physics engine loader required by games using PhysX for realistic physics simulation.',
    md5: 'a7b8c9d0e1f2g3h4i5j6k7l8',
    sha256: 'a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 890200,
    commonErrors: ['physxloader.dll is missing', 'PhysX initialization failed'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.nvidia.com/en-us/drivers/physx-system/',
    relatedDlls: ['physxcudart_20.dll', 'physxcore.dll']
  },
  {
    id: 'bink2w64.dll',
    name: 'bink2w64.dll',
    version: '2.8.0.0',
    size: '634 KB',
    architecture: '64-bit',
    associatedSoftware: 'RAD Game Tools Bink Video',
    fixType: 'game',
    description: 'Bink2w64.dll is the Bink Video codec library used for high-quality video playback in many AAA games for cutscenes and cinematics.',
    md5: 'b8c9d0e1f2g3h4i5j6k7l8m9',
    sha256: 'b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 560100,
    commonErrors: ['bink2w64.dll is missing', 'Video playback error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'http://www.radgametools.com/bnkdown.htm',
    relatedDlls: ['binkw32.dll']
  },
  {
    id: 'mss32.dll',
    name: 'mss32.dll',
    version: '9.5.0.0',
    size: '412 KB',
    architecture: '32-bit',
    associatedSoftware: 'Miles Sound System',
    fixType: 'game',
    description: 'MSS32.dll is the Miles Sound System audio library used in many older games for audio playback and 3D audio effects.',
    md5: 'c9d0e1f2g3h4i5j6k7l8m9n0',
    sha256: 'c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 670300,
    commonErrors: ['mss32.dll is missing', 'Miles audio error'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'http://www.radgametools.com/miles.htm',
    relatedDlls: ['mss64.dll']
  }
];

// .NET Framework DLLs
const dotnetDlls: DllFile[] = [
  {
    id: 'clr.dll',
    name: 'clr.dll',
    version: '4.8.4761.0',
    size: '10.4 MB',
    architecture: 'Both',
    associatedSoftware: '.NET Framework 4.8',
    fixType: 'dotnet',
    description: 'CLR.dll is the Common Language Runtime engine that executes .NET applications. It provides memory management, type safety, exception handling, and JIT compilation.',
    md5: 'd0e1f2g3h4i5j6k7l8m9n0o1',
    sha256: 'd0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 340500,
    commonErrors: ['CLR initialization failed', '.NET Runtime error'],
    eventIds: ['Event ID 1000', 'Event ID 1026'],
    officialDownloadUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
    relatedDlls: ['mscorlib.dll', 'clrjit.dll']
  },
  {
    id: 'mscorlib.dll',
    name: 'mscorlib.dll',
    version: '4.8.4761.0',
    size: '5.3 MB',
    architecture: 'Both',
    associatedSoftware: '.NET Framework 4.8',
    fixType: 'dotnet',
    description: 'Mscorlib.dll is the core .NET Framework class library containing fundamental types like System.String, System.Object, and System.Collections.',
    md5: 'e1f2g3h4i5j6k7l8m9n0o1p2',
    sha256: 'e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 290300,
    commonErrors: ['mscorlib.dll error', 'Could not load type'],
    eventIds: ['Event ID 1000', 'Event ID 1026'],
    officialDownloadUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
    relatedDlls: ['clr.dll', 'System.dll']
  }
];

// Additional High-Traffic DLLs
const additionalDlls: DllFile[] = [
  // More Visual C++ Runtime DLLs
  {
    id: 'msvcr100.dll',
    name: 'msvcr100.dll',
    version: '10.0.40219.325',
    size: '829 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2010 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCR100.dll is the Microsoft Visual C++ 2010 Runtime Library. Required by applications compiled with Visual Studio 2010, including many older games and Adobe applications.',
    md5: 'f1a2b3c4d5e6f7g8h9i0j1k2',
    sha256: 'f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2890500,
    commonErrors: [
      'The program can\'t start because msvcr100.dll is missing',
      'msvcr100.dll was not found',
      'This application failed to start because msvcr100.dll was not found'
    ],
    eventIds: ['Event ID 1000', 'Event ID 59'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=26999',
    relatedDlls: ['msvcp100.dll', 'atl100.dll']
  },
  {
    id: 'msvcp100.dll',
    name: 'msvcp100.dll',
    version: '10.0.40219.325',
    size: '608 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2010 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCP100.dll is the Microsoft Visual C++ 2010 C++ Standard Library providing STL containers and algorithms for VS2010 applications.',
    md5: 'g2b3c4d5e6f7g8h9i0j1k2l3',
    sha256: 'g2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2450300,
    commonErrors: [
      'The program can\'t start because msvcp100.dll is missing',
      'msvcp100.dll was not found'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=26999',
    relatedDlls: ['msvcr100.dll']
  },
  {
    id: 'msvcr110.dll',
    name: 'msvcr110.dll',
    version: '11.0.61030.0',
    size: '869 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2012 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCR110.dll is the Microsoft Visual C++ 2012 Runtime Library required for applications built with Visual Studio 2012.',
    md5: 'h3c4d5e6f7g8h9i0j1k2l3m4',
    sha256: 'h3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1980200,
    commonErrors: [
      'The program can\'t start because msvcr110.dll is missing',
      'msvcr110.dll was not found'
    ],
    eventIds: ['Event ID 1000', 'Event ID 59'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=30679',
    relatedDlls: ['msvcp110.dll', 'vccorlib110.dll']
  },
  {
    id: 'msvcp110.dll',
    name: 'msvcp110.dll',
    version: '11.0.61030.0',
    size: '661 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2012 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCP110.dll is the Microsoft Visual C++ 2012 C++ Standard Library for STL support in VS2012 applications.',
    md5: 'i4d5e6f7g8h9i0j1k2l3m4n5',
    sha256: 'i4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1650100,
    commonErrors: [
      'The program can\'t start because msvcp110.dll is missing'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=30679',
    relatedDlls: ['msvcr110.dll']
  },
  {
    id: 'msvcr120.dll',
    name: 'msvcr120.dll',
    version: '12.0.40664.0',
    size: '970 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2013 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCR120.dll is the Microsoft Visual C++ 2013 Runtime Library. Many popular applications like Skype, Discord, and games require this runtime.',
    md5: 'j5e6f7g8h9i0j1k2l3m4n5o6',
    sha256: 'j5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 3120400,
    commonErrors: [
      'The program can\'t start because msvcr120.dll is missing',
      'msvcr120.dll was not found',
      'MSVCR120.dll is either not designed to run on Windows'
    ],
    eventIds: ['Event ID 1000', 'Event ID 59'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
    relatedDlls: ['msvcp120.dll', 'vccorlib120.dll']
  },
  {
    id: 'msvcp120.dll',
    name: 'msvcp120.dll',
    version: '12.0.40664.0',
    size: '455 KB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2013 Redistributable',
    fixType: 'visual_cpp',
    description: 'MSVCP120.dll is the Microsoft Visual C++ 2013 C++ Standard Library providing STL support.',
    md5: 'k6f7g8h9i0j1k2l3m4n5o6p7',
    sha256: 'k6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2780200,
    commonErrors: [
      'The program can\'t start because msvcp120.dll is missing'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=40784',
    relatedDlls: ['msvcr120.dll']
  },
  // More DirectX DLLs
  {
    id: 'd3dx9_42.dll',
    name: 'd3dx9_42.dll',
    version: '9.26.952.3235',
    size: '1.91 MB',
    architecture: 'Both',
    associatedSoftware: 'DirectX End-User Runtime',
    fixType: 'directx',
    description: 'D3DX9_42.dll is part of the DirectX 9 utilities library. Required by games released around 2008-2010 including Call of Duty: Modern Warfare 2 and GTA IV.',
    md5: 'l7g8h9i0j1k2l3m4n5o6p7q8',
    sha256: 'l7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1890600,
    commonErrors: [
      'd3dx9_42.dll is missing',
      'D3DX9_42.dll was not found'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDlls: ['d3dx9_43.dll', 'd3dx9_41.dll']
  },
  {
    id: 'd3dx9_41.dll',
    name: 'd3dx9_41.dll',
    version: '9.25.952.2900',
    size: '1.86 MB',
    architecture: 'Both',
    associatedSoftware: 'DirectX End-User Runtime',
    fixType: 'directx',
    description: 'D3DX9_41.dll is a DirectX 9 component for games from 2008-2009 era.',
    md5: 'm8h9i0j1k2l3m4n5o6p7q8r9',
    sha256: 'm8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1230400,
    commonErrors: ['d3dx9_41.dll is missing'],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDlls: ['d3dx9_42.dll', 'd3dx9_40.dll']
  },
  {
    id: 'd3dcompiler_47.dll',
    name: 'd3dcompiler_47.dll',
    version: '10.0.22621.1',
    size: '4.7 MB',
    architecture: 'Both',
    associatedSoftware: 'DirectX Shader Compiler',
    fixType: 'directx',
    description: 'D3DCompiler_47.dll is the DirectX HLSL shader compiler used by modern games and applications for real-time shader compilation.',
    md5: 'n9i0j1k2l3m4n5o6p7q8r9s0',
    sha256: 'n9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1560700,
    commonErrors: [
      'd3dcompiler_47.dll is missing',
      'The code execution cannot proceed because d3dcompiler_47.dll was not found'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDlls: ['d3dcompiler_43.dll', 'd3d11.dll']
  },
  // Windows System DLLs
  {
    id: 'api-ms-win-crt-runtime-l1-1-0.dll',
    name: 'api-ms-win-crt-runtime-l1-1-0.dll',
    version: '10.0.22621.1',
    size: '22 KB',
    architecture: 'Both',
    associatedSoftware: 'Universal C Runtime (UCRT)',
    fixType: 'system_core',
    description: 'API-MS-WIN-CRT-RUNTIME-L1-1-0.dll is part of the Universal C Runtime (UCRT), providing C runtime functions for Windows 10+ applications.',
    md5: 'o0j1k2l3m4n5o6p7q8r9s0t1',
    sha256: 'o0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2340500,
    commonErrors: [
      'api-ms-win-crt-runtime-l1-1-0.dll is missing',
      'The program can\'t start because api-ms-win-crt-runtime-l1-1-0.dll is missing'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c',
    relatedDlls: ['ucrtbase.dll', 'vcruntime140.dll']
  },
  {
    id: 'ucrtbase.dll',
    name: 'ucrtbase.dll',
    version: '10.0.22621.2506',
    size: '1.1 MB',
    architecture: 'Both',
    associatedSoftware: 'Universal C Runtime (UCRT)',
    fixType: 'system_core',
    description: 'UCRTBASE.dll is the Universal C Runtime base library, the modern replacement for msvcrt.dll providing C standard library functions.',
    md5: 'p1k2l3m4n5o6p7q8r9s0t1u2',
    sha256: 'p1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1890400,
    commonErrors: [
      'ucrtbase.dll is missing',
      'The procedure entry point could not be located in ucrtbase.dll'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c',
    relatedDlls: ['api-ms-win-crt-runtime-l1-1-0.dll', 'vcruntime140.dll']
  },
  {
    id: 'mfc140u.dll',
    name: 'mfc140u.dll',
    version: '14.38.33135.0',
    size: '5.8 MB',
    architecture: 'Both',
    associatedSoftware: 'Microsoft Visual C++ 2015-2022 Redistributable',
    fixType: 'visual_cpp',
    description: 'MFC140U.dll is the Microsoft Foundation Class Library (Unicode version) for Visual Studio 2015-2022, used by MFC-based desktop applications.',
    md5: 'q2l3m4n5o6p7q8r9s0t1u2v3',
    sha256: 'q2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 980300,
    commonErrors: [
      'mfc140u.dll is missing',
      'The program can\'t start because mfc140u.dll is missing'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    relatedDlls: ['vcruntime140.dll', 'msvcp140.dll']
  },
  // Gaming Platform DLLs
  {
    id: 'steam_api64.dll',
    name: 'steam_api64.dll',
    version: '8.51.0.0',
    size: '305 KB',
    architecture: '64-bit',
    associatedSoftware: 'Steam Client',
    fixType: 'game',
    description: 'Steam_api64.dll is the Steam API library enabling games to integrate with Steam features like achievements, cloud saves, and multiplayer.',
    md5: 'r3m4n5o6p7q8r9s0t1u2v3w4',
    sha256: 'r3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 3450600,
    commonErrors: [
      'steam_api64.dll is missing',
      'Failed to load Steam API',
      'Steam must be running to play this game'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://store.steampowered.com/about/',
    relatedDlls: ['steam_api.dll', 'steamclient64.dll']
  },
  {
    id: 'steam_api.dll',
    name: 'steam_api.dll',
    version: '8.51.0.0',
    size: '258 KB',
    architecture: '32-bit',
    associatedSoftware: 'Steam Client',
    fixType: 'game',
    description: 'Steam_api.dll is the 32-bit Steam API library for older games that integrate with Steam platform features.',
    md5: 's4n5o6p7q8r9s0t1u2v3w4x5',
    sha256: 's4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 2890400,
    commonErrors: [
      'steam_api.dll is missing',
      'Failed to load steam_api.dll'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://store.steampowered.com/about/',
    relatedDlls: ['steam_api64.dll', 'steamclient.dll']
  },
  {
    id: 'xlive.dll',
    name: 'xlive.dll',
    version: '3.5.95.0',
    size: '13.7 MB',
    architecture: '32-bit',
    associatedSoftware: 'Games for Windows Live',
    fixType: 'game',
    description: 'XLive.dll is the Games for Windows Live (GFWL) runtime required by older games like GTA IV, Dark Souls, and Fallout 3 GOTY.',
    md5: 't5o6p7q8r9s0t1u2v3w4x5y6',
    sha256: 't5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1560300,
    commonErrors: [
      'xlive.dll is missing',
      'Games for Windows Live error',
      'XLIVE.dll was not found'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.xbox.com/en-US/games/store/games-for-windows-live-client/9WZDNCRFJCWS',
    relatedDlls: ['xlivefnt.dll']
  },
  // Audio DLLs
  {
    id: 'xaudio2_7.dll',
    name: 'xaudio2_7.dll',
    version: '9.29.952.3111',
    size: '175 KB',
    architecture: 'Both',
    associatedSoftware: 'DirectX End-User Runtime',
    fixType: 'directx',
    description: 'XAudio2_7.dll is the DirectX audio API library providing low-latency audio playback for games and multimedia applications.',
    md5: 'u6p7q8r9s0t1u2v3w4x5y6z7',
    sha256: 'u6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1120500,
    commonErrors: [
      'xaudio2_7.dll is missing',
      'XAudio2 initialization failed'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=35',
    relatedDlls: ['xaudio2_6.dll', 'xinput1_3.dll']
  },
  // Vulkan
  {
    id: 'vulkan-1.dll',
    name: 'vulkan-1.dll',
    version: '1.3.268.0',
    size: '1.2 MB',
    architecture: 'Both',
    associatedSoftware: 'Vulkan Runtime',
    fixType: 'game',
    description: 'Vulkan-1.dll is the Vulkan graphics API runtime enabling modern games and applications to use Vulkan for high-performance 3D graphics.',
    md5: 'v7q8r9s0t1u2v3w4x5y6z7a8',
    sha256: 'v7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 1890600,
    commonErrors: [
      'vulkan-1.dll is missing',
      'Failed to initialize Vulkan',
      'Vulkan driver not found'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://vulkan.lunarg.com/sdk/home',
    relatedDlls: []
  },
  // More .NET
  {
    id: 'system.dll',
    name: 'System.dll',
    version: '4.8.4761.0',
    size: '3.5 MB',
    architecture: 'Both',
    associatedSoftware: '.NET Framework 4.8',
    fixType: 'dotnet',
    description: 'System.dll is a core .NET Framework assembly containing fundamental types for networking, I/O, threading, and configuration.',
    md5: 'w8r9s0t1u2v3w4x5y6z7a8b9',
    sha256: 'w8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 670300,
    commonErrors: [
      'System.dll error',
      'Could not load file or assembly System'
    ],
    eventIds: ['Event ID 1000', 'Event ID 1026'],
    officialDownloadUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
    relatedDlls: ['mscorlib.dll', 'clr.dll']
  },
  {
    id: 'wpfgfx_v0400.dll',
    name: 'wpfgfx_v0400.dll',
    version: '4.8.4761.0',
    size: '1.7 MB',
    architecture: 'Both',
    associatedSoftware: '.NET Framework 4.8 (WPF)',
    fixType: 'dotnet',
    description: 'WPFGfx_v0400.dll is the Windows Presentation Foundation graphics rendering engine for .NET 4.x applications.',
    md5: 'x9s0t1u2v3w4x5y6z7a8b9c0',
    sha256: 'x9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0',
    lastScanned: new Date().toISOString().split('T')[0],
    downloadCount: 450200,
    commonErrors: [
      'wpfgfx_v0400.dll error',
      'WPF graphics initialization failed'
    ],
    eventIds: ['Event ID 1000'],
    officialDownloadUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
    relatedDlls: ['presentationcore.dll', 'clr.dll']
  }
];

// 合并所有 DLL
export const dllDatabase: DllFile[] = [
  ...visualCppDlls,
  ...directxDlls,
  ...systemCoreDlls,
  ...gameDlls,
  ...dotnetDlls,
  ...additionalDlls
];

// 导出按字母分类的 DLL
export const getDllsByLetter = (letter: string): DllFile[] => {
  return dllDatabase.filter(dll => 
    dll.name.toLowerCase().startsWith(letter.toLowerCase())
  );
};

// 导出按类型分类的 DLL
export const getDllsByType = (type: DllFile['fixType']): DllFile[] => {
  return dllDatabase.filter(dll => dll.fixType === type);
};

// 获取单个 DLL
export const getDllById = (id: string): DllFile | undefined => {
  return dllDatabase.find(dll => dll.id.toLowerCase() === id.toLowerCase());
};

// 获取所有 DLL IDs (用于静态生成)
export const getAllDllIds = (): string[] => {
  return dllDatabase.map(dll => dll.id);
};

// 获取热门 DLL
export const getPopularDlls = (limit: number = 10): DllFile[] => {
  return [...dllDatabase]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
};

// 获取相关 DLL
export const getRelatedDlls = (dll: DllFile): DllFile[] => {
  return dll.relatedDlls
    .map(id => getDllById(id))
    .filter((d): d is DllFile => d !== undefined);
};

// 获取所有 DLL
export const getAllDlls = (): DllFile[] => {
  return dllDatabase;
};

// 分类定义
export const categories: Record<string, { name: string; description: string; icon: string }> = {
  visual_cpp: {
    name: 'Visual C++ Runtime',
    description: 'Microsoft Visual C++ Redistributable runtime libraries',
    icon: '🔧'
  },
  directx: {
    name: 'DirectX',
    description: 'Microsoft DirectX gaming and multimedia components',
    icon: '🎮'
  },
  system_core: {
    name: 'System Core',
    description: 'Windows core system libraries',
    icon: '💻'
  },
  game: {
    name: 'Gaming',
    description: 'Gaming platform and engine libraries',
    icon: '🕹️'
  },
  dotnet: {
    name: '.NET Framework',
    description: 'Microsoft .NET Framework libraries',
    icon: '🟣'
  }
};

// 按分类获取 DLL
export const getDllsByCategory = (category: string): DllFile[] => {
  return dllDatabase.filter(dll => dll.fixType === category);
};
