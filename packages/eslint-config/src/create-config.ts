import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";

import antfu from "@antfu/eslint-config";
import cspellPlugin from "@cspell/eslint-plugin";

/**
 * Shared ESLint options for shinejs packages.
 */
export const sharedOptions: OptionsConfig = {
  type: "lib",
  typescript: true,
  formatters: true,
  isInEditor: false,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
};

/**
 * Shared ESLint plugins for shinejs packages.
 */
export const sharedPlugins: TypedFlatConfigItem[] = [{
  plugins: { "@cspell": cspellPlugin },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      { cspell: { allowCompoundWords: true }, customWordListFile: "./custom-words.txt" },
    ],
  },
}];

/**
 * Shared ESLint rules for shinejs packages.
 */
export const sharedRules: TypedFlatConfigItem = {
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "antfu/no-top-level-await": ["off"],
    "n/prefer-global/process": ["off"],
    "n/no-process-env": ["error"],
    "perfectionist/sort-imports": [
      "error",
      {
        tsconfig: { rootDir: "." },
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: [/\.md$/],
      },
    ],
  },
};

/**
 * Creates an ESLint configuration based on antfu's config with shinejs defaults.
 *
 * @param options Configuration options for @antfu/eslint-config.
 * @param userConfigs Additional flat config items.
 * @returns A promise resolving to the ESLint configuration array.
 */
export async function createConfig(
  options: OptionsConfig = {},
  ...userConfigs: (TypedFlatConfigItem | TypedFlatConfigItem[])[]
): Promise<TypedFlatConfigItem[]> {
  return antfu(
    {
      ...sharedOptions,
      ...options,
    },
    ...sharedPlugins,
    sharedRules,
    ...userConfigs,
  );
}
