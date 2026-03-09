export const DOCUMENT_CATEGORY_LABELS: Record<string, string> = {
  order: 'Заказ-наряд',
  invoice: 'Счёт',
  act: 'Акт',
  receipt: 'Приёмка',
  transfer: 'Перемещение',
}

export function getDocumentCategoryLabel(category: string): string {
  return DOCUMENT_CATEGORY_LABELS[category] ?? category
}
