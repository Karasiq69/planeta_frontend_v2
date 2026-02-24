import apiClient from '@/lib/auth/client'
import { COMMENTS_URL } from '@/lib/constants'

import type { CreateComment, TComment, UpdateComment } from '@/features/orders/comments/types'

// Get comments for a specific order
export const getCommentsByOrderId = async (orderId: number): Promise<TComment[]> => {
  const res = await apiClient.get<TComment[]>(`${COMMENTS_URL}/order/${orderId}`)
  return res.data
}

// Create a new comment
export const createCommentFn = async (comment: CreateComment): Promise<TComment> => {
  const res = await apiClient.post<TComment>(COMMENTS_URL, comment)
  return res.data
}

// Update a comment
export const updateCommentFn = async ({
  id,
  ...data
}: UpdateComment & { id: number }): Promise<TComment> => {
  const res = await apiClient.patch<TComment>(`${COMMENTS_URL}/${id}`, data)
  return res.data
}

// Delete a comment
export const deleteCommentFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${COMMENTS_URL}/${id}`)
}
