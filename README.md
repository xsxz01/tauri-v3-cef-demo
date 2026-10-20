# 光影画廊 · Tauri v3 CEF Demo

基于 **Tauri v3（alpha）+ CEF 运行时**的桌面应用示例：前端使用 React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui，渲染引擎为随应用分发的 Chromium Embedded Framework（Chromium 154），而非系统 WebView。

## 特性

- Tauri v3 新的运行时模型：显式选择 `tauri-runtime-cef`，自带固定版本 Chromium，消除系统 WebView 差异
- 光影画廊：16 张程序化生成的艺术图片，支持分类筛选、关键词搜索、灯箱预览（键盘 ← → 切换）
- Rust ↔ 前端 IPC 调用示例（`greet` 命令）

## 技术栈

| 层 | 技术 |
|---|---|
| 桌面框架 | Tauri 3.0.0-alpha + tauri-runtime-cef |
| 渲染引擎 | CEF（Chromium 154，随应用分发） |
| 前端 | React 19 · TypeScript · Vite 7 |
| UI | Tailwind CSS 3 · shadcn/ui（40+ 组件） |
| 包管理 | pnpm |

## 开发

```bash
pnpm install
pnpm tauri dev        # 启动 Vite 开发服务器 + CEF 应用（热更新）
```

## 构建

```bash
pnpm build              # 前端产物 → dist/
pnpm tauri build        # 完整安装包（NSIS）
```

> 注意：`cargo run` / `cargo build` 单独运行时处于 dev 模式，会尝试连接 `devUrl`（http://localhost:1420），需要先用 `pnpm dev` 起前端；正式产物请走 `pnpm tauri build`。

## 目录结构

```
src/            React 前端（gallery 页面、shadcn 组件）
public/gallery/ 画廊图片素材（Python 程序化生成）
src-tauri/      Rust 后端（greet 命令、CEF 运行时入口）
```

## 环境要求

- Rust ≥ 1.95
- Node.js ≥ 20 + pnpm
- Windows：Visual Studio C++ 构建工具、CMake、Ninja（首次构建自动下载 CEF 二进制，约 280 MB）
