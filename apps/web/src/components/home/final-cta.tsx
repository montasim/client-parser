import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'

export function FinalCta() {
    return (
        <section className="bg-blue-600 text-white">
            <div className="mx-auto grid min-h-[355px] w-[min(1180px,calc(100%-2rem))] content-center gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                    <p className="font-mono text-[10px] tracking-[.12em] text-blue-200 uppercase">
                        Small package. Clear answers.
                    </p>
                    <h2 className="font-display mt-4 text-4xl leading-none font-semibold tracking-[-.045em] sm:text-6xl">
                        Ship the signal,
                        <br />
                        not the guesswork.
                    </h2>
                </div>
                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                    <Button asChild size="lg" variant="light">
                        <a href="/docs">
                            Start with the docs <ArrowRight />
                        </a>
                    </Button>
                    <a href={SITE.npmUrl} className="px-3 text-center text-xs font-bold">
                        View on npm ↗
                    </a>
                </div>
            </div>
        </section>
    )
}
