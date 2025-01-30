'use client'
import GoBackButton from "@/components/common/GoBackButton";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Printer, Trash2} from "lucide-react";
import ClientCard from "@/features/orders/components/ClientCard";
import CarCard from "@/features/orders/components/CarCard";
import OrdersTabsWrapper from "@/features/orders/components/OrdersTabsWrapper";
import OrderSummary from "@/features/orders/components/OrderSummary";
import React from "react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";

type Props = {};
const OrderPageWrapper = (props: Props) => {
    const params = useParams()
    const {data: order, isLoading} = useOrderById(+params.id)

    if (isLoading) return 'loading..'
    if (!order) return 'no order or error'
    return (
        <div className={'space-y-5'}>
            <section>
                <div className={'flex justify-between items-center'}>
                    <div className={'flex flex-wrap gap-5 items-center'}>
                        <GoBackButton/>
                        <div>
                            <h3>Заказ №{params.id}</h3>
                        </div>
                        <Badge variant={'outline'}>{order.status}</Badge>
                        <Badge variant={'destructive'}>Не заполнено</Badge>
                    </div>

                    <div className="space-x-4">
                        <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                        <Button variant="ghost" size={'sm'}><Trash2 size={16}/> Удалить заказ</Button>
                    </div>

                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5">
                {/* left section*/}
                <div className="md:col-span-2 space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:min-h-[156px]   drop-shadow-sm">
                        <ClientCard/>
                        <CarCard/>
                    </div>
                    <div>
                        <OrdersTabsWrapper/>
                    </div>

                </div>

                {/* right section*/}
                <div className="md:col-span-1 space-y-5">
                    <OrderSummary/>
                </div>
            </section>
        </div>
    );
};
export default OrderPageWrapper;
