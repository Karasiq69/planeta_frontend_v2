import { cn } from '@/lib/utils'

interface QuantityCellProps {
  value: number | string | null | undefined
  className?: string
}

const QuantityCell = ({ value, className }: QuantityCellProps) => {
  const qty = Number(value ?? 0)
  const isZero = qty === 0

  return (
    <span className={cn('text-sm tabular-nums', isZero ? 'text-red-400' : className)}>
      {qty} шт
    </span>
  )
}

export { QuantityCell }
