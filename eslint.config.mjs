import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "lib",
    typescript: true,
    react: true,
    formatters: true,
    isInEditor: false,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["apps/demo"],
  },
  {
    rules: {
      "react-hooks-extra/no-direct-set-state-in-use-effect": ["off"],
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
          ignore: ["\\.md$"],
        },
      ],
    },
  },
);
