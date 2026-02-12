import React from "react";
import {ChevronLeft, Printer, Trash2} from "lucide-react";
import CarContentWrapper from "@/features/cars/components/CarContentWrapper";
import {Button} from "@/components/ui/button";
import GoBackButton from "@/components/common/GoBackButton";

type Props = {
    params: Promise<{
        id: string
    }>
};
const Page = async (props: Props) => {
    const params = await props.params;
    return (
        <>
            <section>
                <div className={'space-y-5'}>
                    <CarContentWrapper carId={params.id}/>
                </div>
            </section>

        </>
    );
};
export default Page;
