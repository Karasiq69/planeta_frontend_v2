'use client'

import { Search, X } from 'lucide-react'
import * as React from 'react'

import { AppButton } from '../base/AppButton'
import { AppInput } from '../base/AppInput'

interface AppFilterBarProps {
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }
  filters?: React.ReactNode
  onReset?: () => void
  className?: string
}

function AppFilterBar({ search, filters, onReset, className }: AppFilterBarProps) {
  return (
    <div className={`flex items-center gap-3 px-4 pt-4 shrink-0 ${className ?? ''}`}>
      {search && (
        <AppInput
          icon={Search}
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder ?? 'Поиск...'}
          className="max-w-xs"
        />
      )}
      {filters}
      {onReset && (
        <AppButton variant="ghost" size="sm" onClick={onReset} icon={X}>
          Сбросить
        </AppButton>
      )}
    </div>
  )
}

export { AppFilterBar, type AppFilterBarProps }
