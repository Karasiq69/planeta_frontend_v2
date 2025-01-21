'use client'
import {useUser} from "@/hooks/use-auth";

type Props = {};
const Page = (props: Props) => {
    const {data, isLoading} = useUser()
    return (
        <div>{JSON.stringify(data)}</div>
    );
};
export default Page;
