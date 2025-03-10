import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAddAppointment, useEditAppointment} from "../api/mutations";
import {useUser} from "@/hooks/use-auth";
import {AppointmentFormData, appointmentSchema} from "@/features/appointments/components/forms/schema";
import {STATION_RESOURCES} from "@/lib/constants";
import {AppointmentInput} from "@/features/appointments/types";

type Props = {
    orderId?: number;
    appointmentData?: AppointmentInput
    onSuccess?: () => void;
    onCreate?: (data: AppointmentInput) => void; // дополнительная функция при создании
    onUpdate?: (eventId: number) => AppointmentInput;
};

export const useAppointmentForm = ({orderId, onSuccess, appointmentData, onUpdate, onCreate}: Props) => {
    const {data: userData} = useUser();
    const {mutate: addAppointment, isPending} = useAddAppointment();
    const {mutate: editAppointmentMutation, isPending: isEditAppointmentPending} = useEditAppointment();

    const form = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            title: "",
            description: "",
            allDay: false,
            resource: STATION_RESOURCES[0].id, // По умолчанию первая станция
            start: new Date(),
            end: new Date(),
        },
    });

    const onSubmit = async (data: AppointmentFormData) => {
        if (!userData?.userId) return;

        // Находим выбранную станцию для использования её цветов
        const selectedStation = STATION_RESOURCES.find(station => station.id === data.resource);

        const appointmentData = {
            ...data,
            orderId,
            createdBy: userData.userId,
            status: "scheduled",
            // Добавляем цвета из ресурса
            backgroundColor: selectedStation?.eventColor,
            textColor: selectedStation?.eventTextColor,
            borderColor: selectedStation?.eventBorderColor,
        };

        addAppointment(appointmentData, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            },
        });
    };

    return {
        form,
        onSubmit,
        isLoading: isPending,
    };
};