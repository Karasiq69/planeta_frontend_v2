'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'

import type { DateRange } from 'react-day-picker'

interface CarHistoryFiltersProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

const CarHistoryFilters = ({ dateRange, onDateRangeChange }: CarHistoryFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
      {dateRange?.from && (
        <Button variant="ghost" size="icon" onClick={() => onDateRangeChange(undefined)}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default CarHistoryFilters
