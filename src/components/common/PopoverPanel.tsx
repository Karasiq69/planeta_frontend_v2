import React from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

type PopoverPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
  title: string
  subtitle?: string
  /** Секция между шапкой и списком (инпут, фильтры и т.д.) */
  middle?: React.ReactNode
  /** Контент скролл-области */
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const PopoverPanel = ({
  open,
  onOpenChange,
  trigger,
  title,
  subtitle,
  middle,
  children,
  align = 'end',
  side = 'bottom',
}: PopoverPanelProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="w-96 p-0 overflow-hidden">
        <div className="bg-muted/40 border-b px-3 py-2.5">
          <p className="text-sm font-semibold tracking-tight">{title}</p>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {middle && (
          <>
            <div className="p-3">{middle}</div>
            <Separator />
          </>
        )}
        <ScrollArea type="scroll" className="flex max-h-72 flex-col overflow-y-auto">
          <div className="flex-1">{children}</div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverPanel
