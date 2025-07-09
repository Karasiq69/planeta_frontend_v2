import React from "react";
import {ChevronLeft, Printer, Trash2} from "lucide-react";
import CarContentWrapper from "@/features/cars/components/CarContentWrapper";
import {Button} from "@/components/ui/button";
import GoBackButton from "@/components/common/GoBackButton";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Авто | CRM автосервис",
    description: "",
};

type Props = {
    params: {
        id: string
    }
};
const Page = async ({params}: Props) => {
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
