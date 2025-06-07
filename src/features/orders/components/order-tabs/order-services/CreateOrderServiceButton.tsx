'use client'
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ServiceForm} from "@/features/services/components/forms/ServiceForm";
import {IService} from "@/features/services/types";
import {useAddOrderService} from "@/features/orders/api/mutations";
import {useParams} from "next/navigation";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

const CreateOrderServiceButton = () => {
    const [open, setOpen] = useState(false);

    const {id} = useParams()
    const orderId = Number(id)

    const {mutate: addOrderService, isPending} = useAddOrderService(orderId)

    // -- Добавляем услугу в заказ после создания
    const handleCreate = (data: IService) => {
        addOrderService(data.id, {
            onSuccess: () => {
                setOpen(false)
            }
        })

    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={'default'}>
                        <CirclePlus/>
                        Новая услуга
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'flex gap-2 justify-between'}>Создание новой услуги
                            {isPending && <LoaderAnimated text={'Добавляем к заказу..'}/>}
                        </DialogTitle>
                        <DialogDescription>Создать новую услугу и добавить ее к заказу</DialogDescription>
                    </DialogHeader>
                    <ServiceForm onCreate={handleCreate}/>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default CreateOrderServiceButton;
