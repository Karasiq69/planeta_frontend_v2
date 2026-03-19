'use client'

import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AsyncSelect, type AsyncSelectProps } from '@/components/ui/async-select'
import { cn } from '@/lib/utils'

interface SelectOption {
  label: string
  value: string
}

// Статичный режим
interface AppSelectStaticProps {
  options: SelectOption[]
  fetcher?: never
  renderOption?: never
  getOptionValue?: never
  getDisplayValue?: never
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
}

// Async режим — пробрасывает все пропсы AsyncSelect
interface AppSelectAsyncProps<T> extends Omit<AsyncSelectProps<T>, 'onChange' | 'value'> {
  options?: never
  value: string
  onChange: (value: string) => void
}

type AppSelectProps<T = unknown> = AppSelectStaticProps | AppSelectAsyncProps<T>

function AppSelect<T>(props: AppSelectProps<T>) {
  // Async mode
  if ('fetcher' in props && props.fetcher) {
    const { options: _, onChange, ...asyncProps } = props as AppSelectAsyncProps<T>
    return <AsyncSelect {...asyncProps} onChange={onChange} />
  }

  // Static mode
  const {
    options = [],
    value,
    onChange,
    placeholder = 'Выберите...',
    disabled,
    className,
  } = props as AppSelectStaticProps

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { AppSelect, type AppSelectProps, type SelectOption }
