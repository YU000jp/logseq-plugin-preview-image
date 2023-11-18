import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n


// plugin settings function
/**
 * Defines the plugin settings schema for Preview Image plugin.
 * @returns An array of settings objects.
 */
export const pluginSettings = () => logseq.useSettingsSchema([

  // Image Size feature

  {
    key: "imageSizeMaxHeading",
    type: "heading",
    title: t("'Limit large image size' feature"),
    description: "",
    default: "",
  },
  {// enable: set image size max
    key: "imageSizeMaxBoolean",
    type: "boolean",
    title: t("Enable"),
    description: t("false > Maximum size as usual"),
    default: true,
  },
  {
    key: "imageSizeMaxHome",
    title: t("Journals > width > large image max-size"),
    type: "number",
    default: "45",
    description: "`300` < `660` default < `800` [px]",
    inputAs: "range",
  },
  {
    key: "imageSizeMaxPage",
    title: t("Pages > width > large image max-size"),

    type: "number",
    default: "45",
    description: "`300` < `1050` default < `1200` [px]",
    inputAs: "range",
  },


  // Preview Image feature

  {
    key: "previewImageHeading",
    type: "heading",
    title: t("'Preview image' feature"),
    description: "",
    default: "",
  },
  {// preview image enable
    key: "previewImage",
    type: "boolean",
    title: t("Enable"),
    description: "",
    default: true,
  },
  {
    // mouse enter ms delay
    key: "mouseEnterDelay",
    type: "enum",
    title: t("[ms] Mouse enter delay (The shortest time to appear)"),
    description: t("Delay before opening preview"),
    default: "1400",
    enumChoices: [
      "1200",
      "1400",
      "1800",
      "2200",
      "2600",
      "3000",
      "3400",
    ],
  },
  {
    // close the Preview when mouse leave it
    key: "closePreviewMouseLeave",
    type: "boolean",
    title: t("Close the preview when mouse leave it."),
    description: t("When the cursor is a ➖ mark, if move it outside the preview window, the window will disappear. If this setting is disabled, the preview will not disappear. You will need to close it manually."),
    default: true,
  },
  {
    // mouse leave ms delay
    key: "closeMouseLeaveDelay",
    type: "enum",
    title: t("[ms] Mouse leave delay (The shortest time to disappear)"),
    description: t("Delay before closing preview"),
    default: "1400",
    enumChoices: [
      "1200",
      "1400",
      "1600",
      "1800",
      "2000",
    ],
  },
  {
    key: "timeUntilOff",
    type: "enum",
    title: t("[ms] Time until it does not disappear even if the mouse is removed"),
    description: t("After this number of seconds has elapsed, it will not disappear even if move the mouse away."),
    default: "3500",
    enumChoices: [
      "2500",
      "3000",
      "3500",
      "4000",
      "4500",
      "5000",
      "5500",
      "6000",
    ],
  },
  {
    // limit the number of previews to one
    key: "limitPreview",
    type: "boolean",
    title: t("Limit the number of previews to one"),
    description: t("False > You can display multiple previews."),
    default: true,
  },
  {
    // close the preview when open other page
    key: "closePreviewWhenOpenPage",
    type: "boolean",
    title: t("Close the preview when open other page"),
    description: t("False > The preview will be retained even if you open another page."),
    default: true,
  },
  {
    // max width of preview
    key: "previewImageWidth",
    type: "number",
    title: t("Maximum width of preview"),
    description: "400px < 1200px",
    inputAs: "range",
    default: "60",
  },
  {
    // enable YouTube preview optimization
    key: "youtubePreview",
    type: "boolean",
    title: t("Enable YouTube preview optimization"),
    description: t("Prevents it from becoming horizontally long."),
    default: true,
  },
])
