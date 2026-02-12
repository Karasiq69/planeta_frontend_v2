import apiClient from '@/lib/auth/client'

import type { User } from '@/types/user'

export const authApi = {
  retrieveUser: () => apiClient.get<User>('/auth/me/'),

  login: (email: string, password: string) => apiClient.post('/auth/login/', { email, password }),

  register: (userData: { email: string; password: string; re_password: string }) =>
    apiClient.post('/auth/register/', userData),

  verify: () => apiClient.post('/auth/jwt/verify/'),

  refreshToken: () => apiClient.post('/auth/jwt/refresh/'),

  logout: () => apiClient.post('/auth/jwt/logout/'),

  activation: (uid: string, token: string) => apiClient.post('/users/activation/', { uid, token }),

  resetPassword: (email: string) => apiClient.post('/users/reset_password/', { email }),

  resetPasswordConfirm: (data: {
    uid: string
    token: string
    new_password: string
    re_new_password: string
  }) => apiClient.post('/users/reset_password_confirm/', data),
}
