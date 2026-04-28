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
├── pnpm-workspace.yaml      # pnpm monorepo 配置
└── package.json             # 根包（私有）
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

## 发布流程

本项目使用 GitHub Actions 实现 CI/CD：

- **触发条件**：push 到 `master` 分支
- **发布范围**：`packages/` 下所有带 `publishConfig` 的包
- **发布地址**：npmjs.com（公共包）

详情见 [.github/workflows/publish.yml](./.github/workflows/publish.yml)

## License

ISC
