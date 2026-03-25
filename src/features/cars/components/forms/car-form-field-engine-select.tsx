'use client'
import React, { useState } from 'react'

import { ComboboxWithCreate } from '@/components/common/ComboboxWithCreate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCarEngines } from '@/features/cars/api/queries'
import { EngineForm } from '@/features/cars/components/references/EngineForm'
import { ENGINE_TYPE_LABELS } from '@/features/cars/utils'
import { useDebounce } from '@/hooks/use-debounce'

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
  const brandWatch = form.watch('brandId')

  const debouncedSearch = useDebounce(searchTerm, 300)
  const { data: enginesData } = useCarEngines({
    brandId: brandWatch,
    searchTerm: debouncedSearch || undefined,
    pageSize: 50,
  })
  const engines = enginesData?.data ?? []

  return (
    <FormField
      control={form.control}
      name='engineId'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Двигатель</FormLabel>
          <FormControl>
            <ComboboxWithCreate<IEngine>
              items={engines}
              value={field.value ?? null}
              onChange={(id) => form.setValue('engineId', id)}
              getLabel={getEngineDisplayName}
              placeholder='Выберите двигатель'
              searchPlaceholder='Поиск двигателя...'
              emptyText='Двигатель не найден.'
              dialogTitle='Новый двигатель'
              onSearch={setSearchTerm}
              renderForm={({ onSuccess, onClose }) => (
                <EngineForm
                  defaultBrandId={brandWatch}
                  onSuccess={(engine) => {
                    onSuccess(engine)
                  }}
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CarFormFieldEngineSelect
