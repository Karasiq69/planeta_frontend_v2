import {
  InventoryDocumentType
} from '@/features/inventory-documents/types'

import type {
  ReceiptDocumentsQueryParams} from '@/features/inventory-documents/types';

export const transferDocumentsQueryKeys = {
  all: ['inventory-documents', InventoryDocumentType.TRANSFER] as const,

  // Document keys
  details: () => [...transferDocumentsQueryKeys.all, 'document'] as const,
  detail: (id: number) => [...transferDocumentsQueryKeys.details(), id] as const,

  // Lists keys
  lists: () => [...transferDocumentsQueryKeys.all, 'list'] as const,
  list: (params: ReceiptDocumentsQueryParams) =>
    [...transferDocumentsQueryKeys.lists(), { params }] as const,

  // Items keys
  itemsAll: () => [...transferDocumentsQueryKeys.all, 'items'] as const,
  items: (documentId: number) => [...transferDocumentsQueryKeys.itemsAll(), documentId] as const,
  item: (documentId: number, itemId: number) =>
    [...transferDocumentsQueryKeys.items(documentId), itemId] as const,
}
