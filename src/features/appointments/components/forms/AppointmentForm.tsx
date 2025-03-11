import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import { useAppointmentForm } from "@/features/appointments/hooks/useAppointmentForm";
import { AppointmentFormFields } from "@/features/appointments/components/forms/appointments-form-fields";
import { AppointmentInput } from "@/features/appointments/types";
import { Trash } from "lucide-react";

interface Props {
    orderId?: number;
    appointmentData?: AppointmentInput;
    onSuccess?: () => void;
    onCreate?: (data: AppointmentInput) => void;
    onUpdate?: (eventId: number) => (data: AppointmentInput) => void;
    onDelete?: (eventId: number) => void;
}

export const AppointmentForm = ({
                                    orderId,
                                    onSuccess,
                                    appointmentData,
                                    onCreate,
                                    onUpdate,
                                    onDelete
                                }: Props) => {
    const { form, onSubmit, isLoading } = useAppointmentForm({
        orderId,
        onSuccess,
        appointmentData,
        onCreate,
        onUpdate,
    });

    const handleDelete = () => {
        if (appointmentData?.id && onDelete) {
            onDelete(Number(appointmentData?.id));
        }
    };

    const isEditMode = Boolean(appointmentData?.id);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <AppointmentFormFields form={form} />

                <div className="flex justify-between gap-3">
                    {isEditMode && onDelete && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="text-destructive hover:bg-destructive/10"
                        >
                            <Trash size={18} className="mr-2" />
                            Удалить
                        </Button>
                    )}

                    <div className="ml-auto">
                        <Button
                            disabled={isLoading}
                            variant="default"
                            type="submit"
                        >
                            {isEditMode ? 'Сохранить' : 'Создать'}
                            {isLoading && <LoaderAnimated className="ml-2 text-white" />}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};