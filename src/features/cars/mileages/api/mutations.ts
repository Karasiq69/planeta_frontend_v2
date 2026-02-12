import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { carQueryKeys } from '@/features/cars/api/query-keys'

import { createMileage, deleteMileage } from './actions'
import { mileagesQueryKeys } from './query-keys'

import type { CreateMileageDTO } from '@/features/cars/types'
import type { ApiError } from '@/types/api-error'


// Хук для создания новой записи пробега
export const useCreateMileage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMileageDTO) => createMileage(data),
    onSuccess: (data) => {
      toast.success('Пробег успешно добавлен')

      // Инвалидируем запросы для обновления данных
      queryClient.invalidateQueries({
        queryKey: mileagesQueryKeys.listByCar(data.carId),
      })
      queryClient.invalidateQueries({
        queryKey: mileagesQueryKeys.lastByCar(data.carId),
      })
      // Инвалидируем детали автомобиля, так как они могут включать информацию о пробеге
      queryClient.invalidateQueries({
        queryKey: carQueryKeys.detail(data.carId),
      })
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при добавлении пробега'
      toast.error(errorMessage)
    },
  })
}

// Хук для удаления записи пробега
export const useDeleteMileage = (carId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteMileage(id),
    onSuccess: () => {
      toast.success('Запись пробега удалена')

      // Инвалидируем запросы для обновления данных
      queryClient.invalidateQueries({
        queryKey: mileagesQueryKeys.listByCar(carId),
      })
      queryClient.invalidateQueries({
        queryKey: mileagesQueryKeys.lastByCar(carId),
      })
      // Инвалидируем детали автомобиля
      queryClient.invalidateQueries({
        queryKey: carQueryKeys.detail(carId),
      })
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при удалении записи пробега'
      toast.error(errorMessage)
    },
  })
}
