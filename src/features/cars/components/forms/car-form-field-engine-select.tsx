'use client'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import React, { useState } from 'react'

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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCarEngines } from '@/features/cars/api/queries'
import { EngineForm } from '@/features/cars/components/references/EngineForm'
import { ENGINE_TYPE_LABELS } from '@/features/cars/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'

import type { IEngine } from '@/features/cars/types'
import type { UseFormReturn } from 'react-hook-form'

interface EngineSelectProps {
  form: UseFormReturn<any>
}

const getEngineDisplayName = (engine: IEngine) => {
  const parts = [engine.name]
  if (engine.series) parts.push(`(${engine.series})`)
  parts.push(ENGINE_TYPE_LABELS[engine.engineType])
  return parts.join(' ')
}

const CarFormFieldEngineSelect = ({ form }: EngineSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const brandWatch = form.watch('brandId')

  const debouncedSearch = useDebounce(searchTerm, 300)
  const { data: enginesData } = useCarEngines({
    brandId: brandWatch,
    searchTerm: debouncedSearch || undefined,
    pageSize: 50,
  })
  const engines = enginesData?.data ?? []

  return (
    <>
      <FormField
        control={form.control}
        name='engineId'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Двигатель</FormLabel>
            <div className='flex items-center gap-2'>
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'flex-1 justify-between hover:bg-white',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? getEngineDisplayName(
                            engines?.find((engine) => engine.id === field.value) as IEngine
                          )
                        : 'Выберите двигатель'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder='Поиск двигателя...'
                      value={searchTerm}
                      onValueChange={setSearchTerm}
                    />
                    <CommandEmpty>Двигатель не найден.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {engines.map((engine) => (
                          <CommandItem
                            key={engine.id}
                            value={String(engine.id)}
                            onSelect={() => {
                              form.setValue('engineId', engine.id)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === engine.id ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {getEngineDisplayName(engine)}
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
                onClick={() => setDialogOpen(true)}
              >
                <Plus className='size-4' />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новый двигатель</DialogTitle>
          </DialogHeader>
          <EngineForm
            defaultBrandId={brandWatch}
            onSuccess={(engine) => {
              form.setValue('engineId', engine.id)
              setDialogOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CarFormFieldEngineSelect
