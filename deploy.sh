#!/bin/bash

# AOJU AI Frontier - 自动化生产环境构建与部署脚本
echo "🚀 启动 AOJU AI Frontier 生产环境构建..."

# 1. 检查依赖环境
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js/npm。请先安装 Node.js 环境。"
    exit 1
fi

# 2. 安装依赖
echo "📦 正在安装依赖..."
npm install

# 3. 使用 Vite 构建
echo "⚡ 正在构建项目..."
npm run build

# 4. 检查 wrangler
if ! command -v wrangler &> /dev/null; then
    DEPLOY_CMD="npx wrangler"
else
    DEPLOY_CMD="wrangler"
fi

# 5. 执行部署
echo "☁️  正在部署至 Cloudflare Pages..."
$DEPLOY_CMD pages deploy dist --project-name aoju-ai-frontier

echo "✨ 构建与部署任务全部完成！"
