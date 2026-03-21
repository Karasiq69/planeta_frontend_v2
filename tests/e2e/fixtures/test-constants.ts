const isDocker = process.env.TEST_ENV === 'docker'

export const API_URL = isDocker ? 'http://localhost:8001' : 'http://localhost:8000'

export const TEST_USER = {
  email: 'hedgehogly@yandex.ru',
  password: 'hedgehogly@yandex.ru',
}

export const TEST_CLIENTS = {
  individual: {
    firstName: 'Тест',
    lastName: 'Клиентов',
    phone: '+79001234567',
    type: 'individual' as const,
  },
  corporate: {
    firstName: 'Контакт',
    lastName: 'Корпоративный',
    companyName: 'ООО Тест',
    inn: '1234567890',
    type: 'corporate' as const,
    phone: '+79009876543',
  },
}

export const TEST_SERVICES = [
  { name: 'Замена масла', defaultDuration: 60, unit: 'н/ч' },
  { name: 'Диагностика', defaultDuration: 30, unit: 'н/ч' },
  { name: 'ТО плановое', defaultDuration: 120, unit: 'н/ч' },
]

export const TEST_SERVICE_PRICES: Record<string, { appliedRate: number; appliedPrice: number }> = {
  'Замена масла': { appliedRate: 1500, appliedPrice: 1500 },
  'Диагностика': { appliedRate: 2000, appliedPrice: 2000 },
  'ТО плановое': { appliedRate: 5000, appliedPrice: 5000 },
}

export const TEST_PRODUCTS = [
  { name: 'Масло моторное 5W-40', price: '3000.00', sku: 'TEST-OIL-001', partNumber: 'TP-001', unit: 'шт' },
  { name: 'Фильтр масляный', price: '500.00', sku: 'TEST-FILTER-001', partNumber: 'TP-002', unit: 'шт' },
  { name: 'Колодки тормозные', price: '2500.00', sku: 'TEST-BRAKE-001', partNumber: 'TP-003', unit: 'шт' },
]

export const TEST_STOCK_QUANTITIES: Record<string, number> = {
  'TEST-OIL-001': 10,
  'TEST-FILTER-001': 20,
  'TEST-BRAKE-001': 8,
}

export const TEST_MECHANICS = [
  { firstName: 'Иван', lastName: 'Механиков', position: 'mechanic', hourlyRate: 500, phone: '+79101111111' },
  { firstName: 'Пётр', lastName: 'Слесарев', position: 'mechanic', hourlyRate: 600, phone: '+79102222222' },
]

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  TRANSFER: 'transfer',
  ONLINE: 'online',
} as const
