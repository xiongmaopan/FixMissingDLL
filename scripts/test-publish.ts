// 简单测试脚本
console.log('测试脚本启动...');

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('当前目录:', __dirname);

// 创建一个简单的测试文件
const testData = {
  test: true,
  time: new Date().toISOString()
};

const outputPath = path.join(__dirname, '../src/data/test-output.json');
fs.writeFileSync(outputPath, JSON.stringify(testData, null, 2));
console.log('✅ 测试文件已创建:', outputPath);
