import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import {Card} from "@/components/ui/card";
import ClientsDataTable from "@/features/clients/components/table/ClientsDataTable";
import React, {Suspense} from "react";

const Page = async ({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <h3>Клиенты</h3>
                <Button variant={'default'}><CirclePlus/>Новый клиент</Button>
                <Card>
                    <Suspense>
                        <ClientsDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default Page;
