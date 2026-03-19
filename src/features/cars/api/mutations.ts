import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  createBrandFn,
  createEngineFn,
  createModelFn,
  deleteBrandFn,
  deleteEngineFn,
  deleteModelFn,
  updateBrandFn,
  updateEngineFn,
  updateModelFn,
} from '@/features/cars/api/actions'
import { carQueryKeys } from '@/features/cars/api/query-keys'
import apiClient from '@/lib/auth/client'
import { CARS_URL } from '@/lib/constants'

import type {
  CreateCarBrand,
  CreateCarModel,
  CreateEngine,
  ICar,
  UpdateCarBrand,
  UpdateCarModel,
  UpdateEngine,
} from '@/features/cars/types'
import type { ApiError } from '@/types/api-error'

export function useCreateCar() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createCarFn = async (data: Partial<ICar>) => {
    const response = await apiClient.post<ICar>(`${CARS_URL}/`, data)
    return response.data
  }
  return useMutation({
    mutationFn: createCarFn,
    onSuccess: (createdCar, variables) => {
      toast.success(`Автомобиль создан`)

      // router.push(`${CARS_URL}/${createdCar.id}`);
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message || 'Произошла ошибка при создании автомобиля'
      toast.error(errorMessage)
      console.error(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: carQueryKeys.all,
      })
    },
  })
}

export function useEditCar(carId: number) {
  const queryClient = useQueryClient()

  const editCarFn = async (data: Partial<ICar>) => {
    const response = await apiClient.patch<ICar>(`${CARS_URL}/${carId}`, data)
    return response.data
  }
  return useMutation({
    mutationFn: editCarFn,
    onSuccess: (createdCar, variables) => {
      toast.success('Автомобиль обновлен успешно')
      queryClient.invalidateQueries({
        queryKey: carQueryKeys.detail(carId),
      })
      queryClient.invalidateQueries({
        queryKey: carQueryKeys.all,
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
      console.error(error)
    },
    onSettled: () => {},
  })
}

// --- Brand mutations ---

export function useCreateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCarBrand) => createBrandFn(data),
    onSuccess: () => {
      toast.success('Бренд создан')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании бренда'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.brands() })
    },
  })
}

export function useUpdateBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCarBrand) => updateBrandFn(data),
    onSuccess: () => {
      toast.success('Бренд обновлён')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении бренда'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.brands() })
    },
  })
}

export function useDeleteBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteBrandFn(id),
    onSuccess: () => {
      toast.success('Бренд удалён')
    },
    onError: (error: ApiError) => {
      if (error.response?.status === 409) {
        toast.error('Нельзя удалить: есть связанные записи')
      } else if (error.response?.status === 404) {
        toast.error('Запись не найдена')
      } else {
        toast.error(error.response?.data?.message || 'Ошибка при удалении бренда')
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.brands() })
    },
  })
}

// --- Model mutations ---

export function useCreateModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCarModel) => createModelFn(data),
    onSuccess: () => {
      toast.success('Модель создана')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании модели'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.models() })
    },
  })
}

export function useUpdateModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCarModel) => updateModelFn(data),
    onSuccess: () => {
      toast.success('Модель обновлена')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении модели'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.models() })
    },
  })
}

export function useDeleteModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteModelFn(id),
    onSuccess: () => {
      toast.success('Модель удалена')
    },
    onError: (error: ApiError) => {
      if (error.response?.status === 409) {
        toast.error('Нельзя удалить: есть связанные записи')
      } else if (error.response?.status === 404) {
        toast.error('Запись не найдена')
      } else {
        toast.error(error.response?.data?.message || 'Ошибка при удалении модели')
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.models() })
    },
  })
}

// --- Engine mutations ---

export function useCreateEngine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEngine) => createEngineFn(data),
    onSuccess: () => {
      toast.success('Двигатель создан')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании двигателя'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.engines() })
    },
  })
}

export function useUpdateEngine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateEngine) => updateEngineFn(data),
    onSuccess: () => {
      toast.success('Двигатель обновлён')
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении двигателя'
      toast.error(errorMessage)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.engines() })
    },
  })
}

export function useDeleteEngine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteEngineFn(id),
    onSuccess: () => {
      toast.success('Двигатель удалён')
    },
    onError: (error: ApiError) => {
      if (error.response?.status === 409) {
        toast.error('Нельзя удалить: есть связанные записи')
      } else if (error.response?.status === 404) {
        toast.error('Запись не найдена')
      } else {
        toast.error(error.response?.data?.message || 'Ошибка при удалении двигателя')
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carQueryKeys.engines() })
    },
  })
}
