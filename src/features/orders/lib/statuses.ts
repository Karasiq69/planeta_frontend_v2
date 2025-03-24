import { CircleCheck, CircleDashed, CircleEqual, CircleX, FileClock, Timer, Warehouse } from "lucide-react";

// Определение типа статуса
export interface StatusItem {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

// Экспорт массива статусов с правильной типизацией
export const statuses: StatusItem[] = [
    {
        value: "application",
        label: "Заявка",
        icon: CircleDashed,
        color: "bg-rose-100 text-rose-800",
    },
    {
        value: "order",
        label: "Заказ",
        icon: CircleEqual,
        color: "bg-sky-100 text-sky-800",
    },
    {
        value: "in_progress",
        label: "В работе",
        icon: Timer,
        color: "bg-violet-100 text-violet-800",
    },
    {
        value: "waiting_warehose",
        label: "Ждет склад",
        icon: Warehouse,
        color: "bg-amber-100 text-amber-800",
    },
    {
        value: "awaiting_payment",
        label: "Ждет оплаты",
        icon: FileClock,
        color: "bg-emerald-100 text-emerald-800",
    },
    {
        value: "paid",
        label: "Оплачен",
        icon: CircleCheck,
        color: "bg-cyan-100 text-cyan-800",
    },
    {
        value: "completed",
        label: "Завершен",
        icon: CircleCheck,
        color: "bg-green-100 text-green-800",
    },
    {
        value: "closed",
        label: "Закрыт",
        icon: CircleX,
        color: "bg-gray-100 text-gray-800",
    },
];