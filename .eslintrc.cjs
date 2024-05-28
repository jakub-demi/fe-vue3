/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  overrides: [
    {
      files: [
        "**/__tests__/*.{cy,spec}.{js,ts}",
        "cypress/e2e/**/*.{cy,spec}.{js,ts}",
        "cypress/support/**/*.{js,ts}"
      ],
      "extends": [
        "plugin:cypress/recommended"
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "no-unused-vars": "warn",
  }
}
