'use client'

import { DateRangePicker } from '@/components/ui/date-range-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCashRegisters } from '@/features/payments/api/queries'
import { fromISODate, toISODate } from '@/lib/format-date'

import type { PaymentsQueryParams } from '@/features/payments/types'

interface PaymentsFiltersProps {
  filters: PaymentsQueryParams
  onChange: (filters: PaymentsQueryParams) => void
}

const ALL_VALUE = '__all__'

const PaymentsFilters = ({ filters, onChange }: PaymentsFiltersProps) => {
  const { data: cashRegisters } = useCashRegisters()

  return (
    <>
      <Select
        value={filters.status ?? ALL_VALUE}
        onValueChange={(v) =>
          onChange({ ...filters, status: v === ALL_VALUE ? undefined : (v as PaymentsQueryParams['status']) })
        }
      >
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Статус' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Все статусы</SelectItem>
          <SelectItem value='completed'>Оплачен</SelectItem>
          <SelectItem value='cancelled'>Отменён</SelectItem>
          <SelectItem value='pending'>Ожидает</SelectItem>
          <SelectItem value='refunded'>Возврат</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.cashRegisterId?.toString() ?? ALL_VALUE}
        onValueChange={(v) =>
          onChange({ ...filters, cashRegisterId: v === ALL_VALUE ? undefined : Number(v) })
        }
      >
        <SelectTrigger className='w-auto min-w-[180px]'>
          <SelectValue placeholder='Касса' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Все кассы</SelectItem>
          {cashRegisters?.map((cr) => (
            <SelectItem key={cr.id} value={cr.id.toString()}>
              {cr.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DateRangePicker
        value={{ from: fromISODate(filters.dateFrom), to: fromISODate(filters.dateTo) }}
        onChange={(range) =>
          onChange({ ...filters, dateFrom: toISODate(range?.from), dateTo: toISODate(range?.to) })
        }
      />
    </>
  )
}

export default PaymentsFilters
