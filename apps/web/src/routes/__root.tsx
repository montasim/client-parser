import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { SITE } from '@/lib/constants'

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Browser, Node.js, Edge runtimes',
    description: SITE.description,
    url: SITE.url,
    softwareVersion: SITE.version,
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: SITE.repositoryUrl,
    author: {
        '@type': 'Person',
        name: 'Mohammad Montasim-Al-Mamun Shuvo',
        url: SITE.authorUrl,
    },
}

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        links: [
            { rel: 'stylesheet', href: appCss },
            { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
            },
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <html lang="en">
            <head>
                <HeadContent />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </head>
            <body>
                <a
                    href="#main-content"
                    className="fixed top-3 left-3 z-[100] -translate-y-24 bg-slate-950 px-4 py-2 text-sm text-white focus:translate-y-0"
                >
                    Skip to content
                </a>
                <Outlet />
                <script
                    src="https://www.supportkori.com/widget.js"
                    data-id="montasim"
                    data-message="Support montasim"
                    data-color="#FFDD00"
                    data-position="right"
                />
                <Scripts />
            </body>
        </html>
    )
}
