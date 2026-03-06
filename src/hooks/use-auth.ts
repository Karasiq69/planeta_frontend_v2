import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authApi } from '@/lib/auth/auth'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.retrieveUser().then((res) => res.data),
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authApi.login(credentials.email, credentials.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      router.push('/dashboard')
      toast.success('Вход совершен успешно.')
    },
    onError: () => {
      toast.error('Ошибка авторизации')
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear()
      router.push('/')
      toast.success('Вы вышли из системы')
    },
  })
}
