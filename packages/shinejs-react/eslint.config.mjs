import { createConfig } from "@shinejs/eslint-config";

export default createConfig(
  {
    react: true,
  },
  {
    rules: {
      "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
);
