import { cn, formatPrice } from '@/lib/utils'

interface MoneyCellProps {
  value: number | string | undefined | null
  className?: string
}

const MoneyCell = ({ value, className }: MoneyCellProps) => {
  if (value === undefined || value === null) {
    return <span className='text-muted-foreground'>—</span>
  }

  return (
    <span className={cn('text-sm tabular-nums text-nowrap', className)}>
      {formatPrice(value)}
    </span>
  )
}

export { MoneyCell }
