---
name: github-pages-setup
description: 'GitHub Pages サイトを構築・公開・運用するためのワークフロー。USE FOR: 新規サイト作成、公開ソース(branch / GitHub Actions)の設定、Jekyll サイトの構築、カスタムドメインや HTTPS の設定、独自ワークフローでのデプロイ、ビルド失敗・404・公開されない問題のトラブルシュート。トリガー語: "GitHub Pages", "gh-pages", "Pages 公開", "Jekyll", "カスタムドメイン", "CNAME", "_config.yml", "Pages デプロイ"。DO NOT USE FOR: GitHub Pages と無関係な一般的な静的サイト開発、Vercel/Netlify などの他ホスティング設定。'
---

# GitHub Pages 構築 Skill

GitHub Pages サイトの新規構築・公開設定・カスタムドメイン適用・トラブルシュートを一貫した手順で進めるための Skill。

## When to Use

- リポジトリを GitHub Pages として公開したいとき
- 公開ソースを「ブランチ」から「GitHub Actions」に切り替えたいとき
- Jekyll(または静的サイトジェネレーター)で構築したサイトを Pages にデプロイしたいとき
- 独自ドメイン(apex / www / サブドメイン)を Pages に割り当てたいとき
- デプロイは成功しているのにサイトが 404 になる、最新の変更が反映されない、などの問題を解決したいとき

## 前提情報の確認

着手前に以下を必ず確認すること(不明な場合は user に質問する)。

1. **サイト種別**: User/Organization site (`<owner>.github.io`) か Project site (`<owner>.github.io/<repo>`) か
2. **リポジトリの可視性**: Public か Private(Private は GitHub Pro / Team / Enterprise が必要)
3. **公開ソース**: `Deploy from a branch` か `GitHub Actions`
4. **ジェネレーター**: 素の HTML / Jekyll / その他(Next.js, Astro, Vite, Hugo など)
5. **カスタムドメインの有無**: 必要なら apex か subdomain か

## 手順

### 1. リポジトリ準備

- User/Org site の場合、リポジトリ名は必ず `<owner>.github.io`
- Project site の場合は任意のリポジトリ名で OK
- `index.html` か `index.md`(Jekyll なら `README.md` でも可)をルートに用意

### 2. 公開ソースを設定

リポジトリの `Settings` → `Pages` で公開ソースを選ぶ。

- **Deploy from a branch**: シンプル静的サイト or 素の Jekyll 向け
  - 公開ブランチ(通常 `main`)とフォルダ(`/` か `/docs`)を指定
- **GitHub Actions**: ビルドが必要なフレームワーク、または独自ワークフロー向け
  - `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages` を組み合わせる
  - Jekyll なら公式の Starter workflow `jekyll.yml` を利用可

### 3. (任意) Jekyll サイトの構築

- ルートに `_config.yml` を置く(最低限 `title`, `description`, `theme` があれば動く)
- Project site で公開する場合、相対パスが崩れるので `_config.yml` に以下を設定:
  ```yaml
  baseurl: "/<repo-name>"
  url: "https://<owner>.github.io"
  ```
- ローカル確認は `bundle exec jekyll serve`

### 4. (任意) GitHub Actions による独自デプロイ

最小構成のワークフロー例 → [deploy-pages.yml](./assets/deploy-pages.yml)

要点:
- `permissions` に `pages: write` と `id-token: write` を付与
- `concurrency` で同時デプロイを抑止(`group: "pages"`, `cancel-in-progress: false`)
- `environment: github-pages` を使うと URL が PR にも表示される

### 5. (任意) カスタムドメイン設定

1. `Settings` → `Pages` → `Custom domain` にドメインを入力して Save
2. リポジトリ直下に `CNAME` ファイルが自動生成される(消さない)
3. DNS プロバイダ側で以下を設定:
   - **apex (`example.com`)**: A レコードを GitHub Pages の IP 4 つに向ける
     - `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **subdomain (`www.example.com`)**: CNAME レコードを `<owner>.github.io` に向ける
4. DNS 反映後、`Enforce HTTPS` を有効化

### 6. デプロイ確認

- `Actions` タブでビルド/デプロイのジョブが緑になっているか確認
- `Settings` → `Pages` の上部に表示される URL にアクセス
- 反映まで数分かかることあり。ブラウザはハードリロード(`Cmd/Ctrl + Shift + R`)

## トラブルシュート

| 症状 | 主な原因 | 対処 |
|------|----------|------|
| 404 が返る | 公開ソース未設定 / `index.html` 不在 / `baseurl` 不一致 | Settings → Pages を再確認、Project site なら `baseurl` を見直す |
| CSS/JS が読み込まれない | 絶対パス `/assets/...` を使っている | Jekyll は `{{ '/assets/...' | relative_url }}` を使う |
| カスタムドメインで証明書エラー | DNS 反映待ち / `Enforce HTTPS` チェック前 | 数十分〜24h 待ってから再度有効化 |
| デプロイ済みなのに古い内容 | CDN キャッシュ / ブラウザキャッシュ | ハードリロード、別ブラウザ、`?v=...` 付与で確認 |
| Actions が `Get Pages site failed` | Settings の Source が `GitHub Actions` になっていない | Source を Actions に切り替える |
| Jekyll ビルドで `github-pages` gem エラー | Ruby/gem バージョン不整合 | `Gemfile` で `gem "github-pages", group: :jekyll_plugins` を pin |

## 参考ドキュメント(公式)

[references/official-docs.md](./references/official-docs.md) に主要 URL をまとめている。

## 完了チェック

- [ ] `Settings` → `Pages` に公開 URL が表示されている
- [ ] その URL にブラウザでアクセスして表示できる
- [ ] (Actions の場合)最新コミットのデプロイが成功している
- [ ] (カスタムドメイン)`Enforce HTTPS` が有効
- [ ] リポジトリ `About` 欄にサイト URL を設定した
