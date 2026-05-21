import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import featureSliced from '@conarti/eslint-plugin-feature-sliced';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'eslint.config.js', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
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
      // FSD: запрещает абсолютные пути там, где должны быть относительные внутри слайса
      '@conarti/feature-sliced/absolute-relative': 'error',

      // Заставляет использовать алиас @/ между слоями
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../../*', '../../../*'],
              message:
                'Используй абсолютный импорт через алиас @/ между слоями (FSD).',
            },
          ],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
);
