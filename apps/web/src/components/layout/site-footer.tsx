import { Logo } from '@/components/brand/logo'
import { SITE } from '@/lib/constants'

export function SiteFooter() {
    return (
        <footer className="mx-auto flex min-h-28 w-[min(1180px,calc(100%-2rem))] flex-col items-start justify-center gap-5 py-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <Logo className="text-slate-950" />
            <p>MIT licensed · built by Mohammad Montasim-Al-Mamun Shuvo</p>
            <nav className="flex gap-6 font-semibold text-slate-900" aria-label="Footer navigation">
                <a href="/docs">Docs</a>
                <a href={SITE.repositoryUrl}>GitHub</a>
                <a href={SITE.npmUrl}>npm</a>
            </nav>
        </footer>
    )
}
