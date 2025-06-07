import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import OrdersDataTable from "@/features/orders/components/tables/OrdersDataTable";
import CreateOrderButton from "@/features/orders/components/create-order/CreateOrderButton";
import ApplicationsDataTable from "@/features/orders/applications/tables/ApplicationsDataTable";
import PageHeader from "@/components/common/PageHeader";

const Page = async () => {

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Заявки на ремонт'} showBackButton={false}/>
                <CreateOrderButton/>
                <Card>
                    <Suspense>
                        <ApplicationsDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default Page;