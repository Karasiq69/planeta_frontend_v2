import {CircleCheck, CircleDashed, CircleEqual, CircleX, FileClock, LucideIcon, Timer, Warehouse} from "lucide-react";
import {OrderStatus} from "@/features/orders/types";

// Определение типа статуса
export interface StatusItem {
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
}
export const statuses: StatusItem[] = [
    {
        value: OrderStatus.APPLICATION,
        label: "Заявка",
        icon: CircleDashed,
        color: "bg-gray-100 text-gray-800 hover:bg-gray-200", // Серый цвет для заявки
    },
    {
        value: OrderStatus.ORDER,
        label: "Заказ-наряд",
        icon: CircleEqual,
        color: "bg-sky-100 text-sky-800 hover:bg-sky-200",
    },
    {
        value: OrderStatus.WAITING_WAREHOUSE,
        label: "Ждет склад",
        icon: Warehouse,
        color: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    },
    {
        value: OrderStatus.IN_PROGRESS,
        label: "В работе",
        icon: Timer,
        color: "bg-violet-100 text-violet-800 hover:bg-violet-200",
    },
    {
        value: OrderStatus.WAITING_PAYMENT,
        label: "Ждет оплаты",
        icon: FileClock,
        color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    },
    {
        value: OrderStatus.COMPLETED,
        label: "Завершен",
        icon: CircleCheck,
        color: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    {
        value: OrderStatus.CANCELLED,
        label: "Отменен",
        icon: CircleX,
        color: "bg-rose-100 text-rose-800 hover:bg-rose-200",
    },
];


/**
 * Нормализует строковое представление статуса к формату бэкенда (верхний регистр)
 */
export const normalizeStatus = (status?: string): OrderStatus | undefined => {
    if (!status) return undefined;

    const normalized = status.toUpperCase();
    return Object.values(OrderStatus).includes(normalized as OrderStatus)
        ? normalized as OrderStatus
        : undefined;
};

/**
 * Находит объект статуса по его значению
 */
export const findStatusObject = (status?: string): StatusItem | undefined => {
    if (!status) return undefined;

    const normalized = normalizeStatus(status);
    return statuses.find(s => s.value.toUpperCase() === normalized);
};

/**
 * Получает все данные статуса для деструктуризации
 */
export const getStatusData = (status?: string) => {
    const statusObj = findStatusObject(status);
    const normalized = normalizeStatus(status);

    // Проверяет, является ли статус заявкой (первый в списке)
    const isApplication = Boolean(normalized && normalized === normalizeStatus(statuses[0].value));

    // Получает индекс текущего статуса
    const currentIndex = statuses.findIndex(s => String(s.value).toUpperCase() === normalized);

    // Находит следующий статус
    const nextStatus = (!normalized || currentIndex === -1 || currentIndex === statuses.length - 1)
        ? normalized
        : statuses[currentIndex + 1].value;

    return {
        icon: statusObj?.icon,
        color: statusObj?.color,
        label: statusObj?.label,
        value: normalized,
        isApplication,
        titleText: isApplication ? "Заявка" : "Заказ",
        nextStatus
    };
};

/**
 * Получает конкретное поле статуса
 */
export const getStatusField = (status?: string, field?: keyof StatusItem) => {
    const statusObj = findStatusObject(status);
    return field ? statusObj?.[field] ?? status : statusObj;
};

/**
 * Получает следующий статус
 */
export const getNextStatus = (status?: string) => {
    return getStatusData(status).nextStatus;
};

/**
 * Проверяет, является ли статус заявкой
 */
export const isOrderApplication = (status?: string) => {
    return getStatusData(status).isApplication;
};

/**
 * Получает текст заголовка в зависимости от статуса
 */
export const getOrderTitleText = (status?: string) => {
    return getStatusData(status).titleText;
};