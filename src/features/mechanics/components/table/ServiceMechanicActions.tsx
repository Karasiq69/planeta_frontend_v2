import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useState} from "react";
import {Row} from "@tanstack/react-table";
import {OrderServiceMechanic} from "@/features/orders/types";

type Props = {
    rowInstance?: Row<OrderServiceMechanic>
};
const ServiceMechanicActions = ({rowInstance}: Props) => {

    const serviceEmployeeId = rowInstance?.original.id
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    // const {mutate: deleteEmployee, isPending} = useDeleteOrderServiceEmployee2()

    function handleDeleteClick() {
        // deleteEmployee(serviceEmployeeId || '')
    }

    if (!rowInstance?.original) {
        return <div>Возможно произошла ошибка</div>
    }

    return (
        <div className={'text-right  text-muted-foreground'}>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant={'ghost'} size={"sm"}>
                        <Pencil size={16}/>
                    </Button>
                </DialogTrigger>
                <DialogContent className={'space-y-3'}>
                    <DialogHeader>
                        <DialogTitle>Редактировать исполнителя</DialogTitle>
                    </DialogHeader>
                    {/*<OrderServiceEmployeeForm employeeId={serviceEmployeeId} employeeData={rowInstance?.original}  />*/}
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
                            size={"sm"}>Удалить</Button>
                </PopoverContent>
            </Popover>

        </div>
    );
};
export default ServiceMechanicActions;
