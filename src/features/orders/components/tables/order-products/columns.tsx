import {ColumnDef} from "@tanstack/react-table";
import {OrderProduct} from "@/features/order-products/types";
import {Badge} from "@/components/ui/badge";
import {formatPrice} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Info} from "lucide-react";
import OrderProductsTableActions from "@/features/orders/components/tables/order-products/order-products-table-actions";

export const OrderProductsColumnDefs: ColumnDef<OrderProduct>[] = [
    {
        accessorKey: "product.name",
        header: () => <span className={'text-xs text-nowrap'}>Наименование</span>,
        cell: ({row}) => (
            <>
                <div className="font-medium m-0 text-nowrap flex gap-2">
                    {row.original.product.name}
                    <Badge variant={'outline'}
                           className={'text-muted-foreground font-normal'}>
                        {row.original.product.brand.name}
                    </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                </span>
            </>
        ),
    },
    {
        accessorKey: "product.partNumber",
        header: () => <span className={'text-xs text-nowrap'}>Партномер</span>,
        cell: ({row}) => (
            <div>
                <p className="m-0 text-muted-foreground">
                    {(row.original.product.partNumber)}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "product.sku",
        header: () => <span className={'text-xs text-nowrap'}>Артикул</span>,
        cell: ({row}) => (
            <div>
                <p className="m-0 text-muted-foreground">
                    {row.original.product.sku}
                </p>
            </div>
        ),
    },


    {
        accessorKey: "quantity",
        header: () => <span className={'text-xs text-nowrap'}>Количество</span>,
        cell: ({row}) => (
            <div className="space-x-1">
                <span>{Number(row.original.quantity).toFixed()}</span>
                <span className="text-xs text-muted-foreground">шт.</span>
            </div>
        ),
    },
    {
        accessorKey: "appliedPrice",
        header: () => <span className={'text-xs text-nowrap'}>Цена</span>,
        cell: ({row}) => {
            const actualPrice = Number(row.original.actualPrice);
            const estimatedPrice = Number(row.original.estimatedPrice)
            // const currentPrice = actualPrice > 0 && estimatedPrice
            return (
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className={'flex gap-1 items-center'}>
                                <Info size={14} className={'text-muted-foreground'}/>
                                {formatPrice(actualPrice)}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div>
                                <p>Оригинальная цена: {actualPrice > 0 && estimatedPrice}</p>
                                <p>Примененная цена: {actualPrice > 0 && estimatedPrice}</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "total",
        header: () => <span className={'text-xs text-nowrap'}>Сумма</span>,
        cell: ({row}) => {
            const price = Number(row.original.quantity) * (parseInt(row.original.actualPrice || row.original.estimatedPrice))
            return (
                <span>{formatPrice(price)}</span>
            )
        },
    },
    {
        accessorKey: "actions",
        header: () => <span className={'text-xs text-nowrap'}>Действия</span>,
        cell: ({row}) => {
            return (
                <OrderProductsTableActions row={row}/>
            )
        },
    },
]