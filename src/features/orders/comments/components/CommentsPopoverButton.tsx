'use client'

import { MessageSquare, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import PopoverPanel from '@/components/common/PopoverPanel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import InputWithIcon from '@/components/ui/input-with-icon'
import { Separator } from '@/components/ui/separator'
import { useCreateComment, useDeleteComment } from '@/features/orders/comments/api/mutations'
import { useCommentsByOrderId } from '@/features/orders/comments/api/queries'
import { useUser } from '@/hooks/use-auth'
import { formatRelativeTime } from '@/lib/format-date'
import { pluralize, words } from '@/lib/pluralize'
import { cn } from '@/lib/utils'

import type { TComment } from '@/features/orders/comments/types'

type Props = {
  orderId: number
}

const CommentsPopoverButton = ({ orderId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: user } = useUser()
  const { data: comments, isLoading } = useCommentsByOrderId(orderId)
  const { mutate, isPending } = useCreateComment(orderId)
  const { mutate: deleteComment, isPending: isDeletingPending } = useDeleteComment(orderId)
  const [commentText, setCommentText] = useState('')

  const count = comments?.length ?? 0

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && commentText.trim()) {
      mutate(
        { content: commentText, orderId },
        { onSuccess: () => setCommentText('') }
      )
    }
  }

  return (
    <PopoverPanel
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Комментарии"
      subtitle={count > 0 ? pluralize(count, words.record) : undefined}
      middle={
        <InputWithIcon
          disabled={isPending || isLoading}
          onKeyDown={handleSubmit}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          variant="textarea-autosize"
          placeholder="Напишите комментарий и нажмите Enter"
        />
      }
      trigger={
        <Button
          variant="outline"
          size="sm"
          className={cn(isOpen && 'bg-accent text-accent-foreground')}
        >
          <MessageSquare size={16} />
          {count > 0 && count}
        </Button>
      }
    >
      {comments?.map((comment, idx) => (
        <React.Fragment key={comment.id}>
          {idx > 0 && <Separator />}
          <CommentItem
            userId={Number(user?.userId)}
            isPending={isDeletingPending}
            onDelete={(id) => deleteComment(id)}
            comment={comment}
          />
        </React.Fragment>
      ))}
    </PopoverPanel>
  )
}

export default CommentsPopoverButton

type CommentItemProps = {
  comment: TComment
  onDelete: (commentId: number) => void
  isPending: boolean
  userId: number
}

const CommentItem = ({ comment, isPending, onDelete, userId }: CommentItemProps) => {
  return (
    <div className="group flex items-start gap-2.5 py-2.5 px-3">
      <Avatar className="size-7 shrink-0 mt-0.5">
        <AvatarImage src="" />
        <AvatarFallback className="text-[10px]">
          {comment.user?.username?.slice(0, 2).toUpperCase() ?? 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">{comment.user?.username}</span>
            <span className="text-[11px] text-muted-foreground">
              {formatRelativeTime(comment.createdAt as string)}
            </span>
          </div>
          {comment.userId === userId && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(comment.id)}
              disabled={isPending}
            >
              <Trash2 className="size-3 text-destructive" />
            </Button>
          )}
        </div>
        <p className="text-sm break-all mt-0.5">{comment.content}</p>
      </div>
    </div>
  )
}
