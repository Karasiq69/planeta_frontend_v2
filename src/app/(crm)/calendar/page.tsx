import MainCalendar from "@/features/appointments/MainCalendar";
import {Card} from "@/components/ui/card";
import React from "react";

type Props = {};
const Page = (props: Props) => {
    return (

        <section>

            <div className={'space-y-5'}>
                <h3>Календарь</h3>

                <>
                        <MainCalendar/>
                </>

            </div>
        </section>
    );
};
export default Page;
          