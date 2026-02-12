// import {statuses, StatusItem} from "@/features/orders/lib/statuses";
// import {OrderStatus} from "@/features/orders/types";
//
// /**
//  * Нормализует строковое представление статуса к формату бэкенда (верхний регистр)
//  */
// export const normalizeStatus = (status: string | undefined): OrderStatus | undefined => {
//     if (!status) return undefined;
//
//     // Преобразуем к верхнему регистру для соответствия формату бэкенда
//     const normalizedStatus = status.toUpperCase();
//     // Проверяем, является ли нормализованный статус валидным статусом OrderStatus
//     return Object.values(OrderStatus).includes(normalizedStatus as OrderStatus)
//         ? normalizedStatus as OrderStatus
//         : undefined;
// };
//
// /**
//  * Находит следующий статус по порядку
//  */
// export const getNextStatus = (currentStatus: OrderStatus | undefined): string | undefined => {
//     if (!currentStatus) return undefined;
//
//     const normalizedStatus = normalizeStatus(currentStatus);
//     const currentIndex = statuses.findIndex(s => String(s.value).toUpperCase() === normalizedStatus);
//
//     // Если статус не найден или последний в списке, возвращаем текущий
//     if (currentIndex === -1 || currentIndex === statuses.length - 1) {
//         return normalizedStatus;
//     }
//
//     // Возвращаем следующий статус
//     return statuses[currentIndex + 1].value;
// };
//
// /**
//  * Получает значение поля статуса по его коду
//  */
// export const getStatusField = (
//     status: OrderStatus | string | undefined,
//     field: keyof StatusItem
// ) => {
//     if (!status) return '';
//
//     const normalizedStatus = normalizeStatus(status);
//
//     const statusObj = statuses.find(s => s.value.toUpperCase() === normalizedStatus);
//
//     return statusObj?.[field] ?? status;
// };
//
// /**
//  * Проверяет, является ли статус заявкой (первый в списке)
//  */
// export const isOrderApplication = (status: OrderStatus | string | undefined): boolean => {
//     if (!status) return false;
//
//     const normalizedStatus = normalizeStatus(status);
//     return normalizedStatus === normalizeStatus(statuses[0].value);
// };
//
// /**
//  * Возвращает текст заголовка в зависимости от статуса
//  */
// export const getOrderTitleText = (status: OrderStatus | string | undefined): string => {
//     return isOrderApplication(status) ? "Заявка" : "Заказ";
// };
