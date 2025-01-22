'use client'
 import {useParams} from "next/navigation";
import {useClientById} from "@/features/clients/api/queries";
import ClientForm from "@/features/clients/components/forms/ClientForm";
import {ClientFormSkeleton} from "@/features/clients/components/forms/ClientFormSkeleton";

const ClientFormContainer = () => {
    const {id} = useParams()
    const {data: clientData, isLoading} = useClientById(+id)

    if (isLoading) {
        return <ClientFormSkeleton />
    }

    return (
        <ClientForm
            clientId={+id}
            clientData={clientData}
        />
    )
}

export default ClientFormContainer