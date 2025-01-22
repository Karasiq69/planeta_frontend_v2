import {Card} from "@/components/ui/card";
import ClientsDataTable from "@/features/clients/components/table/ClientsDataTable";
import React, {Suspense} from "react";
import CreateVehicleButton from "@/features/vehicles/components/CreateVehicleButton";

const VehiclesPage = async ({
                        searchParams,
                    }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {

    return (
        <section>
            <div className={'space-y-5'}>
                <h3>Автомобили</h3>
                <CreateVehicleButton/>
                <Card>
                    <Suspense>
                        <ClientsDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default VehiclesPage;
