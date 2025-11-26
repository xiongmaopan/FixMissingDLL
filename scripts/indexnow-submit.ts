/**
 * IndexNow - 快速通知搜索引擎新页面/更新页面
 * Bing, Yandex, Seznam 等支持 IndexNow 协议
 * 运行: npx tsx scripts/indexnow-submit.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://fixmissingdll.com';
const INDEXNOW_KEY = 'f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'; // 密钥文件名

interface IndexNowResponse {
  success: boolean;
  status?: number;
  error?: string;
}

// IndexNow 端点
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

// 获取最近更新的重要页面
function getUrlsToSubmit(): string[] {
  const urls: string[] = [
    // 首页
    `${SITE_URL}/`,
    
    // 核心页面
    `${SITE_URL}/dll/`,
    `${SITE_URL}/guides/`,
    `${SITE_URL}/search`,
    `${SITE_URL}/about`,
    
    // 热门 DLL 页面 (高搜索量)
    `${SITE_URL}/dll/msvcp140.dll`,
    `${SITE_URL}/dll/vcruntime140.dll`,
    `${SITE_URL}/dll/vcruntime140_1.dll`,
    `${SITE_URL}/dll/msvcp120.dll`,
    `${SITE_URL}/dll/msvcr120.dll`,
    `${SITE_URL}/dll/msvcp110.dll`,
    `${SITE_URL}/dll/msvcr110.dll`,
    `${SITE_URL}/dll/msvcp100.dll`,
    `${SITE_URL}/dll/msvcr100.dll`,
    `${SITE_URL}/dll/d3dx9_43.dll`,
    `${SITE_URL}/dll/d3dx9_42.dll`,
    `${SITE_URL}/dll/xinput1_3.dll`,
    `${SITE_URL}/dll/xinput1_4.dll`,
    `${SITE_URL}/dll/xaudio2_7.dll`,
    `${SITE_URL}/dll/steam_api.dll`,
    `${SITE_URL}/dll/steam_api64.dll`,
    `${SITE_URL}/dll/openal32.dll`,
    `${SITE_URL}/dll/physxloader.dll`,
    `${SITE_URL}/dll/d3dcompiler_47.dll`,
    `${SITE_URL}/dll/ucrtbase.dll`,
    `${SITE_URL}/dll/api-ms-win-crt-runtime-l1-1-0.dll`,
    
    // 热门指南
    `${SITE_URL}/guides/visual-cpp-redistributable`,
    `${SITE_URL}/guides/directx-runtime`,
    `${SITE_URL}/guides/net-framework-repair`,
    `${SITE_URL}/guides/windows-update-fix`,
    `${SITE_URL}/guides/sfc-dism-repair`,
    `${SITE_URL}/guides/elden-ring-dll-errors-fix`,
    `${SITE_URL}/guides/valorant-dll-errors-fix`,
    `${SITE_URL}/guides/fix-0xc0000142-application-error`,
  ];
  
  return urls;
}

async function submitToIndexNow(endpoint: string, urls: string[]): Promise<IndexNowResponse> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Host': new URL(endpoint).host,
      },
      body: JSON.stringify({
        host: 'fixmissingdll.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    
    return {
      success: response.ok || response.status === 202,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function main(): Promise<void> {
  console.log('🚀 IndexNow - Fast Search Engine Notification\n');
  
  const urls = getUrlsToSubmit();
  console.log(`📄 Submitting ${urls.length} URLs to search engines...\n`);
  
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    console.log(`📤 Submitting to ${endpoint}...`);
    const result = await submitToIndexNow(endpoint, urls);
    
    if (result.success) {
      console.log(`   ✅ Success (Status: ${result.status})`);
    } else {
      console.log(`   ❌ Failed: ${result.error || `Status ${result.status}`}`);
    }
  }
  
  console.log('\n✨ IndexNow submission complete!');
  console.log('\n📊 Submitted URLs:');
  urls.slice(0, 10).forEach(url => console.log(`   - ${url}`));
  if (urls.length > 10) {
    console.log(`   ... and ${urls.length - 10} more`);
  }
}

main().catch(console.error);
