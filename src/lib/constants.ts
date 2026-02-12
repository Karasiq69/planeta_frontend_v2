export const CLIENTS_URL = '/clients'
export const CARS_URL = '/cars'
export const CAR_MODELS_URL = '/models'
export const BRANDS_URL = '/brands'
export const MILEAGES_URL = `${CARS_URL}/mileages`
export const ORDERS_URL = '/orders'
export const SERVICES_URL = '/services'
export const PRODUCTS_URL = '/products'
export const MECHANICS_URL = '/mechanics'
export const COMMENTS_URL = '/comments'
export const ORDER_SERVICES_URL = '/order-services'

export const ORDER_PRODUCTS_URL = '/order-products'
export const ORDER_MECHANICS_URL = '/order-mechanics'
export const COMMANDS_URL = '/commands'
export const APPOINTMENTS_URL = '/appointments'
export const WAREHOUSE_URL = '/warehouse'
export const STORAGE_LOCATIONS_URL = '/storage-locations'
export const INVENTORY_DOCUMENTS_URL = '/inventory-documents'
export const SUPPLIER_URL = '/suppliers'
export const ORGANIZATIONS_URL = '/organizations'
export const CLIENT_ORDERS = '/client-orders'
export const RECEIPT_DOCUMENTS_URL = `${INVENTORY_DOCUMENTS_URL}/receipt`
export const TRANSFER_DOCUMENTS_URL = `${INVENTORY_DOCUMENTS_URL}/transfer`

export const BRAND_LOGOS: Record<string, string> = {
  Porsche: 'porsche-logo.svg',
  'Mercedes-Benz': 'mercedes-logo.svg',
  BMW: 'bmw-logo.svg',
  Audi: 'audi-logo.svg',
} as const

export const STATION_RESOURCES = [
  {
    id: 'A',
    title: 'Подъемник 1',
    eventColor: '#cfeea8',
    eventTextColor: '#062000',
    eventBorderColor: '#98af7a',
  },
  {
    id: 'B',
    title: 'Подъемник 2',
    eventColor: '#d6d5ff',
    eventTextColor: '#111030',
    eventBorderColor: '#a4a4c6',
  },
  {
    id: 'C',
    title: 'Подъемник 3',
    eventColor: '#feea8c',
    eventTextColor: '#433602',
    eventBorderColor: '#ccbc71',
  },
  {
    id: 'F',
    title: 'Сход Развал',
    eventColor: '#ffb8b8',
    eventTextColor: '#500000',
    eventBorderColor: '#c68787',
  },
  {
    id: 'D',
    title: 'Диагност',
    eventColor: '#b8e6ff',
    eventTextColor: '#023350',
    eventBorderColor: '#87a9bc',
  },
  {
    id: 'E',
    title: 'Проход',
    eventColor: '#ffd6e5',
    eventTextColor: '#570228',
    eventBorderColor: '#c69dac',
  },
] as const
