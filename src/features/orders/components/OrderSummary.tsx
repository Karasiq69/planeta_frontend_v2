import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Copy, CreditCard, Pencil} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {OrderStatusSelector} from "@/features/orders/components/OrderStatusSelector";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";
import ReasonToApply from "@/features/orders/components/order-summary/reason-to-apply";
import Recommendation from "@/features/orders/components/order-summary/recommendation";


type Props = {};
const OrderSummary = (props: Props) => {
    const params = useParams()
    const {data: order, isLoading} = useOrderById(+params.id)

    if (isLoading) return 'loading..'
    if (!order) return 'no order or error'
    return (
        <>
            <Card className={'bg-muted'}>
                <CardHeader className="flex flex-row items-start bg-background/80 rounded-t-lg border-b">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Заказ №302
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
                            Изменен {new Date(order.updatedAt).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                            <span className={'flex gap-1 items-center'}>Петр Иванов</span>
                        </CardDescription>
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
            <Card className={'bg-muted'}>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Информация о заказе</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Количество, ч</span>
                                <span>7</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Подытог</span>
                                <span>{order.totalCost - 10 * 100} ₽</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Налог</span>
                                <span>18%</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Итого</span>
                                <span>{order.totalCost} ₽</span>
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
                        Оплачено <time dateTime="2023-11-23">02 февраля 2025 г.</time>
                    </div>
                </CardFooter>
            </Card>
        </>

    );
};
export default OrderSummary;
