'use client'
import {useParams} from "next/navigation";
import {useInventoryDocument} from "@/features/inventory-documents/api/queries";
import InventoryDocumentFormContainer from "@/features/inventory-documents/components/InventoryDocumentFormContainer";

type Props = {};
const Page = (props: Props) => {
    const {id} = useParams()
    const {data, isLoading} = useInventoryDocument(Number(id))

    if (isLoading) return 'loading...'

    return (
        <div>
            <InventoryDocumentFormContainer/>asads
            <pre className={'text-xs'}>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
export default Page;
