# Tasks: 神山まるごと高専 紹介サイト

凡例: `[ ]` 未着手 / `[~]` 進行中 / `[x]` 完了

## Phase 1: 基盤整備(並列可)

- [x] **T-1.1** `.nojekyll` を作成(空ファイル) — *依存: なし*
- [x] **T-1.2** `assets/css/style.css` を作成 — *依存: なし*
  - CSS 変数(色・余白・フォント)
  - リセット最小限、`body` ベース
  - `.site-header` / `.site-nav` / `.lang-switch` / `.lead` / `.block` / `.figure__placeholder` / `.site-footer`
  - `.fade` / `.fade.is-visible` / `prefers-reduced-motion`
  - `@media (min-width: 768px)` のレイアウト調整
- [x] **T-1.3** `assets/js/fade.js` を作成 — *依存: なし*
  - IntersectionObserver による 1 回フェード
  - 非対応環境は即時 `is-visible`
- [x] **T-1.4** 共通ヘッダー / フッターの HTML パターンを確定 — *依存: なし*
  - `design.md` のスニペットを基準
  - JA/EN それぞれのリンク先テーブル(11 ページ × 2 方向)を一覧化

## Phase 2: 日本語版 5 ページ作成(Phase 1 に依存、ページ間は並列可)

- [x] **T-2.1** `index.html`(JA トップ) — リード + 各セクションへのリンク + 写真プレースホルダー
- [x] **T-2.2** `about/index.html` — 理念・沿革・基本情報(年号は `〔要確認〕`)
- [x] **T-2.3** `curriculum/index.html` — テクノロジー × デザイン × 起業家精神
- [x] **T-2.4** `campus/index.html` — キャンパスライフ・全寮制
- [x] **T-2.5** `access/index.html` — 所在地(`〔要確認〕`)+ 公式問合せ窓口リンク

## Phase 3: 英語版 5 ページ作成(Phase 2 に依存)

- [x] **T-3.1** `en/index.html`
- [x] **T-3.2** `en/about/index.html`
- [x] **T-3.3** `en/curriculum/index.html`
- [x] **T-3.4** `en/campus/index.html`
- [x] **T-3.5** `en/access/index.html`
  - すべて `<html lang="en">`、`Kamiyama Marugoto Kosen` 表記、`[to be confirmed]` プレースホルダー

## Phase 4: その他

- [x] **T-4.1** `404.html` を作成(JA/EN 両方の戻り導線) — *依存: Phase 1*
- [x] **T-4.2** `README.md` を更新(サイト概要・公開URL・差し替えポイント) — *依存: Phase 3*

## Phase 5: 検証(Phase 1〜4 に依存)

- [x] **T-5.1** `python3 -m http.server` でローカル起動し全 11 ページを巡回(全 200 OK)
- [x] **T-5.2** ヘッダーナビ・JA/EN 切替・フッターリンクの解決確認(curl で全URL 200)
- [ ] **T-5.3** 360 / 768 / 1280px のレイアウト崩れ確認(ブラウザでの目視確認はユーザー側)
- [x] **T-5.4** `<html lang>` / 見出し階層 / コントラスト比の簡易チェック(タグ整合性スクリプトで検証)
- [x] **T-5.5** `〔要確認〕` / `[to be confirmed]` を grep で網羅確認(26 件検出)

## Phase 6: 公開(ユーザー操作)

- [ ] **T-6.1** Settings → Pages → Source を `Deploy from a branch`、Branch を `main` / `(root)` に設定
- [ ] **T-6.2** 公開 URL `https://kiahmerritt.github.io/ghcp-school-intro260422/` で全ページ動作確認
- [ ] **T-6.3** プレースホルダーを公式情報で差し替え(運用)

## 完了条件

- 受け入れ基準(`requirements.md` の §受け入れ基準 1〜5)をすべて満たす
- すべてのタスクが `[x]` になっている
