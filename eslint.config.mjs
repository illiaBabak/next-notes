import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  // Next.js + React + Hooks + Next rules (Core Web Vitals)
  ...nextVitals,

  // TypeScript rules from Next preset
  ...nextTs,

  // Your strict TS rules (type-aware)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // You can override React rules here (react plugin already comes via next config)
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
    },
  },

  // Disable formatting-related ESLint rules so Prettier owns formatting
  prettier,

  // Ignore build outputs (как в доках Next)
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
