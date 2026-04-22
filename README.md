# 神山まるごと高専 紹介サイト（コンセプト）

徳島県神山町にある「神山まるごと高専」をモチーフにした、学習用の静的紹介サイトです。  
プレーン HTML / CSS / JavaScript のみで構築し、GitHub Pages でホスティングします。

> ⚠️ 本サイトは GitHub Copilot の学習目的で制作したコンセプトサイトであり、実際の学校情報を正確に反映したものではありません。

## 特徴

- 🌿 神山の自然をイメージした、木と緑のナチュラルなデザイン
- 📜 1ページ構成（ヒーロー / 学校について / カリキュラム / アクセス）
- 🌐 日本語 / English の言語切替（`localStorage` で記憶）
- 📱 レスポンシブ（モバイル: 768px ブレイクポイント）
- 🎯 依存ゼロ（フォントのみ Google Fonts CDN）

## ディレクトリ構成

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── .nojekyll
└── README.md
```

## ローカルでの確認

リポジトリのルートで簡易 HTTP サーバーを立ち上げます。

```bash
python3 -m http.server 8000
```

ブラウザで <http://localhost:8000> を開きます。

## GitHub Pages での公開

1. リポジトリの **Settings → Pages** を開く
2. **Source** を `Deploy from a branch` に設定
3. **Branch** を `main` / `/ (root)` に設定して **Save**
4. 数十秒後、以下の URL で公開されます

    <https://kiahmerritt.github.io/ghcp-school-intro260422/>

`.nojekyll` ファイルにより Jekyll 処理が無効化され、`assets/` 配下も確実に配信されます。

## カスタマイズメモ

- カラーパレットは [`assets/css/style.css`](assets/css/style.css) 冒頭の CSS 変数で一元管理
- 言語テキストは HTML の `data-ja` / `data-en` 属性に直接記述
- 地図埋め込みは `index.html` の `.map-placeholder` を `<iframe>` に置き換え

## ライセンス

学習目的のサンプルです。自由に参考・改変いただけます。
