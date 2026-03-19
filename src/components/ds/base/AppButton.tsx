'use client'

import { Loader2, type LucideIcon } from 'lucide-react'
import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AppButtonProps extends ButtonProps {
  icon?: LucideIcon
  iconRight?: LucideIcon
  loading?: boolean
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ icon: Icon, iconRight: IconRight, loading, disabled, children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(className)}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" /> : Icon ? <Icon /> : null}
        {children}
        {IconRight && !loading ? <IconRight /> : null}
      </Button>
    )
  }
)
AppButton.displayName = 'AppButton'

export { AppButton, type AppButtonProps }
