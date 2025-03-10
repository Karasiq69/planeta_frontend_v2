import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import apiClient from "@/lib/auth/client";
import {APPOINTMENTS_URL} from "@/lib/constants";
import {appointmentsQueryKeys} from "@/features/appointments/api/query-keys";
import {EventInput} from "@fullcalendar/core";

export function useAddAppointment() {
    const queryClient = useQueryClient();

    const addAppointmentFn = async (appointment: any) => {
        const response = await apiClient.post(`${APPOINTMENTS_URL}/`, appointment);
        return response.data
    }

    return useMutation({
        mutationFn: addAppointmentFn,
        onSuccess: () => {
            toast.success('Запись добавлена')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: appointmentsQueryKeys.all
            });
        },
    })

}

export function useEditAppointment() {
    const queryClient = useQueryClient();

    const editAppointmentFn = async (eventId: number, updatedEvent: EventInput ) => {
        const response = await apiClient.patch(`${APPOINTMENTS_URL}/${eventId}/`, updatedEvent);
        return response.data
    }

    return useMutation({
        mutationFn: ({eventId, updatedEvent}: {eventId: number, updatedEvent: EventInput}) => editAppointmentFn(eventId, updatedEvent),
        onSuccess: () => {
            toast.success('Запись изменена')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {


            queryClient.invalidateQueries({
                queryKey: appointmentsQueryKeys.all
            });
        },
    })

}


export function useDeleteAppointment() {
    const queryClient = useQueryClient();

    const deleteAppointmentFn = async (appointmentId: any) => {
        const response = await apiClient.delete(`${APPOINTMENTS_URL}/${appointmentId}`);
        return response.data
    }

    return useMutation({
        mutationFn: deleteAppointmentFn,
        onSuccess: () => {
            toast.success('Запись удалена')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: appointmentsQueryKeys.all
            });
        },
    })

}