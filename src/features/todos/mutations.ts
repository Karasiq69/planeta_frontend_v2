import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import apiClient from '@/lib/auth/client'

import type { Todo } from '@/types'

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  const deleteTodoFn = async (todoId: number) => {
    return await apiClient.delete(`todos/${todoId}/`)
  }

  return useMutation({
    mutationFn: deleteTodoFn,
    onSuccess: () => {
      toast.success('Задача удалена')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: () => {
      toast.error('Не удалось удалить задачу')
    },
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Todo>) => {
      return await apiClient.post<Todo>('todos/', data)
    },
    onSuccess: () => {
      toast.success('Задача добавлена')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: () => toast.error('Произошла ошибка, повторите попытку'),
  })
}

export const useEditTodo = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Todo>) => {
      return await apiClient.patch<Todo>(`/todos/${id}/`, data)
    },
    onSuccess: () => {
      toast.success('Задача изменена')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: () => toast.error('Произошла ошибка, повторите попытку'),
  })
}
