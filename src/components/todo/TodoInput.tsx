'use client'
import { useState } from 'react'

import { useCreateTodo } from '@/features/todos/mutations'

const TodoInput = () => {
  const { mutate, isPending } = useCreateTodo()
  const [todoInput, setTodoInput] = useState('')

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && todoInput.trim()) {
      mutate({ title: todoInput })
      setTodoInput('')
    }
  }

  return (
    <div className='max-w-xl mx-auto'>
      {/*<InputWithIcon*/}
      {/*    disabled={isPending}*/}
      {/*    name="todoInput"*/}
      {/*    value={todoInput}*/}
      {/*    onKeyDown={handleSubmit}*/}
      {/*    onChange={(e) => setTodoInput(e.target.value)}*/}
      {/*    placeholder="Добавьте задачу и нажмите Enter"*/}
      {/*    className="h-14 bg-muted/50 text-xl"*/}
      {/*/>*/}
    </div>
  )
}

export default TodoInput
