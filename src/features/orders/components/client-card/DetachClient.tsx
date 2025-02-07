import {UserRoundMinus} from "lucide-react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import React from "react";
import {useDetachOrderClient} from "@/features/orders/api/mutations";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

type Props = {
    orderId: number
}
export const DetachClient = ({orderId}: Props) => {
    const {mutate: detachClient, isPending} = useDetachOrderClient(orderId)

    return (
        <>
            <DropdownMenuItem disabled={isPending} className={'text-destructive'} onClick={() => detachClient()}>
                {isPending ?
                    <LoaderAnimated/> :
                    <UserRoundMinus size={16} strokeWidth={2} className="opacity-60" aria-hidden="true"/>}
                Отвязать клиента
            </DropdownMenuItem>
        </>
    );
};
