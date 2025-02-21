import {Card} from "@/components/ui/card";
import ClientsDataTable from "@/features/clients/components/table/ClientsDataTable";
import React, {Suspense} from "react";
import CreateClientButton from "@/features/clients/components/CreateClientButton";

const Page = async ({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <h3>Клиенты</h3>
                <CreateClientButton/>
                <Suspense>
                <Card>
                    <ClientsDataTable/>
                </Card>
                </Suspense>
            </div>
        </section>
    );
};
export default Page;
