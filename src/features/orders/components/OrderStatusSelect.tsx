import {Button} from "@/components/ui/button";
import {Order, OrderStatus} from "@/features/orders/types";
import {ChevronDown, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";
import {getStatusData, statuses} from "@/features/orders/lib/statuses";
import {useChangeOrderStatus} from "@/features/orders/api/mutations";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger,} from "@/components/ui/select";
import {useState} from "react";

type Props = {
    order: Order;
};

const OrderStatusSelect = ({order}: Props) => {
    const {mutate, isPending} = useChangeOrderStatus(order?.id);

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    if (!order) return null;

    const currentStatus = order?.status;
    // Получаем информацию о текущем статусе, включая nextStatus
    const {nextStatus} = getStatusData(currentStatus);
    const {color: nextStatusColor, label: nextStatusLabel} = getStatusData(nextStatus);

    // Обработчик клика по кнопке следующего статуса
    const handleStatusChange = () => {
        mutate({newStatus: nextStatus as OrderStatus});
    };

    // Обработчик выбора статуса из выпадающего списка
    const handleSelectChange = (newStatus: OrderStatus) => {
        console.log("Выбран статус:", newStatus);
        if (currentStatus !== newStatus) {
            mutate({newStatus: newStatus});
        }
    };

    // Обработчик открытия выпадающего списка статусов
    const handleDropdownClick = () => {
        setIsSelectOpen(true);
    };

    return (
        <div>
            <span className={'text-xs text-muted-foreground'}>Сменить статус на:</span>
            <div className="flex items-center gap-1">
                <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">

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

                    <Select
                        value={currentStatus}
                        onValueChange={handleSelectChange}
                        open={isSelectOpen}
                        onOpenChange={setIsSelectOpen}
                    >
                        <SelectTrigger
                            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10">
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    );
};

export default OrderStatusSelect;