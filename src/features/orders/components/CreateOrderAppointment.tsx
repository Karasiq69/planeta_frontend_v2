import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {CalendarPlus} from "lucide-react";
import {AppointmentForm} from "@/features/appointments/components/forms/AppointmentForm";
import {useState} from "react";

type Props = {
    orderId: number
};
const CreateOrderAppointment = ({orderId}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Записать клиента
                </Button>
            </DialogTrigger>
            <DialogContent className={'lg:min-w-[900px]'}>
                <DialogHeader>
                    <DialogTitle>Создание записи</DialogTitle>
                </DialogHeader>
                <AppointmentForm
                    orderId={orderId}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>

     );
};
export default CreateOrderAppointment;

