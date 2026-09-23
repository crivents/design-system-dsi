/** @type {import("stylelint").Config} */
export default {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern":
      "^[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "flex-direction",
      "align-items",
      "justify-content",
      "gap",
      "width",
      "height",
      "padding",
      "margin",
      "box-sizing",
      "background",
      "border",
      "font-size",
      "color",
    ],
    unspecified: "bottom",
  },
};
