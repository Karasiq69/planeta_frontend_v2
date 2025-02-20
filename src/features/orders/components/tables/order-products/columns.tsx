import {ColumnDef} from "@tanstack/react-table";
import {OrderProduct} from "@/features/order-products/types";

export const OrderProductsColumnDefs: ColumnDef<OrderProduct>[] = [
    {
        accessorKey: "productId",
        header: () => <div>Код товара</div>,
        cell: ({row}) => (
            <div>
                <p className="m-0 text-muted-foreground">
                    {String(row.original.productId).padStart(8, '0')}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "product.name",
        header: () => <div>Наименование</div>,
        cell: ({row}) => (
            <div>
                <p className="font-medium m-0 text-nowrap">
                    {row.original.product.name}
                </p>
                <span className="text-xs text-muted-foreground">
                    {row.original.product.description}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "appliedPrice",
        header: () => <div>Цена</div>,
        cell: ({row}) => {
            const originalPrice = row.original.product.price;
            const appliedPrice = parseInt(row.original.estimatedPrice);
            const hasDiscount = originalPrice !== appliedPrice;

            return (
                <div className="space-x-1">
                    {hasDiscount && (
                        <span>
                            (-{Math.round((1 - appliedPrice / originalPrice) * 100)}
                            <span className="text-xs text-muted-foreground">%)</span>
                        </span>
                    )}
                    <span>{appliedPrice}</span>
                    <span className="text-xs text-muted-foreground">руб.</span>
                </div>
            );
        },
    },
    {
        accessorKey: "quantity",
        header: () => <div>Количество</div>,
        cell: ({row}) => (
            <div className="space-x-1">
                <span>{row.original.quantity}</span>
                <span className="text-xs text-muted-foreground">шт.</span>
            </div>
        ),
    },
    {
        accessorKey: "total",
        header: () => <div>Сумма</div>,
        cell: ({row}) => (
            <div className="space-x-1">
                {/*<span>{(row.original.quantity)   (parseInt(row.original.estimatedPrice))}</span>*/}
                <span className="text-xs text-muted-foreground">руб.</span>
            </div>
        ),
    },
]