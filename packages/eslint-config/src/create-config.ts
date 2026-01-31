import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";

import antfu from "@antfu/eslint-config";

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

export const sharedRules: TypedFlatConfigItem = {
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
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

export async function createConfig(
  options: OptionsConfig = {},
  ...userConfigs: (TypedFlatConfigItem | TypedFlatConfigItem[])[]
): Promise<TypedFlatConfigItem[]> {
  return antfu(
    {
      ...sharedOptions,
      ...options,
    },
    sharedRules,
    ...userConfigs,
  );
}
