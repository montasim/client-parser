import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] outline-none focus-visible:ring-3 focus-visible:ring-blue-500/25 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700',
                outline:
                    'border border-slate-200 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700',
                ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                light: 'bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-blue-50',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-12 px-5',
                icon: 'size-10',
            },
        },
        defaultVariants: { variant: 'default', size: 'default' },
    },
)

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Component = asChild ? Slot : 'button'
    return <Component className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
