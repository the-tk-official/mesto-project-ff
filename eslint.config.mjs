import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      'eslint-plugin-prettier': eslintPluginPrettier,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]);
