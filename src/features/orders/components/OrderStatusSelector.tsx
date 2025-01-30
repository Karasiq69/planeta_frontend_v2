import * as React from "react"

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

export function OrderStatusSelector() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус заказа" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="apple">Заявка</SelectItem>
                    <SelectItem value="banana">Заказ-наряд</SelectItem>
                    <SelectItem value="blueberry">В работе</SelectItem>
                    <SelectItem value="pineapple">Ждет склад</SelectItem>
                    <SelectItem value="grapes">Ждет оплаты</SelectItem>
                    <SelectItem value="grapes">Завершен</SelectItem>
                    <SelectItem value="grapes">Архив</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
