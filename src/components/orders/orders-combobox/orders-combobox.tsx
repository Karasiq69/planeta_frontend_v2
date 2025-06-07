'use client'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import React, {useState} from "react";
import {useOrdersList} from "@/features/orders/api/queries";

type Props = {
    value?: string,
    onChange?: (value: string) => void
};

const OrdersCombobox = ({value, onChange}: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const {data, isLoading, isFetching} = useOrdersList({
        page: 1,
        pageSize: 50,
        searchTerm: searchTerm || undefined,
    });

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === value ? "" : currentValue;
        onChange?.(newValue);
        setOpen(false);
    };

    // Найти выбранный заказ для отображения
    const selectedOrder = data?.data.find((order) => order?.id?.toString() === value);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                    <Button
                        disabled={isLoading}
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between hover:bg-white w-full",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {selectedOrder
                            ? `#${selectedOrder.id} - ${selectedOrder.client?.firstName} ${selectedOrder.client?.lastName}`
                            : "Выбрать заказ..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                <Command>
                    <CommandInput

                        className={'w-full'}
                        placeholder="Поиск заказа..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandEmpty>
                        {isLoading || isFetching ? "Загрузка..." : "Заказ не найден."}
                    </CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {data?.data.map((order) => (
                                <CommandItem
                                    key={order.id}
                                    value={order.id.toString()}
                                    onSelect={handleSelect}
                                    className={'justify-between cursor-pointer'}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={'font-bold'}>
                                            #{order.id}
                                        </span>
                                        <span>
                                            {order.client?.firstName} {order.client?.lastName}
                                        </span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "h-4 w-4",
                                            value === order?.id?.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default OrdersCombobox;