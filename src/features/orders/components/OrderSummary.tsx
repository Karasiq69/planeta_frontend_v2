import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useOrderById} from "@/features/orders/api/queries";
import ReasonToApply from "@/features/orders/components/order-summary/reason-to-apply";
import Recommendation from "@/features/orders/components/order-summary/recommendation";
import OrderSummarySkeleton from "@/components/skeletons/order-summary-skeleton";
import {formatRelativeTime} from "@/lib/format-date";
import OrderTotals from "@/features/orders/components/order-summary/OrderTotals";
import OrderStatusSelect from "@/features/orders/components/OrderStatusSelect";
import {getStatusData} from "@/features/orders/lib/statuses";


type Props = {
    orderId: number
};
const OrderSummary = ({orderId}: Props) => {

    const {data: order, isLoading} = useOrderById(orderId)
    const {isApplication, titleText} = getStatusData(order?.status);


    if (isLoading) return <OrderSummarySkeleton/>
    if (!order) return 'no order or error'
    return (
        <>
            <Card className={''}>
                <CardHeader className="flex flex-row items-start bg-background/80 rounded-t-lg border-b">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {titleText} №{orderId}
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
                        <p className={'text-xs'}>Изменен {formatRelativeTime(order?.updatedAt)}</p>
                        <p className={'text-xs'}>Создан {formatRelativeTime(order?.createdAt)}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <OrderStatusSelect order={order}/>
                    </div>
                </CardHeader>
                {!isApplication ?
                    <CardContent className={'p-6'}>
                        <div className="grid gap-5">
                            <ReasonToApply order={order}/>
                            <Separator/>
                            <Recommendation order={order}/>
                        </div>
                    </CardContent>
                    : undefined
                }

            </Card>

            <OrderTotals orderId={orderId}/>
        </>

    );
};
export default OrderSummary;
