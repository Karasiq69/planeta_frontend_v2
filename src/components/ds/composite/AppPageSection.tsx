import * as React from 'react'

interface AppPageSectionProps {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function AppPageSection({ title, actions, children, className }: AppPageSectionProps) {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}

export { AppPageSection, type AppPageSectionProps }
