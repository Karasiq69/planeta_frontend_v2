import {SectionCards} from "@/features/dashboard/components/SectionCards";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Дашборд | CRM автосервис",
    description: "",
};
type Props = {};
const Page = (props: Props) => {
    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={`Дашборд`}/>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="">
                                {/*<ChartAreaInteractive />*/}

                            </div>

                            {/*<DataTable data={data} />*/}
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};
export default Page;
          