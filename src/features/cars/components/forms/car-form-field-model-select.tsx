'use client'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import React, { useMemo, useState } from 'react'

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
import { useVehiclesModels } from '@/features/cars/api/queries'
import { ModelForm } from '@/features/cars/components/references/ModelForm'
import { getModelFullName } from '@/features/cars/utils'
import { cn } from '@/lib/utils'

import type { ICarModel } from '@/features/cars/types'
import type { UseFormReturn } from 'react-hook-form'

interface ModelSelectProps {
  form: UseFormReturn<any>
}

const CarFormFieldModelSelect = ({ form }: ModelSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const brandWatch = form.watch('brandId')
  const { data: models = [], isLoading } = useVehiclesModels(brandWatch)

  const filteredModels = useMemo(
    () =>
      models.filter(
        (model) =>
          model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (model.series && model.series.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (model.code && model.code.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [models, searchTerm]
  )

  return (
    <>
    <FormField
      control={form.control}
      name='modelId'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Модель</FormLabel>
          <div className='flex items-center gap-1'>
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
                      ? getModelFullName(
                          models?.find((model) => model.id === field.value) as ICarModel
                        )
                      : 'Выберите модель'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=' p-0'>
                <Command>
                  <CommandInput
                    className=" w-[1200px] "
                    placeholder='Поиск модели...'
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandEmpty>Модель не найдена.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {filteredModels.map((model) => (
                        <CommandItem
                          key={model.id}
                          value={`${model.name} ${model.series || ''} ${model.code || ''}`}
                          onSelect={() => {
                            form.setValue('modelId', model.id)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === String(model.id) ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {getModelFullName(model)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-8 w-8 shrink-0'
              onClick={() => setDialogOpen(true)}
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая модель</DialogTitle>
        </DialogHeader>
        <ModelForm
          defaultBrandId={brandWatch}
          onSuccess={(model) => {
            form.setValue('modelId', model.id)
            setDialogOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
    </>
  )
}

export default CarFormFieldModelSelect
