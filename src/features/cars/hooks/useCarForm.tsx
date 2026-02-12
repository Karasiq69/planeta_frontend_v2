import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


import { useCreateCar, useEditCar } from '@/features/cars/api/mutations'
import { carFormSchema } from '@/features/cars/components/forms/schema'

import type { ICar } from '@/features/cars/types'
import type { z } from 'zod'

export type CarFormProps = {
  carData?: ICar
  onCreate?: (data: ICar) => void // дополнительная функция при создании
  onUpdate?: (carId: number) => ICar // доп функция при обновлении
}

export const useCarForm = ({ carData, onCreate, onUpdate }: CarFormProps) => {
  const { mutate: createCar, isPending: isCreating } = useCreateCar()
  const { mutate: updateCar, isPending: isUpdating } = useEditCar(carData?.id as number)

  const defaultValues = useMemo(
    () => ({
      brandId: carData?.brand?.id as unknown as number,
      modelId: carData?.model?.id as unknown as number,
      year: carData?.year || ('' as unknown as number),
      vin: carData?.vin || '',
      licensePlate: carData?.licensePlate || '',
      // current_mileage: carData?.mileages[0]?.value.toString() || '',
      // custom_brand: '',
    }),
    [carData]
  )

  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    values: defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit = (data: z.infer<typeof carFormSchema>) => {
    if (carData) {
      const updateData = {
        ...data,
        carId: carData.id,
      }
      updateCar(updateData, {
        onSuccess: (data) => onUpdate && onUpdate(data.id),
        onError: (error) => {
          console.error('Ошибка при обновлении автомобиля:', error)
          toast.error('Ошибка при обновлении автомобиля')
        },
      })
    } else {
      createCar(data, {
        onSuccess: (data) => {
          onCreate?.(data)
          toast.info(JSON.stringify(data))
        },
        onError: (error) => {
          console.error('Ошибка при создании автомобиля:', error)
          toast.error('Ошибка при создании автомобиля')
        },
      })
    }
  }

  const isLoading = isCreating || isUpdating

  return { form, onSubmit, isLoading, isUpdating, isCreating }
}
