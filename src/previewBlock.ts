import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { handlePreview } from "./handlePreview"


let processing = false // prevent duplicate call
export const previewBlock = () =>
    logseq.Editor.registerBlockContextMenuItem(t("Preview this block"), async ({ uuid }) => {
        if (processing) return // prevent duplicate call
        const blockElement = parent.document.querySelector(`body>div#root>div>main div.block-content[blockid="${uuid}"]`) as HTMLElement | null
        if (!blockElement) {
            logseq.UI.showMsg(t("Block not found"), "warning") // Not found block
            return
        }
        processing = true // prevent duplicate call
        // x y 
        const { x, y } = blockElement.getBoundingClientRect()

        // preview
        handlePreview(blockElement, x, y, { isPreviewBlock: true, uuid })
        processing = false // prevent duplicate call
    })
