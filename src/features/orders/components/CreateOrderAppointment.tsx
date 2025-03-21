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
import {useAddAppointment} from "@/features/appointments/api/mutations";
import {AppointmentInput} from "@/features/appointments/types";

type Props = {
    orderId: number
};
const CreateOrderAppointment = ({orderId}: Props) => {
    const [open, setOpen] = useState(false);
    const {mutate, isPending} = useAddAppointment()

    const handleCreateAppointment = (data: AppointmentInput) => {
        mutate(data)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Записать клиента
                </Button>
            </DialogTrigger>
            <DialogContent className={'lg:min-w-[900px]'}>
                <DialogHeader>
                    <DialogTitle>Создание записи</DialogTitle>
                </DialogHeader>
                <AppointmentForm
                    onCreate={handleCreateAppointment}

                    orderId={orderId}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>

     );
};
export default CreateOrderAppointment;

