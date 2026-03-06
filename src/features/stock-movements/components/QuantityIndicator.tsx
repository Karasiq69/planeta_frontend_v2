import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'

import { cn } from '@/lib/utils'

interface Props {
  quantity: number
  size?: 'sm' | 'md'
  className?: string
}

export const QuantityIndicator = ({ quantity, size = 'md', className }: Props) => {
  const isPositive = quantity > 0

  const sizeClass = size === 'sm' ? 'size-6' : 'size-[30px]'
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center',
      isPositive
        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        : 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
      sizeClass,
      className,
    )}>
      {isPositive
        ? <ArrowDownToLine size={iconSize} strokeWidth={2} />
        : <ArrowUpFromLine size={iconSize} strokeWidth={2} />
      }
    </div>
  )
}
