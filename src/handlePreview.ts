import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { key } from "./"
import { calcRangeBar } from "./lib"


/**
 * Handles the preview of an HTML element.
 * @param element - The HTML element to preview.
 * @param left - The left position of the preview.
 * @param top - The top position of the preview.
 * @param flag - An object containing a flag to indicate if the preview is for a block.
 * @returns A Promise that resolves when the preview is handled.
 */
export const handlePreview = async (element: HTMLElement, left: number, top: number, flag: { isPreviewBlock?: boolean, uuid?: string }) => {

  if (logseq.settings!.previewImage === false // プレビューを無効にする設定項目
    && flag.isPreviewBlock !== true) return // ブロックのプレビューであることを示すフラグ

  // random key 複数のプレビューを開くことができるようにする設定項目
  const UIKey = logseq.settings!.limitPreview === true
    ? key
    : Math.floor(Math.random() * 10000).toString().padStart(4, '0')

  // preview UI
  const maxWidth = calcRangeBar(400, 1200, logseq.settings!.previewImageWidth as number) // プレビューの幅を設定する設定項目
  logseq.provideUI({
    key: UIKey,
    template: `
            <div title="">
              <div>
              ${element.outerHTML}
              </div>
            </div>
            ${logseq.settings!.youtubePreview === false
        ? ""
        : `
            <style>
              /* YouTube preview optimization */
              body>div#${logseq.baseInfo.id}--${UIKey}>div.ls-ui-float-content>div:has(iframe[src*="youtube"]) {
                position: relative;
                min-height: 330px;
                min-width: 588px;
                width:100%;
                height:0;
                overflow: auto;
                padding-top: 56.25%;
                margin-bottom: 1em;
              
                & iframe[src*="youtube"] {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                }
              }
              ${flag.uuid ? `
              body>div#root>div {
                &.light-theme>main>div span#dot-${flag.uuid}{
                    outline: 2px solid var(--ls-link-ref-text-color);
                }
                &.dark-theme>main>div span#dot-${flag.uuid}{
                    outline: 2px solid aliceblue;
                }
              }
              ` : ""}
            </style>
            `}
          `,

    style: {
      left: `${left}px`,
      top: `${top}px`,
      width: "auto",
      minWidth: "200px",
      maxWidth: `${maxWidth}px`,
      minHeight: "90px",
      height: "auto",
      padding: ".1em",
      backgroundColor: "var(--ls-primary-background-color)",
      color: "var(--ls-primary-text-color)",
      boxShadow: "1px 2px 5px var(--ls-secondary-background-color)",
    },
    attrs: {
      title: t("Zoom"),
    },
  })

  setTimeout(() => {
    // close the preview when mouse leave it
    if (logseq.settings!.closePreviewMouseLeave === true
      && flag.isPreviewBlock !== true) // ブロックのプレビューであることを示すフラグがオフの場合のみ
      closePreviewMouseLeave(UIKey)
  }, 50)

}


/**
 * Closes the preview when the mouse leaves the preview element.
 * @param UIkey - The unique identifier of the preview element.
 */
const closePreviewMouseLeave = (UIkey: string) => {

  const ele = parent.document.querySelector(`body>div#${logseq.baseInfo.id}--${UIkey}`) as HTMLDivElement | null
  if (ele === null) return

  ele.style.cursor = "grab"
  ele.title = ""

  setTimeout(() => {

    ele.style.cursor = "zoom-out"
    // マウスが離れたときにプレビューを閉じる
    ele.addEventListener("mouseleave", eventListener, { once: true })

    function eventListener(this: HTMLElement) {
      this.remove()
      clearTimeout(time)
    }

    // マウスが離れた時にプレビューを閉じる、という動作をキャンセルする
    const time = setTimeout(() => {
      ele.style.cursor = "unset"
      if (ele) ele.removeEventListener("mouseleave", eventListener)
    }, logseq.settings!.timeUntilOff as number) // ms

  }, Number(logseq.settings!.closeMouseLeaveDelay as number))
}