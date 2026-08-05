import { CodeBlock } from '@/components/shared/code-block'

const code = `import { parseClient } from 'client-parser'

const client = parseClient(
  request.headers.get('user-agent'),
)

client.device.type   // "mobile"
client.browser.name  // "Chrome"
client.confidence    // "high"`

export function QuickStart() {
    return (
        <section className="mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-11 border-t py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
                <p className="font-mono text-[10px] tracking-[.12em] text-blue-600 uppercase">
                    One function to begin
                </p>
                <h2 className="font-display mt-3 text-4xl leading-[1.08] font-semibold tracking-[-.045em] sm:text-5xl">
                    From string to useful signal.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                    Use a direct User-Agent string in any runtime, or pass headers and Client Hints
                    when your platform exposes them.
                </p>
                <a
                    href="/docs#quick-start"
                    className="mt-5 inline-block text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                    See every input form →
                </a>
            </div>
            <CodeBlock title="quick-start.ts" code={code} />
        </section>
    )
}
