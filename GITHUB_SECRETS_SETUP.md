# 🚀 GitHub 自动部署配置指南（超详细版）

## 📋 概述

这个指南将帮助你配置 GitHub Actions 自动部署到 Cloudflare Pages。
配置完成后，每次你推送代码到 GitHub，网站就会自动更新！

---

## 🔧 第一步：获取 Cloudflare Account ID

### 1.1 登录 Cloudflare
1. 打开浏览器，访问 https://dash.cloudflare.com/
2. 用你的账号登录

### 1.2 找到 Account ID
**方法一（最简单）：**
1. 登录后，看浏览器地址栏
2. URL 格式是：`https://dash.cloudflare.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. 那串 32 位的字符就是你的 **Account ID**

**方法二：**
1. 点击左侧菜单 **Workers 和 Pages**
2. 在右侧边栏找到 **Account ID**
3. 点击复制按钮

📝 **把 Account ID 保存到记事本，待会要用！**

---

## 🔑 第二步：创建 Cloudflare API Token

### 2.1 进入 API Token 页面
1. 点击右上角你的 **头像/邮箱**
2. 选择 **My Profile**（我的个人资料）
3. 点击左侧的 **API Tokens**
4. 或者直接访问：https://dash.cloudflare.com/profile/api-tokens

### 2.2 创建新 Token
1. 点击蓝色按钮 **Create Token**（创建令牌）
2. 找到 **Edit Cloudflare Workers** 模板
3. 点击它右边的 **Use template**（使用模板）

### 2.3 配置 Token 权限
在配置页面：
1. **Token name**: 改成 `GitHub Deploy FixMissingDLL`（方便识别）
2. **Account Resources**: 选择你的账户（通常已经选好）
3. **Zone Resources**: 保持 All zones 或选择特定域名
4. 点击 **Continue to summary**（继续到摘要）
5. 点击 **Create Token**（创建令牌）

### 2.4 复制 Token
⚠️ **重要：Token 只显示一次！**
1. 看到绿色成功页面后，Token 会显示出来
2. 点击 **Copy** 复制它
3. 立即粘贴到记事本保存

📝 **现在你应该有两个值了：**
- Account ID: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- API Token: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🔐 第三步：配置 GitHub Secrets

### 3.1 进入 GitHub 仓库设置
1. 打开你的 GitHub 仓库页面
2. 点击顶部的 **Settings**（设置）标签

### 3.2 找到 Secrets 配置
1. 在左侧菜单找到 **Secrets and variables**
2. 点击展开，选择 **Actions**

### 3.3 添加第一个 Secret (Account ID)
1. 点击绿色按钮 **New repository secret**
2. **Name** 填写：`CLOUDFLARE_ACCOUNT_ID`
3. **Secret** 填写：你的 Account ID（32位字符串）
4. 点击 **Add secret**

### 3.4 添加第二个 Secret (API Token)
1. 再次点击 **New repository secret**
2. **Name** 填写：`CLOUDFLARE_API_TOKEN`
3. **Secret** 填写：你的 API Token
4. 点击 **Add secret**

✅ **配置完成！你应该能看到两个 secrets：**
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

---

## 📤 第四步：推送代码到 GitHub

### 4.1 初始化 Git（如果还没有）
打开终端（PowerShell），运行：

```powershell
cd d:\CODEFREE\FixMissingDLL\astro-site
git init
git add .
git commit -m "Initial commit: Astro site for FixMissingDLL"
```

### 4.2 连接到 GitHub 仓库
```powershell
git remote add origin https://github.com/你的用户名/fixmissingdll.git
git branch -M main
git push -u origin main
```

---

## ✅ 第五步：验证自动部署

### 5.1 查看部署状态
1. 在 GitHub 仓库页面，点击 **Actions** 标签
2. 你应该能看到 **Deploy to Cloudflare Pages** 工作流正在运行
3. 点击进去查看详细日志

### 5.2 部署成功的标志
- 所有步骤都显示绿色 ✅
- 最后一步显示类似：`Deployment complete! https://xxxxx.fixmissingdll.pages.dev`

### 5.3 手动触发部署
如果想手动触发：
1. 点击 **Actions**
2. 选择 **Deploy to Cloudflare Pages**
3. 点击右边的 **Run workflow** 按钮
4. 再点击绿色的 **Run workflow**

---

## 🔄 自动更新功能

配置完成后，系统会自动：

| 触发条件 | 动作 |
|---------|------|
| 每次推送代码到 main 分支 | 自动构建并部署 |
| 每周一 00:00 UTC | 自动更新日期并部署（保持 SEO 新鲜度） |
| 手动触发 | 点击 Run workflow 按钮 |

---

## ❓ 常见问题

### Q: 部署失败，提示 "Authentication error"
**A:** API Token 权限不够。重新创建一个 Token，确保选择了 **Edit Cloudflare Workers** 模板。

### Q: 部署失败，提示 "Project not found"
**A:** 项目名称不匹配。确保 Cloudflare Pages 上的项目名是 `fixmissingdll`。

### Q: 哪里查看 Account ID？
**A:** 登录 Cloudflare 后，地址栏 URL 中 `dash.cloudflare.com/` 后面的 32 位字符串。

### Q: 忘记保存 API Token 了怎么办？
**A:** Token 只显示一次，需要删除旧的重新创建一个新的。

---

## Google Tag Manager 验证

GTM ID: `GTM-56QC6W4T`

### 验证步骤：

1. 访问 https://fixmissingdll.com/
2. 打开浏览器开发者工具 (F12)
3. 在 Console 中输入：
   ```javascript
   console.log(window.dataLayer);
   ```
4. 应该看到包含 GTM 事件的数组

### 使用 Google Tag Assistant

1. 安装 [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. 访问您的网站
3. 点击扩展图标查看 GTM 状态

### GTM 预览模式

1. 登录 [Google Tag Manager](https://tagmanager.google.com/)
2. 选择您的容器 GTM-56QC6W4T
3. 点击 "Preview"
4. 在新标签页中访问您的网站
5. 检查 Tag Manager 是否正确触发

---

## 常见问题

### GTM 未被检测到？

1. **清除缓存**: Cloudflare 可能缓存了旧版本
   - 在 Cloudflare Dashboard → Caching → Configuration → Purge Everything

2. **等待部署**: 新部署需要几分钟传播

3. **检查 HTML**: 查看网页源代码，确认 GTM 脚本存在

### AdSense 未显示广告？

1. AdSense 需要审核通过（可能需要几天）
2. 确保网站有足够内容
3. 检查 AdSense 控制台的网站审核状态

---

## 联系支持

如有问题，请在 GitHub Issues 中报告。
