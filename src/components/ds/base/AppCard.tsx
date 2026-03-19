import * as React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  actions?: React.ReactNode
}

const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ title, actions, children, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn(className)} {...props}>
        {(title || actions) && (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
            {title && <CardTitle>{title}</CardTitle>}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    )
  }
)
AppCard.displayName = 'AppCard'

export { AppCard, type AppCardProps }
