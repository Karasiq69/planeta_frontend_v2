export interface Position {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface CreatePositionPayload {
  name: string
}

export type UpdatePositionPayload = CreatePositionPayload
