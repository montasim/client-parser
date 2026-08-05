import { ArrowDown, ArrowRight } from 'lucide-react'

import { ClassificationTrace } from '@/components/home/classification-trace'
import { InstallCommand } from '@/components/home/install-command'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'

export function Hero() {
    return (
        <>
            <section className="mx-auto grid min-h-[680px] w-[min(1180px,calc(100%-2rem))] items-center gap-14 py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-20 lg:py-20">
                <div>
                    <p className="mb-6 flex items-center gap-2.5 font-mono text-[10px] tracking-[.1em] text-slate-600 uppercase">
                        <span className="size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
                        v{SITE.version} · zero runtime dependencies
                    </p>
                    <h1 className="font-display text-[clamp(2.7rem,5.1vw,4.5rem)] leading-[.99] font-semibold tracking-[-.058em]">
                        Know the client.
                        <br />
                        <span className="text-blue-600">Keep the uncertainty.</span>
                    </h1>
                    <p className="my-7 max-w-xl text-base leading-7 text-slate-600">
                        A tiny, type-safe classifier for User-Agent strings, Client Hints, and HTTP
                        headers. Get browser, OS, device, engine, and bot signals—with confidence
                        built in.
                    </p>
                    <InstallCommand className="max-w-xl" />
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <a href="#playground">
                                Try the parser <ArrowDown />
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <a href="/docs">
                                Read the docs <ArrowRight />
                            </a>
                        </Button>
                    </div>
                </div>
                <ClassificationTrace />
            </section>
            <div className="border-y bg-white">
                <div className="mx-auto flex min-h-[70px] w-[min(1180px,calc(100%-2rem))] flex-wrap items-center justify-center gap-x-10 gap-y-4 py-5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    <span>ESM + CJS</span>
                    <i className="size-1 rounded-full bg-slate-300" />
                    <span>TypeScript native</span>
                    <i className="size-1 rounded-full bg-slate-300" />
                    <span>Browser + Node + Edge</span>
                    <i className="size-1 rounded-full bg-slate-300" />
                    <span>Privacy-first</span>
                </div>
            </div>
        </>
    )
}
