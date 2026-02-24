'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Package } from 'lucide-react'
import { useMemo } from 'react'
import { toast } from 'sonner'

import DataTableBasic from '@/components/common/table/data-table-basic'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  useAddDocumentItem,
  useDeleteDocumentItem,
  useUpdateDocumentItem,
} from '@/features/documents/api/mutations'
import { useDocumentItems } from '@/features/documents/api/queries'
import { DocumentStatus } from '@/features/documents/types'

import type { ReactNode } from 'react'
import type { DocumentItem } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export interface ItemsSectionTableMeta {
  isDraft: boolean
  updatingItemId: number | null
  deletingItemId: number | null
  onUpdateItem: (itemId: number, data: { quantity?: number; price?: number }) => void
  onDeleteItem: (itemId: number) => void
}

interface BaseItemsSectionProps {
  documentId: number
  status: string
  columns: ColumnDef<DocumentItem>[]
  combobox: ReactNode | null
  onItemAdded?: () => void
}

const BaseItemsSection = ({ documentId, status, columns, combobox }: BaseItemsSectionProps) => {
  const { data: items, isLoading } = useDocumentItems(documentId)
  const {
    mutate: updateItem,
    isPending: isUpdating,
    variables: updateVariables,
  } = useUpdateDocumentItem(documentId)
  const {
    mutate: deleteItem,
    isPending: isDeleting,
    variables: deleteVariables,
  } = useDeleteDocumentItem(documentId)

  const isDraft = status === DocumentStatus.DRAFT

  const tableMeta = useMemo<ItemsSectionTableMeta>(
    () => ({
      isDraft,
      updatingItemId: isUpdating ? (updateVariables?.itemId ?? null) : null,
      deletingItemId: isDeleting ? (deleteVariables ?? null) : null,
      onUpdateItem: (itemId, data) =>
        updateItem(
          { itemId, ...data },
          { onSuccess: () => toast.success('Товар обновлён') }
        ),
      onDeleteItem: (itemId) => deleteItem(itemId),
    }),
    [isDraft, isUpdating, updateVariables, isDeleting, deleteVariables, updateItem, deleteItem]
  )

  const table = useReactTable({
    data: items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: tableMeta,
  })

  return (
    <div className='flex flex-col h-full rounded-lg border bg-card'>
      {isDraft && combobox && (
        <div className='p-4 border-b'>
          {combobox}
        </div>
      )}

      <ScrollArea className='flex-1 min-h-0'>
        {isLoading ? (
          <div className='p-4'>
            <LoaderSectionAnimated text='Загружаем товары...' />
          </div>
        ) : items && items.length > 0 ? (
          <DataTableBasic table={table} columns={columns} />
        ) : (
          <div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
            <Package className='size-10 mb-3 opacity-40' />
            <span className='text-sm'>Товары не добавлены</span>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default BaseItemsSection
