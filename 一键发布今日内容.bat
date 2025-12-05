@echo off
chcp 65001 >nul
title FixMissingDLL 每日内容发布
color 0A

echo ========================================
echo    FixMissingDLL 每日内容一键发布
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] 正在发布今日内容...
call npx tsx scripts/publish-today.ts
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ❌ 发布失败！请检查错误信息。
    pause
    exit /b 1
)

echo.
echo [2/5] 添加所有更改到 Git...
git add -A

echo.
echo [3/5] 检查是否有更改...
git diff --staged --quiet
if %errorlevel% equ 0 (
    color 0E
    echo.
    echo ⚠️ 今天的内容已经发布过了，没有新的更改。
    pause
    exit /b 0
)

echo.
echo [4/5] 提交更改...
for /f "tokens=1-3 delims=/" %%a in ('date /t') do set mydate=%%c-%%a-%%b
git commit -m "Daily content %date:~0,4%-%date:~5,2%-%date:~8,2%"

echo.
echo [5/5] 推送到 GitHub...
git push
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ❌ 推送失败！请检查网络连接或 Git 凭据。
    echo 你可以手动运行: git push
    pause
    exit /b 1
)

echo.
color 0A
echo ========================================
echo ✅ 发布完成！
echo ========================================
echo.
echo Cloudflare Pages 将自动检测推送并部署。
echo 请等待 2-3 分钟后刷新网站查看新内容。
echo.
pause
