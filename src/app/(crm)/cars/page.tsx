import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import CreateVehicleButton from "@/features/cars/components/CreateVehicleButton";
import VehiclesDataTable from "@/features/cars/components/table/VehiclesDataTable";
import CarForm from "@/features/cars/components/forms/CarForm";

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
                        <VehiclesDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default VehiclesPage;
