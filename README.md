# Nuxt SPA Template

エンタープライズグレードのNuxt 3 SPAテンプレート。TypeScript、Vuetify、Atomic Designパターンを採用し、厳格なコード品質管理とスケーラブルなコンポーネントアーキテクチャを提供します。

## 特徴

- **Nuxt 4** - 最新のVue.jsメタフレームワーク
- **TypeScript** - 完全な型安全性
- **Vuetify 3** - Material Designコンポーネントライブラリ
- **Atomic Design** - スケーラブルなコンポーネント構造
- **厳格なESLint** - インポート制限ルールでアーキテクチャを強制
- **pnpm専用** - 高速で効率的なパッケージ管理

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Nuxt 4.2.1, Vue 3.5.24 |
| 言語 | TypeScript 5.9.3 |
| UIライブラリ | Vuetify 3.10.11 |
| パッケージマネージャー | pnpm (必須) |
| Linter | ESLint + @nuxt/eslint |
| 型チェック | vue-tsc |

## セットアップ

依存関係をインストール:

```bash
pnpm install
```

## 開発サーバー

開発サーバーを `http://localhost:3000` で起動:

```bash
pnpm dev
```

## プロダクション

### ビルド

プロダクション用にビルド:

```bash
pnpm build
```

### 静的サイト生成

静的サイトを生成:

```bash
pnpm generate
```

### プレビュー

プロダクションビルドをローカルでプレビュー:

```bash
pnpm preview
```

## コード品質管理

### Lint

コード品質とフォーマットをチェック:

```bash
pnpm lint
```

ESLintエラーを自動修正:

```bash
pnpm lint:fix
```

### 型チェック

TypeScriptの型エラーをチェック:

```bash
pnpm typecheck
```

### 推奨ワークフロー

コミット前に以下を実行:

```bash
pnpm lint:fix && pnpm typecheck
```

## コンポーネントアーキテクチャ

このテンプレートは**Atomic Design**パターンを採用し、ESLintでインポート制限を強制します。

### ディレクトリ構造

```text
app/components/
├── shared/              # 共有コンポーネント
│   ├── atoms/          # 基本要素（ボタン、入力欄など）
│   ├── molecules/      # 小さなコンポーネント群
│   ├── organisms/      # 複雑なUIセクション
│   └── templates/      # ページレベルのレイアウト
└── feature-*/          # Feature固有のコンポーネント
    ├── atoms/
    ├── molecules/
    ├── organisms/
    └── templates/
```

### インポート制限ルール

**Shared Components:**

- `atoms/` - 他の階層からインポート不可
- `molecules/` - `atoms/`のみインポート可
- `organisms/` - `atoms/`, `molecules/`からインポート可
- `templates/` - `molecules/`, `organisms/`からインポート可

**Feature Components:**

- Feature間のインポートは**完全に禁止**
- 各FeatureはShared層と自Feature内のみからインポート可能

これらのルールは`eslint.config.mjs`で自動的に強制されます。

## コーディング規約

### 必須事項

- **pnpmのみ使用** - npm, yarn, bunは禁止
- **TypeScript型定義** - すべてのコンポーネント・関数に必須
- **`<script setup>`** - すべてのVueコンポーネントで使用
- **ブロック順序** - `<script>` → `<template>` → `<style>`
- **JSDoc** - パブリックAPIには必須

### Props定義の例

```vue
<script setup lang="ts">
interface Props {
  /** ボタンのラベル */
  label: string
  /** 無効化フラグ */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>
```

## プロジェクト構造

```
nuxt-spa-template/
├── app/
│   ├── app.vue              # ルートコンポーネント
│   ├── components/          # コンポーネントライブラリ
│   ├── layouts/            # レイアウト
│   ├── pages/              # ページ（ファイルベースルーティング）
│   └── plugins/            # Nuxtプラグイン
├── public/                 # 静的ファイル
├── CLAUDE.md              # 詳細な開発ガイドライン
├── eslint.config.mjs      # ESLint設定
├── nuxt.config.ts         # Nuxt設定
└── package.json           # プロジェクト情報

```

## 詳細情報

開発ルール、エラー解決、ベストプラクティスの詳細は [CLAUDE.md](./CLAUDE.md) を参照してください。

## デプロイ

デプロイに関する詳細は [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) を参照してください。

## ライセンス

MIT
