import { parseClient, parseNavigator } from 'client-parser'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { ClientInfo } from 'client-parser'

import type { SampleName } from '@/lib/samples'
import { Button } from '@/components/ui/button'
import { USER_AGENT_SAMPLES } from '@/lib/samples'

const sampleNames = Object.keys(USER_AGENT_SAMPLES) as Array<SampleName>

export function Playground() {
    const [userAgent, setUserAgent] = useState<string>(USER_AGENT_SAMPLES.Chrome)
    const [result, setResult] = useState<ClientInfo>(() => parseClient(USER_AGENT_SAMPLES.Chrome))
    const [duration, setDuration] = useState('0.08 ms')

    function classify(value: string = userAgent) {
        const start = performance.now()
        setResult(parseClient(value))
        setDuration(`${Math.max(performance.now() - start, 0.01).toFixed(2)} ms`)
    }

    async function useBrowserEvidence() {
        const start = performance.now()
        const browserResult = await parseNavigator(navigator)
        setUserAgent(navigator.userAgent)
        setResult(browserResult)
        setDuration(`${Math.max(performance.now() - start, 0.01).toFixed(2)} ms`)
    }

    function selectSample(name: SampleName) {
        const value = USER_AGENT_SAMPLES[name]
        setUserAgent(value)
        classify(value)
    }

    return (
        <section id="playground" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-24 sm:py-28">
            <div className="mb-11 grid items-end gap-7 lg:grid-cols-[1fr_.72fr]">
                <div>
                    <p className="font-mono text-[10px] tracking-[.12em] text-blue-600 uppercase">
                        Interactive playground
                    </p>
                    <h2 className="font-display mt-3 text-4xl leading-[1.08] font-semibold tracking-[-.045em] sm:text-5xl">
                        Inspect the signal,
                        <br />
                        not just the string.
                    </h2>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                    Paste a User-Agent or use your browser’s available evidence. The result comes
                    directly from client-parser 0.2.0, including source and confidence.
                </p>
            </div>
            <div className="shadow-panel grid min-h-[560px] overflow-hidden rounded-2xl border border-slate-300 bg-white lg:grid-cols-[.92fr_1.08fr]">
                <div className="flex flex-col p-5 sm:p-7">
                    <div className="flex min-h-7 items-start justify-between font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                        <span>01 / Evidence</span>
                        <button
                            type="button"
                            onClick={useBrowserEvidence}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Use my browser
                        </button>
                    </div>
                    <label
                        htmlFor="user-agent"
                        className="font-display mt-4 mb-2 text-xs font-semibold"
                    >
                        User-Agent
                    </label>
                    <textarea
                        id="user-agent"
                        value={userAgent}
                        onChange={(event) => setUserAgent(event.target.value)}
                        spellCheck={false}
                        className="min-h-56 w-full resize-y rounded-lg border bg-slate-50 p-4 font-mono text-[11px] leading-7 text-slate-700 outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-500/10"
                    />
                    <div className="my-5 flex flex-wrap items-center gap-2">
                        <span className="mr-1 font-mono text-[9px] text-slate-400 uppercase">
                            Samples
                        </span>
                        {sampleNames.map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => selectSample(name)}
                                className="rounded-full border px-2.5 py-1.5 font-mono text-[9px] text-slate-600 hover:border-blue-500 hover:text-blue-600"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                    <Button
                        type="button"
                        className="mt-auto justify-between"
                        size="lg"
                        onClick={() => classify()}
                    >
                        Classify client <ArrowRight />
                    </Button>
                </div>
                <div className="min-w-0 bg-[#081326] p-5 text-slate-200 sm:p-7" aria-live="polite">
                    <div className="flex min-h-7 items-start justify-between font-mono text-[9px] tracking-wider text-slate-500 uppercase">
                        <span>02 / Typed result</span>
                        <span>{duration}</span>
                    </div>
                    <pre className="mt-4 overflow-auto font-mono text-[11px] leading-[1.8] text-blue-100">
                        <code>{JSON.stringify(result, null, 2)}</code>
                    </pre>
                </div>
            </div>
        </section>
    )
}
