import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface AppInputProps extends React.ComponentProps<'input'> {
  icon?: LucideIcon
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    if (Icon) {
      return (
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input ref={ref} className={cn('pl-10', className)} {...props} />
        </div>
      )
    }

    return <Input ref={ref} className={className} {...props} />
  }
)
AppInput.displayName = 'AppInput'

export { AppInput, type AppInputProps }
