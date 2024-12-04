'use client'
import {useAuth} from "@/providers/AuthProvider";

type Props = {};
const Page = (props: Props) => {
    const {user, isLoading} = useAuth()
    return (
        <div>
            <h1>Profile</h1>
            <div>Welcome back, {!isLoading && user?.email}</div>
        </div>
    );
};
export default Page;
