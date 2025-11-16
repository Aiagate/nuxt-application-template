# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コア開発ルール

1. パッケージ管理
   - pnpmのみを使用し、npmやyarnは使用禁止
   - インストール: `pnpm add package`
   - 開発依存関係: `pnpm add -D package`
   - スクリプト実行: `pnpm script` または `pnpm run script`
   - アップグレード: `pnpm update package`
   - 禁止事項: `npm install`、`yarn add`

2. コード品質
   - すべてのコンポーネント・関数にTypeScript型定義が必要
   - パブリックAPIにはJSDocコメントが必須
   - 関数は焦点を絞り小さく保つ
   - 既存のパターンに正確に従う
   - コンポーネントアーキテクチャの階層ルールを厳守（CLAUDE.md参照）

3. テスト要件
   - 新機能にはテストが必要
   - バグ修正にはリグレッションテストが必要
   - エッジケースとエラーハンドリングをテスト
   - テストファイルは`test/`ディレクトリに配置
   - コンポーネントテストは`test/components/`に配置

## コミットガイドライン

- ユーザー報告に基づくバグ修正や機能追加の場合:

  ```bash
  git commit --trailer "Reported-by:<name>"
  ```

  `<name>`はユーザーの名前です。

- GitHub Issueに関連するコミットの場合:

  ```bash
  git commit --trailer "Github-Issue:#<number>"
  ```

- **禁止事項**: `co-authored-by`やツールの言及は一切禁止。コミットメッセージやPRに使用したツールを記載しないこと。

## プルリクエスト

- 変更内容の詳細なメッセージを作成する。解決しようとしている問題の高レベルな説明と、その解決方法に焦点を当てる。コードの詳細は明確性を増す場合のみ記載。

- レビュアーの追加が必要な場合は、プロジェクトの慣習に従う。

- **禁止事項**: `co-authored-by`やツールの言及は一切禁止。PRに使用したツールを記載しないこと。

## 開発ツール

### 1. ESLint（コード品質とフォーマット）

- **確認**: `pnpm lint`
- **自動修正**: `pnpm lint:fix`
- **重要な問題**:
  - コンポーネントのインポート階層違反
  - `<script setup>`の使用必須
  - ブロック順序（script → template → style）
  - 未使用のインポート
  - TypeScript型エラー

- **設定**: `eslint.config.mjs`
- **ルール**:
  - Nuxt公式ESLintモジュール使用
  - TypeScriptパーサーとプラグイン
  - スタイリスティックルール有効
  - カスタムインポート制限ルール

### 2. TypeScript型チェック

- **実行**: `pnpm typecheck`
- **内部**: `npx nuxi typecheck`（vue-tscを使用）
- **要件**:
  - すべてのpropsに型定義必須
  - `defineProps<T>()`でTypeScript型を使用
  - Optionalな値には明示的な型ガード
  - Vuetifyコンポーネントの型を正確に使用

### 3. Pre-commit Hooks（推奨）

- **設定ファイル**: `.husky/` または `.git/hooks/`
- **実行内容**: コミット時にlintと型チェック
- **ツール**: ESLint、TypeScript
- **推奨フロー**:

  ```bash
  pnpm lint:fix && pnpm typecheck
  ```

### 4. テスト（Vitest）

- **実行**: `pnpm test`
- **ウォッチモード**: `pnpm test:watch`
- **カバレッジ**: `pnpm test:coverage`
- **設定**: `vitest.config.ts`
- **テストファイル配置**:
  - `test/components/`: コンポーネントテスト
  - `test/composables/`: Composableテスト
  - `test/utils/`: ユーティリティテスト

- **テスト環境**:
  - Nuxt環境で実行（`environment: 'nuxt'`）
  - `happy-dom`を使用（軽量で高速）
  - `@nuxt/test-utils`のヘルパー関数を利用

- **主要なヘルパー関数**:
  - `mountSuspended()`: コンポーネントをマウント（非同期セットアップ対応）
  - `mockNuxtImport()`: Nuxt composableのモック
  - `mockComponent()`: 子コンポーネントのモック
  - `registerEndpoint()`: APIエンドポイントのモック

- **カバレッジ設定**:
  - プロバイダー: istanbul（Nuxt環境との互換性が高い）
  - レポート形式: text（コンソール）、html（ブラウザで閲覧）、json-summary
  - 測定方式: テストでインポートされたファイルのみ測定（`all: false`）
  - 対象: `**/*.{ts,vue}`（テストで実際に使用されるファイル）
  - 除外: node_modules, test, .d.ts, config, .nuxt, plugins, layouts, pages
  - レポート出力先: `coverage/`ディレクトリ
  - HTMLレポート: `coverage/index.html`をブラウザで開いて詳細確認可能

- **テスト作成のベストプラクティス**:
  - コンポーネントのprops、emit、slotを検証
  - エッジケースとエラーハンドリングをテスト
  - 新機能追加時は必ずテストを作成
  - バグ修正時はリグレッションテストを追加
  - カバレッジ80%以上を目標とする

## エラー解決

### 1. CI失敗時の対処順序

修正は以下の順序で実行:

1. **ESLint自動修正**: `pnpm lint:fix`
2. **型エラー修正**: `pnpm typecheck`で検出されたエラーを修正
3. **手動Lintエラー**: 自動修正できなかったルール違反を修正

**型エラーの対処**:

- 完全な行コンテキストを確認
- Optional型（`?:`）の使用を確認
- 型ガードを追加（`if (value !== undefined)`）
- 関数・コンポーネントのシグネチャを検証
- Vuetifyの型定義と一致させる

### 2. よくある問題

**コンポーネントインポート違反**:

- `shared/atoms`は他のshared階層からインポート不可
- `shared/molecules`は`atoms`のみインポート可
- Feature固有コンポーネントは他のfeatureからインポート不可
- 詳細はCLAUDE.mdを参照

**TypeScript型エラー**:

- Propsは`defineProps<T>()`で定義
- `withDefaults()`でデフォルト値を設定
- Vuetifyコンポーネントの型はvuetifyパッケージから取得
- 例: `import type { VBtn } from 'vuetify/components'`

**ESLintエラー**:

- `<script setup>`を必ず使用
- ブロック順序: `<script>` → `<template>` → `<style>`
- 未使用のインポートを削除
- TypeScript型アノテーションを使用

**ビルドエラー**:

- `pnpm dev`で開発サーバーが起動しない場合は`.nuxt`ディレクトリを削除
- `pnpm install`で依存関係を再インストール
- `pnpm build`で本番ビルドをテスト

### 3. ベストプラクティス

- コミット前に`git status`を確認
- コミット前に`pnpm lint:fix && pnpm typecheck`を実行
- 変更は最小限に保つ
- 既存のパターンに従う（特にコンポーネント構造）
- パブリックAPIにはJSDocを記述
- 新機能には適切なテストを追加
