import { useQuery } from '@tanstack/react-query'

import { getLastMileage, getMileageById, getMileagesByCarId } from './actions'
import { mileagesQueryKeys } from './query-keys'

// Хук для получения всех записей пробега автомобиля по ID
export const useMileagesByCarId = (carId: number) => {
  return useQuery({
    queryKey: mileagesQueryKeys.listByCar(carId as number),
    queryFn: () => getMileagesByCarId(carId as number),
    enabled: !!carId,
    // Кеширование на 5 минут, данные живут в кеше 20 минут
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
  })
}

// Хук для получения записи пробега по ID
export const useMileageById = (id?: number) => {
  return useQuery({
    queryKey: mileagesQueryKeys.detail(id as number),
    queryFn: () => getMileageById(id as number),
    enabled: !!id,
  })
}

// Хук для получения последнего пробега автомобиля
export const useLastMileage = (carId?: number) => {
  return useQuery({
    queryKey: mileagesQueryKeys.lastByCar(carId as number),
    queryFn: () => getLastMileage(carId as number),
    enabled: !!carId,
    // Обновляем данные чаще, чем остальные записи
    staleTime: 1000 * 60 * 2,
  })
}
