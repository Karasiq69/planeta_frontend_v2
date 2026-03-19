'use client'

import * as React from 'react'

import {
  AutosizeTextarea,
  type AutosizeTextAreaRef,
} from '@/components/ui/autosize-textarea'

type AppTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'ref'
> & {
  maxHeight?: number
  minHeight?: number
  keyboardText?: string
  iconComponent?: React.ReactNode
}

const AppTextarea = React.forwardRef<AutosizeTextAreaRef, AppTextareaProps>(
  ({ keyboardText, iconComponent, ...props }, ref) => {
    return (
      <AutosizeTextarea
        ref={ref}
        keyboardText={keyboardText ?? ''}
        iconComponent={iconComponent ?? <></>}
        {...props}
      />
    )
  }
)
AppTextarea.displayName = 'AppTextarea'

export { AppTextarea, type AppTextareaProps }
