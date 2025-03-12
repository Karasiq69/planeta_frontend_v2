import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {ApiError} from "@/types/api-error";
import {commentQueryKeys} from "@/features/orders/comments/api/query-keys";
import {TComment, UpdateComment} from "@/features/orders/comments/types";
import {createCommentFn, deleteCommentFn, updateCommentFn} from "@/features/orders/comments/api/actions";

// Mutation to create a new comment
export function useCreateComment(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment:Partial<TComment>) => createCommentFn(comment),
        onSuccess: (createdComment) => {
            toast.success('Комментарий добавлен');

            // Invalidate the order comments list
            queryClient.invalidateQueries({
                queryKey: commentQueryKeys.byOrderId(orderId)
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message || 'Ошибка при создании комментария';
            toast.error(errorMessage);
            console.error(error);
        }
    });
}

// Mutation to update a comment
export function useUpdateComment(commentId: number, orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateComment) => updateCommentFn({id: commentId, ...data}),
        onSuccess: () => {
            toast.success('Комментарий обновлен');

            queryClient.invalidateQueries({
                queryKey: commentQueryKeys.byOrderId(orderId)
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message || 'Ошибка при обновлении комментария';
            toast.error(errorMessage);
            console.error(error);
        }
    });
}

// Mutation to delete a comment
export function useDeleteComment(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) => deleteCommentFn(commentId),
        onSuccess: () => {
            toast.success('Комментарий удален');

            // Invalidate the order comments list
            queryClient.invalidateQueries({
                queryKey: commentQueryKeys.byOrderId(orderId)
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message || 'Ошибка при удалении комментария';
            toast.error(errorMessage);
            console.error(error);
        }
    });
}