// 简化版定时发布脚本
console.log('🚀 Daily Content Publishing Script');
console.log('===================================\n');

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 热门游戏列表
const hotGames = [
  { name: 'Black Myth Wukong', slug: 'black-myth-wukong' },
  { name: 'Elden Ring', slug: 'elden-ring' },
  { name: 'GTA V', slug: 'gta-v' },
  { name: 'Cyberpunk 2077', slug: 'cyberpunk-2077' },
  { name: 'Hogwarts Legacy', slug: 'hogwarts-legacy' },
  { name: 'Red Dead Redemption 2', slug: 'red-dead-redemption-2' },
  { name: 'Monster Hunter World', slug: 'monster-hunter-world' },
  { name: 'Baldurs Gate 3', slug: 'baldurs-gate-3' },
  { name: 'Starfield', slug: 'starfield' },
  { name: 'Call of Duty MW3', slug: 'call-of-duty-mw3' },
];

// 常见 DLL 问题
const commonDlls = [
  { dll: 'MSVCP140.dll', solution: 'Visual C++ 2015-2022 Redistributable', url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe' },
  { dll: 'VCRUNTIME140.dll', solution: 'Visual C++ 2015-2022 Redistributable', url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe' },
  { dll: 'XINPUT1_3.dll', solution: 'DirectX End-User Runtime', url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35' },
  { dll: 'd3dx9_43.dll', solution: 'DirectX End-User Runtime', url: 'https://www.microsoft.com/en-us/download/details.aspx?id=35' },
  { dll: 'MSVCP120.dll', solution: 'Visual C++ 2013 Redistributable', url: 'https://www.microsoft.com/en-us/download/details.aspx?id=40784' },
  { dll: 'api-ms-win-crt-runtime-l1-1-0.dll', solution: 'Windows Universal CRT', url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe' },
];

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
}

function generateGuide(dll: typeof commonDlls[0], game: typeof hotGames[0]): Guide {
  const today = new Date().toISOString().split('T')[0];
  const id = `fix-${dll.dll.toLowerCase().replace('.dll', '')}-${game.slug}`;
  
  return {
    id,
    slug: id,
    title: `How to Fix ${dll.dll} Missing Error in ${game.name}`,
    metaTitle: `Fix ${dll.dll} Missing in ${game.name} [2025 Guide]`,
    metaDescription: `${dll.dll} is missing error in ${game.name}? Don't panic! Learn how to fix this common DLL error with our step-by-step guide. Works for Windows 10/11.`,
    excerpt: `Complete guide to fix the "${dll.dll} is missing" error when launching ${game.name}. Includes official download links and troubleshooting steps.`,
    category: 'Gaming',
    publishDate: today,
    updateDate: today,
    author: 'DLL Fix Expert',
    keywords: [
      `${dll.dll} missing ${game.name}`,
      `${game.name} ${dll.dll} error`,
      `fix ${dll.dll} ${game.name}`,
      `${game.name} won't start`,
      `${dll.dll} download`,
    ],
    sections: [
      {
        heading: `Why Does ${game.name} Show "${dll.dll} is Missing"?`,
        content: `When you try to launch ${game.name}, Windows cannot find the ${dll.dll} file that the game needs to run. This file is part of ${dll.solution}. The error typically appears as:\n\n"The program can't start because ${dll.dll} is missing from your computer. Try reinstalling the program to fix this problem."\n\n**Don't panic!** This is one of the most common PC gaming errors and is easy to fix.`
      },
      {
        heading: 'Solution 1: Install Official Runtime (Recommended)',
        content: `The safest way to fix this error is to install the official ${dll.solution} from Microsoft:\n\n1. Download from: ${dll.url}\n2. Run the installer as Administrator\n3. Restart your computer\n4. Try launching ${game.name} again\n\n**Important:** Install BOTH x64 and x86 versions for maximum compatibility.`
      },
      {
        heading: 'Solution 2: Download DLL from FixMissingDLL.com',
        content: `If the runtime installation doesn't work, you can download ${dll.dll} directly:\n\n1. Go to our [${dll.dll} download page](/dll/${dll.dll.toLowerCase().replace('.dll', '')}/)\n2. Download the correct version (32-bit or 64-bit)\n3. Copy the file to:\n   - C:\\Windows\\System32 (for 64-bit)\n   - C:\\Windows\\SysWOW64 (for 32-bit)\n4. Restart ${game.name}`
      },
      {
        heading: 'Solution 3: Verify Game Files',
        content: `Corrupted game files can also cause this error:\n\n**Steam:**\n1. Right-click ${game.name} in Library\n2. Properties → Installed Files\n3. Click "Verify integrity of game files"\n\n**Epic Games:**\n1. Click the three dots next to ${game.name}\n2. Select "Manage"\n3. Click "Verify"`
      },
    ],
    faq: [
      {
        question: `Why does ${game.name} say ${dll.dll} is missing?`,
        answer: `${game.name} requires ${dll.dll} from ${dll.solution} to run. This error appears when the file is missing, corrupted, or blocked by antivirus.`
      },
      {
        question: `Is it safe to download ${dll.dll}?`,
        answer: `Only download DLL files from trusted sources like FixMissingDLL.com or install the official ${dll.solution} from Microsoft.`
      },
      {
        question: `Will reinstalling ${game.name} fix the error?`,
        answer: `Sometimes, but the safest fix is to install ${dll.solution} first, as the DLL is a Windows component, not part of the game.`
      },
    ],
    relatedDlls: [dll.dll.toLowerCase()],
  };
}

function main() {
  console.log('📦 Generating content queue...');
  
  const guides: Guide[] = [];
  
  // 为每个游戏生成 2 个 DLL 教程
  for (const game of hotGames.slice(0, 5)) {
    for (const dll of commonDlls.slice(0, 2)) {
      guides.push(generateGuide(dll, game));
    }
  }
  
  console.log(`✅ Generated ${guides.length} guides`);
  
  // 保存到 scheduled-guides.json
  const queuePath = path.join(__dirname, '../src/data/scheduled-guides.json');
  const queue = {
    lastPublishDate: new Date().toISOString().split('T')[0],
    publishedCount: guides.length,
    queue: guides,
  };
  
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  console.log(`💾 Saved to: ${queuePath}`);
  
  // 同时更新 auto-generated-guides.json
  const guidesPath = path.join(__dirname, '../src/data/auto-generated-guides.json');
  let existingGuides: Guide[] = [];
  
  if (fs.existsSync(guidesPath)) {
    existingGuides = JSON.parse(fs.readFileSync(guidesPath, 'utf-8'));
  }
  
  // 添加新的 guides（避免重复）
  const existingIds = new Set(existingGuides.map(g => g.id));
  const newGuides = guides.filter(g => !existingIds.has(g.id));
  
  if (newGuides.length > 0) {
    existingGuides.push(...newGuides);
    fs.writeFileSync(guidesPath, JSON.stringify(existingGuides, null, 2));
    console.log(`📚 Added ${newGuides.length} new guides to auto-generated-guides.json`);
  } else {
    console.log('ℹ️ No new guides to add (all already exist)');
  }
  
  console.log('\n🎉 Done!');
  console.log(`📊 Total guides: ${existingGuides.length}`);
}

main();
