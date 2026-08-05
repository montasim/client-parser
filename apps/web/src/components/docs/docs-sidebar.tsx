type DocsSection = {
    group: string
    items: ReadonlyArray<readonly [label: string, id: string]>
}

export const DOC_SECTIONS: ReadonlyArray<DocsSection> = [
    {
        group: 'Get started',
        items: [
            ['Introduction', 'introduction'],
            ['Installation', 'installation'],
            ['Quick start', 'quick-start'],
        ],
    },
    {
        group: 'Guides',
        items: [
            ['Server-side headers', 'server'],
            ['Browser Client Hints', 'client-hints'],
            ['Accuracy & privacy', 'privacy'],
        ],
    },
    {
        group: 'Reference',
        items: [
            ['API', 'api'],
            ['Result shape', 'result'],
            ['Migrate from 0.0.x', 'migration'],
        ],
    },
]

export function DocsSidebar() {
    return (
        <aside className="sticky top-28 hidden lg:block" aria-label="Documentation sections">
            <div className="flex justify-between rounded-lg border bg-white p-3 font-mono text-[9px] uppercase">
                <span className="text-slate-400">Current</span>
                <strong className="text-blue-600">v0.2.0</strong>
            </div>
            <nav className="mt-8">
                {DOC_SECTIONS.map((section) => (
                    <div key={section.group}>
                        <p className="mt-7 mb-2 font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                            {section.group}
                        </p>
                        {section.items.map(([label, id], index) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={`block rounded-md px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 ${section.group === 'Get started' && index === 0 ? 'bg-blue-50 font-bold text-blue-600' : ''}`}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export function DocsToc() {
    return (
        <aside className="sticky top-28 hidden border-l pl-5 xl:block" aria-label="On this page">
            <p className="mb-3 font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                On this page
            </p>
            {DOC_SECTIONS.flatMap((section) => section.items).map(([label, id]) => (
                <a
                    key={id}
                    href={`#${id}`}
                    className="block py-1.5 text-[10px] text-slate-500 hover:text-blue-600"
                >
                    {label}
                </a>
            ))}
        </aside>
    )
}
