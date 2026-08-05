import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist/**', 'coverage/**'] },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),
    prettier,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
        },
    },
    {
        files: ['test/**/*.ts'],
        rules: {
            '@typescript-eslint/require-await': 'off',
        },
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            globals: { ...globals.node },
        },
    }
);
