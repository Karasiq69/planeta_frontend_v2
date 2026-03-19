import { Inbox, type LucideIcon } from 'lucide-react'

import { AppButton } from '../base/AppButton'

interface AppEmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}

function AppEmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: AppEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className ?? ''}`}>
      <Icon className="size-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && (
        <AppButton variant="outline" size="sm" className="mt-4" onClick={action.onClick}>
          {action.label}
        </AppButton>
      )}
    </div>
  )
}

export { AppEmptyState, type AppEmptyStateProps }
