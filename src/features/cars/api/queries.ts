import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getAllVehiclesListFn,
  getCarBrandsFn,
  getCarModelsFn,
  getVehicleById,
} from '@/features/cars/api/actions'
import { carQueryKeys } from '@/features/cars/api/query-keys'
import { ICarModel } from '@/features/cars/types'
import { CarListParams } from '@/features/cars/types/params'

import type { ListParams } from '@/types/params'

export const useVehiclesList = (params: ListParams) => {
  return useQuery({
    queryKey: carQueryKeys.list(params),
    queryFn: () => getAllVehiclesListFn(params),
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export const useVehicleById = (id?: number) => {
  return useQuery({
    queryKey: carQueryKeys.detail(id as number),
    queryFn: () => getVehicleById(id as number),
    enabled: !!id,
  })
}

export const useVehiclesBrands = () => {
  return useQuery({
    queryKey: carQueryKeys.brands(),
    queryFn: () => getCarBrandsFn(),
  })
}

export const useVehiclesModels = (brandId?: number) => {
  return useQuery({
    queryKey: carQueryKeys.model(brandId as number),
    queryFn: () => getCarModelsFn(brandId as number),
    enabled: !!brandId,
  })
}
