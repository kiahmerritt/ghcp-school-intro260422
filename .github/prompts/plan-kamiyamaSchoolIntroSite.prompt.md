# Plan: 神山まるごと高専 紹介サイト（GitHub Pages）

## TL;DR
プレーンHTML/CSS/JSで、神山の自然をイメージした木・緑系のナチュラルなデザインの1ページ構成（セクション分割）+ 言語切替（JA/EN）の静的サイトを `index.html` ルートに構築し、main ブランチの / (root) から GitHub Pages で公開する。

## 構成方針
- **シングルページ構成**（スムーススクロールでセクション移動）。情報量的に4セクションなので分割不要、操作も軽快。
- **依存ゼロ**：外部フレームワーク不使用、Google Fonts のみ CDN 経由で読み込み。
- **言語切替**：`data-ja` / `data-en` 属性 + `lang` トグルボタンによるシンプルな JS 実装。`localStorage` で記憶。
- **画像**：プレースホルダー（CSS グラデ or unsplash 風 picsum）で構築、後で差し替え可能。

## Steps

### Phase 1: 基盤セットアップ
1. `index.html` を作成（セマンティックHTML、`<header>` `<main>` `<section>` `<footer>`、JA/EN 両言語のテキストを `data-ja`/`data-en` で埋め込み、`lang="ja"` を初期値に）
2. `assets/css/style.css` を作成（CSS 変数でカラーパレット定義：`--color-bg:#fafaf7`, `--color-text:#2d3a2e`, `--color-accent:#5b8c5a`（緑）, `--color-wood:#a87b4f`（木）、Noto Serif JP + Inter フォント、余白広めのナチュラル設計）
3. `assets/js/main.js` を作成（言語切替、スムーススクロール、ナビのスクロール時挙動、IntersectionObserver でセクションフェードイン）

### Phase 2: コンテンツ実装（Phase 1 後、各セクションは並列に作業可）
4. **ヘッダー/ナビ**：ロゴテキスト「神山まるごと高専」+ ナビ（About / Curriculum / Access）+ JA/EN トグル
5. **トップ（ヒーロー）**：フルスクリーン背景、キャッチコピー大きめ表示、スクロール誘導アイコン
6. **学校について**：理念・特色（テクノロジー × デザイン × 起業家精神 などダミー、3カラムカード）
7. **カリキュラム・学び**：学年別／領域別の概要を縦タイムラインまたはアコーディオン
8. **アクセス・お問い合わせ**：所在地（徳島県名西郡神山町）・連絡先プレースホルダー・地図埋め込み枠（`<iframe>` 用のプレースホルダー div）
9. **フッター**：コピーライト、SNS リンクプレースホルダー

### Phase 3: 公開準備
10. `README.md` を更新（プロジェクト概要、ローカル確認方法、GitHub Pages の URL）
11. `.nojekyll` を配置（Jekyll 処理を無効化し、`assets/` フォルダが確実に配信されるように）
12. GitHub Pages 設定手順を README に明記（Settings → Pages → Source: main / root）

## Relevant files
- `index.html`（新規）— サイト本体、全セクションのマークアップ、JA/EN テキスト
- `assets/css/style.css`（新規）— カラー変数、タイポ、レイアウト、レスポンシブ（モバイル：768px ブレイクポイント）
- `assets/js/main.js`（新規）— 言語切替、スクロール演出
- `.nojekyll`（新規）— GitHub Pages 用
- `README.md`（更新）— セットアップ・公開手順

## Verification
1. ローカルで `python3 -m http.server` を実行し、`http://localhost:8000` で表示確認
2. ブラウザのレスポンシブモードで モバイル/タブレット/デスクトップ表示を確認
3. JA/EN トグルで全テキストが切り替わること、リロード後も言語が保持されること
4. Lighthouse でアクセシビリティ・パフォーマンスをチェック（目標 90+）
5. main に push 後、GitHub Pages の URL（`https://kiahmerritt.github.io/ghcp-school-intro260422/`）で表示確認

## Decisions
- **含む**：1ページ構成、JA/EN 切替、ダミーコンテンツ、ナチュラル系デザイン、root デプロイ
- **除外**：CMS連携、お問い合わせフォームのバックエンド処理（`mailto:` リンクのみ）、公式情報の正確な転記（後で差し替え前提のダミー）

## Further Considerations
1. **ファビコン/OGP画像**：今は省略するか、絵文字ベースの簡易ファビコン（🌿）を入れるか。推奨：絵文字ファビコンで軽く対応。
2. **お問い合わせ**：フォーム機能が要るか。推奨：当面は `mailto:` のみ（フォームは Formspree 等の外部サービスが必要なため別途検討）。
3. **画像素材**：将来差し替える前提で Unsplash の神山/自然系の無料画像をリンクで仮設置するか、CSS グラデのみにするか。推奨：CSS グラデ（外部依存ゼロを維持）。
