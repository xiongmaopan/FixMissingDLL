# Cloudflare www 到非 www 301 重定向设置指南

## 方法：在 Cloudflare Dashboard 设置 Redirect Rules

### 步骤：

1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com
2. 选择域名 `fixmissingdll.com`
3. 左侧菜单 → **Rules** → **Redirect Rules**
4. 点击 **Create rule**

### 规则设置：

**Rule name:** `www to non-www redirect`

**When incoming requests match:**
- Field: `Hostname`
- Operator: `equals`
- Value: `www.fixmissingdll.com`

**Then:**
- Type: `Dynamic`
- Expression: `concat("https://fixmissingdll.com", http.request.uri.path)`
- Status code: `301`
- **Preserve query string:** ✅ 勾选

### 或者使用表达式模式：

```
(http.host eq "www.fixmissingdll.com")
```

Redirect to:
```
concat("https://fixmissingdll.com", http.request.uri.path)
```

---

## 验证

设置完成后，测试：
```bash
curl -I https://www.fixmissingdll.com
```

应该看到：
```
HTTP/2 301
location: https://fixmissingdll.com/
```

---

## 注意事项

1. 确保 `www.fixmissingdll.com` 的 DNS 记录已添加（CNAME 或 A 记录）
2. 确保 SSL/TLS 证书包含 www 子域名
3. 规则生效可能需要几分钟
