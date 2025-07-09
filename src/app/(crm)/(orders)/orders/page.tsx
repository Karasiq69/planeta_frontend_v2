import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import OrdersDataTable from "@/features/orders/components/tables/OrdersDataTable";
import CreateOrderButton from "@/features/orders/components/create-order/CreateOrderButton";
import PageHeader from "@/components/common/PageHeader";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Заказы | CRM автосервис",
    description: "",
};
const Page = async ({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Заказы'} showBackButton={false}/>
                <CreateOrderButton/>

                <Card>
                    <OrdersDataTable/>
                </Card>

            </div>
        </section>
    );
};
export default Page;