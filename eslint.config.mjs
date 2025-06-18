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
//   {
//   "extends": "next/core-web-vitals",
//   "rules": {
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
//       { 
//         "argsIgnorePattern": "^_",
//         "varsIgnorePattern": "^_",
//         "caughtErrorsIgnorePattern": "^_",
//         "args": "after-used",
//         "ignoreRestSiblings": true,
//         "vars": "all"
//       }
//     ],
//     "no-unused-vars": "off"
//   }
// }

{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  }
}
];

export default eslintConfig;
