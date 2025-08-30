import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/**
 * ESLint Flat Config with Prettier integration
 */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // backend project (use node globals, not browser)
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      "prettier/prettier": "error", // ensures Prettier formatting issues are flagged
    },
  },
];
