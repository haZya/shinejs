import { createConfig } from "@shinejs/eslint-config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

export default createConfig(
  {
    type: "app",
    nextjs: true,
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    ...betterTailwindcss.configs.recommended,
  },
  {
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unknown-classes": "off",
    },
  },
);
