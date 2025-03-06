'use client'
import Pre from "@/components/ui/Pre";
import {useAllStorageLocations} from "@/features/warehouse/api/queries";

type Props = {};
const Page = (props: Props) => {
    // const {data, isLoading} = useUser()
    const { data: storageLocations = [], isLoading } = useAllStorageLocations();

    if (isLoading) return 'ev load'
    return (
        <div className={'text-xs '}>
            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(events, null, 2)}</pre>*/}
            <Pre object={storageLocations}/>
            sex
        </div>
    );
};
export default Page;
