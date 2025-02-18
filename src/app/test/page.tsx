'use client'
import {useUser} from "@/hooks/use-auth";
import {useAppointments} from "@/features/appointments/api/queries";

type Props = {};
const Page = (props: Props) => {
    const {data, isLoading} = useUser()
    const {data: events, isLoading: isEvLoad} = useAppointments()
    console.log(events)
    if (isEvLoad) return 'ev load'
    return (
        <div className={'text-xs text-muted-foreground'}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <pre>{JSON.stringify(events, null, 2)}</pre>
            sex
        </div>
    );
};
export default Page;
