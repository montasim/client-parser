import { ArrowRight } from 'lucide-react'

import { DocsSidebar, DocsToc } from '@/components/docs/docs-sidebar'
import { DocSection } from '@/components/docs/doc-section'
import { InstallCommand } from '@/components/home/install-command'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { CodeBlock } from '@/components/shared/code-block'
import { Button } from '@/components/ui/button'

const quickStart = `import { parseClient } from 'client-parser'

const client = parseClient(
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5...)',
)

console.log(client.device.type)  // "mobile"
console.log(client.browser.name) // "Chrome"
console.log(client.os.name)      // "iOS"
console.log(client.engine.name)  // "WebKit"
console.log(client.isMobile)     // true`

const serverExample = `import { parseClient } from 'client-parser'

const client = parseClient({
  headers: request.headers,
})`

const navigatorExample = `import { parseNavigator } from 'client-parser'

const client = await parseNavigator(navigator)`

const apiItems = [
    [
        'parseClient(input?)',
        'Synchronously classifies a User-Agent string or a ClientEvidence object.',
    ],
    [
        'parseNavigator(navigatorLike)',
        'Asynchronously collects browser evidence and classifies the result.',
    ],
    [
        'parseClientHintHeaders(headers)',
        'Normalizes Sec-CH-UA-* headers into the Client Hints shape.',
    ],
] as const

const resultRows = [
    ['device', 'type, name, vendor, model'],
    ['browser', 'name, version, major'],
    ['os', 'name, version, architecture'],
    ['engine', 'name, version'],
    ['bot', 'isBot, name, category'],
    ['source', 'user-agent, client-hints, headers, platform'],
    ['confidence', 'high, medium, low'],
] as const

export function DocsPage() {
    return (
        <>
            <SiteHeader docs />
            <div className="mx-auto grid w-[min(1400px,100%)] items-start gap-10 px-6 py-12 lg:grid-cols-[210px_minmax(0,810px)] xl:grid-cols-[210px_minmax(0,810px)_170px] xl:gap-16">
                <DocsSidebar />
                <main id="main-content" className="min-w-0">
                    <section id="introduction" className="scroll-mt-24 pb-16">
                        <p className="font-mono text-[10px] tracking-[.12em] text-blue-600 uppercase">
                            Documentation / Overview
                        </p>
                        <h1 className="font-display mt-5 text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.03] font-semibold tracking-[-.052em]">
                            Classify clients from the evidence you actually have.
                        </h1>
                        <p className="mt-6 text-base leading-7 text-slate-600">
                            client-parser is a tiny, type-safe client classifier for User-Agent
                            strings, Client Hints, and HTTP headers. It reports what it found, where
                            it found it, and how confident the classification is.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-2">
                            {['Zero dependencies', 'Node 18+', 'ESM + CommonJS', 'TypeScript'].map(
                                (fact) => (
                                    <span
                                        key={fact}
                                        className="rounded-full border bg-white px-2.5 py-1.5 font-mono text-[9px] text-slate-500 uppercase"
                                    >
                                        {fact}
                                    </span>
                                ),
                            )}
                        </div>
                        <div className="mt-7 border-l-[3px] border-blue-600 bg-blue-50 p-5">
                            <strong className="font-display text-sm">
                                Use classification responsibly.
                            </strong>
                            <p className="mt-1 text-xs leading-6 text-slate-600">
                                Use these signals for analytics, diagnostics, and presentation
                                hints—not authentication, authorization, or browser capability
                                checks.
                            </p>
                        </div>
                    </section>
                    <DocSection number="01" id="installation" title="Installation">
                        <p>Install from npm with your preferred package manager.</p>
                        <InstallCommand />
                    </DocSection>
                    <DocSection number="02" id="quick-start" title="Quick start">
                        <p>
                            Pass a User-Agent string to <code>parseClient</code>. Unavailable
                            details are omitted rather than filled with placeholders.
                        </p>
                        <CodeBlock code={quickStart} />
                        <p>
                            The default export is also <code>parseClient</code>. CommonJS consumers
                            can use <code>require('client-parser')</code>.
                        </p>
                    </DocSection>
                    <DocSection number="03" id="server" title="Server-side header parsing">
                        <p>
                            Pass a plain header object or any object with a Headers-compatible{' '}
                            <code>get()</code> method. Header names are case-insensitive.
                        </p>
                        <CodeBlock title="server.ts" code={serverExample} />
                        <p>
                            Supported headers include <code>Sec-CH-UA</code>, full versions, mobile,
                            platform, architecture, bitness, model, and WoW64.
                        </p>
                    </DocSection>
                    <DocSection number="04" id="client-hints" title="Browser Client Hints">
                        <p>
                            <code>parseNavigator</code> collects high-entropy hints when available
                            and falls back gracefully when they are denied or unsupported.
                        </p>
                        <CodeBlock title="browser.ts" code={navigatorExample} />
                        <div className="border-l-[3px] border-slate-400 bg-slate-100 p-5">
                            <strong className="font-display text-sm text-slate-900">
                                High-entropy hints are conditional.
                            </strong>
                            <p className="mt-1 text-xs leading-6">
                                The browser and server policy decide which values are exposed.
                                Always expect a partial result.
                            </p>
                        </div>
                    </DocSection>
                    <DocSection number="05" id="api" title="API reference">
                        <div className="border-t">
                            {apiItems.map(([api, description]) => (
                                <article key={api} className="border-b py-5">
                                    <code>{api}</code>
                                    <p className="mt-1">{description}</p>
                                </article>
                            ))}
                            <article className="border-b py-5">
                                <code>getDeviceType(input?)</code>
                                <span className="ml-2 rounded bg-amber-50 px-2 py-1 font-mono text-[8px] text-amber-700 uppercase">
                                    deprecated
                                </span>
                                <p className="mt-1">
                                    Compatibility alias for <code>parseClient</code>. Use the new
                                    name in new code.
                                </p>
                            </article>
                        </div>
                    </DocSection>
                    <DocSection number="06" id="result" title="Result shape">
                        <p>
                            The stable top-level result lets consumers use narrow signals without
                            reparsing raw input.
                        </p>
                        <div className="overflow-hidden rounded-lg border bg-white">
                            {resultRows.map(([field, values]) => (
                                <div
                                    key={field}
                                    className="grid min-h-13 grid-cols-[120px_1fr] items-center border-b px-4 last:border-b-0 sm:grid-cols-[150px_1fr]"
                                >
                                    <strong className="font-mono text-[11px] text-blue-800">
                                        {field}
                                    </strong>
                                    <span className="text-[11px]">{values}</span>
                                </div>
                            ))}
                        </div>
                    </DocSection>
                    <DocSection number="07" id="privacy" title="Accuracy & privacy">
                        <p>
                            User-Agent strings can be reduced, spoofed, or ambiguous. Client Hints
                            are structured but not universal. Use <code>source</code> and{' '}
                            <code>confidence</code> to account for those limits.
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                            {[
                                'No network requests',
                                'No stored data',
                                'No runtime dependencies',
                                'User-Agent capped at 8 KiB',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="rounded-lg border bg-white p-3 text-[11px]"
                                >
                                    <span className="mr-2 text-emerald-600">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </DocSection>
                    <DocSection number="08" id="migration" title="Migrate from 0.0.x">
                        <ul className="space-y-2">
                            {[
                                'Replace getDeviceType() with parseClient().',
                                'Read bot status from result.bot.isBot.',
                                'Expect form-factor device types such as mobile, tablet, and desktop.',
                                'Handle absent optional fields instead of “unknown” placeholders.',
                                'Import public TypeScript types directly from client-parser.',
                            ].map((item) => (
                                <li key={item} className="pl-1">
                                    <span className="mr-2 text-blue-600">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button asChild className="mt-2">
                            <a href="/#playground">
                                Open the playground <ArrowRight />
                            </a>
                        </Button>
                    </DocSection>
                </main>
                <DocsToc />
            </div>
            <SiteFooter />
        </>
    )
}
