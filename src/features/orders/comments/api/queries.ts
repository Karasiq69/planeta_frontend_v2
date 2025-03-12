import {useQuery} from "@tanstack/react-query";
import {commentQueryKeys} from "@/features/orders/comments/api/query-keys";
import {getCommentsByOrderId} from "@/features/orders/comments/api/actions";


export const useCommentsByOrderId = (orderId?: number) => {
    return useQuery({
        queryKey: commentQueryKeys.byOrderId(orderId as number),
        queryFn: () => getCommentsByOrderId(orderId as number),
        enabled: !!orderId
    });
};