# xz-cli

**xz-cli** 是一个项目脚手架工具，帮助你快速初始化 React 或 Vue 项目。

## 功能特性

- 🚀 **交互式创建** — 告别手动搭建，一行命令生成完整项目
- ⚛️ **React 模板** — React + Vite + TypeScript，开箱即用
- 💚 **Vue 模板** — Vue 3 + Vite + TypeScript，官方推荐写法
- 📦 **本地缓存** — 模板只下载一次，后续创建无需等待
- 🔄 **增量更新** — 检测模板新版本时自动更新缓存

## 支持的环境

- Node.js ≥ 18.0.0
- pnpm ≥ 8.0.0

## 安装

```bash
npm install -g @xz-cli/cli
```

或使用 npx 直接运行（无需全局安装）：

```bash
npx @xz-cli/cli create
```

## 使用

### 创建新项目

```bash
xz-cli create
```

或使用 npx：

```bash
npx @xz-cli/cli create
```

### 交互流程

```
? 请选择项目模版 (Use arrow keys)
❯ react 项目
  vue 项目

? 请输入项目名
  my-awesome-project
```

工具会：
1. 从 npm 下载所选模板（首次会有进度提示）
2. 将模板复制到当前目录下的 `my-awesome-project` 文件夹
3. 自动将模板中的项目名替换为你输入的名字
4. 完成后进入项目目录即可开始开发

### 已有项目结构

```
my-project/
├── index.html
├── package.json
├── src/
│   ├── main.tsx   (React) 或 main.ts (Vue)
│   ├── App.tsx     (React) 或 App.vue (Vue)
│   └── ...
├── vite.config.ts
└── tsconfig.json
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 在当前项目测试
pnpm link --global
xz-cli create
```

## 项目结构

```
xz-cli/
├── packages/
│   ├── cli/                 # 主入口 CLI (@xz-cli/cli)
│   │   ├── index.ts         # 命令行入口，定义 xz-cli 命令
│   │   └── dist/            # 编译产物
│   │
│   ├── create/              # 创建逻辑 (@xz-cli/create)
│   │   └── src/index.ts     # 交互式创建流程
│   │
│   ├── utils/               # 工具函数 (@xz-cli/utils)
│   │   ├── src/NpmPackage.ts    # npm 包下载/缓存管理
│   │   └── src/versionUtils.ts   # npm 版本查询
│   │
│   ├── template-react/      # React 项目模板 (@xz-cli/template-react)
│   │   └── template/        # 实际项目模板文件
│   │
│   └── template-vue/        # Vue 项目模板 (@xz-cli/template-vue)
│       └── template/        # 实际项目模板文件
│
├── .changeset/              # changeset 配置和 changeset 文件
├── .github/workflows/       # GitHub Actions
├── pnpm-workspace.yaml      # pnpm monorepo 配置
└── package.json            # 根包（私有）
```

## 版本与发布流程（pnpm + Changesets）

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本和发包。

### changeset 文件格式

每个 `.md` 文件代表一组版本变更，格式如下：

```md
---
"@xz-cli/cli": patch
"@xz-cli/create": minor
---

更新描述
```

**版本类型**：
- `patch` — 补丁版本（0.0.x → 0.0.x+1），向下兼容的修复
- `minor` — 次版本（0.x.0 → 0.x+1.0），向下兼容的新功能
- `major` — 主版本（x.0.0 → x+1.0.0），不兼容的破坏性变更

### 完整发布流程

**Step 1：在本地添加 changeset**

```bash
pnpm changeset
```

交互式选择要发布的包和版本类型：

```
? 选择要发布的包 (选择哪些包需要版本更新)
❯◉ @xz-cli/cli
 ◉ @xz-cli/create
 ◉ @xz-cli/utils
```

```
? 选择版本类型
  patch
❯ minor
  major
```

```
? 输入变更描述
  添加新功能...
```

完成后会在 `.changeset/` 目录下生成一个 `.md` 文件。

**Step 2：推送到 GitHub**

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin master
```

GitHub Actions 会自动：
1. 检测到 `.changeset/` 下有新的 changeset 文件
2. 自动创建一个 **Version Bump PR**，列出所有版本变更
3. PR 标题格式：`chore(release): bump versions and publish`

**Step 3：合并 PR 触发发布**

将 Version Bump PR 合并到 `master` 分支，Actions 会自动：
1. 执行 `pnpm changeset version` 更新所有包的 `package.json` 版本号
2. 更新每个包的 `CHANGELOG.md`
3. 提交版本变更到 `master`
4. 执行 `pnpm -r publish --access public` 将包发布到 npm

### 跳过发布

如果某个包有变动但不想发布，可以在 changeset 文件中这样写：

```md
---
"@xz-cli/utils": minor
"@xz-cli/cli": patch
"@xz-cli/create": none
---
```

将包名设为 `none` 可以忽略该包的版本更新。

### 发布范围

以下包会被发布到 npm（都有 `publishConfig: { access: "public" }`）：

- `@xz-cli/cli`
- `@xz-cli/create`
- `@xz-cli/template-react`
- `@xz-cli/template-vue`

> `@xz-cli/utils` 作为 workspace 依赖，会随 `@xz-cli/create` 一起发布。

## GitHub Actions

`.github/workflows/release.yml` — push 到 master 或手动触发 workflow：

```yaml
on:
  push:
    branches:
      - master
  workflow_dispatch:   # 手动触发
```

## 模板预览

### React 模板

- Vite + React 18 + TypeScript
- 集成 ESLint + Prettier
- CSS Modules 支持
- `pnpm dev` 启动开发服务器

### Vue 模板

- Vite + Vue 3 + TypeScript
- `<script setup>` 语法
- 集成 ESLint + Prettier
- `pnpm dev` 启动开发服务器

## License

ISC
