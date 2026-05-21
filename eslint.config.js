import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import featureSliced from '@conarti/eslint-plugin-feature-sliced';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'eslint.config.js', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@conarti/feature-sliced': featureSliced,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // FSD: проверяет, что слой импортирует только из нижележащих
      '@conarti/feature-sliced/layers-slices': 'error',
      // FSD: запрещает импорт во внутренности слайса (только через index.ts)
      '@conarti/feature-sliced/public-api': 'error',
      // FSD: внутри одного слайса — относительные пути, между слоями — абсолютные через @/
      '@conarti/feature-sliced/absolute-relative': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
);
