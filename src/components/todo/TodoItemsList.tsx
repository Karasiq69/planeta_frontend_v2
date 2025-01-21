// 'use client'
//
// import {Todo} from "@/types";
// import {Checkbox} from "@/components/ui/checkbox";
// import {Button} from "@/components/ui/button";
// import {MessageSquarePlus} from "lucide-react";
// import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
// import {cn} from "@/lib/utils";
// import {useGetTodosByUser} from "@/features/todos/queries";
// import {useAuth} from "@/providers/AuthProvider";
// import {DeleteTodoButton} from "@/components/todo/DeleteTodoButton";
// import {useEditTodo} from "@/features/todos/mutations";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import InputWithIcon from "@/components/ui/input-with-icon";
// import {useState} from "react";
// import {Skeleton} from "@/components/ui/skeleton";
//
//
// const TodoItemsList = () => {
//     const {user, isLoading: isUserLoading} = useAuth()
//     // const {data: todoData, isLoading} = useGetTodosByUser(user?.userId)
//
//     if (isUserLoading || isLoading) {
//         return <TodoSkeleton/>
//     }
//     if (!user || !todoData) {
//         return 'no data...'
//     }
//
//     const {inProgressTodos, doneTodos} = todoData.reduce(
//         (acc, todo) => {
//             if (!todo.is_completed) {
//                 acc.inProgressTodos.push(todo);
//             } else if (todo.is_completed) {
//                 acc.doneTodos.push(todo);
//             }
//             return acc;
//         },
//         {inProgressTodos: [], doneTodos: []} as {
//             inProgressTodos: Todo[];
//             doneTodos: Todo[];
//         }
//     );
//
//
//     return (
//         <div>
//             <ul className={'flex flex-col gap-2'}>
//                 {inProgressTodos.map((item) => {
//                     return (
//                         <TodoItem item={item} key={item.id}/>
//                     )
//                 })}
//             </ul>
//
//             <Accordion type="single" collapsible>
//                 <AccordionItem value="item-1">
//                     <AccordionTrigger className={'text-sm'}>
//                         Показать выполненные
//                     </AccordionTrigger>
//                     <AccordionContent>
//                         <ul className={'list-none space-y-3'}>
//                             {doneTodos.map((todoItem) => {
//                                 return (
//                                     <TodoItem key={todoItem.id}
//                                               item={todoItem}/>
//                                 )
//                             })}
//                         </ul>
//                     </AccordionContent>
//                 </AccordionItem>
//             </Accordion>
//         </div>
//     );
// };
// export default TodoItemsList;
//
//
// const TodoItem = ({item}: { item: Todo }) => {
//     const {mutate, isPending} = useEditTodo(item.id)
//     const [description, setDescription] = useState('')
//     const [isOpen, setIsOpen] = useState(false)
//
//     const handleCheckedChange = (checked: boolean) => {
//         mutate({is_completed: checked})
//     }
//
//     const handleDescriptionSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter' && !e.shiftKey && description.trim()) {
//             mutate(
//                 {description: description.trim()},
//                 {
//                     onSuccess: () => {
//                         setDescription('')
//                         setIsOpen(false)
//                     }
//                 }
//             )
//         }
//     }
//
//     return (
//         <li className="p-4 bg-background rounded-md drop-shadow-sm hover:drop-shadow-lg flex gap-5">
//             <Checkbox
//                 id={`todo-${item.id}`}
//                 checked={item.is_completed}
//                 className="size-7"
//                 disabled={isPending}
//                 onCheckedChange={handleCheckedChange}
//             />
//             <div className="flex-grow">
//                 <h5 className={cn(item.is_completed && "line-through text-muted-foreground")}>
//                     {item.title}
//                 </h5>
//                 {item.description ? (
//                     <p className={cn(
//                         "text-xs text-muted-foreground",
//                         item.is_completed && "line-clamp-2"
//                     )}>
//                         {item.description}
//                     </p>
//                 ) : (
//                     <Popover open={isOpen} onOpenChange={setIsOpen}>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 className="p-0 text-muted-foreground text-xs m-0"
//                                 variant="link"
//                             >
//                                 <MessageSquarePlus size={14}/> Добавить описание
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="p-5 space-y-5 w-96 drop-shadow-lg" align="start">
//                             <h4>Добавьте описание к задаче</h4>
//                             <InputWithIcon
//                                 placeholder="Добавьте описание и нажмите Enter.."
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 onKeyDown={handleDescriptionSubmit}
//                                 disabled={isPending}
//                             />
//                         </PopoverContent>
//                     </Popover>
//                 )}
//             </div>
//             <DeleteTodoButton todoId={item.id}/>
//         </li>
//     )
// }
//
// const TodoSkeleton = () => {
//     return (
//         <div className={'flex flex-col gap-5'}>
//             <Skeleton className={'w-full h-20 bg-muted-foreground/20'}/>
//             <Skeleton className={'w-full h-20 bg-muted-foreground/20'}/>
//             <Skeleton className={'w-full h-20 bg-muted-foreground/20'}/>
//         </div>
//     )
// }

type Props = {};
const TodoItemsList = (props: Props) => {
    return (
        <div>TodoItemsList</div>
    );
};
export default TodoItemsList;
