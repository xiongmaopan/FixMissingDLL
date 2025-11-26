// Programmatic SEO: 动态生成 TDK 和 Schema Markup
// 符合 Google AIO (AI Overview) 优化要求

import type { DllFile } from '../data/dllDatabase';
import type { Guide } from '../data/guidesDatabase';

// 当前构建日期 (用于 Freshness 信号)
export const BUILD_DATE = new Date().toISOString().split('T')[0];
export const BUILD_TIMESTAMP = new Date().toISOString();

// 动态生成页面 Title
export function generateDllTitle(dll: DllFile): string {
  const typeMap: Record<DllFile['fixType'], string> = {
    visual_cpp: 'Visual C++ Runtime',
    directx: 'DirectX',
    system_core: 'Windows System',
    dotnet: '.NET Framework',
    game: 'Gaming',
    driver: 'Driver'
  };
  
  return `Fix ${dll.name} Missing Error - Download ${typeMap[dll.fixType]} DLL | FixMissingDLL`;
}

// 动态生成 Meta Description
export function generateDllDescription(dll: DllFile): string {
  const action = dll.fixType === 'visual_cpp' 
    ? 'Reinstall Visual C++ Redistributable' 
    : dll.fixType === 'directx'
    ? 'Install DirectX End-User Runtime'
    : dll.fixType === 'system_core'
    ? 'Run System File Checker (sfc /scannow)'
    : dll.fixType === 'dotnet'
    ? 'Repair .NET Framework'
    : dll.fixType === 'game'
    ? 'Verify game files or reinstall the game'
    : 'Update your drivers';
    
  return `${dll.name} is missing? ${action} to fix this error. Safe download with MD5 verification. Updated ${BUILD_DATE}. Works on Windows 11/10.`;
}

// 生成 DLL 页面的 JSON-LD Schema (组合 SoftwareApplication + FAQPage + HowTo)
export function generateDllSchema(dll: DllFile, siteUrl: string = 'https://fixmissingdll.com'): object {
  const pageUrl = `${siteUrl}/dll/${dll.id}`;
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      // SoftwareApplication Schema
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#software`,
        "name": dll.name,
        "description": dll.description,
        "applicationCategory": "System DLL File",
        "operatingSystem": "Windows 10, Windows 11",
        "softwareVersion": dll.version,
        "fileSize": dll.size,
        "dateModified": BUILD_DATE,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": Math.floor(dll.downloadCount / 100).toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      
      // FAQPage Schema (提高 AIO 抓取几率)
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is ${dll.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": dll.description
            }
          },
          {
            "@type": "Question",
            "name": `How do I fix "${dll.name} is missing" error?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": getQuickFixText(dll)
            }
          },
          {
            "@type": "Question",
            "name": `Is it safe to download ${dll.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, when downloaded from official sources. We recommend installing the official ${dll.associatedSoftware} package instead of downloading individual DLL files. This ensures you get a digitally signed, verified file directly from Microsoft.`
            }
          },
          {
            "@type": "Question",
            "name": `Where should I put ${dll.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `For 64-bit applications, place in C:\\Windows\\System32. For 32-bit applications on 64-bit Windows, place in C:\\Windows\\SysWOW64. However, we strongly recommend using the official installer instead of manual placement.`
            }
          }
        ]
      },
      
      // HowTo Schema (修复步骤)
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        "name": `How to Fix ${dll.name} Missing Error`,
        "description": `Step-by-step guide to fix the "${dll.name} is missing" or "${dll.name} not found" error on Windows 10 and Windows 11.`,
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "supply": [],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Windows 10 or Windows 11"
          }
        ],
        "step": getHowToSteps(dll)
      },
      
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "DLL Files",
            "item": `${siteUrl}/dll`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": dll.name,
            "item": pageUrl
          }
        ]
      },
      
      // WebPage
      {
        "@type": "WebPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": generateDllTitle(dll),
        "description": generateDllDescription(dll),
        "datePublished": "2025-01-01",
        "dateModified": BUILD_DATE,
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "url": siteUrl,
          "name": "FixMissingDLL",
          "description": "The Safest Way to Fix Your Missing DLL Errors"
        }
      }
    ]
  };
}

// 生成指南页面的 JSON-LD Schema
export function generateGuideSchema(guide: Guide, siteUrl: string = 'https://fixmissingdll.com'): object {
  const pageUrl = `${siteUrl}/guides/${guide.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        "headline": guide.title,
        "description": guide.excerpt,
        "datePublished": guide.publishDate,
        "dateModified": guide.updateDate,
        "author": {
          "@type": "Organization",
          "name": "FixMissingDLL",
          "url": siteUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "FixMissingDLL",
          "url": siteUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": `${siteUrl}/guides`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": guide.title,
            "item": pageUrl
          }
        ]
      }
    ]
  };
}

// 生成首页 Schema
export function generateHomeSchema(siteUrl: string = 'https://fixmissingdll.com'): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "FixMissingDLL",
        "description": "The Safest Way to Fix Your Missing DLL Errors. Free downloads with MD5 verification for Windows 11 and Windows 10.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "FixMissingDLL",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`
        },
        "sameAs": []
      }
    ]
  };
}

// 辅助函数: 获取快速修复文本
function getQuickFixText(dll: DllFile): string {
  switch (dll.fixType) {
    case 'visual_cpp':
      return `The quickest fix is to install the Microsoft Visual C++ Redistributable package. Download and install both x64 and x86 versions from the official Microsoft website: ${dll.officialDownloadUrl}. This will restore ${dll.name} and all related runtime files.`;
    case 'directx':
      return `Install the DirectX End-User Runtime from Microsoft. This package includes ${dll.name} and other DirectX components needed by games. Download from: https://www.microsoft.com/en-us/download/details.aspx?id=35`;
    case 'system_core':
      return `${dll.name} is a Windows system file. Run System File Checker by opening Command Prompt as Administrator and typing: sfc /scannow. If that doesn't work, try: DISM /Online /Cleanup-Image /RestoreHealth`;
    case 'dotnet':
      return `Repair or reinstall the .NET Framework. Go to Windows Settings > Apps > Optional Features and ensure .NET Framework is installed. You can also download the .NET Framework Repair Tool from Microsoft.`;
    case 'game':
      return `This file is typically included with the game or Steam. Try verifying game files in Steam (right-click game > Properties > Local Files > Verify integrity) or reinstall the game.`;
    default:
      return `Reinstall the software that requires ${dll.name}, or install the latest drivers for your hardware.`;
  }
}

// 辅助函数: 获取 HowTo 步骤
function getHowToSteps(dll: DllFile): object[] {
  if (dll.fixType === 'visual_cpp') {
    return [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Download Visual C++ Redistributable",
        "text": `Go to ${dll.officialDownloadUrl} and download the latest Visual C++ Redistributable installer.`,
        "url": dll.officialDownloadUrl
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Install Both x64 and x86 Versions",
        "text": "Run the installer. If you're on 64-bit Windows, install both the x64 and x86 versions to ensure compatibility with all applications."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Restart Your Computer",
        "text": "After installation completes, restart your computer to ensure the new DLL files are properly registered."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Launch Your Application",
        "text": `Try launching the application that was showing the "${dll.name} is missing" error. It should now work correctly.`
      }
    ];
  } else if (dll.fixType === 'directx') {
    return [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Download DirectX End-User Runtime",
        "text": "Go to Microsoft's website and download the DirectX End-User Runtime Web Installer.",
        "url": "https://www.microsoft.com/en-us/download/details.aspx?id=35"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Run the Installer",
        "text": "Run dxwebsetup.exe and follow the installation wizard to install all DirectX components."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Restart and Test",
        "text": "Restart your computer and launch your game to verify the error is resolved."
      }
    ];
  } else {
    return [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Open Command Prompt as Administrator",
        "text": "Press Win+X and select 'Terminal (Admin)' or search for 'cmd', right-click, and select 'Run as administrator'."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Run System File Checker",
        "text": "Type 'sfc /scannow' and press Enter. Wait for the scan to complete (10-15 minutes)."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Run DISM if Needed",
        "text": "If issues persist, run 'DISM /Online /Cleanup-Image /RestoreHealth' to repair the Windows image."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Restart Computer",
        "text": "Restart your computer to complete the repair process."
      }
    ];
  }
}

// Canonical URL 生成
export function getCanonicalUrl(path: string, siteUrl: string = 'https://fixmissingdll.com'): string {
  return `${siteUrl}${path.startsWith('/') ? path : '/' + path}`;
}

// Open Graph 标签生成
export function generateOpenGraph(
  title: string, 
  description: string, 
  path: string,
  siteUrl: string = 'https://fixmissingdll.com'
): object {
  return {
    'og:type': 'website',
    'og:site_name': 'FixMissingDLL',
    'og:title': title,
    'og:description': description,
    'og:url': getCanonicalUrl(path, siteUrl),
    'og:image': `${siteUrl}/og-image.png`,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description
  };
}

// 生成面包屑 Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string = 'https://fixmissingdll.com'
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  };
}
