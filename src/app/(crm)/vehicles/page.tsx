import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import CreateVehicleButton from "@/features/vehicles/components/CreateVehicleButton";
import VehiclesDataTable from "@/features/vehicles/components/table/VehiclesDataTable";
import CarForm from "@/features/vehicles/components/forms/CarForm";

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
                <div className={'max-w-lg p-10 bg-muted'}>
                    <CarForm/>
                </div>

                <Card>
                    <Suspense>
                        <VehiclesDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default VehiclesPage;
