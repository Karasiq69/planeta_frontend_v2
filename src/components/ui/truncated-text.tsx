'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TruncatedTextProps {
  text: string
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function TruncatedText({ text, className = '', side = 'top' }: TruncatedTextProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`truncate ${className}`}>{text}</div>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <span>{text}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
