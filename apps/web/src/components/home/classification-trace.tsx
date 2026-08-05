import { Smartphone } from 'lucide-react'

export function ClassificationTrace() {
    return (
        <div className="shadow-panel overflow-hidden rounded-2xl border border-slate-300 bg-white">
            <div className="flex h-12 items-center justify-between border-b bg-slate-50/80 px-5 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                <span>classification.trace</span>
                <span className="inline-flex items-center gap-2 text-emerald-600">
                    <i className="size-1.5 rounded-full bg-current" />
                    live
                </span>
            </div>
            <div className="m-5 mb-0 flex items-center gap-3 rounded-lg border bg-slate-50 p-4">
                <span className="font-mono text-[10px] text-slate-400">01</span>
                <div className="min-w-0">
                    <small className="font-mono text-[8px] tracking-widest text-slate-400">
                        INPUT · USER-AGENT
                    </small>
                    <p className="mt-1 truncate font-mono text-[10px] text-slate-600">
                        Mozilla/5.0 (iPhone; CPU iPhone OS 17_5…
                    </p>
                </div>
            </div>
            <div className="flex h-12 items-center justify-center gap-3 font-mono text-[7px] tracking-[.14em] text-slate-400">
                <span className="h-px w-12 bg-slate-200" />
                CLASSIFYING EVIDENCE
                <span className="h-px w-12 bg-slate-200" />
            </div>
            <div className="mx-5 overflow-hidden rounded-xl border border-blue-200">
                <div className="flex items-center gap-4 bg-blue-50 p-4">
                    <span className="grid h-13 w-10 place-items-center rounded-lg border-2 border-blue-600 text-blue-600">
                        <Smartphone className="size-5" />
                    </span>
                    <div className="grid">
                        <small className="font-mono text-[8px] tracking-widest text-slate-400">
                            DEVICE
                        </small>
                        <strong className="font-display text-xl">Mobile</strong>
                        <span className="font-mono text-[9px] text-slate-500">Apple iPhone</span>
                    </div>
                </div>
                <dl className="grid grid-cols-2">
                    {(
                        [
                            ['Browser', 'Chrome', '126'],
                            ['System', 'iOS', '17.5'],
                            ['Engine', 'WebKit', ''],
                            ['Bot', '● No', ''],
                        ] as const
                    ).map(([label, value, detail], index) => (
                        <div key={label} className={cnTraceCell(index)}>
                            <dt className="font-mono text-[8px] tracking-wider text-slate-400 uppercase">
                                {label}
                            </dt>
                            <dd
                                className={
                                    label === 'Bot'
                                        ? 'font-display mt-1.5 text-xs font-semibold text-emerald-600'
                                        : 'font-display mt-1.5 text-xs font-semibold'
                                }
                            >
                                {value}{' '}
                                {detail ? (
                                    <small className="font-mono text-[9px] font-normal text-slate-400">
                                        {detail}
                                    </small>
                                ) : null}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="mt-5 flex h-16 items-center justify-between border-t bg-slate-50/60 px-5">
                <TraceFact label="Evidence" value="user-agent" />
                <TraceFact label="Confidence" value="● high" success />
            </div>
        </div>
    )
}

function cnTraceCell(index: number) {
    return `min-h-16 border-t p-3.5 ${index % 2 === 0 ? 'border-r' : ''}`
}

function TraceFact({
    label,
    value,
    success = false,
}: {
    label: string
    value: string
    success?: boolean
}) {
    return (
        <div className="grid gap-1">
            <span className="font-mono text-[8px] text-slate-400 uppercase">{label}</span>
            <strong
                className={
                    success ? 'font-mono text-[10px] text-emerald-600' : 'font-mono text-[10px]'
                }
            >
                {value}
            </strong>
        </div>
    )
}
