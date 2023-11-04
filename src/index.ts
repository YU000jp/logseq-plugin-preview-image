import "@logseq/libs"
import { setup as l10nSetup } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import { pluginSettings } from "./settings"
import { handlePreview } from "./handlePreview"

// import af from "./translations/af.json";
// import de from "./translations/de.json";
// import es from "./translations/es.json";
// import fr from "./translations/fr.json";
// import id from "./translations/id.json";
// import it from "./translations/it.json";
// import ja from "./translations/ja.json";
// import ko from "./translations/ko.json";
// import nbNO from "./translations/nb-NO.json";
// import nl from "./translations/nl.json";
// import pl from "./translations/pl.json";
// import ptBR from "./translations/pt-BR.json";
// import ptPT from "./translations/pt-PT.json";
// import ru from "./translations/ru.json";
// import sk from "./translations/sk.json";
// import tr from "./translations/tr.json";
// import uk from "./translations/uk.json";
// import zhCN from "./translations/zh-CN.json";
// import zhHant from "./translations/zh-Hant.json";
const pluginId = logseq.baseInfo.id
export const key = "preview-image-dialog"

let processing = false // prevent duplicate call

/**
 * Initializes previews for images.
 * @param flag - An optional object containing a `pageLoad` boolean flag to indicate if the page is being loaded.
 */
const init = (flag?: { pageLoad?: boolean }) => {
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

  const fns = parent.document.body.querySelectorAll(
    'div#root>div>main>div#app-container div.asset-container>img:not([data-image="true"])'
  ) as NodeListOf<HTMLImageElement> //target list of images
  if (fns.length === 0) return // no image

  processing = true // prevent duplicate call


  query() // query for new images


  for (const targetElement of fns) {

    // null means the image is not defined or collapsed
    if (targetElement === null) continue

    // flag for editing block
    targetElement.dataset.image = "true"

    // add event listener
    const mouseOver = (element: HTMLImageElement) => {
      element.addEventListener(
        "mouseenter",
        function (this: HTMLImageElement, e: MouseEvent) {
          // show preview
          setTimeout(() => {
            if ((parent.document.querySelector(`body>div[data-ref="${logseq.baseInfo.id}"]`) as Node | null)// if the preview is already open
              && logseq.settings!.limitPreview === true) return
            // limit the number of previews to one
            else
              handlePreview(this, e) // show preview
          }, 1000)
        },
        { once: true }
      )

      element.addEventListener(
        "mouseleave",
        () => { // Close the preview when mouse leave it
          setTimeout(() => mouseOver(element), 2000) // event listener
        }, { once: true }
      )
    }

    // targetElementにマウスが乗ってから1秒後にmouseOverを実行
    targetElement.addEventListener("mouseenter", function (this: HTMLImageElement) {
      setTimeout(() => mouseOver(this), 1000)// first time
    }, { once: true })
  }

  processing = false // prevent duplicate call
}

// observer function
const observer = () => {
  /**
   * Selects the target node in the DOM tree using a CSS selector and returns it as a Node object.
   *
   * @returns The target node as a Node object.
   */
  const targetNode = parent.document.querySelector(
    "body>div#root>div>main>div#app-container"
  ) as Node
  const observer = new MutationObserver(() => {

    query()

    observer.disconnect()
    setTimeout(
      () => observer.observe(targetNode, { childList: true, subtree: true }),
      500
    )
  })

  // observer for all blocks (for the first time)
  setTimeout(
    () => observer.observe(targetNode, { childList: true, subtree: true }),
    3000
  )

  // logseq beforeunload event (plugin off)
  logseq.beforeunload(async () => {
    observer.disconnect()
  })
}


let processingQuery = false // prevent duplicate call
const query = async () => {
  if (processingQuery) return // prevent duplicate call
  setTimeout(() => processingQuery = true, 300) // 失敗したときのためにsetTimeoutでフラグを立てておく

  const fns = parent.document.body.querySelectorAll(
    'div#root>div>main>div#app-container div.asset-container>img:not([data-image="true"])'
  ) as NodeListOf<Element>
  if (fns.length === 0) return // no image

  // logseq.UI.showMsg(
  //   t("Checked images") + "\n\nPreview Image"  + t("plugin"),
  //   "success",
  //   {
  //     timeout: 2200,
  //   }
  // ) // show message
  init()

}


/**
 * The main function of the plugin.
 * It initializes the plugin settings and sets up the necessary event listeners.
 */
const main = async () => {
  console.info(`#${pluginId}: MAIN`)

  // localization
  // await l10nSetup({
  //   builtinTranslations: {
  //     //Full translations
  //     af,
  //     de,
  //     es,
  //     fr,
  //     id,
  //     it,
  //     ja,
  //     ko,
  //     "nb-NO": nbNO,
  //     nl,
  //     pl,
  //     "pt-BR": ptBR,
  //     "pt-PT": ptPT,
  //     ru,
  //     sk,
  //     tr,
  //     uk,
  //     "zh-CN": zhCN,
  //     "zh-Hant": zhHant,
  //   },
  // });

  // init settings
  pluginSettings()

  // init
  logseq.App.onRouteChanged(() => init({ pageLoad: true })) //"onRouteChanged" is sometimes not called
  logseq.App.onPageHeadActionsSlotted(() => init({ pageLoad: true })) // duplicate call, but it's ok.

  // observer for all blocks
  observer()
} //end main

logseq.ready(main).catch(console.error)
