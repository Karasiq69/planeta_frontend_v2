import React from 'react'


import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import SuppliersCombobox from '@/features/suppliers/components/SuppliersCombobox'

import type { Supplier } from '@/features/suppliers/types'
import type { Control } from 'react-hook-form'

interface SuppliersSelectFieldProps {
  control: Control<any>
  name: 'supplierId'
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const SuppliersSelectField: React.FC<SuppliersSelectFieldProps> = ({
  control,
  name,
  label = 'Поставщик!!:',
  placeholder = 'Выбрать поставщика',
  className,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <Label htmlFor='supplier' className='lg:w-32 text-muted-foreground'>
        {label}
      </Label>
      <div className='w-full'>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <SuppliersCombobox
                  initialValue={field.value}
                  onSelect={(supplier: Supplier) => field.onChange(supplier.id)}
                  isPending={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SuppliersSelectField
