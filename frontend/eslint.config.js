import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    ignores: [
      'dist/**',
      '.angular/**',
      'src/app/content.generated.ts',
      'src/app/content-index.generated.ts',
      'src/app/article-bodies.generated.ts',
      'src/app/article-bodies.generated/**',
    ],
  },
);
