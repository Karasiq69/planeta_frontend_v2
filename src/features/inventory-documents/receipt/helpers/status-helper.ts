// Определяем тип для вариантов бейджа

import { InventoryDocumentStatus } from '@/features/inventory-documents/types'

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline-solid'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'

// Интерфейс для конфигурации статуса
export interface StatusConfig {
  label: string
  variant: BadgeVariant
  description?: string // Опционально - может быть полезно для тултипов или других элементов
}

// Тип для маппинга статусов
export type StatusMapping = Record<string, StatusConfig>

// Создаем маппинг статусов документов
export const documentStatusConfig: StatusMapping = {
  [InventoryDocumentStatus.DRAFT]: {
    label: 'Черновик',
    variant: 'warning',
    description: 'Документ находится в процессе редактирования',
  },
  [InventoryDocumentStatus.COMPLETED]: {
    label: 'Завершен',
    variant: 'success',
    description: 'Документ успешно завершен',
  },
  [InventoryDocumentStatus.CANCELLED]: {
    label: 'Отменен',
    variant: 'destructive',
    description: 'Документ был отменен',
  },
}

// Хелпер функция, которая возвращает конфигурацию для статуса
// С fallback вариантом, если статус не найден
export const getStatusConfig = (status: string): StatusConfig => {
  return (
    documentStatusConfig[status] || {
      label: status?.toLowerCase(),
      variant: 'info',
      description: 'Неизвестный статус',
    }
  )
}

// Хелпер для получения только метки статуса
export const getStatusLabel = (status: string): string => {
  return getStatusConfig(status).label
}

// Хелпер для получения только варианта бейджа для статуса
export const getStatusVariant = (status: string): BadgeVariant => {
  return getStatusConfig(status).variant
}
