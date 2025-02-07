'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {BookDashed, CircleFadingPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCreateOrder} from "@/features/orders/api/mutations";
import {ORDERS_URL} from "@/lib/constants";
import {useRouter} from "next/navigation";

type Props = {};
const WithEmptyFields = (props: Props) => {
    const router = useRouter()
    const {mutate, isPending} = useCreateOrder()

    const handleClick = () => {
        mutate({}, {
            onSuccess: (createdOrder) => {
                router.push(`${ORDERS_URL}/${createdOrder.id}`)
            }
        })
    }
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 items-center">
                    <CircleFadingPlus size={17}/>
                    Создать новый заказ
                </CardTitle>
                <CardDescription>
                    Создать пустой заказ, чтобы заполнить все поля позже
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={handleClick} variant="outline" className="w-full">
                    <BookDashed className="mr-2 h-4 w-4"/>
                    Создать пустой заказ
                </Button>
            </CardContent>
        </Card>
    );
};
export default WithEmptyFields;
