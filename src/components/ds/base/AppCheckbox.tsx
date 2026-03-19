'use client'

import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface AppCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label: string
}

const AppCheckbox = React.forwardRef<HTMLButtonElement, AppCheckboxProps>(
  ({ label, id, className, ...props }, ref) => {
  const generatedId = React.useId()
  const checkboxId = id || generatedId

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Checkbox ref={ref} id={checkboxId} {...props} />
      <Label htmlFor={checkboxId} className="cursor-pointer font-normal">
        {label}
      </Label>
    </div>
  )
})
AppCheckbox.displayName = 'AppCheckbox'

export { AppCheckbox, type AppCheckboxProps }
