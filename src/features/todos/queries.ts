import apiClient from "@/lib/auth/client";
import {Todo} from "@/types";
import {useQuery} from "@tanstack/react-query";

export function useGetTodosByUser(userId: number | undefined) {
   const getTodos = async () => {
       const response = await apiClient.get<Todo[]>(`todos/`);
       return response.data;
   };

   return useQuery({
       queryKey: ['todos'],
       queryFn: getTodos,
       enabled: !!userId
   });
}