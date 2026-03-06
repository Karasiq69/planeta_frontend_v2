import apiClient from '@/lib/auth/client'

import type { User } from '@/types/user'

export const authApi = {
  retrieveUser: () => apiClient.get<User>('/auth/me/'),

  login: (email: string, password: string) => apiClient.post('/auth/login/', { email, password }),

  register: (userData: { email: string; password: string; re_password: string }) =>
    apiClient.post('/auth/register/', userData),

  refreshToken: () => apiClient.post('/auth/jwt/refresh/'),

  logout: () => apiClient.post('/auth/jwt/logout/'),
}
