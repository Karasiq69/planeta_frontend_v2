import {useEditOrder} from "@/features/orders/api/mutations";
import {ListTodo} from "lucide-react";
import {Order} from "@/features/orders/types";
import EditableTextArea from "@/components/ui/editable-textarea";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useParams} from "next/navigation";

type Props = {
    order: Order
};
const ReasonToApply = ({order}: Props) => {
    const {id} = useParams()
    const {mutate, isPending} = useEditOrder(Number(id))

    const onSubmit = (text: string) => {
        if (text !== order.reasonToApply) {
            mutate({reasonToApply: text})
        }
    }
    // const handleDeleteComment = (id: string) => {
    //     deleteComment(id)
    // }

    // const handleKeyDown = useKeyDown(onSubmit, {targetKey: "Enter"});

    return (

        <div className={'grid gap-3'}>
            <div className="font-semibold flex gap-2 items-center">
                <ListTodo size={16} className={'text-muted-foreground'}/>
                Причина обращения {isPending && <LoaderAnimated size={14}/>}

            </div>

            <EditableTextArea
                initialText={order?.reasonToApply || ''}
                onSubmit={onSubmit}/>
        </div>

    );
};
export default ReasonToApply;
