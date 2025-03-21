import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import OrdersDataTable from "@/features/orders/components/tables/OrdersDataTable";
import CreateOrderButton from "@/features/orders/components/create-order/CreateOrderButton";

const Page = async ({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <h3>Заказы</h3>
                <CreateOrderButton/>
                <Card>
                    <Suspense>
                        <OrdersDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default Page;