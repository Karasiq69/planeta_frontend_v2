export const mileagesQueryKeys = {
  all: ['mileages'] as const,

  // Ключи для записей пробега
  lists: () => [...mileagesQueryKeys.all, 'list'] as const,
  listByCar: (carId: number) => [...mileagesQueryKeys.lists(), { carId }] as const,

  // Ключи для конкретной записи пробега
  details: () => [...mileagesQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...mileagesQueryKeys.details(), id] as const,

  // Ключ для последнего пробега автомобиля
  lastByCar: (carId: number) => [...mileagesQueryKeys.all, 'last', carId] as const,
}
