import { SITE } from '@/lib/constants'

export function getPageMeta({
    title,
    description = SITE.description,
    path = '/',
}: {
    title: string
    description?: string
    path?: string
}) {
    const url = new URL(path, SITE.url).toString()

    return [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'author', content: 'Mohammad Montasim-Al-Mamun Shuvo' },
        { name: 'theme-color', content: '#155eef' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE.name },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: `${SITE.url}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
            property: 'og:image:alt',
            content: 'client-parser — Know the client. Keep the uncertainty.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${SITE.url}/og-image.png` },
    ]
}
