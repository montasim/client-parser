import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { copyToClipboard } from '@/lib/utils'

export function CodeBlock({ code, title = 'TypeScript' }: { code: string; title?: string }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await copyToClipboard(code)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#081326] text-slate-200">
            <div className="flex min-h-11 items-center justify-between border-b border-slate-700 px-4 font-mono text-[10px] text-slate-400">
                <span>{title}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-md p-2 hover:bg-white/10 hover:text-white"
                >
                    {copied ? (
                        <Check className="size-3.5 text-emerald-400" />
                    ) : (
                        <Copy className="size-3.5" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-7">
                <code>{code}</code>
            </pre>
        </div>
    )
}
