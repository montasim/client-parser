import { createFileRoute } from '@tanstack/react-router'

import { FeatureGrid } from '@/components/home/feature-grid'
import { FinalCta } from '@/components/home/final-cta'
import { Hero } from '@/components/home/hero'
import { Playground } from '@/components/home/playground'
import { QuickStart } from '@/components/home/quick-start'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SITE } from '@/lib/constants'
import { getPageMeta } from '@/lib/seo'

export const Route = createFileRoute('/')({
    head: () => ({
        meta: getPageMeta({ title: SITE.title }),
        links: [{ rel: 'canonical', href: SITE.url }],
    }),
    component: HomePage,
})

function HomePage() {
    return (
        <>
            <SiteHeader />
            <main id="main-content">
                <Hero />
                <Playground />
                <FeatureGrid />
                <QuickStart />
                <FinalCta />
            </main>
            <SiteFooter />
        </>
    )
}
