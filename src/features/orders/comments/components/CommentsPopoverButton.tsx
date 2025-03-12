"use client";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {MessageSquare, Trash2} from "lucide-react";
import React, {useState} from "react";
import {useCommentsByOrderId} from "@/features/orders/comments/api/queries";
import {TComment} from "@/features/orders/comments/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {formatRelativeTime} from "@/lib/format-date";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import InputWithIcon from "@/components/ui/input-with-icon";
import {useCreateComment, useDeleteComment} from "@/features/orders/comments/api/mutations";
import {useUser} from "@/hooks/use-auth";

type Props = {
    orderId: number;
};
const CommentsPopoverButton = ({orderId}: Props) => {
    const {data: user} = useUser()
    const {data: comments, isLoading} = useCommentsByOrderId(orderId);
    const {mutate, isPending} = useCreateComment(orderId);
    const {mutate: deleteComment, isPending: isDeletingPending} = useDeleteComment(orderId)
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey && commentText.trim()) {
            mutate(
                {
                    content: commentText,
                    orderId,
                },
                {
                    onSuccess: () => {
                        setCommentText("");
                    },
                }
            );
        }
    };
    const handleDeleteClick = (commentId: number) => {
        deleteComment(commentId)
    }
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size={"sm"}>
                        <MessageSquare size={16}/>{" "}
                        {comments && comments?.length >= 1 && comments.length}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 md:w-[400px]" align={"end"}>
                    <div className="flex items-baseline justify-between gap-1 px-3 py-2 bg-muted rounded-t-md">
                        <div className=" font-semibold">Комментарии</div>
                    </div>
                    <div className={"p-2 bg-muted"}>
                        <InputWithIcon
                            disabled={isPending || isLoading}
                            onKeyDown={handleSubmit}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            variant={"textarea-autosize"}
                            placeholder={"Напишите комментарий и нажмите Enter"}
                        />
                    </div>

                    <Separator/>

                    <ScrollArea type={"scroll"} className="flex max-h-[500px] flex-col overflow-y-auto">
                        <div className="flex-1">
                            {comments &&
                                comments.map((comment) => (
                                    <div key={comment.id} className={"group  "}>
                                        <CommentItem
                                            userId={Number(user?.userId)}
                                            isPending={isDeletingPending} onDelete={handleDeleteClick}
                                                     key={comment.id} comment={comment}/>
                                    </div>
                                ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </>
    );
};
export default CommentsPopoverButton;

type CommentItemProps = {
    comment: TComment,
    onDelete: (commentId: number) => void,
    isPending: boolean
    userId: number
}

const CommentItem = ({comment, isPending, onDelete, userId}: CommentItemProps) => {
    return (
        <div
            key={comment.id}
            className="flex items-start gap-2 group-hover:bg-muted p-3 rounded-md"
        >
            <Avatar className={"size-8"}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className={"flex gap-2 items-center"}>
                        <span className={"font-bold"}>{comment.user?.username}</span>

                        <span className={cn("text-xs text-muted-foreground")}>
                            {formatRelativeTime(comment?.createdAt as string)}
                        </span>
                    </div>
                    {comment?.userId === userId // Показываем кнопку удаления только для владельца комментария
                        ? <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"ghost"} size={"sm"} className={'opacity-0 group-hover:opacity-100'}>
                                    <Trash2 size={16} className={"text-destructive"}/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className={"w-auto"}>
                                <Button
                                    onClick={() => onDelete(comment.id)}
                                    disabled={isPending}
                                    variant={"destructive"}
                                    size={"sm"}
                                >
                                    Удалить
                                </Button>
                            </PopoverContent>
                        </Popover>
                        : null
                    }

                </div>
                <p className={'break-all'}>{comment.content}</p>
            </div>
        </div>
    );
};
