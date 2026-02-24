'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Package } from 'lucide-react'
import { useParams } from 'next/navigation'
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
import {
  documentItemColumns,
  type DocumentItemTableMeta,
} from '@/features/documents/components/columns/document-item-columns'
import { DocumentStatus } from '@/features/documents/types'
import ProductsCombobox from '@/features/products/components/ProductsCombobox'

import type { Product } from '@/features/products/types'

interface Props {
  status: string
}

const DocumentItemsSection = ({ status }: Props) => {
  const { id } = useParams()
  const documentId = Number(id)

  const { data: items, isLoading } = useDocumentItems(documentId)
  const { mutate: addItem, isPending: isAdding } = useAddDocumentItem(documentId)
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

  const tableMeta = useMemo<DocumentItemTableMeta>(
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
    columns: documentItemColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: tableMeta,
  })

  const handleSelectProduct = (product: Product) => {
    addItem(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(`Товар добавлен: ${product.name}`)
        },
      }
    )
  }

  return (
    <div className='flex flex-col h-full rounded-lg border bg-card'>
      {isDraft && (
        <div className='p-4 border-b'>
          <ProductsCombobox onSelect={handleSelectProduct} isPending={isAdding} />
        </div>
      )}

      <ScrollArea className='flex-1 min-h-0'>
        {isLoading ? (
          <div className='p-4'>
            <LoaderSectionAnimated text='Загружаем товары...' />
          </div>
        ) : items && items.length > 0 ? (
          <DataTableBasic table={table} columns={documentItemColumns} />
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

export default DocumentItemsSection
