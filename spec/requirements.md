# Requirements: 神山まるごと高専 紹介サイト

## 概要

GitHub Pages の Project site として、神山まるごと高等専門学校の非公式紹介サイトを素の HTML + CSS で構築する。日本語/英語の 2 言語、5 ページ構成、ダークネイビー × アイボリー × 銅のシックなデザインを採用する。AI 生成感を避けるため、余白・タイポグラフィ・事実中心のコピー・写真プレースホルダーで構成する。

## ステークホルダー

- **公開者**: リポジトリオーナー(`kiahmerritt`)
- **閲覧者**: 神山まるごと高専に関心を持つ日本語 / 英語話者
- **編集者**: 公式情報を確認しプレースホルダーを差し替える運用担当

## スコープ

### In scope

- 静的 HTML + CSS + 最小限の JavaScript(スクロールフェードのみ)
- 日本語 5 ページ + 英語 5 ページ + `404.html`
- GitHub Pages の `main` ブランチ `(root)` 配信
- `〔要確認〕` / `[to be confirmed]` プレースホルダーによる事実確認の明示

### Out of scope

- お問い合わせフォーム(公式窓口への外部リンクで代替)
- 言語自動判定(ヘッダーリンクで手動切替)
- ビルドツール / SSG / CMS
- 画像アセット(SVG プレースホルダーのみ)

## 機能要件(EARS 記法)

### サイト構造

- **R-1 (Ubiquitous)**: THE SYSTEM SHALL 日本語版 5 ページ(`/`, `/about/`, `/curriculum/`, `/campus/`, `/access/`)を提供する。
- **R-2 (Ubiquitous)**: THE SYSTEM SHALL 英語版 5 ページ(`/en/`, `/en/about/`, `/en/curriculum/`, `/en/campus/`, `/en/access/`)を提供する。
- **R-3 (Ubiquitous)**: THE SYSTEM SHALL `404.html` を提供する。
- **R-4 (Ubiquitous)**: THE SYSTEM SHALL `.nojekyll` を配置し Jekyll 処理を無効化する。

### ナビゲーション

- **R-5 (Ubiquitous)**: 各ページの THE SYSTEM SHALL 共通ヘッダーに「トップ / 学校について / カリキュラム / キャンパス / アクセス」のナビゲーションを表示する。
- **R-6 (Event-driven)**: WHEN ユーザーがヘッダー右の `JA` / `EN` リンクを押下した THE SYSTEM SHALL 同等構造の対言語ページに遷移する(`/` ↔ `/en/`)。
- **R-7 (Ubiquitous)**: 各ページの THE SYSTEM SHALL 共通フッターに公式サイトへの外部リンクとコピーライト表記を表示する。

### コンテンツ

- **R-8 (Ubiquitous)**: THE SYSTEM SHALL 公式情報(kamiyama.ac.jp)で公開済みの事実のみを記載する。
- **R-9 (Unwanted behavior)**: IF 固有数値・年号・住所など未検証情報がある THEN THE SYSTEM SHALL `〔要確認〕`(JA)/ `[to be confirmed]`(EN)プレースホルダーで明示する。
- **R-10 (Ubiquitous)**: トップページ THE SYSTEM SHALL 学校名と一行のニュートラルな説明文をリードに表示する(Option A 採用)。
- **R-11 (Ubiquitous)**: お問い合わせは THE SYSTEM SHALL 公式の問い合わせ窓口への外部リンクで代用する。

### デザイン

- **R-12 (Ubiquitous)**: THE SYSTEM SHALL 配色を背景 `#F4EFE6` / 主文 `#0E1A2B` / アクセント `#A56A3E` に統一する。
- **R-13 (Ubiquitous)**: THE SYSTEM SHALL Noto Serif JP(本文・見出し)と Cormorant Garamond(英語ブレンド)を使用する。
- **R-14 (Ubiquitous)**: THE SYSTEM SHALL コンテンツの最大幅を 720px、セクション間の余白を 120px 以上に確保する。
- **R-15 (Unwanted behavior)**: IF 装飾要素にアイコン・絵文字・グラデーション・ネオン色・カード/グリッドが含まれる THEN THE SYSTEM SHALL それらを除外する。
- **R-16 (Ubiquitous)**: 画像 THE SYSTEM SHALL 薄い罫線の SVG プレースホルダーで表示し、後から `<img>` 差し替えを前提とする。

### アニメーション

- **R-17 (Event-driven)**: WHEN セクションがビューポート内に入った THE SYSTEM SHALL IntersectionObserver により 200ms のフェードを 1 回だけ実行する。
- **R-18 (Unwanted behavior)**: IF ブラウザが `prefers-reduced-motion: reduce` を指定 THEN THE SYSTEM SHALL アニメーションを無効化する。

### アクセシビリティ / 国際化

- **R-19 (Ubiquitous)**: 日本語ページ THE SYSTEM SHALL `<html lang="ja">` を、英語ページ THE SYSTEM SHALL `<html lang="en">` を指定する。
- **R-20 (Ubiquitous)**: THE SYSTEM SHALL 見出し階層を h1 → h2 → h3 の順に保つ(各ページ h1 は 1 つ)。
- **R-21 (Ubiquitous)**: THE SYSTEM SHALL 主文と背景のコントラスト比を WCAG AA(4.5:1)以上に保つ。

### レスポンシブ

- **R-22 (Ubiquitous)**: THE SYSTEM SHALL 幅 360px / 768px / 1280px のビューポートでレイアウト崩れなく表示する。

### 学校名表記(Decision: Option A 採用)

- **R-23 (Ubiquitous)**: 英語版 THE SYSTEM SHALL 学校名を `Kamiyama Marugoto Kosen` と表記する。

## 受け入れ基準

1. `python3 -m http.server` で配信し、全 11 ページ(JA 5 + EN 5 + 404)を巡回できる
2. ヘッダーの全ナビ・JA/EN 切替・フッターリンクが 404 や相対パス崩れなく解決する
3. 360 / 768 / 1280px のいずれでも横スクロールが発生しない
4. プレースホルダー差し替え箇所が `〔要確認〕` / `[to be confirmed]` で grep 可能
5. GitHub Pages 公開後、`https://kiahmerritt.github.io/ghcp-school-intro260422/` で全ページにアクセスできる

## 制約

- ビルドツール禁止(素の HTML/CSS/JS のみ)
- 外部 CDN は Google Fonts のみ許可
- 公式情報以外の推測・脚色を含めない

## 仮定

- リポジトリは `main` ブランチ `(root)` から GitHub Pages 配信される
- Project site のためベースパスは `/ghcp-school-intro260422/` だが、相対リンクで吸収する
- 画像差し替えは将来別タスクとして実施
