'use client'

import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ComboboxWithCreateProps<T extends { id: number }> {
  items: T[]
  value: number | null
  onChange: (id: number | null) => void
  getLabel: (item: T) => string
  placeholder?: string
  dialogTitle?: string
  renderForm: (props: { onSuccess: (item: T) => void; onClose: () => void }) => ReactNode
  disabled?: boolean
}

export function ComboboxWithCreate<T extends { id: number }>({
  items,
  value,
  onChange,
  getLabel,
  placeholder = 'Выберите...',
  dialogTitle = 'Создать',
  renderForm,
  disabled,
}: ComboboxWithCreateProps<T>) {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const selectedItem = items.find((item) => item.id === value)

  return (
    <div className='flex items-center gap-2'>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            disabled={disabled}
            className={cn(
              'flex-1 justify-between hover:bg-white',
              !value && 'text-muted-foreground',
            )}
          >
            {selectedItem ? getLabel(selectedItem) : placeholder}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0'>
          <Command>
            <CommandInput placeholder='Поиск...' />
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={getLabel(item)}
                    onSelect={() => {
                      onChange(item.id === value ? null : item.id)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {getLabel(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        type='button'
        variant='outline'
        size='icon'
        className='size-9 shrink-0'
        disabled={disabled}
        onClick={() => setDialogOpen(true)}
      >
        <Plus className='size-4' />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          {renderForm({
            onSuccess: (item) => {
              onChange(item.id)
              setDialogOpen(false)
            },
            onClose: () => setDialogOpen(false),
          })}
        </DialogContent>
      </Dialog>
    </div>
  )
}
