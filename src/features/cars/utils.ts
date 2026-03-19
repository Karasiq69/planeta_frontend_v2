import { BRAND_LOGOS } from '@/lib/constants'

import type { EngineType, ICarBrand, ICarModel } from '@/features/cars/types'

export const ENGINE_TYPE_LABELS: Record<EngineType, string> = {
  diesel: 'Дизель',
  gasoline: 'Бензин',
  electric: 'Электро',
  hybrid: 'Гибрид',
}

export const getFullModelName = (model: ICarModel | undefined) => {
  if (!model) return ''
  const series = model.series || ''
  const modelName = model.name || ''
  return `${series} ${modelName}`.trim()
}

export const getFullModelDisplayName = (model?: ICarModel) => {
  if (!model) return ''
  const fullModelName = getFullModelName(model)
  const code = model.code || ''
  return `${fullModelName} ${code}`.trim()
}

export const getModelFullName = (model: ICarModel) => {
  if (!model) return 'Модель не выбрана'
  return getFullModelDisplayName(model)
}

const DEFAULT_LOGO = '/img/brands/default-logo.svg'

export const getBrandLogo = (brand?: Pick<ICarBrand, 'name'> | null): string => {
  if (!brand?.name) return DEFAULT_LOGO

  const logoPath = BRAND_LOGOS[brand.name]
  if (!logoPath) return DEFAULT_LOGO

  return `/img/brands/${logoPath}`
}
