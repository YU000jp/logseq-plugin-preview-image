
export const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(
    `style[data-injected-style^="${className}"]`
  ) as HTMLStyleElement | null
  if (doc) doc.remove()
}

//for setting UI
const calcRangeBarForSettingUI = (
  min: number,
  max: number,
  value: number
): number => {
  if (value < 1) value = 1
  return Math.round((value * (max - min)) / 100 + min)
}

//レンジバー導入のため設定数値の互換用
export const calcRangeBarForSettingOnce = (
  min: number,
  max: number,
  value: number
): number => Math.round(((value - min) / (max - min)) * 100)


export const CSSimageSize = (home: number, page: number): string => {
  //Home: 300px < number > 800px
  //Page: 300px < number > 1200px
  return `
body[data-page="home"]>div#root>div>main div.asset-container img {
    max-width: ${calcRangeBarForSettingUI(300, 800, home)}px;
    object-fit: scale-down;
}
body[data-page="page"]>div#root>div>main div.asset-container img {
    max-width: ${calcRangeBarForSettingUI(300, 1200, page)}px;
    object-fit: scale-down;
}
`
  //object-fit https://catnose.me/learning/css/object-fit
  //画像を縮小するが拡大はしない scale-down
}

