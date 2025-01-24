'use client'
import {useParams} from "next/navigation";
import {ClientFormSkeleton} from "@/features/clients/components/forms/ClientFormSkeleton";
import CarForm from "@/features/vehicles/components/forms/CarForm";
import {useVehiclesById} from "@/features/vehicles/api/queries";

const CarFormContainer = () => {
    const {id} = useParams()
    const {data: carData, isLoading} = useVehiclesById(+id)

    if (isLoading) {
        return <ClientFormSkeleton />
    }

    return (
        <CarForm
            carId={+id}
            carData={carData}
        />
    )
}

export default CarFormContainer