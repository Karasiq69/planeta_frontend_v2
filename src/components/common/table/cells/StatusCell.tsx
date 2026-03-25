import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface StatusCellProps {
  color: string
  tooltip?: string
  className?: string
}

const StatusCell = ({ color, tooltip, className }: StatusCellProps) => {
  const tab = <div className={cn('w-1.5 h-8 rounded-sm', color, className)} />

  if (!tooltip) return tab

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{tab}</TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { StatusCell }
