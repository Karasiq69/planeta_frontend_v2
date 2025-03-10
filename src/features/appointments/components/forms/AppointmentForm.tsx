import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useAppointmentForm} from "@/features/appointments/hooks/useAppointmentForm";
import {AppointmentFormFields} from "@/features/appointments/components/forms/appointments-form-fields";
import {AppointmentFormData} from "@/features/appointments/components/forms/schema";
import {AppointmentInput} from "@/features/appointments/types";
import {ICar} from "@/features/cars/types";

interface Props {
    orderId?: number;
    appointmentData?: AppointmentInput
    onSuccess?: () => void;
    onCreate?: (data: AppointmentInput) => void
    onUpdate?: (eventId: number) => AppointmentInput;
}

export const AppointmentForm = ({ orderId, onSuccess, appointmentData, onCreate, onUpdate }: Props) => {
    const { form, onSubmit, isLoading } = useAppointmentForm({
        orderId,
        onSuccess,
        appointmentData,
        onCreate,
        onUpdate,

    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <AppointmentFormFields form={form}  />

                <div className="flex justify-end gap-3">
                    <Button
                        disabled={isLoading}
                        variant="default"
                        type="submit"
                    >
                        {appointmentData?.id ? 'Обновить' : 'Создать'}
                        {isLoading && <LoaderAnimated className={'text-white'}/>}
                    </Button>
                </div>
            </form>
        </Form>
    );
};