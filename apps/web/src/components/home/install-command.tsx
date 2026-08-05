import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import type { PackageManager } from '@/lib/constants'
import { INSTALL_COMMANDS } from '@/lib/constants'
import { cn, copyToClipboard } from '@/lib/utils'

const managers = Object.keys(INSTALL_COMMANDS) as Array<PackageManager>

export function InstallCommand({ className }: { className?: string }) {
    const [manager, setManager] = useState<PackageManager>('npm')
    const [copied, setCopied] = useState(false)

    async function copyCommand() {
        await copyToClipboard(INSTALL_COMMANDS[manager])
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
    }

    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border bg-white shadow-lg shadow-slate-900/5',
                className,
            )}
        >
            <div className="flex h-10 border-b pl-2" role="tablist" aria-label="Package manager">
                {managers.map((item) => (
                    <button
                        key={item}
                        type="button"
                        role="tab"
                        aria-selected={manager === item}
                        onClick={() => setManager(item)}
                        className={cn(
                            'min-w-16 border-b-2 border-transparent px-3 font-mono text-[11px] text-slate-500 transition-colors hover:text-blue-600',
                            manager === item && 'border-blue-600 bg-blue-50 text-blue-600',
                        )}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="flex min-h-14 items-center gap-4 px-4">
                <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">
                    <span className="text-blue-600">$</span> {INSTALL_COMMANDS[manager]}
                </code>
                <button
                    type="button"
                    onClick={copyCommand}
                    className="inline-flex items-center gap-1.5 rounded-md p-2 font-mono text-[10px] text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    aria-label="Copy installation command"
                >
                    {copied ? (
                        <Check className="size-3.5 text-emerald-600" />
                    ) : (
                        <Copy className="size-3.5" />
                    )}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
        </div>
    )
}
