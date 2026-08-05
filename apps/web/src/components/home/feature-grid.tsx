import { Braces, RadioTower, ShieldCheck } from 'lucide-react'

const features = [
    {
        icon: RadioTower,
        label: 'CH',
        title: 'Structured when possible',
        body: 'Client Hints take priority when available, with User-Agent fallback everywhere else.',
        href: '/docs#client-hints',
        link: 'Client Hints',
    },
    {
        icon: Braces,
        label: '{}',
        title: 'Types at every edge',
        body: 'A stable result shape covers device, browser, OS, engine, bots, evidence, and confidence.',
        href: '/docs#result',
        link: 'Result shape',
    },
    {
        icon: ShieldCheck,
        label: '0×',
        title: 'Nothing phones home',
        body: 'No runtime dependencies, no network requests, no stored data, and an 8 KiB input cap.',
        href: '/docs#privacy',
        link: 'Privacy notes',
    },
]

export function FeatureGrid() {
    return (
        <section id="why" className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-28">
            <p className="font-mono text-[10px] tracking-[.12em] text-blue-600 uppercase">
                Designed for honest answers
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-.045em] sm:text-5xl">
                Classification without false certainty.
            </h2>
            <div className="mt-11 grid border-y lg:grid-cols-3">
                {features.map(({ icon: Icon, label, title, body, href, link }, index) => (
                    <article
                        key={title}
                        className={`py-8 lg:px-10 lg:py-9 ${index > 0 ? 'border-t lg:border-t-0 lg:border-l' : ''} ${index === 0 ? 'lg:pl-0' : ''}`}
                    >
                        <span className="grid size-10 place-items-center rounded-lg bg-blue-50 font-mono text-[10px] text-blue-600">
                            <Icon className="size-4" />
                            <span className="sr-only">{label}</span>
                        </span>
                        <h3 className="font-display mt-6 text-lg font-semibold">{title}</h3>
                        <p className="mt-2 text-[13px] leading-6 text-slate-600">{body}</p>
                        <a
                            href={href}
                            className="mt-5 inline-block text-xs font-bold text-blue-600 hover:text-blue-800"
                        >
                            {link} →
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}
