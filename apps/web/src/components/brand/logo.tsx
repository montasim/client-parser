import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
    return (
        <Link
            to="/"
            className={cn('inline-flex items-center gap-2.5', className)}
            aria-label="client-parser home"
        >
            <svg aria-hidden="true" className="size-8" viewBox="0 0 32 32" fill="none">
                <path
                    fill="#155EEF"
                    d="M4 2h20a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H10a8 8 0 0 1-8-8V4a2 2 0 0 1 2-2Z"
                />
                <path
                    fill="white"
                    d="M10.35 18.6c-2.36 0-4.05-1.56-4.05-3.94 0-2.4 1.72-3.96 4.06-3.96 1.1 0 2.08.32 2.82.98l-1.22 1.55a2.28 2.28 0 0 0-1.5-.56c-1.14 0-1.91.78-1.91 1.97 0 1.2.76 1.99 1.94 1.99.56 0 1.1-.2 1.52-.57l1.2 1.54a4.1 4.1 0 0 1-2.86 1Zm3.98 2.62V10.86h2.12v.91c.5-.7 1.31-1.07 2.25-1.07 2.02 0 3.42 1.62 3.42 3.96 0 2.32-1.4 3.94-3.43 3.94-.86 0-1.65-.3-2.16-.92v3.54h-2.2Zm3.87-4.53c1.03 0 1.72-.83 1.72-2.03 0-1.22-.7-2.05-1.72-2.05-1.02 0-1.72.83-1.72 2.05 0 1.2.7 2.03 1.72 2.03Z"
                />
            </svg>
            <span className="font-display text-[15px] font-semibold tracking-[-0.025em]">
                client-parser
            </span>
        </Link>
    )
}
