'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { useCarEngines, useVehiclesModels } from '@/features/cars/api/queries'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'

import type { SpecificationFormData } from './schema'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<SpecificationFormData>
}

export const SpecFormFields = ({ form }: Props) => {
  const [modelSearch, setModelSearch] = useState('')
  const [engineSearch, setEngineSearch] = useState('')
  const [modelOpen, setModelOpen] = useState(false)
  const [engineOpen, setEngineOpen] = useState(false)

  const debouncedModelSearch = useDebounce(modelSearch, 300)
  const debouncedEngineSearch = useDebounce(engineSearch, 300)

  const { data: modelsData } = useVehiclesModels({
    searchTerm: debouncedModelSearch || undefined,
    pageSize: 50,
  })
  const { data: enginesData } = useCarEngines({
    searchTerm: debouncedEngineSearch || undefined,
    pageSize: 50,
  })

  const models = modelsData?.data ?? []
  const engines = enginesData?.data ?? []

  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название</FormLabel>
            <FormControl>
              <Input placeholder='Название спецификации' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Input placeholder='Описание' {...field} value={field.value ?? ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Model combobox */}
      <FormField
        control={form.control}
        name='modelId'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Модель авто</FormLabel>
            <Popover open={modelOpen} onOpenChange={setModelOpen} modal>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? models.find((m) => m.id === field.value)?.name ?? 'Загрузка...'
                      : 'Не указана'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder='Поиск модели...'
                    value={modelSearch}
                    onValueChange={setModelSearch}
                  />
                  <CommandEmpty>Не найдено.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        value='clear'
                        onSelect={() => {
                          form.setValue('modelId', null)
                          setModelOpen(false)
                        }}
                      >
                        <span className='text-muted-foreground'>Не указана</span>
                      </CommandItem>
                      {models.map((model) => (
                        <CommandItem
                          key={model.id}
                          value={String(model.id)}
                          onSelect={() => {
                            form.setValue('modelId', model.id)
                            setModelOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === model.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {model.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Engine combobox */}
      <FormField
        control={form.control}
        name='engineId'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Двигатель</FormLabel>
            <Popover open={engineOpen} onOpenChange={setEngineOpen} modal>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? engines.find((e) => e.id === field.value)?.name ?? 'Загрузка...'
                      : 'Не указан'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder='Поиск двигателя...'
                    value={engineSearch}
                    onValueChange={setEngineSearch}
                  />
                  <CommandEmpty>Не найдено.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        value='clear'
                        onSelect={() => {
                          form.setValue('engineId', null)
                          setEngineOpen(false)
                        }}
                      >
                        <span className='text-muted-foreground'>Не указан</span>
                      </CommandItem>
                      {engines.map((engine) => (
                        <CommandItem
                          key={engine.id}
                          value={String(engine.id)}
                          onSelect={() => {
                            form.setValue('engineId', engine.id)
                            setEngineOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === engine.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {engine.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='isActive'
        render={({ field }) => (
          <FormItem className='flex items-center justify-between rounded-lg border p-3'>
            <FormLabel>Активна</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
