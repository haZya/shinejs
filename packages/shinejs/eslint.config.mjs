import { createConfig } from "@shinejs/eslint-config";

export default createConfig(
  {
    react: true,
  },
  {
    files: ["src/react/**/*.{ts,tsx}"],
    rules: {
      "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
);
