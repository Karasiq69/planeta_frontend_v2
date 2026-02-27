'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PayrollsYearFilterProps {
  year: number
  onChange: (year: number) => void
}

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

const PayrollsYearFilter = ({ year, onChange }: PayrollsYearFilterProps) => (
  <Select value={year.toString()} onValueChange={(v) => onChange(Number(v))}>
    <SelectTrigger className='w-[120px]'>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {YEARS.map((y) => (
        <SelectItem key={y} value={y.toString()}>
          {y}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

export default PayrollsYearFilter
