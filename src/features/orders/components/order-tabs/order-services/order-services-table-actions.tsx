import {Row} from "@tanstack/react-table";
import * as React from "react";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Check, Copy, Pencil, Trash2, UserPlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList,} from "@/components/ui/command"
import {cn} from "@/lib/utils";
import {Mechanic} from "@/features/mechanics/types";
import {useAllMechanics} from "@/features/mechanics/api/queries";
import {useParams} from "next/navigation";
import {useAddOrderServiceMechanic, useDeleteOrder, useDeleteOrderService} from "@/features/orders/api/mutations";
import {OrderService} from "@/features/orders/types";


type Props = {
    rowInstance: Row<OrderService>
};
const OrderServicesTableActions = ({rowInstance}: Props) => {


    const [open, setOpen] = useState(false);
    const {id} = useParams()
    const orderId = Number(id)

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const serviceId = rowInstance?.original?.id

    const {data: mechanics, isLoading} = useAllMechanics()

    // const {mutate: deleteService, isPending} = useDeleteServiceOrder()
    // const {mutate: updateMutation, isPending: updatePending} = useEditServiceOrder()
    // const {mutate: addEmployee, isPending:isAdding} = useAddOrderServiceEmployee()
    // const {mutate: deleteEmployee, isPending:isDeleting} = useDeleteOrderServiceEmployee()
    const {mutate: deleteService, isPending} = useDeleteOrderService(orderId)
    const {mutate: updateMutation, isPending: updatePending} = useDeleteOrder(orderId)
    const {mutate: addMechanic, isPending: isAdding} = useAddOrderServiceMechanic(orderId)
    const {mutate: deleteEmployee, isPending: isDeleting} = useDeleteOrder(orderId)

    function handleDeleteClick() {
        deleteService(serviceId, {
            onSettled: () => {
                setPopoverOpen(false)
            }
        })
    }

    function handleCheckedChange(mechanic: Mechanic, isChecked: boolean) {
        if (isChecked) {
            addMechanic({
                orderServiceId: serviceId,
                mechanicId: mechanic.id
            })
        } else {
            console.log('CHECKED ELSEEEE', mechanic.id)

            // const orderServiceEmployee = rowInstance?.original?.mechanics.find((e: any) => e.mechanic_id === mechanic.id);
            // if (orderServiceEmployee) {
            //     deleteEmployee({employeeId: orderServiceEmployee.id, serviceId});
            // }
        }
    }

    return (
        <div className={'text-right text-nowrap'}>
            <div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon">
                            <UserPlus className="h-4 w-4"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align={'start'} side={'right'}>
                        <Command>

                            <CommandList>
                                <CommandEmpty>Не найдено.</CommandEmpty>
                                <CommandGroup>
                                    {mechanics?.map((mechanic: Mechanic) => (
                                        <CommandItem
                                            disabled={isAdding || isDeleting}
                                            key={mechanic.id}
                                            value={mechanic.name}
                                            className={'cursor-pointer'}
                                            onSelect={() => {
                                                const isCurrentlySelected = rowInstance?.original?.mechanics.some((e: any) => e.mechanic_id === mechanic.id)
                                                handleCheckedChange(mechanic, !isCurrentlySelected)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    rowInstance?.original?.mechanics?.some((e: any) => e.mechanic_id === mechanic.id) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {mechanic.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="p-0">
                        <Pencil/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактирование</DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить заказ? Это действие невозможно отменить
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline">
                            Отмена
                        </Button>
                        <Button variant="destructive">
                            {/*{isPending ? <LoaderAnimated/> : "Удалить"}*/}
                            Удалить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog><Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="p-0">
                    <Copy/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактирование</DialogTitle>
                    <DialogDescription>
                        Вы уверены, что хотите удалить заказ? Это действие невозможно отменить
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">
                        Отмена
                    </Button>
                    <Button variant="destructive">
                        {/*{isPending ? <LoaderAnimated/> : "Удалить"}*/}
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
            {/*<Dialog>*/}
            {/*    <DialogTrigger asChild>*/}
            {/*        <Button size="icon" variant="ghost" className="p-0">*/}
            {/*            <Trash2/>*/}
            {/*        </Button>*/}
            {/*    </DialogTrigger>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogHeader>*/}
            {/*            <DialogTitle>Подтвердить удаление</DialogTitle>*/}
            {/*            <DialogDescription>*/}
            {/*                Вы уверены, что хотите удалить заказ? Это действие невозможно отменить*/}
            {/*            </DialogDescription>*/}
            {/*        </DialogHeader>*/}
            {/*        <DialogFooter>*/}
            {/*            <Button variant="outline">*/}
            {/*                Отмена*/}
            {/*            </Button>*/}
            {/*            <Button variant="destructive">*/}
            {/*                /!*{isPending ? <LoaderAnimated/> : "Удалить"}*!/*/}
            {/*                Удалить*/}
            {/*            </Button>*/}
            {/*        </DialogFooter>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild onClick={() => setPopoverOpen(true)}>
                    <Button variant={'ghost'} size={"sm"}>
                        <Trash2 size={16}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={'w-auto '}>

                    <Button disabled={isPending} variant={"destructive"} onClick={handleDeleteClick}
                            size={"sm"}>Удалить</Button>
                </PopoverContent>
            </Popover>
        </div>

    );
};
export default OrderServicesTableActions;
