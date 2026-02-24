import type { TypeConfig, TypeMapping } from '@/types'

export const getTypeConfig = (
  type: string,
  configMap: TypeMapping,
  fallbackLabel?: string
): TypeConfig => {
  return (
    configMap[type] || {
      label: fallbackLabel || type,
      variant: 'outline',
      description: 'Неизвестный тип',
    }
  )
}
