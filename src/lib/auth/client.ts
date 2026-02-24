import { Mutex } from 'async-mutex'
import axios from 'axios'

import { ApiError } from '@/types/api-error'

const mutex = new Mutex()
const baseURL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Обработка 401 ошибки и обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      await mutex.waitForUnlock()

      try {
        const response = await apiClient(originalRequest)
        return response
      } catch (retryError) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire()
          try {
            await apiClient.post(`/auth/jwt/refresh/`)
            return apiClient(originalRequest)
          } catch (refreshError) {
            // document.cookie = 'access=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            // window.location.href = '/';
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
        }
      }
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
