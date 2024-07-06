import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { handlePreview } from "./handlePreview"


let processing = false // prevent duplicate call
export const previewBlock = () =>
    logseq.Editor.registerBlockContextMenuItem(t("Zoom this block"), async ({ uuid }) => {
        if (processing) return // prevent duplicate call
        const blockElement = parent.document.querySelector(
            logseq.settings!.blockZoomIncludeSubBlock === true ?
                `body>div#root>div>main div.ls-block[blockid="${uuid}"]` // include sub-blocks
                : `body>div#root>div>main div.block-content[blockid="${uuid}"]` // exclude sub-blocks
        ) as HTMLElement | null
        if (!blockElement) {
            logseq.UI.showMsg(t("Block not found"), "warning") // Not found block
            console.error("Block not found", uuid)
            return
        }
        processing = true // prevent duplicate call
        // x y 
        const { x, y } = blockElement.getBoundingClientRect()

        // preview
        handlePreview(blockElement, x, y, { isPreviewBlock: true, uuid })
        processing = false // prevent duplicate call
    })
