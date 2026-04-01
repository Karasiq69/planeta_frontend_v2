type PluralForms = readonly [one: string, few: string, many: string]

export const words = {
  order: ['заказ', 'заказа', 'заказов'],
  record: ['запись', 'записи', 'записей'],
  service: ['работа', 'работы', 'работ'],
  product: ['товар', 'товара', 'товаров'],
  piece: ['штука', 'штуки', 'штук'],
  day: ['день', 'дня', 'дней'],
  minute: ['минута', 'минуты', 'минут'],
  employee: ['сотрудник', 'сотрудника', 'сотрудников'],
  client: ['клиент', 'клиента', 'клиентов'],
  car: ['автомобиль', 'автомобиля', 'автомобилей'],
  document: ['документ', 'документа', 'документов'],
  position: ['позиция', 'позиции', 'позиций'],
} as const satisfies Record<string, PluralForms>

/**
 * Склонение существительных по числу.
 *
 * С словарём:  pluralize(3, words.order) → '3 заказа'
 * Напрямую:    pluralize(5, ['заказ', 'заказа', 'заказов']) → '5 заказов'
 */
export const pluralize = (count: number, forms: PluralForms): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} ${forms[2]}`
  }

  if (lastDigit === 1) return `${count} ${forms[0]}`
  if (lastDigit >= 2 && lastDigit <= 4) return `${count} ${forms[1]}`
  return `${count} ${forms[2]}`
}
