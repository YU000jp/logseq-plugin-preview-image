import "@logseq/libs"
import { LSPluginBaseInfo } from "@logseq/libs/dist/LSPlugin.user"
import { setup as l10nSetup, t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { handlePreview } from "./handlePreview"
import { CSSimageSize, calcRangeBarOnce, removeProvideStyle } from "./lib"
import { previewBlock } from "./previewBlock"
import { pluginSettings } from "./settings"
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
import ja from "./translations/ja.json"
import ko from "./translations/ko.json"
import nbNO from "./translations/nb-NO.json"
import nl from "./translations/nl.json"
import pl from "./translations/pl.json"
import ptBR from "./translations/pt-BR.json"
import ptPT from "./translations/pt-PT.json"
import ru from "./translations/ru.json"
import sk from "./translations/sk.json"
import tr from "./translations/tr.json"
import uk from "./translations/uk.json"
import zhCN from "./translations/zh-CN.json"
import zhHant from "./translations/zh-Hant.json"
const pluginId = logseq.baseInfo.id
export const key = "dialog"
const keyImageSize = "imageSize"


let processing = false // prevent duplicate call

/**
 * Initializes previews for images.
 * @param flag - An optional object containing a `pageLoad` boolean flag to indicate if the page is being loaded.
 */
const init = (flag: { pageLoad?: boolean }, nodeList?: NodeListOf<HTMLElement>) => {
  if (
    flag &&
    flag.pageLoad === true &&
    logseq.settings!.closePreviewWhenOpenPage === true
  ) {
    const ele = parent.document.querySelector(
      `body>div[data-ref="${logseq.baseInfo.id}"]`
    ) as HTMLDivElement | null
    if (ele) ele.remove()
  }

  if (processing) return // prevent duplicate call

  const fns = nodeList ? nodeList : parent.document.body.querySelectorAll(
    'div#root>div>main>div#app-container div.asset-container>img:not([data-image="true"])'
  ) as NodeListOf<HTMLImageElement> //target list of images
  if (fns.length === 0) return // no image

  processing = true // prevent duplicate call
  setTimeout(() => processing = false, 50) // prevent duplicate call


  for (const targetElement of fns) {

    // flag for editing block
    targetElement.dataset.image = "true"

    // flag for mouseleave event
    let mouseLeave = false
    targetElement.addEventListener("mouseleave", () => {
      mouseLeave = true
      targetElement.style.cursor = "unset"
      targetElement.title = ""
    }, { once: true })

    targetElement.addEventListener("mouseover", function (this: HTMLElement, event: MouseEvent) {

      this.style.cursor = "wait"
      // logseq.settings!.closeMouseLeaveDelay ms待機後にプレビューを表示する
      this.title = t("Wait for a while to show the preview.")

      // 3秒間待つ
      const time = setTimeout(() => {

        this.style.cursor = "unset"
        this.title = ""
        if ((parent.document.querySelector(`body>div[data-ref="${logseq.baseInfo.id}"]`) as Node | null)// if the preview is already open
          // limit the number of previews to one
          && logseq.settings!.limitPreview === true) {

          return
        } else {

          if (mouseLeave) {
            mouseLeave = false
            return
          }

          clearTimeout(time)

          // show preview
          handlePreview(this, event.clientX, event.clientY + 20, {})

        }
      }, logseq.settings!.closeMouseLeaveDelay as number)

    })

  } //end for
} //end init


let processingQuery = false // prevent duplicate call

// observer function
const observer = () => {
  /**
   * Selects the target node in the DOM tree using a CSS selector and returns it as a Node object.
   * @returns The target node as a Node object.
   */
  const targetNode = parent.document.body.querySelector("div#root>div>main>div#app-container") as Node

  const observer = new MutationObserver(() => {

    if (processingQuery) return // prevent duplicate call
    processingQuery = true
    setTimeout(() => processingQuery = false, 50) // 失敗したときのためにsetTimeoutでフラグを立てておく

    const nodeList = parent.document.body.querySelectorAll(
      'div#root>div>main>div#app-container div.asset-container>img:not([data-image="true"])'
    ) as NodeListOf<HTMLElement> //target list of images

    if (nodeList.length !== 0) init({}, nodeList)

    observer.disconnect()
    setTimeout(
      () => observer.observe(targetNode, { childList: true, subtree: true }),
      100
    )
  })

  // observer for all blocks (for the first time)
  observer.observe(targetNode, { childList: true, subtree: true })

  // logseq beforeunload event (plugin off)
  logseq.beforeunload(async () => {
    observer.disconnect()
  })
}


/**
 * The main function of the plugin.
 * It initializes the plugin settings and sets up the necessary event listeners.
 */
const main = async () => {

  //localization
  await l10nSetup({
    builtinTranslations: {
      //Full translations
      af,
      de,
      es,
      fr,
      id,
      it,
      ja,
      ko,
      "nb-NO": nbNO,
      nl,
      pl,
      "pt-BR": ptBR,
      "pt-PT": ptPT,
      ru,
      sk,
      tr,
      uk,
      "zh-CN": zhCN,
      "zh-Hant": zhHant,
    },
  })

  // init settings
  pluginSettings()

  // init
  logseq.App.onRouteChanged(() => init({ pageLoad: true })) //"onRouteChanged" is sometimes not called
  logseq.App.onPageHeadActionsSlotted(() => init({ pageLoad: true })) // duplicate call, but it's ok.

  // observer for all blocks
  observer()

  // preview block
  previewBlock()

  logseq.provideStyle(`
  body>div[data-ref="logseq-plugin-preview-image"]:hover {
    outline: 6px solid var(--ls-quaternary-background-color);
    outline-offset: 6px;
  }
  body>div#root>div>main {
    & article>div[data-id="logseq-plugin-preview-image"] {
      & div.heading-item {
        margin-top: 3em;
        border-top-width: 1px;
        border-bottom-width: 0;
        padding-top: 1em;
        &>h2 {
          margin-bottom: 0.5em;
        }
      }
      & div.desc-item {
        & p {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
        }
      }
    }
    & div.block-content div.asset-container button.asset-action-btn {
      font-size: .8em;
    }
  }
`)


  if (logseq.settings!.imageSizeMaxBoolean === true) {
    //新しい計算方法で求めて変更する
    if (logseq.settings?.imageSizeHome !== "")
      logseq.updateSettings({
        imageSizeMaxHome: calcRangeBarOnce(
          300,
          800,
          logseq.settings?.imageSizeHome
        ),
        imageSizeHome: "",
      })
    if (logseq.settings?.imageSizePage !== "")
      logseq.updateSettings({
        imageSizeMaxPage: calcRangeBarOnce(
          300,
          1200,
          logseq.settings?.imageSizePage
        ),
        imageSizePage: "",
      })
  }


  imageSizeLimit(logseq.settings?.imageSizeMaxHome, logseq.settings?.imageSizeMaxPage)


  logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {

    if (
      oldSet.imageSizeMaxHome !== newSet.imageSizeMaxHome
      || oldSet.imageSizeMaxPage !== newSet.imageSizeMaxPage
    ) {
      try {
        removeProvideStyle(keyImageSize)
      } finally {
        if (newSet.imageSizeMaxBoolean === true)
          imageSizeLimit(newSet.imageSizeMaxHome, newSet.imageSizeMaxPage)
      }
    }

    if (oldSet.imageSizeMaxBoolean === false && newSet.imageSizeMaxBoolean === true)
      imageSizeLimit(newSet.imageSizeMaxHome, newSet.imageSizeMaxPage)
    else
      if (oldSet.imageSizeMaxBoolean === true && newSet.imageSizeMaxBoolean === false)
        removeProvideStyle(keyImageSize)

  })

} //end main


const imageSizeLimit = (home: number, page: number) =>
  logseq.provideStyle({
    key: keyImageSize,
    style: CSSimageSize(home, page),
  })


logseq.ready(main).catch(console.error)
