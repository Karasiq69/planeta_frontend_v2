'use client'

import { Minus, Plus } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface QuantityInputProps {
  className?: string
  containerClassName?: string
  defaultValue?: number
  minValue?: number
  maxValue?: number
  step?: number
  onChange?: (value: number) => void
  width?: string
  disabled?: boolean
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  (
    {
      className,
      containerClassName,
      defaultValue = 0,
      minValue = 0,
      maxValue = Number.MAX_SAFE_INTEGER,
      step = 1,
      onChange,
      width = 'w-32',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState<number>(defaultValue)

    const handleIncrement = () => {
      if (value + step <= maxValue) {
        const newValue = value + step
        setValue(newValue)
        onChange?.(newValue)
      }
    }

    const handleDecrement = () => {
      if (value - step >= minValue) {
        const newValue = value - step
        setValue(newValue)
        onChange?.(newValue)
      }
    }

    const decrementDisabled = value <= minValue || disabled
    const incrementDisabled = value >= maxValue || disabled

    return (
      <div ref={ref} className={cn('inline-flex', width, containerClassName)} {...props}>
        <div className='flex h-8 w-full overflow-hidden rounded-md border '>
          <Button
            type='button'
            variant='secondary'
            // size="icon"
            className='h-full rounded-l-md rounded-r-none border-0  shadow-none size-8'
            onClick={handleDecrement}
            disabled={decrementDisabled}
          >
            <Minus size={16} strokeWidth={2} className="text-muted-foreground" />
            <span className='sr-only'>Уменьшить {value}</span>
          </Button>
          <Input
            type='text'
            readOnly
            className={cn(
              'h-full flex-1 rounded-none border-0 border-x border-input text-center shadow-none',
              'focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              'tabular-nums',
              className
            )}
            value={value}
          />
          <Button
            type='button'
            variant='secondary'
            // size="icon"
            className='h-full rounded-r-md rounded-l-none border-l border-input border-0 shadow-none size-8'
            onClick={handleIncrement}
            disabled={incrementDisabled}
          >
            <Plus size={10} strokeWidth={2} className="text-muted-foreground" />
            <span className='sr-only'>Увеличить</span>
          </Button>
        </div>
      </div>
    )
  }
)

QuantityInput.displayName = 'QuantityInput'

export { QuantityInput }
