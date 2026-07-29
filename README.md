# 逆水寒帮会货运收益计算器 AI OCR版

部署架构：
GitHub Pages（前端） + Netlify Functions（API代理） + 智谱GLM视觉模型

## 部署

1. 将项目上传 GitHub
2. 前端可部署 GitHub Pages
3. 将同一仓库连接 Netlify
4. 设置环境变量：

ZHIPU_API_KEY=你的智谱API Key

5. 前端调用：
/.netlify/functions/ocr-ai

## 文件

- index.html 前端页面
- netlify/functions/ocr-ai.js API代理
- netlify.toml Netlify配置
