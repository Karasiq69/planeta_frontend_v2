'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  full: 'sm:max-w-full',
} as const

type SheetSize = keyof typeof sizeClasses

interface AppSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  headerActions?: React.ReactNode
  side?: 'left' | 'right'
  size?: SheetSize
  className?: string
}

function AppSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  headerActions,
  side = 'right',
  size = 'sm',
  className,
}: AppSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={cn('flex flex-col gap-0 p-0', sizeClasses[size], className)}>
        <SheetHeader className={cn('p-6 pb-4', headerActions && 'flex flex-row items-center justify-between')}>
          <div>
            <SheetTitle className='text-left'>{title}</SheetTitle>
            {description && <SheetDescription className='text-left'>{description}</SheetDescription>}
          </div>
          {headerActions}
        </SheetHeader>
        <div className='flex-1 overflow-y-auto p-6 pt-0'>{children}</div>
        {footer && <SheetFooter className='p-6 pt-0'>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export { AppSheet, type AppSheetProps, type SheetSize }
