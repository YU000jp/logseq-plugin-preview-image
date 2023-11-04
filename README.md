# Logseq Plugin: Preview Image

[English](https://github.com/YU000jp/logseq-plugin-preview-image) | [日本語](https://github.com/YU000jp/logseq-plugin-preview-image/blob/main/README.ja.md)

Displays images on each page in a small size and displays a preview when hover over it.

## Overview

* When the cursor hovers over a footnote in content, it previews the content in the heading block.
* Copying and displaying content that should be displayed in another block.

## Usage

  1. Install `Preview` plugin (form Logseq Marketplace)
  1. Create a footnote in a block somewhere.
  1. Hover your mouse over a footnote to see a preview

## Demo

## Plugin Settings

- Close the preview when mouse leaves it
  - If this setting is disabled, the preview will not disappear. You will need to close it manually. This setting has no effect after 4 seconds.
  - `false` default
  - `true`

- Mouse leave ms delay (The shortest time to disappear)
  - Delay before closing the preview.
  - `600`
  - `800`
  - `1000`
  - `1200` default
  - `1400`
  - `1600`
  - `1800`
  - `2000`
  - `2500`

- Limit the number of previews to one
  - `false` > You can display multiple previews.
  - `true` default
  - `false`

- Close the preview when opening another page
  - `false` > The preview will be retained even if you open another page.
  - `true` default
  - `false`

- Maximum width of the preview
  - 200px < 1200px
  - `600` default

- Enable YouTube preview optimization
  - `true` default

## Info

License > [MIT](https://choosealicense.com/licenses/mit/)

Author > [@YU000jp](https://github.com/YU000jp)
