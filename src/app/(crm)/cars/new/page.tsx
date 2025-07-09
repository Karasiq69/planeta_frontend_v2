import NewCarPageWrapper from "@/features/cars/components/NewCarPageWrapper";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Новый автомобиль | CRM автосервис",
    description: "",
};
type Props = {};
const Page = (props: Props) => {
    return (
        <NewCarPageWrapper/>
    );
};
export default Page;
