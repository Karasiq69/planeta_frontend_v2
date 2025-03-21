import {statuses, StatusItem} from "@/features/orders/lib/statuses";
import {OrderStatus} from "@/features/orders/types";

export const getStatusField = (
    status: OrderStatus | undefined,
    field: keyof StatusItem
) => {
    if (!status) return '';
    const statusObj = statuses.find(s => s.value === status);
    return statusObj?.[field] ?? status;
}

export const isOrderApplication = (status: OrderStatus | undefined): boolean => {
    if (!status) return false;
    return status === statuses[0].value; // "application"
}

export const getOrderTitleText = (status: OrderStatus | undefined): string => {
    return isOrderApplication(status) ? "Заявка" : "Заказ";
}