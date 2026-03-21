import { MockEmployee, MockService, OrganizationFormData, ScheduleFormData, WarehouseFormData } from './types'

export const mockOrganization: OrganizationFormData = {
  name: 'АвтоСервис Плюс',
  inn: '7712345678',
  address: 'г. Москва, ул. Примерная, д. 1',
  phone: '+7 (495) 123-45-67',
  email: 'info@autoservice-plus.ru',
}

export const mockEmployees: MockEmployee[] = [
  { id: '1', name: 'Иванов Иван Иванович', role: 'Механик', email: 'ivanov@example.com' },
  { id: '2', name: 'Петров Пётр Петрович', role: 'Администратор', email: 'petrov@example.com' },
  { id: '3', name: 'Сидорова Анна Сергеевна', role: 'Бухгалтер', email: 'sidorova@example.com' },
]

export const mockServices: MockService[] = [
  { id: '1', name: 'Замена масла', price: 2500, category: 'ТО' },
  { id: '2', name: 'Диагностика двигателя', price: 3000, category: 'Диагностика' },
  { id: '3', name: 'Шиномонтаж', price: 1800, category: 'Шины' },
  { id: '4', name: 'Замена тормозных колодок', price: 4500, category: 'Тормоза' },
]

export const mockWarehouse: WarehouseFormData = {
  name: 'Основной склад',
  address: 'г. Москва, ул. Складская, д. 5',
}

export const mockSchedule: ScheduleFormData = {
  days: [
    { day: 'Понедельник', enabled: true, startTime: '09:00', endTime: '18:00' },
    { day: 'Вторник', enabled: true, startTime: '09:00', endTime: '18:00' },
    { day: 'Среда', enabled: true, startTime: '09:00', endTime: '18:00' },
    { day: 'Четверг', enabled: true, startTime: '09:00', endTime: '18:00' },
    { day: 'Пятница', enabled: true, startTime: '09:00', endTime: '18:00' },
    { day: 'Суббота', enabled: false, startTime: '10:00', endTime: '16:00' },
    { day: 'Воскресенье', enabled: false, startTime: '10:00', endTime: '16:00' },
  ],
}
