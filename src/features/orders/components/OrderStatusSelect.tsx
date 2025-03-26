import {Button} from "@/components/ui/button";
import {Order, OrderStatus} from "@/features/orders/types";
import {ChevronDown, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";
import {getStatusData} from "@/features/orders/lib/statuses";
import {useChangeOrderStatus} from "@/features/orders/api/mutations";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

type Props = {
    order: Order | undefined;
};

const OrderStatusSelect = ({order}: Props) => {
    if (!order) return null

    const currentStatus = order?.status;
    // Получаем информацию о текущем статусе, включая nextStatus
    const {nextStatus} = getStatusData(currentStatus);
    const {color: nextStatusColor, label: nextStatusLabel} = getStatusData(nextStatus);
    const {mutate, isPending} = useChangeOrderStatus(order?.id)
    // Обработчик клика по кнопке следующего статуса
    const handleStatusChange = () => {
        console.log("Переход к статусу:", nextStatus);
        if (nextStatus) {
            mutate({newStatus: nextStatus as OrderStatus})
        }

    };

    // Обработчик открытия выпадающего списка статусов
    const handleDropdownClick = () => {
        console.log("Открыто меню выбора статуса");
        // Здесь будет логика открытия дропдауна со всеми статусами
    };

    return (
        <div className="inline-flex -space-x-px  rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
            <Button
                className={cn("rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 group", nextStatusColor)}
                variant="outline"
                aria-label="Change to next status"
                onClick={handleStatusChange}
                disabled={isPending}
            >
                {nextStatusLabel}
                {isPending
                    ? <LoaderAnimated/>
                    :
                    <ChevronRight className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"/>}
            </Button>
            <Button
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                variant="outline"
                size="icon"
                aria-label="Select status"
                onClick={handleDropdownClick}
            >
                <ChevronDown size={16} strokeWidth={2} aria-hidden="true"/>
            </Button>
        </div>
    );
};

export default OrderStatusSelect;