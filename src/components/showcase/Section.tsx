import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  title: string
  description: string
  children: ReactNode
}

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  )
}

interface DemoProps {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}

export function Demo({ label, hint, className, children }: DemoProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5 flex flex-col gap-4',
        className
      )}
    >
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3 flex-1 content-start">
        {children}
      </div>
    </div>
  )
}
