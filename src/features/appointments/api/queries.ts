import {useQuery} from "@tanstack/react-query";
import {appointmentsQueryKeys} from "@/features/appointments/api/query-keys";
import {getAppointmentsFn} from "@/features/appointments/api/actions";


export const useAppointments = () => {
    return useQuery({
        queryKey: appointmentsQueryKeys.all,
        queryFn: () => getAppointmentsFn(),
    })
}

