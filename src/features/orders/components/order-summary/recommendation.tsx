import {useEditOrder} from "@/features/orders/api/mutations";
import {ChangeEventHandler, useState} from "react";
import {useKeyDown} from "@/hooks/use-keydown";
import {ListTodo} from "lucide-react";
import {Order} from "@/features/orders/types";
import InputWithIcon from "@/components/ui/input-with-icon";
import EditableTextArea from "@/components/ui/editable-textarea";
import LoaderAnimated from "@/components/ui/LoaderAnimated";

type Props = {
    order: Order
};
const Recommendation = ({order}: Props) => {
    const {mutate, isPending} = useEditOrder()

    const onSubmit = (text: string) => {
        if (text !== order.reasonToApply) {
            mutate({reasonToApply: text})
        }
    }

    return (

        <div className={'grid gap-3'}>
            <div className="font-semibold flex gap-2 items-center">
                <ListTodo size={16} className={'text-muted-foreground'}/>
                Рекомендация {isPending && <LoaderAnimated size={14}/>}
            </div>
            <EditableTextArea
                initialText={order.recommendation}
                onSubmit={onSubmit}/>
        </div>

    );
};
export default Recommendation;