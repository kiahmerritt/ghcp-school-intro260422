# Plan: 神山まるごと高専 紹介サイト構築

GitHub Pages の Project site として、素の HTML+CSS で作る落ち着いた紹介サイト。日本語/英語の2言語、5ページ構成、ダークネイビー×アイボリー×銅のシック路線。AI 生成感を避けるため、余白・タイポグラフィ・事実中心のコピー・写真プレースホルダーで構成する。

## ステップ

1. **基盤整備**(並列可) — `.nojekyll`、共通 `assets/css/style.css`、共通ヘッダー/フッターのHTMLパターン確定
2. **日本語版5ページ作成**(*step 1 に依存、ページ間は並列可*) — `index.html` / `about/` / `curriculum/` / `campus/` / `access/`
3. **英語版5ページ作成**(*step 2 に依存*) — `en/` 配下に同構造でミラー
4. **`404.html` 作成**(*step 1 に依存*)
5. **`README.md` 更新** — サイト概要・公開URL・差し替えポイント記載
6. **公開手順の案内** — Settings → Pages → main / (root) をユーザー側で設定

## Relevant files(新規)

- `index.html` — トップ(ヒーロー + 学校概要のサマリ)
- `about/index.html` — 理念・沿革・基本情報
- `curriculum/index.html` — テクノロジー × デザイン × 起業家精神
- `campus/index.html` — キャンパスライフ・全寮制
- `access/index.html` — アクセス・お問い合わせ(公式サイトへの外部リンク中心)
- `en/**/index.html` — 上記5ページの英語ミラー
- `assets/css/style.css` — 全ページ共通の単一CSS(Noto Serif JP / Cormorant Garamond / フェード)
- `404.html` — シンプルな未検出ページ
- `.nojekyll` — Jekyll 処理を無効化
- `README.md` — リポジトリ説明・公開URL・運用メモ

## デザイン仕様

- **カラー**: 背景 `#F4EFE6`(アイボリー)、主文 `#0E1A2B`(ダークネイビー)、アクセント `#A56A3E`(銅)
- **フォント**: Noto Serif JP(本文・見出し)、英語は Cormorant Garamond をブレンド
- **レイアウト**: 最大幅 720px の縦長一段組、セクション間 120px 以上の余白、グリッドやカードは使わない
- **アニメ**: スクロールフェードのみ(IntersectionObserver, 200ms)
- **アイコン・絵文字・グラデーション・ネオン色は一切なし**

## Verification

1. `python3 -m http.server` でローカル起動 → 全ページ巡回
2. ヘッダーナビ全リンク・JA/EN 切替・フッターリンクが正しく解決するか
3. 幅 360 / 768 / 1280 でレイアウトが崩れないか
4. コントラスト比、`<html lang>`、見出し階層(h1→h2→h3)を簡易チェック
5. 公開後に `https://kiahmerritt.github.io/ghcp-school-intro260422/` を開いて確認
6. 各ページの `〔要確認〕` プレースホルダーをユーザーが事実確認して差し替え

## Decisions

- 公式情報(kamiyama.ac.jp)で公開済みの事実のみ記載、推測・脚色なし。固有数値や年号は `〔要確認〕` プレースホルダー化してユーザー最終確認に回す
- 言語切替はヘッダー右の JA/EN リンクで `/` ↔ `/en/` を切替(自動判定はしない)
- お問い合わせは独自フォームを作らず、公式の問い合わせ窓口への外部リンクで代用
- 画像は薄い罫線の SVG プレースホルダーを置き、後から差し替え前提
- `.nojekyll` を置いて素の HTML として配信(Jekyll は使わない)

## Further Considerations

1. **学校名の英語表記、どれを使う?**
   - Option A: `Kamiyama Marugoto Kosen`(ローマ字直訳・公式表記寄り、推奨)
   - Option B: `Kamiyama Marugoto College of Technology`(意訳)
   - Option C: 略称 `KMC` を併記
2. **トップに「メッセージ性のあるリードコピー」を載せる?**
   - Option A: 学校名と一行のニュートラルな説明文のみ(最もAIっぽくない、推奨)
   - Option B: 短い引用調のリード(理念から1〜2行)
   - Option C: なしで写真と校名のみ
3. **ナビゲーションの順序、これでいい?**
   - Option A: トップ / 学校について / カリキュラム / キャンパス / アクセス(時系列・関心順、推奨)
   - Option B: アルファベット順
   - Option C: ユーザー指定順
