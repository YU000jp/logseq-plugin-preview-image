# Logseq プラグイン: Preview Image

[English](https://github.com/YU000jp/logseq-plugin-preview-image) | [日本語](https://github.com/YU000jp/logseq-plugin-preview-image/blob/main/README.ja.md)

1. 「大きな画像のサイズを制限する」機能
1. 「画像にカーソルを合わせて、画像をプレビューする」機能

[![latest release version](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-preview-image)](https://github.com/YU000jp/logseq-plugin-preview-image/releases)
[![License](https://img.shields.io/github/license/YU000jp/logseq-plugin-preview-image?color=blue)](https://github.com/YU000jp/logseq-plugin-preview-image/LICENSE)
[![Downloads](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-preview-image/total.svg)](https://github.com/YU000jp/logseq-plugin-preview-image/releases)

![previewImage](https://github.com/YU000jp/logseq-plugin-preview-image/assets/111847207/b60a59ac-8ead-4272-b286-69302e5acb9e)

## 使用方法

1. `Preview Image` プラグインをインストールします（Logseq マーケットプレースから入手できます）。
1. 通常のブロックに何か画像を配置します。
1. その画像にマウスを合わせるとプレビューが表示されます。
   > カーソルが➖マークの場合、プレビューウィンドウの外にカーソルを移動するとウィンドウが消えます。
---

## プラグイン設定

- "大きな画像のサイズ制限" 機能 > 有効
  - `true`（デフォルト）
  - `false` > 通常の最大サイズ

- "ジャーナル > 画像の最大サイズ (幅)"
  - `45`（デフォルト）
  - `300` < `660`（デフォルト） < `800` [px]

- "ページ > 画像の最大サイズ (幅)"
  - `45`（デフォルト）
  - `300` < `1050`（デフォルト） < `1200` [px]

- "画像のプレビュー" 機能 > 有効
  - `true`（デフォルト）
  - `false` > 通常の最大サイズ

- "プレビュー表示までの最短時間 [ミリ秒]"
  - `1400`（デフォルト）
  - `1200`, `1400`, `1800`, `2200`, `2600`, `3000`, `3400`

- "マウスが離れたときにプレビューを閉じる"
  - `true`（デフォルト）
  - `false` > 手動で閉じる必要があります。

- "プレビューが消えるまでの最短時間 [ミリ秒]"
  - `1400`（デフォルト）
  - `1200`, `1400`, `1600`, `1800`, `2000`

- "マウスアウトでプレビューが消えなくなるまでの時間 [ミリ秒]"
  - `3500`（デフォルト）
  - `2500`, `3000`, `3500`, `4000`, `4500`, `5000`, `5500`, `6000`

- プレビューの数を制限
  - `true`（デフォルト）
  - `false` > 複数のプレビューを表示できます。

- 別のページを開いたとき、プレビューを閉じる
  - `true`（デフォルト）
  - `false` > 別のページを開いてもプレビューが維持されます。

- プレビューの最大幅
  - `60`（デフォルト）
  - 400px < 1200px

- YouTubeのプレビュー最適化を有効にする
  - `true`（デフォルト）
  - `false` > 通常の最大サイズ

---

## 情報

アイコン > [icooon-mono.com](https://icooon-mono.com/00039-%e6%a4%9c%e7%b4%a2%e7%94%a8%e3%81%ae%e8%99%ab%e7%9c%bc%e9%8f%a1%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90/)

製作者 > [@YU000jp](https://github.com/YU000jp)

<a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
