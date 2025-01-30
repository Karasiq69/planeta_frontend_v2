import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ClipboardList, EllipsisVertical, UserIcon} from "lucide-react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";

type Props = {};
const ClientCard = (props: Props) => {
    const params = useParams()
    const {data: order, isLoading} = useOrderById(+params.id)

    if (isLoading) return 'loading..'
    if (!order) return 'no order or error'
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
                    <Button variant={'outline'} size={'icon'}><EllipsisVertical/></Button>
                </CardHeader>
                <CardContent className={'flex gap-3  justify-between items-center'}>
                    <span>+{order.client.phone}</span>
                    <Button variant={'link'} size={'sm'} className={'p-0 font-semibold text-muted-foreground'}>
                        <ClipboardList size={16}/>
                        6 заказов</Button>
                </CardContent>
            </Card>
        </>
    );
};
export default ClientCard;
