import { Mutex } from 'async-mutex'
import axios from 'axios'

import { getOrgIdFromCookie } from '@/stores/organization-store'
import { ApiError } from '@/types/api-error'

const mutex = new Mutex()
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const orgId = getOrgIdFromCookie()
  if (orgId) {
    config.headers['x-organization-id'] = orgId
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Обработка 401 ошибки и обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Если другой запрос уже обновляет токен — ждём и ретраим
      if (mutex.isLocked()) {
        await mutex.waitForUnlock()
        return apiClient(originalRequest)
      }

      const release = await mutex.acquire()
      try {
        await axios.post('/api/auth/jwt/refresh/', null, { withCredentials: true })
      } catch {
        return Promise.reject(
          new ApiError({
            data: {
              message: 'Сессия истекла, необходимо войти заново',
              code: 'SESSION_EXPIRED',
              status: 401,
            },
            status: 401,
          })
        )
      } finally {
        release()
      }

      return apiClient(originalRequest)
    }

    // Преобразование ошибок в ApiError
    if (error.response) {
      // Обработка ошибок от сервера
      const errorResponse = {
        data: {
          message: error.response.data?.message || getErrorMessageByStatus(error.response.status),
          code: error.response.data?.code,
          status: error.response.status,
        },
        status: error.response.status,
      }
      return Promise.reject(new ApiError(errorResponse))
    }

    if (error.request) {
      // Ошибка сети или отсутствие ответа от сервера
      return Promise.reject(
        new ApiError({
          data: {
            message: 'Не удалось подключиться к серверу',
            code: 'NETWORK_ERROR',
            status: 0,
          },
          status: 0,
        })
      )
    }

    // Все остальные ошибки
    return Promise.reject(
      new ApiError({
        data: {
          message: 'Произошла неизвестная ошибка',
          code: 'UNKNOWN_ERROR',
          status: 500,
        },
        status: 500,
      })
    )
  }
)

// Вспомогательная функция для получения сообщения об ошибке по статусу
function getErrorMessageByStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Неверный запрос'
    case 401:
      return 'Необходима авторизация'
    case 403:
      return 'Доступ запрещен'
    case 404:
      return 'Ресурс не найден'
    case 409:
      return 'Конфликт данных'
    case 422:
      return 'Ошибка валидации'
    case 429:
      return 'Слишком много запросов'
    case 500:
      return 'Внутренняя ошибка сервера'
    default:
      return 'Произошла ошибка'
  }
}

export default apiClient
