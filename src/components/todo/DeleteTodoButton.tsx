import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useDeleteTodo } from '@/features/todos/mutations'

export const DeleteTodoButton = ({ todoId }: { todoId: number }) => {
  const { mutate, isPending } = useDeleteTodo()

  const handleDeleteClick = () => {
    mutate(todoId)
  }
  return (
    <Button onClick={handleDeleteClick} variant="ghost" disabled={isPending}>
      <Trash2 size={15} className="text-muted-foreground" />
    </Button>
  )
}
