export const SITE = {
    name: 'client-parser',
    title: 'client-parser — Type-safe User-Agent and Client Hints classifier',
    description:
        'Classify browsers, operating systems, devices, engines, and bots from User-Agent strings, Client Hints, and HTTP headers—with evidence and confidence.',
    url: 'https://client-parser.netlify.app',
    repositoryUrl: 'https://github.com/montasim/client-parser',
    npmUrl: 'https://www.npmjs.com/package/client-parser',
    authorUrl: 'https://montasim-dev.web.app',
    version: '0.2.0',
} as const

export const INSTALL_COMMANDS = {
    npm: 'npm install client-parser',
    pnpm: 'pnpm add client-parser',
    yarn: 'yarn add client-parser',
    bun: 'bun add client-parser',
} as const

export type PackageManager = keyof typeof INSTALL_COMMANDS

export const NAV_ITEMS = [
    { label: 'Playground', href: '/#playground' },
    { label: 'Why it works', href: '/#why' },
    { label: 'Docs', href: '/docs' },
] as const
