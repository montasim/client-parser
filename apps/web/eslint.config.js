import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    {
        ignores: [
            '.netlify/**',
            '.output/**',
            '.tanstack/**',
            'dist/**',
            'prototypes/**',
            '*.config.js',
            'src/routeTree.gen.ts',
        ],
    },
    ...tanstackConfig,
]
