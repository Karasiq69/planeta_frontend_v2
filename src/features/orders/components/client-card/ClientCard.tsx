import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ClipboardList, UserIcon} from "lucide-react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";
import OrderSkeletonCard from "@/components/skeletons/order-card-skeleton";
import AddOrderClientButton from "@/features/orders/components/client-card/AddOrderClientButton";
import {formatPhone} from "@/lib/utils";
import ClientCardDropdownMenu from "@/features/orders/components/client-card/ClientCardDropdownMenu";

type Props = {};
const ClientCard = (props: Props) => {
    const params = useParams()
    const {data: order, isLoading} = useOrderById(+params.id)

    if (isLoading) return <OrderSkeletonCard/>
    if (!order?.client) return <EmptyClientCard/>
    return (
        <>
            <Card>
                <CardHeader className={'flex flex-row justify-between items-center'}>
                    <div className={'flex flex-row flex-wrap gap-4 items-center'}>
                        <div>
                            <Avatar>
                                <AvatarImage src={''}/>
                                <AvatarFallback><UserIcon/></AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <CardTitle className={'flex items-center gap-2'}>
                                {order.client.firstName + ' ' + order.client.lastName}
                                <span className={'font-normal text-sm'}> VIP</span>
                            </CardTitle>
                            <CardDescription>
                                {order.client.email}
                            </CardDescription>
                        </div>
                    </div>
                    <ClientCardDropdownMenu/>
                </CardHeader>
                <CardContent className={'flex gap-3  justify-between items-center'}>
                    <span>{formatPhone(order.client?.phone)}</span>
                    <Button variant={'link'} size={'sm'} className={'p-0 font-semibold text-muted-foreground'}>
                        <ClipboardList size={16}/>
                        6 заказов</Button>
                </CardContent>
            </Card>
        </>
    );
};
export default ClientCard;


const EmptyClientCard = () => {
    return (
        <Card className="h-[150px] border  border-dashed border-gray-200  flex items-center justify-center">
            <AddOrderClientButton/>
        </Card>
    );
};

