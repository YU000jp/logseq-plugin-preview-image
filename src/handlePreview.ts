import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { key } from "./"


// model function
/**
 * Handles the preview of a image when the user hovers over it.
 * @param element - The HTML element of the image.
 * @param event - The mouse event that triggered the preview.
 * @returns void
 */
export const handlePreview = async (element: HTMLImageElement, event: MouseEvent) => {

  if (logseq.settings!.previewImage === false) return

  // random key 4桁
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const UIKey = logseq.settings!.limitPreview === true
    ? key
    : random

  // preview UI
  const maxWidth = logseq.settings!.maxWidth * 10 + 200
  logseq.provideUI({
    key: UIKey,
    template: `
            <div style="padding: 8px; overflow: auto;" title="">
              <div>
              ${element.outerHTML}
              </div>
            </div>
            ${logseq.settings!.youtubePreview === false
        ? ""
        : `
            <style>
              body>div[data-ref="${logseq.baseInfo.id}"]:hover {
                outline: 6px solid var(--ls-quaternary-background-color);
                outline-offset: 6px;
              }
              /* YouTube preview optimization */
              body>div#${logseq.baseInfo.id}--${UIKey} div.is-paragraph:has(>iframe[src*="youtube"]) {
                position: relative;
                min-height: 330px;
                min-width: 588px;
                width:100%;
                height:0;
                padding-top: 56.25%;
                margin-bottom: 1em;
              
                &>iframe[src*="youtube"] {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                }
              }
            </style>
            `}
          `,

    style: {
      left: `${event.clientX}px`,
      top: `${event.clientY + 20}px`,
      width: "auto",
      minWidth: "200px",
      maxWidth: `${maxWidth}px`,
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

  // close the preview when mouse leave it
  if (logseq.settings!.closePreviewMouseLeave === true)
    closePreviewMouseLeave(UIKey)
}


/**
 * Closes the preview when the mouse leaves the preview element.
 * @param UIkey - The unique identifier of the preview element.
 */
export const closePreviewMouseLeave = (UIkey: string) => setTimeout(() => {
  const ele = parent.document.querySelector(
    `body>div#${logseq.baseInfo.id}--${UIkey}`
  ) as HTMLDivElement | null
  if (ele === null) return
  ele.addEventListener("mouseleave", eventListener, { once: true })
  setTimeout(() => ele.removeEventListener("mouseleave", eventListener),
    logseq.settings!.timeUntilOff)
  function eventListener(this: HTMLElement) {
    this.remove()
  }
}, Number(logseq.settings!.CloseMouseLeaveDelay | 10))

