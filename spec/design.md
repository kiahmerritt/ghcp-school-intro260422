# Design: 神山まるごと高専 紹介サイト

## アーキテクチャ概要

純粋な静的サイト。ビルドステップなし。GitHub Pages の `main` / `(root)` から直接配信する。

```
┌────────────────────────────────────────────────┐
│  ブラウザ                                       │
│   ├─ HTML(各ページ)                          │
│   ├─ CSS(共通単一: assets/css/style.css)      │
│   ├─ JS(共通単一: assets/js/fade.js)          │
│   └─ Google Fonts(Noto Serif JP, Cormorant)   │
└────────────────────────────────────────────────┘
              ▲
              │ 静的配信
┌────────────────────────────────────────────────┐
│  GitHub Pages (main / root)                    │
│  .nojekyll により Jekyll 処理を無効化           │
└────────────────────────────────────────────────┘
```

## ディレクトリ構成

```
/
├── .nojekyll
├── 404.html
├── README.md
├── index.html                  # JA トップ
├── about/index.html
├── curriculum/index.html
├── campus/index.html
├── access/index.html
├── en/
│   ├── index.html              # EN トップ
│   ├── about/index.html
│   ├── curriculum/index.html
│   ├── campus/index.html
│   └── access/index.html
└── assets/
    ├── css/style.css
    └── js/fade.js
```

## 共通 HTML パターン

各ページは以下の骨格を踏襲する。

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ページ名 | 神山まるごと高専 紹介</title>
  <meta name="description" content="…">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Noto+Serif+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/ghcp-school-intro260422/assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="site-header__brand" href="…">神山まるごと高専 紹介</a>
    <nav class="site-nav">…</nav>
    <div class="lang-switch"><a href="…">JA</a> / <a href="…">EN</a></div>
  </header>

  <main>
    <section class="lead">…</section>
    <section class="block">…</section>
  </main>

  <footer class="site-footer">…</footer>
  <script src="/ghcp-school-intro260422/assets/js/fade.js" defer></script>
</body>
</html>
```

> パス解決: Project site のため、CSS/JS は **ルート相対パス**(`/ghcp-school-intro260422/...`)で参照する。ページ間遷移は **ルート相対**(`/ghcp-school-intro260422/about/`)とし、ローカル `python3 -m http.server` 検証時は同パスのサブディレクトリで起動して確認する。
>
> ※ 代替案として全リンクを相対パスにする方法もあるが、`/en/` ↔ `/` の対称性が崩れるためルート相対に統一する。

## CSS 設計(`assets/css/style.css`)

### CSS 変数(冒頭で集中管理)

```css
:root {
  --bg: #F4EFE6;          /* アイボリー */
  --fg: #0E1A2B;          /* ダークネイビー */
  --accent: #A56A3E;      /* 銅 */
  --rule: rgba(14,26,43,.18);
  --measure: 720px;
  --gap-xl: 120px;
  --font-jp: "Noto Serif JP", serif;
  --font-en: "Cormorant Garamond", "Noto Serif JP", serif;
}
```

### レイアウト原則

- `main` を `max-width: var(--measure)` の 1 段組
- セクション間の上下余白は `var(--gap-xl)`(モバイルでは 72px に縮める)
- グリッド/カードは使用しない。罫線(`border-top: 1px solid var(--rule)`)で区切る

### タイポグラフィ

- 本文 `font-family: var(--font-jp)`、行間 1.9
- 英語ページは `body { font-family: var(--font-en); }`
- `h1` は 2.2rem / `h2` は 1.4rem / `h3` は 1.1rem
- 見出しは `letter-spacing: .04em`、`font-weight: 500`(過度な太字回避)

### コンポーネント

| クラス                  | 役割                                       |
| ---------------------- | ----------------------------------------- |
| `.site-header`         | 上部固定ではない通常ヘッダー、横並び        |
| `.site-nav`            | ナビゲーション(横並び・テキストのみ)        |
| `.lang-switch`         | JA/EN 切替                                 |
| `.lead`                | トップのリード文(校名 + 一行説明)          |
| `.block`               | 標準セクション。見出し + 段落               |
| `.figure__placeholder` | 1px 罫線の SVG プレースホルダー(差替前提)  |
| `.site-footer`         | 公式リンク + コピーライト                   |
| `.fade`                | スクロールフェード対象(初期 opacity:0)     |
| `.fade.is-visible`     | フェード後(opacity:1, translateY(0))       |

### レスポンシブ

- ベースはモバイルファースト
- `@media (min-width: 768px)` で `.site-header` を横並び・余白拡張
- 横スクロール禁止: `body { overflow-x: hidden; }` は使わず、`max-width:100%` と `padding-inline` で吸収

### モーション

```css
.fade { opacity: 0; transform: translateY(8px); transition: opacity .2s ease, transform .2s ease; }
.fade.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .fade, .fade.is-visible { opacity: 1; transform: none; transition: none; }
}
```

## JS 設計(`assets/js/fade.js`)

```js
// IntersectionObserver による 1 回だけのフェードイン
(() => {
  const els = document.querySelectorAll('.fade');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();
```

## ページ別コンテンツ設計

### 共通

- すべてのページに `<header>` / `<main>` / `<footer>` を配置
- 公式サイトリンクは `https://kamiyama.ac.jp/`(フッター)
- 未確認情報は `〔要確認〕` / `[to be confirmed]` で囲む

### `index.html`(JA トップ)

- リード: `神山まるごと高等専門学校` + 一行説明(Option A)
- セクション: 「学校について」「カリキュラム」「キャンパス」「アクセス」へのテキストリンク
- 写真プレースホルダー 1 枚

### `about/index.html`

- 理念 / 沿革(`〔要確認〕` 開校年・所在地)/ 基本情報

### `curriculum/index.html`

- テクノロジー × デザイン × 起業家精神 の 3 本柱の説明

### `campus/index.html`

- キャンパスライフ / 全寮制 / 周辺環境

### `access/index.html`

- 所在地(`〔要確認〕`)/ 公式サイトへの問い合わせリンク

### `en/**`

- 上記日本語版を直訳ではなく要点ミラーで翻訳
- 学校名は `Kamiyama Marugoto Kosen` で統一(Decision: Option A)

### `404.html`

- 「お探しのページは見つかりませんでした / Page not found」 + トップへのリンク(JA/EN 両方)

## エラーマトリクス

| 事象                              | 対処                                           |
| -------------------------------- | --------------------------------------------- |
| 画像未配置                        | SVG プレースホルダー表示で破綻させない          |
| JS 無効 / IntersectionObserver 非対応 | フェード対象を即時 `is-visible` 化              |
| `prefers-reduced-motion`          | アニメーション無効化                           |
| 存在しない URL                    | `404.html` で JA/EN トップへ誘導               |
| Google Fonts 読み込み失敗         | `serif` フォールバックで継続                   |

## テスト戦略

- **手動巡回**: ローカルサーバーで全 11 ページのリンク巡回
- **レスポンシブ**: DevTools で 360 / 768 / 1280px を切替確認
- **アクセシビリティ**: 各ページの `<html lang>`、見出し階層、リンクテキストを目視
- **コントラスト**: 主文と背景のコントラスト比を DevTools で確認
- **公開後**: 実 URL でナビ・JA/EN 切替・404 を再確認

## 設計判断(Decision Records)

### Decision - 学校名英訳
- **Decision**: `Kamiyama Marugoto Kosen`(Option A)
- **Context**: 公式日本名のローマ字表記が最も推測リスクが低い
- **Options**: A: ローマ字直訳 / B: `College of Technology` 意訳 / C: `KMC` 略称併記
- **Rationale**: 公式呼称に最も忠実、AI 生成感を回避
- **Impact**: 全 EN ページで一貫表記
- **Review**: 公式英語表記が判明次第見直し

### Decision - リードコピー
- **Decision**: 校名 + 一行のニュートラルな説明(Option A)
- **Rationale**: AI 的な誇張を避け事実中心
- **Impact**: トップの第一画面が最小限の情報量に

### Decision - ナビ順
- **Decision**: トップ / 学校について / カリキュラム / キャンパス / アクセス(Option A)
- **Rationale**: 関心の流れに沿う

### Decision - パス解決
- **Decision**: ルート相対(`/ghcp-school-intro260422/...`)で統一
- **Options**: A: ルート相対 / B: 相対パス
- **Rationale**: JA/EN 対称性、404 からの遷移容易性
- **Impact**: ローカル検証はサブディレクトリ起動 or リポジトリ名と同じディレクトリ配下で `http.server` する必要あり
