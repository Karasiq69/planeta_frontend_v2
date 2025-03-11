import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appointmentSchema, AppointmentFormData } from "../components/forms/schema";
import { useState, useMemo } from "react";
import { AppointmentInput } from "../types";

interface UseAppointmentFormProps {
    orderId?: number;
    appointmentData?: AppointmentInput;
    onSuccess?: () => void;
    onCreate?: (data: AppointmentInput) => void;
    onUpdate?: (eventId: number) => (data: AppointmentInput) => void;
}

export const useAppointmentForm = ({
                                       orderId,
                                       appointmentData,
                                       onSuccess,
                                       onCreate,
                                       onUpdate,
                                   }: UseAppointmentFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    // Используем useMemo для вычисления defaultValues
    const defaultValues = useMemo(() => {
        return {
            title: appointmentData?.title || "",
            description: appointmentData?.description || "",
            start: appointmentData?.start as Date,
            end: appointmentData?.end as Date? appointmentData?.end as Date : appointmentData?.start as Date,
            allDay: appointmentData?.allDay || false,
            resource: appointmentData?.resource || "A",
        };
    }, [appointmentData]);

    // Настройка формы с начальными значениями
    const form = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        mode: 'onSubmit',
        defaultValues: defaultValues,
    });

    const onSubmit = async (data: AppointmentFormData) => {
        setIsLoading(true);
        try {
            if (appointmentData?.id && onUpdate) {
                // Если есть ID, то это обновление
                const updateFn = onUpdate(Number(appointmentData.id));
                updateFn({
                    title: data.title,
                    description: data.description,
                    start: data.start,
                    end: data.end,
                    allDay: data.allDay,
                    resource: data.resource,
                    orderId: appointmentData.orderId,
                    createdBy: appointmentData.createdBy
                });
            } else if (onCreate) {
                // Иначе это создание
                onCreate({
                    title: data.title,
                    description: data.description,
                    start: data.start,
                    end: data.end,
                    allDay: data.allDay,
                    resource: data.resource,
                    orderId: orderId,
                    createdBy: appointmentData?.createdBy
                });
            }

            onSuccess?.();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        onSubmit,
        isLoading,
    };
};