import { t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n


// plugin settings function
/**
 * Defines the plugin settings schema for Preview Image plugin.
 * @returns An array of settings objects.
 */
export const pluginSettings = () => logseq.useSettingsSchema([
  {// preview image enable
    key: "previewImage",
    type: "boolean",
    title: t("Enable Preview Image"),
    description: t("False > Disable Preview Image"),
    default: true,
  },
  {
    // mouse enter ms delay
    key: "mouseEnterDelay",
    type: "enum",
    title: t("Mouse enter ms delay (The shortest time to appear)"),
    description: t("Delay before opening preview"),
    default: "2200",
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
    title: t("Close the preview when mouse leave it"),
    description: t(
      "If this setting is disabled, the preview will not disappear. You will need to close it manually."
    ),
    default: true,
  },
  {
    // mouse leave ms delay
    key: "CloseMouseLeaveDelay",
    type: "enum",
    title: t("Mouse leave ms delay (The shortest time to disappear)"),
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
    title: t("Time until it does not disappear even if the mouse is removed"),
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
    description: t(
      "False > The preview will be retained even if you open another page."
    ),
    default: true,
  },
  {
    // max width of preview
    key: "maxWidth",
    type: "number",
    title: t("Maximum width of preview"),
    description: "200px < 1200px",
    inputAs: "range",
    default: "80",
  },
  {
    // enable YouTube preview optimization
    key: "youtubePreview",
    type: "boolean",
    title: t("Enable YouTube preview optimization"),
    description: "",
    default: true,
  },
])
