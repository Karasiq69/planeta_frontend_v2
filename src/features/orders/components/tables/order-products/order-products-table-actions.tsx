import {OrderServiceMechanic} from "@/features/orders/types";
import {Row} from "@tanstack/react-table";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useDeleteMechanicOrderService} from "@/features/orders/api/mutations";
import {useParams} from "next/navigation";
import ServiceMechanicForm from "@/features/orders/components/forms/service-mechanic/ServiceMechanicForm";
import {OrderProduct} from "@/features/order-products/types";
import {useDeleteOrderProduct} from "@/features/order-products/api/mutations";
import {OrderProductForm} from "@/features/order-products/components/forms/OrderProductForm";

type Props = {
    row: Row<OrderProduct>
};
const OrderProductsTableActions = ({row}: Props) => {
    const {id} = useParams()
    const orderId = Number(id)

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const {mutate: deleteProduct, isPending} = useDeleteOrderProduct(orderId)

    function handleDeleteClick() {
        deleteProduct(row.original.id)
    }

    if (!row?.original) {
        return <div>Возможно произошла ошибка</div>
    }

    return (
        <div className={'text-right flex  items-center'}>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant={'ghost'} size={"sm"}>
                        <Pencil size={16}/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактировать товар</DialogTitle>
                    </DialogHeader>
                    <DialogDescription></DialogDescription>
                    <OrderProductForm orderProductData={row.original}/>
                </DialogContent>

            </Dialog>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild onClick={() => setPopoverOpen(true)}>
                    <Button variant={'ghost'} size={"sm"}>
                        <Trash2 size={16}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={'w-auto '}>

                    <Button
                        // disabled={isPending}
                        variant={"destructive"} onClick={handleDeleteClick}
                        disabled={isPending}
                        size={"sm"}>Удалить</Button>
                </PopoverContent>
            </Popover>

        </div>
    );
};
export default OrderProductsTableActions;
