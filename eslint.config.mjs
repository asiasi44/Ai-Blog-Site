import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // allow any for now
      "@typescript-eslint/no-explicit-any": "off",
      // disable ban on ts-ignore/ts-expect-error
      "@typescript-eslint/ban-ts-comment": "off",
      // unused vars should only warn
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];

export default eslintConfig;