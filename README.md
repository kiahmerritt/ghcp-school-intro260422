# 神山まるごと高等専門学校 紹介サイト

公開情報をベースにまとめた、神山まるごと高等専門学校の非公式紹介ページ。素のHTML+CSSで構築し、GitHub Pages で配信する。

公開URL(予定): https://kiahmerritt.github.io/ghcp-school-intro260422/

## 構成

```
/                  日本語トップ
/about/            学校について
/curriculum/       カリキュラム
/campus/           キャンパス
/access/           アクセス
/en/               英語版(同構成)
/assets/css/       共通スタイル(単一CSS)
/assets/js/        共通スクリプト(スクロールフェードのみ)
/404.html          未検出ページ
.nojekyll          Jekyll処理を無効化
```

## ローカル確認

```bash
python3 -m http.server 8000
# http://localhost:8000/ にアクセス
```

## GitHub Pages 公開手順

1. リポジトリの `Settings` → `Pages` を開く
2. `Build and deployment` の `Source` を **Deploy from a branch** に設定
3. `Branch` を `main` / `(root)` に設定して `Save`
4. 数分後、上部に表示される URL でアクセスできる

## 編集の指針

- 本サイトに記載の固有名詞・年号・住所などで `〔要確認〕` `[to be confirmed]` のあるものは、公式サイトを参照のうえ事実確認して差し替えること
- 写真は `figure__placeholder` 要素を `<img>` に置き換えればよい(`assets/img/` 配下を想定)
- カラー・タイポグラフィは `assets/css/style.css` 冒頭の CSS変数で集中管理