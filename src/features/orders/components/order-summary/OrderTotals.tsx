import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {CreditCard} from "lucide-react";
import {useOrderServicesById} from "@/features/orders/api/queries";
import {useOrderProductsByOrderId} from "@/features/order-products/api/queries";
import {Skeleton} from "@/components/ui/skeleton";
import {getOrderSummary} from "@/features/orders/lib/order-calculator";

type Props = {
    orderId: number;
};

const OrderTotals = ({orderId}: Props) => {
    const {data: orderServices, isLoading: isServicesLoading} = useOrderServicesById(orderId);
    const {data: orderProducts, isLoading: isProductsLoading} = useOrderProductsByOrderId(orderId);

    if (isServicesLoading || isProductsLoading) {
        return <OrderTotalsSkeleton/>;
    }

    const summary = getOrderSummary(orderServices || [], orderProducts || []);

    return (
        <Card>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Работы</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Количество</span>
                            <span>{summary.services.count}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Расчетное время</span>
                            <span>{summary.services.formattedDuration}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Сумма</span>
                            <span>{summary.services.formattedTotal}</span>
                        </li>
                    </ul>
                </div>

                <Separator className="my-4"/>
                <div className="grid gap-3">
                    <div className="font-semibold">Товары</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Количество</span>
                            <span>{summary.products.count}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Итого</span>
                            <span>{summary.products.formattedTotal}</span>
                        </li>
                    </ul>
                </div>

                <Separator className="my-4"/>
                <div className="grid gap-3">
                    <div className="font-semibold">Информация о заказе</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Подытог</span>
                            <span>{summary.summary.formattedSubtotal}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">НДС (18%)</span>
                            <span>{summary.summary.formattedTax}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Итого</span>
                            <span>{summary.summary.formattedTotal}</span>
                        </li>
                    </ul>
                </div>

                <Separator className="my-4"/>
                <div className="grid gap-3">
                    <div className="font-semibold">Информация об оплате</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                <CreditCard className="h-4 w-4"/>
                                Visa
                            </dt>
                            <dd>**** **** **** 4532</dd>
                        </div>
                    </dl>
                </div>
            </CardContent>

            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Оплачено <time dateTime="2024-02-02">02 февраля 2024 г.</time>
                </div>
            </CardFooter>
        </Card>
    );
};

export const OrderTotalsSkeleton = () => (
    <Card>
        <CardContent className="p-6">
            {[1, 2, 3, 4].map((section) => (
                <div key={section} className="mb-4">
                    <Skeleton className="h-6 w-24 mb-3"/>
                    <div className="space-y-2">
                        {[1, 2, 3].map((item) => (
                            <Skeleton key={item} className="h-4 w-full"/>
                        ))}
                    </div>
                    {section !== 4 && <Separator className="my-4"/>}
                </div>
            ))}
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Skeleton className="h-4 w-48"/>
        </CardFooter>
    </Card>
);

export default OrderTotals;