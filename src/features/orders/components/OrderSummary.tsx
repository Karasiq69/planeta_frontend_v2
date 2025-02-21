import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Copy, CreditCard} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {OrderStatusSelector} from "@/features/orders/components/OrderStatusSelector";
import {useParams} from "next/navigation";
import {useOrderById, useOrderServicesById} from "@/features/orders/api/queries";
import ReasonToApply from "@/features/orders/components/order-summary/reason-to-apply";
import Recommendation from "@/features/orders/components/order-summary/recommendation";
import OrderSummarySkeleton from "@/components/skeletons/order-summary-skeleton";
import {formatRelativeTime} from "@/lib/format-date";
import {useOrderProductsByOrderId} from "@/features/order-products/api/queries";
import OrderTotals from "@/features/orders/components/order-summary/OrderTotals";


type Props = {};
const OrderSummary = (props: Props) => {
    const params = useParams()
    const orderId = Number(params.id)
    const {data: order, isLoading} = useOrderById(orderId)


    if (isLoading) return <OrderSummarySkeleton/>
    if (!order) return 'no order or error'
    return (
        <>
            <Card className={''}>
                <CardHeader className="flex flex-row items-start bg-background/80 rounded-t-lg border-b">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Заказ №{orderId}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3"/>
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription className={'text-xs'}>
                            <span className={'flex gap-1 items-center'}>Создал: {order?.creator?.username}</span>
                        </CardDescription>
                        <p className={'text-xs'} >Изменен {formatRelativeTime(order?.updatedAt)}</p>
                        <p className={'text-xs'}>Создан {formatRelativeTime(order?.createdAt)}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <OrderStatusSelector/>
                    </div>
                </CardHeader>
                <CardContent className={'p-6'}>
                    <div className="grid gap-5">
                        <ReasonToApply order={order}/>
                        <Separator/>
                        <Recommendation order={order}/>
                    </div>
                </CardContent>
            </Card>

           <OrderTotals orderId={orderId}/>
        </>

    );
};
export default OrderSummary;
