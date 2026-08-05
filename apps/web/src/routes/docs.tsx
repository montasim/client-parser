import { createFileRoute } from '@tanstack/react-router'

import { DocsPage } from '@/components/docs/docs-page'
import { SITE } from '@/lib/constants'
import { getPageMeta } from '@/lib/seo'

const description =
    'Install client-parser and learn its User-Agent, Client Hints, header parsing, result types, privacy model, and migration API.'

export const Route = createFileRoute('/docs')({
    head: () => ({
        meta: getPageMeta({ title: `Documentation — ${SITE.name}`, description, path: '/docs' }),
        links: [{ rel: 'canonical', href: `${SITE.url}/docs` }],
    }),
    component: DocsPage,
})
