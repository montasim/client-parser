import { Link } from '@tanstack/react-router'
import { ExternalLink, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { NAV_ITEMS, SITE } from '@/lib/constants'

export function SiteHeader({ docs = false }: { docs?: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="relative z-50 mx-auto flex h-[78px] w-[min(1280px,calc(100%-2rem))] items-center border-b border-slate-200">
            <Logo />
            {docs ? (
                <>
                    <span className="mx-3 text-slate-300">/</span>
                    <span className="text-xs text-slate-500">Documentation</span>
                </>
            ) : null}
            <nav
                className="ml-auto hidden items-center gap-8 text-xs font-semibold md:flex"
                aria-label="Primary navigation"
            >
                {NAV_ITEMS.map((item) =>
                    item.href === '/docs' ? (
                        <Link
                            key={item.href}
                            to="/docs"
                            activeProps={{ className: 'text-blue-600' }}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <a key={item.href} href={item.href} className="hover:text-blue-600">
                            {item.label}
                        </a>
                    ),
                )}
                <Button asChild variant="outline" size="sm">
                    <a href={SITE.repositoryUrl} target="_blank" rel="noreferrer">
                        GitHub <ExternalLink />
                    </a>
                </Button>
            </nav>
            <button
                type="button"
                className="ml-auto grid size-10 place-items-center md:hidden"
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
            >
                {menuOpen ? <X /> : <Menu />}
            </button>
            {menuOpen ? (
                <nav
                    className="absolute top-[66px] right-0 flex w-56 flex-col rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold shadow-2xl md:hidden"
                    aria-label="Mobile navigation"
                >
                    {NAV_ITEMS.map((item) =>
                        item.href === '/docs' ? (
                            <Link
                                key={item.href}
                                to="/docs"
                                className="rounded-lg px-3 py-2.5 hover:bg-slate-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-lg px-3 py-2.5 hover:bg-slate-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ),
                    )}
                    <a
                        href={SITE.repositoryUrl}
                        className="mt-1 flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-100"
                    >
                        GitHub <ExternalLink className="size-4" />
                    </a>
                </nav>
            ) : null}
        </header>
    )
}
