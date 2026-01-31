// @ts-check
import { config } from "@repo/eslint-config/nestjs";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
];
