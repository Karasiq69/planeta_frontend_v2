import apiClient from '@/lib/auth/client'
import { BRANDS_URL, CAR_MODELS_URL, CARS_URL, ENGINES_URL } from '@/lib/constants'

import type {
  CarHistoryParams,
  CarHistoryResponse,
  CarListParams,
  CreateCarBrand,
  CreateCarModel,
  CreateEngine,
  EngineListParams,
  ICar,
  ICarBrand,
  ICarModel,
  IEngine,
  ModelListParams,
  UpdateCarBrand,
  UpdateCarModel,
  UpdateEngine,
} from '@/features/cars/types'
import type { ListResponse } from '@/types/params'

// --- Cars ---

export const getAllVehiclesListFn = async (params: CarListParams): Promise<ListResponse<ICar>> => {
  const res = await apiClient.get<ListResponse<ICar>>(CARS_URL, {
    params,
  })
  return res.data
}
export const getVehicleById = async (id: number): Promise<ICar> => {
  const res = await apiClient.get<ICar>(`${CARS_URL}/${id}`)
  return res.data
}

export const getCarHistoryFn = async (
  carId: number,
  params: CarHistoryParams
): Promise<CarHistoryResponse> => {
  const res = await apiClient.get<CarHistoryResponse>(`${CARS_URL}/${carId}/history`, { params })
  return res.data
}

// --- Brands ---

export const getCarBrandsFn = async () => {
  const response = await apiClient.get<ICarBrand[]>(`${CARS_URL}${BRANDS_URL}`)
  return response.data
}

export const createBrandFn = async (data: CreateCarBrand) => {
  const response = await apiClient.post<ICarBrand>(`${CARS_URL}${BRANDS_URL}`, data)
  return response.data
}

export const updateBrandFn = async ({ id, ...data }: UpdateCarBrand) => {
  const response = await apiClient.patch<ICarBrand>(`${CARS_URL}${BRANDS_URL}/${id}`, data)
  return response.data
}

export const deleteBrandFn = async (id: number) => {
  await apiClient.delete(`${CARS_URL}${BRANDS_URL}/${id}`)
}

// --- Models ---

export const getCarModelsFn = async (params: ModelListParams) => {
  const response = await apiClient.get<ListResponse<ICarModel>>(
    `${CARS_URL}${CAR_MODELS_URL}`,
    { params }
  )
  return response.data
}

export const createModelFn = async (data: CreateCarModel) => {
  const response = await apiClient.post<ICarModel>(`${CARS_URL}${CAR_MODELS_URL}`, data)
  return response.data
}

export const updateModelFn = async ({ id, ...data }: UpdateCarModel) => {
  const response = await apiClient.patch<ICarModel>(`${CARS_URL}${CAR_MODELS_URL}/${id}`, data)
  return response.data
}

export const deleteModelFn = async (id: number) => {
  await apiClient.delete(`${CARS_URL}${CAR_MODELS_URL}/${id}`)
}

// --- Engines ---

export const getEnginesFn = async (params: EngineListParams) => {
  const response = await apiClient.get<ListResponse<IEngine>>(
    `${CARS_URL}${ENGINES_URL}`,
    { params }
  )
  return response.data
}

export const createEngineFn = async (data: CreateEngine) => {
  const response = await apiClient.post<IEngine>(`${CARS_URL}${ENGINES_URL}`, data)
  return response.data
}

export const updateEngineFn = async ({ id, ...data }: UpdateEngine) => {
  const response = await apiClient.patch<IEngine>(`${CARS_URL}${ENGINES_URL}/${id}`, data)
  return response.data
}

export const deleteEngineFn = async (id: number) => {
  await apiClient.delete(`${CARS_URL}${ENGINES_URL}/${id}`)
}
