import * as React from "react"

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useEditOrder} from "@/features/orders/api/mutations";
import {useOrderById} from "@/features/orders/api/queries";
import {useParams} from "next/navigation";
import {statuses} from "@/features/orders/lib/statuses"
import {OrderStatus} from "@/features/orders/types"; // Импортируем статусы

export function OrderStatusSelector() {
    const params = useParams()
    const orderId = Number(params.id)

    const {data: order, isLoading} = useOrderById(orderId)
    const {mutate: changeStatus, isPending} = useEditOrder(orderId)

    const handleChange = (newStatus: OrderStatus) => {
        if (order?.status !== newStatus) {
            changeStatus({status: newStatus})
        }
    }

    if (isLoading) return <div>Загрузка...</div>

    return (
        <Select
            value={order?.status}
            onValueChange={handleChange}
            disabled={isPending}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус заказа"/>
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
    )
}