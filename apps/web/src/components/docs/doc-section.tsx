import type { ReactNode } from 'react'

export function DocSection({
    number,
    id,
    title,
    children,
}: {
    number: string
    id: string
    title: string
    children: ReactNode
}) {
    return (
        <section
            id={id}
            className="grid scroll-mt-24 gap-3 border-t py-14 sm:grid-cols-[50px_1fr] sm:gap-7 sm:py-16"
        >
            <span className="pt-2 font-mono text-[10px] text-slate-400">{number}</span>
            <div className="min-w-0">
                <h2 className="font-display text-3xl font-semibold tracking-[-.035em]">{title}</h2>
                <div className="mt-3 space-y-5 text-[13px] leading-7 text-slate-600 [&>p>code]:rounded [&>p>code]:bg-blue-50 [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:font-mono [&>p>code]:text-[11px] [&>p>code]:text-blue-800">
                    {children}
                </div>
            </div>
        </section>
    )
}
