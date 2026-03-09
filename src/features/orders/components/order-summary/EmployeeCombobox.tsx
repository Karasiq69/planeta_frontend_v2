'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import type { Employee } from '@/features/employees/types'

type Props = {
  employees: Employee[]
  value: number | null | undefined
  onChange: (id: number | null) => void
  placeholder?: string
  isLoading?: boolean
}

const formatEmployeeName = (e: Employee) => `${e.lastName} ${e.firstName}`

export default function EmployeeCombobox({ employees, value, onChange, placeholder = 'Выберите...', isLoading }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const selected = employees.find((e) => e.id === value)

  const filtered = search
    ? employees.filter((e) =>
        formatEmployeeName(e).toLowerCase().includes(search.toLowerCase())
      )
    : employees

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={isLoading}
        >
          <span className="truncate">
            {selected ? formatEmployeeName(selected) : placeholder}
          </span>
          {value ? (
            <X
              className="ml-1 size-4 shrink-0 opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
              }}
            />
          ) : (
            <ChevronsUpDown className="ml-1 size-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Поиск..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup>
              {filtered.map((employee) => (
                <CommandItem
                  key={employee.id}
                  value={employee.id.toString()}
                  onSelect={() => {
                    onChange(employee.id === value ? null : employee.id)
                    setOpen(false)
                    setSearch('')
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === employee.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {formatEmployeeName(employee)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
