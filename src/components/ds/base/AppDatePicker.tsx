'use client'

import { DatePicker } from '@/components/ui/date-picker'
import { cn } from '@/lib/utils'

interface AppDatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

function AppDatePicker({ placeholder = 'Выберите дату', className, ...props }: AppDatePickerProps) {
  return <DatePicker placeholder={placeholder} className={cn('w-full', className)} {...props} />
}

export { AppDatePicker, type AppDatePickerProps }
