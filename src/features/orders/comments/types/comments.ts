import type { User } from '@/types'

export interface TComment {
  id: number
  orderId: number
  userId: number
  content: string
  createdAt: string | Date
  updatedAt: string | Date
  user?: User
}

// Types for creating new comments
export type CreateComment = Partial<TComment>

// Types for updating comments
export type UpdateComment = Partial<Pick<TComment, 'content'>>
