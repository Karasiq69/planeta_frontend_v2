import MainCalendar from "@/features/appointments/MainCalendar";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Календарь | CRM автосервис",
    description: "",
};

const Page = () => {
    return (

        <section>

            <div className={'space-y-5'}>
                <PageHeader title={"Календарь"}/>
                <MainCalendar/>
            </div>
        </section>
    );
};
export default Page;
          