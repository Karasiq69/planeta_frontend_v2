import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useAppointmentForm} from "@/features/appointments/hooks/useAppointmentForm";
import {AppointmentFormFields} from "@/features/appointments/components/forms/appointments-form-fields";

interface Props {
    orderId: number;
    onSuccess?: () => void;
}

export const AppointmentForm = ({ orderId, onSuccess }: Props) => {
    const { form, onSubmit, isLoading } = useAppointmentForm({
        orderId,
        onSuccess,
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
                        Создать запись
                        {isLoading && <LoaderAnimated className="ml-2 text-white" />}
                    </Button>
                </div>
            </form>
        </Form>
    );
};