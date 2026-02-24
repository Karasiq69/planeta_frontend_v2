import Image from 'next/image'
import React from 'react'


import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useVehiclesBrands } from '@/features/cars/api/queries'
import { getBrandLogo } from '@/features/cars/utils'

import type { ICarBrand } from '@/features/cars/types'
import type { UseFormReturn } from 'react-hook-form'

interface BrandSelectProps {
  form: UseFormReturn<any>
}

export const CarFormFieldBrandSelect: React.FC<BrandSelectProps> = ({ form }) => {
  const { data: brands = [], isLoading } = useVehiclesBrands()

  const renderBrandOption = (brand: ICarBrand) => (
    <div className='flex items-center gap-2'>
      <div className='relative'>
        <Image
          src={getBrandLogo(brand)}
          alt={brand?.name}
          width={16}
          height={16}
          className="size-6"
        />
      </div>
      <span>{brand?.name}</span>
    </div>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!brands.length) return 'no brands'

  return (
    <FormField
      control={form.control}
      name='brandId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Марка</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Выберите бренд'>
                  {field.value && brands?.length > 0
                    ? renderBrandOption(brands.find((b) => b.id === Number(field.value))!)
                    : 'Выберите бренд'}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem value={String(brand.id)} key={brand.id} className='py-2'>
                  {renderBrandOption(brand)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
