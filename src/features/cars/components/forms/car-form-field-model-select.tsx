'use client'
import React, { useState } from 'react'

import { ComboboxWithCreate } from '@/components/common/ComboboxWithCreate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useVehiclesModels } from '@/features/cars/api/queries'
import { ModelForm } from '@/features/cars/components/references/ModelForm'
import { getModelFullName } from '@/features/cars/utils'
import { useDebounce } from '@/hooks/use-debounce'

import type { ICarModel } from '@/features/cars/types'
import type { UseFormReturn } from 'react-hook-form'

interface ModelSelectProps {
  form: UseFormReturn<any>
}

const CarFormFieldModelSelect = ({ form }: ModelSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const brandWatch = form.watch('brandId')

  const debouncedSearch = useDebounce(searchTerm, 300)
  const { data: modelsData } = useVehiclesModels({
    brandId: brandWatch,
    searchTerm: debouncedSearch || undefined,
    pageSize: 50,
  })
  const models = modelsData?.data ?? []

  return (
    <FormField
      control={form.control}
      name='modelId'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Модель</FormLabel>
          <FormControl>
            <ComboboxWithCreate<ICarModel>
              items={models}
              value={field.value ?? null}
              onChange={(id) => form.setValue('modelId', id)}
              getLabel={getModelFullName}
              placeholder='Выберите модель'
              searchPlaceholder='Поиск модели...'
              emptyText='Модель не найдена.'
              dialogTitle='Новая модель'
              onSearch={setSearchTerm}
              renderForm={({ onSuccess }) => (
                <ModelForm
                  defaultBrandId={brandWatch}
                  onSuccess={(model) => {
                    onSuccess(model)
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

export default CarFormFieldModelSelect
