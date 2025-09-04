// eslint.config.js
// Flat config for ESLint v9+
//
// Features:
// - TypeScript (no type-aware rules by default: fast)
// - React + Hooks + A11y
// - Vite React Refresh hints
// - Simple import sort + unused imports cleanup
// - Prettier for formatting (ESLint won't fight Prettier)
// - Targeted overrides for shadcn/ui files and Tailwind config

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import a11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // Ignore build artifacts & misc
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      'node_modules',
      '.vite',
      '.next',
      'out',
      '.husky',
      '.idea',
      // generated API clients, etc:
      'src/generated/**',
    ],
  },

  // Base JS & TS recommended (fast: not type-aware)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Main project rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // If you later want type-aware rules, set `project` & `tsconfigRootDir` in an override.
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': a11y,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // --- React & Hooks ---
      'react/react-in-jsx-scope': 'off', // new JSX transform
      'react/prop-types': 'off', // using TS for types
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Fast Refresh (warn if you export non-components from component files)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // --- Imports & organization ---
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React and core libs first
            ['^react$', '^react-dom$', '^react', '^@?\\w'],
            // 2. Side-effect imports
            ['^\\u0000'],
            // 3. Aliases (e.g., @/...)
            ['^@/'],
            // 4. Relative imports: same folder, parent, then up
            ['^\\./', '^\\../', '^\\../../'],
            // 5. Styles
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // --- Unused imports/vars ---
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // --- TS strictness knobs (tune as you like) ---
      // Reduce friction from generated or WIP code:
      '@typescript-eslint/no-explicit-any': 'warn', // change to 'error' to enforce
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'never', allowObjectTypes: 'never' },
      ],

      // --- Prettier: turn off formatting-related lint rules ---
      // (prettier config loaded at the end disables stylistic rules)
    },
  },

  // ---- Overrides ----

  // 1) shadcn/ui & other UI component libs:
  // Many components export helpers alongside components; relax Refresh rule.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      // shadcn templates sometimes use "empty" interface extending HTML props; allow type alias instead in code,
      // or relax the rule here if you prefer:
      // '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // 2) Tailwind config (allow require or CJS bits)
  {
    files: ['tailwind.config.{js,cjs,ts}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // 3) Vite config & other Node scripts
  {
    files: [
      '.commitlintrc.cjs',
      'vite.config.{js,ts}',
      'postcss.config.{js,ts}',
      'scripts/**/*.{js,ts}',
      '*.config.{js,ts}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      'no-undef': 'off',
    },
  },

  // 4) Test files (adjust framework env if you use Vitest/Jest)
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node, // or ...globals.vitest if you use Vitest
      },
    },
    rules: {
      // Tests often need dev-only patterns
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Put Prettier LAST to disable conflicting style rules
  prettier,
];
